// Fase 1 — Invitada accede a la página de escribir carta
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');

describe('Fase 1 — /escribir.html: formulario para invitada sin autenticación', () => {
  let html;

  beforeAll(() => {
    const filePath = path.join(publicDir, 'escribir.html');
    expect(fs.existsSync(filePath)).toBe(true);
    html = fs.readFileSync(filePath, 'utf8');
  });

  test('existe escribir.html en public/', () => {
    expect(fs.existsSync(path.join(publicDir, 'escribir.html'))).toBe(true);
  });

  test('tiene campo nombre_remitente', () => {
    expect(html).toMatch(/name="nombre_remitente"/);
  });

  test('tiene campo mensaje', () => {
    expect(html).toMatch(/name="mensaje"/);
  });

  test('tiene selector de color de sobre', () => {
    expect(html).toMatch(/name="color_sobre"/);
  });

  test('tiene campo foto (opcional)', () => {
    expect(html).toMatch(/name="foto"/);
    expect(html).toMatch(/type="file"/);
  });

  test('NO requiere autenticación (no tiene campo password ni login)', () => {
    expect(html).not.toMatch(/type="password"/);
    expect(html).not.toMatch(/id="loginForm"/);
  });

  test('carga su propio JS: assets/js/escribir.js', () => {
    expect(html).toMatch(/assets\/js\/escribir\.js/);
  });

  test('NO carga skarlet.js ni admin.js (sin dependencia cruzada)', () => {
    expect(html).not.toMatch(/skarlet\.js/);
    expect(html).not.toMatch(/admin\.js/);
  });
});

// El AC exige que CADA página tenga su propio JS.
// skarlet.html ya existe y referencia skarlet.js — ese archivo debe existir.
describe('Fase 1 — separación: cada página con su propio JS', () => {
  test('existe assets/js/escribir.js', () => {
    expect(fs.existsSync(path.join(publicDir, 'assets/js/escribir.js'))).toBe(true);
  });

  test('existe assets/js/skarlet.js (skarlet.html lo referencia)', () => {
    expect(fs.existsSync(path.join(publicDir, 'assets/js/skarlet.js'))).toBe(true);
  });

  test('existe assets/js/admin.js', () => {
    expect(fs.existsSync(path.join(publicDir, 'assets/js/admin.js'))).toBe(true);
  });
});
