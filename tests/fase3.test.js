// Fase 3 — Tests de Frontend escribir.html
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'public/escribir.html');
const cssPath = path.join(root, 'public/assets/css/styles.css');
const jsPath = path.join(root, 'public/assets/js/escribir.js');

let html = '';
let css = '';

beforeAll(() => {
  if (fs.existsSync(htmlPath)) html = fs.readFileSync(htmlPath, 'utf8');
  if (fs.existsSync(cssPath)) css = fs.readFileSync(cssPath, 'utf8');
});

describe('3.1 Estructura HTML del formulario', () => {
  test('escribir.html existe', () => {
    expect(fs.existsSync(htmlPath)).toBe(true);
  });
  test('tiene campo nombre_remitente', () => {
    expect(html).toMatch(/name=["']nombre_remitente["']/);
  });
  test('tiene campo mensaje', () => {
    expect(html).toMatch(/name=["']mensaje["']/);
  });
  test('tiene campo color_sobre', () => {
    expect(html).toMatch(/color_sobre/);
  });
  test('tiene formulario con action /api/cartas o envío JS', () => {
    expect(html).toMatch(/api\/cartas|POST.*cartas/i);
  });
});

describe('3.2 Selector visual de color de sobre (6 opciones)', () => {
  test('tiene al menos 6 opciones de color', () => {
    const colors = ['rosa', 'lila', 'menta', 'celeste', 'amarillo', 'melocot'];
    const found = colors.filter(c => html.toLowerCase().includes(c));
    expect(found.length).toBeGreaterThanOrEqual(6);
  });
});

describe('3.3 Campo de subida de foto con preview', () => {
  test('tiene input type=file', () => {
    expect(html).toMatch(/type=["']file["']/);
  });
  test('escribir.js existe con lógica de preview', () => {
    expect(fs.existsSync(jsPath)).toBe(true);
    const js = fs.readFileSync(jsPath, 'utf8');
    expect(js).toMatch(/preview|createObjectURL/i);
  });
});

describe('3.4 Envío del formulario a POST /api/cartas', () => {
  test('escribir.js envía a /api/cartas', () => {
    const js = fs.readFileSync(jsPath, 'utf8');
    expect(js).toMatch(/\/api\/cartas/);
    expect(js).toMatch(/fetch|XMLHttpRequest/i);
  });
});

describe('3.5 Mensaje de confirmación tras envío', () => {
  test('escribir.js muestra mensaje de éxito', () => {
    const js = fs.readFileSync(jsPath, 'utf8');
    expect(js).toMatch(/gracias|confirmaci|enviada|éxito/i);
  });
});

describe('3.6 Estilos rosa pastel', () => {
  test('styles.css existe', () => {
    expect(fs.existsSync(cssPath)).toBe(true);
  });
  test('tiene color primario #f4a7b9', () => {
    expect(css).toMatch(/#f4a7b9/i);
  });
  test('tiene fondo #fff0f3', () => {
    expect(css).toMatch(/#fff0f3/i);
  });
  test('tiene color de texto #5c2d3e', () => {
    expect(css).toMatch(/#5c2d3e/i);
  });
});

describe('3.7 Responsive', () => {
  test('styles.css tiene media queries', () => {
    expect(css).toMatch(/@media/);
  });
  test('escribir.html tiene meta viewport', () => {
    expect(html).toMatch(/viewport/);
  });
});
