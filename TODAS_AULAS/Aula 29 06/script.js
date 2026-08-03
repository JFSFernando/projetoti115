(function() {
    "use strict";

    // ---------- DOM references ----------
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const addProductBtn = document.getElementById('addProductBtn');
    const refreshBtn = document.getElementById('refreshBtn');
    const productName = document.getElementById('productName');
    const productPrice = document.getElementById('productPrice');
    const productStock = document.getElementById('productStock');
    const productDescription = document.getElementById('productDescription');
    const productsContainer = document.getElementById('productsContainer');
    const productCount = document.getElementById('productCount');
    const adminPanel = document.getElementById('adminPanel');

    // ---------- Constants ----------
    const JWT_KEY = 'jwt_token_loja';
    const STORAGE_KEY = 'produtos_loja';

    // ---------- JWT Helpers ----------
    function getToken() {
        return sessionStorage.getItem(JWT_KEY);
    }

    function setToken(token) {
        if (token) {
            sessionStorage.setItem(JWT_KEY, token);
        } else {
            sessionStorage.removeItem(JWT_KEY);
        }
        updateUI();
    }

    function generateMockJWT(payload) {
        const header = { alg: 'HS256', typ: 'JWT' };
        const base64Header = btoa(JSON.stringify(header));
        const base64Payload = btoa(JSON.stringify(payload));
        const signature = btoa('assinatura-simulada-' + Date.now());
        return `${base64Header}.${base64Payload}.${signature}`;
    }

    function isTokenValid(token) {
        if (!token) return false;
        try {
            const parts = token.split('.');
            if (parts.length !== 3) return false;
            const payload = JSON.parse(atob(parts[1]));
            if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
                return false;
            }
            return true;
        } catch (_) {
            return false;
        }
    }

    function decodeTokenPayload(token) {
        try {
            const parts = token.split('.');
            if (parts.length !== 3) return null;
            return JSON.parse(atob(parts[1]));
        } catch (_) {
            return null;
        }
    }

    // ---------- Product CRUD (JSON API Simulada) ----------
    function getProducts() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (_) {
            return [];
        }
    }

    function saveProducts(products) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }

    function addProduct(name, price, stock, description) {
        const products = getProducts();
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id || 0)) + 1 : 1;
        const newProduct = {
            id: newId,
            name: name.trim() || 'Produto sem nome',
            price: parseFloat(price) || 0,
            stock: parseInt(stock) || 0,
            description: description.trim() || 'Sem descrição',
            createdAt: new Date().toISOString()
        };
        products.push(newProduct);
        saveProducts(products);
        return newProduct;
    }

    function deleteProduct(id) {
        let products = getProducts();
        products = products.filter(p => p.id !== id);
        saveProducts(products);
    }

    function updateProduct(id, updates) {
        const products = getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updates };
            saveProducts(products);
            return products[index];
        }
        return null;
    }

    // ---------- Renderização ----------
    function renderProducts() {
        const products = getProducts();
        const token = getToken();
        const isValid = isTokenValid(token);

        productsContainer.innerHTML = '';

        if (!isValid) {
            productsContainer.innerHTML = `
                <div class="empty-message">
                    🔒 Faça login para visualizar os produtos da loja.
                    <br><small style="color: #94a3b8;">Use o botão "Login" no cabeçalho</small>
                </div>
            `;
            productCount.textContent = '0 produtos';
            return;
        }

        if (products.length === 0) {
            productsContainer.innerHTML = `
                <div class="empty-message">
                    📭 Nenhum produto cadastrado.
                    <br><small style="color: #94a3b8;">Adicione seu primeiro produto!</small>
                </div>
            `;
            productCount.textContent = '0 produtos';
            return;
        }

        // Ordena por id decrescente (mais recente primeiro)
        const sorted = [...products].sort((a, b) => (b.id || 0) - (a.id || 0));

        sorted.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';

            card.innerHTML = `
                <div class="product-name">${escapeHtml(product.name)}</div>
                <div class="product-description">${escapeHtml(product.description)}</div>
                <div class="product-meta">
                    <span class="product-price">R$ ${product.price.toFixed(2)}</span>
                    <span class="product-stock">📦 ${product.stock} unidades</span>
                </div>
                <div class="product-actions">
                    <button class="btn-sm-danger" data-id="${product.id}">🗑️ Remover</button>
                    <button class="btn-sm-secondary" data-id="${product.id}">✏️ Editar</button>
                </div>
            `;

            // Evento de remover
            const deleteBtn = card.querySelector('.btn-sm-danger');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm(`Remover o produto "${product.name}"?`)) {
                    deleteProduct(product.id);
                    renderProducts();
                    updateUI();
                }
            });

            // Evento de editar (simples - preenche o formulário)
            const editBtn = card.querySelector('.btn-sm-secondary');
            editBtn.addEventListener('click', () => {
                productName.value = product.name;
                productPrice.value = product.price;
                productStock.value = product.stock;
                productDescription.value = product.description;
                // Scroll para o formulário
                adminPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Muda o texto do botão para indicar edição
                addProductBtn.textContent = '✏️ Atualizar Produto';
                addProductBtn.dataset.editId = product.id;
            });

            productsContainer.appendChild(card);
        });

        productCount.textContent = `${products.length} ${products.length === 1 ? 'produto' : 'produtos'}`;
    }

    function escapeHtml(text) {
        if (!text) return '';
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return String(text).replace(/[&<>"']/g, function(m) { return map[m]; });
    }

    // ---------- UI Update ----------
    function updateUI() {
        const token = getToken();
        const isValid = isTokenValid(token);

        // Status
        if (isValid) {
            statusDot.className = 'dot active';
            const payload = decodeTokenPayload(token);
            const user = payload?.user || 'usuário';
            statusText.textContent = `Logado (${user})`;
        } else {
            statusDot.className = 'dot';
            statusText.textContent = 'Desconectado';
            if (token) sessionStorage.removeItem(JWT_KEY);
        }

        // Habilita/desabilita campos
        const disabled = !isValid;
        productName.disabled = disabled;
        productPrice.disabled = disabled;
        productStock.disabled = disabled;
        productDescription.disabled = disabled;
        addProductBtn.disabled = disabled;

        // Mostra/esconde painel admin
        adminPanel.style.display = isValid ? 'block' : 'none';

        // Renderiza produtos
        renderProducts();
    }

    // ---------- Ações ----------
    function performLogin() {
        const payload = {
            user: 'demo',
            role: 'admin',
            exp: Math.floor(Date.now() / 1000) + 3600 // 1 hora
        };
        const token = generateMockJWT(payload);
        setToken(token);
        updateUI();
        statusText.textContent = '✅ Login efetuado';
        setTimeout(() => updateUI(), 800);
    }

    function performLogout() {
        sessionStorage.removeItem(JWT_KEY);
        updateUI();
        statusText.textContent = '👋 Sessão encerrada';
        setTimeout(() => updateUI(), 600);
    }

    function handleAddOrUpdateProduct() {
        const token = getToken();
        if (!isTokenValid(token)) {
            alert('⚠️ Você precisa estar logado para gerenciar produtos.');
            return;
        }

        const name = productName.value.trim();
        const price = parseFloat(productPrice.value);
        const stock = parseInt(productStock.value);
        const description = productDescription.value.trim();

        if (!name) {
            alert('⚠️ Informe o nome do produto.');
            productName.focus();
            return;
        }

        if (isNaN(price) || price < 0) {
            alert('⚠️ Informe um preço válido.');
            productPrice.focus();
            return;
        }

        if (isNaN(stock) || stock < 0) {
            alert('⚠️ Informe um estoque válido.');
            productStock.focus();
            return;
        }

        // Verifica se é edição
        const editId = addProductBtn.dataset.editId;
        if (editId) {
            // Atualiza produto existente
            const updated = updateProduct(parseInt(editId), {
                name,
                price,
                stock,
                description
            });
            if (updated) {
                alert(`✅ Produto "${name}" atualizado com sucesso!`);
            }
            // Reset do botão
            addProductBtn.textContent = '➕ Adicionar Produto';
            delete addProductBtn.dataset.editId;
        } else {
            // Adiciona novo produto
            const newProduct = addProduct(name, price, stock, description);
            alert(`✅ Produto "${name}" adicionado com sucesso!`);
        }

        // Limpa formulário
        productName.value = '';
        productPrice.value = '';
        productStock.value = '';
        productDescription.value = '';

        renderProducts();
        updateUI();
    }

    // ---------- Event Listeners ----------
    loginBtn.addEventListener('click', performLogin);
    logoutBtn.addEventListener('click', performLogout);
    addProductBtn.addEventListener('click', handleAddOrUpdateProduct);
    refreshBtn.addEventListener('click', () => {
        updateUI();
    });

    // Enter nos campos
    productName.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            productPrice.focus();
        }
    });
    productPrice.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            productStock.focus();
        }
    });
    productStock.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            productDescription.focus();
        }
    });
    productDescription.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAddOrUpdateProduct();
        }
    });

    // ---------- Inicialização ----------
    // Limpa token inválido
    const existing = getToken();
    if (existing && !isTokenValid(existing)) {
        sessionStorage.removeItem(JWT_KEY);
    }

    // Adiciona produtos de exemplo se não houver nenhum
    const initialProducts = getProducts();
    if (initialProducts.length === 0) {
        const sampleProducts = [
            {
                id: 1,
                name: 'Notebook Pro',
                price: 4599.99,
                stock: 15,
                description: 'Notebook com processador i7, 16GB RAM, SSD 512GB',
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                name: 'Smartphone X',
                price: 2999.90,
                stock: 30,
                description: 'Smartphone com tela 6.5", câmera 108MP, 5G',
                createdAt: new Date().toISOString()
            },
            {
                id: 3,
                name: 'Fone Bluetooth',
                price: 199.90,
                stock: 50,
                description: 'Fone de ouvido sem fio com cancelamento de ruído',
                createdAt: new Date().toISOString()
            }
        ];
        saveProducts(sampleProducts);
    }

    // Inicializa a interface
    updateUI();

    console.log('✅ Loja de Produtos com JWT + JSON API carregada!');
    console.log('📝 Dica: Faça login para gerenciar os produtos.');
})();