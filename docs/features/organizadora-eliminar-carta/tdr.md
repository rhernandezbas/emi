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

## TDR: Endpoint DELETE /api/cartas/:id

**Decisión:** Agregar DELETE /api/cartas/:id en cartas.js, protegido por middleware que verifica x-rol === organizadora.

**Archivos afectados:**
- `src/routes/cartas.js`: agregar DELETE /:id con middleware requireOrgAuth
- `public/admin.html`: agregar botón eliminar en cada carta
- `public/assets/js/admin.js`: llamar DELETE al hacer click, actualizar lista

**Alternativa descartada:** Soft delete (marcar como eliminada). No justificado para este contexto.

## Decisiones técnicas

### DECISIÓN: Verificar x-rol en header para DELETE | CONFIANZA: 95% | RAZÓN: Consistente con el patrón existente en GET /api/cartas | ALTERNATIVA_DESCARTADA: Token JWT o session cookie

