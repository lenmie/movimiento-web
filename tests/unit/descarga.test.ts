import { describe, expect, it } from 'vitest'
import { normalizarOrigen } from '../../shared/origen'
import { origenDeLaVisita, urlDeDescarga } from '../../src/lib/descarga'

describe('origen del tráfico (R2.7)', () => {
  it('acepta los valores de la lista', () => {
    for (const v of ['instagram', 'whatsapp', 'facebook', 'mail', 'qr']) expect(normalizarOrigen(v)).toBe(v)
    expect(normalizarOrigen(' Instagram ')).toBe('instagram')
  })

  it('valores fuera de la lista → otro; sin ref → directo', () => {
    expect(normalizarOrigen('tiktok')).toBe('otro')
    expect(normalizarOrigen('')).toBe('directo')
    expect(normalizarOrigen(null)).toBe('directo')
  })

  it('se lee de la URL de la visita', () => {
    expect(origenDeLaVisita('?ref=instagram')).toBe('instagram')
    expect(origenDeLaVisita('')).toBe('directo')
  })
})

describe('urlDeDescarga (R1.2)', () => {
  it('agrega token y origen', () => {
    expect(urlDeDescarga('abc.123', 'instagram')).toBe('/descargar?t=abc.123&ref=instagram')
  })

  it('sin token, solo el origen', () => {
    expect(urlDeDescarga(null, 'directo')).toBe('/descargar?ref=directo')
  })
})
