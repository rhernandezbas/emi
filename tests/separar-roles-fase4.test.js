// Fase 4 — Organizadora accede a su panel
// Fase 5 — Organizadora ingresa contraseña incorrecta
const fs = require('fs');
const path = require('path');
const request = require('supertest');
const app = require('../src/server');

const publicDir = path.join(__dirname, '..', 'public');

describe('Fase 4 — /admin.html: formulario de acceso con contraseña', () => {
  let html;

  beforeAll(() => {
    html = fs.readFileSync(path.join(publicDir, 'admin.html'), 'utf8');
  });

  test('existe admin.html', () => {
    expect(fs.existsSync(path.join(publicDir, 'admin.html'))).toBe(true);
  });

  test('tiene campo password (adminPassword)', () => {
    expect(html).toMatch(/id="adminPassword"/);
    expect(html).toMatch(/type="password"/);
  });

  test('tiene botón de login (btnAdminLogin)', () => {
    expect(html).toMatch(/id="btnAdminLogin"/);
  });

  test('tiene panel de tabla oculto (panelAdmin)', () => {
    expect(html).toMatch(/id="panelAdmin"/);
    expect(html).toMatch(/panelAdmin.*display:none|display.*none.*panelAdmin/s);
  });

  test('carga admin.js', () => {
    expect(html).toMatch(/assets\/js\/admin\.js/);
  });

  test('NO carga escribir.js ni skarlet.js', () => {
    expect(html).not.toMatch(/escribir\.js/);
    expect(html).not.toMatch(/skarlet\.js/);
  });
});

describe('Fase 4/5 — /api/auth/organizadora', () => {
  test('contraseña correcta retorna ok:true', async () => {
    const password = process.env.EMILY_PASSWORD || process.env.ORGANIZER_PASSWORD;
    if (!password) return; // skip si no está configurada
    const res = await request(app)
      .post('/api/auth/organizadora')
      .send({ password });
    expect(res.body.ok).toBe(true);
  });

  test('contraseña incorrecta retorna ok:false', async () => {
    const res = await request(app)
      .post('/api/auth/organizadora')
      .send({ password: 'wrong-password-xyz-123' });
    expect(res.body.ok).toBe(false);
  });

  test('sin contraseña retorna ok:false', async () => {
    const res = await request(app)
      .post('/api/auth/organizadora')
      .send({});
    expect(res.body.ok).toBe(false);
  });
});

describe('Fase 4 — admin.html: tabla con columnas nombre, color, foto, fecha', () => {
  let html;

  beforeAll(() => {
    html = fs.readFileSync(path.join(publicDir, 'admin.html'), 'utf8');
  });

  test('tiene columna Nombre en la tabla', () => {
    expect(html).toMatch(/Nombre/);
  });

  test('tiene columna Color en la tabla', () => {
    expect(html).toMatch(/Color/);
  });

  test('tiene columna Foto en la tabla', () => {
    expect(html).toMatch(/Foto/);
  });

  test('tiene columna Fecha en la tabla', () => {
    expect(html).toMatch(/Fecha/);
  });

  test('tiene tbody con id tablaBody para renderizar cartas', () => {
    expect(html).toMatch(/id="tablaBody"/);
  });
});

describe('Fase 5 — admin.html: mensaje de error correcto', () => {
  test('el mensaje de error dice exactamente "Contraseña incorrecta."', () => {
    const html = fs.readFileSync(path.join(publicDir, 'admin.html'), 'utf8');
    expect(html).toMatch(/Contraseña incorrecta\./);
  });

  test('el mensaje de error está oculto por defecto', () => {
    const html = fs.readFileSync(path.join(publicDir, 'admin.html'), 'utf8');
    expect(html).toMatch(/adminError.*display:none|display:none.*adminError/s);
  });
});
