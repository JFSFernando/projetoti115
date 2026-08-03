const botoes = document.querySelectorAll(".comprar");

botoes.forEach(botao => {

    botao.addEventListener("click", function(){

        const produto = this.parentElement.querySelector("h3").textContent;

        alert(produto + " adicionado ao carrinho!");

    });

});

const formulario = document.getElementById("newsletter");

formulario.addEventListener("submit", function(e){

    e.preventDefault();

    alert("Cadastro realizado com sucesso!");

    formulario.reset();

});