import { contenido } from '../content'

const { texto, destacado } = contenido.apertura
const [antes, despues] = texto.split(destacado)

/** S2: cita de apertura (pág. 7, fragmentos). Destino de la invitación a recorrer (R7.1). */
export function Cita() {
  return (
    <section id="recorrido" className="cita" aria-label="Cita de apertura">
      <blockquote>
        <p>
          {antes}
          <strong>{destacado}</strong>
          {despues}
        </p>
      </blockquote>
    </section>
  )
}
