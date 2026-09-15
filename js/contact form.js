/* PortAxl — formulario de contacto conectado a Web3Forms.
   Envía el mensaje de verdad al correo asociado a la Access Key. */
(function () {
  const WEB3FORMS_ACCESS_KEY = "f85399f9-2ec6-47aa-99c9-7723dc61ab71";
  const FORM_ENDPOINT = "https://api.web3forms.com/submit";

  const form = document.getElementById('contactForm');
  if (!form) return;

  const btn = document.getElementById('sendBtn');
  const label = btn.querySelector('.label.show');
  const spinner = btn.querySelector('.spinner');
  const check = btn.querySelector('.check');
  const done = btn.querySelector('.done-label');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (btn.classList.contains('loading') || btn.classList.contains('done')) return;

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    if (!nombre || !correo || !mensaje) return;

    // Estado: enviando
    label.classList.remove('show');
    btn.classList.add('loading');
    setTimeout(() => spinner.classList.add('show'), 250);

    const formData = new FormData();
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('name', nombre);
    formData.append('email', correo);
    formData.append('message', mensaje);
    formData.append('subject', 'Nuevo mensaje desde tu portafolio');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });
      const data = await response.json();

      if (!response.ok || !data.success) throw new Error('Envío rechazado');

      // Estado: éxito
      spinner.classList.remove('show');
      check.classList.add('show');
      btn.classList.remove('loading');
      btn.classList.add('done');
      setTimeout(() => {
        check.classList.remove('show');
        done.classList.add('show');
      }, 1500);
      form.reset();
    } catch (err) {
      // Estado: error — regresa el botón a como estaba y avisa
      spinner.classList.remove('show');
      btn.classList.remove('loading');
      label.classList.add('show');
      alert('Hubo un problema al enviar tu mensaje. Intenta de nuevo o escríbeme directo a membrenomorenoaxl@gmail.com');
    }
  });
})();