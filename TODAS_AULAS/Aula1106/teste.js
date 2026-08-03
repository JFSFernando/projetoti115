// Objeto literal com propriedades e método usando 'this'
const escola = {
    nome: "Escola Tech",
    alunos: [],
    
    apresentar() {
        return `${this.nome} - Total: ${this.alunos.length} alunos`;
    }
};

// Array de objetos
const alunosIniciais = [
    { id: 1, nome: "João", idade: 20, curso: "JavaScript" },
    { id: 2, nome: "Maria", idade: 22, curso: "Python" }
];

escola.alunos = [...alunosIniciais];

// Função para exibir alunos
function exibirAlunos() {
    const alunosDiv = document.getElementById('alunosList');
    if (escola.alunos.length === 0) {
        alunosDiv.innerHTML = '<p>Nenhum aluno cadastrado</p>';
        return;
    }
    
    alunosDiv.innerHTML = escola.alunos.map(aluno => 
        `<div class="aluno-item">
            <strong>${aluno.nome}</strong> | ${aluno.idade} anos | ${aluno.curso}
         </div>`
    ).join('');
    
    document.getElementById('jsonDisplay').textContent = 
        JSON.stringify(escola.alunos, null, 2);
}

// Adicionar novo aluno
function adicionarAluno() {
    const novoId = escola.alunos.length + 1;
    const novoAluno = {
        id: novoId,
        nome: `Aluno ${novoId}`,
        idade: Math.floor(Math.random() * 30) + 18,
        curso: ["HTML/CSS", "React", "Node.js", "SQL"][Math.floor(Math.random() * 4)]
    };
    
    escola.alunos.push(novoAluno);
    exibirAlunos();
}

// JSON.stringify - converter objeto para JSON
function salvarJSON() {
    const jsonString = JSON.stringify(escola.alunos, null, 2);
    localStorage.setItem('alunos', jsonString);
    alert('✅ Alunos salvos no localStorage!');
}

// JSON.parse - converter JSON para objeto
function carregarJSON() {
    const jsonString = localStorage.getItem('alunos');
    if (jsonString) {
        const alunosCarregados = JSON.parse(jsonString);
        escola.alunos = alunosCarregados;
        exibirAlunos();
        alert('📥 Alunos carregados do localStorage!');
    } else {
        alert('⚠️ Nenhum dado salvo encontrado!');
    }
}

// Inicializar a página
exibirAlunos();
console.log(escola.apresentar());