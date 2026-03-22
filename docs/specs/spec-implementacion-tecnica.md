# Spec: Implementación técnica

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | HTML + CSS + JavaScript vanilla |
| Backend | Node.js + Express |
| Base de datos | MySQL (en el VPS host) |
| Almacenamiento de fotos | Sistema de archivos local (`/app/uploads`) |
| Contenedor | Docker + docker-compose |

---

## Estructura de archivos del proyecto

```
emi/
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── package.json
├── src/
│   ├── server.js              ← entrada principal, monta rutas y sirve estáticos
│   ├── db.js                  ← conexión a MySQL
│   ├── routes/
│   │   ├── cartas.js          ← POST /api/cartas, GET /api/cartas
│   │   └── auth.js            ← POST /api/auth/skarlet, POST /api/auth/organizadora
│   └── middleware/
│       └── upload.js          ← manejo de subida y compresión de fotos
├── public/
│   ├── escribir.html          ← página de invitadas
│   ├── caja.html              ← página de la festejada
│   └── assets/
│       ├── css/
│       │   └── styles.css     ← estilos globales, paleta rosa pastel
│       └── js/
│           ├── escribir.js    ← lógica del formulario de invitadas
│           └── caja.js        ← lógica de apertura de sobres
└── uploads/                   ← fotos subidas (montado como volumen Docker)
```

---

## API endpoints

### POST `/api/cartas`
Recibe el mensaje de una invitada.

**Body (multipart/form-data)**
```
nombre_remitente  string   requerido
mensaje           string   requerido
color_sobre       string   requerido  (ej: "rosa", "lila", "menta"...)
foto              file     opcional
```

**Respuesta exitosa**
```json
{ "ok": true }
```

---

### GET `/api/cartas`
Devuelve todas las cartas. Solo accesible si se envía el header de sesión válido de Skarlet o la organizadora.

**Respuesta**
```json
[
  {
    "id": 1,
    "nombre_remitente": "Ana",
    "mensaje": "Feliz cumple Skar!",
    "color_sobre": "rosa",
    "foto_url": "/uploads/foto-ana.jpg",
    "fecha_creacion": "2026-03-15T20:00:00Z"
  }
]
```

---

### POST `/api/auth/skarlet`
Valida el acceso de la festejada.

**Body**
```json
{ "nombre": "Skarlet Daniela", "fecha": "2003-03-25" }
```

**Respuesta**
```json
{ "ok": true, "rol": "festejada" }
```

---

### POST `/api/auth/organizadora`
Valida el acceso de Emily.

**Body**
```json
{ "password": "emily22" }
```

**Respuesta**
```json
{ "ok": true, "rol": "organizadora" }
```

---

## Tabla MySQL — `cartas`

```sql
CREATE TABLE cartas (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  nombre_remitente VARCHAR(100) NOT NULL,
  mensaje          TEXT NOT NULL,
  color_sobre      VARCHAR(30) NOT NULL,
  foto_url         VARCHAR(255) DEFAULT NULL,
  fecha_creacion   DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## Paleta de colores — rosa pastel

Colores aplicados en toda la interfaz, sobres y formularios.

| Uso | Color |
|---|---|
| Fondo general | `#fff0f3` |
| Primario (botones, bordes) | `#f4a7b9` |
| Hover / acento | `#e87fa0` |
| Texto principal | `#5c2d3e` |
| Texto secundario | `#a06070` |
| Sobre rosa | `#f8c8d4` |
| Sobre lila | `#d8c8f0` |
| Sobre menta | `#c8f0e0` |
| Sobre celeste | `#c8e8f8` |
| Sobre amarillo | `#f8f0c0` |
| Sobre melocotón | `#f8d8c0` |

---

## Comportamiento de los sobres (animación)

- Al entrar a `caja.html` los sobres aparecen con una animación suave de entrada (fade + scale).
- Al hacer clic en un sobre, se abre con una animación de apertura (flip o expand).
- El contenido del mensaje aparece dentro del sobre abierto.
- La foto se muestra debajo del mensaje si existe.
- Un botón "cerrar" regresa a la vista de todos los sobres.
