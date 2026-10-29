// Origen del tráfico (R2.7): los enlaces compartidos llevan ?ref=. Lo usan la página y /descargar.
export const ORIGENES = ['instagram', 'whatsapp', 'facebook', 'mail', 'qr'] as const

export type Origen = (typeof ORIGENES)[number] | 'otro' | 'directo'

export function normalizarOrigen(valor: string | null | undefined): Origen {
  const v = valor?.trim().toLowerCase()
  if (!v) return 'directo'
  return (ORIGENES as readonly string[]).includes(v) ? (v as Origen) : 'otro'
}
