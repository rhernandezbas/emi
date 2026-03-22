# ADR-003: Publicación junto al servidor donde vive MySQL

## Estado
Aceptado

## Contexto

El proyecto es un regalo personal. Se cuenta con un servidor propio donde ya corre MySQL. Se necesita una forma de exponer el sistema al público para que las invitadas puedan acceder desde sus celulares mediante un link.

## Decisión

El sistema se despliega en el mismo servidor donde está MySQL. El backend vive en ese servidor y las páginas web se sirven desde ahí directamente.

## Razones

- Ya existe infraestructura disponible, no hace falta contratar nada nuevo.
- Evita configurar servicios externos adicionales (Netlify + Firebase) cuando todo puede vivir en un solo lugar.
- El link resultante puede apuntar directamente al servidor o a un dominio propio si se dispone de uno.

## Consecuencias

- El servidor debe ser accesible desde internet para que las invitadas puedan entrar.
- Si el servidor cae, el sistema no está disponible.
- No se necesita ningún plan de pago externo.
