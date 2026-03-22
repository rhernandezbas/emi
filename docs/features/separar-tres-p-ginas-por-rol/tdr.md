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

DECISIÓN: Tres archivos HTML + tres archivos JS independientes (escribir, skarlet, admin).
ALTERNATIVA DESCARTADA: SPA con routing client-side — innecesario para este proyecto sin framework.
ALTERNATIVA DESCARTADA: Mantener caja.html con tabs — genera confusión de UX y mezcla lógica de roles.
CONSECUENCIAS: La lógica de caja.js se divide en skarlet.js y admin.js. Los tests existentes que referencian caja.html necesitan actualizarse si los hay.

## Decisiones técnicas

### DECISIÓN: Separar en 3 HTML + 3 JS | CONFIANZA: 95% | RAZÓN: estructura actual es 2 páginas, la división es directa y el stack es vanilla JS | ALTERNATIVA_DESCARTADA: SPA con router

