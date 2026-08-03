// Dados simulados
const cardapio = [
    { id: 1, nome: "Pizza Margherita", preco: 45.90, categoria: "Pizzas", disponivel: true },
    { id: 2, nome: "Hambúrguer Clássico", preco: 28.50, categoria: "Lanches", disponivel: true },
    { id: 3, nome: "Salada Caesar", preco: 32.00, categoria: "Saladas", disponivel: true },
    { id: 4, nome: "Sushi Special", preco: 89.90, categoria: "Japonesa", disponivel: false },
    { id: 5, nome: "Penne ao Pesto", preco: 38.00, categoria: "Massas", disponivel: true },
    { id: 6, nome: "Taco Mexicano", preco: 24.90, categoria: "Mexicana", disponivel: true }
];

const pedidos = [
    { id: 1001, cliente: "João Silva", itens: ["Pizza Margherita", "Sushi Special"], total: 135.80, status: "entregue" },
    { id: 1002, cliente: "Maria Santos", itens: ["Hambúrguer Clássico", "Salada Caesar"], total: 60.50, status: "preparando" },
    { id: 1003, cliente: "Carlos Oliveira", itens: ["Taco Mexicano"], total: 24.90, status: "pendente" },
    { id: 1004, cliente: "Ana Pereira", itens: ["Penne ao Pesto", "Pizza Margherita"], total: 83.90, status: "entregue" },
    { id: 1005, cliente: "Roberto Lima", itens: ["Sushi Special"], total: 89.90, status: "preparando" }
];

const clientes = [
    { id: 1, nome: "João Silva", email: "joao@email.com", telefone: "(11) 99999-1111" },
    { id: 2, nome: "Maria Santos", email: "maria@email.com", telefone: "(11) 99999-2222" },
    { id: 3, nome: "Carlos Oliveira", email: "carlos@email.com", telefone: "(11) 99999-3333" },
    { id: 4, nome: "Ana Pereira", email: "ana@email.com", telefone: "(11) 99999-4444" },
    { id: 5, nome: "Roberto Lima", email: "roberto@email.com", telefone: "(11) 99999-5555" }
];

// Função para renderizar cards do cardápio usando for...of
function renderizarCardapio() {
    const container = document.getElementById('cardapioContainer');
    let html = '';
    
    // Usando for...of para percorrer o array de cardápio
    for (const item of cardapio) {
        if (item.disponivel) {
            html += `
                <div class="card">
                    <h3>${item.nome}</h3>
                    <div class="price">R$ ${item.preco.toFixed(2)}</div>
                    <div class="category">${item.categoria}</div>
                    <div style="margin-top: 10px; font-size: 0.85em; color: #28a745;">✓ Disponível</div>
                </div>
            `;
        } else {
            html += `
                <div class="card" style="opacity: 0.6; background: #f8f9fa;">
                    <h3>${item.nome}</h3>
                    <div class="price">R$ ${item.preco.toFixed(2)}</div>
                    <div class="category">${item.categoria}</div>
                    <div style="margin-top: 10px; font-size: 0.85em; color: #dc3545;">✗ Indisponível</div>
                </div>
            `;
        }
    }
    
    // innerHTML acumulativo
    container.innerHTML = html;
}

// Função para renderizar tabela de pedidos usando for tradicional
function renderizarPedidos() {
    const tbody = document.getElementById('pedidosBody');
    let html = '';
    
    // Usando for tradicional para percorrer o array de pedidos
    for (let i = 0; i < pedidos.length; i++) {
        const pedido = pedidos[i];
        const statusClass = `status status-${pedido.status}`;
        
        // Formatar itens do pedido
        const itensFormatados = pedido.itens.join(', ');
        
        html += `
            <tr>
                <td>${pedido.id}</td>
                <td>${pedido.cliente}</td>
                <td>${itensFormatados}</td>
                <td>R$ ${pedido.total.toFixed(2)}</td>
                <td><span class="${statusClass}">${pedido.status.toUpperCase()}</span></td>
            </tr>
        `;
    }
    
    // innerHTML acumulativo
    tbody.innerHTML = html;
}

// Função para renderizar lista de clientes usando for...of
function renderizarClientes() {
    const lista = document.getElementById('clientesList');
    let html = '';
    
    // Usando for...of para percorrer o array de clientes
    for (const cliente of clientes) {
        html += `
            <li class="cliente-item">
                <div class="cliente-nome">${cliente.nome}</div>
                <div class="cliente-email">📧 ${cliente.email}</div>
                <div class="cliente-telefone">📱 ${cliente.telefone}</div>
            </li>
        `;
    }
    
    // innerHTML acumulativo
    lista.innerHTML = html;
}

// Função para renderizar estatísticas usando forEach
function renderizarEstatisticas() {
    const statsContainer = document.getElementById('statsContainer');
    
    // Calcular estatísticas
    let totalPedidos = 0;
    let totalClientes = 0;
    let totalCardapio = 0;
    let valorTotalPedidos = 0;
    
    // Usando forEach para calcular totais
    pedidos.forEach(pedido => {
        totalPedidos++;
        valorTotalPedidos += pedido.total;
    });
    
    clientes.forEach(() => totalClientes++);
    cardapio.forEach(item => totalCardapio++);
    
    // Contar pedidos por status usando for...of
    let pedidosPendentes = 0;
    let pedidosPreparando = 0;
    let pedidosEntregues = 0;
    
    for (const pedido of pedidos) {
        switch(pedido.status) {
            case 'pendente':
                pedidosPendentes++;
                break;
            case 'preparando':
                pedidosPreparando++;
                break;
            case 'entregue':
                pedidosEntregues++;
                break;
        }
    }
    
    const mediaPedidos = (valorTotalPedidos / totalPedidos).toFixed(2);
    
    const statsHtml = `
        <div class="stat-card">
            <div class="stat-number">${totalClientes}</div>
            <div class="stat-label">Clientes</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${totalPedidos}</div>
            <div class="stat-label">Total Pedidos</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">R$ ${mediaPedidos}</div>
            <div class="stat-label">Ticket Médio</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${totalCardapio}</div>
            <div class="stat-label">Itens no Cardápio</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${pedidosPendentes}</div>
            <div class="stat-label">Pendentes</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${pedidosPreparando}</div>
            <div class="stat-label">Preparando</div>
        </div>
    `;
    
    statsContainer.innerHTML = statsHtml;
}

// Função para buscar e exibir dados específicos usando loop while
function buscarCardapioPorCategoria(categoria) {
    let resultado = [];
    let i = 0;
    
    // Usando while para filtrar itens do cardápio
    while (i < cardapio.length) {
        if (cardapio[i].categoria === categoria) {
            resultado.push(cardapio[i]);
        }
        i++;
    }
    
    if (resultado.length > 0) {
        console.log(`Itens da categoria ${categoria}:`, resultado);
    }
    return resultado;
}

// Função para demonstrar renderização adicional
function renderizarResumoPedidos() {
    console.log("=== RESUMO DE PEDIDOS ===");
    
    // Usando for...of para mostrar no console
    for (const pedido of pedidos) {
        console.log(`Pedido #${pedido.id}: ${pedido.cliente} - Total: R$ ${pedido.total.toFixed(2)} - Status: ${pedido.status}`);
    }
}

// Inicializar todas as renderizações
function inicializar() {
    renderizarCardapio();
    renderizarPedidos();
    renderizarClientes();
    renderizarEstatisticas();
    
    // Demonstrar busca por categoria
    buscarCardapioPorCategoria("Pizzas");
    renderizarResumoPedidos();
    
    // Adicionar evento de console para demonstração
    console.log("✅ Sistema inicializado com sucesso!");
    console.log("🎯 Demonstração de laços de repetição:");
    console.log("- for...of: Cards do cardápio e clientes");
    console.log("- for tradicional: Tabela de pedidos");
    console.log("- forEach: Estatísticas");
    console.log("- while: Busca por categoria");
}

// Aguardar o DOM carregar completamente
document.addEventListener('DOMContentLoaded', inicializar);





