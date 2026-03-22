// ── Lógica del formulario de invitadas ──

const form = document.getElementById('cartaForm');
const formContainer = document.getElementById('formContainer');
const confirmacion = document.getElementById('confirmacion');
const fotoInput = document.getElementById('foto');
const fotoPreview = document.getElementById('fotoPreview');
const colorInput = document.getElementById('color_sobre');
const colorError = document.getElementById('colorError');

// Preview de foto
if (fotoInput) {
  fotoInput.addEventListener('change', () => {
    const file = fotoInput.files[0];
    if (file) {
      fotoPreview.src = URL.createObjectURL(file);
      fotoPreview.classList.add('visible');
    } else {
      fotoPreview.classList.remove('visible');
    }
  });
}

// Selector de color
document.querySelectorAll('.color-option').forEach(opt => {
  function seleccionar() {
    document.querySelectorAll('.color-option').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
    colorInput.value = opt.dataset.color;
    colorError.style.display = 'none';
  }
  opt.addEventListener('click', seleccionar);
  opt.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); seleccionar(); }
  });
});

// Envío del formulario a /api/cartas
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();

    if (!colorInput.value) {
      colorError.style.display = 'block';
      return;
    }

    const formData = new FormData(form);
    try {
      const res = await fetch('/api/cartas', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        alert('Hubo un error al enviar tu carta. Por favor intentá de nuevo.');
        return;
      }
      const data = await res.json();
      if (data.ok) {
        formContainer.style.display = 'none';
        confirmacion.classList.add('visible');
      } else {
        alert('Hubo un error al enviar tu carta. Por favor intentá de nuevo.');
      }
    } catch (err) {
      alert('No se pudo conectar con el servidor. Intentá más tarde.');
    }
  });
}
