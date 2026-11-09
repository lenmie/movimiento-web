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

const TITULOS = '.practica__titulo, .seccion__titulo'
const QUIETOS = '.practica__titulo, .practica__numeral, .seccion__titulo'

test('sin movimiento reducido, los nombres de las prácticas salen de atrás con el scroll (R4.1, R4.4)', async ({
  page,
}) => {
  await page.goto('/')
  const animacion = (els: Element[]) => els.map((el) => getComputedStyle(el).animationName)
  expect(await page.locator('.practica__nombre').evaluateAll(animacion)).toEqual(Array(3).fill('salir-de-atras'))
  // El numeral y los títulos de Protagonistas, Autora y El Libro no se mueven.
  expect(await page.locator(QUIETOS).evaluateAll(animacion)).toEqual(Array(9).fill('none'))

  // Antes de llegar, el nombre Danza está escondido arriba de su sección (detrás de las fotos de Acrobacia).
  const escondido = await page.locator('#titulo-danza .practica__nombre').evaluate((el) => {
    const borde = el.closest('section')!.getBoundingClientRect().top
    return el.getBoundingClientRect().bottom <= borde + 1
  })
  expect(escondido).toBe(true)
})

test.describe('con movimiento reducido', () => {
  test.use({ colorScheme: 'dark', reducedMotion: 'reduce' })

  test('los títulos están en su lugar desde el inicio y la flecha no se anima (R4.3, R7.2)', async ({ page }) => {
    await page.goto('/')
    const desplazados = await page
      .locator('.practica__nombre')
      .evaluateAll((els) => els.filter((el) => getComputedStyle(el).translate !== 'none').length)
    expect(desplazados).toBe(0)
    expect(await page.locator('.invitacion__flecha svg').evaluate((el) => getComputedStyle(el).animationName)).toBe(
      'none',
    )
  })

  test('nada empieza invisible (R10.5)', async ({ page }) => {
    await page.goto('/')
    const invisibles = await page
      .locator('.aparece')
      .evaluateAll((els) => els.filter((el) => getComputedStyle(el).opacity !== '1').length)
    expect(invisibles).toBe(0)
  })
})

test.describe('aparición con fundido (R10)', () => {
  const opacidad = (el: Element) => getComputedStyle(el).opacity

  test('el hero aparece al cargar y lo de abajo espera a que se llegue (R10.1)', async ({ page }) => {
    await page.goto('/')
    await expect.poll(() => page.locator('.hero__titulo').evaluate(opacidad)).toBe('1')

    const texto = page.locator('.autora__textos p.aparece').first()
    expect(await texto.evaluate(opacidad)).toBe('0')
    await texto.scrollIntoViewIfNeeded()
    await expect.poll(() => texto.evaluate(opacidad)).toBe('1')
  })

  test('los títulos de sección no se funden (R10.3)', async ({ page }) => {
    await page.goto('/')
    const opacidades = await page.locator(TITULOS).evaluateAll((els) => els.map((el) => getComputedStyle(el).opacity))
    expect(opacidades).toEqual(Array(6).fill('1'))
  })

  test('el botón de descarga no se funde (R10.4)', async ({ page }) => {
    await page.goto('/')
    await page.locator('#descargar').scrollIntoViewIfNeeded()
    const visible = await botonDescarga(page).evaluate((el) => {
      let total = 1
      for (let e: Element | null = el; e; e = e.parentElement) total *= Number(getComputedStyle(e).opacity)
      return total
    })
    expect(visible).toBe(1)
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

test('en pantallas altas la foto de portada es una banda arriba; la del cierre siempre llena la sección (§6.2)', async ({
  page,
}) => {
  await page.goto('/')
  const { width, height } = page.viewportSize()!
  for (const [seccion, foto, banda] of [
    ['.hero', '.hero__foto', height > width],
    ['.cierre', '.cierre__fondo', false],
  ] as const) {
    // Las dos medidas juntas: entre una y otra la página se puede mover mientras cargan las fotos.
    const [s, f] = await page.evaluate(
      (sel) => sel.map((x) => document.querySelector(x)!.getBoundingClientRect().toJSON() as DOMRect),
      [seccion, foto],
    )
    expect(f.width).toBeCloseTo(s.width, 0)
    expect(f.y).toBeCloseTo(s.y, 0)
    expect(f.height).toBeCloseTo(banda ? Math.min(1.35 * width, 0.75 * height) : s.height, 0)
  }
})

test('todas las fotos tienen texto alternativo (§7)', async ({ page }) => {
  await page.goto('/')
  const sinAlt = await page.locator('img:not([alt])').count()
  expect(sinAlt).toBe(0)
})
