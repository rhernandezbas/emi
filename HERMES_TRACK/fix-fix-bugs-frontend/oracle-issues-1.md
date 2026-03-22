# Oracle Classifications — Fase 1

- BUG — cuando servidor responde 500 con HTML, el código actual muestra mensaje de conexión incorrecto | behavior_anchored | verifica que el bug existe tal como fue documentado
- FIX — cuando servidor responde 500 con HTML, el código corregido muestra mensaje de error correcto | behavior_anchored | verifica la regla de negocio: error HTTP debe mostrar mensaje de error de carta
- FIX — cuando servidor responde 422, también muestra error de negocio | behavior_anchored | cubre variante 4xx del mismo escenario
- comportamiento correcto no cambia — éxito sigue funcionando | behavior_anchored | regresión: el happy path no debe verse afectado
- comportamiento correcto no cambia — error de red sigue mostrando mensaje de conexión | behavior_anchored | regresión: errores de red reales mantienen su mensaje
