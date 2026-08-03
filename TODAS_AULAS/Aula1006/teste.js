// VARIÁVEIS GLOBAIS
let carrinho = [];
let idPedido = 1;

// 1. FUNÇÃO TRADICIONAL COM PARÂMETROS
function addItem(nome, preco) {
    let item = carrinho.find(i => i.nome === nome);
    if (item) {
        item.qtd++;
        item.total = item.preco * item.qtd;
    } else {
        carrinho.push({nome: nome, preco: preco, qtd: 1, total: preco});
    }
    atualizar();
}

// FUNÇÃO COM RETORNO
function calcularTotal() {
    let total = 0;
    for(let i = 0; i < carrinho.length; i++) {
        total += carrinho[i].total;
    }
    return total;
}

// 2. ARROW FUNCTION
const calcularTaxa = (total) => total > 50 ? 0 : 5;
const formatar = (valor) => `R$ ${valor.toFixed(2).replace('.', ',')}`;

// 3. FUNÇÃO ANÔNIMA (DESCONTO)
const calcularDesconto = function(total, formaPagamento) {
    let percentual = 0;
    if(formaPagamento === 'dinheiro') percentual = 5;
    if(formaPagamento === 'pix') percentual = 10;
    return total * percentual / 100;
};

function atualizar() {
    let div = document.getElementById('carrinho');
    if(carrinho.length === 0) {
        div.innerHTML = '<p>Carrinho vazio</p>';
    } else {
        div.innerHTML = carrinho.map(item => `
            <div class="carrinho-item">
                <span>${item.qtd}x ${item.nome}</span>
                <span>${formatar(item.total)}</span>
                <button onclick="removerItem('${item.nome}')">Remover</button>
            </div>
        `).join('');
    }
    let total = calcularTotal();
    document.getElementById('total').innerText = formatar(total + calcularTaxa(total));
}

// ESCOPO LOCAL (variável dentro da função)
function removerItem(nome) {
    let index = carrinho.findIndex(i => i.nome === nome);
    if(index !== -1) {
        if(carrinho[index].qtd > 1) {
            carrinho[index].qtd--;
            carrinho[index].total -= carrinho[index].preco;
        } else {
            carrinho.splice(index, 1);
        }
    }
    atualizar();
}

function aplicarDesconto() {
    let total = calcularTotal();
    let forma = document.getElementById('pagamento').value;
    let desconto = calcularDesconto(total, forma);
    if(desconto > 0) {
        alert(`Desconto de ${formatar(desconto)} aplicado!`);
        let novoTotal = total - desconto;
        document.getElementById('total').innerText = formatar(novoTotal + calcularTaxa(novoTotal));
    } else {
        alert('Sem desconto para esta forma de pagamento');
    }
}

// FUNÇÃO COM RETORNO E MÚLTIPLOS PARÂMETROS
function criarPedido(itens, total, forma) {
    return {
        id: idPedido++,
        data: new Date().toLocaleTimeString(),
        itens: itens.map(i => `${i.qtd}x ${i.nome}`).join(', '),
        total: total,
        pagamento: forma
    };
}

function finalizar() {
    if(carrinho.length === 0) {
        alert('Carrinho vazio!');
        return;
    }
    
    let total = calcularTotal();
    let taxa = calcularTaxa(total);
    let forma = document.getElementById('pagamento').value;
    let desconto = calcularDesconto(total, forma);
    let totalFinal = total + taxa - desconto;
    
    // DEMONSTRANDO ESCOPO LOCAL
    let mensagemLocal = `Pedido finalizado! Total: ${formatar(totalFinal)}`;
    alert(mensagemLocal);
    
    // ARROW FUNCTION PARA SALVAR
    const salvarHistorico = () => {
        let pedido = criarPedido(carrinho, totalFinal, forma);
        let histDiv = document.getElementById('historico');
        if(histDiv.innerHTML === '') histDiv.innerHTML = '';
        histDiv.innerHTML += `<div class="pedido">
            <strong>Pedido #${pedido.id}</strong> - ${pedido.data}<br>
            ${pedido.itens}<br>
            Total: ${formatar(pedido.total)} - ${pedido.pagamento}
        </div>`;
    };
    
    salvarHistorico();
    limpar();
}

function limpar() {
    carrinho = [];
    atualizar();
}