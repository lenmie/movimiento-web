# Plan — Sitio de *Movimiento* (iteración 001)

| | |
|---|---|
| **Origen** | [`spec.md`](./spec.md) v1.2 (aprobado) |
| **Etapa** | Build |
| **Responsable** | Javi |

Cada tarea indica los requisitos del spec que cubre. Un commit por tarea.

## Stack

- **Front:** Vite + React 19 + TypeScript, app de una sola página renderizada en el navegador
  (el sitio requiere JavaScript, R1.6). Metadatos de compartir escritos en `index.html` (R5).
- **Back:** Cloudflare Pages Functions (`functions/`) + D1 (contador) + R2 (PDF) + Turnstile (§5.2).
- **Fuentes:** Libre Bodoni y Poppins servidas desde el propio sitio (`@fontsource`), sin pedidos a
  Google (§7 Privacidad).
- **Node 20** (versiones de dependencias compatibles: Vitest 4, Wrangler 4.86, pdfjs 4).
- **Tests:** Vitest (lógica del cliente y Functions con dobles de D1/R2) + Playwright contra
  `wrangler pages dev` (sitio + Functions + D1/R2 locales).

## Estructura

```
assets/              originales: fotos/ y fotos.json (no se publican tal cual)
public/assets/       logo/ y compartir/ (se publican tal cual)
public/img/          variantes AVIF/WebP generadas (no se versionan)
src/                 app React: components/, lib/, content/, styles/
functions/           /descargar, /api/contador, /aporte/:plataforma
migrations/          esquema D1
scripts/             extract-text, images, hooks/pre-commit, dev-setup
tests/               unit/, functions/, e2e/
```

## Tareas

| # | Tarea | Requisitos |
|---|---|---|
| T1 | Este plan | — |
| T2 | Reglas del repo: `CLAUDE.md`, `.gitignore`, hook pre-commit (sin `.pdf` ni imágenes > 400 KB), andamiaje Vite/React/TS | §7 Repositorio |
| T3 | Texto del libro: `scripts/extract-text.mjs` (pdfjs) → `src/content/contenido.json`, **textual**, para revisión de Brisa | §3, §7 Contenido |
| T4 | Imágenes: `scripts/images.mjs` (sharp) → AVIF/WebP 480/960/1600, ≤ 250 KB, manifiesto de medidas; componente `<Foto>` | §6.2 |
| T5 | Componentes S1–S8, tokens §6.1, títulos espejados, invitación a recorrer, panel de agradecimiento | §3, R3, R4, R7, §6 |
| T6 | Lógica del cliente: origen (`?ref=`), Turnstile, descarga, contador, mail | R1, R2, R3, R6 |
| T7 | Functions + migración D1 | R1, R2, R3, §5 |
| T8 | Tests: cada criterio de aceptación del spec | todos |

## Decisiones de implementación

- `/descargar` entrega el PDF **antes** de validar el token: la verificación con Turnstile y la
  escritura en D1 corren en `waitUntil`, así nunca demoran ni frenan la descarga (R1.5).
- D1 no admite `BEGIN`/`COMMIT` desde un Worker: el `INSERT` y el `UPDATE` van en `DB.batch()`, que es
  atómico (§5.1). La migración crea la fila inicial de `totales`.
- `HEAD /descargar` responde solo encabezados y nunca cuenta (R2.4).
- Nada se guarda en el dispositivo: ni cookies, ni `localStorage`, ni `sessionStorage` (§7.1). El
  origen (`?ref=`) vive en memoria mientras la pestaña está abierta.
- `--color-texto-2` queda fijo en `rgba(255,255,255,.72)` (dentro del rango de §6.1).
- `fotos.json` tiene `apodo`: el sitio lo ignora (D7).
- Cloudflare Web Analytics se activa desde el panel de Pages (inserta su propio script); no va en el código.

## Pendiente de terceros (el código usa valores de prueba)

| Qué | Dónde se configura |
|---|---|
| Proyecto Pages, base D1 + migración, bucket R2 + PDF web, claves Turnstile | Cloudflare / `wrangler.toml` / variables de Pages |
| Enlaces de Cafecito y Mercado Pago (D3) | `CAFECITO_URL`, `MERCADOPAGO_URL` |
| Mail de Brisa (D13) | `src/content/contenido.json` → `contacto` |
| Exportar la edición web del PDF (D1) | Brisa |
| Revisión de `contenido.json` y textos alternativos | Brisa |

## Verificación

- `npm test` (unitarios + Functions) y `npm run test:e2e` (Playwright contra `wrangler pages dev`).
- A mano: `npm run preview:cf`, recorrer la página, descargar, ver que el contador suba y aparezca el
  panel, revisar en DevTools que no haya cookies ni almacenamiento.
