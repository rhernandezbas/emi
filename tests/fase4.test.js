// Fase 4 — Tests de Frontend caja.html
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'public/caja.html');
const jsPath = path.join(root, 'public/assets/js/caja.js');

let html = '';
let js = '';

beforeAll(() => {
  if (fs.existsSync(htmlPath)) html = fs.readFileSync(htmlPath, 'utf8');
  if (fs.existsSync(jsPath)) js = fs.readFileSync(jsPath, 'utf8');
});

describe('4.1 Pantalla de acceso con dos modos', () => {
  test('caja.html existe', () => {
    expect(fs.existsSync(htmlPath)).toBe(true);
  });
  test('tiene opción para Skarlet', () => {
    expect(html).toMatch(/skarlet/i);
  });
  test('tiene opción para Emily/organizadora', () => {
    expect(html).toMatch(/emily|organizadora/i);
  });
});

describe('4.2 y 4.3 Validación contra endpoints de auth', () => {
  test('caja.js llama a /api/auth/skarlet', () => {
    expect(js).toMatch(/\/api\/auth\/skarlet/);
  });
  test('caja.js llama a /api/auth/organizadora', () => {
    expect(js).toMatch(/\/api\/auth\/organizadora/);
  });
});

describe('4.4 Vista de sobres animados', () => {
  test('caja.js carga desde GET /api/cartas', () => {
    expect(js).toMatch(/\/api\/cartas/);
    expect(js).toMatch(/fetch/i);
  });
});

describe('4.5 y 4.6 Animaciones', () => {
  test('styles.css tiene animación fadeInScale', () => {
    const css = fs.readFileSync(path.join(root, 'public/assets/css/styles.css'), 'utf8');
    expect(css).toMatch(/fadeInScale/);
  });
  test('caja.js tiene lógica de apertura de sobre', () => {
    expect(js).toMatch(/abierto|click|apertura/i);
  });
});

describe('4.7 Vista interior del sobre: mensaje + foto', () => {
  test('caja.js renderiza el mensaje', () => {
    expect(js).toMatch(/mensaje/i);
  });
  test('caja.js muestra foto si existe', () => {
    expect(js).toMatch(/foto_url|foto/i);
  });
});

describe('4.8 Botón para cerrar sobre', () => {
  test('caja.js tiene función de cierre', () => {
    expect(js).toMatch(/cerrar|close|volver/i);
  });
});

describe('4.9 Panel de organizadora', () => {
  test('caja.js tiene lógica de panel organizadora', () => {
    expect(js).toMatch(/organizadora|panel/i);
  });
});

describe('4.10 y 4.11 Estilos y responsive', () => {
  test('caja.html tiene meta viewport', () => {
    expect(html).toMatch(/viewport/);
  });
  test('caja.html referencia styles.css', () => {
    expect(html).toMatch(/styles\.css/);
  });
});
