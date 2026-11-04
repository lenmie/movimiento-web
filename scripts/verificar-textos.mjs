// Verifica que cada cita de src/content/contenido.json esté textual en el libro (CLAUDE.md, spec §3).
// Uso: node scripts/verificar-textos.mjs <volcado de extract-text.txt> src/content/contenido.json
// Tolera la mayúscula inicial y el punto final que se agregan al cortar una oración.
import { readFileSync } from 'node:fs'
const [libroPath, jsonPath] = process.argv.slice(2)
// Une líneas, quita guiones de corte de línea, normaliza espacios.
const libro = readFileSync(libroPath, 'utf8').replace(/=====.*=====/g, ' ').replace(/-\n/g, '').replace(/\s+/g, ' ')
const c = JSON.parse(readFileSync(jsonPath, 'utf8'))
const citas = [c.cierre.cita.texto, c.cierre.despedida.texto, c.autora.agradecimientos.texto,
  ...c.autora.notaEditorial.parrafos, ...c.practicas.flatMap(p => [...p.texto, ...p.cronologia.map(x => x.texto)])]
let mal = 0
for (const t of citas) {
  const s = t.replace(/\s+/g, ' ')
  // tolera mayúscula inicial agregada
  const ok = libro.includes(s) || libro.includes(s[0].toLowerCase() + s.slice(1)) || libro.includes(s.slice(0, -1)) || libro.includes(s[0].toLowerCase() + s.slice(1, -1))
  if (!ok) { mal++; console.log('✗', s.slice(0, 90)) }
}
console.log(`${citas.length - mal}/${citas.length} textuales`)
process.exit(mal ? 1 : 0)
