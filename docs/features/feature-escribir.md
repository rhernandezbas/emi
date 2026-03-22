# Feature: Escribir carta (vista de invitadas)

## Descripción

Página accesible para todas las invitadas mediante un link compartido por Emily. Permite que cada persona deje su mensaje personalizado antes del cumpleaños.

## Experiencia de usuario

1. La invitada ingresa al link y ve un formulario sencillo y amigable.
2. Escribe su nombre.
3. Redacta su mensaje para Skarlet.
4. Elige el color de su sobre entre una paleta de tonos pastel (6 opciones disponibles).
5. Opcionalmente sube una foto junto a Skarlet.
6. Envía el mensaje. El sistema confirma que fue guardado correctamente.

## Restricciones de privacidad

- Las invitadas no tienen acceso a ver los mensajes de las demás.
- Una vez enviado el mensaje, no se puede editar ni eliminar desde esta vista.
- El formulario no muestra información sobre quién más participó.

## Comportamiento del sistema

- Las fotos se comprimen automáticamente antes de guardarse, para no afectar el rendimiento.
- Los datos se almacenan de forma persistente y quedan disponibles cuando Skarlet abra la caja.
- El sistema es tolerante a conexiones lentas y funciona desde celular.
