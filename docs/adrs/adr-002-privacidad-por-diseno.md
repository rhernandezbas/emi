# ADR-002: Privacidad por diseño — las invitadas no pueden leer mensajes ajenos

## Estado
Aceptado

## Contexto

El sistema tiene tres tipos de usuarios con necesidades muy distintas: invitadas (escriben), organizadora (monitorea) y festejada (lee todo). La privacidad entre invitadas es un requisito central del concepto del regalo.

## Decisión

Se diseñan vistas completamente separadas con accesos diferenciados:

- La vista de escritura (`escribir`) no expone ningún mensaje existente.
- La vista de la caja (`caja`) requiere autenticación diferenciada:
  - Skarlet: nombre + fecha de nacimiento.
  - Emily: contraseña de organizadora.
  - Nadie más puede acceder al contenido.

## Razones

- El valor emocional del regalo depende de que Skarlet sea la primera en leer cada mensaje.
- Las invitadas no deben sentir presión al compararse con los mensajes de otras.
- La organizadora necesita operar sin acceder al contenido privado.

## Consecuencias

- El sistema no permite editar mensajes después de enviados, para simplificar la lógica de acceso.
- La seguridad es suficiente para el contexto (regalo personal entre amigas), no está diseñada para contextos de alta seguridad.
- Si Skarlet olvida su fecha de nacimiento como clave, necesitará ayuda de Emily.
