let posicao = 0;
let rg = document.getElementById("rg").value;
let orgao = document.getElementById("orgao").value;
let estado = document.getElementById("estado").value;
let cidade = document.getElementById("cidade").value;
let cep = document.getElementById("cep").value;
let endereco = document.getElementById("endereco").value;
let bairro = document.getElementById("bairro").value;
let complemento = document.getElementById("complemento").value;
const caixa = document.getElementById('caixa');

// executar a função "mover" a cada 10 milissegundos

const meuIntervalo = setInterval(mover, 10); 

function mover() {
    if (posicao >= 300) {
    clearInterval(meuIntervalo);
    } else {
            posicao += 2;
            caixa.style.left = posicao + 'px';
    }
}   
const caixa3 = document.getElementById('caixa3');
setTimeout(iniciarAnimacao, 100);
function iniciarAnimacao() {
    let posicao = 0;  
    function mover1() {
        if (posicao >= 200) {
           posicao += 50;
           caixa2.style.left = posicao + 'px';  
           caixa2.style.backgroundColor = 'red';
           setTimeout(mover1, 20) ;
            
        }
    }
    mover1();
}
const botao = document.getElementById('botao-alterar');
const elemento = document.getElementById('meu-elemento');

botao.addEventListener('click', () => {
    elemento.style.backgroundColor = 'salmon';
    elemento.style.fontSize = '24px';
    elemento.style.display = 'block';

    resultado.innerHTML = `
    <h3>Dados Cadastrados</h3>

    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>E-mail:</strong> ${email}</p>
    <p><strong>Telefone:</strong> ${telefone}</p>
    <p><strong>CPF:</strong> ${cpf}</p>
    <p><strong>RG:</strong> ${rg}</p>
    <p><strong>Órgão Expedidor:</strong> ${orgao}</p>

    <hr>

    <p><strong>Estado:</strong> ${estado}</p>
    <p><strong>Cidade:</strong> ${cidade}</p>
    <p><strong>CEP:</strong> ${cep}</p>
    <p><strong>Endereço:</strong> ${endereco}</p>
    <p><strong>Bairro:</strong> ${bairro}</p>
    <p><strong>Complemento:</strong> ${complemento}</p>
`;

});
