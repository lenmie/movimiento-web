// Pedido de la edición para impresión (R6). La dirección se arma recién al hacer click (R6.3).

export interface Contacto {
  usuario: string
  dominio: string
  asunto: string
  cuerpo: string
}

export function hayContacto(c: Contacto): boolean {
  return Boolean(c.usuario && c.dominio)
}

export function construirMailto(c: Contacto): string {
  const params = `subject=${encodeURIComponent(c.asunto)}&body=${encodeURIComponent(c.cuerpo)}`
  return `mailto:${c.usuario}@${c.dominio}?${params}`
}
