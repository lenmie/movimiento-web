import { describe, expect, it } from 'vitest'
import { onRequestGet } from '../../functions/api/contador'
import { crearD1, crearEnv, ejecutar } from './dobles'

describe('GET /api/contador (R2.2)', () => {
  it('devuelve el total con caché de 60 s', async () => {
    const res = await ejecutar(onRequestGet, '/api/contador', crearEnv({ DB: crearD1({ total: 1284 }).db }))
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ descargas: 1284 })
    expect(res.headers.get('Cache-Control')).toBe('public, max-age=60')
    expect(res.headers.get('Set-Cookie')).toBeNull()
  })

  it('con la base caída responde 500 (la página oculta el número, R2.5)', async () => {
    const res = await ejecutar(onRequestGet, '/api/contador', crearEnv({ DB: crearD1({ caida: true }).db }))
    expect(res.status).toBe(500)
  })
})
