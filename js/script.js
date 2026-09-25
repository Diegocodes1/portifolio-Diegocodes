document.addEventListener("DOMContentLoaded", () => {

  // ----- Menu mobile -----
  const menuToggle = document.querySelector(".menu-toggle");
  const navbar = document.getElementById("navbar");
  const menuLabel = document.getElementById("menu-label");

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navbar.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      if (menuLabel) {
        menuLabel.textContent = isOpen ? "Fechar menu" : "Abrir menu";
      }
    });

    navbar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navbar.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        if (menuLabel) {
          menuLabel.textContent = "Abrir menu";
        }
      });
    });

    document.addEventListener("keydown", (evento) => {
      if (evento.key === "Escape" && navbar.classList.contains("is-open")) {
        navbar.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        if (menuLabel) {
          menuLabel.textContent = "Abrir menu";
        }
        menuToggle.focus();
      }
    });
  }

  // ----- Formulário de contato -----
  const formulario = document.getElementById("formulario-contato");
  if (!formulario) return;

  const status = formulario.querySelector(".form-status");
  const botao = formulario.querySelector("button[type='submit']");

  if (!status || !botao) {
    console.error("Formulário de contato incompleto: status ou botão de envio ausente.");
    return;
  }

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const dados = new FormData(formulario);
    const objetoDados = Object.fromEntries(dados);

    botao.disabled = true;
    formulario.setAttribute("aria-busy", "true");
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
        console.error("Falha ao enviar formulário:", resposta.status, resposta.statusText);
        status.textContent = "Não foi possível enviar. Verifique os dados e tente novamente.";
      }
    } catch (erro) {
      console.error("Erro de conexão ao enviar formulário:", erro);
      status.textContent = "Erro de conexão. Tente novamente em instantes.";
    } finally {
      botao.disabled = false;
      formulario.removeAttribute("aria-busy");
    }
  });

});
