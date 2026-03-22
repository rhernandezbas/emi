// Fase 2 — Tests de Backend API
const request = require('supertest');
const path = require('path');
const fs = require('fs');

// Mock de la base de datos para no requerir MySQL real
jest.mock('../src/db', () => ({
  execute: jest.fn(),
  query: jest.fn(),
}));

const db = require('../src/db');
const app = require('../src/server');

beforeEach(() => {
  jest.clearAllMocks();
});

// ─────────────────────────────────────────────
// 2.1 POST /api/cartas — recibir carta sin foto
// ─────────────────────────────────────────────
describe('2.1 POST /api/cartas — guardar carta sin foto', () => {
  test('retorna { ok: true } con datos válidos', async () => {
    db.execute.mockResolvedValueOnce([{ insertId: 1 }]);
    const res = await request(app)
      .post('/api/cartas')
      .field('nombre_remitente', 'Ana')
      .field('mensaje', 'Feliz cumple Skar!')
      .field('color_sobre', 'rosa');
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  test('retorna 400 si falta nombre_remitente', async () => {
    const res = await request(app)
      .post('/api/cartas')
      .field('mensaje', 'Hola')
      .field('color_sobre', 'rosa');
    expect(res.status).toBe(400);
  });

  test('retorna 400 si falta mensaje', async () => {
    const res = await request(app)
      .post('/api/cartas')
      .field('nombre_remitente', 'Ana')
      .field('color_sobre', 'rosa');
    expect(res.status).toBe(400);
  });

  test('retorna 400 si falta color_sobre', async () => {
    const res = await request(app)
      .post('/api/cartas')
      .field('nombre_remitente', 'Ana')
      .field('mensaje', 'Feliz cumple');
    expect(res.status).toBe(400);
  });
});

// ─────────────────────────────────────────────
// 2.3 GET /api/cartas — protegido por sesión
// ─────────────────────────────────────────────
describe('2.3 GET /api/cartas — protegido', () => {
  test('retorna 401 sin header de sesión', async () => {
    const res = await request(app).get('/api/cartas');
    expect(res.status).toBe(401);
  });

  test('retorna cartas con header x-rol: festejada', async () => {
    db.execute.mockResolvedValueOnce([[
      { id: 1, nombre_remitente: 'Ana', mensaje: 'Hola', color_sobre: 'rosa', foto_url: null, fecha_creacion: '2026-03-15' }
    ]]);
    const res = await request(app)
      .get('/api/cartas')
      .set('x-rol', 'festejada');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('retorna cartas con header x-rol: organizadora', async () => {
    db.execute.mockResolvedValueOnce([[
      { id: 1, nombre_remitente: 'Ana', mensaje: 'Hola', color_sobre: 'rosa', foto_url: null, fecha_creacion: '2026-03-15' }
    ]]);
    const res = await request(app)
      .get('/api/cartas')
      .set('x-rol', 'organizadora');
    expect(res.status).toBe(200);
  });
});

// ─────────────────────────────────────────────
// 2.4 POST /api/auth/skarlet
// ─────────────────────────────────────────────
describe('2.4 POST /api/auth/skarlet', () => {
  test('retorna { ok: true, rol: "festejada" } con credenciales correctas', async () => {
    const res = await request(app)
      .post('/api/auth/skarlet')
      .send({ nombre: 'Skarlet Daniela', fecha: '2003-03-25' });
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.rol).toBe('festejada');
  });

  test('retorna { ok: false } con nombre incorrecto', async () => {
    const res = await request(app)
      .post('/api/auth/skarlet')
      .send({ nombre: 'Otro', fecha: '2003-03-25' });
    expect(res.status).toBe(401);
    expect(res.body.ok).toBe(false);
  });

  test('retorna { ok: false } con fecha incorrecta', async () => {
    const res = await request(app)
      .post('/api/auth/skarlet')
      .send({ nombre: 'Skarlet Daniela', fecha: '2000-01-01' });
    expect(res.status).toBe(401);
    expect(res.body.ok).toBe(false);
  });
});

// ─────────────────────────────────────────────
// 2.5 POST /api/auth/organizadora
// ─────────────────────────────────────────────
describe('2.5 POST /api/auth/organizadora', () => {
  test('retorna { ok: true, rol: "organizadora" } con password correcto', async () => {
    const res = await request(app)
      .post('/api/auth/organizadora')
      .send({ password: 'emily22' });
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.rol).toBe('organizadora');
  });

  test('retorna { ok: false } con password incorrecto', async () => {
    const res = await request(app)
      .post('/api/auth/organizadora')
      .send({ password: 'wrong' });
    expect(res.status).toBe(401);
    expect(res.body.ok).toBe(false);
  });
});

// ─────────────────────────────────────────────
// 2.2 Middleware upload.js existe
// ─────────────────────────────────────────────
describe('2.2 src/middleware/upload.js existe', () => {
  test('el archivo existe y exporta algo', () => {
    const uploadPath = path.join(__dirname, '../src/middleware/upload.js');
    expect(fs.existsSync(uploadPath)).toBe(true);
    const upload = require(uploadPath);
    expect(upload).toBeDefined();
  });
});
