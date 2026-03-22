// Fix — Página de inicio: tests RED/GREEN/REFACTOR
const fs = require('fs');
const path = require('path');
const request = require('supertest');

const root = path.resolve(__dirname, '..');

// ── Fase 1: GET / sirve index.html ──
describe('Fix 1: GET / retorna página de inicio', () => {
  let app;
  beforeAll(() => {
    // Mock db para evitar conexión real
    jest.mock(path.join(root, 'src/db.js'), () => ({
      execute: jest.fn().mockResolvedValue([[]]),
    }));
    app = require(path.join(root, 'src/server.js'));
  });

  test('GET / responde con status 200', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });

  test('GET / sirve contenido HTML', async () => {
    const res = await request(app).get('/');
    expect(res.headers['content-type']).toMatch(/html/);
  });

  test('public/index.html existe en el filesystem', () => {
    expect(fs.existsSync(path.join(root, 'public/index.html'))).toBe(true);
  });
});

// ── Fase 2: Credenciales de Skarlet desde .env ──
describe('Fix 2: auth.js usa variables de entorno para credenciales de Skarlet', () => {
  test('SKARLET_NOMBRE usa process.env.BIRTHDAY_NAME', () => {
    const authPath = path.join(root, 'src/routes/auth.js');
    const content = fs.readFileSync(authPath, 'utf8');
    expect(content).toMatch(/process\.env\.BIRTHDAY_NAME/);
  });

  test('SKARLET_FECHA usa process.env.BIRTHDAY_DATE', () => {
    const authPath = path.join(root, 'src/routes/auth.js');
    const content = fs.readFileSync(authPath, 'utf8');
    expect(content).toMatch(/process\.env\.BIRTHDAY_DATE/);
  });

  test('no contiene la fecha hardcodeada 2003-03-25', () => {
    const authPath = path.join(root, 'src/routes/auth.js');
    const content = fs.readFileSync(authPath, 'utf8');
    expect(content).not.toMatch(/'2003-03-25'/);
  });

  test('no contiene el nombre hardcodeado Skarlet Daniela', () => {
    const authPath = path.join(root, 'src/routes/auth.js');
    const content = fs.readFileSync(authPath, 'utf8');
    expect(content).not.toMatch(/'Skarlet Daniela'/);
  });
});

// ── Fase 3: Contraseña de Emily sin default hardcodeado ──
describe('Fix 3: EMILY_PASSWORD sin valor hardcodeado', () => {
  test('no contiene emily22 hardcodeado como fallback', () => {
    const authPath = path.join(root, 'src/routes/auth.js');
    const content = fs.readFileSync(authPath, 'utf8');
    expect(content).not.toMatch(/\|\|\s*['"]emily22['"]/);
  });

  test('usa process.env.ORGANIZER_PASSWORD como fallback', () => {
    const authPath = path.join(root, 'src/routes/auth.js');
    const content = fs.readFileSync(authPath, 'utf8');
    expect(content).toMatch(/process\.env\.ORGANIZER_PASSWORD/);
  });
});
