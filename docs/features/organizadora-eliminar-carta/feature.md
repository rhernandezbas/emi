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

La organizadora (Emily) necesita poder eliminar cartas individuales desde admin.html para moderar el contenido antes de que Skarlet abra la caja. Se agrega endpoint DELETE /api/cartas/:id protegido por x-rol:organizadora, y un botón de eliminar en cada carta en la vista admin.