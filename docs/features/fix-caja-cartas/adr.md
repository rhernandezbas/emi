# ADR — Fix bugs en caja-cartas

## Contexto
Se identificaron 4 bugs en el proyecto caja-cartas:

1. **Missing return en POST /api/cartas** (`src/routes/cartas.js:25`): el `res.json()` del happy path no tiene `return`, lo que puede causar "headers already sent" errors en Express bajo ciertas condiciones.

2. **Credenciales de Skarlet hardcodeadas** (`src/routes/auth.js:4-5`): `SKARLET_NOMBRE` y `SKARLET_FECHA` están en el código fuente. La contraseña de Emily ya usa `process.env`, pero las credenciales de Skarlet no. Inconsistencia que expone datos personales (nombre completo + fecha de nacimiento) en el repositorio.

3. **Falta de validación de input en /api/auth/skarlet** (`src/routes/auth.js:10-11`): no se valida la presencia de `nombre` y `fecha` antes de usarlos. Si el body falta o está malformado, el comportamiento depende de la implementación de Express (puede retornar 401 por comparación con `undefined`, pero no intencionalmente).

4. **Error no manejado en cargarCartas()** (`public/assets/js/caja.js:89-96`): `fetch` sin try/catch. Una falla de red o respuesta no-JSON deja la UI rota sin mensaje al usuario.

## Decisión
- Agregar `return` antes de `res.json({ ok: true })` en el handler POST.
- Mover `SKARLET_NOMBRE` y `SKARLET_FECHA` a variables de entorno con fallback.
- Agregar validación explícita de campos en `/api/auth/skarlet`.
- Envolver `cargarCartas()` en try/catch retornando `[]` en caso de error.

## Consecuencias
- El handler POST de cartas ya no puede producir "Cannot set headers after they are sent".
- Las credenciales de Skarlet dejan de estar expuestas en el código fuente.
- El endpoint `/api/auth/skarlet` responde 400 con mensaje claro ante body inválido en vez de 401 implícito.
- La UI de caja.html muestra "Aún no hay cartas" en vez de quedarse rota ante fallas de red.