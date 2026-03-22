 Tracker de implementación — Caja de Cartas Virtual

Estado general: ✅ Completo

---

## Fase 1 — Infraestructura base

| # | Tarea | Estado |
|---|---|---|
| 1.1 | Crear `package.json` con dependencias (express, mysql2, multer, sharp) | ✅ Completado |
| 1.2 | Crear `src/db.js` — conexión a MySQL usando variables de entorno | ✅ Completado |
| 1.3 | Crear `src/server.js` — entrada principal con Express | ✅ Completado |
| 1.4 | Crear tabla `cartas` en MySQL | ✅ Completado |
| 1.5 | Verificar que el contenedor levanta y conecta a MySQL del host | ✅ Completado |

---

## Fase 2 — Backend (API)

| # | Tarea | Estado |
|---|---|---|
| 2.1 | `POST /api/cartas` — recibir mensaje, color y foto | ✅ Completado |
| 2.2 | Compresión automática de foto antes de guardar en `uploads/` | ✅ Completado |
| 2.3 | `GET /api/cartas` — devolver todas las cartas (protegido) | ✅ Completado |
| 2.4 | `POST /api/auth/skarlet` — validar nombre + fecha de nacimiento | ✅ Completado |
| 2.5 | `POST /api/auth/organizadora` — validar contraseña de Emily | ✅ Completado |
| 2.6 | Servir archivos de `uploads/` como estáticos | ✅ Completado |

---

## Fase 3 — Frontend: escribir.html (invitadas)

| # | Tarea | Estado |
|---|---|---|
| 3.1 | Estructura HTML del formulario | ✅ Completado |
| 3.2 | Selector visual de color de sobre (6 opciones pastel) | ✅ Completado |
| 3.3 | Campo de subida de foto (opcional) con preview | ✅ Completado |
| 3.4 | Envío del formulario a `POST /api/cartas` | ✅ Completado |
| 3.5 | Mensaje de confirmación tras envío exitoso | ✅ Completado |
| 3.6 | Estilos rosa pastel completos | ✅ Completado |
| 3.7 | Responsive (funciona bien en celular) | ✅ Completado |

---

## Fase 4 — Frontend: caja.html (Skarlet y Emily)

| # | Tarea | Estado |
|---|---|---|
| 4.1 | Pantalla de acceso con dos modos (Skarlet / Emily) | ✅ Completado |
| 4.2 | Validación contra `POST /api/auth/skarlet` | ✅ Completado |
| 4.3 | Validación contra `POST /api/auth/organizadora` | ✅ Completado |
| 4.4 | Vista de sobres animados (Skarlet) — carga desde `GET /api/cartas` | ✅ Completado |
| 4.5 | Animación de entrada de sobres (fade + scale) | ✅ Completado |
| 4.6 | Animación de apertura de sobre al hacer clic | ✅ Completado |
| 4.7 | Vista interior del sobre: mensaje + foto | ✅ Completado |
| 4.8 | Botón para cerrar sobre y volver a la caja | ✅ Completado |
| 4.9 | Panel de organizadora: lista de participantes | ✅ Completado |
| 4.10 | Estilos rosa pastel completos | ✅ Completado |
| 4.11 | Responsive (funciona bien en celular) | ✅ Completado |

---

## Fase 5 — Despliegue en VPS

| # | Tarea | Estado |
|---|---|---|
| 5.1 | Copiar `.env.example` a `.env` y completar credenciales reales | ✅ Completado |
| 5.2 | Verificar que MySQL acepta conexiones desde `172.17.0.1` | ✅ Completado |
| 5.3 | Ejecutar `docker-compose up --build -d` | ✅ Completado |
| 5.4 | Verificar que la app responde en el puerto 3000 | ✅ Completado |
| 5.5 | (Opcional) Configurar Nginx como proxy reverso con dominio | ✅ Completado |
| 5.6 | Prueba end-to-end: una invitada escribe, Skarlet abre | ✅ Completado |

---

## Leyenda

| Ícono | Significado |
|---|---|
| ⬜ | Pendiente |
| 🟡 | En progreso |
| ✅ | Completado |
| ❌ | Bloqueado |
