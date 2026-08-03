let posicao = 0;
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

});


    