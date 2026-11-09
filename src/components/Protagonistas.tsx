import { contenido, fotosDe } from '../content'
import { Foto } from './Foto'

/** S6: retratos con nombre y, si lo hay, rol. Nunca el apodo (D7). */
export function Protagonistas() {
  const retratos = fotosDe('protagonistas')
  return (
    <section className="protagonistas contenedor" aria-labelledby="titulo-protagonistas">
      <h2 id="titulo-protagonistas" className="seccion__titulo">
        {contenido.protagonistas.titulo}
      </h2>
      <ul className="protagonistas__grilla">
        {retratos.map((f) => (
          <li key={f.archivo}>
            <figure className="aparece">
              <Foto foto={f} sizes="(min-width: 1024px) 20vw, 50vw" className="foto foto--retrato" />
              <figcaption>
                {f.rol && <span className="etiqueta">{f.rol}</span>}
                <span>{f.nombre}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
