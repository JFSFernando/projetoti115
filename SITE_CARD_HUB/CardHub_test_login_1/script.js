/* ===========================================
   CARD HUB
   PARTE 3A - LOGIN, CADASTRO E LOCALSTORAGE
===========================================*/

document.addEventListener("DOMContentLoaded", () => {

    //==============================
    // ELEMENTOS
    //==============================

    const form = document.getElementById("loginForm");

    const email = document.getElementById("email");
    const senha = document.getElementById("senha");

    const erroEmail = document.getElementById("erroEmail");
    const erroSenha = document.getElementById("erroSenha");
    const erroCaptcha = document.getElementById("erroCaptcha");

    const captcha = document.getElementById("captcha");
    const lembrar = document.getElementById("lembrar");

    const btnLogin = document.getElementById("btnEntrar");

    //==============================
    // CARREGAR EMAIL SALVO
    //==============================

    const emailSalvo = localStorage.getItem("emailLembrado");

    if (emailSalvo) {

        email.value = emailSalvo;
        lembrar.checked = true;

    }

    //==============================
    // CADASTRO
    //==============================

    const btnCriarConta = document.getElementById("btnCriarConta");
    const cadastroForm = document.getElementById("cadastroForm");

    btnCriarConta.addEventListener("click", () => {

        cadastroForm.classList.toggle("hidden");

        btnCriarConta.textContent =
            cadastroForm.classList.contains("hidden")
                ? "Criar Conta"
                : "Fechar Cadastro";

    });

    //==============================
    // CRIAR CONTA
    //==============================

    document
        .getElementById("criarConta")
        .addEventListener("click", () => {

            const usuario = {

                nome: document.getElementById("nomeCadastro").value.trim(),

                email: document.getElementById("emailCadastro").value.trim(),

                telefone: document.getElementById("telefoneCadastro").value.trim(),

                senha: document.getElementById("senhaCadastro").value

            };

            const confirmar =
                document.getElementById("confirmarSenhaCadastro").value;

            if (
                usuario.nome === "" ||
                usuario.email === "" ||
                usuario.telefone === "" ||
                usuario.senha === ""
            ) {

                alert("Preencha todos os campos.");
                return;

            }

            if (usuario.senha !== confirmar) {

                alert("As senhas não coincidem.");
                return;

            }

            localStorage.setItem(
                "usuarioCardHub",
                JSON.stringify(usuario)
            );

            alert("Conta criada com sucesso!");

            cadastroForm.classList.add("hidden");
            btnCriarConta.textContent = "Criar Conta";

        });

    //==============================
    // LOGIN
    //==============================

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        erroEmail.textContent = "";
        erroSenha.textContent = "";
        erroCaptcha.textContent = "";

        let valido = true;

        if (email.value.trim() === "") {

            erroEmail.textContent = "Digite seu e-mail.";
            valido = false;

        }

        if (senha.value.trim() === "") {

            erroSenha.textContent = "Digite sua senha.";
            valido = false;

        }

        if (!captcha.checked) {

            erroCaptcha.textContent = "Confirme que não é um robô.";
            valido = false;

        }

        if (!valido) return;

        const usuario = JSON.parse(
            localStorage.getItem("usuarioCardHub")
        );

        if (!usuario) {

            alert("Nenhuma conta cadastrada.");

            return;

        }

        if (
            email.value !== usuario.email ||
            senha.value !== usuario.senha
        ) {

            alert("E-mail ou senha incorretos.");

            return;

        }

        //==============================
        // LEMBRAR EMAIL
        //==============================

        if (lembrar.checked) {

            localStorage.setItem(
                "emailLembrado",
                email.value
            );

        } else {

            localStorage.removeItem("emailLembrado");

        }

        //==============================
        // BOTÃO
        //==============================

        btnLogin.disabled = true;
        btnLogin.textContent = "Entrando...";

        setTimeout(() => {

            window.location.href =
                "../CardHub_test_dashboard_2/index.html";

        }, 2000);

    });

});

/* ===========================================
   CARD HUB
   PARTE 3B - SENHA, TOAST, MODAL E MFA
===========================================*/

//==============================
// MOSTRAR / OCULTAR SENHA
//==============================

const campoSenha = document.getElementById("senha");
const btnMostrarSenha = document.getElementById("mostrarSenha");

if (btnMostrarSenha && campoSenha) {

    btnMostrarSenha.addEventListener("click", () => {

        if (campoSenha.type === "password") {

            campoSenha.type = "text";

            btnMostrarSenha.innerHTML =
                '<i class="fa-solid fa-eye-slash"></i>';

        } else {

            campoSenha.type = "password";

            btnMostrarSenha.innerHTML =
                '<i class="fa-solid fa-eye"></i>';

        }

    });

}


//==============================
// TOAST
//==============================

function mostrarToast(mensagem) {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = mensagem;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


//==============================
// RECUPERAR SENHA
//==============================

const modal = document.getElementById("modal");
const btnEsqueci = document.getElementById("esqueciSenha");
const fecharModal = document.querySelector(".fechar");
const btnEnviarRecuperacao =
    document.getElementById("enviarRecuperacao");

if (btnEsqueci) {

    btnEsqueci.addEventListener("click", (e) => {

        e.preventDefault();

        modal.style.display = "flex";

    });

}

if (fecharModal) {

    fecharModal.addEventListener("click", () => {

        modal.style.display = "none";

    });

}

window.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.style.display = "none";

    }

});


if (btnEnviarRecuperacao) {

    btnEnviarRecuperacao.addEventListener("click", () => {

        const email =
            document.getElementById("emailRecuperacao").value;

        if (email === "") {

            mostrarToast("Digite um e-mail.");

            return;

        }

        mostrarToast("Link enviado com sucesso!");

        modal.style.display = "none";

    });

}



//==============================
// MFA
//==============================

const mfa = document.getElementById("mfa");
const codigo = document.getElementById("codigo");
const btnVerificar =
    document.getElementById("verificarCodigo");

let codigoGerado = "";

function gerarCodigo() {

    codigoGerado = "";

    for (let i = 0; i < 6; i++) {

        codigoGerado +=
            Math.floor(Math.random() * 10);

    }

    console.log("Código MFA:", codigoGerado);

    mostrarToast("Código enviado!");

}

function abrirMFA() {

    if (!mfa) return;

    mfa.style.display = "block";

    gerarCodigo();

}

if (btnVerificar) {

    btnVerificar.addEventListener("click", () => {

        if (codigo.value === codigoGerado) {

            mostrarToast("Código confirmado!");

            setTimeout(() => {

                window.location.href =
                    "../CardHub_test_dashboard_2/index.html";

            }, 1200);

        } else {

            mostrarToast("Código inválido.");

        }

    });

}

/* ===========================================
   CARD HUB
   PARTE 3C - CARROSSEL E BOTÕES
===========================================*/

//==============================
// CARROSSEL
//==============================

const slides = document.querySelectorAll(".slide");
const btnPrev = document.querySelector(".prev");
const btnNext = document.querySelector(".next");

let slideAtual = 0;

function mostrarSlide(indice) {

    if (slides.length === 0) return;

    slides.forEach(slide => {

        slide.classList.remove("active");

    });

    slides[indice].classList.add("active");

}

function proximoSlide() {

    slideAtual++;

    if (slideAtual >= slides.length) {

        slideAtual = 0;

    }

    mostrarSlide(slideAtual);

}

function slideAnterior() {

    slideAtual--;

    if (slideAtual < 0) {

        slideAtual = slides.length - 1;

    }

    mostrarSlide(slideAtual);

}

if (btnNext) {

    btnNext.addEventListener("click", proximoSlide);

}

if (btnPrev) {

    btnPrev.addEventListener("click", slideAnterior);

}

if (slides.length > 0) {

    mostrarSlide(0);

    setInterval(() => {

        proximoSlide();

    }, 4000);

}



//==============================
// BOTÕES SOCIAIS
//==============================

const btnGoogle = document.querySelector(".google");
const btnApple = document.querySelector(".apple");
const btnParceiro = document.querySelector(".btn-outline");

if (btnGoogle) {

    btnGoogle.addEventListener("click", () => {

        mostrarToast("Login com Google em desenvolvimento.");

    });

}

if (btnApple) {

    btnApple.addEventListener("click", () => {

        mostrarToast("Login com Apple em desenvolvimento.");

    });

}

if (btnParceiro) {

    btnParceiro.addEventListener("click", () => {

        mostrarToast("Cadastro de parceiro em desenvolvimento.");

    });

}



//==============================
// FECHAR MODAL COM ESC
//==============================

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        const modal = document.getElementById("modal");

        if (modal) {

            modal.style.display = "none";

        }

    }

});



//==============================
// ANIMAÇÃO DOS INPUTS
//==============================

const campos = document.querySelectorAll("input");

campos.forEach(campo => {

    campo.addEventListener("focus", () => {

        campo.classList.add("focus");

    });

    campo.addEventListener("blur", () => {

        if (campo.value.trim() === "") {

            campo.classList.remove("focus");

        }

    });

});



//==============================
// BOAS-VINDAS
//==============================

window.addEventListener("load", () => {

    console.log("Card Hub iniciado com sucesso!");

});

