/*==========================================
            PESQUISA DE PRODUTOS
==========================================*/

const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("keyup", () => {

    const texto = pesquisa.value.toLowerCase();

    const linhas = document.querySelectorAll("#listaProdutos tr");

    linhas.forEach(linha => {

        const produto = linha.children[1].textContent.toLowerCase();

        linha.style.display = produto.includes(texto)
            ? ""
            : "none";

    });

});


/*==========================================
            FILTRO POR CATEGORIA
==========================================*/

const categoria = document.getElementById("categoria");

categoria.addEventListener("change", () => {

    const valor = categoria.value;

    const linhas = document.querySelectorAll("#listaProdutos tr");

    linhas.forEach(linha => {

        const categoriaProduto = linha.children[2].textContent;

        if (valor === "Todos") {

            linha.style.display = "";

        } else {

            linha.style.display =
                categoriaProduto === valor
                ? ""
                : "none";

        }

    });

});


/*==========================================
            BOTÃO NOVO PRODUTO
==========================================*/

document
.getElementById("novoProduto")
.addEventListener("click", () => {

    alert("Abrindo tela de cadastro de produto...");

});


/*==========================================
            VISUALIZAR
==========================================*/

document.querySelectorAll(".visualizar")
.forEach(botao => {

    botao.addEventListener("click", function(){

        const linha = this.closest("tr");

        const produto = linha.children[1].textContent;

        const categoria = linha.children[2].textContent;

        const preco = linha.children[3].textContent;

        alert(

`Produto: ${produto}

Categoria: ${categoria}

Preço: ${preco}`

        );

    });

});


/*==========================================
            EDITAR
==========================================*/

document.querySelectorAll(".editar")
.forEach(botao => {

    botao.addEventListener("click", function(){

        const linha = this.closest("tr");

        const produto = linha.children[1].textContent;

        alert("Editar produto: " + produto);

    });

});


/*==========================================
            EXCLUIR
==========================================*/

document.querySelectorAll(".excluir")
.forEach(botao => {

    botao.addEventListener("click", function(){

        const linha = this.closest("tr");

        const produto = linha.children[1].textContent;

        if(confirm("Deseja excluir " + produto + "?")){

            linha.remove();

        }

    });

});


/*==========================================
            HOVER NAS LINHAS
==========================================*/

document.querySelectorAll("#listaProdutos tr")
.forEach(linha => {

    linha.addEventListener("mouseenter", () => {

        linha.style.transition=".3s";

        linha.style.background="#202020";

    });

    linha.addEventListener("mouseleave", () => {

        linha.style.background="transparent";

    });

});

/*==========================================
            TOAST
==========================================*/

function mostrarToast(mensagem, tipo = "success") {

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerText = mensagem;

    if (tipo === "error") {

        toast.style.background = "#e74c3c";

    } else {

        toast.style.background = "#27ae60";

    }

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 3000);

}

/*==========================================
        SALVAR PRODUTOS
==========================================*/

function salvarProdutos(){

    localStorage.setItem(

        "produtosCardHub",

        document.getElementById("listaProdutos").innerHTML

    );

}

function carregarProdutos(){

    const dados = localStorage.getItem("produtosCardHub");

    if(dados){

        document.getElementById("listaProdutos").innerHTML = dados;

    }

}

carregarProdutos();

/*==========================================
        CONTADOR
==========================================*/

function atualizarContador(){

    const total = document.querySelectorAll(

        "#listaProdutos tr"

    ).length;

    document.title = `Card Hub (${total} produtos)`;

}

atualizarContador();

/*==========================================
        NOVO PRODUTO
==========================================*/

document.getElementById("novoProduto")

.addEventListener("click",()=>{

    const nome = prompt("Nome do produto:");

    if(!nome) return;

    const categoria = prompt("Categoria:");

    if(!categoria) return;

    const preco = prompt("Preço:");

    if(!preco) return;

    const tabela = document.getElementById("listaProdutos");

    tabela.innerHTML += `

<tr>

<td>

<img src="imagensProdutos">

</td>

<td>${nome}</td>

<td>${categoria}</td>

<td>R$ ${preco}</td>

<td>

<span class="status ativo">

Ativo

</span>

</td>

<td>

<button class="acao visualizar">

<i class="fa-solid fa-eye"></i>

</button>

<button class="acao editar">

<i class="fa-solid fa-pen"></i>

</button>

<button class="acao excluir">

<i class="fa-solid fa-trash"></i>

</button>

</td>

</tr>

`;

    salvarProdutos();

    atualizarContador();

    mostrarToast("Produto cadastrado!");

    location.reload();

});

/*==========================================
        PAGINAÇÃO SIMPLES
==========================================*/

const linhas = document.querySelectorAll("#listaProdutos tr");

const linhasPagina = 5;

let paginaAtual = 1;

function mostrarPagina(){

    linhas.forEach((linha,index)=>{

        const inicio = (paginaAtual-1)*linhasPagina;

        const fim = inicio + linhasPagina;

        linha.style.display =

        index>=inicio && index<fim

        ? ""

        : "none";

    });

}

mostrarPagina();

document.querySelectorAll(".pagination button")

.forEach(botao=>{

    botao.addEventListener("click",()=>{

        const numero = parseInt(botao.innerText);

        if(!isNaN(numero)){

            paginaAtual = numero;

            mostrarPagina();

        }

    });

});

/*==========================================
        EXCLUIR
==========================================*/

document.addEventListener("click",function(e){

    if(e.target.closest(".excluir")){

        const linha = e.target.closest("tr");

        const nome = linha.children[1].innerText;

        if(confirm("Excluir "+nome+" ?")){

            linha.remove();

            salvarProdutos();

            atualizarContador();

            mostrarToast("Produto removido!");

        }

    }

});

/*==========================================
        EDITAR
==========================================*/

document.addEventListener("click",function(e){

    if(e.target.closest(".editar")){

        const linha = e.target.closest("tr");

        const nome = prompt(

            "Novo nome:",

            linha.children[1].innerText

        );

        if(nome){

            linha.children[1].innerText = nome;

            salvarProdutos();

            mostrarToast("Produto atualizado!");

        }

    }

});

/*==========================================
        VISUALIZAR
==========================================*/

document.addEventListener("click",function(e){

    if(e.target.closest(".visualizar")){

        const linha = e.target.closest("tr");

        mostrarToast(

            "Produto: "+linha.children[1].innerText,

            "success"

        );

    }

});

/*==========================================
        BOAS-VINDAS
==========================================*/

window.addEventListener("load",()=>{

    mostrarToast("Página Produtos carregada!");

});

const imagensProdutos = {

    "coca cola":"img/produtos/coca-cola.png",

    "pepsi":"img/produtos/pepsi.png",

    "fanta":"img/produtos/fanta.png",

    "sabonete":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSznvOLbBNr5fmZ4qwCfZJn0PfxlTDK8byngWx2vYi-BQ&s=10",

    "arroz":"img/produtos/arroz.png",

    "feijao":"img/produtos/feijao.png",

    "macarrao":"img/produtos/macarrao.png",

    "detergente":"img/produtos/detergente.png"

};

