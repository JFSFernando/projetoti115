// ----- BASE DE PRODUTOS -----
const produtos = [
  // Eletrônicos
  { id: 1, nome: "Smartphone X12", preco: 2499.90, oldPrice: 2999.90, categoria: "eletronicos", emoji: "📱", promocao: "15% OFF" },
  { id: 2, nome: "Fone Bluetooth Pro", preco: 299.90, oldPrice: 399.90, categoria: "eletronicos", emoji: "🎧", promocao: "25% OFF" },
  { id: 3, nome: "Monitor 27\" 4K", preco: 1899.00, oldPrice: 2199.00, categoria: "eletronicos", emoji: "🖥️", promocao: "13% OFF" },
  // Moda
  { id: 4, nome: "Tênis Runner", preco: 349.90, oldPrice: 459.90, categoria: "moda", emoji: "👟", promocao: "24% OFF" },
  { id: 5, nome: "Jaqueta Jeans", preco: 279.90, oldPrice: 329.90, categoria: "moda", emoji: "🧥", promocao: "15% OFF" },
  { id: 6, nome: "Relógio Premium", preco: 549.00, oldPrice: 699.00, categoria: "moda", emoji: "⌚", promocao: "21% OFF" },
  // Casa
  { id: 7, nome: "Panela Elétrica", preco: 199.90, oldPrice: 249.90, categoria: "casa", emoji: "🍳", promocao: "20% OFF" },
  { id: 8, nome: "Aspirador Robô", preco: 899.00, oldPrice: 1199.00, categoria: "casa", emoji: "🤖", promocao: "25% OFF" },
  { id: 9, nome: "Jogo de Toalhas", preco: 129.90, oldPrice: 169.90, categoria: "casa", emoji: "🛁", promocao: "23% OFF" },
];

// ----- ESTADO GLOBAL -----
let cart = [];
let currentCategory = 'todos';

// ----- RENDERIZAR PRODUTOS -----
function renderProducts(category = 'todos') {
  const main = document.getElementById('mainContent');
  const filtered = category === 'todos' ? produtos : produtos.filter(p => p.categoria === category);
  
  // Agrupar por categoria para exibir títulos
  const grouped = {};
  filtered.forEach(p => {
    if (!grouped[p.categoria]) grouped[p.categoria] = [];
    grouped[p.categoria].push(p);
  });

  let html = '';
  // Se não houver produtos, mostrar mensagem
  if (filtered.length === 0) {
    html = `<div style="text-align:center; padding:3rem; color:#64748b;"><i class="fas fa-box-open" style="font-size:3rem; display:block; margin-bottom:1rem;"></i> Nenhum produto nesta categoria.</div>`;
  } else {
    for (const [cat, items] of Object.entries(grouped)) {
      const nomeCat = { eletronicos: 'Eletrônicos', moda: 'Moda', casa: 'Casa' }[cat] || cat;
      const iconCat = { eletronicos: 'fa-microchip', moda: 'fa-tshirt', casa: 'fa-home' }[cat] || 'fa-tag';
      html += `<div class="category-section">`;
      html += `<div class="category-title"><i class="fas ${iconCat}"></i> ${nomeCat}</div>`;
      html += `<div class="product-grid">`;
      items.forEach(p => {
        html += `
          <div class="product-card" data-id="${p.id}">
            <div class="product-image">${p.emoji}</div>
            <span class="promo-tag">${p.promocao}</span>
            <div class="product-name">${p.nome}</div>
            <div class="product-price">
              R$ ${p.preco.toFixed(2)}
              <span class="old-price">R$ ${p.oldPrice.toFixed(2)}</span>
            </div>
            <button class="btn-add" onclick="addToCart(${p.id})">
              <i class="fas fa-cart-plus"></i> Adicionar
            </button>
          </div>
        `;
      });
      html += `</div></div>`;
    }
  }
  main.innerHTML = html;
}

// ----- FILTRO POR CATEGORIA (menu) -----
function showCategory(cat) {
  currentCategory = cat;
  renderProducts(cat);
  // fechar checkout se estiver aberto
  document.getElementById('checkoutPage').classList.remove('active');
  document.getElementById('mainContent').style.display = 'block';
}

// ----- CARRINHO: add, remover, abrir/fechar, total -----
function addToCart(productId) {
  const prod = produtos.find(p => p.id === productId);
  if (!prod) return;
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...prod, qty: 1 });
  }
  updateCartUI();
  openCart(); // abre automaticamente ao adicionar
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

function updateCartUI() {
  const container = document.getElementById('cartItemsContainer');
  const totalSpan = document.getElementById('cartTotalPrice');
  const badge = document.getElementById('cartCount');
  
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  badge.textContent = totalItems;

  if (cart.length === 0) {
    container.innerHTML = `<div class="empty-cart-msg"><i class="fas fa-shopping-bag" style="font-size:2rem; display:block; margin-bottom:0.5rem;"></i> Seu carrinho está vazio.</div>`;
    totalSpan.textContent = 'R$ 0,00';
    return;
  }

  let html = '';
  let total = 0;
  cart.forEach(item => {
    const subtotal = item.preco * item.qty;
    total += subtotal;
    html += `
      <div class="cart-item">
        <div class="cart-item-info">
          <span class="cart-item-name">${item.emoji} ${item.nome} (${item.qty})</span>
          <span class="cart-item-price">R$ ${subtotal.toFixed(2)}</span>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})"><i class="fas fa-trash-alt"></i></button>
      </div>
    `;
  });
  container.innerHTML = html;
  totalSpan.textContent = `R$ ${total.toFixed(2)}`;
}

function openCart() {
  document.getElementById('cartOverlay').classList.add('active');
  document.getElementById('cartSidebar').classList.add('open');
  updateCartUI();
}

function closeCart() {
  document.getElementById('cartOverlay').classList.remove('active');
  document.getElementById('cartSidebar').classList.remove('open');
}

// ----- CHECKOUT (redirecionar para página de pagamento) -----
function goToCheckout() {
  if (cart.length === 0) {
    alert('Seu carrinho está vazio. Adicione itens antes de finalizar.');
    return;
  }
  closeCart();
  document.getElementById('mainContent').style.display = 'none';
  document.getElementById('checkoutPage').classList.add('active');
  // atualizar frete (zerar)
  document.getElementById('freteValor').textContent = 'R$ 0,00';
}

function backToShop() {
  document.getElementById('checkoutPage').classList.remove('active');
  document.getElementById('mainContent').style.display = 'block';
  renderProducts(currentCategory);
}

// ----- CÁLCULO DE FRETE (simulação) -----
function calcularFrete() {
  const cep = document.getElementById('cepInput').value.trim();
  if (cep.length < 8) {
    alert('Digite um CEP válido com pelo menos 8 dígitos.');
    return;
  }
  // Simulação de frete baseado no CEP (apenas para demonstração)
  const soma = cep.split('').reduce((acc, char) => acc + (parseInt(char) || 0), 0);
  const valorFrete = (soma % 5 + 1) * 4.50 + 5.00; // entre R$ 9,50 e R$ 27,50
  document.getElementById('freteValor').textContent = `R$ ${valorFrete.toFixed(2)}`;
}

// ----- INICIALIZAÇÃO -----
renderProducts('todos');
updateCartUI();

// Fechar carrinho com ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCart();
});