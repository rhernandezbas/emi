Feature: Fix bugs en caja-cartas

  Scenario: POST /api/cartas no crashea con "headers already sent"
    Given un invitado envía un POST válido a /api/cartas con nombre, mensaje y color
    When la inserción en DB es exitosa
    Then el servidor responde exactamente una vez con { ok: true } y status 200
    And no se producen errores "Cannot set headers after they are sent" en logs

  Scenario: Credenciales de Skarlet configurables por entorno
    Given la variable de entorno SKARLET_NOMBRE está seteada a un valor X
    When Skarlet intenta autenticarse con el valor X y su fecha correcta
    Then el servidor responde { ok: true, rol: 'festejada' }

  Scenario: /api/auth/skarlet con body vacío devuelve 400
    Given se hace POST a /api/auth/skarlet con body vacío {}
    When Express procesa el request
    Then la respuesta es 400 con { ok: false, error: 'Faltan campos' }
    And no se retorna 401 implícito por comparación con undefined

  Scenario: cargarCartas() no rompe la UI ante falla de red
    Given Skarlet está autenticada y ve la pantalla de sobres
    When el servidor no responde (timeout o error de red)
    Then cargarCartas() retorna un array vacío []
    And sobresGrid muestra el mensaje "Aún no hay cartas. ¡Pronto llegarán! 💕"
    And no aparece ningún error sin manejar en la consola del navegador