import { normalizarOrigen } from '../../shared/origen'
import type { Env } from './env'
import { tokenValido } from './turnstile'

/**
 * Cuenta una descarga si el token es válido (R2.1). D1 no admite BEGIN/COMMIT desde un Worker:
 * `batch()` aplica las dos escrituras de forma atómica (§5.1).
 */
export async function contarDescarga(env: Env, token: string | null, ref: string | null): Promise<void> {
  if (!(await tokenValido(token, env.TURNSTILE_SECRET))) return
  await env.DB.batch([
    env.DB.prepare('INSERT INTO descargas (creada_en, origen) VALUES (?, ?)').bind(
      new Date().toISOString(),
      normalizarOrigen(ref),
    ),
    env.DB.prepare("UPDATE totales SET valor = valor + 1 WHERE clave = 'descargas'"),
  ])
}

export async function registrarClicAporte(env: Env, plataforma: string): Promise<void> {
  await env.DB.prepare('INSERT INTO clics_aporte (creada_en, plataforma) VALUES (?, ?)')
    .bind(new Date().toISOString(), plataforma)
    .run()
}
