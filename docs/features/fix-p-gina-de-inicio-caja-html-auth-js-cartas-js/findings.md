# Findings

```
FINDING/BUG/No existe index.html — acceder a "/" retorna 404/No hay /public/index.html en el servidor Express/Crear /public/index.html que redirija a /caja.html
FINDING/SECURITY/Credenciales hardcodeadas en auth.js — BIRTHDAY_NAME y BIRTHDAY_DATE no usan process.env/const SKARLET_NOMBRE = 'Skarlet Daniela'; const SKARLET_FECHA = '2003-03-25';/Reemplazar con process.env.BIRTHDAY_NAME y process.env.BIRTHDAY_DATE
FINDING/SECURITY/EMILY_PASSWORD sin fallback a ORGANIZER_PASSWORD — ambas variables están en .env pero el código solo lee EMILY_PASSWORD/const EMILY_PASSWORD = process.env.EMILY_PASSWORD || 'emily22';/Usar process.env.EMILY_PASSWORD || process.env.ORGANIZER_PASSWORD sin hardcodear default
```
