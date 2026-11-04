import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import type { Origen } from '../../shared/origen'
import { contenido, fotosDe } from '../content'
import { formatearDescargas, obtenerDescargas } from '../lib/contador'
import { urlDeDescarga } from '../lib/descarga'
import { construirMailto, hayContacto } from '../lib/mail'
import { useTurnstile } from '../lib/turnstile'
import { useVisible } from '../lib/useVisible'
import { BotonesAporte } from './Aporte'
import { Foto } from './Foto'
import { PanelGracias } from './PanelGracias'

const { cierre, contacto, instagram } = contenido
const DURACION_DESCARGANDO_MS = 2000

/**
 * S8: el único lugar con botones. Descarga (R1), contador (R2), pedido de la edición para
 * impresión (R6), aporte voluntario (R3) e Instagram (R8).
 */
export function Cierre({ origen }: { origen: Origen }) {
  const seccion = useRef<HTMLElement>(null)
  const widget = useRef<HTMLDivElement>(null)
  const tomarToken = useTurnstile(widget, useVisible(seccion))

  const [total, setTotal] = useState<number | null>(null)
  const [descargando, setDescargando] = useState(false)
  const [panelAbierto, setPanelAbierto] = useState(false)

  useEffect(() => {
    obtenerDescargas().then(setTotal)
  }, [])

  useEffect(() => {
    if (!descargando) return
    const t = setTimeout(() => setDescargando(false), DURACION_DESCARGANDO_MS)
    return () => clearTimeout(t)
  }, [descargando])

  function alDescargar(e: MouseEvent<HTMLAnchorElement>) {
    // El navegador sigue el href después de este handler: se completa con token y origen (R1.2).
    e.currentTarget.href = urlDeDescarga(tomarToken(), origen)
    setTotal((t) => (t === null ? null : t + 1)) // +1 optimista (R2.3)
    setDescargando(true)
    setPanelAbierto(true)
  }

  function alPedirImpresion() {
    window.location.href = construirMailto(contacto)
  }

  const cerrarPanel = useCallback(() => setPanelAbierto(false), [])
  const textoContador = formatearDescargas(total)
  const [fondo] = fotosDe('cierre')

  return (
    <section id="descargar" ref={seccion} className="cierre" aria-label={cierre.etiqueta}>
      <Foto foto={fondo} sizes="100vw" className="cierre__fondo" />
      <div className="cierre__velo" />

      <div className="cierre__contenido">
        <p className="etiqueta">{cierre.etiqueta}</p>
        <img
          className="cierre__logo"
          src="/assets/logo/movimiento-blanco.svg"
          alt=""
          width={706}
          height={116}
          loading="lazy"
        />

        <a className="boton boton--principal" href="/descargar" onClick={alDescargar}>
          <span aria-hidden="true">↓</span>
          <span>{descargando ? cierre.descargando : cierre.boton}</span>
          <span className="boton__formato">{cierre.formato}</span>
        </a>
        <div ref={widget} className="turnstile" />

        {textoContador && (
          <p className="contador" aria-live="polite">
            {textoContador}
          </p>
        )}

        {hayContacto(contacto) && (
          <div className="impresion">
            <p className="texto-2">{cierre.impresionPregunta}</p>
            <button type="button" className="boton boton--secundario" onClick={alPedirImpresion}>
              {cierre.impresionBoton}
            </button>
          </div>
        )}

        <hr className="cierre__linea" />

        <div id="aporte" className="aporte">
          <p className="etiqueta">{cierre.aporteTitulo}</p>
          <p className="texto-2">{cierre.aporteTexto}</p>
          <BotonesAporte />
        </div>

        <p className="cierre__despedida">{cierre.despedida.texto}</p>

        <a
          className="boton boton--secundario boton--icono"
          href={instagram.url}
          target="_blank"
          rel="noopener"
          aria-label={instagram.etiqueta}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="17.25" cy="6.75" r="1.1" fill="currentColor" />
          </svg>
        </a>
      </div>

      <PanelGracias abierto={panelAbierto} alCerrar={cerrarPanel} />
    </section>
  )
}
