import { contenido, fotosDe } from '../content'
import { Foto } from './Foto'

const { autora } = contenido

/** S7: la autora, nota editorial, créditos (incluidas las fotos inéditas, §7) y agradecimientos. */
export function Autora() {
  const [retrato] = fotosDe('autora')
  return (
    <section className="autora contenedor" aria-labelledby="titulo-autora">
      <h2 id="titulo-autora" className="seccion__titulo">
        {autora.titulo}
      </h2>
      <div className="autora__cuerpo">
        <figure className="autora__retrato aparece">
          <Foto foto={retrato} sizes="(min-width: 1024px) 30vw, 100vw" className="foto foto--retrato" />
          <figcaption>{autora.nombre}</figcaption>
        </figure>

        <div className="autora__textos">
          <h3 className="etiqueta aparece">{autora.notaEditorialTitulo}</h3>
          {autora.notaEditorial.parrafos.map((p) => (
            <p key={p} className="aparece">
              {p}
            </p>
          ))}

          <h3 className="etiqueta aparece">Créditos</h3>
          <dl className="creditos aparece">
            {autora.creditos.items.map((c) => (
              <div key={c.rol}>
                <dt>{c.rol}</dt>
                <dd>{c.nombre}</dd>
              </div>
            ))}
          </dl>
          <p className="texto-2 aparece">{autora.creditos.edicion}</p>

          <h3 className="etiqueta aparece">{autora.agradecimientosTitulo}</h3>
          <p className="aparece">{autora.agradecimientos.texto}</p>
        </div>
      </div>
    </section>
  )
}
