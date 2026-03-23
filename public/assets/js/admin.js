// ── Lógica admin.html — vista de la organizadora ──

// ── Referencias DOM ──
const accesoScreen    = document.getElementById('accesoScreen');
const panelAdmin      = document.getElementById('panelAdmin');

// ── Login organizadora ──
document.getElementById('btnAdminLogin').addEventListener('click', async () => {
  const password = document.getElementById('adminPassword').value;
  const err      = document.getElementById('adminError');
  err.style.display = 'none';
  try {
    const res  = await fetch('/api/auth/organizadora', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (data.ok) {
      sessionStorage.setItem('rol', 'organizadora');
      mostrarPanel();
    } else {
      err.style.display = 'block';
    }
  } catch {
    err.textContent = 'Error de conexión.';
    err.style.display = 'block';
  }
});

// ── Cargar cartas ──
async function cargarCartas() {
  try {
    const res = await fetch('/api/cartas', {
      headers: { 'x-rol': 'organizadora' },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

// ── Mostrar panel con tabla ──
async function mostrarPanel() {
  accesoScreen.style.display = 'none';
  panelAdmin.style.display = 'block';
  const cartas = await cargarCartas();
  const tbody     = document.getElementById('tablaBody');
  const tablaVacia = document.getElementById('tablaVacia');
  tbody.innerHTML = '';
  tablaVacia.style.display = 'none';
  if (cartas.length === 0) {
    tablaVacia.style.display = 'block';
    return;
  }
  cartas.forEach((carta, i) => {
    const tr = document.createElement('tr');
    tr.dataset.id = carta.id;
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${escapeHtml(carta.nombre_remitente)}</td>
      <td>${escapeHtml(carta.color_sobre)}</td>
      <td>${carta.foto_url ? '✓' : '–'}</td>
      <td>${carta.fecha_creacion ? new Date(carta.fecha_creacion).toLocaleDateString('es-AR') : '–'}</td>
      <td><button class="btn-eliminar" data-id="${carta.id}">🗑</button></td>
    `;
    tbody.appendChild(tr);
  });

  tbody.addEventListener('click', async (e) => {
    const btn = e.target.closest('.btn-eliminar');
    if (!btn) return;
    const id = btn.dataset.id;
    const res = await fetch(`/api/cartas/${id}`, {
      method: 'DELETE',
      headers: { 'x-rol': 'organizadora' },
    });
    const data = await res.json();
    if (data.ok) {
      btn.closest('tr').remove();
    }
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// ── Reanudar sesión activa ──
(function init() {
  if (sessionStorage.getItem('rol') === 'organizadora') {
    mostrarPanel();
  }
})();
