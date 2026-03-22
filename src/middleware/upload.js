const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const UPLOADS_DIR = path.join(__dirname, '../../uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Solo se permiten imágenes'));
  },
});

// Middleware: comprime la foto con sharp y guarda en uploads/
async function comprimirFoto(req, res, next) {
  if (!req.file) return next();
  try {
    const filename = `foto-${Date.now()}.jpg`;
    const outPath = path.join(UPLOADS_DIR, filename);
    await sharp(req.file.buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(outPath);
    req.fotoUrl = `/uploads/${filename}`;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { upload, comprimirFoto };
