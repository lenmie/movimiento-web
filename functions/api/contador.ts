import type { Env } from '../_lib/env'

const CACHE_SEGUNDOS = 60

/** GET /api/contador → { descargas } (R2.2). Lee una sola fila y se cachea 60 s en el borde. */
export const onRequestGet: PagesFunction<Env> = async ({ request, env, waitUntil }) => {
  const cache = (globalThis as { caches?: { default?: Cache } }).caches?.default
  const clave = new Request(new URL('/api/contador', request.url))
  const guardada = await cache?.match(clave)
  if (guardada) return guardada

  try {
    const fila = await env.DB.prepare("SELECT valor FROM totales WHERE clave = 'descargas'").first<{
      valor: number
    }>()
    const res = Response.json(
      { descargas: fila?.valor ?? 0 },
      { headers: { 'Cache-Control': `public, max-age=${CACHE_SEGUNDOS}` } },
    )
    if (cache) waitUntil(cache.put(clave, res.clone()))
    return res
  } catch {
    // La página oculta el número ante cualquier error (R2.5).
    return Response.json({ error: 'no disponible' }, { status: 500, headers: { 'Cache-Control': 'no-store' } })
  }
}
