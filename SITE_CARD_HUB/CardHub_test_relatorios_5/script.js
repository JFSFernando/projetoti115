/*==================================================
            RELATÓRIOS - PARTE 3A
==================================================*/

window.addEventListener("load", () => {

    iniciarGraficos();
    iniciarFiltros();
    iniciarExportacoes();

});

/*==================================================
                TOAST
==================================================*/

function mostrarToast(texto){

    const toast = document.getElementById("toast");

    toast.textContent = texto;
    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    },3000);

}

/*==================================================
            GRÁFICO DE VENDAS
==================================================*/

let graficoVendas;
let graficoCategorias;

function iniciarGraficos(){

    const vendas = document
        .getElementById("graficoVendas")
        .getContext("2d");

    graficoVendas = new Chart(vendas,{

        type:"line",

        data:{

            labels:[
                "Jan",
                "Fev",
                "Mar",
                "Abr",
                "Mai",
                "Jun",
                "Jul"
            ],

            datasets:[{

                label:"Receita",

                data:[
                    18000,
                    22000,
                    26000,
                    24000,
                    31000,
                    36000,
                    42000
                ],

                borderColor:"#ff6b00",

                backgroundColor:"rgba(255,107,0,.15)",

                borderWidth:3,

                tension:.4,

                fill:true,

                pointRadius:5,

                pointHoverRadius:7

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{
                legend:{
                    labels:{
                        color:"#fff"
                    }
                }
            },

            scales:{

                x:{
                    ticks:{
                        color:"#bdbdbd"
                    },
                    grid:{
                        color:"#2a2a2a"
                    }
                },

                y:{
                    ticks:{
                        color:"#bdbdbd"
                    },
                    grid:{
                        color:"#2a2a2a"
                    }
                }

            }

        }

    });

/*==================================================
        GRÁFICO POR CATEGORIAS
==================================================*/

    const categorias = document
        .getElementById("graficoCategorias")
        .getContext("2d");

    graficoCategorias = new Chart(categorias,{

        type:"doughnut",

        data:{

            labels:[
                "Gift Card",
                "Vale Alimentação",
                "Vale Transporte",
                "Benefícios",
                "Outros"
            ],

            datasets:[{

                data:[
                    38,
                    24,
                    18,
                    12,
                    8
                ],

                backgroundColor:[

                    "#ff6b00",

                    "#ff8d32",

                    "#ffb066",

                    "#ffca99",

                    "#ffdcbf"

                ],

                borderWidth:0

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{

                legend:{
                    position:"bottom",

                    labels:{
                        color:"#fff"
                    }

                }

            }

        }

    });

}

/*==================================================
                FILTROS
==================================================*/

function iniciarFiltros(){

    const periodo = document.getElementById("periodo");
    const categoria = document.getElementById("categoria");

    periodo.addEventListener("change", atualizarRelatorio);
    categoria.addEventListener("change", atualizarRelatorio);

}

/*==================================================
        ATUALIZA DADOS DO RELATÓRIO
==================================================*/

function atualizarRelatorio(){

    const periodo = document.getElementById("periodo").value;

    let dados=[];

    if(periodo==="7"){

        dados=[
            8,
            12,
            14,
            18,
            16,
            20,
            23
        ];

    }

    else if(periodo==="30"){

        dados=[
            18,
            22,
            26,
            24,
            31,
            36,
            42
        ];

    }

    else{

        dados=[
            40,
            52,
            61,
            57,
            73,
            82,
            95
        ];

    }

    graficoVendas.data.datasets[0].data=dados;

    graficoVendas.update();

    mostrarToast("Relatório atualizado!");

}

/*==================================================
            RELATÓRIOS - PARTE 3B
==================================================*/

/*==========================================
        EXPORTAÇÃO PDF
==========================================*/

document.getElementById("exportarPDF")

.addEventListener("click",()=>{

    mostrarToast("Gerando relatório em PDF...");

    setTimeout(()=>{

        mostrarToast("PDF exportado com sucesso!");

    },1500);

});

/*==========================================
        EXPORTAÇÃO EXCEL
==========================================*/

document.getElementById("exportarExcel")

.addEventListener("click",()=>{

    mostrarToast("Gerando planilha Excel...");

    setTimeout(()=>{

        mostrarToast("Excel exportado com sucesso!");

    },1500);

});

/*==========================================
        PESQUISA NA TABELA
==========================================*/

const pesquisa = document.getElementById("pesquisa");

if(pesquisa){

    pesquisa.addEventListener("keyup",()=>{

        const texto = pesquisa.value.toLowerCase();

        const linhas = document.querySelectorAll("#listaRelatorios tr");

        linhas.forEach(linha=>{

            const produto = linha.children[0].innerText.toLowerCase();

            const categoria = linha.children[1].innerText.toLowerCase();

            if(

                produto.includes(texto) ||

                categoria.includes(texto)

            ){

                linha.style.display="";

            }

            else{

                linha.style.display="none";

            }

        });

    });

}

/*==========================================
        ORDENAÇÃO
==========================================*/

function ordenarTabela(coluna){

    const tbody=document.getElementById("listaRelatorios");

    const linhas=[...tbody.rows];

    linhas.sort((a,b)=>{

        return a.cells[coluna].innerText.localeCompare(

            b.cells[coluna].innerText,

            "pt-BR",

            {numeric:true}

        );

    });

    tbody.innerHTML="";

    linhas.forEach(linha=>tbody.appendChild(linha));

}

document.querySelectorAll("thead th")

.forEach((th,index)=>{

    th.style.cursor="pointer";

    th.title="Clique para ordenar";

    th.addEventListener("click",()=>{

        ordenarTabela(index);

        mostrarToast("Tabela ordenada.");

    });

});

/*==========================================
        ATUALIZAÇÃO DOS CARDS
==========================================*/

function atualizarCards(){

    let vendas=0;

    let receita=0;

    let clientes=0;

    document.querySelectorAll("#listaRelatorios tr")

    .forEach(linha=>{

        vendas+=Number(linha.children[2].innerText);

        receita+=parseFloat(

            linha.children[3]

            .innerText

            .replace("R$","")

            .replace(".","")

            .replace(",",".")
        );

        clientes++;

    });

    const cards=document.querySelectorAll(".card-info h2");

    cards[0].innerText="R$ "+receita.toLocaleString("pt-BR");

    cards[1].innerText=vendas;

    cards[2].innerText=clientes;

    cards[3].innerText=

    "R$ "+Math.round(receita/clientes);

}

atualizarCards();

/*==========================================
        SALVANDO FILTROS
==========================================*/

function salvarConfiguracao(){

    localStorage.setItem(

        "periodo",

        document.getElementById("periodo").value

    );

    localStorage.setItem(

        "categoria",

        document.getElementById("categoria").value

    );

}

function carregarConfiguracao(){

    const periodo=localStorage.getItem("periodo");

    const categoria=localStorage.getItem("categoria");

    if(periodo){

        document.getElementById("periodo").value=periodo;

    }

    if(categoria){

        document.getElementById("categoria").value=categoria;

    }

}

carregarConfiguracao();

document.getElementById("periodo")

.addEventListener("change",salvarConfiguracao);

document.getElementById("categoria")

.addEventListener("change",salvarConfiguracao);

/*==========================================
        ATUALIZAÇÃO AUTOMÁTICA
==========================================*/

setInterval(()=>{

    const cardReceita=

    document.querySelectorAll(".card-info h2")[0];

    let valor=parseInt(

        cardReceita.innerText

        .replace(/\D/g,"")

    );

    valor+=Math.floor(Math.random()*800);

    cardReceita.innerText=

    "R$ "+valor.toLocaleString("pt-BR");

},10000);

/*==========================================
        PAGINAÇÃO
==========================================*/

const botoesPagina=

document.querySelectorAll(".pagination button");

botoesPagina.forEach(botao=>{

    botao.addEventListener("click",()=>{

        botoesPagina.forEach(btn=>

            btn.classList.remove("active")

        );

        if(!isNaN(botao.innerText)){

            botao.classList.add("active");

            mostrarToast(

                "Página "+botao.innerText

            );

        }

    });

});

/*==========================================
        ANIMAÇÃO DOS CARDS
==========================================*/

document.querySelectorAll(".card-info")

.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-8px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0)";

    });

});

/*==========================================
        MENSAGEM INICIAL
==========================================*/

window.addEventListener("load",()=>{

    mostrarToast("Relatórios carregados com sucesso!");

});