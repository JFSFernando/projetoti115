const formulario = document.getElementById("formulario");

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const telefone = document.getElementById("telefone");
const cpf = document.getElementById("cpf");
const mensagemSucesso = document.getElementById("mensagemSucesso");

formulario.addEventListener("submit", function(e) {
    e.preventDefault();

    let valido = true;

    if (!validarCampo(nome, "Nome é obrigatório")) {
        valido = false;
    }

    if (!validarEmail()) {
        valido = false;
    }

    if (!validarTelefone()) {
        valido = false;
    }

    if (!validarCPF()) {
        valido = false;
    }

    if (valido) {
        mensagemSucesso.textContent =
            "Formulário enviado com sucesso!";
    } else {
        mensagemSucesso.textContent = "";
    }
});

function mostrarErro(input, mensagem) {
    const campo = input.parentElement.parentElement;

    campo.classList.remove("sucesso");
    campo.classList.add("falha");

    campo.querySelector(".erro").textContent = mensagem;
}

function mostrarSucesso(input) {
    const campo = input.parentElement.parentElement;

    campo.classList.remove("falha");
    campo.classList.add("sucesso");

    campo.querySelector(".erro").textContent = "";
}

function validarCampo(input, mensagem) {
    if (input.value.trim() === "") {
        mostrarErro(input, mensagem);
        return false;
    }

    mostrarSucesso(input);
    return true;
}

function validarEmail() {

    const valor = email.value.trim();

    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (valor === "") {
        mostrarErro(email, "E-mail é obrigatório");
        return false;
    }

    if (!regex.test(valor)) {
        mostrarErro(email, "E-mail inválido");
        return false;
    }

    mostrarSucesso(email);
    return true;
}

function validarTelefone() {

    const valor = telefone.value.trim();

    const regex =
        /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

    if (valor === "") {
        mostrarErro(telefone, "Telefone é obrigatório");
        return false;
    }

    if (!regex.test(valor)) {
        mostrarErro(telefone, "Telefone inválido");
        return false;
    }

    mostrarSucesso(telefone);
    return true;
}

function validarCPF() {

    const valor = cpf.value
        .replace(/\D/g, "");

    if (valor === "") {
        mostrarErro(cpf, "CPF é obrigatório");
        return false;
    }

    if (valor.length !== 11) {
        mostrarErro(cpf, "CPF deve ter 11 dígitos");
        return false;
    }

    mostrarSucesso(cpf);
    return true;
}