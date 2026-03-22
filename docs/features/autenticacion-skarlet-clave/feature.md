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

Cambio del mecanismo de autenticación de Skarlet: en lugar de ingresar nombre completo + fecha de nacimiento, Skarlet ingresará una clave numérica corta (4567). Esto simplifica la experiencia de acceso y elimina la dependencia de datos personales como credencial.