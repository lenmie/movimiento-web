import type { Env } from './_lib/env'
import { contarDescarga } from './_lib/registro'

const NOMBRE_ARCHIVO = 'Movimiento - Brisa Jazmin Arregui.pdf'

/**
 * GET /descargar?t=<token>&ref=<origen> — entrega el PDF en streaming desde R2 (R1.3, D12).
 * El PDF sale primero; validar el token y contar corre después, en `waitUntil`, así nunca demora
 * ni frena la descarga (R1.5). HEAD responde solo encabezados y nunca cuenta (R2.4).
 */
export const onRequest: PagesFunction<Env> = async ({ request, env, waitUntil }) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response(null, { status: 405, headers: { Allow: 'GET, HEAD' } })
  }
  const esHead = request.method === 'HEAD'

  let objeto: R2Object | R2ObjectBody | null
  try {
    objeto = esHead ? await env.LIBRO.head(env.PDF_KEY) : await env.LIBRO.get(env.PDF_KEY)
  } catch {
    objeto = null
  }
  if (!objeto) {
    return new Response('El libro no está disponible en este momento. Probá de nuevo en unos minutos.', {
      status: 503,
      headers: { 'Retry-After': '300', 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }

  const headers = new Headers({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename="${NOMBRE_ARCHIVO}"`,
    'Content-Length': String(objeto.size),
    'Cache-Control': 'no-store',
  })
  if (esHead) return new Response(null, { headers })

  const url = new URL(request.url)
  waitUntil(contarDescarga(env, url.searchParams.get('t'), url.searchParams.get('ref')).catch(() => {}))

  return new Response((objeto as R2ObjectBody).body, { headers })
}
