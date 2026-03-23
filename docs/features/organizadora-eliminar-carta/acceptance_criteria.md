<!--
## Provenance

### Fuentes de verdad
- src/routes/cartas.js
- public/admin.html
- public/assets/js/admin.js
- docs/tdrs/tdr-002-autenticacion-simple.md

### Gaps (decisiones sin respaldo documental)
- Se asume que el botón eliminar en admin no requiere confirmación (no documentado)
- Se asume que solo la organizadora puede eliminar, no la festejada

-->

# Acceptance Criteria

- DELETE /api/cartas/:id con x-rol:organizadora elimina la carta y retorna ok:true
- DELETE /api/cartas/:id sin x-rol:organizadora retorna 401
- DELETE /api/cartas/:id con id inexistente retorna ok:false (o 404)
- admin.html tiene botón eliminar en cada carta
- Al eliminar, la carta desaparece de la lista sin recargar la página