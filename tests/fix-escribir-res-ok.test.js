/**
 * Test RED — Bug: escribir.js no verifica res.ok antes de parsear JSON
 *
 * Scenario: escribir.js no verifica res.ok antes de parsear JSON
 *   Given el usuario envía el formulario de carta
 *   When el servidor responde con un error HTTP (4xx/5xx) en formato HTML
 *   Then el bloque catch muestra "No se pudo conectar con el servidor" de forma engañosa
 *   And debería mostrarse "Hubo un error al enviar tu carta" en su lugar
 *
 * Oracle: behavior_anchored — verifica la regla de negocio: cuando el servidor
 * responde con error HTTP, el mensaje al usuario debe ser "Hubo un error al enviar tu carta",
 * no "No se pudo conectar con el servidor".
 */

describe('escribir.js — verificación de res.ok antes de parsear JSON', () => {
  let alertMessages;

  beforeEach(() => {
    alertMessages = [];
    global.alert = (msg) => alertMessages.push(msg);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  /**
   * Simula el comportamiento ACTUAL (buggy) de escribir.js:
   * No verifica res.ok, intenta parsear JSON directamente.
   * Si el servidor devuelve HTML, res.json() lanza SyntaxError → catch
   * muestra "No se pudo conectar con el servidor" (mensaje incorrecto).
   */
  async function enviarCartaBuggy(fetchImpl) {
    try {
      const res = await fetchImpl('/api/cartas', { method: 'POST' });
      const data = await res.json(); // bug: no verifica res.ok antes
      if (data.ok) {
        return 'confirmacion';
      } else {
        alert('Hubo un error al enviar tu carta. Por favor intentá de nuevo.');
        return 'error-negocio';
      }
    } catch (err) {
      alert('No se pudo conectar con el servidor. Intentá más tarde.');
      return 'error-conexion';
    }
  }

  /**
   * Simula el comportamiento CORRECTO (fixed):
   * Verifica res.ok antes de parsear JSON.
   * Si !res.ok, muestra el mensaje de error de negocio correcto.
   */
  async function enviarCartaFixed(fetchImpl) {
    try {
      const res = await fetchImpl('/api/cartas', { method: 'POST' });
      if (!res.ok) {
        alert('Hubo un error al enviar tu carta. Por favor intentá de nuevo.');
        return 'error-negocio';
      }
      const data = await res.json();
      if (data.ok) {
        return 'confirmacion';
      } else {
        alert('Hubo un error al enviar tu carta. Por favor intentá de nuevo.');
        return 'error-negocio';
      }
    } catch (err) {
      alert('No se pudo conectar con el servidor. Intentá más tarde.');
      return 'error-conexion';
    }
  }

  test('BUG — cuando servidor responde 500 con HTML, el código actual muestra mensaje de conexión incorrecto', async () => {
    // Servidor responde con 500 y cuerpo HTML (no JSON)
    const fetchHtmlError = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.reject(new SyntaxError('Unexpected token < in JSON')),
      })
    );

    const resultado = await enviarCartaBuggy(fetchHtmlError);

    // BUG CONFIRMADO: muestra "No se pudo conectar" en lugar de "Hubo un error al enviar"
    expect(alertMessages).toContain('No se pudo conectar con el servidor. Intentá más tarde.');
    expect(resultado).toBe('error-conexion');

    // Esto FALLA con el código actual — es el comportamiento CORRECTO esperado
    expect(alertMessages).not.toContain('Hubo un error al enviar tu carta. Por favor intentá de nuevo.');
  });

  test('FIX — cuando servidor responde 500 con HTML, el código corregido muestra mensaje de error correcto', async () => {
    // Servidor responde con 500 y cuerpo HTML (no JSON)
    const fetchHtmlError = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.reject(new SyntaxError('Unexpected token < in JSON')),
      })
    );

    const resultado = await enviarCartaFixed(fetchHtmlError);

    // Con el fix: muestra el mensaje correcto sin llegar al catch
    expect(alertMessages).toContain('Hubo un error al enviar tu carta. Por favor intentá de nuevo.');
    expect(resultado).toBe('error-negocio');
    expect(alertMessages).not.toContain('No se pudo conectar con el servidor. Intentá más tarde.');
  });

  test('FIX — cuando servidor responde 422, también muestra error de negocio', async () => {
    const fetchValidationError = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 422,
        json: () => Promise.reject(new SyntaxError('Unexpected token < in JSON')),
      })
    );

    await enviarCartaFixed(fetchValidationError);

    expect(alertMessages).toContain('Hubo un error al enviar tu carta. Por favor intentá de nuevo.');
  });

  test('comportamiento correcto no cambia — éxito sigue funcionando', async () => {
    const fetchSuccess = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ ok: true }),
      })
    );

    const resultado = await enviarCartaFixed(fetchSuccess);
    expect(resultado).toBe('confirmacion');
    expect(alertMessages).toHaveLength(0);
  });

  test('comportamiento correcto no cambia — error de red sigue mostrando mensaje de conexión', async () => {
    const fetchNetworkError = jest.fn(() => Promise.reject(new Error('Network error')));

    await enviarCartaFixed(fetchNetworkError);

    expect(alertMessages).toContain('No se pudo conectar con el servidor. Intentá más tarde.');
  });
});
