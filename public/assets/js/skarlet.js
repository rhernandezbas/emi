// ── Lógica skarlet.html — vista de la festejada ──

const COLORES = {
  rosa: '#f8c8d4',
  lila: '#d8c8f0',
  menta: '#c8f0e0',
  celeste: '#c8e8f8',
  amarillo: '#f8f0c0',
  melocoton: '#f8d8c0',
};

// ── Referencias DOM ──
const accesoScreen = document.getElementById('accesoScreen');
const cajaSobres   = document.getElementById('cajaSobres');
const sobresGrid   = document.getElementById('sobresGrid');
const sobreAbierto = document.getElementById('sobreAbierto');
const sobreNombre  = document.getElementById('sobreNombre');
const sobreMensaje = document.getElementById('sobreMensaje');
const sobreFoto    = document.getElementById('sobreFoto');
const btnCerrar    = document.getElementById('btnCerrar');

// ── Login Skarlet ──
document.getElementById('btnSkarletLogin').addEventListener('click', async () => {
  const clave = document.getElementById('skarletClave').value.trim();
  const err   = document.getElementById('skarletError');
  err.style.display = 'none';
  try {
    const res  = await fetch('/api/auth/skarlet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clave }),
    });
    const data = await res.json();
    if (data.ok) {
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

// ── Cargar cartas ──
async function cargarCartas() {
  try {
    const res = await fetch('/api/cartas', {
      headers: { 'x-rol': 'festejada' },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

// ── Mostrar caja de sobres ──
async function mostrarCajaSobres() {
  accesoScreen.style.display = 'none';
  cajaSobres.style.display = 'block';
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

let sobresGridDisplay = '';

function abrirSobre(carta) {
  sobreNombre.textContent = `De: ${carta.nombre_remitente}`;
  sobreMensaje.textContent = carta.mensaje;
  if (carta.foto_url) {
    sobreFoto.src = carta.foto_url;
    sobreFoto.style.display = 'block';
  } else {
    sobreFoto.style.display = 'none';
  }
  sobresGridDisplay = sobresGrid.style.display;
  sobresGrid.style.display = 'none';
  sobreAbierto.classList.add('visible');
  sobreAbierto.style.background = COLORES[carta.color_sobre] || '#fff';
}

if (btnCerrar) {
  btnCerrar.addEventListener('click', () => {
    sobreAbierto.classList.remove('visible');
    sobresGrid.style.display = sobresGridDisplay || 'grid';
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// ── Reanudar sesión activa ──
(function init() {
  if (sessionStorage.getItem('rol') === 'festejada') {
    mostrarCajaSobres();
  }
})();
