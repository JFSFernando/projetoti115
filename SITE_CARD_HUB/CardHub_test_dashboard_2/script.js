/*==========================================
    MENU LATERAL
==========================================*/

const sidebar = document.querySelector(".sidebar");

const logo = document.querySelector(".logo");

logo.addEventListener("click", () => {

    sidebar.classList.toggle("collapsed");

});


/*==========================================
    BOTÃO CADASTRAR PRODUTO
==========================================*/

const btnNovoProduto = document.getElementById("novoProduto");

btnNovoProduto.addEventListener("click", () => {

    alert("Redirecionando para o cadastro de um novo produto...");

});


/*==========================================
    ANIMAÇÃO DOS CARDS
==========================================*/

const cards = document.querySelectorAll(".stat-card, .product-card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-8px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});


/*==========================================
    GRÁFICO DE VENDAS
==========================================*/

const ctx = document.getElementById("salesChart");

new Chart(ctx, {

    type: "line",

    data: {

        labels: [

            "Jan",

            "Fev",

            "Mar",

            "Abr",

            "Mai",

            "Jun",

            "Jul"

        ],

        datasets: [

            {

                label: "Receita",

                data: [

                    4000,

                    3000,

                    5000,

                    4500,

                    6000,

                    5500,

                    7000

                ],

                borderColor: "#ff6b00",

                backgroundColor: "rgba(255,107,0,.15)",

                borderWidth: 3,

                tension: .4,

                fill: true,

                pointRadius: 5,

                pointBackgroundColor: "#ff6b00",

                pointBorderColor: "#ff6b00"

            }

        ]

    },

    options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {

                display: false

            }

        },

        scales: {

            x: {

                ticks: {

                    color: "#888"

                },

                grid: {

                    color: "#222"

                }

            },

            y: {

                ticks: {

                    color: "#888"

                },

                grid: {

                    color: "#222"

                }

            }

        }

    }

});


/*==========================================
    ANIMAÇÃO DE ENTRADA
==========================================*/

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});

/*==========================================
    TOAST (NOTIFICAÇÕES)
==========================================*/

function mostrarToast(mensagem) {

    let toast = document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = mensagem;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        },300);

    },3000);

}


/*==========================================
    BOTÃO CADASTRAR PRODUTO
==========================================*/

btnNovoProduto.addEventListener("click", () => {

    mostrarToast("Produto cadastrado com sucesso!");

});


/*==========================================
    CONTADORES ANIMADOS
==========================================*/

const numeros = document.querySelectorAll(".stat-card h2");

numeros.forEach(numero=>{

    const texto = numero.innerText;

    if(texto.includes("R$")) return;

    const destino = parseInt(texto.replace(/\./g,""));

    let atual = 0;

    const incremento = destino / 80;

    const contador = setInterval(()=>{

        atual += incremento;

        if(atual >= destino){

            atual = destino;

            clearInterval(contador);

        }

        numero.innerText = Math.floor(atual);

    },20);

});


/*==========================================
    FEED DE ATIVIDADES
==========================================*/

const lista = document.querySelector(".activities ul");

const atividades = [

    "Novo parceiro cadastrado",

    "Venda realizada",

    "Produto atualizado",

    "Pagamento recebido",

    "Nova avaliação recebida",

    "Novo cliente registrado",

    "Gift Card vendido",

    "Pedido finalizado"

];

function adicionarAtividade(){

    const item = document.createElement("li");

    const atividade = atividades[Math.floor(Math.random()*atividades.length)];

    const horario = new Date().toLocaleTimeString("pt-BR",{

        hour:"2-digit",

        minute:"2-digit"

    });

    item.innerHTML = `

        <strong>${atividade}</strong>

        <small>${horario}</small>

    `;

    lista.prepend(item);

    if(lista.children.length > 6){

        lista.removeChild(lista.lastElementChild);

    }

}

setInterval(adicionarAtividade,10000);


/*==========================================
    PESQUISA DE PRODUTOS
==========================================*/

const pesquisa = document.createElement("input");

pesquisa.placeholder = "Pesquisar produto...";

pesquisa.className = "pesquisa";

document.querySelector(".title").prepend(pesquisa);

pesquisa.addEventListener("keyup",()=>{

    const cards = document.querySelectorAll(".product-card");

    cards.forEach(card=>{

        const titulo = card.querySelector("h3").innerText.toLowerCase();

        if(titulo.includes(pesquisa.value.toLowerCase())){

            card.style.display="block";

        }else{

            card.style.display="none";

        }

    });

});


/*==========================================
    BOTÃO VOLTAR AO TOPO
==========================================*/

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.className = "top-btn";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{

    if(window.scrollY > 250){

        topBtn.style.display="flex";

    }else{

        topBtn.style.display="none";

    }

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


/*==========================================
    MODO ESCURO / CLARO
==========================================*/

const tema = document.createElement("button");

tema.innerHTML="🌙";

tema.className="theme-btn";

document.body.appendChild(tema);

tema.addEventListener("click",()=>{

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){

        tema.innerHTML="☀";

        mostrarToast("Modo claro ativado");

    }else{

        tema.innerHTML="🌙";

        mostrarToast("Modo escuro ativado");

    }

});


/*==========================================
    SAUDAÇÃO
==========================================*/

setTimeout(()=>{

    mostrarToast("Bem-vindo ao Painel Card Hub!");

},1000);

// ===== INICIALIZAR GRÁFICOS =====
let chartInstances = {};

function initCharts() {
  // GRÁFICO DE LINHA - Faturamento Acumulado
  const ctxLine = document.getElementById('lineChart').getContext('2d');
  chartInstances.line = new Chart(ctxLine, {
    type: 'line',
    data: lineData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 15,
            font: {
              size: 10,
              weight: '500'
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: R$ ${context.parsed.y.toLocaleString('pt-BR')}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return 'R$ ' + (value / 1000).toFixed(0) + 'k';
            }
          }
        }
      }
    }
  });

  // GRÁFICO DE BARRAS - Vendas Mensais
  const ctxBar = document.getElementById('salesChart').getContext('2d');
  chartInstances.bar = new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      datasets: [{
        label: 'Vendas 2026',
        data: [8500, 9200, 7800, 10200, 11500, 13800, 12400, 14600, 15800, 17200, 16500, 18900],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(59, 130, 246, 0.6)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(59, 130, 246, 0.6)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(59, 130, 246, 0.6)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(59, 130, 246, 0.9)'
        ],
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 6,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `R$ ${context.parsed.y.toLocaleString('pt-BR')}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return 'R$ ' + (value / 1000).toFixed(1) + 'k';
            }
          }
        }
      }
    }
  });

  // GRÁFICO DE ROSCA - Distribuição por Categoria
  const ctxPie = document.getElementById('categoryChart').getContext('2d');
  chartInstances.pie = new Chart(ctxPie, {
    type: 'doughnut',
    data: {
      labels: ['Eletrônicos', 'Moda', 'Casa', 'Acessórios', 'Outros'],
      datasets: [{
        data: [45, 25, 18, 8, 4],
        backgroundColor: [
          '#3b82f6',
          '#8b5cf6',
          '#22c55e',
          '#f59e0b',
          '#ef4444'
        ],
        borderWidth: 0,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 12,
            font: {
              size: 10,
              weight: '500'
            },
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((context.parsed / total) * 100).toFixed(1);
              return `${context.label}: ${percentage}%`;
            }
          }
        }
      },
      cutout: '65%'
    }
  });
}