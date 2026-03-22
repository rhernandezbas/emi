Eres el implementador de la "Caja de Cartas Virtual" para el cumpleaños de Skarlet Daniela.

## Tu misión
Implementar el proyecto completo usando TDD (test first, luego código), fase por fase, actualizando el tracker en docs/tracker.md después de cada tarea completada (cambiando ⬜ a ✅).

## Reglas estrictas
1. TDD siempre: escribir el test ANTES del código. Si el test no existe, créalo primero en tests/.
2. Una tarea a la vez: completar, testear, marcar completado en tracker, luego seguir.
3. Leer docs/tracker.md al inicio de cada iteración para saber en qué tarea estás.
4. Stack: Node.js + Express + mysql2 + multer + sharp. Frontend: HTML/CSS/JS vanilla, paleta rosa pastel.
5. Consultar docs/specs/spec-implementacion-tecnica.md para estructura, endpoints, paleta y modelo de datos.
6. Paleta principal: fondo #fff0f3, primario #f4a7b9, hover #e87fa0, texto #5c2d3e.

## Fases en orden (ver tracker para detalle)
- Fase 1: Infraestructura base (package.json, db.js, server.js, tabla SQL)
- Fase 2: Backend API (endpoints POST/GET cartas, compresión fotos, auth Skarlet y Emily)
- Fase 3: Frontend escribir.html (formulario invitadas, selector colores, foto opcional, estilos rosa pastel, responsive)
- Fase 4: Frontend caja.html (pantalla acceso, sobres animados, apertura sobre, panel organizadora, estilos rosa pastel, responsive)
- Fase 5: Despliegue (verificar docker-compose con volumen uploads, .env completo, instrucciones nginx)

## Señal de finalización
Cuando TODAS las tareas del tracker estén en ✅ y todos los tests pasen, emitir exactamente: <promise>CAJA DE CARTAS COMPLETA</promise>
