import type { Page } from '@playwright/test'

/**
 * Reemplaza el script de Turnstile por uno falso que entrega el token de prueba de Cloudflare
 * (lo acepta la clave secreta de prueba de .dev.vars).
 */
export async function simularTurnstile(page: Page) {
  await page.route('https://challenges.cloudflare.com/turnstile/**', (route) =>
    route.fulfill({
      contentType: 'text/javascript',
      body: `window.turnstile = {
        render(el, o) { setTimeout(() => o.callback('XXXX.DUMMY.TOKEN.XXXX')); return 'w1' },
        reset() {},
        remove() {},
      }`,
    }),
  )
}

export async function simularContador(page: Page, respuesta: { status?: number; descargas?: number }) {
  await page.route('**/api/contador', (route) =>
    route.fulfill({
      status: respuesta.status ?? 200,
      contentType: 'application/json',
      body: JSON.stringify({ descargas: respuesta.descargas }),
    }),
  )
}

export function botonDescarga(page: Page) {
  return page.getByRole('link', { name: /Descargar libro|Descargando/ })
}
