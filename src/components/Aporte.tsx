import { contenido } from '../content'

/** Botones de aporte voluntario (R3.3). Cada uno pasa por /aporte/:plataforma, que registra el click. */
export function BotonesAporte() {
  return (
    <ul className="aporte__botones">
      {contenido.aporte.plataformas.map((p) => (
        <li key={p.id}>
          <a className="boton boton--secundario" href={`/aporte/${p.id}`} target="_blank" rel="noopener">
            {p.nombre}
          </a>
        </li>
      ))}
    </ul>
  )
}
