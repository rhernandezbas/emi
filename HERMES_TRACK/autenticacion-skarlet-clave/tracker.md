# Hermes — Tracker de Implementación

**Feature:** autenticacion-skarlet-clave
**Dominio:** api-endpoint
**Iniciado:** 2026-03-22
**Estado:** EN PROGRESO
**Fase actual:** 1

---

## Constraints activos

> Estas restricciones deben cumplirse en CADA fase antes de marcar REVIEW como completo.

## Acceptance Criteria

- El endpoint POST /api/auth/skarlet acepta { clave } y valida contra SKARLET_CLAVE
- Con clave correcta retorna { ok: true, rol: 'festejada' }
- Con clave incorrecta o vacía retorna 401 { ok: false }
- skarlet.html tiene campo #skarletClave en lugar de #skarletNombre y #skarletFecha
- skarlet.js envía { clave } al endpoint
- Los tests del archivo separar-roles-fase2 y fase3 pasan con la nueva lógica

---

## Fase 1 — Skarlet ingresa la clave correcta

- [x] 🔴 RED — test escrito y fallando
- [x] 🟢 GREEN — implementación mínima que pasa el test
- [x] 🔵 REFACTOR — código limpio, tests siguen pasando
- [x] 🔍 EXPERT: security-expert
- [x] 🔍 EXPERT: test-quality-expert
- [x] ✅ REVIEW — skill aprueba el código

**Tiempo:** —
**Skill output:** —

---

## Fase 2 — Skarlet ingresa una clave incorrecta

- [x] 🔴 RED — test escrito y fallando
- [x] 🟢 GREEN — implementación mínima que pasa el test
- [x] 🔵 REFACTOR — código limpio, tests siguen pasando
- [x] 🔍 EXPERT: security-expert
- [x] 🔍 EXPERT: test-quality-expert
- [x] ✅ REVIEW — skill aprueba el código

**Tiempo:** —
**Skill output:** —

---

## Fase 3 — Skarlet envía clave vacía

- [x] 🔴 RED — test escrito y fallando
- [x] 🟢 GREEN — implementación mínima que pasa el test
- [x] 🔵 REFACTOR — código limpio, tests siguen pasando
- [x] 🔍 EXPERT: security-expert
- [x] 🔍 EXPERT: test-quality-expert
- [x] ✅ REVIEW — skill aprueba el código

**Tiempo:** —
**Skill output:** —

---

## Métricas finales

- Scenarios totales: 3
- Tests totales: —
- Cobertura final: —
- Tiempo total: —
- Score: —
