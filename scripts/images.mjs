// Genera las variantes AVIF/WebP de cada foto de assets/fotos.json (spec §6.2) y el manifiesto que usa
// la app: src/content/fotos.generado.json, con medidas y solo los campos públicos (nunca `apodo`, D7).
// Salida de imágenes: public/img/<sección>/<nombre>-<ancho>.<formato>. Solo regenera lo que cambió.
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import { dirname, join, basename, extname } from 'node:path'
import sharp from 'sharp'

const ANCHOS = [480, 960, 1600]
const LADO_MAX = 1600
const PESO_MAX = 250 * 1024
const FORMATOS = {
  avif: (img) => img.avif({ quality: 50, effort: 4 }),
  webp: (img) => img.webp({ quality: 72 }),
}
const CAMPOS_PUBLICOS = ['archivo', 'alt', 'uso', 'nota', 'nombre', 'rol']

const raiz = new URL('..', import.meta.url).pathname
const fotos = JSON.parse(await readFile(join(raiz, 'assets/fotos.json'), 'utf8'))

const secciones = Object.entries(fotos)
  .filter(([clave, lista]) => !clave.startsWith('_') && Array.isArray(lista))
  .map(([clave, lista]) => [clave, lista.filter((f) => f.archivo.startsWith('fotos/') && f.archivo.endsWith('.jpg'))])
  .filter(([, lista]) => lista.length)

const mtime = (ruta) => stat(ruta).then((s) => s.mtimeMs, () => 0)

const excedidas = []
let generadas = 0

async function procesar(foto) {
  const origen = join(raiz, 'assets', foto.archivo)
  const { width, height } = await sharp(origen).metadata()
  const anchoMax = Math.round(width * Math.min(1, LADO_MAX / Math.max(width, height)))
  const anchos = [...new Set(ANCHOS.map((a) => Math.min(a, anchoMax)))]

  const base = `/img/${foto.archivo.replace(/^fotos\//, '').replace(extname(foto.archivo), '')}`
  const tOrigen = await mtime(origen)

  for (const ancho of anchos) {
    for (const [formato, codificar] of Object.entries(FORMATOS)) {
      const destino = join(raiz, 'public', `${base}-${ancho}.${formato}`)
      if ((await mtime(destino)) < tOrigen) {
        await mkdir(dirname(destino), { recursive: true })
        await codificar(sharp(origen).resize({ width: ancho })).toFile(destino)
        generadas++
      }
      const { size } = await stat(destino)
      if (size > PESO_MAX) excedidas.push(`${basename(destino)}: ${Math.round(size / 1024)} KB`)
    }
  }

  const publico = Object.fromEntries(CAMPOS_PUBLICOS.filter((c) => foto[c] !== undefined).map((c) => [c, foto[c]]))
  return { ...publico, base, ancho: width, alto: height, anchos }
}

const manifiesto = {}
for (const [seccion, lista] of secciones) {
  manifiesto[seccion] = []
  for (const foto of lista) manifiesto[seccion].push(await procesar(foto))
}

await writeFile(join(raiz, 'src/content/fotos.generado.json'), JSON.stringify(manifiesto, null, 2) + '\n')
const total = Object.values(manifiesto).flat().length
console.log(`${total} fotos, ${generadas} variantes nuevas → public/img/`)

if (excedidas.length) {
  console.error(`Variantes de más de 250 KB (spec §6.2):\n  ${excedidas.join('\n  ')}`)
  process.exit(1)
}
