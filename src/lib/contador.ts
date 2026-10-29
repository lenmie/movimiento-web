// Contador público de descargas (R2).

/** Por debajo de este total el número no se muestra (R2.6, D5). */
export const UMBRAL = 50
const TIEMPO_MAX_MS = 3000

const numero = new Intl.NumberFormat('es-AR')

/** "1 descarga", "1.284 descargas"; `null` si no corresponde mostrarlo (R2.3, R2.6). */
export function formatearDescargas(total: number | null): string | null {
  if (total === null || !Number.isFinite(total) || total < UMBRAL) return null
  return `${numero.format(total)} ${total === 1 ? 'descarga' : 'descargas'}`
}

/** Lee `/api/contador`. Ante error o demora de más de 3 s devuelve `null` (R2.5). */
export async function obtenerDescargas(f: typeof fetch = fetch): Promise<number | null> {
  try {
    const res = await f('/api/contador', { signal: AbortSignal.timeout(TIEMPO_MAX_MS) })
    if (!res.ok) return null
    const { descargas } = (await res.json()) as { descargas?: unknown }
    return typeof descargas === 'number' ? descargas : null
  } catch {
    return null
  }
}
