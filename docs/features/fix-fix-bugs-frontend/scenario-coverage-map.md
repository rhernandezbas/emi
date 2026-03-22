# Scenario Coverage Map — fix-fix-bugs-frontend

## Fase 1: escribir.js no verifica res.ok antes de parsear JSON

- `FIX — cuando servidor responde 500 con HTML, el código corregido muestra mensaje de error correcto`
- `FIX — cuando servidor responde 422, también muestra error de negocio`
- `comportamiento correcto no cambia — éxito sigue funcionando`
- `comportamiento correcto no cambia — error de red sigue mostrando mensaje de conexión`

## Fase 2: caja.js falla silenciosamente en cargarCartas cuando !res.ok

- `FIX — cuando API responde 401, llama mostrarErrorConexion`
- `FIX — cuando API responde 500, llama mostrarErrorConexion`
- `FIX — error de red sigue llamando mostrarErrorConexion`
- `comportamiento correcto no cambia — éxito retorna cartas`

## Fase 3: fecha_creacion nula/undefined en la tabla de organizadora

- `FIX — fecha_creacion null muestra "–"`
- `FIX — fecha_creacion undefined muestra "–"`
- `FIX — fecha_creacion string vacío muestra "–"`
- `comportamiento correcto no cambia — fecha válida se formatea correctamente`

