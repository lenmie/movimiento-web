// Vuelca el texto de páginas del PDF del libro, para armar src/content/contenido.json (T3).
// Uso: npm run extract-text -- "<ruta al PDF>" <salida.txt> [páginas, ej. 2,7,29-40]
// Sin lista de páginas vuelca todas. El PDF nunca se copia al repo (spec §7 Repositorio).
import { readFile, writeFile } from 'node:fs/promises'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'

const [ruta, salida, rangos] = process.argv.slice(2)
if (!ruta || !salida) {
  console.error('Uso: npm run extract-text -- "<ruta al PDF>" <salida.txt> [2,7,29-40]')
  process.exit(1)
}

const data = new Uint8Array(await readFile(ruta))
const pdf = await getDocument({ data, verbosity: 0 }).promise

const paginas = rangos
  ? rangos.split(',').flatMap((r) => {
      const [desde, hasta = desde] = r.split('-').map(Number)
      return Array.from({ length: hasta - desde + 1 }, (_, i) => desde + i)
    })
  : Array.from({ length: pdf.numPages }, (_, i) => i + 1)

const partes = []
for (const n of paginas) {
  if (n < 1 || n > pdf.numPages) continue
  const pagina = await pdf.getPage(n)
  const { items } = await pagina.getTextContent()
  // Une los fragmentos respetando los saltos de línea que marca pdfjs.
  const texto = items.map((it) => ('str' in it ? it.str + (it.hasEOL ? '\n' : '') : '')).join('')
  partes.push(`===== PDF pág. ${n} =====\n${texto.trim()}\n`)
}

await writeFile(salida, partes.join('\n'))
console.log(`${partes.length} páginas → ${salida} (el PDF tiene ${pdf.numPages})`)
