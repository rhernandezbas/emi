const express = require('express');
const router = express.Router();

const SKARLET_CLAVE = process.env.SKARLET_CLAVE;
const EMILY_PASSWORD = process.env.EMILY_PASSWORD || process.env.ORGANIZER_PASSWORD;

// POST /api/auth/skarlet
router.post('/skarlet', (req, res) => {
  const { clave } = req.body;
  if (clave && clave === SKARLET_CLAVE) {
    return res.json({ ok: true, rol: 'festejada' });
  }
  return res.status(401).json({ ok: false, error: 'Credenciales incorrectas' });
});

// POST /api/auth/organizadora
router.post('/organizadora', (req, res) => {
  const { password } = req.body;
  if (password === EMILY_PASSWORD) {
    return res.json({ ok: true, rol: 'organizadora' });
  }
  return res.status(401).json({ ok: false, error: 'Contraseña incorrecta' });
});

module.exports = router;
