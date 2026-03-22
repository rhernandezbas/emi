# Feature: Caja de cartas (vista de la festejada)

## Descripción

Página principal que Skarlet recibe como regalo. Es la experiencia de descubrimiento: ver todos los sobres y abrirlos uno por uno para leer cada carta y ver las fotos.

## Experiencia de usuario — Skarlet

1. Skarlet recibe el link y lo abre.
2. Ve una pantalla de acceso que le pide su nombre y fecha de nacimiento (como dato personal conocido solo por ella).
3. Al ingresar correctamente, se revela la caja: todos los sobres animados, cada uno en el color elegido por quien lo escribió.
4. Puede hacer clic en cada sobre para abrirlo y leer el mensaje dentro.
5. Si la carta tiene foto, también puede verla junto al mensaje.
6. Puede navegar libremente entre todos los sobres.

## Experiencia de usuario — Emily (organizadora)

1. Emily accede a la misma página con una contraseña especial (`emily22`).
2. En lugar de la vista de sobres, ve un panel de seguimiento.
3. El panel muestra la lista de participantes: quién ya escribió su carta y quién falta.
4. No puede leer el contenido de los mensajes, solo ver la participación.

## Comportamiento del sistema

- El acceso de Skarlet está protegido por dos datos: nombre + fecha de nacimiento.
- El acceso de Emily está protegido por una contraseña separada.
- Los sobres se presentan con animación al entrar, generando expectativa antes de abrirlos.
- La experiencia está diseñada para ser emocionalmente significativa: cada sobre es una sorpresa individual.
