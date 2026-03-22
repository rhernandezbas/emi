# Findings

```
FINDING: src/routes/cartas.js:25
KIND: Missing return después de res.json() en Express
DESC: El handler POST /api/cartas llama res.json({ ok: true }) sin return. Si por alguna razón el código continúa después (p.ej. en versiones futuras o con middleware modificado), podría intentar escribir headers ya enviados.
SNIPPET:
    res.json({ ok: true });
  } catch (err) {
FIX: Cambiarlo a `return res.json({ ok: true });`
---

FINDING: src/routes/auth.js:4-5
KIND: Credencial hardcodeada en código fuente
DESC: SKARLET_NOMBRE y SKARLET_FECHA están hardcodeados directamente en el código. No están protegidas por variables de entorno como sí lo está EMILY_PASSWORD. Si el repo es accesible, cualquiera puede ver las credenciales de Skarlet.
SNIPPET:
    const SKARLET_NOMBRE = 'Skarlet Daniela';
    const SKARLET_FECHA = '2003-03-25';
FIX: Mover a variables de entorno: `process.env.SKARLET_NOMBRE || 'Skarlet Daniela'` y `process.env.SKARLET_FECHA || '2003-03-25'`
---

FINDING: src/routes/auth.js:10-11
KIND: Falta de validación de input / posible error de tipo
DESC: El endpoint /api/auth/skarlet no valida si `nombre` o `fecha` existen antes de compararlos. Si el body llega sin esos campos, compara undefined === 'Skarlet Daniela' (que devuelve 401, correcto), pero si el body no es JSON o `Content-Type` es incorrecto, `req.body` podría ser undefined completo y crashear.
SNIPPET:
    const { nombre, fecha } = req.body;
    if (nombre === SKARLET_NOMBRE && fecha === SKARLET_FECHA) {
FIX: Agregar guard: `if (!req.body || !nombre || !fecha) return res.status(400).json({ ok: false, error: 'Faltan campos' });`
---

FINDING: public/assets/js/caja.js:89-96
KIND: Error ignorado / falta de manejo de error en fetch
DESC: La función `cargarCartas()` hace fetch sin try/catch. Si la red falla o el servidor responde con un error inesperado, `res.json()` puede lanzar una excepción que no está atrapada. El `await res.json()` en línea 95 no tiene manejo de error: si el body no es JSON válido, la promesa rechaza y rompe silenciosamente la UI (sobresGrid queda vacío sin mensaje al usuario).
SNIPPET:
    const res = await fetch('/api/cartas', {
      headers: { 'x-rol': rol },
    });
    if (!res.ok) return [];
    return await res.json();
FIX: Envolver en try/catch:
    try {
      const res = await fetch('/api/cartas', { headers: { 'x-rol': rol } });
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
---
```
