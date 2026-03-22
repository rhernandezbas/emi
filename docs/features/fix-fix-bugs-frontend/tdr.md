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

## Bugs encontrados en el frontend

### Bug 1 — escribir.js: falta chequeo de res.ok (línea 54)
La llamada `await res.json()` se ejecuta sin verificar primero si `res.ok`. Si el servidor devuelve HTML de error (500, 422, etc.), el parse JSON falla y el catch muestra "No se pudo conectar con el servidor", que es engañoso.

### Bug 2 — caja.js: fallo silencioso en cargarCartas (línea 95)
Cuando la API responde con un código HTTP de error, `cargarCartas` retorna `[]` sin notificar al usuario. El resultado es que se muestra "Aún no hay cartas" aunque el problema real sea un error de autenticación o servidor.

### Bug 3 — caja.js: fecha_creacion nula/indefinida (línea 191)
Si una carta tiene `fecha_creacion` null o undefined, `new Date(undefined).toLocaleDateString()` produce "Invalid Date" en la tabla de la organizadora.

## Decisiones técnicas

### DECISIÓN: Clasificar como bugs de manejo de errores | CONFIANZA: 95% | RAZÓN: comportamiento observable directamente en el código | ALTERNATIVA_DESCARTADA: refactor completo de error handling

