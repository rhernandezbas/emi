// Fase 6 — index.html enlaza a las tres páginas
// Fase 7 — Cada página tiene su propio archivo JS independiente
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const jsDir = path.join(publicDir, 'assets', 'js');

describe('Fase 6 — index.html tiene links a las tres páginas', () => {
  let html;

  beforeAll(() => {
    html = fs.readFileSync(path.join(publicDir, 'index.html'), 'utf8');
  });

  test('link a /escribir.html', () => { expect(html).toMatch(/escribir\.html/); });
  test('link a /skarlet.html',  () => { expect(html).toMatch(/skarlet\.html/); });
  test('link a /admin.html',    () => { expect(html).toMatch(/admin\.html/); });
});

describe('Fase 7 — Cada página carga solo su propio JS', () => {
  test('escribir.html solo carga escribir.js', () => {
    const html = fs.readFileSync(path.join(publicDir, 'escribir.html'), 'utf8');
    expect(html).toMatch(/escribir\.js/);
    expect(html).not.toMatch(/skarlet\.js/);
    expect(html).not.toMatch(/admin\.js/);
  });

  test('skarlet.html solo carga skarlet.js', () => {
    const html = fs.readFileSync(path.join(publicDir, 'skarlet.html'), 'utf8');
    expect(html).toMatch(/skarlet\.js/);
    expect(html).not.toMatch(/escribir\.js/);
    expect(html).not.toMatch(/admin\.js/);
  });

  test('admin.html solo carga admin.js', () => {
    const html = fs.readFileSync(path.join(publicDir, 'admin.html'), 'utf8');
    expect(html).toMatch(/admin\.js/);
    expect(html).not.toMatch(/escribir\.js/);
    expect(html).not.toMatch(/skarlet\.js/);
  });

  test('escribir.js existe y no referencia skarlet.js ni admin.js', () => {
    const js = fs.readFileSync(path.join(jsDir, 'escribir.js'), 'utf8');
    expect(js).not.toMatch(/skarlet\.js/);
    expect(js).not.toMatch(/admin\.js/);
  });

  test('skarlet.js existe y no referencia escribir.js ni admin.js', () => {
    const js = fs.readFileSync(path.join(jsDir, 'skarlet.js'), 'utf8');
    expect(js).not.toMatch(/escribir\.js/);
    expect(js).not.toMatch(/admin\.js/);
  });

  test('admin.js existe y no referencia escribir.js ni skarlet.js', () => {
    const js = fs.readFileSync(path.join(jsDir, 'admin.js'), 'utf8');
    expect(js).not.toMatch(/escribir\.js/);
    expect(js).not.toMatch(/skarlet\.js/);
  });
});
