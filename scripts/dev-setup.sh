#!/bin/sh
# Prepara D1 y R2 locales para `wrangler pages dev` (npm run preview:cf, tests e2e).
# El PDF es uno de prueba: el libro real nunca entra al repo (spec §7).
set -e
cd "$(dirname "$0")/.."

npx wrangler d1 migrations apply movimiento --local >/dev/null

tmp=$(mktemp -d)
printf '%%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[]/Count 0>>endobj\ntrailer<</Root 1 0 R>>\n%%%%EOF\n' > "$tmp/libro.pdf"
npx wrangler r2 object put movimiento-libro/movimiento-web.pdf --file "$tmp/libro.pdf" --content-type application/pdf --local >/dev/null
rm -rf "$tmp"
echo "D1 y R2 locales listos"
