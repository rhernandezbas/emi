// ── Lógica caja.html (Skarlet y Emily) ──

const COLORES = {
  rosa: '#f8c8d4',
  lila: '#d8c8f0',
  menta: '#c8f0e0',
  celeste: '#c8e8f8',
  amarillo: '#f8f0c0',
  melocoton: '#f8d8c0',
};

let rolActual = null;

// ── Referencias DOM ──
const accesoScreen      = document.getElementById('accesoScreen');
const cajaSobres        = document.getElementById('cajaSobres');
const panelOrganizadora = document.getElementById('panelOrganizadora');
const sobresGrid        = document.getElementById('sobresGrid');
const sobreAbierto      = document.getElementById('sobreAbierto');
const sobreNombre       = document.getElementById('sobreNombre');
const sobreMensaje      = document.getElementById('sobreMensaje');
const sobreFoto         = document.getElementById('sobreFoto');
const btnCerrar         = document.getElementById('btnCerrar');
const cajaBienvenida    = document.getElementById('cajaBienvenida');

// ── Mostrar formularios de acceso ──
document.getElementById('btnSkarlet').addEventListener('click', () => {
  document.getElementById('formSkarlet').classList.add('visible');
  document.getElementById('formOrganizadora').classList.remove('visible');
});

document.getElementById('btnEmily').addEventListener('click', () => {
  document.getElementById('formOrganizadora').classList.add('visible');
  document.getElementById('formSkarlet').classList.remove('visible');
});

// ── Login Skarlet — valida contra /api/auth/skarlet ──
document.getElementById('btnSkarletLogin').addEventListener('click', async () => {
  const nombre = document.getElementById('skarletNombre').value.trim();
  const fecha  = document.getElementById('skarletFecha').value;
  const err    = document.getElementById('skarletError');
  err.style.display = 'none';
  try {
    const res  = await fetch('/api/auth/skarlet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, fecha }),
    });
    const data = await res.json();
    if (data.ok) {
      rolActual = 'festejada';
      sessionStorage.setItem('rol', 'festejada');
      mostrarCajaSobres();
    } else {
      err.style.display = 'block';
    }
  } catch {
    err.textContent = 'Error de conexión.';
    err.style.display = 'block';
  }
});

// ── Login organizadora — valida contra /api/auth/organizadora ──
document.getElementById('btnEmilyLogin').addEventListener('click', async () => {
  const password = document.getElementById('emilyPassword').value;
  const err      = document.getElementById('emilyError');
  err.style.display = 'none';
  try {
    const res  = await fetch('/api/auth/organizadora', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (data.ok) {
      rolActual = 'organizadora';
      sessionStorage.setItem('rol', 'organizadora');
      mostrarPanelOrganizadora();
    } else {
      err.style.display = 'block';
    }
  } catch {
    err.textContent = 'Error de conexión.';
    err.style.display = 'block';
  }
});

// ── Cargar cartas desde GET /api/cartas ──
async function cargarCartas() {
  const rol = rolActual || sessionStorage.getItem('rol');
  try {
    const res = await fetch('/api/cartas', {
      headers: { 'x-rol': rol },
    });
    if (!res.ok) { mostrarErrorConexion(); return []; }
    return await res.json();
  } catch {
    mostrarErrorConexion();
    return [];
  }
}

function mostrarErrorConexion() {
  const existing = document.getElementById('errorConexion');
  if (existing) return;
  const p = document.createElement('p');
  p.id = 'errorConexion';
  p.style.cssText = 'color:#e87fa0;text-align:center;margin-top:16px;';
  p.textContent = 'Error de conexión. Por favor recargá la página.';
  document.querySelector('.container').appendChild(p);
}

// ── Mostrar caja de sobres (Skarlet) ──
async function mostrarCajaSobres() {
  accesoScreen.style.display = 'none';
  cajaSobres.style.display = 'block';
  cajaBienvenida.textContent = '¡Feliz cumpleaños! Hacé clic en cada sobre para abrirlo 🎀';
  const cartas = await cargarCartas();
  renderizarSobres(cartas);
}

function renderizarSobres(cartas) {
  sobresGrid.innerHTML = '';
  sobreAbierto.classList.remove('visible');

  if (cartas.length === 0) {
    sobresGrid.innerHTML = '<p style="color:#a06070;grid-column:1/-1;text-align:center;">Aún no hay cartas. ¡Pronto llegarán! 💕</p>';
    return;
  }

  cartas.forEach((carta, i) => {
    const sobre = document.createElement('div');
    sobre.className = 'sobre';
    sobre.style.background = COLORES[carta.color_sobre] || COLORES.rosa;
    sobre.style.animationDelay = `${i * 0.08}s`;
    sobre.innerHTML = `
      <div class="sobre-icono">💌</div>
      <div class="sobre-nombre">${escapeHtml(carta.nombre_remitente)}</div>
    `;
    sobre.addEventListener('click', () => abrirSobre(carta));
    sobresGrid.appendChild(sobre);
  });
}

let sobresGridDisplayOriginal = '';

// ── Apertura de sobre ──
function abrirSobre(carta) {
  sobreNombre.textContent = `De: ${carta.nombre_remitente}`;
  sobreMensaje.textContent = carta.mensaje;
  if (carta.foto_url) {
    sobreFoto.src = carta.foto_url;
    sobreFoto.style.display = 'block';
  } else {
    sobreFoto.style.display = 'none';
  }
  sobresGridDisplayOriginal = sobresGrid.style.display;
  sobresGrid.style.display = 'none';
  sobreAbierto.classList.add('visible');
  sobreAbierto.style.background = COLORES[carta.color_sobre] || '#fff';
}

// ── Cerrar sobre y volver a la caja ──
if (btnCerrar) {
  btnCerrar.addEventListener('click', () => {
    sobreAbierto.classList.remove('visible');
    sobresGrid.style.display = sobresGridDisplayOriginal || 'grid';
  });
}

// ── Panel organizadora ──
async function mostrarPanelOrganizadora() {
  accesoScreen.style.display = 'none';
  panelOrganizadora.style.display = 'block';
  const cartas = await cargarCartas();
  const tbody = document.getElementById('tablaBody');
  const tablaVacia = document.getElementById('tablaVacia');
  tbody.innerHTML = '';
  tablaVacia.style.display = 'none';
  if (cartas.length === 0) {
    tablaVacia.style.display = 'block';
    return;
  }
  cartas.forEach((carta, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${escapeHtml(carta.nombre_remitente)}</td>
      <td>${escapeHtml(carta.color_sobre)}</td>
      <td>${carta.foto_url ? '✓' : '–'}</td>
      <td>${carta.fecha_creacion ? new Date(carta.fecha_creacion).toLocaleDateString('es-AR') : '–'}</td>
    `;
    tbody.appendChild(tr);
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// ── Reanudar sesión activa ──
(function init() {
  const rol = sessionStorage.getItem('rol');
  if (rol === 'festejada') {
    rolActual = 'festejada';
    mostrarCajaSobres();
  } else if (rol === 'organizadora') {
    rolActual = 'organizadora';
    mostrarPanelOrganizadora();
  }
})();
