// Seleciona os elementos da página

const elemento = document.getElementById('meuElemento');
const texto = document.getElementById('meuTexto');

 

// Pega a hora atual do computador do usuário (executa ao carregar a página)
const horaAtual = new Date().getHours();
 
// Elementos HTML
const msgDia = document.getElementById('msg-dia');
const msgNoite = document.getElementById('msg-noite');
 
// Condição: Se a hora for menor que 18 (antes das 18h), mostra a mensagem de dia
if (horaAtual < 18) {
    msgDia.classList.add('visivel');
} else {
    // Caso contrário, mostra a mensagem de noite
    msgNoite.classList.add('visivel');
}

// Adiciona um evento de clique ao elemento

elemento.addEventListener('click', function() {
    // Verifica se o elemento tem a classe atual
    if (elemento.classList.contains('estado-inicial')) {
        // Altera a classe CSS
        elemento.classList.remove('estado-inicial');
        elemento.classList.add('estado-vermelho');

        // Altera o conteúdo HTML
        texto.innerHTML = "O estado atual é: <strong>Perigo (Vermelho)!</strong>";

    } else if (elemento.classList.contains('estado-vermelho')) {
        elemento.classList.remove('estado-vermelho');
        elemento.classList.add('estado-verde');
        texto.innerHTML = "O estado atual é: <strong>Liberado (Verde)!</strong>";

    } else {
        elemento.classList.remove('estado-verde');
        elemento.classList.add('estado-inicial');
        texto.innerHTML = "O estado atual é: Inicial.";
    }
});

function desativarBotao() {
  document.getElementById("meuBotao").disabled = true;
  console.log("Botão desabilitado!");
}
 
function ativarBotao() {
  document.getElementById("meuBotao").disabled = false;
  console.log("Botão habilitado!");
}

/* Esta classe será usada pelo JavaScript para esconder os itens */


// Pega o input de busca e a lista de produtos
const campoBusca = document.getElementById('campoBusca');
const listaProdutos = document.getElementById('listaProdutos');
const produtos = listaProdutos.getElementsByClassName('produto');
 
// Adiciona um evento que dispara sempre que algo é digitado
campoBusca.addEventListener('input', function() {
    // Pega o valor digitado e passa para minúsculo para evitar problemas de capitalização
    const textoDigitado = campoBusca.value.toLowerCase();
 
    // Percorre todos os produtos da lista
    for (let i = 0; i < produtos.length; i++) {
        const produto = produtos[i];
        const textoProduto = produto.textContent.toLowerCase();
 
        // Verifica se o texto digitado existe dentro do nome do produto
        if (textoProduto.includes(textoDigitado)) {
            // Remove a classe oculto para mostrar o produto
            produto.classList.remove('oculto');
        } else {
            // Adiciona a classe oculto para esconder o produto
            produto.classList.add('oculto');
        }
    }
});

