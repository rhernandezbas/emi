# Session Summary — autenticacion-skarlet-clave

**Fecha:** 2026-03-22

## Feature: autenticacion skarlet clave

### Scenarios implementados

- Skarlet ingresa la clave correcta
- Skarlet ingresa una clave incorrecta
- Skarlet envía clave vacía

### Acceptance Criteria

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

# Acceptance Criteria

- El endpoint POST /api/auth/skarlet acepta { clave } y valida contra SKARLET_CLAVE
- Con clave correcta retorna { ok: true, rol: 'festejada' }
- Con clave incorrecta o vacía retorna 401 { ok: false }
- skarlet.html tiene campo #skarletClave en lugar de #skarletNombre y #skarletFecha
- skarlet.js envía { clave } al endpoint
- Los tests del archivo separar-roles-fase2 y fase3 pasan con la nueva lógica

### Archivos modificados

- HERMES_TRACK/.active
- docker-compose.yml
- public/assets/js/skarlet.js
- public/skarlet.html
- src/routes/auth.js
- tests/fase2.test.js
- tests/fix-inicio.test.js
- tests/separar-roles-fase2.test.js
- tests/separar-roles-fase3.test.js

### Expert reviews

Ver historial completo en `docs/features/autenticacion-skarlet-clave/expert-dissent-log.md`

---
*Generado por Hermes MCP — workflow TDD docs-first*
