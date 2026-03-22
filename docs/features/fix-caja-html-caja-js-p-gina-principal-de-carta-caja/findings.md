# Findings

```
FINDING/BUG/La función escapeHtml tiene lógica redundante e innecesaria — el branch alternativo (sin DOM) nunca se ejecuta en un browser real, y la complejidad confunde/SNIPPET/function escapeHtml(str) {\n  const div = document.createElement ? document.createElement('div') : { textContent: '', innerHTML: '' };\n  if (div.appendChild) {/FIX/Simplificar a una sola implementación con DOM directamente.

FINDING/BUG/cargarCartas() no maneja errores de red — si el fetch falla (no hay try/catch), la excepción burbujea sin mostrar feedback al usuario/SNIPPET/async function cargarCartas() {\n  const rol = rolActual || sessionStorage.getItem('rol');\n  const res = await fetch('/api/cartas', {\n    headers: { 'x-rol': rol },\n  });\n  if (!res.ok) return [];\n  return await res.json();\n}/FIX/Envolver en try/catch y retornar [] con mensaje de error al usuario.

FINDING/SECURITY/El header x-rol se toma directamente de sessionStorage y se envía al backend sin ninguna validación de integridad — cualquier usuario puede modificarlo desde DevTools y acceder como organizadora/SNIPPET/headers: { 'x-rol': rol }/FIX/Implementar tokens firmados (JWT) o sesiones server-side en lugar de confiar en el rol desde el cliente.

FINDING/BUG/Al abrir un sobre, sobresGrid.style.display se setea a 'none' pero al cerrar se hardcodea a 'grid' — si el grid usara otro display value en mobile/responsive puede romperse/SNIPPET/sobresGrid.style.display = 'none';\n...\nsobresGrid.style.display = 'grid';/FIX/Guardar el display original antes de ocultarlo y restaurarlo al cerrar.

FINDING/BUG/El panel organizadora no oculta tablaVacia cuando sí hay cartas — si primero estaba visible (sesión previa sin cartas) y luego se recarga con cartas, el mensaje "Aún no hay cartas" puede quedar visible/SNIPPET/if (cartas.length === 0) {\n  tablaVacia.style.display = 'block';\n  return;\n}/FIX/Siempre setear tablaVacia.style.display = 'none' antes del if.
```
