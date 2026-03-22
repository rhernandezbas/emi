// RED — Fase 1: Skarlet ingresa la clave correcta
// oracle: behavior_anchored
const fs = require('fs');
const path = require('path');
const request = require('supertest');
const app = require('../src/server');

const publicDir = path.join(__dirname, '..', 'public');

describe('Fase 1 — skarlet.html: tiene campo de clave (no nombre ni fecha)', () => {
  let html;

  beforeAll(() => {
    html = fs.readFileSync(path.join(publicDir, 'skarlet.html'), 'utf8');
  });

  test('tiene campo clave con id skarletClave', () => {
    expect(html).toMatch(/id="skarletClave"/);
  });

  test('NO tiene campo nombre (skarletNombre eliminado)', () => {
    expect(html).not.toMatch(/id="skarletNombre"/);
  });

  test('NO tiene campo fecha (skarletFecha eliminado)', () => {
    expect(html).not.toMatch(/id="skarletFecha"/);
  });
});

describe('Fase 1 — /api/auth/skarlet: autenticación por clave', () => {
  test('POST con clave correcta retorna ok:true y rol festejada', async () => {
    const res = await request(app)
      .post('/api/auth/skarlet')
      .send({ clave: process.env.SKARLET_CLAVE || '4567' });
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.rol).toBe('festejada');
  });

  test('POST con nombre+fecha (viejo esquema) retorna ok:false', async () => {
    const res = await request(app)
      .post('/api/auth/skarlet')
      .send({ nombre: 'Skarlet Daniela', fecha: '2003-03-25' });
    expect(res.body.ok).toBe(false);
  });
});
