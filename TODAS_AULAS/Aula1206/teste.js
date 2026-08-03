// ============================================
// CONFIGURAÇÃO DA API (JSONPlaceholder - API real gratuita)
// ============================================
const API_USUARIOS = 'https://jsonplaceholder.typicode.com/users';

// ============================================
// EXEMPLO 1: MÉTODO GET (Pegar/Recuperar dados)
// ============================================
function exemploGet() {
    const statusDiv = document.getElementById('statusGet');
    const lista = document.getElementById('listaUsuarios');
    
    // Mostra loading
    statusDiv.innerHTML = '⏳ Buscando usuários da API... (GET)';
    statusDiv.className = 'status';
    lista.innerHTML = '<li>Carregando...</li>';
    
    // GET - Buscar dados da API
    fetch(API_USUARIOS)  // Requisição GET (padrão)
        .then(resposta => {
            if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
            return resposta.json(); // Converte a resposta para JSON
        })
        .then(usuarios => {
            // Exibe os usuários na tela
            lista.innerHTML = usuarios.map(usuario => `
                <li>
                    <div class="usuario-nome">👤 ${usuario.name}</div>
                    <div class="usuario-email">📧 ${usuario.email}</div>
                    <div style="font-size:12px; color:#999; margin-top:5px;">
                        📞 ${usuario.phone} | 🌐 ${usuario.website}
                    </div>
                </li>
            `).join('');
            
            statusDiv.innerHTML = `✅ GET concluído! ${usuarios.length} usuários carregados.`;
            statusDiv.classList.add('sucesso');
        })
        .catch(erro => {
            statusDiv.innerHTML = `❌ Erro no GET: ${erro.message}`;
            statusDiv.classList.add('erro');
            lista.innerHTML = '<li>❌ Erro ao carregar usuários</li>';
        });
}

// ============================================
// EXEMPLO 2: MÉTODO POST (Enviar/Criar dados)
// ============================================
function exemploPost(nome, email) {
    const statusDiv = document.getElementById('statusPost');
    const resultadoDiv = document.getElementById('resultadoPost');
    
    // Valida os campos
    if (!nome || !nome.trim()) {
        alert('❌ Digite o nome do usuário');
        return;
    }
    
    if (!email || !email.trim()) {
        alert('❌ Digite o e-mail do usuário');
        return;
    }
    
    // Mostra loading
    statusDiv.innerHTML = '📤 Enviando dados para API... (POST)';
    statusDiv.className = 'status';
    resultadoDiv.innerHTML = '';
    
    // Dados a serem enviados
    const novoUsuario = {
        name: nome.trim(),
        email: email.trim(),
        phone: '(11) 99999-9999',
        website: 'exemplo.com'
    };
    
    // POST - Enviar dados para a API
    fetch(API_USUARIOS, {
        method: 'POST',                    // Método POST
        headers: {                         // Cabeçalhos
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoUsuario)  // Converte dados para JSON
    })
    .then(resposta => {
        if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
        return resposta.json(); // Retorna o usuário criado
    })
    .then(usuarioCriado => {
        // Exibe o resultado
        resultadoDiv.innerHTML = `
            <div class="resultado-box">
                <strong>✅ Usuário criado com sucesso!</strong><br>
                <strong>ID:</strong> ${usuarioCriado.id}<br>
                <strong>Nome:</strong> ${usuarioCriado.name}<br>
                <strong>E-mail:</strong> ${usuarioCriado.email}<br>
                <strong>Phone:</strong> ${usuarioCriado.phone}<br>
                <small style="color:#666;">(API retornou os dados salvos)</small>
            </div>
        `;
        
        statusDiv.innerHTML = `✅ POST concluído! Usuário "${usuarioCriado.name}" criado.`;
        statusDiv.classList.add('sucesso');
        
        // Limpa os campos
        document.getElementById('nome').value = '';
        document.getElementById('email').value = '';
        
        // Opcional: Recarrega a lista de usuários
        setTimeout(() => {
            if (confirm('Deseja recarregar a lista de usuários?')) {
                exemploGet();
            }
        }, 500);
    })
    .catch(erro => {
        statusDiv.innerHTML = `❌ Erro no POST: ${erro.message}`;
        statusDiv.classList.add('erro');
        resultadoDiv.innerHTML = `<div class="resultado-box" style="background:#fed7d7;border-left-color:#e53e3e;">
            ❌ Falha ao criar usuário: ${erro.message}
        </div>`;
    });
}

// ============================================
// EVENTOS DOS BOTÕES
// ============================================
document.getElementById('btnGet').addEventListener('click', exemploGet);
document.getElementById('btnPost').addEventListener('click', () => {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    exemploPost(nome, email);
});

// ============================================
// DEMONSTRAÇÃO: Síncrono vs Assíncrono
// ============================================
console.log('='.repeat(50));
console.log('🟢 DEMONSTRAÇÃO: Síncrono vs Assíncrono');
console.log('='.repeat(50));
console.log('🔵 [SÍNCRONO] 1. Este código executa PRIMEIRO');
console.log('🔵 [SÍNCRONO] 2. Executa linha por linha');

setTimeout(() => {
    console.log('🟢 [ASSÍNCRONO] 3. Este código executa DEPOIS, sem travar a tela!');
    console.log('✅ O GET e POST também são ASSÍNCRONOS!');
}, 0);

console.log('🔵 [SÍNCRONO] 4. Interface continua responsiva');
console.log('='.repeat(50) + '\n');

// ============================================
// CARREGA USUÁRIOS AUTOMATICAMENTE
// ============================================
exemploGet();