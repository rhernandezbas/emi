require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Estáticos: frontend
app.use(express.static(path.join(__dirname, '../public')));

// Estáticos: fotos subidas
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas API
app.use('/api/cartas', require('./routes/cartas'));
app.use('/api/auth', require('./routes/auth'));

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}

module.exports = app;
