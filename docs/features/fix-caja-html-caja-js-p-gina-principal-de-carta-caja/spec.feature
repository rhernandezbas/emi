Feature: Corrección de bugs en caja.html

  Scenario: cargarCartas maneja error de red
    Given el usuario está autenticado como festejada
    When la red falla al hacer GET /api/cartas
    Then se muestra un mensaje de error al usuario
    And la función retorna un array vacío sin romper la UI

  Scenario: cerrar sobre restaura el grid correctamente
    Given la caja de sobres está visible con cartas
    When el usuario abre un sobre
    Then el grid se oculta
    When el usuario cierra el sobre
    Then el grid se restaura con el mismo display que tenía antes

  Scenario: panel organizadora oculta mensaje vacío cuando hay cartas
    Given el panel organizadora se carga
    When existen cartas en la base de datos
    Then el mensaje "Aún no hay cartas" no se muestra
    And la tabla muestra todas las cartas

  Scenario: escapeHtml simplificada funciona correctamente
    Given una cadena con caracteres especiales como <script>
    When se llama escapeHtml
    Then retorna la cadena escapada correctamente