# Oracle Classifications — Fase 2

- BUG — cuando API responde 401, retorna [] sin notificar al usuario | behavior_anchored | confirma el bug documentado
- BUG — cuando API responde 500, retorna [] sin notificar al usuario | behavior_anchored | confirma el bug documentado
- FIX — cuando API responde 401, llama mostrarErrorConexion | behavior_anchored | verifica regla de negocio
- FIX — cuando API responde 500, llama mostrarErrorConexion | behavior_anchored | verifica regla de negocio
- FIX — error de red sigue llamando mostrarErrorConexion | behavior_anchored | regresión
- comportamiento correcto no cambia — éxito retorna cartas | behavior_anchored | regresión happy path
