# Oracle Classifications — Fase 3

- BUG — fecha_creacion null produce "Invalid Date" | behavior_anchored | confirma bug con null
- BUG — fecha_creacion undefined produce "Invalid Date" | behavior_anchored | confirma bug con undefined
- FIX — fecha_creacion null muestra "–" | behavior_anchored | verifica regla de negocio
- FIX — fecha_creacion undefined muestra "–" | behavior_anchored | verifica regla de negocio
- FIX — fecha_creacion string vacío muestra "–" | behavior_anchored | caso borde adicional
- comportamiento correcto no cambia — fecha válida se formatea correctamente | behavior_anchored | regresión
