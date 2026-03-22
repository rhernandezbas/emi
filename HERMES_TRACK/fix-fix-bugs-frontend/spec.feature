Feature: Corrección de bugs en el frontend
  Como desarrollador
  Quiero corregir los bugs encontrados en los archivos JS del frontend
  Para que la app maneje errores correctamente y no muestre datos incorrectos

  Scenario: escribir.js no verifica res.ok antes de parsear JSON
    Given el usuario envía el formulario de carta
    When el servidor responde con un error HTTP (4xx/5xx) en formato HTML
    Then el bloque catch muestra "No se pudo conectar con el servidor" de forma engañosa
    And debería mostrarse "Hubo un error al enviar tu carta" en su lugar

  Scenario: caja.js falla silenciosamente en cargarCartas cuando !res.ok
    Given el usuario está autenticado
    When la API /api/cartas responde con un código de error HTTP
    Then la función retorna [] sin notificar al usuario
    And el grid muestra "Aún no hay cartas" en lugar de un mensaje de error real

  Scenario: fecha_creacion nula/undefined en la tabla de organizadora
    Given hay una carta con fecha_creacion null o undefined
    When la organizadora ve la tabla de participantes
    Then la celda de fecha muestra "Invalid Date"
    And debería mostrar un guion o valor por defecto