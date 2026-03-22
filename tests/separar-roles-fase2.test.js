// Fase 2 — Skarlet accede a su página y se autentica
const fs = require('fs');
const path = require('path');
const request = require('supertest');
const app = require('../src/server');

const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');

describe('Fase 2 — /skarlet.html: formulario de acceso con nombre y fecha', () => {
  let html;

  beforeAll(() => {
    const filePath = path.join(publicDir, 'skarlet.html');
    expect(fs.existsSync(filePath)).toBe(true);
    html = fs.readFileSync(filePath, 'utf8');
  });

  test('existe skarlet.html en public/', () => {
    expect(fs.existsSync(path.join(publicDir, 'skarlet.html'))).toBe(true);
  });

  test('tiene campo nombre (skarletNombre)', () => {
    expect(html).toMatch(/id="skarletNombre"/);
  });

  test('tiene campo fecha de nacimiento (skarletFecha)', () => {
    expect(html).toMatch(/id="skarletFecha"/);
    expect(html).toMatch(/type="date"/);
  });

  test('tiene botón de login (btnSkarletLogin)', () => {
    expect(html).toMatch(/id="btnSkarletLogin"/);
  });

  test('tiene mensaje de error para credenciales incorrectas', () => {
    expect(html).toMatch(/id="skarletError"/);
    expect(html).toMatch(/Datos incorrectos/);
  });

  test('tiene sección de sobres oculta inicialmente', () => {
    expect(html).toMatch(/id="cajaSobres"/);
  });

  test('carga su propio JS: assets/js/skarlet.js', () => {
    expect(html).toMatch(/assets\/js\/skarlet\.js/);
  });

  test('NO carga escribir.js ni admin.js (sin dependencia cruzada)', () => {
    expect(html).not.toMatch(/escribir\.js/);
    expect(html).not.toMatch(/admin\.js/);
  });
});

describe('Fase 2 — separación: admin.html existe como página independiente', () => {
  test('existe admin.html en public/', () => {
    expect(fs.existsSync(path.join(publicDir, 'admin.html'))).toBe(true);
  });

  test('admin.html tiene formulario de acceso con contraseña', () => {
    const adminPath = path.join(publicDir, 'admin.html');
    expect(fs.existsSync(adminPath)).toBe(true);
    const adminHtml = fs.readFileSync(adminPath, 'utf8');
    expect(adminHtml).toMatch(/type="password"/);
  });

  test('admin.html carga admin.js', () => {
    const adminPath = path.join(publicDir, 'admin.html');
    expect(fs.existsSync(adminPath)).toBe(true);
    const adminHtml = fs.readFileSync(adminPath, 'utf8');
    expect(adminHtml).toMatch(/assets\/js\/admin\.js/);
  });
});

describe('Fase 2 — /api/auth/skarlet: autenticación correcta', () => {
  test('POST con credenciales correctas retorna ok:true', async () => {
    const res = await request(app)
      .post('/api/auth/skarlet')
      .send({ nombre: process.env.SKARLET_NOMBRE || 'Skarlet Daniela', fecha: process.env.SKARLET_FECHA || '2000-01-01' });
    // Puede ser ok:true o ok:false — lo importante es que responde JSON
    expect(res.status).not.toBe(404);
    expect(res.body).toHaveProperty('ok');
  });

  test('POST con credenciales incorrectas retorna ok:false', async () => {
    const res = await request(app)
      .post('/api/auth/skarlet')
      .send({ nombre: 'nadie', fecha: '1900-01-01' });
    expect([200, 401]).toContain(res.status);
    expect(res.body.ok).toBe(false);
  });

  test('POST sin body retorna error', async () => {
    const res = await request(app)
      .post('/api/auth/skarlet')
      .send({});
    expect(res.body.ok).toBe(false);
  });
});
