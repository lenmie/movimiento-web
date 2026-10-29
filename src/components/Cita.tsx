import { contenido } from '../content'

/** S2: cita de apertura (pág. 7). Destino de la invitación a recorrer (R7.1). */
export function Cita() {
  return (
    <section id="recorrido" className="cita" aria-label="Cita de apertura">
      <blockquote>
        <p>“{contenido.apertura.texto}”</p>
      </blockquote>
    </section>
  )
}
