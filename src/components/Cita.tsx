import { contenido } from '../content'

const { texto, destacado } = contenido.apertura
const [antes, despues] = texto.split(destacado)

/** S2: cita de apertura (pág. 7, fragmentos). */
export function Cita() {
  return (
    <section className="cita" aria-label="Cita de apertura">
      <blockquote className="aparece">
        <p>
          {antes}
          <strong>{destacado}</strong>
          {despues}
        </p>
      </blockquote>
    </section>
  )
}
