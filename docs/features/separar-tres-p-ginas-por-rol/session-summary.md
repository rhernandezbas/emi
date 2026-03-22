# Session Summary — separar-tres-p-ginas-por-rol

**Fecha:** 2026-03-22

## Feature: separar tres p ginas por rol

### Scenarios implementados

- Invitada accede a la página de escribir carta
- Skarlet accede a su página y se autentica
- Skarlet ingresa credenciales incorrectas
- Organizadora accede a su panel
- Organizadora ingresa contraseña incorrecta
- index.html redirige o enlaza a las tres páginas
- Cada página tiene su propio archivo JS independiente

### Acceptance Criteria

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

# Acceptance Criteria

- /escribir.html carga sin errores y permite enviar carta
- /skarlet.html muestra login y tras auth correcta muestra sobres
- /admin.html muestra login y tras auth correcta muestra tabla
- Cada página tiene su propio archivo JS (no comparte bundle)
- index.html tiene links a las tres páginas
- Cobertura: tests existentes (98) siguen pasando
- Los nuevos archivos HTML/JS existen en public/

### Archivos modificados

- HERMES_TRACK/separar-tres-p-ginas-por-rol/oracle-issues-1.md
- HERMES_TRACK/separar-tres-p-ginas-por-rol/tracker.md
- public/index.html

### Expert reviews

Ver historial completo en `docs/features/separar-tres-p-ginas-por-rol/expert-dissent-log.md`

---
*Generado por Hermes MCP — workflow TDD docs-first*
