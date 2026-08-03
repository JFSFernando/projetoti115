// Aguarda o carregamento da página
window.onload = function () {
 
    const formulario = document.querySelector("form");
    const email = document.querySelector('input[type="email"]');
    const senha = document.querySelector('input[type="password"]');
 
    // Evento de foco
    email.addEventListener("focus", function () {
        this.style.borderColor = "#ff7a00";
    });
 
    senha.addEventListener("focus", function () {
        this.style.borderColor = "#ff7a00";
    });
 
    // Evento ao sair do campo
    email.addEventListener("blur", function () {
        this.style.borderColor = "#333";
    });
 
    senha.addEventListener("blur", function () {
        this.style.borderColor = "#333";
    });
 
    // Validação do formulário
    formulario.addEventListener("submit", function (event) {
 
        event.preventDefault();
 
        let emailValor = email.value.trim();
        let senhaValor = senha.value.trim();
 
        if (emailValor === "" || senhaValor === "") {
            alert("Preencha todos os campos!");
            return;
        }
 
        if (!emailValor.includes("@")) {
            alert("Digite um e-mail válido!");
            return;
        }
 
        if (senhaValor.length < 6) {
            alert("A senha deve ter pelo menos 6 caracteres!");
            return;
        }
 
        alert("Login realizado com sucesso!");
 
        formulario.reset();
    });
 
    // Botão Google
    const btnGoogle = document.querySelectorAll(".btn-social")[0];
 
    btnGoogle.addEventListener("click", function () {
        alert("Login com Google em desenvolvimento.");
    });
 
    // Botão Apple
    const btnApple = document.querySelectorAll(".btn-social")[1];
 
    btnApple.addEventListener("click", function () {
        alert("Login com Apple em desenvolvimento.");
    });
 
    // Botão parceiro
    const btnParceiro = document.querySelector(".btn-outline");
 
    btnParceiro.addEventListener("click", function () {
        alert("Redirecionando para cadastro de parceiros...");
    });
 
};

