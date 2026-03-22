// Fase 5 — Tests de despliegue
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

describe('5.1 .env.example existe y tiene las variables necesarias', () => {
  test('.env.example existe', () => {
    expect(fs.existsSync(path.join(root, '.env.example'))).toBe(true);
  });
  test('tiene DB_HOST', () => {
    const content = fs.readFileSync(path.join(root, '.env.example'), 'utf8');
    expect(content).toMatch(/DB_HOST/);
  });
  test('tiene DB_NAME', () => {
    const content = fs.readFileSync(path.join(root, '.env.example'), 'utf8');
    expect(content).toMatch(/DB_NAME/);
  });
  test('tiene DB_USER', () => {
    const content = fs.readFileSync(path.join(root, '.env.example'), 'utf8');
    expect(content).toMatch(/DB_USER/);
  });
  test('tiene DB_PASSWORD', () => {
    const content = fs.readFileSync(path.join(root, '.env.example'), 'utf8');
    expect(content).toMatch(/DB_PASSWORD/);
  });
  test('tiene EMILY_PASSWORD', () => {
    const content = fs.readFileSync(path.join(root, '.env.example'), 'utf8');
    expect(content).toMatch(/EMILY_PASSWORD/);
  });
});

describe('5.x Dockerfile y docker-compose.yml existen', () => {
  test('Dockerfile existe', () => {
    expect(fs.existsSync(path.join(root, 'Dockerfile'))).toBe(true);
  });
  test('docker-compose.yml existe', () => {
    expect(fs.existsSync(path.join(root, 'docker-compose.yml'))).toBe(true);
  });
  test('docker-compose.yml monta volumen uploads', () => {
    const content = fs.readFileSync(path.join(root, 'docker-compose.yml'), 'utf8');
    expect(content).toMatch(/uploads/);
  });
  test('docker-compose.yml expone puerto 3000', () => {
    const content = fs.readFileSync(path.join(root, 'docker-compose.yml'), 'utf8');
    expect(content).toMatch(/3000/);
  });
});
