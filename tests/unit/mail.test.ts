import { describe, expect, it } from 'vitest'
import { construirMailto, hayContacto } from '../../src/lib/mail'

const contacto = {
  usuario: 'brisa',
  dominio: 'ejemplo.com',
  asunto: 'Movimiento — edición para impresión',
  cuerpo: 'Hola Brisa, quisiera la edición para impresión de Movimiento para…',
}

describe('pedido de la edición para impresión (R6)', () => {
  it('arma el mailto con asunto y cuerpo precargados', () => {
    const url = new URL(construirMailto(contacto))
    expect(url.protocol).toBe('mailto:')
    expect(url.pathname).toBe('brisa@ejemplo.com')
    expect(new URLSearchParams(url.search).get('subject')).toBe(contacto.asunto)
    expect(new URLSearchParams(url.search).get('body')).toBe(contacto.cuerpo)
  })

  it('sin dirección configurada (D13) no hay contacto', () => {
    expect(hayContacto({ ...contacto, usuario: '' })).toBe(false)
    expect(hayContacto(contacto)).toBe(true)
  })
})
