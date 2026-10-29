const SITEVERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

/** Valida un token de Turnstile (R2.4). No se envía la IP de la persona (R2.8). */
export async function tokenValido(token: string | null, secreto: string | undefined): Promise<boolean> {
  if (!token || !secreto) return false
  const body = new FormData()
  body.append('secret', secreto)
  body.append('response', token)
  const res = await fetch(SITEVERIFY, { method: 'POST', body })
  if (!res.ok) return false
  const { success } = (await res.json()) as { success?: boolean }
  return success === true
}
