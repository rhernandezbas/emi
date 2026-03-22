# Spec: Flujo completo del sistema

## Actores

| Actor | Rol |
|---|---|
| Emily | Organizadora. Crea y comparte los links. Monitorea participación. |
| Invitadas | Amigas de Skarlet. Escriben sus cartas. |
| Skarlet | Festejada. Abre la caja el día de su cumpleaños. |

---

## Flujo 1 — Preparación (Emily)

1. Emily configura el proyecto con Firebase y sube el sistema a Netlify.
2. Obtiene dos links:
   - Link de escritura → lo comparte con todas las invitadas.
   - Link de la caja → lo guarda para dárselo a Skarlet el día de su cumpleaños.
3. Monitorea el avance entrando a la caja con su contraseña (`emily22`).

---

## Flujo 2 — Escritura de cartas (Invitadas)

1. La invitada recibe el link de Emily por WhatsApp u otro medio.
2. Abre el link desde su celular o computadora.
3. Completa el formulario:
   - Nombre
   - Mensaje para Skarlet
   - Color de sobre (paleta pastel, 6 opciones)
   - Foto con Skarlet (opcional)
4. Envía el mensaje.
5. El sistema confirma que fue guardado.

---

## Flujo 3 — Apertura de la caja (Skarlet)

1. Skarlet recibe el link de la caja como regalo.
2. Ingresa su nombre y fecha de nacimiento.
3. Se revela la caja con todos los sobres animados.
4. Abre cada sobre individualmente:
   - Lee el mensaje.
   - Ve la foto si hay una.
5. Puede navegar entre todos los sobres a su ritmo.

---

## Estados del sistema

| Estado | Descripción |
|---|---|
| Preparación | El sistema está listo, aún no hay cartas escritas. |
| Recolección | Las invitadas están escribiendo sus cartas. |
| Completo | Todas las invitadas esperadas ya escribieron. |
| Apertura | Skarlet accede a la caja y lee los mensajes. |

---

## Restricciones

- Una invitada no puede leer los mensajes de otras.
- Una invitada no puede editar su mensaje después de enviarlo.
- Skarlet no puede acceder antes de recibir el link de Emily.
- Emily puede ver quién escribió pero no el contenido de los mensajes.
