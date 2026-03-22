<!--
## Provenance

### Fuentes de verdad
- public/assets/js/escribir.js
- public/assets/js/caja.js
- public/escribir.html
- public/caja.html
- public/index.html

### Gaps (decisiones sin respaldo documental)
- No hay ADRs ni docs de arquitectura — todo derivado de lectura directa del código.

-->

# Findings

```
FINDING|UX/ERROR-HANDLING|escribir.js no chequea res.ok antes de res.json()|`const data = await res.json()` sin verificar `res.ok` primero|Agregar `if (!res.ok) { alert('Hubo un error...'); return; }` antes de parsear JSON
FINDING|SILENT-FAILURE|cargarCartas() en caja.js retorna [] sin avisar al usuario en caso de error HTTP|`if (!res.ok) return [];` (línea 95)|Llamar a mostrarErrorConexion() antes de retornar [] cuando !res.ok
FINDING|DATA-DISPLAY|fecha_creacion null/undefined produce "Invalid Date" en la tabla de organizadora|`new Date(carta.fecha_creacion).toLocaleDateString('es-AR')` (línea 191)|Usar un fallback: `carta.fecha_creacion ? new Date(carta.fecha_creacion).toLocaleDateString('es-AR') : '–'`
```
