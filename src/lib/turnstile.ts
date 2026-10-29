// Captcha invisible (R2.4). El script de Cloudflare se carga recién cuando el cierre entra en pantalla.
import { useCallback, useEffect, useRef } from 'react'

interface Turnstile {
  render(el: HTMLElement, opciones: Record<string, unknown>): string
  reset(id: string): void
  remove(id: string): void
}

declare global {
  interface Window {
    turnstile?: Turnstile
  }
}

const SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
const SITEKEY = import.meta.env.VITE_TURNSTILE_SITEKEY as string | undefined

let cargando: Promise<Turnstile> | null = null

function cargarTurnstile(): Promise<Turnstile> {
  cargando ??= new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = SCRIPT
    s.async = true
    s.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('turnstile')))
    s.onerror = () => {
      cargando = null
      reject(new Error('turnstile'))
    }
    document.head.appendChild(s)
  })
  return cargando
}

/**
 * Renderiza el widget en `contenedor` cuando `activo` pasa a true y mantiene un token fresco
 * (`refresh-expired: 'auto'`). `tomarToken()` devuelve el token vigente y pide uno nuevo, porque
 * cada token sirve una sola vez.
 */
export function useTurnstile(contenedor: React.RefObject<HTMLElement | null>, activo: boolean) {
  const token = useRef<string | null>(null)
  const widget = useRef<{ api: Turnstile; id: string } | null>(null)

  useEffect(() => {
    const el = contenedor.current
    if (!activo || !el || !SITEKEY || widget.current) return
    let cancelado = false
    cargarTurnstile()
      .then((api) => {
        if (cancelado) return
        const id = api.render(el, {
          sitekey: SITEKEY,
          'refresh-expired': 'auto',
          callback: (t: string) => (token.current = t),
          'expired-callback': () => (token.current = null),
          'error-callback': () => {
            token.current = null
          },
        })
        widget.current = { api, id }
      })
      // Sin Turnstile la descarga funciona igual; solo no se cuenta (R2.4).
      .catch(() => {})
    return () => {
      cancelado = true
    }
  }, [activo, contenedor])

  useEffect(
    () => () => {
      if (widget.current) widget.current.api.remove(widget.current.id)
    },
    [],
  )

  return useCallback(() => {
    const t = token.current
    token.current = null
    if (widget.current) widget.current.api.reset(widget.current.id)
    return t
  }, [])
}
