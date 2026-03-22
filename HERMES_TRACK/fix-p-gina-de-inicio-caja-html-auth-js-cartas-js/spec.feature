Feature: Fixes página de inicio

  Scenario: Acceder a "/" muestra la página de inicio
    Given el servidor Express está corriendo
    When el usuario accede a "/"
    Then debe ver la página caja.html (redirigir o servir index.html)

  Scenario: Credenciales de Skarlet vienen de variables de entorno
    Given BIRTHDAY_NAME y BIRTHDAY_DATE están en .env
    When se carga auth.js
    Then SKARLET_NOMBRE usa process.env.BIRTHDAY_NAME
    And SKARLET_FECHA usa process.env.BIRTHDAY_DATE

  Scenario: Contraseña de Emily sin valor hardcodeado
    Given EMILY_PASSWORD y ORGANIZER_PASSWORD están en .env
    When se carga auth.js
    Then EMILY_PASSWORD usa process.env.EMILY_PASSWORD || process.env.ORGANIZER_PASSWORD sin default hardcodeado