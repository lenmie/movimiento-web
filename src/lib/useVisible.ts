import { useEffect, useState } from 'react'

/** true desde la primera vez que el elemento se acerca a la pantalla. */
export function useVisible(ref: React.RefObject<Element | null>, margen = '200px'): boolean {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || visible) return
    const obs = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) setVisible(true)
      },
      { rootMargin: margen },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, margen, visible])
  return visible
}
