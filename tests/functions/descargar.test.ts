import { afterEach, describe, expect, it, vi } from 'vitest'
import { onRequest } from '../../functions/descargar'
import { crearD1, crearEnv, crearR2, ejecutar, PDF, simularTurnstile } from './dobles'

afterEach(() => vi.unstubAllGlobals())

describe('GET /descargar (R1)', () => {
  it('entrega el PDF completo como adjunto', async () => {
    simularTurnstile()
    const res = await ejecutar(onRequest, '/descargar?t=valido&ref=instagram', crearEnv())
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('application/pdf')
    expect(res.headers.get('Content-Disposition')).toBe(
      'attachment; filename="Movimiento - Brisa Jazmin Arregui.pdf"',
    )
    expect(new Uint8Array(await res.arrayBuffer())).toEqual(PDF)
  })

  it('token válido → cuenta una descarga con su origen (R2.1, R2.7)', async () => {
    simularTurnstile()
    const { db, ejecutadas } = crearD1()
    await ejecutar(onRequest, '/descargar?t=valido&ref=instagram', crearEnv({ DB: db }))
    expect(ejecutadas).toHaveLength(1)
    const [insert, update] = ejecutadas[0]
    expect(insert.sql).toMatch(/INSERT INTO descargas/)
    expect(insert.args[1]).toBe('instagram')
    expect(update.sql).toMatch(/UPDATE totales SET valor = valor \+ 1/)
  })

  it('origen desconocido se guarda como "otro"; sin ref, "directo"', async () => {
    simularTurnstile()
    const a = crearD1()
    await ejecutar(onRequest, '/descargar?t=valido&ref=tiktok', crearEnv({ DB: a.db }))
    expect(a.ejecutadas[0][0].args[1]).toBe('otro')
    const b = crearD1()
    await ejecutar(onRequest, '/descargar?t=valido', crearEnv({ DB: b.db }))
    expect(b.ejecutadas[0][0].args[1]).toBe('directo')
  })

  it('sin token o con token inválido → PDF entregado, total sin cambio (R1.5)', async () => {
    simularTurnstile()
    for (const url of ['/descargar', '/descargar?t=usado']) {
      const { db, ejecutadas } = crearD1()
      const res = await ejecutar(onRequest, url, crearEnv({ DB: db }))
      expect(res.status).toBe(200)
      expect(ejecutadas).toHaveLength(0)
    }
  })

  it('con la base de datos caída igual entrega el PDF (R1.5)', async () => {
    simularTurnstile()
    const res = await ejecutar(onRequest, '/descargar?t=valido', crearEnv({ DB: crearD1({ caida: true }).db }))
    expect(res.status).toBe(200)
    expect(new Uint8Array(await res.arrayBuffer())).toEqual(PDF)
  })

  it('si Turnstile no responde, igual entrega el PDF (R1.5)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('sin red')))
    const res = await ejecutar(onRequest, '/descargar?t=valido', crearEnv())
    expect(res.status).toBe(200)
  })

  it('HEAD responde encabezados y nunca cuenta (R2.4)', async () => {
    const f = simularTurnstile()
    const { db, ejecutadas } = crearD1()
    const res = await ejecutar(onRequest, '/descargar?t=valido', crearEnv({ DB: db }), { method: 'HEAD' })
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Length')).toBe(String(PDF.byteLength))
    expect(f).not.toHaveBeenCalled()
    expect(ejecutadas).toHaveLength(0)
  })

  it('no envía cookies ni direcciones del bucket (R2.8, R1.3)', async () => {
    simularTurnstile()
    const res = await ejecutar(onRequest, '/descargar?t=valido', crearEnv())
    expect(res.headers.get('Set-Cookie')).toBeNull()
    expect([...res.headers.values()].join(' ')).not.toMatch(/r2\.dev|r2\.cloudflarestorage/)
  })

  it('sin el PDF en R2 responde 503', async () => {
    const res = await ejecutar(onRequest, '/descargar', crearEnv({ LIBRO: crearR2({ vacio: true }) }))
    expect(res.status).toBe(503)
  })
})
