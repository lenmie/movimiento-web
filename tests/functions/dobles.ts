// Dobles de D1, R2 y del contexto de Pages Functions para testear los handlers sin Cloudflare.
import { vi } from 'vitest'
import type { Env } from '../../functions/_lib/env'

export const PDF = new TextEncoder().encode('%PDF-1.7 libro de prueba')

interface Sentencia {
  sql: string
  args: unknown[]
}

export function crearD1({ caida = false, total = 0 } = {}) {
  const ejecutadas: Sentencia[][] = []
  const preparar = (sql: string): Sentencia & Record<string, unknown> => {
    if (caida) throw new Error('D1 caída')
    const s = {
      sql,
      args: [] as unknown[],
      bind(...args: unknown[]) {
        s.args = args
        return s
      },
      async first() {
        return { valor: total }
      },
      async run() {
        ejecutadas.push([{ sql: s.sql, args: s.args }])
        return { success: true }
      },
    }
    return s
  }
  const db = {
    prepare: preparar,
    async batch(lista: Sentencia[]) {
      ejecutadas.push(lista.map(({ sql, args }) => ({ sql, args })))
      return []
    },
  }
  return { db: db as unknown as D1Database, ejecutadas }
}

export function crearR2({ vacio = false } = {}) {
  const r2 = {
    async head() {
      return vacio ? null : { size: PDF.byteLength }
    },
    async get() {
      if (vacio) return null
      return { size: PDF.byteLength, body: new Response(PDF).body }
    },
  }
  return r2 as unknown as R2Bucket
}

export function crearEnv(parcial: Partial<Env> = {}): Env {
  return {
    DB: crearD1().db,
    LIBRO: crearR2(),
    PDF_KEY: 'movimiento-web.pdf',
    TURNSTILE_SECRET: 'secreto',
    CAFECITO_URL: 'https://cafecito.app/movimiento',
    MERCADOPAGO_URL: 'https://link.mercadopago.com.ar/movimiento',
    ...parcial,
  }
}

/** Ejecuta un handler y espera también lo que dejó en `waitUntil`. */
export async function ejecutar(
  handler: PagesFunction<Env, string>,
  url: string,
  env: Env,
  { method = 'GET', params = {} as Record<string, string> } = {},
) {
  const pendientes: Promise<unknown>[] = []
  const contexto = {
    request: new Request(`https://movimiento.pages.dev${url}`, { method }),
    env,
    params,
    waitUntil: (p: Promise<unknown>) => pendientes.push(p),
  }
  const res = await handler(contexto as unknown as EventContext<Env, string, Record<string, unknown>>)
  await Promise.all(pendientes)
  return res
}

/** siteverify falso: solo el token "valido" pasa. */
export function simularTurnstile() {
  const f = vi.fn(async (_url: string, init?: RequestInit) => {
    const token = (init?.body as FormData).get('response')
    return Response.json({ success: token === 'valido' })
  })
  vi.stubGlobal('fetch', f)
  return f
}
