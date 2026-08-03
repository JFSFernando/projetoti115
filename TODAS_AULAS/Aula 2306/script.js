const produtos = [
    { nome: 'Smartphone', categoria: 'eletronicos', preco: 'R$ 2.499', promocao: false, imagem: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop' },
    { nome: 'Notebook', categoria: 'eletronicos', preco: 'R$ 4.999', promocao: true, precoOriginal: 'R$ 5.999', desconto: '17%', imagem: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop' },
    { nome: 'Fone Bluetooth', categoria: 'eletronicos', preco: 'R$ 299', promocao: false, imagem: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop' },
    { nome: 'Camiseta', categoria: 'roupas', preco: 'R$ 79', promocao: false, imagem: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop' },
    { nome: 'Calça Jeans', categoria: 'roupas', preco: 'R$ 159', promocao: true, precoOriginal: 'R$ 199', desconto: '20%', imagem: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=300&fit=crop' },
    { nome: 'Tênis', categoria: 'roupas', preco: 'R$ 329', promocao: false, imagem: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop' },
    { nome: 'Livro JavaScript', categoria: 'livros', preco: 'R$ 89', promocao: false, imagem: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop' },
    { nome: 'Livro Python', categoria: 'livros', preco: 'R$ 79', promocao: true, precoOriginal: 'R$ 99', desconto: '20%', imagem: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=300&fit=crop' },
    { nome: 'Almofada', categoria: 'casa', preco: 'R$ 65', promocao: false, imagem: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=300&fit=crop' },
    { nome: 'Luminária', categoria: 'casa', preco: 'R$ 89', promocao: true, precoOriginal: 'R$ 120', desconto: '26%', imagem: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop' }
];
 
let filtroCategoria = 'todos';
let filtroTexto = '';
 
function renderizar() {
    const div = document.getElementById('produtos');
    const filtrados = produtos.filter(p => {
        const matchCategoria = filtroCategoria === 'todos' ||
                              (filtroCategoria === 'promocao' ? p.promocao : p.categoria === filtroCategoria);
        const matchTexto = p.nome.toLocaleLowerCase().includes(filtroTexto.toLocaleLowerCase());
        return matchCategoria && matchTexto;
    });
    div.innerHTML = filtrados.length ? filtrados.map(p => `
        <div class="produto ${p.promocao ? 'promocao' : ''}">
            ${p.promocao ? '<div class="promocao-badge">🔥 PROMOÇÃO</div>' : ''}
            <img src="${p.imagem}" alt="${p.nome}" loading="lazy">
            <h3>${p.nome}</h3>
            <span class="cat">${p.categoria}</span>
            <div class="preco">
                ${p.promocao ? `<span class="preco-original">${p.precoOriginal}</span>` : ''}
                <span class="${p.promocao ? 'preco-promocional' : ''}">${p.preco}</span>
                ${p.promocao ? `<span class="desconto">-${p.desconto}</span>` : ''}
            </div>
        </div>
    `).join('') : '<div class="sem">Nenhum produto encontrado</div>';
}
 
function filtrar(categoria) {
    filtroCategoria = categoria;
    document.querySelectorAll('.dropdown-content a').forEach(el => el.style.background - '');
    if (event && event.target) event.target.style.background = '#e3f2fd';
    renderizar();
}
 
function filtrarPorTexto() {
    filtroTexto = document.getElementById('busca').value;
    renderizar();
}
 
function toggleMenu() {
    document.getElementById('menuItems').classList.toggle('show');
}
 
document.addEventListener('click', function(e) {
    if (!e.target.closest('.menu-dropdown')) {
        document.getElementById('menuItems').classList.remove('show');
    }
});
 
renderizar();
 