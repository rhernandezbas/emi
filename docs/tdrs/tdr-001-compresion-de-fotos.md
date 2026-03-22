# TDR-001: Compresión automática de fotos antes de guardar

## Estado
Adoptado

## Contexto

Las invitadas pueden subir una foto junto a su mensaje. Las fotos tomadas desde un celular moderno pueden pesar varios megabytes, lo que afectaría el rendimiento de carga y el almacenamiento disponible en el plan gratuito de Firebase.

## Decisión técnica

Las fotos se comprimen automáticamente en el navegador de la invitada antes de ser enviadas al servidor. La compresión reduce el peso del archivo manteniendo una calidad visual aceptable para la experiencia de la festejada.

## Motivo

- El almacenamiento gratuito en Firebase tiene un límite que podría superarse fácilmente con fotos sin comprimir.
- La carga de fotos grandes es lenta en conexiones móviles, afectando la experiencia de las invitadas.
- La compresión ocurre del lado del cliente, por lo que no genera costo adicional de procesamiento en el servidor.

## Resultado esperado

- Fotos que se suben rápidamente incluso desde conexiones lentas.
- Almacenamiento dentro de los límites del plan gratuito.
- Calidad visual suficiente para mostrar la foto en la caja de Skarlet.
