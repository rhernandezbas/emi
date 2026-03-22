# TDR-002: Autenticación sin sistema de cuentas

## Estado
Adoptado

## Contexto

El sistema necesita proteger el acceso a la caja de cartas para que solo Skarlet (y Emily) puedan ver los mensajes. Sin embargo, crear un sistema de cuentas con email y contraseña sería una fricción innecesaria para un regalo personal.

## Decisión técnica

Se usa una verificación de identidad basada en datos conocidos por las personas involucradas:

- **Skarlet**: ingresa su nombre y su fecha de nacimiento. Estos datos son conocidos naturalmente por ella sin necesidad de recordar ninguna contraseña inventada.
- **Emily**: ingresa una contraseña corta y memorable (`emily22`) que le fue comunicada directamente.

## Motivo

- No existe un backend de autenticación propio.
- El nivel de seguridad requerido es proporcional al contexto: un regalo entre amigas, no un sistema bancario.
- La experiencia debe ser fluida: Skarlet no debería tener que registrarse ni crear una cuenta para abrir su regalo.

## Limitaciones conocidas

- Cualquier persona que conozca el nombre y fecha de nacimiento de Skarlet podría acceder si tuviera también el link.
- La contraseña de Emily es fija y no se puede cambiar sin modificar el sistema.
- Se asume que el link de la caja solo se comparte con Skarlet en el momento indicado.
