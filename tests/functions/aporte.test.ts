import { describe, expect, it } from 'vitest'
import { onRequestGet } from '../../functions/aporte/[plataforma]'
import { crearD1, crearEnv, ejecutar } from './dobles'

describe('GET /aporte/:plataforma (R3.3)', () => {
  it.each([
    ['cafecito', 'https://cafecito.app/movimiento'],
    ['mercadopago', 'https://link.mercadopago.com.ar/movimiento'],
  ])('%s → 302 al enlace externo y registra el click', async (plataforma, destino) => {
    const { db, ejecutadas } = crearD1()
    const res = await ejecutar(onRequestGet, `/aporte/${plataforma}`, crearEnv({ DB: db }), {
      params: { plataforma },
    })
    expect(res.status).toBe(302)
    expect(res.headers.get('Location')).toBe(destino)
    expect(ejecutadas[0][0].sql).toMatch(/INSERT INTO clics_aporte/)
    expect(ejecutadas[0][0].args[1]).toBe(plataforma)
  })

  it('otra plataforma → 404', async () => {
    for (const plataforma of ['paypal', 'toString', '__proto__']) {
      const res = await ejecutar(onRequestGet, `/aporte/${plataforma}`, crearEnv(), { params: { plataforma } })
      expect(res.status).toBe(404)
    }
  })

  it('con la base caída igual redirige', async () => {
    const res = await ejecutar(onRequestGet, '/aporte/cafecito', crearEnv({ DB: crearD1({ caida: true }).db }), {
      params: { plataforma: 'cafecito' },
    })
    expect(res.status).toBe(302)
  })
})
