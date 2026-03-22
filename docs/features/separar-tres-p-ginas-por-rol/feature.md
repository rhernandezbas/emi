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

Actualmente caja.html contiene toda la lógica de Skarlet y la organizadora mezclada, con un selector de rol en la misma pantalla. La feature separa el frontend en tres URLs independientes: /escribir.html (invitadas, sin auth), /skarlet.html (festejada, auth por nombre+fecha), /admin.html (organizadora, auth por password). Cada página tiene su propio JS. caja.html y caja.js quedan deprecados o se eliminan. index.html se convierte en landing con links a las tres páginas.