const express = require('express');
const router = express.Router();
const db = require('../db');
const { upload, comprimirFoto } = require('../middleware/upload');

// Middleware de autenticación para GET
function requireAuth(req, res, next) {
  const rol = req.headers['x-rol'];
  if (rol === 'festejada' || rol === 'organizadora') return next();
  return res.status(401).json({ ok: false, error: 'No autorizado' });
}

// POST /api/cartas
router.post('/', upload.single('foto'), comprimirFoto, async (req, res) => {
  const { nombre_remitente, mensaje, color_sobre } = req.body;
  if (!nombre_remitente || !mensaje || !color_sobre) {
    return res.status(400).json({ ok: false, error: 'Faltan campos requeridos' });
  }
  const foto_url = req.fotoUrl || null;
  try {
    await db.execute(
      'INSERT INTO cartas (nombre_remitente, mensaje, color_sobre, foto_url) VALUES (?, ?, ?, ?)',
      [nombre_remitente, mensaje, color_sobre, foto_url]
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: 'Error al guardar la carta' });
  }
});

// DELETE /api/cartas/:id — solo organizadora
router.delete('/:id', async (req, res) => {
  const rol = req.headers['x-rol'];
  if (rol !== 'organizadora') {
    return res.status(401).json({ ok: false, error: 'No autorizado' });
  }
  try {
    const [result] = await db.execute('DELETE FROM cartas WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ ok: false, error: 'Carta no encontrada' });
    }
    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'Error al eliminar' });
  }
});

// GET /api/cartas — protegido
router.get('/', requireAuth, async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM cartas ORDER BY fecha_creacion DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ ok: false, error: 'Error al obtener cartas' });
  }
});

module.exports = router;
