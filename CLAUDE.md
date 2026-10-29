# Movimiento — sitio web

Sitio de una página que presenta el libro de fotografía *Movimiento* (Brisa Jazmín Arregui) y lleva a
descargarlo. Proceso: intent → spec → plan → build → test, por iteración en `iterations/NNN-*/`.

## Fuente de verdad

- El **spec** de la iteración vigente (`iterations/001-initial-site/spec.md`) manda. Si el código y el
  spec no coinciden, se corrige el código o se propone un cambio al spec; nunca se improvisa.
- Cada requisito tiene un ID (R1, R2…). Commits, tests y comentarios lo citan cuando aplica.

## Reglas de contenido (dueña: Brisa)

- Todo el texto visible está en **español rioplatense** (voseo: "Recorré", "podés").
- Los textos del libro se citan **textualmente** desde `src/content/contenido.json`. Nunca se
  parafrasean, resumen ni inventan. Si falta un texto, se deja un marcador visible y se avisa.
- Nunca se muestra el campo `apodo` de `assets/fotos.json` (D7).
- Créditos de fotografía siempre visibles en S7.

## Reglas de diseño

- Solo los tokens de `src/styles/tokens.css` (spec §6.1). Sin colores, sombras, radios ni fuentes nuevas.
- Fuentes servidas desde el sitio (`@fontsource`), nunca desde Google Fonts.

## Reglas técnicas

- Nada se guarda en el dispositivo: ni cookies, ni `localStorage`, ni `sessionStorage` (§7.1).
- `/descargar` **siempre** entrega el PDF. Contar es secundario y nunca la demora ni la frena (R1.5).
- Ningún `.pdf` ni imagen > 400 KB al repo: lo bloquea `scripts/hooks/pre-commit` (`npm run hooks`).
- Sin secretos en el repo: `TURNSTILE_SECRET` va en `.dev.vars` (local) o en Pages.
- Enlaces externos con `rel="noopener"`.

## Comandos

- `npm run dev` — Vite (front). Para las Functions: `npm run preview:cf` (build + `wrangler pages dev`, puerto 8788).
- `npm test` — Vitest (lógica del cliente y Functions).
- `npm run test:e2e` — Playwright contra `wrangler pages dev`.
- `npm run images` — genera las variantes AVIF/WebP en `public/img/` desde `assets/fotos/`.
- `npm run extract-text -- <ruta al PDF> <salida>` — vuelca el texto de las páginas citadas en el spec.

Node 20: las dependencias están fijadas a versiones compatibles. `.npmrc` usa `legacy-peer-deps`.
