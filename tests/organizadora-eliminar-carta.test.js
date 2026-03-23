// Feature: organizadora-eliminar-carta
const fs = require('fs');
const path = require('path');
const request = require('supertest');

jest.mock('../src/db', () => ({
  execute: jest.fn(),
}));

const db = require('../src/db');
const app = require('../src/server');
const publicDir = path.join(__dirname, '..', 'public');

beforeEach(() => jest.clearAllMocks());

// ── Fase 1: Eliminar carta exitosamente ──
describe('Fase 1 — DELETE /api/cartas/:id con organizadora', () => {
  test('retorna ok:true cuando la carta existe', async () => {
    db.execute.mockResolvedValueOnce([{ affectedRows: 1 }]);
    const res = await request(app)
      .delete('/api/cartas/1')
      .set('x-rol', 'organizadora');
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  test('admin.html tiene botón eliminar por carta', () => {
    const html = fs.readFileSync(path.join(publicDir, 'admin.html'), 'utf8');
    expect(html).toMatch(/btnEliminar|eliminar/i);
  });
});

// ── Fase 2: Solo organizadora puede eliminar ──
describe('Fase 2 — DELETE /api/cartas/:id sin autorización', () => {
  test('sin x-rol retorna 401', async () => {
    const res = await request(app).delete('/api/cartas/1');
    expect(res.status).toBe(401);
    expect(res.body.ok).toBe(false);
  });

  test('con x-rol festejada retorna 401', async () => {
    const res = await request(app)
      .delete('/api/cartas/1')
      .set('x-rol', 'festejada');
    expect(res.status).toBe(401);
    expect(res.body.ok).toBe(false);
  });
});

// ── Fase 3: Carta inexistente ──
describe('Fase 3 — DELETE /api/cartas/:id carta inexistente', () => {
  test('retorna ok:false si affectedRows es 0', async () => {
    db.execute.mockResolvedValueOnce([{ affectedRows: 0 }]);
    const res = await request(app)
      .delete('/api/cartas/9999')
      .set('x-rol', 'organizadora');
    expect(res.body.ok).toBe(false);
  });
});
