// ========================================
// APLICAÇÃO PRINCIPAL
// ========================================

// ========================================
// INSTÂNCIA GLOBAL
// ========================================

let biblioteca;
let modoCorrigido = false;
const debuggerInstance = new Debugger();

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar com versão com bugs
    biblioteca = new Biblioteca();
    
    // Configurar eventos
    setupEventListeners();
    
    // Carregar dados de exemplo
    loadExampleData();
    
    // Atualizar UI
    updateDashboard();
    updateLists();
    
    // Log inicial
    debuggerInstance.log('🔄 Sistema iniciado', 'system');
    debuggerInstance.log('📚 Modo: Biblioteca com Bugs', 'info');
    
    // Exibir ajuda
    showHelp();
});

// ========================================
// CONFIGURAR EVENTOS
// ========================================

function setupEventListeners() {
    // Botão executar comando
    document.getElementById('executeCommand').addEventListener('click', handleCommand);
    document.getElementById('commandInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleCommand();
    });

    // Botões de comandos rápidos
    document.querySelectorAll('.cmd-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const cmd = this.dataset.cmd;
            document.getElementById('commandInput').value = cmd;
            handleCommand();
        });
    });

    // Botão alternar modo
    document.getElementById('toggleMode').addEventListener('click', toggleMode);

    // Breakpoints
    document.querySelectorAll('.btn-breakpoint').forEach(btn => {
        btn.addEventListener('click', function() {
            toggleBreakpoint(this.dataset.method);
        });
    });

    // Evento de breakpoint
    document.addEventListener('breakpoint', function(e) {
        const { method, timestamp } = e.detail;
        debuggerInstance.log(`🔴 BREAKPOINT: ${method} foi chamado em ${timestamp.toLocaleTimeString()}`, 'warning');
        addLogToUI(`🔴 BREAKPOINT: ${method} foi chamado`, 'warning');
        updateBreakpointsStatus();
    });

    // Foco no input
    document.getElementById('commandInput').focus();
}

// ========================================
// COMANDOS
// ========================================

function handleCommand() {
    const input = document.getElementById('commandInput');
    const command = input.value.trim();
    
    if (!command) return;
    
    input.value = '';
    processCommand(command);
}

function processCommand(command) {
    const parts = command.split(' ');
    const action = parts[0].toLowerCase();
    const params = parts.slice(1);
    
    debuggerInstance.log(`▶ Executando: ${command}`, 'info');
    addLogToUI(`▶ ${command}`, 'info');

    try {
        // Análise de bug antes de executar
        const analysis = debuggerInstance.analisarBug(biblioteca, action, params);
        if (analysis.bugs.length > 0) {
            analysis.bugs.forEach(bug => {
                debuggerInstance.log(`🐛 BUG detectado: ${bug}`, 'error');
                addLogToUI(`🐛 ${bug}`, 'error');
            });
        }
        if (analysis.warnings.length > 0) {
            analysis.warnings.forEach(warning => {
                debuggerInstance.log(`⚠️ Alerta: ${warning}`, 'warning');
                addLogToUI(`⚠️ ${warning}`, 'warning');
            });
        }

        // Executar comando
        let result = null;
        let mensagem = '';

        switch(action) {
            case 'addbook':
                if (params.length < 3) {
                    throw new Error('Uso: addbook "titulo" "autor" ano');
                }
                const titulo = params.slice(0, params.length - 2).join(' ');
                const autor = params[params.length - 2];
                const ano = Number(params[params.length - 1]);
                result = biblioteca.adicionarLivro(titulo, autor, ano);
                mensagem = `✅ Livro "${titulo}" adicionado com sucesso!`;
                break;

            case 'adduser':
                if (params.length < 2) {
                    throw new Error('Uso: adduser "nome" "email"');
                }
                const nome = params.slice(0, params.length - 1).join(' ');
                const email = params[params.length - 1];
                result = biblioteca.registrarUsuario(nome, email);
                mensagem = `✅ Usuário "${nome}" registrado com sucesso!`;
                break;

            case 'borrow':
                if (params.length < 2) {
                    throw new Error('Uso: borrow livroId usuarioId');
                }
                const livroId = Number(params[0]);
                const usuarioId = Number(params[1]);
                result = biblioteca.emprestarLivro(livroId, usuarioId);
                mensagem = `✅ Empréstimo realizado com sucesso!`;
                break;

            case 'return':
                if (params.length < 1) {
                    throw new Error('Uso: return emprestimoId');
                }
                const emprestimoId = Number(params[0]);
                result = biblioteca.devolverLivro(emprestimoId);
                mensagem = `✅ Livro devolvido com sucesso!`;
                break;

            case 'list':
                const disponiveis = biblioteca.listarLivrosDisponiveis();
                if (disponiveis && disponiveis.length > 0) {
                    mensagem = `📚 Livros disponíveis: ${disponiveis.map(l => l.titulo).join(', ')}`;
                } else {
                    mensagem = '📚 Nenhum livro disponível';
                }
                addLogToUI(mensagem, 'info');
                break;

            case 'users':
                if (biblioteca.usuarios.length === 0) {
                    mensagem = '👤 Nenhum usuário cadastrado';
                } else {
                    mensagem = `👤 Usuários: ${biblioteca.usuarios.map(u => `${u.nome} (${u.email})`).join(', ')}`;
                }
                addLogToUI(mensagem, 'info');
                break;

            case 'media':
                const stats = biblioteca.getEstatisticas();
                mensagem = `📊 MediaQuery: ${stats.totalLivros} livros, ${stats.disponiveis} disponíveis, ${stats.totalUsuarios} usuários, ${stats.ativos} empréstimos ativos`;
                addLogToUI(mensagem, 'info');
                updateDashboard();
                break;

            case 'report':
                const relatorio = debuggerInstance.gerarRelatorioBugs(biblioteca);
                addLogToUI(`📋 RELATÓRIO DE BUGS:`, 'system');
                if (relatorio.bugsEncontrados.length === 0) {
                    addLogToUI(`✅ Nenhum bug encontrado!`, 'success');
                } else {
                    relatorio.bugsEncontrados.forEach(bug => {
                        addLogToUI(`🐛 ${bug}`, 'error');
                    });
                }
                if (relatorio.alertas.length > 0) {
                    relatorio.alertas.forEach(alerta => {
                        addLogToUI(`⚠️ ${alerta}`, 'warning');
                    });
                }
                if (relatorio.sugestoes.length > 0) {
                    addLogToUI(`💡 Sugestões:`, 'info');
                    relatorio.sugestoes.forEach(sug => {
                        addLogToUI(`   • ${sug}`, 'info');
                    });
                }
                break;

            case 'bug':
                // Simular bug
                debuggerInstance.log('🐛 Simulando bug...', 'warning');
                addLogToUI('🐛 Simulando bug...', 'warning');
                // Tentar emprestar sem livro disponível
                biblioteca.emprestarLivro(999, 999);
                break;

            case 'clear':
                biblioteca = new Biblioteca();
                if (modoCorrigido) {
                    biblioteca = new BibliotecaCorrigida();
                }
                debuggerInstance.log('🗑️ Dados limpos', 'system');
                addLogToUI('🗑️ Dados limpos com sucesso!', 'success');
                break;

            default:
                throw new Error(`Comando desconhecido: ${action}`);
        }

        if (result && mensagem) {
            debuggerInstance.log(mensagem, 'success');
            addLogToUI(mensagem, 'success');
        }

    } catch (error) {
        debuggerInstance.log(`❌ Erro: ${error.message}`, 'error');
        addLogToUI(`❌ ${error.message}`, 'error');
        
        // Sugestão de correção
        if (error.message.includes('já está cadastrado')) {
            addLogToUI('💡 Dica: Use dados diferentes para evitar duplicatas', 'info');
        } else if (error.message.includes('não encontrado')) {
            addLogToUI('💡 Dica: Verifique se o ID existe usando o comando "list" ou "users"', 'info');
        } else if (error.message.includes('disponível')) {
            addLogToUI('💡 Dica: Use "list" para ver livros disponíveis', 'info');
        }
    }

    // Atualizar UI
    updateDashboard();
    updateLists();
    updateBreakpointsStatus();
    
    // Manter foco
    document.getElementById('commandInput').focus();
}

// ========================================
// ALTERNAR MODO
// ========================================

function toggleMode() {
    modoCorrigido = !modoCorrigido;
    
    // Salvar dados atuais
    const dados = {
        livros: biblioteca.livros,
        usuarios: biblioteca.usuarios,
        emprestimos: biblioteca.emprestimos,
        proximoId: biblioteca.proximoId
    };
    
    // Criar nova instância
    if (modoCorrigido) {
        biblioteca = new BibliotecaCorrigida();
        debuggerInstance.log('🔧 Alternando para Modo Corrigido', 'system');
    } else {
        biblioteca = new Biblioteca();
        debuggerInstance.log('🐛 Alternando para Modo Bug', 'system');
    }
    
    // Restaurar dados
    biblioteca.livros = dados.livros;
    biblioteca.usuarios = dados.usuarios;
    biblioteca.emprestimos = dados.emprestimos;
    biblioteca.proximoId = dados.proximoId;
    
    // Atualizar indicador
    const indicator = document.getElementById('modeIndicator');
    if (modoCorrigido) {
        indicator.textContent = '✅ Modo Corrigido';
        indicator.className = 'mode-indicator fixed-mode';
    } else {
        indicator.textContent = '🐛 Modo Bug';
        indicator.className = 'mode-indicator bug-mode';
    }
    
    addLogToUI(`🔄 Modo alternado para: ${modoCorrigido ? 'Corrigido' : 'Bug'}`, 'system');
    updateDashboard();
    updateLists();
}

// ========================================
// BREAKPOINTS
// ========================================

function toggleBreakpoint(method) {
    const btn = document.querySelector(`.btn-breakpoint[data-method="${method}"]`);
    const breakpoints = biblioteca.getBreakpoints();
    
    if (breakpoints.includes(method)) {
        biblioteca.removeBreakpoint(method);
        btn.classList.remove('active');
        debuggerInstance.log(`🔵 Breakpoint removido: ${method}`, 'info');
        addLogToUI(`🔵 Breakpoint removido: ${method}`, 'info');
    } else {
        biblioteca.setBreakpoint(method);
        btn.classList.add('active');
        debuggerInstance.log(`🔴 Breakpoint ativado: ${method}`, 'warning');
        addLogToUI(`🔴 Breakpoint ativado: ${method}`, 'warning');
    }
    
    updateBreakpointsStatus();
}

function updateBreakpointsStatus() {
    const breakpoints = biblioteca.getBreakpoints();
    const status = document.getElementById('breakpointsStatus');
    
    if (breakpoints.length === 0) {
        status.innerHTML = '<span>Nenhum breakpoint ativo</span>';
    } else {
        status.innerHTML = `🔴 Breakpoints ativos: ${breakpoints.join(', ')}`;
    }
}

// ========================================
// UI - LOG
// ========================================

function addLogToUI(message, type = 'info') {
    const output = document.getElementById('debugOutput');
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    
    const timestamp = new Date().toLocaleTimeString();
    entry.textContent = `[${timestamp}] ${message}`;
    
    output.appendChild(entry);
    output.scrollTop = output.scrollHeight;
    
    // Limitar logs na UI
    while (output.children.length > 100) {
        output.removeChild(output.firstChild);
    }
}

function showHelp() {
    addLogToUI('💡 Digite "help" para ver comandos disponíveis', 'info');
    addLogToUI('📚 Exemplo: addbook "Dom Casmurro" "Machado de Assis" 1899', 'info');
    addLogToUI('👤 Exemplo: adduser "João Silva" "joao@email.com"', 'info');
    addLogToUI('📖 Exemplo: borrow 1 1 (empresta livro ID 1 para usuário ID 1)', 'info');
}

// ========================================
// UI - DASHBOARD
// ========================================

function updateDashboard() {
    const stats = biblioteca.getEstatisticas();
    
    document.getElementById('totalLivros').textContent = stats.totalLivros;
    document.getElementById('livrosDisponiveis').textContent = stats.disponiveis;
    document.getElementById('totalUsuarios').textContent = stats.totalUsuarios;
    document.getElementById('emprestimosAtivos').textContent = stats.ativos;
    document.getElementById('mediaEmprestimos').textContent = stats.media.toFixed(2);
    document.getElementById('alertas').textContent = stats.alertas;
    
    // Animar atualização
    document.querySelectorAll('.stat-value').forEach(el => {
        el.classList.remove('updated');
        setTimeout(() => el.classList.add('updated'), 10);
    });
}

// ========================================
// UI - LISTAS
// ========================================

function updateLists() {
    updateLivrosList();
    updateUsuariosList();
    updateEmprestimosList();
}

function updateLivrosList() {
    const container = document.getElementById('livrosList');
    if (biblioteca.livros.length === 0) {
        container.innerHTML = '<p class="empty-message">Nenhum livro cadastrado</p>';
        return;
    }
    
    container.innerHTML = biblioteca.livros.map(livro => `
        <div class="item">
            <span>📚 ${livro.titulo} - ${livro.autor} (${livro.ano})</span>
            <span class="badge ${livro.disponivel ? 'badge-success' : 'badge-danger'}">
                ${livro.disponivel ? 'Disponível' : 'Emprestado'}
            </span>
        </div>
    `).join('');
}

function updateUsuariosList() {
    const container = document.getElementById('usuariosList');
    if (biblioteca.usuarios.length === 0) {
        container.innerHTML = '<p class="empty-message">Nenhum usuário cadastrado</p>';
        return;
    }
    
    container.innerHTML = biblioteca.usuarios.map(usuario => `
        <div class="item">
            <span>👤 ${usuario.nome} (${usuario.email})</span>
            <span class="badge ${usuario.livrosEmprestados.length > 0 ? 'badge-warning' : 'badge-success'}">
                ${usuario.livrosEmprestados.length} livros
            </span>
        </div>
    `).join('');
}

function updateEmprestimosList() {
    const container = document.getElementById('emprestimosList');
    const ativos = biblioteca.emprestimos.filter(e => e.dataDevolucao === null);
    
    if (ativos.length === 0) {
        container.innerHTML = '<p class="empty-message">Nenhum empréstimo ativo</p>';
        return;
    }
    
    container.innerHTML = ativos.map(emprestimo => {
        const livro = biblioteca.livros.find(l => l.id === emprestimo.livroId);
        const usuario = biblioteca.usuarios.find(u => u.id === emprestimo.usuarioId);
        const dias = Math.floor((new Date() - emprestimo.dataEmprestimo) / (1000 * 60 * 60 * 24));
        
        return `
            <div class="item">
                <span>
                    📖 ${livro ? livro.titulo : 'Desconhecido'} 
                    → 👤 ${usuario ? usuario.nome : 'Desconhecido'}
                </span>
                <span class="badge ${dias > 7 ? 'badge-danger' : 'badge-warning'}">
                    ${dias} dias
                </span>
            </div>
        `;
    }).join('');
}

// ========================================
// DADOS DE EXEMPLO
// ========================================

function loadExampleData() {
    try {
        // Adicionar livros
        biblioteca.adicionarLivro('Dom Casmurro', 'Machado de Assis', 1899);
        biblioteca.adicionarLivro('Memórias Póstumas', 'Machado de Assis', 1881);
        biblioteca.adicionarLivro('O Alienista', 'Machado de Assis', 1882);
        biblioteca.adicionarLivro('Grande Sertão: Veredas', 'João Guimarães Rosa', 1956);
        biblioteca.adicionarLivro('Vidas Secas', 'Graciliano Ramos', 1938);
        
        // Adicionar usuários
        biblioteca.registrarUsuario('João Silva', 'joao@email.com');
        biblioteca.registrarUsuario('Maria Santos', 'maria@email.com');
        biblioteca.registrarUsuario('Pedro Oliveira', 'pedro@email.com');
        biblioteca.registrarUsuario('Ana Costa', 'ana@email.com');
        
        debuggerInstance.log('📦 Dados de exemplo carregados', 'success');
        addLogToUI('📦 Dados de exemplo carregados com sucesso!', 'success');
    } catch (error) {
        debuggerInstance.log(`❌ Erro ao carregar dados: ${error.message}`, 'error');
        addLogToUI(`❌ Erro ao carregar dados: ${error.message}`, 'error');
    }
}

// ========================================
// UTILITÁRIOS ADICIONAIS
// ========================================

// Comando help personalizado
function showCommandHelp() {
    const help = `
📚 COMANDOS DISPONÍVEIS:

addbook "titulo" "autor" ano  - Adicionar um livro
adduser "nome" "email"        - Registrar um usuário
borrow livroId usuarioId      - Emprestar um livro
return emprestimoId           - Devolver um livro
list                          - Listar livros disponíveis
users                         - Listar usuários
media                         - Mostrar MediaQuery
report                        - Gerar relatório de bugs
bug                           - Simular um bug
clear                         - Limpar todos os dados
`;
    addLogToUI(help, 'system');
}

// Sobrescrever comando help
const originalProcess = processCommand;
processCommand = function(command) {
    if (command.toLowerCase() === 'help') {
        showCommandHelp();
        return;
    }
    originalProcess(command);
};

// Exportar para debug no console
window.biblioteca = biblioteca;
window.debugger = debuggerInstance;

console.log('📚 Sistema de Biblioteca carregado!');
console.log('💡 Use "biblioteca" e "debugger" no console para explorar.');
console.log('📖 Comandos: help, addbook, adduser, borrow, return, list, users, media, report, bug, clear');