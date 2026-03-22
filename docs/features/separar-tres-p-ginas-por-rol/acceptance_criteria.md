<!--
## Provenance

### Fuentes de verdad
- public/caja.html
- public/caja.js (antes assets/js/caja.js)
- public/escribir.html
- public/assets/js/escribir.js
- public/assets/js/caja.js
- public/assets/css/styles.css
- public/index.html
- src/routes/auth.js
- src/routes/cartas.js
- docs/adrs/adr-002-privacidad-por-diseno.md
- docs/tdrs/tdr-002-autenticacion-simple.md

### Gaps (decisiones sin respaldo documental)
- Se asume que caja.html puede eliminarse sin romper tests (ningún test referencia su existencia directamente).
- Se asume que index.html puede ser reemplazado por landing sin que ningún test lo valide como redirect.

-->

# Acceptance Criteria

- /escribir.html carga sin errores y permite enviar carta
- /skarlet.html muestra login y tras auth correcta muestra sobres
- /admin.html muestra login y tras auth correcta muestra tabla
- Cada página tiene su propio archivo JS (no comparte bundle)
- index.html tiene links a las tres páginas
- Cobertura: tests existentes (98) siguen pasando
- Los nuevos archivos HTML/JS existen en public/