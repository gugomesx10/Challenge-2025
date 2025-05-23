document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");
  const btn = document.getElementById("toggleMenuBtn");
  const header = document.querySelector("header");

  if (menu && btn && header) {
    btn.addEventListener("click", () => {
      const isVisible = menu.classList.toggle("visible");
      header.classList.toggle("aira-expanded", isVisible);

      if (isVisible) {
        btn.textContent = "Fechar Menu";
        btn.setAttribute("aria-label", "Ocultar menu");
      } else {
        btn.textContent = "Menu";
        btn.setAttribute("aria-label", "Mostrar menu");
      }
    });
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }
  });

  const dataConsulta = document.getElementById("dataConsulta");
  if (dataConsulta) {
    const hoje = new Date().toISOString().split("T")[0];
    dataConsulta.setAttribute("min", hoje);
  }

  const formContato = document.getElementById("frmContato");
  if (formContato) {
    formContato.addEventListener("submit", (evento) => {
      evento.preventDefault();

      const nome = document.getElementById("idNome").value.trim();
      const email = document.getElementById("idEmail").value.trim();
      const tel = document.getElementById("idTel").value.trim();

      let isValid = true;
      try {
        if (!nome) throw new Error("O campo nome deve ser preenchido!");
        if (!email) throw new Error("O campo email deve ser preenchido!");
        if (!tel) throw new Error("O campo tel deve ser preenchido!");
      } catch (error) {
        isValid = false;
        alert(error.message);
      }

      if (isValid) {
        let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
        usuarios.push({ nomeObj: nome, emailObj: email, telObj: tel });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Dados cadastrados com sucesso!");
        formContato.submit();
      }
    });
  }

  const formGeral = document.querySelector("form:not(#frmContato)");
  if (formGeral) {
    formGeral.addEventListener("submit", (event) => {
      const nome = document.getElementById("nome")?.value.trim() || "";
      const email = document.getElementById("email")?.value.trim() || "";
      const mensagem = document.getElementById("mensagem")?.value.trim() || "";

      if (nome === "" || email === "" || mensagem === "") {
        alert("Por favor, preencha todos os campos.");
        event.preventDefault();
      } else if (!validarEmail(email)) {
        alert("Insira um e-mail válido.");
        event.preventDefault();
      }
    });
  }

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
