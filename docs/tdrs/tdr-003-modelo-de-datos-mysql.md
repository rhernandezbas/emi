# TDR-003: Modelo de datos en MySQL

## Estado
Adoptado

## Contexto

Con MySQL como base de datos, se necesita definir cómo se organizan los datos del sistema: los mensajes de las invitadas, los colores elegidos y las fotos.

## Entidades principales

### cartas
Almacena cada mensaje enviado por una invitada.

| Campo | Descripción |
|---|---|
| id | Identificador único de la carta |
| nombre_remitente | Nombre de quien escribe |
| mensaje | Texto del mensaje para Skarlet |
| color_sobre | Color elegido para el sobre (valor de la paleta pastel) |
| foto_url | Referencia a la foto subida (opcional) |
| fecha_creacion | Cuándo fue enviada la carta |

## Consideraciones sobre las fotos

Las fotos no se guardan directamente en MySQL (no es eficiente almacenar archivos binarios grandes en una base de datos relacional). Se guardan en el sistema de archivos del servidor y en MySQL solo se guarda la ruta o nombre del archivo.

## Motivo

- El modelo es simple y directo: una sola tabla cubre todo el funcionamiento del sistema.
- MySQL maneja sin problema las consultas necesarias: insertar una carta, listar todas las cartas, contar participantes.
- Separar las fotos del registro de texto mantiene la base de datos liviana y el acceso a imágenes eficiente.
