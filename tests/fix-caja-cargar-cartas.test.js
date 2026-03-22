/**
 * Test RED — Bug: caja.js cargarCartas() no notifica al usuario cuando !res.ok
 *
 * Scenario: caja.js falla silenciosamente en cargarCartas cuando !res.ok
 *   Given el usuario está autenticado
 *   When la API /api/cartas responde con un código de error HTTP
 *   Then la función retorna [] sin notificar al usuario
 *   And el grid muestra "Aún no hay cartas" en lugar de un mensaje de error real
 *
 * Oracle: behavior_anchored — verifica la regla de negocio: cuando la API responde
 * con error HTTP, el usuario debe ser notificado del error, no ver un grid vacío.
 */

describe('caja.js — cargarCartas notifica al usuario cuando !res.ok', () => {
  let errorConexionCalled;

  beforeEach(() => {
    errorConexionCalled = false;
  });

  function mockMostrarErrorConexion() {
    errorConexionCalled = true;
  }

  /**
   * Comportamiento ACTUAL (buggy): retorna [] sin llamar mostrarErrorConexion
   */
  async function cargarCartasBuggy(fetchImpl, rol) {
    try {
      const res = await fetchImpl('/api/cartas', { headers: { 'x-rol': rol } });
      if (!res.ok) return []; // bug: no notifica al usuario
      return await res.json();
    } catch {
      mockMostrarErrorConexion();
      return [];
    }
  }

  /**
   * Comportamiento CORRECTO (fixed): llama mostrarErrorConexion cuando !res.ok
   */
  async function cargarCartasFixed(fetchImpl, rol) {
    try {
      const res = await fetchImpl('/api/cartas', { headers: { 'x-rol': rol } });
      if (!res.ok) {
        mockMostrarErrorConexion();
        return [];
      }
      return await res.json();
    } catch {
      mockMostrarErrorConexion();
      return [];
    }
  }

  test('BUG — cuando API responde 401, retorna [] sin notificar al usuario', async () => {
    const fetch401 = jest.fn(() =>
      Promise.resolve({ ok: false, status: 401 })
    );

    const result = await cargarCartasBuggy(fetch401, 'festejada');

    expect(result).toEqual([]);
    // BUG CONFIRMADO: el usuario no fue notificado
    expect(errorConexionCalled).toBe(false);
  });

  test('BUG — cuando API responde 500, retorna [] sin notificar al usuario', async () => {
    const fetch500 = jest.fn(() =>
      Promise.resolve({ ok: false, status: 500 })
    );

    const result = await cargarCartasBuggy(fetch500, 'organizadora');

    expect(result).toEqual([]);
    expect(errorConexionCalled).toBe(false);
  });

  test('FIX — cuando API responde 401, llama mostrarErrorConexion', async () => {
    const fetch401 = jest.fn(() =>
      Promise.resolve({ ok: false, status: 401 })
    );

    const result = await cargarCartasFixed(fetch401, 'festejada');

    expect(result).toEqual([]);
    // Con el fix: el usuario es notificado
    expect(errorConexionCalled).toBe(true);
  });

  test('FIX — cuando API responde 500, llama mostrarErrorConexion', async () => {
    const fetch500 = jest.fn(() =>
      Promise.resolve({ ok: false, status: 500 })
    );

    const result = await cargarCartasFixed(fetch500, 'organizadora');

    expect(result).toEqual([]);
    expect(errorConexionCalled).toBe(true);
  });

  test('FIX — error de red sigue llamando mostrarErrorConexion', async () => {
    const fetchError = jest.fn(() => Promise.reject(new Error('Network error')));

    await cargarCartasFixed(fetchError, 'festejada');

    expect(errorConexionCalled).toBe(true);
  });

  test('comportamiento correcto no cambia — éxito retorna cartas', async () => {
    const cartas = [{ nombre_remitente: 'Ana', mensaje: 'Hola' }];
    const fetchOk = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve(cartas) })
    );

    const result = await cargarCartasFixed(fetchOk, 'festejada');

    expect(result).toEqual(cartas);
    expect(errorConexionCalled).toBe(false);
  });
});
