<!--
## Provenance

### Fuentes de verdad
- src/routes/auth.js
- public/skarlet.html
- public/assets/js/skarlet.js
- docs/tdrs/tdr-002-autenticacion-simple.md
- .env
- docker-compose.yml
- tests/separar-roles-fase2.test.js
- tests/separar-roles-fase3.test.js

### Gaps (decisiones sin respaldo documental)
- Se asumió que SKARLET_CLAVE es la nueva env var (no documentado aún en TDR-002)
- Se asumió que los tests existentes deben actualizarse para validar el nuevo campo #skarletClave

-->

## TDR: Cambio de autenticación Skarlet a clave numérica

**Decisión:** Reemplazar los campos `nombre` + `fecha` por un único campo `clave` (valor: 4567, configurable via env var `SKARLET_CLAVE`).

**Archivos afectados:**
- `src/routes/auth.js`: endpoint POST /api/auth/skarlet — cambiar validación de nombre+fecha a clave
- `public/skarlet.html`: reemplazar inputs #skarletNombre y #skarletFecha por un input #skarletClave (type=password o text)
- `public/assets/js/skarlet.js`: enviar `{ clave }` en lugar de `{ nombre, fecha }`
- `.env` y `docker-compose.yml`: agregar `SKARLET_CLAVE=4567`, remover `BIRTHDAY_NAME` y `BIRTHDAY_DATE`

**Alternativa descartada:** Mantener nombre+fecha como credencial secundaria adicional.

**Consecuencias:** Los tests existentes que validan campos nombre/fecha deben actualizarse.

## Decisiones técnicas

### DECISIÓN: Usar env var SKARLET_CLAVE para el valor de la clave | CONFIANZA: 95% | RAZÓN: Consistente con el patrón existente (BIRTHDAY_NAME, BIRTHDAY_DATE, EMILY_PASSWORD) | ALTERNATIVA_DESCARTADA: Hardcodear "4567" en el código

