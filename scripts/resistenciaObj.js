
const atiradorInput = document.getElementById("atirador")
const objetoInput = document.getElementById("objeto")
const potenciaArmaInput = document.getElementById("potenciaArma")
var telaResultado = document.querySelector(".telaResultado")
const btnResultado = document.getElementById("resultado")

var dadosObjetos;
var dadosPersonagem;

function atualizaObjetos() {
    dadosObjetos = loadObjetos()
}

window.onload = function () {
    dadosPersonagem = loadPersonagens()
    console.log('jasdfsa')
    atualizaObjetos()

    dadosPersonagem.forEach(item => {
        if (item && item.nome) {
            const option = document.createElement("option");
            option.value = item.nome;
            option.textContent = item.nome;
            atiradorInput.appendChild(option);
        }
    });

    dadosObjetos.forEach(item => {
        if (item && item.nome) {
            const option = document.createElement("option");
            option.value = item.nome;
            option.textContent = item.nome;
            objetoInput.appendChild(option);
        }
    });
}


btnResultado.addEventListener("click", (event) => {
    const personagemSelecionado = atiradorInput.value
    const objetoSelecionado = objetoInput.value
    let i, j;

    for (i = 0; i < dadosPersonagem.length; i++) {
        if (dadosPersonagem[i].nome === personagemSelecionado)
            break
    }

    for (j = 0; j < dadosObjetos.length; j++) {
        if (dadosObjetos[j].nome === objetoSelecionado)
            break
    }

    // Chama a função de calcular a resistencia.
    calcularResistencia(i, j)
})


function calcularResistencia(indexPersonagem, indexObjeto) {

    if (telaDeMorteObjeto(indexObjeto))
        return

    let potencia = Number(potenciaArmaInput.value)
    telaResultado.innerHTML = ''



    let calculaResistencia = dadosObjetos[indexObjeto].resistencia - potencia;

    if (calculaResistencia <= 0) {

        dadosObjetos[indexObjeto].resistencia = 0;
        editObjetos(indexObjeto, dadosObjetos[indexObjeto]); // Salva no localStorage
        atualizaObjetos()

    }

    telaResultado.innerHTML += `<br>${dadosPersonagem[indexPersonagem].nome} quando atirou no objeto ${dadosObjetos[indexObjeto].nome},
    usando uma arma de potencia ${potencia}, o objeto ${dadosObjetos[indexObjeto].nome},
    tinha resistência de ${dadosObjetos[indexObjeto].resistencia}.<br>`;
    dadosObjetos[indexObjeto].resistencia = calculaResistencia;

    editObjetos(indexObjeto, dadosObjetos[indexObjeto]);
    atualizaObjetos();
    
    telaResultado.innerHTML += `<br>${dadosObjetos[indexObjeto].nome}, tem ${dadosObjetos[indexObjeto].resistencia} de resistência.`;


}

function telaDeMorteObjeto(indexObjeto) {
    let resistencia = Number(dadosObjetos[indexObjeto].resistencia)
    if (resistencia <= 0) {
        telaResultado.innerHTML += `<br><br>${dadosObjetos[indexObjeto].nome} está inutilizável.`
        return true
    }
}