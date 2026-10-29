-- Esquema del contador (spec §5.1).
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

-- Sin esta fila el UPDATE de cada descarga no tendría qué sumar.
INSERT INTO totales (clave, valor) VALUES ('descargas', 0);
