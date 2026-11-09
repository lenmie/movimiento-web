# Spec — Sitio de *Movimiento*

| | |
|---|---|
| **Estado** | v1.5 — diseño cerrado por Javi; revisión técnica (captcha, plan gratuito, sin cookies, sin métricas de éxito); v1.2: JS obligatorio (app React), sin metas de rendimiento por ahora; v1.3: títulos, textos y fotos aparecen con un fundido (R10); v1.4: los nombres de las prácticas salen de atrás de la sección anterior con paralaje (R4); ningún título se da vuelta ni se funde; v1.5: en teléfonos, la foto de la portada es una banda arriba que se funde con el negro, en vez de llenar la pantalla (§6.2); pendiente de aprobación de Brisa (§11) |
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
interferir, un **aporte voluntario**. Estética: fondo oscuro, fotos en blanco y negro (a sangre en la portada y el cierre),
el logotipo y las tipografías del libro (Libre Bodoni + Poppins). Las fotos de las prácticas son
mayormente **inéditas**, para mostrar algo que no está en el libro e invitar a descargarlo.

---

## 2. Personas y escenarios

| # | Quién | Contexto | Lo que necesita |
|---|---|---|---|
| E1 | Practicante de un espacio (ej. Casa Ludika) | Abre el link desde una historia de Instagram o un grupo de WhatsApp, en el celular, con datos móviles | Entender qué es en 5 segundos y descargar sin buscar el botón |
| E2 | Docente / jurado / comunidad académica | Escritorio, llega desde un mail o la memoria académica | Créditos, nota editorial, contexto del TIF; poder pedir la edición para impresión |
| E3 | Alguien a quien el libro le gustó | Ya descargó o está por hacerlo | Una forma simple de hacer un aporte |
| E4 | Quien comparte el link | Pega la URL en WhatsApp / Instagram | Que la vista previa muestre la tapa y el título |

---

## 3. Estructura de la página

Orden de secciones (de arriba hacia abajo). La columna *Fuente* indica de dónde sale el contenido.

Dirección visual: **"Suspensión"** (borrador previo de Claude Design, opción 2a), adaptada: fondo oscuro,
fotos a sangre en la portada y el cierre, tipografía grande sobre imagen, un recorrido por las tres prácticas del libro.

**La página es un adelanto que se recorre de arriba abajo:** no hay botones arriba. Todos los
botones (descarga, aporte, pedido por mail) están en el cierre (S8). El hero invita a bajar (R7).

| # | Sección | Contenido | Fuente |
|---|---|---|---|
| S1 | **Portada (hero)** | Foto inédita a sangre · logotipo "MOVIMIENTO" (SVG) · "Libro de fotografías sobre prácticas corporales" · invitación a recorrer (R7). **Sin botones ni contador** | Foto inédita |
| S2 | **Cita de apertura** | Te invito a sumergirte en estas páginas… (fragmentos) | Pág. 7 |
| S3 | **I Contorsión** | Título con paralaje (R4), texto, cronología, foto ancha + grilla de 4 verticales | Texto: págs. 29–40 · Fotos: inéditas + 1 del libro |
| S4 | **II Acrobacia aérea** | Título con paralaje, texto, cronología, foto ancha + fila de 2 + grilla de 3 cuadradas | Texto: págs. 57–72 · Fotos: inéditas |
| S5 | **III Danza** | Título con paralaje, texto, cronología, foto ancha + grilla de 3 cuadradas | Texto: págs. 91–102 · Fotos: 2 inéditas + 2 del libro |
| S6 | **Protagonistas** | 10 retratos con nombre (D7) | Págs. 122–127 |
| S7 | **La autora y créditos** | Retrato, bio factual, créditos, agradecimientos, memoria académica | Págs. 2, 122, 128 |
| S7b | **El Libro** | 5 fotos del libro impreso (R9), sin botones | Fotos del libro impreso |
| S8 | **Cierre: el libro** (`#descargar`) | Foto inédita a sangre con velo · "El libro · Descarga libre y gratuita" · logotipo blanco · **botón Descargar** · contador · pedido de la edición para impresión (R6) y botón de Instagram (R8) · aporte voluntario con Cafecito / Mercado Pago (`#aporte`, R3) · "Gracias por haber estado disponible para observar." | Cita: pág. 119 |

No hay barra fija ni botones flotantes: la única forma de descargar es llegar al cierre.

Todos los textos citan el libro textualmente. Las únicas secciones de contenido son las tres prácticas;
los conceptos del libro (Habitar, Comunidad, Confianza, Proceso, Frustración | Logro, Libertad) no se
incluyen en el sitio.

### 3.1 Wireframe — móvil (360 px)

```
┌──────────────────────────────┐
│ BRISA JAZMÍN ARREGUI   2026  │
│                              │
│  [foto inédita a sangre,     │
│   banda de arriba que se     │
│   funde con el negro, §6.2]  │
│ MOVIMIENTO  (logotipo SVG)   │
│ Libro de fotografías sobre   │
│ prácticas corporales         │
│ (↓) RECORRÉ EL LIBRO         │  ← R7, sin botones
│     Al final, podés          │
│     descargarlo completo     │
├──────────────────────────────┤
│ Te invito a sumergirte…      │  S2
├──────────────────────────────┤
│ I  Contorsión                │  S3 · título con paralaje (R4)
│ texto · cronología           │
│ [foto ancha]                 │
│ [vert][vert]                 │
│ [vert][vert]                 │
├──────────────────────────────┤
│ II Acrobacia aérea           │  S4 · mismo patrón
├──────────────────────────────┤
│ III Danza                    │  S5 · mismo patrón
├──────────────────────────────┤
│ Protagonistas                │  S6
│ La autora y créditos         │  S7
├──────────────────────────────┤
│ El Libro (5 fotos)           │  S7b · R9
├──────────────────────────────┤
│ [foto a sangre con velo]     │  S8 · cierre
│ EL LIBRO · DESCARGA GRATUITA │
│ MOVIMIENTO (logotipo)        │
│ ┌──────────────────────────┐ │
│ │ ↓ DESCARGAR LIBRO  33 MB │ │  ← R1, único botón de descarga
│ └──────────────────────────┘ │
│ 1.284 descargas              │  ← R2
│ ¿Querés una copia impresa?   │  ← R6
│ [ESCRIBIME]                  │
│ [ícono INSTAGRAM]            │  ← R8
│ ────────                     │
│ Aporte voluntario            │
│ [Cafecito] [Mercado Pago]    │  ← R3
│ Gracias por haber estado…    │
└──────────────────────────────┘
```

### 3.2 Wireframe — escritorio (≥ 1024 px)

```
┌───────────────────────────────────────────────────────────┐
│ BRISA JAZMÍN ARREGUI                      ARGENTINA · 2026 │
│                                                           │
│            [foto inédita a sangre, ~880 px de alto]       │
│                                                           │
│ MOVIMIENTO  (logotipo SVG, casi todo el ancho)            │
│ Libro de fotografías sobre prácticas corporales           │
│ (↓) RECORRÉ EL LIBRO · Al final, podés descargarlo        │
├───────────────────────────────────────────────────────────┤
│ I  Contorsión                                             │
│ texto (≈ 2/3)                         │ cronología (≈ 1/3) │
│ [foto ancha, con margen a los costados]                   │
│ [vert] [vert] [vert] [vert]                               │
├───────────────────────────────────────────────────────────┤
│ II y III con el mismo patrón · Protagonistas (5 × 2) ·    │
│ La autora y créditos                                      │
├───────────────────────────────────────────────────────────┤
│                 El Libro (5 fotos, R9)                    │
├───────────────────────────────────────────────────────────┤
│              [foto a sangre con velo, centrado]           │
│              EL LIBRO · DESCARGA LIBRE Y GRATUITA         │
│                    MOVIMIENTO (logotipo)                  │
│              [↓ DESCARGAR LIBRO · PDF 33 MB]              │
│                     1.284 descargas                       │
│                ¿Querés una copia impresa?                 │
│              [ESCRIBIME] [ícono INSTAGRAM]                │
│                        ────────                           │
│     Si te gustó… aporte voluntario  [Cafecito] [M. Pago]  │
│          Gracias por haber estado disponible…             │
└───────────────────────────────────────────────────────────┘
```

Las medidas y estados exactos están en el canvas de referencia (página completa, tres pantallas
móviles —inicio, cierre y después de descargar—, hoja de estados y vista previa al compartir).

---

## 4. Requisitos funcionales

### R1 — Descarga

- R1.1 Hay **un solo botón de descarga**, en el cierre (S8). Dice **"Descargar libro"** y muestra
  formato y peso ("PDF · 33 MB").
- R1.2 Apunta a `GET /descargar`. Se ofrece **una sola edición**: la web (33 MB, D1).
  La edición para impresión no se publica; se pide por mail (R6). Al hacer click, el script agrega el token de verificación (R2.4) y el origen (R2.7) a la URL.
- R1.3 El Worker registra la descarga si corresponde (R2) y **sirve el PDF directamente desde R2**
  (binding del Worker, en streaming). El bucket no es público: no se usa `r2.dev` ni dominio propio,
  y la dirección real del archivo nunca llega al navegador, así que toda descarga pasa por
  `/descargar` (D12).
- R1.4 El archivo se sirve con `Content-Disposition: attachment; filename="Movimiento - Brisa Jazmin Arregui.pdf"`.
- R1.5 **Si el registro o la verificación fallan, la descarga igual ocurre.** La descarga nunca depende del contador ni del captcha.
- R1.6 El botón es un `<a href>` real. El sitio requiere JavaScript (app React).

**Aceptación**
- [ ] El hero no tiene botones; el botón de descarga aparece una sola vez, en S8.
- [ ] Click → comienza la descarga del archivo correcto en < 2 s (red 4G simulada).
- [ ] Con la base de datos caída, `/descargar` igual entrega el PDF.
- [ ] Con un token inválido o sin token, `/descargar` igual entrega el PDF.
- [ ] Ninguna respuesta ni página del sitio contiene una URL de `r2.dev` ni del bucket.

### R2 — Contador

- R2.1 **Qué se cuenta:** cada solicitud `GET /descargar` con un **token de captcha válido** (R2.4).
  Es una *descarga iniciada por una persona*, no una descarga completada ni una persona única
  (sin cookies no se puede deduplicar, §7.1).
- R2.2 **Lectura:** `GET /api/contador` → `{ "descargas": 1284 }`. Caché de 60 s en el borde.
  Lee **una sola fila** (tabla `totales`), nunca `COUNT(*)`: así las lecturas no crecen con las descargas (§5.2).
- R2.3 **Presentación:** formato es-AR con separador de miles ("1.284 descargas"; "1 descarga").
  Tras hacer click, la página suma +1 localmente (optimista) sin volver a pedir el dato.
- R2.4 **Captcha (Cloudflare Turnstile):**
  - Widget en modo **invisible**: la persona no ve ni resuelve nada. Como el botón está al final
    y el recorrido puede durar más de 5 minutos, el widget se ejecuta cuando el cierre (S8) entra
    en pantalla, con `refresh-expired: 'auto'` para renovar el token si vence.
  - Al hacer click en Descargar, el script agrega el token a la URL (`&t=<token>`) y luego pide uno
    nuevo (`turnstile.reset()`), porque cada token sirve una sola vez y vence a los 300 s.
  - El Worker valida el token contra `siteverify` (secreto en variable de entorno). Solo si es válido, suma.
  - *Pre-clearance* desactivado: Turnstile no emite la cookie `cf_clearance`.
  - Si Turnstile no carga (por ejemplo, un bloqueador), el enlace funciona igual y la descarga no se cuenta.
  - Las solicitudes `HEAD` nunca se cuentan.
- R2.5 **Falla:** si `/api/contador` falla o tarda > 3 s, el número **no se muestra** (nunca "0" ni un spinner eterno).
- R2.6 **Umbral (D5):** mientras el total sea < 50, no se muestra el número.
- R2.7 **Origen del tráfico:** los enlaces que se comparten llevan `?ref=` (`instagram`, `whatsapp`,
  `facebook`, `mail`, `qr`). La página pasa ese valor a `/descargar`. Valores fuera de la lista →
  `otro`; sin `ref` → `directo`. No se usa el encabezado `Referer` (las apps lo suelen borrar).
- R2.8 **Privacidad:** no se guarda IP, ni user-agent, ni cookies, ni nada en el dispositivo (§7.1).
  Solo fecha/hora y origen.

**Aceptación**
- [ ] 1 click humano con token válido → total +1.
- [ ] Solicitud sin token, o con un token ya usado → PDF entregado, total sin cambio.
- [ ] `/api/contador` devuelve 500 → la página muestra el botón sin número.
- [ ] Total 1284 se ve como "1.284 descargas".
- [ ] Visitar `/?ref=instagram` y descargar → la fila guarda `origen = 'instagram'`.
- [ ] Ninguna respuesta del sitio incluye `Set-Cookie`, y el navegador no guarda cookies ni datos locales después de visitar y descargar.

### R3 — Aporte voluntario

- R3.1 **Dónde:** (a) dentro del cierre S8, debajo de la descarga (`#aporte`); (b) panel de agradecimiento que aparece **después** del
  click en Descargar: "¡Gracias! Tu descarga está en camino. Si querés apoyar el proyecto,
  podés hacer un aporte voluntario." con los botones y un "Cerrar".
- R3.2 El panel **no** bloquea ni retrasa la descarga, **no** es modal de pantalla completa,
  se cierra con Esc / botón, y aparece **cada vez** que se hace click en Descargar
  (no hay memoria entre clicks ni entre visitas, §7.1).
- R3.3 Los botones apuntan a `GET /aporte/cafecito` y `GET /aporte/mercadopago`, que registran
  el click y responden 302 al enlace externo (abre en pestaña nueva).
- R3.4 Sin montos sugeridos ni lenguaje de urgencia. Texto: "aporte voluntario".
- R3.5 Si se elige una sola plataforma (D3), se muestra un solo botón.

**Aceptación**
- [ ] El panel aparece tras el click y la descarga ya comenzó.
- [ ] Cerrar el panel y volver a descargar → el panel aparece de nuevo.
- [ ] Cada botón lleva al enlace externo correcto y suma 1 a su contador interno.

### R4 — Títulos con paralaje

Referencia: el scroll por capas (paralaje): lo de adelante se mueve más rápido que lo de atrás,
y eso da profundidad. Reemplaza al título espejado de v1.3.

- R4.1 Los nombres de las tres prácticas (Contorsión, Acrobacia aérea, Danza) arrancan escondidos
  detrás del borde de arriba de su sección, es decir, detrás de lo que queda arriba (las fotos de
  la sección anterior; para Contorsión, la cita). A medida que se hace scroll bajan hasta su lugar
  más lento que la página, como si salieran de abajo de las fotos. Recorren su alto, el aire de
  arriba de la sección y el lugar del numeral mientras la sección entra a la pantalla (animación
  ligada al scroll, `animation-timeline`).
- R4.2 Es solo un desplazamiento visual: el texto del HTML siempre es el real y el nombre no cambia
  de forma ni de tamaño.
- R4.3 Sin soporte de animaciones por scroll, o con `prefers-reduced-motion: reduce`, los nombres
  están en su lugar desde el inicio.
- R4.4 Es el único efecto de los títulos: no se dan vuelta ni se funden (R10.3). Los numerales
  (I · II · III) y los títulos de Protagonistas, Autora y El Libro quedan quietos.

**Aceptación**
- [ ] Al hacer scroll, el nombre Danza sale de abajo de las fotos de Acrobacia aérea.
- [ ] Los numerales y los títulos de Protagonistas, Autora y El Libro no se mueven.
- [ ] Un lector de pantalla lee los títulos reales.
- [ ] Con movimiento reducido, todos los nombres están en su lugar desde el inicio.

### R5 — Compartir

- R5.1 Metadatos Open Graph y Twitter Card: título "Movimiento — Libro de fotografías sobre
  prácticas corporales", descripción de una línea, imagen 1200 × 630: foto de tapa + logotipo blanco.
- R5.2 `lang="es-AR"`, `<title>` y `meta description` definidos.

**Aceptación**
- [ ] La vista previa en WhatsApp muestra imagen, título y descripción.

### R6 — Pedido de la edición para impresión

- R6.1 Entre el botón de descarga y el aporte voluntario del cierre (S8): **"¿Querés una copia impresa?"**
  y un botón secundario **"Escribime"**. No se muestra mientras falte la dirección (D13).
- R6.2 El botón abre un `mailto:` a la dirección de Brisa (D13), con asunto y cuerpo precargados:
  asunto *"Movimiento — edición para impresión"*, cuerpo *"Hola Brisa, quisiera la edición para
  impresión de Movimiento para…"*. Abre la app de correo de la persona; el sitio no guarda nada.
- R6.3 La dirección no aparece escrita en el HTML: el script arma el `mailto:` al hacer click, para
  que los recolectores automáticos de mails no la encuentren.
- R6.4 El archivo de 399 MB **no se sube** a R2: Brisa lo envía por su cuenta (por ejemplo, con un
  enlace de Drive o WeTransfer).

**Aceptación**
- [ ] Click → se abre un mail nuevo dirigido a Brisa, con el asunto y el cuerpo precargados.
- [ ] El HTML servido no contiene la dirección de mail en texto plano ni en un `href`.

### R7 — Invitación a recorrer

La página funciona como adelanto: se descubre bajando, y la descarga es la recompensa del final.

- R7.1 En el hero, debajo de la bajada, una indicación sutil (ni enlace ni botón): ícono de flecha en un círculo
  de 1 px + **"Recorré el libro"** + *"Al final, podés descargarlo completo"*. No se puede tocar: la persona
  baja por su cuenta, con el scroll.
- R7.2 La flecha se mueve suave hacia abajo (7 px, ciclo de 2,6 s). Con `prefers-reduced-motion`, queda quieta.
- R7.3 El resto de la invitación la hacen las secciones: numerales I · II · III, nombres de las prácticas
  que salen de atrás de las fotos al hacer scroll (R4) y textos y fotos que aparecen con un fundido (R10). No hay botones flotantes,
  barras fijas ni ventanas emergentes.

**Aceptación**
- [ ] La invitación se ve en el hero y no es un enlace ni un botón: tocarla no mueve la página.
- [ ] Con movimiento reducido, la flecha no se anima.

### R8 — Instagram

- R8.1 En el cierre (S8), al lado de "Escribime" y del mismo tamaño (en teléfono, debajo), un botón secundario con el ícono de Instagram
  (dibujado en SVG, sin scripts de terceros) y la palabra **"Instagram"** al lado, que abre `https://www.instagram.com/movimiento.libro/` en una
  pestaña nueva, con `rel="noopener"`.
- R8.2 Para lectores de pantalla se llama **"Seguir a Movimiento en Instagram"**.

**Aceptación**
- [ ] Click → se abre el perfil de Instagram en una pestaña nueva.

### R9 — Fotos del libro impreso

- R9.1 Entre la autora (S7) y el cierre (S8), la sección **"El Libro"** muestra 5 fotos del libro impreso:
  una ancha y dos filas de dos (en teléfono, una debajo de la otra).
- R9.2 Sirve para que se entienda qué se descarga: el botón de descarga sigue siendo uno solo, en S8.

**Aceptación**
- [ ] Las fotos aparecen justo antes del cierre.

### R10 — Aparición con fundido

Referencia: el sitio de Brisa en Canva (`bybrisajazmin.my.canva.site/sitio-web-arregui-brisa-junio-2026`),
donde cada página entra con un fundido suave: primero la foto, enseguida el título y después el texto.

- R10.1 Textos y fotos aparecen con un fundido de opacidad (de 0 a 1 en 0,9 s, desacelerando)
  la primera vez que entran en pantalla. No se desplazan ni cambian de tamaño. El hero lo hace al cargar.
- R10.2 Los que entran juntos se escalonan 0,12 s en el orden de la página (como máximo 0,48 s).
  Una foto espera a terminar de cargar antes de aparecer.
- R10.3 Los títulos de sección (con su numeral) no se funden; los nombres de las prácticas entran
  con paralaje (R4).
- R10.4 Los botones y el contador del cierre (S8) no se funden: se ven sin esperar ninguna animación.
- R10.5 Con `prefers-reduced-motion: reduce`, sin `IntersectionObserver` o al imprimir, todo se ve
  desde el inicio.

**Aceptación**
- [ ] Al cargar, la foto, el logotipo, la bajada y la invitación del hero aparecen con un fundido.
- [ ] Un texto o una foto todavía no vistos están invisibles y se ven al llegar a ellos.
- [ ] Los títulos de sección se ven sin fundido.
- [ ] El botón de descarga está a la vista sin esperar ninguna animación.
- [ ] Con movimiento reducido, nada empieza invisible.

---

## 5. Contratos de API

| Método y ruta | Respuesta | Efecto |
|---|---|---|
| `GET /descargar?t=<token>&ref=<origen>` | `200` + PDF completo en streaming desde R2 · `Content-Disposition: attachment` | Si el token es válido: inserta en `descargas` y suma 1 en `totales` |
| `GET /api/contador` | `200 { "descargas": number }` · `Cache-Control: public, max-age=60` | Lee 1 fila de `totales` |
| `GET /aporte/:plataforma` (`cafecito`\|`mercadopago`) | `302 Location: <enlace externo>` · otra → `404` | Inserta en `clics_aporte` |

### 5.1 Modelo de datos

```sql
CREATE TABLE descargas (
  id         INTEGER PRIMARY KEY,
  creada_en  TEXT NOT NULL,      -- ISO 8601, UTC
  origen     TEXT NOT NULL       -- 'instagram' | 'whatsapp' | 'facebook' | 'mail' | 'qr' | 'otro' | 'directo'
);

-- Total precalculado: el contador público lee una fila, no recorre "descargas".
CREATE TABLE totales (
  clave  TEXT PRIMARY KEY,       -- 'descargas'
  valor  INTEGER NOT NULL
);

CREATE TABLE clics_aporte (
  id         INTEGER PRIMARY KEY,
  creada_en  TEXT NOT NULL,
  plataforma TEXT NOT NULL       -- 'cafecito' | 'mercadopago'
);
```

Cada descarga contada hace dos escrituras en una misma transacción (`INSERT` en `descargas` +
`UPDATE totales SET valor = valor + 1`).

### 5.2 Infraestructura: todo en planes gratuitos

**Costo de operación: $0.** Ningún servicio puede requerir plan pago. Única excepción a "sin tarjeta": R2 exige
registrar un medio de pago (tarjeta o PayPal) para activarse; queda registrado, pero el uso se mantiene
dentro del límite gratuito y no se cobra nada (D14).

| Servicio | Uso | Límite gratuito relevante (verificado oct. 2026) | Holgura |
|---|---|---|---|
| Cloudflare Pages | Sitio estático, subdominio `*.pages.dev` | Requests estáticos sin límite | — |
| Cloudflare Workers (Pages Functions) | `/descargar`, `/api/contador`, `/aporte/*` | 100.000 requests/día · 10 ms de CPU por invocación | El streaming del PDF y `siteverify` son espera de red, no CPU |
| Cloudflare D1 | Base del contador | 5 M filas leídas/día · 100.000 escritas/día · 5 GB | 2 escrituras por descarga → hasta ~50.000 descargas/día |
| Cloudflare R2 | El PDF web (33 MB) | 10 GB · 1 M operaciones A y 10 M B por mes · salida de datos gratis · **requiere medio de pago registrado** (D14) | ~0,03 GB usados |
| Cloudflare Turnstile | Captcha invisible | Gratis | — |
| Cloudflare Web Analytics | Visitas sin cookies | Gratis | — |
| GitHub | Repositorio | Gratis | — |
| Cafecito / Mercado Pago | Enlaces de aporte | Sin costo fijo (cobran comisión sobre cada aporte) | — |

Si en algún momento un límite se acerca, el Worker debe **seguir entregando el PDF**
aunque deje de contar (R1.5).

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
| `--fuente-titulo` | Libre Bodoni (Regular, Italic; Bold Italic solo para el destacado de S2) | Conceptos, prácticas, citas |
| `--fuente-texto` | Poppins (Light 300, Medium 500) | Cuerpo, etiquetas en mayúsculas, botones |
| `--radio` | `0` | Sin bordes redondeados (como el libro) |
| `--espacio-seccion` | `clamp(4.5rem, 9vw, 7rem)` | Aire entre secciones |

- Las dos familias son las del libro y están en Google Fonts.
- El logotipo "MOVIMIENTO" de la tapa está dibujado como trazos (no es una fuente). Se extrajo
  como **SVG** exacto desde la pág. 3 del PDF, en versión tinta y blanca.
- Diseño visual de referencia: canvas "Movimiento — sitio web" (Claude Design).
- Tema único oscuro (dirección "Suspensión"); el panel de agradecimiento invierte a claro.

### 6.2 Fotografía

- Todas las fotos en blanco y negro. Recortes: ancha (3:2, proporción original; la de Danza, recortada arriba: casi 2:1), fila de 2 (3:2),
  cuadrado 1:1, vertical 0,66 y retrato 0,78.
- Solo la portada (S1) y el cierre (S8) van a sangre. Las fotos de las prácticas (S3–S5), Protagonistas
  (S6) y El Libro (S7b) dejan el mismo margen a los costados que el texto.
- En pantallas más altas que anchas (teléfonos), la portada no llena la pantalla con la foto: es una
  banda arriba, a todo el ancho, de 1,35 veces el ancho de alto (sin pasar de 3/4 de la pantalla), que
  se funde con el negro; los textos siguen debajo. Llenando la pantalla, de la foto 3:2 se veía un
  tercio del ancho (una sola de las tres bailarinas); en la banda entra la mitad: las dos bailarinas
  de la derecha enteras y lo más grandes posible sin cortarlas. En escritorio no cambia. El cierre
  sigue con la foto detrás de toda la sección, también en teléfonos.
- Fuente preferida: archivos originales de los fotógrafos; alternativa: exportar desde el PDF.
- El cierre (S8) usa de fondo una inédita: la practicante tendida en el piso, con un velo oscuro que
  se funde con el negro de la página arriba y abajo.
- La portada usa una foto inédita de danza (no la tapa del libro). Contorsión (salvo una) y Acrobacia aérea usan fotos **inéditas** (que no están en el libro), elegidas por
  su tono misterioso (rostros ocultos, sombras, fragmentos, movimiento) para invitar a descargar.
  Danza usa dos inéditas (la foto ancha y una cuadrada) y conserva dos del libro; Protagonistas sigue con fotos del libro.
- Originales en `assets/fotos/` hasta 1800 px de lado. El build genera AVIF con respaldo WebP en
  480 / 960 / 1600 px (`srcset`), ≤ 250 KB cada variante.
- Todas con `width`/`height` declarados y `loading="lazy"` salvo la portada.

### 6.3 Botón principal

- Fondo `--color-texto` (#F2F2F2), texto `--color-fondo`, Poppins Medium 12–15 px (según el ancho) en mayúsculas con
  espaciado .14em, alto mínimo 64 px, ícono ↓ y "PDF · 33 MB" en gris.
- Hover: blanco puro. Foco: contorno de 2 px claro. Tras el click: "Descargando…" 2 s y vuelve.
- Botones secundarios (Aporte, Cafecito, Mercado Pago, Escribime, Instagram): borde 1 px claro, fondo transparente; hover invierte.

---

## 7. Políticas

| Política | Regla | Quién aprueba |
|---|---|---|
| **Contenido e imagen** | Cada foto, texto y nombre publicado está aprobado por Brisa. Créditos de fotografía siempre visibles en S7, incluidas las fotos inéditas. | Brisa |
| **Marca** | Solo tokens de §6; sin colores, sombras ni fuentes nuevas. | Brisa |
| **Accesibilidad** | WCAG 2.2 AA. Contraste ≥ 4.5:1. Todas las fotos con texto alternativo descriptivo (escrito o revisado por Brisa). Navegable por teclado. | Javi |
| **Privacidad** | Sin cookies ni almacenamiento en el dispositivo (ni `localStorage` ni `sessionStorage`), sin IP, sin rastreadores. Analítica: Cloudflare Web Analytics (sin cookies). Ver §7.1. | Javi |
| **Costo** | Todo en planes gratuitos; sin tarjeta, salvo la que exige R2 para activarse, sin cargos (§5.2, D14). | Javi |
| **Rendimiento** | Sin metas de rendimiento en v1 (pospuesto). Fotos fuera de la primera pantalla con `loading="lazy"`. | Javi |
| **Seguridad** | Sin secretos en el repo. Enlaces externos con `rel="noopener"`. Sin JS de terceros salvo la analítica. | Javi |
| **Repositorio** | Ningún `.pdf` ni imagen > 400 KB se sube al repo (bloqueado por hook en Build). | Javi |

### 7.1 Consecuencias de no usar cookies

El sitio no guarda nada en el dispositivo de quien lo visita. Eso simplifica (no hace falta
banner de cookies) pero tiene efectos que el diseño acepta a propósito:

| Efecto | Qué implica | Cómo se maneja |
|---|---|---|
| **No hay memoria entre visitas** | No se puede saber si alguien ya descargó ni mostrarle algo distinto al volver | El panel de aporte aparece en cada descarga (R3.2); la página es igual para todos |
| **No se puede deduplicar** | Si una persona descarga dos veces, cuenta dos | El contador dice "descargas" (iniciadas), no "lectores"; el captcha evita bots, no repeticiones (R2.1) |
| **El +1 optimista vive solo en la pestaña** | Al recargar dentro de los 60 s de caché, el número puede verse 1 menos | Se acepta; no se compensa con almacenamiento local |
| **Turnstile podría guardar datos propios** | Su política no detalla el almacenamiento local | *Pre-clearance* apagado; un test de Build verifica que no quede ninguna cookie ni dato local (R2, aceptación) |
| **Sin consentimiento que pedir** | No hay banner ni pantalla previa | Ventaja: nada se interpone entre la llegada y el botón de descarga |

---

## 8. Métricas

Datos para tener visibilidad de cómo se usa el sitio. **Son informativos: no hay metas**
(`intent.md`). Todos se obtienen sin cookies.

| Dato | Cálculo | Fuente |
|---|---|---|
| Visitas | visitas por día / semana | Cloudflare Web Analytics |
| Descargas | descargas contadas por día / semana | `descargas` |
| Origen del tráfico | descargas por `origen` | `descargas` + enlaces con `?ref=` |
| Clics en aportes | clics por plataforma | `clics_aporte` |

Se consultan directamente en Cloudflare (panel de Web Analytics y consola de D1); no hay panel propio (§9).

---

## 9. Fuera de alcance

Tienda o venta · cuentas de usuario · newsletter · blog · versión en inglés · visor del libro
en la web (flipbook) · pagos integrados · panel de administración (los números se consultan en la base).

---

## 10. Decisiones pendientes

Cada una tiene un valor por defecto; si nadie objeta, el spec avanza con ese valor.

| # | Decisión | Por defecto | Notas |
|---|---|---|---|
| D1 | ¿Qué edición se publica? | **Decidido:** solo la web (33 MB, en dobles páginas). La de impresión (399 MB) se pide por mail (R6) | Brisa exporta la edición web desde InDesign |
| D2 | Infraestructura | **Decidido:** Cloudflare Pages + Workers + D1 + R2 + Turnstile, todo en plan gratuito (§5.2) | — |
| D3 | Plataforma de aporte | Cafecito y Mercado Pago | Recomendación: empezar con la que más use el público de Brisa |
| D4 | Dominio | Subdominio gratuito (`movimiento-2uc.pages.dev`; `movimiento.pages.dev` estaba tomado) | Un dominio propio tiene costo anual: queda fuera mientras rija "todo gratis" |
| D5 | Umbral para mostrar el contador | 50 | Evita mostrar "3 descargas" el primer día |
| D6 | ¿Deduplicar descargas repetidas? | **Decidido:** no | Requeriría cookies o IP, que §7 prohíbe. El captcha filtra bots (R2.4) |
| D7 | Retratos y apodos de protagonistas | Retratos y nombres (como en el libro), sin apodos | Retratos tomados de las págs. 122–127; el rol "Profesora" corresponde a Carla Zabala |
| D8 | ¿Hay URL pública de la memoria académica? | No se enlaza hasta tenerla | — |
| D9 | ¿Versión en inglés? | No (fuera de alcance en `intent.md`) | El borrador "Suspensión" tenía selector ES/EN; se quitó |
| D10 | Créditos de las fotos inéditas | Alejo Azzarini · Isabella Jubany | Confirmar autoría de cada inédita |
| D11 | Foto de portada | **Decidido:** una inédita en alta resolución (reemplaza a la tapa de 945 px del PDF) | La imagen para compartir (R5) sigue usando la tapa |
| D13 | Mail de contacto de Brisa | **Decidido:** cuenta creada solo para el libro; la dirección va partida en `contenido.json` (R6.3) | No se escribe entera en el repo |
| D12 | ¿Quién entrega el PDF? | **Decidido:** el Worker, en streaming desde R2 (R1.3). Sin descargas reanudables: siempre envía el archivo completo | Descartado: redirigir a `r2.dev`. Era más simple, pero expone un enlace público que saltea el contador, y Cloudflare lo marca solo para desarrollo |
| D14 | ¿Medio de pago para R2? | **Decidido:** se registra uno en Cloudflare. R2 no se activa sin tarjeta o PayPal; el uso queda dentro del límite gratuito, sin cargos | Descartado: servir el PDF como archivo de Pages (límite 25 MB por archivo), que cambiaba R1.3 y D12 |

---

## 11. Aprobación

- [ ] Javi — requisitos funcionales, API, políticas técnicas
- [ ] Brisa — contenido, fotos, textos, marca (§3, §6, §7)
