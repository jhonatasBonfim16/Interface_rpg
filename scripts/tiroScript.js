

const atiradorInput = document.getElementById("atirador")
const alvoInput = document.getElementById("alvo")
const danoArmaInput = document.getElementById("danoArma")
const potenciaArmaInput = document.getElementById("potenciaArma")
const distancia = document.getElementById("distancia")
const btnResultado = document.getElementById("resultado")
var telaResultado = document.querySelector(".telaResultado")

var dadosPersonagem;

function atualiza() {
    dadosPersonagem = load()
}

window.onload = function () {
    atualiza()
    dadosPersonagem.forEach(item => {
        if (item && item.nome) {
            const option = document.createElement("option");
            option.value = item.nome;
            option.textContent = item.nome;
            atiradorInput.appendChild(option);
        }
    });

    dadosPersonagem.forEach(item => {
        if (item && item.nome) {
            const option = document.createElement("option");
            option.value = item.nome;
            option.textContent = item.nome;
            alvoInput.appendChild(option);
        }
    });
}

// captura os dados vindos dos inputs ao apertar o botão
btnResultado.addEventListener("click", (event) => {
    const personagemSelecionado = atiradorInput.value
    const alvoSelecionado = alvoInput.value
    let i, j;

    for (i = 0; i < dadosPersonagem.length; i++) {
        if (dadosPersonagem[i].nome === personagemSelecionado)
            break
    }

    for (j = 0; j < dadosPersonagem.length; j++) {
        if (dadosPersonagem[j].nome === alvoSelecionado)
            break
    }

    // Chama a função de calcular a resistencia.
    calcularResistencia(i, j)
})


function calcularResistencia(indexPersonagem, indexAlvo) {

    if(telaDeMorte(indexAlvo))
        return

    let potencia = Number(potenciaArmaInput.value)
    telaResultado.innerHTML = ''

    atualiza()
   let dados = {
    vida:dadosPersonagem[indexAlvo].vida,
    nome: dadosPersonagem[indexAlvo].nome,
    defesa: dadosPersonagem[indexAlvo].defesa,
    agilidade: dadosPersonagem[indexAlvo].agilidade,
    gatilho: dadosPersonagem[indexAlvo].gatilho,
    forca: dadosPersonagem[indexAlvo].forca,
    resistencia: dadosPersonagem[indexAlvo].resistencia
   }

let calculaResistencia = dadosPersonagem[indexAlvo].resistencia - potencia;

if (calculaResistencia <= 0) {

    dados.resistencia = 0;
    edit(indexAlvo, dados); // Salva no localStorage
    atualiza()

}
    dados.resistencia = calculaResistencia;
    telaResultado.innerHTML += `<br><br>${dadosPersonagem[indexPersonagem].nome} quando atirou em ${dadosPersonagem[indexAlvo].nome}, usando
        uma arma de potencia ${potencia}, o alvo ${dadosPersonagem[indexAlvo].nome}, tinha resistência de ${dadosPersonagem[indexAlvo].resistencia}.<br>`
       
    edit(indexAlvo, dados)
    calculaDano(indexPersonagem, indexAlvo);
    telaResultado.innerHTML += `<br><br>${dadosPersonagem[indexAlvo].nome}, tem ${dados.resistencia} de resistência.`
}


  // 
function calculaDano(indexPersonagem, indexAlvo) {

    if (dadosPersonagem[indexAlvo].resistencia > 0) {
        telaResultado.innerHTML += `<br>${dadosPersonagem[indexAlvo].nome} não recebeu dano.<br><br>`
        return
    }

    let danoArma = Number(danoArmaInput.value) || 0
    let distanciaDoAlvo = distancia.value
    let dano = 0;
    switch (distanciaDoAlvo) {
        case "perto":
            dano = Number((danoArma + Number(dadosPersonagem[indexPersonagem].gatilho)) * 2)
            break;
        case "longe":
            dano = Number((danoArma + Number(dadosPersonagem[indexPersonagem].gatilho)) * 1)
            break
        case "Queima roupa":
            dano = Number((danoArma + Number(dadosPersonagem[indexPersonagem].gatilho)) * 3)
            break
    }
    
    let calculoDefesa = Number(dano - Number(dadosPersonagem[indexAlvo].defesa))
    console.log(calculoDefesa)
    let vida = Number(dadosPersonagem[indexAlvo].vida)
    console.log(dadosPersonagem)
    let calculoVida = vida - calculoDefesa
    console.log(calculoVida)
    dadosPersonagem[indexAlvo].vida = calculoVida

if(vida <= 0){
    dadosPersonagem[indexAlvo].vida = 0
}   
    edit(indexAlvo, dadosPersonagem[indexAlvo])
    atualiza()
    telaResultado.innerHTML += `<br><br>${dadosPersonagem[indexAlvo].nome}, recebeu um ataque de ${dano} de dano, em uma distância de ${distanciaDoAlvo};
    mas ${dadosPersonagem[indexAlvo].nome} usando seu atributo de defesa de ${dadosPersonagem[indexAlvo].defesa}, 
    consiguiu diminuir para ${calculoDefesa} de dano. <br>
    agora tem ${dadosPersonagem[indexAlvo].vida} de vida.`
    telaDeMorte(indexAlvo)
}

function telaDeMorte(indexAlvo){
    let vida = Number(dadosPersonagem[indexAlvo].vida)
    console.log( 'vida:' + vida)
    if( vida <= 0){
        telaResultado.innerHTML += `<br><br>${dadosPersonagem[indexAlvo].nome} está morto.`
        return true
    }
}