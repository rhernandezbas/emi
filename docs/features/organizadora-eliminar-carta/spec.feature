Feature: Organizadora elimina una carta
  Como organizadora (Emily)
  Quiero poder eliminar una carta de la caja
  Para moderar el contenido antes de que Skarlet lo vea

  Scenario: Organizadora elimina una carta exitosamente
    Given estoy autenticada como organizadora en admin.html
    When hago click en el botón eliminar de una carta
    Then la carta es eliminada de la base de datos
    And desaparece de la lista en pantalla

  Scenario: Solo la organizadora puede eliminar cartas
    Given un request DELETE /api/cartas/:id sin header x-rol organizadora
    When se envía el request
    Then el servidor retorna 401

  Scenario: Eliminar una carta inexistente
    Given estoy autenticada como organizadora
    When intento eliminar una carta con id que no existe
    Then el servidor retorna ok:false