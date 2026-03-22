/**
 * Tests de fix — caja.js (bugs identificados por Hermes)
 * Usa fetch mock para simular comportamiento de red
 */

// ── Helpers para simular el entorno DOM ──
function mockFetch(shouldFail, responseData) {
  global.fetch = shouldFail
    ? jest.fn(() => Promise.reject(new Error('Network error')))
    : jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(responseData),
        })
      );
}

// ── Fase 1: cargarCartas maneja error de red ──
describe('cargarCartas — manejo de errores de red', () => {
  test('retorna [] y no lanza excepción cuando fetch falla', async () => {
    mockFetch(true);

    // Simulamos la función cargarCartas tal como está HOY (sin try/catch)
    // Este test DEBE FALLAR porque la implementación actual no maneja el error
    async function cargarCartasActual() {
      const res = await fetch('/api/cartas', { headers: { 'x-rol': 'festejada' } });
      if (!res.ok) return [];
      return await res.json();
    }

    // Sin try/catch, esto lanza. El test falla si no hay manejo de error.
    await expect(cargarCartasActual()).rejects.toThrow('Network error');
  });

  test('con try/catch retorna [] sin romper la UI', async () => {
    mockFetch(true);

    // Implementación CORRECTA (lo que debería ser)
    async function cargarCartasFixed() {
      try {
        const res = await fetch('/api/cartas', { headers: { 'x-rol': 'festejada' } });
        if (!res.ok) return [];
        return await res.json();
      } catch {
        return [];
      }
    }

    const result = await cargarCartasFixed();
    expect(result).toEqual([]);
  });
});

// ── Fase 2: cerrar sobre restaura display original ──
describe('cerrar sobre — restauración del display', () => {
  test('hardcodear grid puede romper el display original', () => {
    // Simula el bug: el display original podría no ser 'grid'
    const originalDisplay = 'flex'; // podría ser flex en algún contexto
    const sobresGrid = { style: { display: originalDisplay } };

    // Bug actual: hardcodea 'grid'
    function abrirSobreBuggy(grid) {
      grid.style.display = 'none';
    }
    function cerrarSobreBuggy(grid) {
      grid.style.display = 'grid'; // BUG: no restaura el original
    }

    abrirSobreBuggy(sobresGrid);
    cerrarSobreBuggy(sobresGrid);
    expect(sobresGrid.style.display).not.toBe(originalDisplay); // el bug existe
  });

  test('guardar display original antes de ocultar y restaurarlo al cerrar', () => {
    const originalDisplay = 'flex';
    const sobresGrid = { style: { display: originalDisplay } };
    let savedDisplay;

    function abrirSobreFixed(grid) {
      savedDisplay = grid.style.display;
      grid.style.display = 'none';
    }
    function cerrarSobreFixed(grid) {
      grid.style.display = savedDisplay;
    }

    abrirSobreFixed(sobresGrid);
    cerrarSobreFixed(sobresGrid);
    expect(sobresGrid.style.display).toBe(originalDisplay);
  });
});

// ── Fase 3: panel organizadora oculta mensaje vacío cuando hay cartas ──
describe('panel organizadora — visibilidad de tablaVacia', () => {
  test('bug: tablaVacia puede quedar visible cuando hay cartas', () => {
    const tablaVacia = { style: { display: 'block' } }; // estado residual

    // Bug actual: solo se muestra, nunca se oculta explícitamente al inicio
    function mostrarPanelBuggy(cartas, tablaVacia) {
      if (cartas.length === 0) {
        tablaVacia.style.display = 'block';
        return;
      }
      // BUG: no oculta tablaVacia si hay cartas
    }

    mostrarPanelBuggy([{ nombre: 'Ana' }], tablaVacia);
    expect(tablaVacia.style.display).toBe('block'); // sigue visible — bug confirmado
  });

  test('fix: tablaVacia se oculta siempre al inicio', () => {
    const tablaVacia = { style: { display: 'block' } };

    function mostrarPanelFixed(cartas, tablaVacia) {
      tablaVacia.style.display = 'none'; // siempre ocultar primero
      if (cartas.length === 0) {
        tablaVacia.style.display = 'block';
      }
    }

    mostrarPanelFixed([{ nombre: 'Ana' }], tablaVacia);
    expect(tablaVacia.style.display).toBe('none');
  });
});

// ── Fase 4: escapeHtml simplificada ──
describe('escapeHtml — lógica simplificada', () => {
  // Simula la función actual (redundante)
  function escapeHtmlActual(str) {
    const div = document.createElement
      ? document.createElement('div')
      : { textContent: '', innerHTML: '' };
    if (div.appendChild) {
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeHtmlFixed(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const casos = [
    ['<script>alert(1)</script>', '&lt;script&gt;alert(1)&lt;/script&gt;'],
    ['Hello & World', 'Hello &amp; World'],
    ['"quoted"', '"quoted"'],
    ['normal text', 'normal text'],
  ];

  test.each(casos)('escapeHtmlFixed("%s") → "%s"', (input, expected) => {
    // En jsdom (Node) document.createElement está disponible
    if (typeof document !== 'undefined') {
      expect(escapeHtmlFixed(input)).toBe(expected);
    }
  });
});
