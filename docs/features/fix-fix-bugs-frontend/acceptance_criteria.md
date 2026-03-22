<!--
## Provenance

### Fuentes de verdad
- public/assets/js/escribir.js
- public/assets/js/caja.js
- public/escribir.html
- public/caja.html
- public/index.html

### Gaps (decisiones sin respaldo documental)
- No hay ADRs ni docs de arquitectura — todo derivado de lectura directa del código.

-->

# Acceptance Criteria

- escribir.js verifica res.ok antes de parsear JSON
- cargarCartas() notifica al usuario cuando res no es ok
- La tabla de organizadora muestra '–' en lugar de "Invalid Date" para fechas inválidas