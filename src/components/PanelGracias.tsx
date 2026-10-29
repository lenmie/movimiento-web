import { useEffect, useRef } from 'react'
import { contenido } from '../content'
import { BotonesAporte } from './Aporte'

interface Props {
  abierto: boolean
  alCerrar: () => void
}

/**
 * Panel de agradecimiento tras el click en Descargar (R3.1b). No es modal, no bloquea la descarga,
 * se cierra con Esc o con el botón y vuelve a aparecer en cada descarga (R3.2).
 */
export function PanelGracias({ abierto, alCerrar }: Props) {
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!abierto) return
    panel.current?.focus()
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === 'Escape') alCerrar()
    }
    document.addEventListener('keydown', alTeclear)
    return () => document.removeEventListener('keydown', alTeclear)
  }, [abierto, alCerrar])

  if (!abierto) return null

  return (
    <div
      ref={panel}
      className="panel"
      role="dialog"
      aria-modal="false"
      aria-labelledby="panel-titulo"
      tabIndex={-1}
    >
      <p id="panel-titulo" className="panel__titulo">
        {contenido.panel.titulo}
      </p>
      <p>{contenido.panel.texto}</p>
      <BotonesAporte />
      <button type="button" className="panel__cerrar" onClick={alCerrar}>
        {contenido.panel.cerrar}
      </button>
    </div>
  )
}
