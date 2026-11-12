import { contenido } from '../content'

const { texto, destacado } = contenido.apertura
const [antes, despues] = texto.split(destacado)
// En teléfonos la última frase se parte antes de "también" (solo visual; el texto no cambia).
const corte = despues.indexOf(' también')
const antesCorte = despues.slice(0, corte)
const despuesCorte = despues.slice(corte)

/** S2: cita de apertura (pág. 7, fragmentos). */
export function Cita() {
  return (
    <section className="cita" aria-label="Cita de apertura">
      <blockquote className="aparece">
        <p>
          {antes}
          <strong>{destacado}</strong>
          {antesCorte}
          <br className="cita__corte" />
          {despuesCorte}
        </p>
      </blockquote>
    </section>
  )
}
