import { contenido, fotosDe } from '../content'
import { Foto } from './Foto'

const { hero } = contenido

/** S1: foto a sangre, logotipo y la invitación a recorrer. Sin botones ni contador (R7). */
export function Hero() {
  const [portada] = fotosDe('portada')
  return (
    <header className="hero">
      <Foto foto={portada} sizes="(max-aspect-ratio: 3/2) 150vh, 100vw" className="hero__foto" prioritaria />
      <div className="hero__velo" />
      <div className="hero__arriba">
        <span>{hero.autora}</span>
        <span className="hero__fecha">{hero.lugarFecha}</span>
        <span className="hero__anio">{hero.anio}</span>
      </div>
      <div className="hero__abajo">
        <h1 className="hero__titulo">
          <img src="/assets/logo/movimiento-blanco.svg" alt="Movimiento" width={706} height={116} />
        </h1>
        <p className="hero__bajada">{hero.bajada}</p>
        <a className="invitacion" href="#recorrido">
          <span className="invitacion__flecha" aria-hidden="true">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path d="M8 2v11M3.5 8.5 8 13l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </span>
          <span className="invitacion__texto">
            <span className="etiqueta">{hero.invitacion}</span>
            <span className="invitacion__detalle">{hero.invitacionDetalle}</span>
          </span>
        </a>
      </div>
    </header>
  )
}
