document.addEventListener("DOMContentLoaded", () => {

  // ----- Menu mobile -----
  const menuToggle = document.querySelector(".menu-toggle");
  const navbar = document.getElementById("navbar");

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navbar.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navbar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navbar.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ----- Formulário de contato -----
  const formulario = document.getElementById("formulario-contato");
  if (!formulario) return;

  const status = formulario.querySelector(".form-status");
  const botao = formulario.querySelector("button[type='submit']");

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const dados = new FormData(formulario);
    const objetoDados = Object.fromEntries(dados);

    botao.disabled = true;
    status.textContent = "Enviando mensagem...";

    try {
      const resposta = await fetch(formulario.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(objetoDados)
      });

      if (resposta.ok) {
        status.textContent = "Mensagem enviada com sucesso! Obrigado pelo contato.";
        formulario.reset();
      } else {
        status.textContent = "Não foi possível enviar. Verifique os dados e tente novamente.";
      }
    } catch (erro) {
      status.textContent = "Erro de conexão. Tente novamente em instantes.";
    } finally {
      botao.disabled = false;
    }
  });

});
