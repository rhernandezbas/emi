# ADR-001: Almacenamiento de datos en base de datos propia (MySQL)

## Estado
Aceptado

## Contexto

El sistema necesita que los mensajes escritos por las invitadas persistan de forma confiable y sean accesibles desde cualquier dispositivo, en cualquier momento. Se evalúo usar Firebase (servicio externo) pero se cuenta con una base de datos MySQL propia disponible.

## Decisión

Se utiliza una base de datos MySQL propia como capa de persistencia para almacenar los mensajes, los colores de sobres elegidos y las referencias a las fotos subidas.

## Razones

- Ya se dispone de una instancia MySQL operativa, sin costo adicional.
- No se depende de servicios externos con límites de uso gratuito o cambios de precio.
- MySQL es confiable, conocido y suficiente para el volumen de datos esperado (decenas de mensajes y fotos).
- Mayor control sobre los datos: los mensajes de Skarlet viven en infraestructura propia.

## Consecuencias

- Se necesita un pequeño backend que reciba y entregue los datos desde/hacia MySQL (las páginas web no pueden conectarse directamente a la base de datos).
- Las fotos pueden guardarse en el sistema de archivos del servidor o en la misma base de datos según conveniencia.
- La disponibilidad de los datos depende del servidor donde corra MySQL.

## Alternativa descartada

Firebase fue considerado como opción inicial por su facilidad de configuración, pero fue descartado al confirmarse que se cuenta con MySQL propio, lo que elimina la dependencia externa y simplifica la arquitectura a largo plazo.
