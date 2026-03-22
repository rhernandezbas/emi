// Fase 1 — Tests de infraestructura base
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

describe('1.1 package.json existe con dependencias requeridas', () => {
  let pkg;
  test('package.json existe', () => {
    expect(fs.existsSync(path.join(root, 'package.json'))).toBe(true);
    pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  });
  test('tiene dependencia express', () => {
    pkg = pkg || JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
    expect(pkg.dependencies).toHaveProperty('express');
  });
  test('tiene dependencia mysql2', () => {
    pkg = pkg || JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
    expect(pkg.dependencies).toHaveProperty('mysql2');
  });
  test('tiene dependencia multer', () => {
    pkg = pkg || JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
    expect(pkg.dependencies).toHaveProperty('multer');
  });
  test('tiene dependencia sharp', () => {
    pkg = pkg || JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
    expect(pkg.dependencies).toHaveProperty('sharp');
  });
});

describe('1.2 src/db.js existe y exporta función de conexión', () => {
  test('src/db.js existe', () => {
    expect(fs.existsSync(path.join(root, 'src/db.js'))).toBe(true);
  });
  test('src/db.js exporta un pool o función de conexión', () => {
    const db = require(path.join(root, 'src/db.js'));
    expect(db).toBeDefined();
    // debe exportar algo (pool, query fn, etc)
    expect(typeof db === 'object' || typeof db === 'function').toBe(true);
  });
});

describe('1.3 src/server.js existe', () => {
  test('src/server.js existe', () => {
    expect(fs.existsSync(path.join(root, 'src/server.js'))).toBe(true);
  });
});

describe('1.4 schema SQL existe', () => {
  test('sql/schema.sql existe con CREATE TABLE cartas', () => {
    const sqlPath = path.join(root, 'sql/schema.sql');
    expect(fs.existsSync(sqlPath)).toBe(true);
    const content = fs.readFileSync(sqlPath, 'utf8');
    expect(content).toMatch(/CREATE TABLE.*cartas/i);
    expect(content).toMatch(/nombre_remitente/i);
    expect(content).toMatch(/mensaje/i);
    expect(content).toMatch(/color_sobre/i);
  });
});
