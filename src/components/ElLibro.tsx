import { contenido, fotosDe } from '../content'
import { Foto } from './Foto'

/** S7b: el libro como objeto, justo antes del cierre, para invitar a descargarlo (R9). */
export function ElLibro() {
  const fotos = fotosDe('libro')
  return (
    <section className="libro contenedor" aria-labelledby="titulo-libro">
      <h2 id="titulo-libro" className="seccion__titulo aparece">
        {contenido.libro.titulo}
      </h2>
      <div className="libro__grilla">
        {fotos.map((f, i) => (
          <Foto
            key={f.archivo}
            foto={f}
            sizes={i === 0 ? '(min-width: 1280px) 1200px, 100vw' : '(min-width: 768px) 50vw, 100vw'}
            className="foto aparece"
          />
        ))}
      </div>
    </section>
  )
}
