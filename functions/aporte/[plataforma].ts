import type { Env } from '../_lib/env'
import { registrarClicAporte } from '../_lib/registro'

/** GET /aporte/:plataforma → 302 al enlace externo y registra el click (R3.3). */
export const onRequestGet: PagesFunction<Env, 'plataforma'> = async ({ params, env, waitUntil }) => {
  const destinos: Record<string, string | undefined> = {
    cafecito: env.CAFECITO_URL,
    mercadopago: env.MERCADOPAGO_URL,
  }
  const plataforma = String(params.plataforma)
  const destino = Object.hasOwn(destinos, plataforma) ? destinos[plataforma] : undefined
  if (!destino) return new Response('No encontrado', { status: 404 })

  waitUntil(registrarClicAporte(env, plataforma).catch(() => {}))
  return Response.redirect(destino, 302)
}
