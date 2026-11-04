import contenido from './contenido.json'
// Generado por scripts/images.mjs desde assets/fotos.json, ya sin `apodo` (D7): así nunca llega al navegador.
import fotos from './fotos.generado.json'

export { contenido }

export interface FotoInfo {
  archivo: string
  alt: string
  uso?: string
  nota?: string
  nombre?: string
  rol?: string
  /** Ruta sin ancho ni extensión: `${base}-${ancho}.${formato}` */
  base: string
  ancho: number
  alto: number
  anchos: number[]
}

export type Seccion = 'portada' | 'contorsion' | 'acrobacia' | 'danza' | 'protagonistas' | 'autora' | 'libro' | 'cierre'

export function fotosDe(seccion: Seccion): FotoInfo[] {
  return (fotos as Record<string, FotoInfo[]>)[seccion] ?? []
}

/** "object-position: 40% center" → "40% center" */
export function posicionDe(nota?: string): string | undefined {
  return nota?.match(/object-position:\s*([^;]+)/)?.[1]?.trim()
}
