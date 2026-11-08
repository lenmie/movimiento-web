/**
 * R10: títulos, textos y fotos aparecen con un fundido la primera vez que entran en pantalla,
 * como el sitio de Brisa en Canva. Los que entran juntos se escalonan, y una foto espera a
 * terminar de cargar. El fundido en sí es CSS (`.con-aparicion .aparece` en app.css).
 */

const PASO_MS = 120
const MAX_PASOS = 4

/**
 * Se llama antes del primer render: así lo que se va a fundir ya empieza invisible y no parpadea.
 * Con movimiento reducido o sin IntersectionObserver no hace nada y todo se ve desde el inicio (R10.4).
 */
export function prepararAparicion(): void {
  const puede =
    'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (puede) document.documentElement.classList.add('con-aparicion')
}

/** Observa cada `.aparece` y lo muestra una sola vez. Devuelve la limpieza para `useEffect`. */
export function observarAparicion(raiz: ParentNode = document): () => void {
  if (!document.documentElement.classList.contains('con-aparicion')) return () => {}

  const obs = new IntersectionObserver(
    (entradas) => {
      // Las entradas llegan en el orden de la página: foto, título, texto (R10.2).
      let paso = 0
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue
        const el = entrada.target as HTMLElement
        obs.unobserve(el)
        el.style.setProperty('--retraso-aparicion', `${Math.min(paso++, MAX_PASOS) * PASO_MS}ms`)
        cuandoCargue(el, () => el.classList.add('aparece--visible'))
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  )

  raiz.querySelectorAll('.aparece').forEach((el) => obs.observe(el))
  return () => obs.disconnect()
}

function cuandoCargue(el: HTMLElement, mostrar: () => void) {
  const img = el instanceof HTMLImageElement ? el : el.querySelector('img')
  if (!img || img.complete) return mostrar()
  img.addEventListener('load', mostrar, { once: true })
  img.addEventListener('error', mostrar, { once: true })
}
