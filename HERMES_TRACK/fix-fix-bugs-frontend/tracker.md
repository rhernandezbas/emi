# Hermes — Tracker de Implementación

**Feature:** fix-fix-bugs-frontend
**Dominio:** api-endpoint
**Iniciado:** 2026-03-18
**Estado:** EN PROGRESO
**Fase actual:** 1

---

## Constraints activos

> Estas restricciones deben cumplirse en CADA fase antes de marcar REVIEW como completo.

## Acceptance Criteria

- escribir.js verifica res.ok antes de parsear JSON
- cargarCartas() notifica al usuario cuando res no es ok
- La tabla de organizadora muestra '–' en lugar de "Invalid Date" para fechas inválidas

---

## Fase 1 — escribir.js no verifica res.ok antes de parsear JSON

- [x] 🔴 RED — test escrito y fallando
- [x] 🟢 GREEN — implementación mínima que pasa el test
- [x] 🔵 REFACTOR — código limpio, tests siguen pasando
- [x] 🔍 EXPERT: security-expert — APROBADO (sin vulnerabilidades)
- [x] 🔍 EXPERT: test-quality-expert — APROBADO (oracles behavior_anchored, cobertura completa)
- [x] ✅ REVIEW — skill aprueba el código

**Tiempo:** —
**Skill output:** —

---

## Fase 2 — caja.js falla silenciosamente en cargarCartas cuando !res.ok

- [x] 🔴 RED — test escrito y fallando
- [x] 🟢 GREEN — implementación mínima que pasa el test
- [x] 🔵 REFACTOR — código limpio, tests siguen pasando
- [x] 🔍 EXPERT: security-expert — APROBADO
- [x] 🔍 EXPERT: test-quality-expert — APROBADO
- [x] ✅ REVIEW — skill aprueba el código

**Tiempo:** —
**Skill output:** —

---

## Fase 3 — fecha_creacion nula/undefined en la tabla de organizadora

- [x] 🔴 RED — test escrito y fallando
- [x] 🟢 GREEN — implementación mínima que pasa el test
- [x] 🔵 REFACTOR — código limpio, tests siguen pasando
- [x] 🔍 EXPERT: security-expert — APROBADO
- [x] 🔍 EXPERT: test-quality-expert — APROBADO
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
