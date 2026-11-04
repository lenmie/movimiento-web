import { expect, test } from '@playwright/test'
import { botonDescarga, simularContador, simularTurnstile } from './ayuda'

test.beforeEach(async ({ page }) => {
  await simularTurnstile(page)
})

test('el hero no tiene botones y hay un solo botón de descarga, en S8 (R1, R7)', async ({ page }) => {
  await page.goto('/')
  const hero = page.locator('header.hero')
  await expect(hero.getByRole('button')).toHaveCount(0)
  await expect(hero.locator('a[href*="descargar"], a[href*="aporte"]')).toHaveCount(0)
  await expect(page.locator('a[href^="/descargar"]')).toHaveCount(1)
  await expect(page.locator('#descargar a[href^="/descargar"]')).toHaveCount(1)
})

test('la invitación lleva a la cita de apertura (R7.1)', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /Recorré el libro/ }).click()
  await expect(page).toHaveURL(/#recorrido$/)
  await expect(page.locator('#recorrido')).toBeInViewport()
})

test('las fotos del libro van justo antes del cierre (R9)', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('section.libro picture')).toHaveCount(5)
  await expect(page.locator('section.libro + #descargar')).toHaveCount(1)
})

test('el lector de pantalla lee los títulos reales (R4.2)', async ({ page }) => {
  await page.goto('/')
  for (const titulo of ['Contorsión', 'Acrobacia aérea', 'Danza'])
    await expect(page.getByRole('heading', { level: 2, name: new RegExp(titulo) })).toBeVisible()
})

test('sin movimiento reducido, los títulos giran con el scroll (R4.1)', async ({ page }) => {
  await page.goto('/')
  const nombre = await page.locator('.espejado').first().evaluate((el) => getComputedStyle(el).animationName)
  expect(nombre).toBe('girar')
})

test.describe('con movimiento reducido', () => {
  test.use({ colorScheme: 'dark', reducedMotion: 'reduce' })

  test('ningún título aparece espejado y la flecha no se anima (R4.3, R7.2)', async ({ page }) => {
    await page.goto('/')
    for (const t of await page.locator('.espejado').all()) {
      await t.scrollIntoViewIfNeeded()
      expect(await t.evaluate((el) => getComputedStyle(el).transform)).toBe('none')
    }
    expect(await page.locator('.invitacion__flecha svg').evaluate((el) => getComputedStyle(el).animationName)).toBe(
      'none',
    )
  })
})

test('descargar entrega el PDF y abre el panel en cada click (R1, R3)', async ({ page }) => {
  await page.goto('/?ref=instagram')
  await page.locator('#descargar').scrollIntoViewIfNeeded()

  const [descarga] = await Promise.all([page.waitForEvent('download'), botonDescarga(page).click()])
  expect(descarga.suggestedFilename()).toBe('Movimiento - Brisa Jazmin Arregui.pdf')
  expect(descarga.url()).toMatch(/\/descargar\?t=XXXX\.DUMMY\.TOKEN\.XXXX&ref=instagram$/)

  const panel = page.getByRole('dialog', { name: '¡Gracias!' })
  await expect(panel).toBeVisible()
  await expect(panel).toBeFocused()
  await expect(panel.getByRole('link', { name: 'Cafecito' })).toHaveAttribute('href', '/aporte/cafecito')

  await page.keyboard.press('Escape')
  await expect(panel).toBeHidden()

  await Promise.all([page.waitForEvent('download'), botonDescarga(page).click()])
  await expect(panel).toBeVisible()
  await panel.getByRole('button', { name: 'Cerrar' }).click()
  await expect(panel).toBeHidden()
})

test('el botón muestra "Descargando…" y vuelve (§6.3)', async ({ page }) => {
  await page.goto('/')
  await page.locator('#descargar').scrollIntoViewIfNeeded()
  await Promise.all([page.waitForEvent('download'), botonDescarga(page).click()])
  await expect(botonDescarga(page)).toContainText('Descargando…')
  await expect(botonDescarga(page)).toContainText('Descargar libro', { timeout: 4000 })
})

test.describe('contador (R2)', () => {
  test('muestra el total con formato es-AR y suma 1 al descargar', async ({ page }) => {
    await simularContador(page, { descargas: 1284 })
    await page.goto('/')
    await expect(page.locator('.contador')).toHaveText('1.284 descargas')
    await Promise.all([page.waitForEvent('download'), botonDescarga(page).click()])
    await expect(page.locator('.contador')).toHaveText('1.285 descargas')
  })

  test('si la API devuelve 500, el botón se muestra sin número', async ({ page }) => {
    await simularContador(page, { status: 500 })
    await page.goto('/')
    await expect(botonDescarga(page)).toBeVisible()
    await expect(page.locator('.contador')).toHaveCount(0)
  })

  test('por debajo de 50 no se muestra el número', async ({ page }) => {
    await simularContador(page, { descargas: 12 })
    await page.goto('/')
    await expect(botonDescarga(page)).toBeVisible()
    await expect(page.locator('.contador')).toHaveCount(0)
  })
})

test('enlaces de aporte: pestaña nueva y rel=noopener (R3.3, §7)', async ({ page }) => {
  await page.goto('/')
  for (const enlace of await page.locator('#aporte a').all()) {
    await expect(enlace).toHaveAttribute('target', '_blank')
    await expect(enlace).toHaveAttribute('rel', /noopener/)
  }
})

test('el HTML servido no tiene mail, ni r2.dev, ni apodos (R6.3, R1.3, D7)', async ({ request }) => {
  const html = await (await request.get('/')).text()
  expect(html).not.toMatch(/mailto:|[\w.-]+@[\w-]+\.\w+/)
  expect(html).not.toMatch(/r2\.dev|r2\.cloudflarestorage/)
  expect(html).not.toMatch(/Cacho|Chuzamun|Kawaii/)
})

test('no quedan cookies ni datos locales tras visitar y descargar (R2.8, §7.1)', async ({ page, context }) => {
  await page.goto('/?ref=whatsapp')
  await page.locator('#descargar').scrollIntoViewIfNeeded()
  await Promise.all([page.waitForEvent('download'), botonDescarga(page).click()])
  expect(await context.cookies('http://localhost:8788')).toEqual([])
  const almacenado = await page.evaluate(() => localStorage.length + sessionStorage.length)
  expect(almacenado).toBe(0)
})

test('metadatos para compartir (R5)', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'es-AR')
  await expect(page).toHaveTitle('Movimiento — Libro de fotografías sobre prácticas corporales')
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og-1200x630\.jpg$/)
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/)
})

test('sin scroll horizontal (360 px y escritorio)', async ({ page }) => {
  await page.goto('/')
  const sobra = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(sobra).toBeLessThanOrEqual(0)
})

test('todas las fotos tienen texto alternativo (§7)', async ({ page }) => {
  await page.goto('/')
  const sinAlt = await page.locator('img:not([alt])').count()
  expect(sinAlt).toBe(0)
})
