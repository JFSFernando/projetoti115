/* ================= MENU LATERAL ================= */
 
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
 
menuBtn.addEventListener("click", function () {
    sidebar.classList.toggle("active");
});
 
/* ================= SENHA (MOSTRAR / OCULTAR) ================= */
 
const senha = document.getElementById("senha");
const btnSenha = document.getElementById("mostrarSenha");
 
btnSenha.addEventListener("click", function () {
 
    if (senha.type === "password") {
        senha.type = "text";
        btnSenha.innerHTML = "🙈";
    } else {
        senha.type = "password";
        btnSenha.innerHTML = "👁";
    }
 
});
 
/* ================= ELEMENTOS DO FORM ================= */
 
const form = document.getElementById("loginForm");
const email = document.getElementById("email");
 
const erroEmail = document.getElementById("erroEmail");
const erroSenha = document.getElementById("erroSenha");
const erroCaptcha = document.getElementById("erroCaptcha");
 
const captcha = document.getElementById("captcha");
 
/* ================= VALIDAÇÃO DE LOGIN ================= */
 
form.addEventListener("submit", function (e) {
 
    e.preventDefault();
 
    let valido = true;
 
    erroEmail.textContent = "";
    erroSenha.textContent = "";
    erroCaptcha.textContent = "";
 
    /* EMAIL */
 
    if (email.value.trim() === "") {
        erroEmail.textContent = "Digite seu e-mail.";
        valido = false;
    }
 
    else if (!email.value.includes("@")) {
        erroEmail.textContent = "E-mail inválido.";
        valido = false;
    }
 
    /* SENHA */
 
    if (senha.value.trim() === "") {
        erroSenha.textContent = "Digite sua senha.";
        valido = false;
    }
 
    else if (senha.value.length < 6) {
        erroSenha.textContent = "Senha deve ter pelo menos 6 caracteres.";
        valido = false;
    }
 
    /* CAPTCHA */
 
    if (!captcha.checked) {
        erroCaptcha.textContent = "Confirme que não é um robô.";
        valido = false;
    }
 
    /* SUCESSO */
 
    if (valido) {
        mostrarToast("Login realizado com sucesso!");
        mostrarMFA();
    }
 
});
 
/* ================= LEMBRAR-ME (LOCALSTORAGE) ================= */
 
const lembrar = document.getElementById("lembrar");
 
window.addEventListener("load", function () {
 
    const emailSalvo = localStorage.getItem("email");
 
    if (emailSalvo) {
        email.value = emailSalvo;
        lembrar.checked = true;
    }
 
});
 
form.addEventListener("submit", function () {
 
    if (lembrar.checked) {
        localStorage.setItem("email", email.value);
    } else {
        localStorage.removeItem("email");
    }
 
});
 
/* ================= MODAL (RECUPERAR SENHA) ================= */
 
const modal = document.getElementById("modal");
const esqueciSenha = document.getElementById("esqueciSenha");
const fechar = document.querySelector(".fechar");
 
esqueciSenha.addEventListener("click", function (e) {
    e.preventDefault();
    modal.style.display = "flex";
});
 
fechar.addEventListener("click", function () {
    modal.style.display = "none";
});
 
window.addEventListener("click", function (e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
 
 
/* ================= TOAST ================= */
 
function mostrarToast(mensagem) {
 
    const toast = document.getElementById("toast");
 
    toast.textContent = mensagem;
    toast.style.display = "block";
 
    setTimeout(() => {
        toast.style.display = "none";
    }, 3000);
 
}
 
/* ================= MFA (2 ETAPAS) ================= */
 
const mfa = document.getElementById("mfa");
const codigo = document.getElementById("codigo");
const btnVerificar = document.getElementById("verificarCodigo");
 
function mostrarMFA() {
    setTimeout(() => {
        mfa.style.display = "block";
        mostrarToast("Código de verificação enviado!");
    }, 1000);
}
 
btnVerificar.addEventListener("click", function () {
 
    if (codigo.value.length === 6 && !isNaN(codigo.value)) {
 
        mostrarToast("Login confirmado com sucesso!");
        mfa.style.display = "none";
 
    } else {
        mostrarToast("Código inválido!");
    }
 
});
 
/* ================= CARROSSEL ================= */
 
const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
 
let index = 0;
 
function mostrarSlide(i) {
 
    slides.forEach(slide => slide.classList.remove("active"));
 
    slides[i].classList.add("active");
 
}
 
function proximoSlide() {
    index++;
    if (index >= slides.length) index = 0;
    mostrarSlide(index);
}
 
function voltarSlide() {
    index--;
    if (index < 0) index = slides.length - 1;
    mostrarSlide(index);
}
 
next.addEventListener("click", proximoSlide);
prev.addEventListener("click", voltarSlide);
 
/* AUTO CARROSSEL */
 
setInterval(() => {
    proximoSlide();
}, 4000);
 
/* ================= BOTÕES SOCIAIS ================= */
 
const btnGoogle = document.querySelector(".google");
const btnApple = document.querySelector(".apple");
const btnParceiro = document.querySelector(".btn-outline");
 
btnGoogle.addEventListener("click", function () {
    mostrarToast("Redirecionando para Google...");
});
 
btnApple.addEventListener("click", function () {
    mostrarToast("Redirecionando para Apple...");
});
 
btnParceiro.addEventListener("click", function () {
    mostrarToast("Redirecionando para cadastro de parceiro...");
});
 
/* ================= LOADING SIMULADO NO LOGIN ================= */
 
const btnLogin = document.querySelector(".btn-login");
 
btnLogin.addEventListener("click", function () {
 
    btnLogin.textContent = "Entrando...";
    btnLogin.disabled = true;
 
    setTimeout(() => {
        btnLogin.textContent = "Entrar";
        btnLogin.disabled = false;
    }, 2000);
 
});

document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    const termos = document.getElementById("termos").checked;

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    if (!termos) {
        alert("Você precisa aceitar os Termos de Uso.");
        return;
    }

    alert("Cadastro realizado com sucesso!");

    // Redireciona para a página de login
    window.location.href = "login.html";
});