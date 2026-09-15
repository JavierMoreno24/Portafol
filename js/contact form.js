// Reemplaza esto con la Access Key que te dio Web3Forms por correo
const WEB3FORMS_ACCESS_KEY = "f85399f9-2ec6-47aa-99c9-7723dc61ab71";
const FORM_ENDPOINT = "https://api.web3forms.com/submit";

const form = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (!nombre || !correo || !mensaje) return;

  // Estado: enviando (muestra el spinner, oculta el label "Enviar")
  sendBtn.classList.add("sending");
  sendBtn.disabled = true;

  // Web3Forms requiere la access_key dentro del propio formulario
  const formData = new FormData(form);
  formData.append("access_key", WEB3FORMS_ACCESS_KEY);
  formData.append("name", nombre);
  formData.append("email", correo);
  formData.append("message", mensaje);

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: formData,
    });

    const data = await response.json();

    if (response.ok && data.success) {
      // Estado: éxito (muestra el check y "Mensaje enviado")
      sendBtn.classList.remove("sending");
      sendBtn.classList.add("sent");
      form.reset();
    } else {
      throw new Error("Error en el envío");
    }
  } catch (err) {
    sendBtn.classList.remove("sending");
    sendBtn.disabled = false;
    alert("Hubo un problema al enviar tu mensaje. Intenta de nuevo o escríbeme directo a .com");
  }
});