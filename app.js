let listadeNumerosSorteados = [];
let numeroLimite = 10;
let secretNumber = gerarNumAleatorio();
let tentativas = 1; 

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2})
}

function exibirMsgInicial() {
  exibirTextoNaTela('h1', 'Jogo do Número Secreto');
  exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMsgInicial();


function verificarChute() {
  let chute = document.querySelector('input').value;
  if(chute == secretNumber) {
    exibirTextoNaTela('h1', 'Acertouuu!!');
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Você descobiu o número secreto com ${tentativas} ${palavraTentativa}`; 
    exibirTextoNaTela('p', mensagemTentativas);
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    if (chute > secretNumber) {
      exibirTextoNaTela('p', 'O número é menor')
    } else {
      exibirTextoNaTela('p', 'O número secreto é maior');
    }
    tentativas++;
    limparCampo();
  }
}

function gerarNumAleatorio() {
  let numeroEscolhido = parseInt (Math.random() * numeroLimite + 1);
  let quantidadeDeElementosNaLista = listadeNumerosSorteados.length;
  if(quantidadeDeElementosNaLista == numeroLimite) {
    listadeNumerosSorteados = []
  };

  if(listadeNumerosSorteados.includes(numeroEscolhido)){
    return gerarNumAleatorio();
  } else {
    listadeNumerosSorteados.push(numeroEscolhido);
    console.log(listadeNumerosSorteados);
    return numeroEscolhido;
  }
}

function limparCampo() {
  chute = document.querySelector('input');
  chute.value = '';
}


function reiniciarJogo() {
  secretNumber = gerarNumAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMsgInicial();
  document.getElementById('reiniciar').setAttribute('disabled', true);
}