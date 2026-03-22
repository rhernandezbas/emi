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