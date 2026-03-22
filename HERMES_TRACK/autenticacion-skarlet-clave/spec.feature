Feature: Autenticación de Skarlet por clave numérica
  Como Skarlet
  Quiero ingresar con una clave numérica (4567)
  Para acceder a mi caja de cartas sin necesidad de recordar mi fecha de nacimiento

  Scenario: Skarlet ingresa la clave correcta
    Given estoy en skarlet.html
    When ingreso la clave "4567" en el campo de acceso
    And hago click en el botón de login
    Then veo la caja de sobres

  Scenario: Skarlet ingresa una clave incorrecta
    Given estoy en skarlet.html
    When ingreso una clave incorrecta en el campo de acceso
    And hago click en el botón de login
    Then veo el mensaje de error "Datos incorrectos, intentá de nuevo."
    And permanezco en la pantalla de acceso

  Scenario: Skarlet envía clave vacía
    Given estoy en skarlet.html
    When dejo el campo de clave vacío
    And hago click en el botón de login
    Then recibo respuesta ok:false del endpoint /api/auth/skarlet