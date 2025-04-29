document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
  
    form.addEventListener("submit", function (event) {
      const nome = document.getElementById("nome").value.trim();
      const email = document.getElementById("email").value.trim();
      const mensagem = document.getElementById("mensagem").value.trim();
  
      if (nome === "" || email === "" || mensagem === "") {
        alert("Por favor, preencha todos os campos.");
        event.preventDefault();
      } else if (!validarEmail(email)) {
        alert("Insira um e-mail válido.");
        event.preventDefault();
      }
    });
  
    function validarEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  });
  