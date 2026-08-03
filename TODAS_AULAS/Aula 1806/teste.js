// MENU LATERAL

function toggleMenu() {
    document
        .getElementById("sidebar")
        .classList.toggle("active");
}

// CARROSSEL

let slideAtual = 0;
const slides = document.querySelectorAll(".slide");

function mostrarSlide(index){

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    if(index >= slides.length){
        slideAtual = 0;
    }

    if(index < 0){
        slideAtual = slides.length - 1;
    }

    slides[slideAtual].classList.add("active");
}

function mudarSlide(direcao){
    slideAtual += direcao;

    if(slideAtual >= slides.length){
        slideAtual = 0;
    }

    if(slideAtual < 0){
        slideAtual = slides.length - 1;
    }

    mostrarSlide(slideAtual);
}

// Troca automática a cada 4 segundos

setInterval(() => {
    slideAtual++;

    if(slideAtual >= slides.length){
        slideAtual = 0;
    }

    mostrarSlide(slideAtual);

}, 4000);