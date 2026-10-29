import { describe, expect, it, vi } from 'vitest'
import { formatearDescargas, obtenerDescargas, UMBRAL } from '../../src/lib/contador'

describe('formatearDescargas (R2.3, R2.6)', () => {
  it('formatea con separador de miles es-AR', () => {
    expect(formatearDescargas(1284)).toBe('1.284 descargas')
  })

  it('no muestra el número por debajo del umbral', () => {
    expect(UMBRAL).toBe(50)
    expect(formatearDescargas(49)).toBeNull()
    expect(formatearDescargas(50)).toBe('50 descargas')
  })

  it('no muestra nada sin dato', () => {
    expect(formatearDescargas(null)).toBeNull()
  })
})

describe('obtenerDescargas (R2.5)', () => {
  it('devuelve el total', async () => {
    const f = vi.fn().mockResolvedValue(Response.json({ descargas: 1284 }))
    expect(await obtenerDescargas(f)).toBe(1284)
  })

  it('devuelve null si la API responde 500', async () => {
    const f = vi.fn().mockResolvedValue(new Response('x', { status: 500 }))
    expect(await obtenerDescargas(f)).toBeNull()
  })

  it('devuelve null si la API falla o se corta', async () => {
    const f = vi.fn().mockRejectedValue(new DOMException('timeout', 'TimeoutError'))
    expect(await obtenerDescargas(f)).toBeNull()
  })
})
