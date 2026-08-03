/*==========================================
            PESQUISA
==========================================*/

const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("keyup", () => {

    const texto = pesquisa.value.toLowerCase();

    const linhas = document.querySelectorAll("#listaTransacoes tr");

    linhas.forEach(linha => {

        const id = linha.children[0].textContent.toLowerCase();
        const cliente = linha.children[1].textContent.toLowerCase();
        const produto = linha.children[2].textContent.toLowerCase();

        if (
            id.includes(texto) ||
            cliente.includes(texto) ||
            produto.includes(texto)
        ) {

            linha.style.display = "";

        } else {

            linha.style.display = "none";

        }

    });

});


/*==========================================
            FILTRO STATUS
==========================================*/

const filtroStatus = document.getElementById("status");

filtroStatus.addEventListener("change", () => {

    const valor = filtroStatus.value;

    const linhas = document.querySelectorAll("#listaTransacoes tr");

    linhas.forEach(linha => {

        const status = linha.children[5].innerText.trim();

        if(valor === "Todos"){

            linha.style.display = "";

        }else{

            linha.style.display =

            status === valor

            ? ""

            : "none";

        }

    });

});


/*==========================================
            FILTRO PERÍODO
==========================================*/

document.getElementById("periodo")

.addEventListener("change", function(){

    alert("Filtro por período: " + this.value);

});


/*==========================================
        NOVA TRANSAÇÃO
==========================================*/

document.getElementById("novaTransacao")

.addEventListener("click",()=>{

    alert("Abrindo formulário de nova transação...");

});


/*==========================================
            VISUALIZAR
==========================================*/

document.querySelectorAll(".visualizar")

.forEach(botao=>{

    botao.addEventListener("click",function(){

        const linha = this.closest("tr");

        const id = linha.children[0].innerText;

        const cliente = linha.children[1].innerText;

        const produto = linha.children[2].innerText;

        const valor = linha.children[4].innerText;

        const status = linha.children[5].innerText;

        alert(

`ID: ${id}

Cliente: ${cliente}

Produto: ${produto}

Valor: ${valor}

Status: ${status}`

        );

    });

});


/*==========================================
            EDITAR
==========================================*/

document.querySelectorAll(".editar")

.forEach(botao=>{

    botao.addEventListener("click",function(){

        const linha = this.closest("tr");

        const clienteAtual = linha.children[1];

        const novoCliente = prompt(

            "Editar cliente:",

            clienteAtual.innerText

        );

        if(novoCliente){

            clienteAtual.innerText = novoCliente;

        }

    });

});


/*==========================================
            EXCLUIR
==========================================*/

document.querySelectorAll(".excluir")

.forEach(botao=>{

    botao.addEventListener("click",function(){

        const linha = this.closest("tr");

        const cliente = linha.children[1].innerText;

        const confirmar = confirm(

            "Deseja excluir a transação de "

            + cliente +

            " ?"

        );

        if(confirmar){

            linha.remove();

        }

    });

});


/*==========================================
        HOVER NAS LINHAS
==========================================*/

document.querySelectorAll("#listaTransacoes tr")

.forEach(linha=>{

    linha.addEventListener("mouseenter",()=>{

        linha.style.transition=".3s";

        linha.style.background="#202020";

    });

    linha.addEventListener("mouseleave",()=>{

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

    toast.style.background =
        tipo === "success"
        ? "#2ecc71"
        : "#e74c3c";

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    },100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(()=>{

            toast.remove();

        },300);

    },3000);

}

/*==========================================
            LOCAL STORAGE
==========================================*/

function salvarTransacoes(){

    localStorage.setItem(

        "transacoesCardHub",

        document.getElementById("listaTransacoes").innerHTML

    );

}

function carregarTransacoes(){

    const dados = localStorage.getItem("transacoesCardHub");

    if(dados){

        document.getElementById("listaTransacoes").innerHTML = dados;

    }

}

carregarTransacoes();

/*==========================================
        CONTADOR DOS CARDS
==========================================*/

function atualizarCards(){

    const linhas = document.querySelectorAll("#listaTransacoes tr");

    let total = 0;
    let pendentes = 0;
    let quantidade = linhas.length;

    linhas.forEach(linha=>{

        const valorTexto = linha.children[4].innerText
        .replace("R$","")
        .replace(".","")
        .replace(",",".")
        .trim();

        const valor = parseFloat(valorTexto);

        const status = linha.children[5].innerText.trim();

        if(status==="Pago"){

            total += valor;

        }

        if(status==="Pendente"){

            pendentes += valor;

        }

    });

    document.querySelectorAll(".card-info h2")[0].innerText =
        "R$ " + total.toFixed(2);

    document.querySelectorAll(".card-info h2")[1].innerText =
        "R$ " + pendentes.toFixed(2);

    document.querySelectorAll(".card-info h2")[2].innerText =
        quantidade;

}

atualizarCards();

/*==========================================
        NOVA TRANSAÇÃO
==========================================*/

document.getElementById("novaTransacao")

.addEventListener("click",()=>{

    const cliente = prompt("Nome do cliente:");

    if(!cliente) return;

    const produto = prompt("Produto:");

    if(!produto) return;

    const valor = prompt("Valor:");

    if(!valor) return;

    const tabela = document.getElementById("listaTransacoes");

    const numero = Math.floor(Math.random()*9000)+1000;

    tabela.innerHTML += `

<tr>

<td>#${numero}</td>

<td>${cliente}</td>

<td>${produto}</td>

<td>${new Date().toLocaleDateString()}</td>

<td>R$ ${valor}</td>

<td>

<span class="status pago">

Pago

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

    salvarTransacoes();

    atualizarCards();

    mostrarToast("Transação cadastrada!");

    location.reload();

});

/*==========================================
        PAGINAÇÃO
==========================================*/

const linhasPagina = 5;

let paginaAtual = 1;

function mostrarPagina(){

    const linhas = document.querySelectorAll("#listaTransacoes tr");

    linhas.forEach((linha,index)=>{

        const inicio = (paginaAtual-1)*linhasPagina;

        const fim = inicio+linhasPagina;

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
        EVENTOS DINÂMICOS
==========================================*/

document.addEventListener("click",(e)=>{

    /* VISUALIZAR */

    if(e.target.closest(".visualizar")){

        const linha = e.target.closest("tr");

        mostrarToast(

            "Transação " +

            linha.children[0].innerText +

            " selecionada."

        );

    }

    /* EDITAR */

    if(e.target.closest(".editar")){

        const linha = e.target.closest("tr");

        const novo = prompt(

            "Editar cliente:",

            linha.children[1].innerText

        );

        if(novo){

            linha.children[1].innerText = novo;

            salvarTransacoes();

            mostrarToast("Transação atualizada!");

        }

    }

    /* EXCLUIR */

    if(e.target.closest(".excluir")){

        const linha = e.target.closest("tr");

        if(confirm("Excluir esta transação?")){

            linha.remove();

            salvarTransacoes();

            atualizarCards();

            mostrarToast("Transação removida!");

        }

    }

});

/*==========================================
        EXPORTAR
==========================================*/

function exportarTransacoes(){

    mostrarToast("Exportação iniciada...");

}

window.addEventListener("load",()=>{

    mostrarToast("Bem-vindo ao módulo de Transações!");

});