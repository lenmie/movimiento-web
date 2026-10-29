import { normalizarOrigen, type Origen } from '../../shared/origen'

/** El origen se lee una vez de la URL y vive solo en memoria (R2.7, §7.1). */
export function origenDeLaVisita(search: string): Origen {
  return normalizarOrigen(new URLSearchParams(search).get('ref'))
}

/** `/descargar?t=<token>&ref=<origen>` (R1.2, §5). Sin token, el PDF igual se entrega pero no se cuenta. */
export function urlDeDescarga(token: string | null, origen: Origen): string {
  const params = new URLSearchParams()
  if (token) params.set('t', token)
  params.set('ref', origen)
  return `/descargar?${params}`
}
