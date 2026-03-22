Feature: Tres páginas separadas para cada rol
  Como organizadora del proyecto
  Quiero que cada rol tenga su propia URL dedicada
  Para que la navegación sea clara y no haya lógica mezclada en un solo archivo

  Background:
    Given el servidor está corriendo
    And la base de datos tiene la tabla cartas

  Scenario: Invitada accede a la página de escribir carta
    Given una invitada abre /escribir.html
    Then ve un formulario con campos nombre, mensaje, color de sobre y foto opcional
    And puede enviar la carta sin autenticación

  Scenario: Skarlet accede a su página y se autentica
    Given Skarlet abre /skarlet.html
    Then ve un formulario de acceso con nombre y fecha de nacimiento
    When ingresa sus credenciales correctas
    Then ve la caja de sobres con todas las cartas enviadas
    And puede abrir cada sobre para leer el mensaje

  Scenario: Skarlet ingresa credenciales incorrectas
    Given Skarlet abre /skarlet.html
    When ingresa nombre o fecha incorrectos
    Then ve un mensaje de error "Datos incorrectos, intentá de nuevo."
    And permanece en la pantalla de acceso

  Scenario: Organizadora accede a su panel
    Given la organizadora abre /admin.html
    Then ve un formulario de acceso con contraseña
    When ingresa la contraseña correcta
    Then ve una tabla con todas las cartas enviadas (nombre, color, foto, fecha)

  Scenario: Organizadora ingresa contraseña incorrecta
    Given la organizadora abre /admin.html
    When ingresa una contraseña incorrecta
    Then ve un mensaje de error "Contraseña incorrecta."
    And permanece en la pantalla de acceso

  Scenario: index.html redirige o enlaza a las tres páginas
    Given un usuario abre /
    Then puede navegar a /escribir.html, /skarlet.html y /admin.html

  Scenario: Cada página tiene su propio archivo JS independiente
    Given el proyecto tiene los archivos públicos
    Then existe /assets/js/escribir.js
    And existe /assets/js/skarlet.js
    And existe /assets/js/admin.js
    And no existe dependencia cruzada entre los JS de cada página