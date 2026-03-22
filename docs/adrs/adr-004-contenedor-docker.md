# ADR-004: Despliegue del sistema en contenedor Docker

## Estado
Aceptado

## Contexto

El sistema necesita correr en un VPS propio junto a una instancia de MySQL que ya existe en ese mismo servidor. Se necesita una forma ordenada de desplegarlo, actualizarlo y aislarlo del resto de los procesos del servidor.

## Decisión

La aplicación se empaqueta en un contenedor Docker. El despliegue se gestiona con `docker-compose`. MySQL no se conteneriza — sigue corriendo directamente en el VPS host como ya lo hacía.

## Cómo se conecta la app al MySQL del host

Desde dentro de un contenedor Docker no se puede usar `localhost` para llegar al MySQL del host. Se usa la dirección especial `host.docker.internal`, que Docker resuelve automáticamente al IP del servidor anfitrión. Esto se habilita en `docker-compose.yml` con:

```
extra_hosts:
  - "host.docker.internal:host-gateway"
```

La variable de entorno `DB_HOST` apunta a `host.docker.internal`.

## Razones

- Docker aísla la aplicación del entorno del servidor, evitando conflictos de dependencias.
- Actualizar la app es tan simple como hacer `docker-compose up --build -d`.
- No se conteneriza MySQL para no migrar ni interrumpir una instancia que ya funciona.
- El archivo `.env` mantiene las credenciales fuera del código fuente.

## Consecuencias

- MySQL en el VPS debe estar configurado para aceptar conexiones desde `172.17.0.1` (IP del bridge de Docker) o desde `%` si ya acepta conexiones remotas.
- El puerto `3000` del contenedor se expone al host. Si hay un proxy reverso (Nginx), puede apuntar a ese puerto.
- Las fotos subidas por las invitadas se guardan dentro del contenedor; para persistirlas ante reinicios se debe montar un volumen (`./uploads:/app/uploads`).
