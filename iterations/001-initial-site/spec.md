# Spec — Sitio de *Movimiento*

| | |
|---|---|
| **Estado** | v1.0 — diseño cerrado por Javi; pendiente de aprobación de Brisa (§11) |
| **Diseño de referencia** | Canvas "Movimiento — sitio web" (Claude Design) |
| **Origen** | [`intent.md`](./intent.md) |
| **Responsable del spec** | Javi |
| **Dueña de políticas de contenido y marca** | Brisa Jazmín Arregui (autora) |
| **Siguiente etapa** | `plan.md` (Build) — no se escribe código hasta aprobar este spec |

Cada requisito tiene un ID (`R1`, `R2`…) y criterios de aceptación verificables.
En la etapa de Test cada criterio se convierte en al menos un caso de prueba.

---

## 1. Resumen

Una sola página, en español, que presenta el libro de fotografía *Movimiento* y lleva a la
persona a **descargarlo**. Muestra un **contador público de descargas** y ofrece, sin
interferir, un **aporte voluntario**. Estética: fondo oscuro, fotos en blanco y negro a sangre,
el logotipo y las tipografías del libro (Libre Bodoni + Poppins). Las fotos de las prácticas son
mayormente **inéditas**, para mostrar algo que no está en el libro e invitar a descargarlo.

---

## 2. Personas y escenarios

| # | Quién | Contexto | Lo que necesita |
|---|---|---|---|
| E1 | Practicante de un espacio (ej. Casa Ludika) | Abre el link desde una historia de Instagram o un grupo de WhatsApp, en el celular, con datos móviles | Entender qué es en 5 segundos y descargar sin buscar el botón |
| E2 | Docente / jurado / comunidad académica | Escritorio, llega desde un mail o la memoria académica | Créditos, nota editorial, contexto del TIF; edición en alta calidad |
| E3 | Alguien a quien el libro le gustó | Ya descargó o está por hacerlo | Una forma simple de hacer un aporte |
| E4 | Quien comparte el link | Pega la URL en WhatsApp / Instagram | Que la vista previa muestre la tapa y el título |

---

## 3. Estructura de la página

Orden de secciones (de arriba hacia abajo). La columna *Fuente* indica de dónde sale el contenido.

Dirección visual: **"Suspensión"** (borrador previo de Claude Design, opción 2a), adaptada: fondo oscuro,
fotos a sangre, tipografía grande sobre imagen, un recorrido por las tres prácticas del libro.

| # | Sección | Contenido | Fuente |
|---|---|---|---|
| S1 | **Portada (hero)** | Foto de tapa a sangre · logotipo "MOVIMIENTO" (SVG) · "Libro de fotografías sobre prácticas corporales" · **Botón Descargar** · enlace a Aporte · **Contador** | Foto de tapa del libro |
| S2 | **Cita de apertura** | "El único requisito es estar disponible…" | Pág. 7 |
| S3 | **I Contorsión** | Título espejado (R4), texto, cronología, foto ancha + grilla de 4 verticales | Texto: págs. 29–40 · Fotos: inéditas |
| S4 | **II Acrobacia aérea** | Título espejado, texto, cronología, foto ancha + fila de 2 + grilla de 3 cuadradas | Texto: págs. 57–72 · Fotos: inéditas |
| S5 | **III Danza** | Título espejado, texto, cronología, foto ancha + grilla de 3 cuadradas | Texto: págs. 91–102 · Fotos: 1 inédita + 3 del libro |
| S6 | **Cierre** | "Eso que ocurre en estas prácticas no se puede explicar del todo con palabras…" | Pág. 119 |
| S7 | **Protagonistas** | 10 retratos con nombre (D7) | Págs. 122–127 |
| S8 | **La autora y créditos** | Retrato, bio factual, créditos, agradecimientos, memoria académica | Págs. 2, 122, 128 |
| S9 | **El libro / Aporte** (`#aporte`) | Contador grande · Descargar · edición impresión · Cafecito / Mercado Pago (R3) | — |
| — | **Barra fija (solo móvil)** | Aparece al salir S1 del viewport: "Descargar libro · 20 MB" | — |

Todos los textos citan el libro textualmente. Las únicas secciones de contenido son las tres prácticas;
los conceptos del libro (Habitar, Comunidad, Confianza, Proceso, Frustración | Logro, Libertad) no se
incluyen en el sitio.

### 3.1 Wireframe — móvil (360 px)

```
┌──────────────────────────────┐
│ BRISA JAZMÍN ARREGUI   2026  │
│                              │
│  [foto de tapa a sangre,     │
│   pantalla completa]         │
│                              │
│ MOVIMIENTO  (logotipo SVG)   │
│ Libro de fotografías sobre   │
│ prácticas corporales         │
│ ┌──────────────────────────┐ │
│ │ ↓ DESCARGAR LIBRO  20 MB │ │  ← R1, visible sin scroll
│ └──────────────────────────┘ │
│ Aporte voluntario   1.284    │  ← R2
├──────────────────────────────┤
│ “El único requisito es…”     │  S2
├──────────────────────────────┤
│ I  nóisrotnoC → Contorsión   │  S3 · título espejado (R4)
│ texto · cronología           │
│ [foto ancha]                 │
│ [vert][vert]                 │
│ [vert][vert]                 │
├──────────────────────────────┤
│ II Acrobacia aérea           │  S4 · mismo patrón
├──────────────────────────────┤
│ III Danza                    │  S5 · mismo patrón
├──────────────────────────────┤
│ Cierre · Protagonistas       │  S6–S7
│ La autora y créditos         │  S8
├──────────────────────────────┤
│ El libro · 1.284 · Descargar │  S9
│ [Cafecito] [Mercado Pago]    │
└──────────────────────────────┘
 ▓▓ DESCARGAR LIBRO · 20 MB ▓▓   ← barra fija tras salir del hero
```

### 3.2 Wireframe — escritorio (≥ 1024 px)

```
┌───────────────────────────────────────────────────────────┐
│ BRISA JAZMÍN ARREGUI                 LA PLATA · JUNIO 2026 │
│                                                           │
│            [foto de tapa a sangre, ~880 px de alto]       │
│                                                           │
│ MOVIMIENTO  (logotipo SVG, casi todo el ancho)            │
│ Libro de fotografías sobre prácticas corporales           │
│ [↓ DESCARGAR LIBRO · 20 MB]  [APORTE VOLUNTARIO]  1.284   │
├───────────────────────────────────────────────────────────┤
│ I  Contorsión                                             │
│ texto (≈ 2/3)                         │ cronología (≈ 1/3) │
│ [foto ancha a sangre]                                     │
│ [vert] [vert] [vert] [vert]                               │
├───────────────────────────────────────────────────────────┤
│ II y III con el mismo patrón · Cierre · Protagonistas     │
│ (5 × 2) · La autora · El libro: contador grande +         │
│ Descargar + edición impresión + Cafecito / Mercado Pago   │
└───────────────────────────────────────────────────────────┘
```

Las medidas y estados exactos están en el canvas de referencia (página completa, tres pantallas
móviles, hoja de estados y vista previa al compartir).

---

## 4. Requisitos funcionales

### R1 — Descarga

- R1.1 El botón principal dice **"Descargar libro"** y muestra formato y peso ("PDF · 20 MB").
- R1.2 Apunta a `GET /descargar?edicion=web`. Un enlace secundario, de menor jerarquía,
  apunta a `GET /descargar?edicion=impresion` ("Edición para impresión · 399 MB").
- R1.3 El servidor registra la descarga (R2) y responde **302** a la URL del archivo en el
  almacenamiento. El navegador descarga directo del almacenamiento.
- R1.4 El archivo se sirve con `Content-Disposition: attachment; filename="Movimiento - Brisa Jazmin Arregui.pdf"`.
- R1.5 **Si el registro falla, la redirección igual ocurre.** La descarga nunca depende del contador.
- R1.6 El botón es un `<a href>` real: funciona sin JavaScript.

**Aceptación**
- [ ] En 360 × 640 el botón está 100 % visible sin hacer scroll.
- [ ] Click → comienza la descarga del archivo correcto en < 2 s (red 4G simulada).
- [ ] Con la base de datos caída, `/descargar` igual responde 302.
- [ ] Con JS deshabilitado, el botón descarga.

### R2 — Contador

- R2.1 **Qué se cuenta:** cada solicitud `GET /descargar` que recibe 302, excluyendo bots (R2.4).
  Se cuentan ambas ediciones; el número público es la suma.
- R2.2 **Lectura:** `GET /api/contador` → `{ "descargas": 1284 }`. Caché de 60 s en el borde.
- R2.3 **Presentación:** formato es-AR con separador de miles ("1.284 descargas"; "1 descarga").
  Tras hacer click, la página suma +1 localmente (optimista) sin volver a pedir el dato.
- R2.4 **Exclusión de bots:** no se cuentan solicitudes `HEAD`, ni user-agents que coincidan
  con la lista de crawlers y previsualizadores (WhatsApp, facebookexternalhit, Twitterbot,
  TelegramBot, Slackbot, Googlebot, bingbot, curl, etc.).
- R2.5 **Falla:** si `/api/contador` falla o tarda > 3 s, el número **no se muestra** (nunca "0" ni un spinner eterno).
- R2.6 **Umbral (D5):** mientras el total sea < 50, no se muestra el número.
- R2.7 **Privacidad:** no se guarda IP, ni user-agent completo, ni cookies. Solo fecha/hora,
  edición y dominio de referencia (ej. `instagram.com`).

**Aceptación**
- [ ] 1 click humano → total +1.
- [ ] Solicitud con UA `WhatsApp/2.x` → total sin cambio.
- [ ] `/api/contador` devuelve 500 → la página muestra el botón sin número.
- [ ] Total 1284 se ve como "1.284 descargas".

### R3 — Aporte voluntario

- R3.1 **Dónde:** (a) sección S9 (`#aporte`), enlazada desde el hero; (b) panel de agradecimiento que aparece **después** del
  click en Descargar: "¡Gracias! Tu descarga está en camino. Si querés apoyar el proyecto,
  podés hacer un aporte voluntario." con los botones y un "Cerrar".
- R3.2 El panel **no** bloquea ni retrasa la descarga, **no** es modal de pantalla completa,
  se cierra con Esc / botón, y aparece como máximo una vez por visita.
- R3.3 Los botones apuntan a `GET /aporte/cafecito` y `GET /aporte/mercadopago`, que registran
  el click y responden 302 al enlace externo (abre en pestaña nueva).
- R3.4 Sin montos sugeridos ni lenguaje de urgencia. Texto: "aporte voluntario".
- R3.5 Si se elige una sola plataforma (D3), se muestra un solo botón.

**Aceptación**
- [ ] El panel aparece tras el click y la descarga ya comenzó.
- [ ] El panel no aparece en el segundo click de la misma visita.
- [ ] Cada botón lleva al enlace externo correcto y suma 1 a su contador interno.

### R4 — Títulos espejados

Referencia: en el libro los conceptos tienen una página y su reverso con el texto invertido,
como si se viera a través del papel. En el sitio el gesto pasa a los títulos de las tres prácticas.

- R4.1 El título de cada práctica (Libre Bodoni, grande) entra a la pantalla
  **espejado** y gira hasta leerse derecho a medida que se hace scroll
  (animación ligada al scroll, `animation-timeline: view()`).
- R4.2 Es solo una transformación visual: el texto del HTML siempre es el real.
- R4.3 Sin soporte de animaciones por scroll, o con `prefers-reduced-motion: reduce`,
  el nombre se muestra derecho desde el inicio.

**Aceptación**
- [ ] Un lector de pantalla lee "Contorsión", no "nóisrotnoC".
- [ ] Con movimiento reducido, ningún título aparece espejado.

### R5 — Compartir

- R5.1 Metadatos Open Graph y Twitter Card: título "Movimiento — Libro de fotografías sobre
  prácticas corporales", descripción de una línea, imagen 1200 × 630: foto de tapa + logotipo blanco.
- R5.2 `lang="es-AR"`, `<title>` y `meta description` definidos.

**Aceptación**
- [ ] La vista previa en WhatsApp muestra imagen, título y descripción.

---

## 5. Contratos de API

| Método y ruta | Respuesta | Efecto |
|---|---|---|
| `GET /descargar?edicion=web\|impresion` | `302 Location: <url del PDF>` (edición inválida → `web`) | Inserta en `descargas` (si no es bot) |
| `GET /api/contador` | `200 { "descargas": number }` · `Cache-Control: public, max-age=60` | — |
| `GET /aporte/:plataforma` (`cafecito`\|`mercadopago`) | `302 Location: <enlace externo>` · otra → `404` | Inserta en `clics_aporte` |

### 5.1 Modelo de datos

```sql
CREATE TABLE descargas (
  id         INTEGER PRIMARY KEY,
  creada_en  TEXT NOT NULL,      -- ISO 8601, UTC
  edicion    TEXT NOT NULL,      -- 'web' | 'impresion'
  referente  TEXT                -- solo dominio, ej. 'instagram.com'
);

CREATE TABLE clics_aporte (
  id         INTEGER PRIMARY KEY,
  creada_en  TEXT NOT NULL,
  plataforma TEXT NOT NULL       -- 'cafecito' | 'mercadopago'
);
```

---

## 6. Diseño visual

### 6.1 Tokens

| Token | Valor | Uso |
|---|---|---|
| `--color-fondo` | `#0B0B0B` | Fondo de la página |
| `--color-texto` | `#F2F2F2` | Texto, botón principal (fondo claro) |
| `--color-texto-2` | `rgba(255,255,255,.62–.85)` | Texto secundario (nunca menos de .55: contraste AA) |
| `--color-linea` | `rgba(255,255,255,.14)` | Separadores |
| `--velo-foto` | `rgba(0,0,0,.5)` | Velo sobre fotos a sangre con texto encima |
| `--fuente-titulo` | Libre Bodoni (Regular, Italic) | Conceptos, prácticas, citas |
| `--fuente-texto` | Poppins (Light 300, Medium 500) | Cuerpo, etiquetas en mayúsculas, botones |
| `--radio` | `0` | Sin bordes redondeados (como el libro) |
| `--espacio-seccion` | `clamp(4.5rem, 9vw, 7rem)` | Aire entre secciones |

- Las dos familias son las del libro y están en Google Fonts.
- El logotipo "MOVIMIENTO" de la tapa está dibujado como trazos (no es una fuente). Se extrajo
  como **SVG** exacto desde la pág. 3 del PDF, en versión tinta y blanca.
- Diseño visual de referencia: canvas "Movimiento — sitio web" (Claude Design).
- Tema único oscuro (dirección "Suspensión"); el panel de agradecimiento invierte a claro.

### 6.2 Fotografía

- Todas las fotos en blanco y negro. Recortes: a sangre (3:2, proporción original), fila de 2 (3:2),
  cuadrado 1:1, vertical 0,66 y retrato 0,78.
- Fuente preferida: archivos originales de los fotógrafos; alternativa: exportar desde el PDF.
- La portada usa la misma foto de tapa del libro. Contorsión y Acrobacia aérea usan fotos **inéditas** (que no están en el libro), elegidas por
  su tono misterioso (rostros ocultos, sombras, fragmentos, movimiento) para invitar a descargar.
  Danza usa una inédita como foto ancha y conserva tres del libro; Protagonistas sigue con fotos del libro.
- La foto de tapa solo existe en el PDF a 945 px: se ve blanda a ancho completo en escritorio.
  Pedir el archivo original (D11).
- Formato AVIF con respaldo WebP, máx. 1600 px de lado, ≤ 250 KB cada una; `srcset` con 480/960/1600.
- Todas con `width`/`height` declarados y `loading="lazy"` salvo la tapa.

### 6.3 Botón principal

- Fondo `--color-texto` (#F2F2F2), texto `--color-fondo`, Poppins Medium 12 px en mayúsculas con
  espaciado .14em, alto mínimo 52 px, ícono ↓ y "PDF · 20 MB" en gris.
- Hover: blanco puro. Foco: contorno de 2 px claro. Tras el click: "Descargando…" 2 s y vuelve.
- Botones secundarios (Aporte, Cafecito, Mercado Pago): borde 1 px claro, fondo transparente; hover invierte.

---

## 7. Políticas

| Política | Regla | Quién aprueba |
|---|---|---|
| **Contenido e imagen** | Cada foto, texto y nombre publicado está aprobado por Brisa. Créditos de fotografía siempre visibles en S8, incluidas las fotos inéditas. | Brisa |
| **Marca** | Solo tokens de §6; sin colores, sombras ni fuentes nuevas. | Brisa |
| **Accesibilidad** | WCAG 2.2 AA. Contraste ≥ 4.5:1. Todas las fotos con texto alternativo descriptivo (escrito o revisado por Brisa). Navegable por teclado. | Javi |
| **Privacidad** | Sin cookies, sin IP, sin rastreadores de terceros. Analítica: Cloudflare Web Analytics (sin cookies). | Javi |
| **Rendimiento** | Página ≤ 1,5 MB (sin el PDF) · LCP ≤ 2,5 s en 4G · Lighthouse Rendimiento y Accesibilidad ≥ 90. | Javi |
| **Seguridad** | Sin secretos en el repo. Enlaces externos con `rel="noopener"`. Sin JS de terceros salvo la analítica. | Javi |
| **Repositorio** | Ningún `.pdf` ni imagen > 400 KB se sube al repo (bloqueado por hook en Build). | Javi |

---

## 8. Métricas

| Métrica | Cálculo | Fuente |
|---|---|---|
| **Conversión de descarga** (principal) | descargas ÷ visitantes únicos | `descargas` + Web Analytics |
| Descargas por edición | conteo por `edicion` | `descargas` |
| Origen del tráfico | conteo por `referente` | `descargas` |
| Interés en aportes | clics por plataforma ÷ descargas | `clics_aporte` |

---

## 9. Fuera de alcance

Tienda o venta · cuentas de usuario · newsletter · blog · versión en inglés · visor del libro
en la web (flipbook) · pagos integrados · panel de administración (los números se consultan en la base).

---

## 10. Decisiones pendientes

Cada una tiene un valor por defecto; si nadie objeta, el spec avanza con ese valor.

| # | Decisión | Por defecto | Notas |
|---|---|---|---|
| D1 | ¿Qué edición es la principal? | Web (~20 MB) principal + impresión (399 MB) secundaria | Estimado: ~150 KB/página a 150 dpi |
| D2 | Infraestructura | Cloudflare Pages + Worker + D1 + R2 | Alternativa sin backend: GitHub Releases + `download_count` (sin filtro de bots) |
| D3 | Plataforma de aporte | Cafecito y Mercado Pago | Recomendación: empezar con la que más use el público de Brisa |
| D4 | Dominio | Subdominio gratuito (`movimiento.pages.dev`) | Un dominio propio (`.com.ar`) se puede sumar después |
| D5 | Umbral para mostrar el contador | 50 | Evita mostrar "3 descargas" el primer día |
| D6 | ¿Deduplicar descargas repetidas? | No en v1 | Si hiciera falta: hash diario sal+IP+UA descartado a las 24 h |
| D7 | Retratos y apodos de protagonistas | Retratos y nombres (como en el libro), sin apodos | Retratos tomados de las págs. 122–127; el rol "Profesora" corresponde a Carla Zabala |
| D8 | ¿Hay URL pública de la memoria académica? | No se enlaza hasta tenerla | — |
| D9 | ¿Versión en inglés? | No (fuera de alcance en `intent.md`) | El borrador "Suspensión" tenía selector ES/EN; se quitó |
| D10 | Créditos de las fotos inéditas | Alejo Azzarini · Isabella Jubany | Confirmar autoría de cada inédita |
| D11 | Foto de tapa en alta resolución | Se usa la del PDF (945 px) | Conseguir el original antes de publicar |

---

## 11. Aprobación

- [ ] Javi — requisitos funcionales, API, políticas técnicas
- [ ] Brisa — contenido, fotos, textos, marca (§3, §6, §7)
