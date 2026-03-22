// Fase 3 — Skarlet ingresa credenciales incorrectas
const fs = require('fs');
const path = require('path');
const request = require('supertest');
const app = require('../src/server');

const publicDir = path.join(__dirname, '..', 'public');

describe('Fase 3 — skarlet.html: mensaje de error visible con texto correcto', () => {
  let html;

  beforeAll(() => {
    html = fs.readFileSync(path.join(publicDir, 'skarlet.html'), 'utf8');
  });

  test('el mensaje de error dice exactamente "Datos incorrectos, intentá de nuevo."', () => {
    expect(html).toMatch(/Datos incorrectos, intentá de nuevo\./);
  });

  test('el mensaje de error está oculto por defecto (display:none)', () => {
    expect(html).toMatch(/skarletError.*display:none|display:none.*skarletError/s);
  });
});

describe('Fase 3 — /api/auth/skarlet: credenciales incorrectas', () => {
  test('clave incorrecta retorna ok:false', async () => {
    const res = await request(app)
      .post('/api/auth/skarlet')
      .send({ clave: '9999' });
    expect(res.body.ok).toBe(false);
  });

  test('clave vacía retorna ok:false', async () => {
    const res = await request(app)
      .post('/api/auth/skarlet')
      .send({ clave: '' });
    expect(res.body.ok).toBe(false);
  });

  test('sin campo clave retorna ok:false', async () => {
    const res = await request(app)
      .post('/api/auth/skarlet')
      .send({});
    expect(res.body.ok).toBe(false);
  });

  test('skarlet.html permanece en pantalla de acceso tras error (accesoScreen visible)', () => {
    const html = fs.readFileSync(path.join(publicDir, 'skarlet.html'), 'utf8');
    expect(html).toMatch(/id="accesoScreen"/);
    expect(html).toMatch(/cajaSobres.*display:none|display.*none.*cajaSobres/s);
  });
});

describe('Fase 3 — index.html enlaza a las tres páginas separadas', () => {
  let html;

  beforeAll(() => {
    html = fs.readFileSync(path.join(publicDir, 'index.html'), 'utf8');
  });

  test('index.html tiene link a /escribir.html', () => {
    expect(html).toMatch(/escribir\.html/);
  });

  test('index.html tiene link a /skarlet.html', () => {
    expect(html).toMatch(/skarlet\.html/);
  });

  test('index.html tiene link a /admin.html', () => {
    expect(html).toMatch(/admin\.html/);
  });
});
