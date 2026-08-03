(function() {
    'use strict';

    // ===== ELEMENTOS DOM =====
    const inputEndereco = document.getElementById('enderecoInput');
    const btnBuscar = document.getElementById('btnBuscar');
    const coordDisplay = document.getElementById('coordDisplay');
    const statusMsg = document.getElementById('statusMsg');
    const btnTheme = document.getElementById('btnTheme');

    // ===== TEMA =====
    function loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        btnTheme.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        btnTheme.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    }

    loadTheme();
    btnTheme.addEventListener('click', toggleTheme);

    // ===== MAPA =====
    const latPadrao = -23.5615;
    const lngPadrao = -46.6566;
    const zoomPadrao = 15;

    const map = L.map('map').setView([latPadrao, lngPadrao], zoomPadrao);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> colaboradores',
        maxZoom: 19
    }).addTo(map);

    // ===== MARCADOR =====
    let marker = L.marker([latPadrao, lngPadrao], {
        title: 'Endereço buscado'
    }).addTo(map);
    marker.bindPopup('📍 Aguardando busca...').openPopup();

    // Atualiza exibição das coordenadas iniciais
    coordDisplay.textContent = `📌 ${latPadrao.toFixed(5)}, ${lngPadrao.toFixed(5)}`;

    // ===== FUNÇÃO DE BUSCA =====
    async function buscarEndereco(endereco) {
        if (!endereco || endereco.trim() === '') {
            statusMsg.textContent = '⚠️ Digite um endereço válido.';
            return;
        }

        btnBuscar.disabled = true;
        btnBuscar.textContent = '⏳ Buscando...';
        statusMsg.textContent = '⏳ Consultando o endereço...';

        try {
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}&limit=1&addressdetails=1&countrycodes=br`;

            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'MapaEnderecoApp/1.0 (https://meusite.com)'
                }
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            const data = await response.json();

            if (!data || data.length === 0) {
                statusMsg.textContent = '❌ Endereço não encontrado. Tente outro.';
                btnBuscar.disabled = false;
                btnBuscar.textContent = '🔍 Buscar';
                return;
            }

            const resultado = data[0];
            const lat = parseFloat(resultado.lat);
            const lon = parseFloat(resultado.lon);
            const displayName = resultado.display_name || endereco;

            // Atualiza o marcador
            if (marker) {
                map.removeLayer(marker);
            }
            marker = L.marker([lat, lon], { title: displayName }).addTo(map);
            marker.bindPopup(`
                <strong>📍 ${displayName}</strong><br>
                <span style="font-size:0.85rem; color:#2f5a73;">${lat.toFixed(5)}, ${lon.toFixed(5)}</span>
            `).openPopup();

            // Centraliza o mapa
            map.flyTo([lat, lon], 16, {
                duration: 1.2,
                easeLinearity: 0.3
            });

            coordDisplay.textContent = `📌 ${lat.toFixed(5)}, ${lon.toFixed(5)}`;
            statusMsg.textContent = `✅ Encontrado: ${displayName.substring(0, 60)}${displayName.length > 60 ? '…' : ''}`;

        } catch (error) {
            console.error('Erro na geocodificação:', error);
            statusMsg.textContent = '❌ Erro ao buscar endereço. Tente novamente.';
        } finally {
            btnBuscar.disabled = false;
            btnBuscar.textContent = '🔍 Buscar';
        }
    }

    // ===== EVENTOS =====
    btnBuscar.addEventListener('click', function() {
        const endereco = inputEndereco.value.trim();
        buscarEndereco(endereco);
    });

    inputEndereco.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            btnBuscar.click();
        }
    });

    // Busca o endereço inicial ao carregar
    window.addEventListener('load', function() {
        setTimeout(() => {
            const enderecoInicial = inputEndereco.value.trim();
            if (enderecoInicial) {
                buscarEndereco(enderecoInicial);
            }
        }, 400);
    });

    // Ajusta o mapa ao redimensionar
    window.addEventListener('resize', function() {
        map.invalidateSize();
    });

    console.log('🗺️ Mapa de busca de endereços carregado.');
})();