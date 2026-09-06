
const inputNome = document.querySelector('#nomePersonagem');
const inputDefesa = document.querySelector('#numberDefesa');
const inputAgilidade = document.querySelector('#numberAgilidade');
const inputGatilho = document.querySelector('#numberGatilho');
const inputForca = document.querySelector('#numberForca');
const btnPersonagem = document.getElementById('btn_dados_personagem');
const btnObjetos = document.getElementById("inserirDadosObjetos")
const inputNomeObjeto = document.getElementById('nomeObjeto')
const select = document.getElementById('resistenciaObjeto');
const selectResistencia = document.getElementById('resistencia');
const show = document.querySelector(".show")
const showBotao = document.getElementById("showBotao")
var textoAlerta = document.getElementById("textoAlerta")
var enviou = false

var agilidade, forca, gatilho, defesa, option;

btn_dados_personagem.addEventListener('click', (event) => {
    if (!validaDados() == true) {
        console.log("false")
        return
    }

    let nome = inputNome.value
    let agilidade = parseFloat(inputAgilidade.value.replace(/[a-zA-Z]/g, "")) || 0
    let forca = parseFloat(inputForca.value.replace(/[a-zA-Z]/g, "")) || 0
    let gatilho = parseFloat(inputGatilho.value.replace(/[a-zA-Z]/g, "")) || 0
    let defesa = parseFloat(inputDefesa.value.replace(/[a-zA-Z]/g, "")) || 0

    // Inserindo no Banco
    const dados = { 
        vida:'100',
        nome: nome, 
        agilidade: agilidade, 
        forca: forca, 
        defesa: defesa, 
        gatilho: gatilho, 
        resistencia: selectResistencia.options[selectResistencia.selectedIndex].text 
    }
    inputNome.value = ''
    inputDefesa.value = ''
    inputAgilidade.value = ''
    inputGatilho.value = ''
    inputForca.value = ''
    adicionarPersonagem(dados)
    textoAlerta.textContent = "Personagem adicionado com sucesso!!"
    show.style.visibility = "visible"

})
// Monitora a digitação nos inputs numéricos para aplicar a trava de valor máximo
const inputsNumericos = document.querySelectorAll('input[type="number"]');

inputsNumericos.forEach(function(input) {
    input.addEventListener('input', function() {
        let valor = parseInt(this.value);
        
        // Se o valor digitado for 30 ou maior, força a barra para o limite máximo (29)
        if (valor >= 31) {
            this.value = 30;
        }
        
        // Evita também que digitem números negativos
        if (valor < 0 || isNaN(valor)) {
            this.value = 0;
        }
    });
});


document.addEventListener('change', function (event) {
    if (event.target.classList.contains('shared')) {
        const currentCheckbox = event.target;
        // Encontra o input numérico vinculado a esta checkbox específica
        const targetInputSelector = currentCheckbox.getAttribute('data-input');
        const targetInput = document.querySelector(targetInputSelector);

        // Regra 1: Ativa o input se a checkbox estiver marcada, senão desativa e reseta para 0
        if (targetInput) {
            targetInput.disabled = !currentCheckbox.checked;
            if (!currentCheckbox.checked) {
                targetInput.value = 0; // Opcional: zera o valor ao desmarcar
            }
        }

        // Regra 2: Controla o limite máximo de 3 seleções
        const checkboxes = document.querySelectorAll('.shared');
        const checkedBoxes = document.querySelectorAll('.shared:checked');
        
        if (checkedBoxes.length >= 3) {
            // Bloqueia apenas as checkboxes que NÃO estão marcadas
            checkboxes.forEach(function (box) {
                if (!box.checked) {
                    box.disabled = true;
                }
            });
        } else {
            // Libera todas as checkboxes se estiver abaixo do limite
            checkboxes.forEach(function (box) {
                box.disabled = false;
            });
        }
    }
});



function validaDados() {
    let nome = inputNome.value;
    if (nome === '') {
        alert("Campo nome vazio");
        return;
    }
    let i = 0;
    while (i <= nome.length) {
        if (nome[i] <= 9) {
            alert("Nome não pode ter numeros")
            inputNome.value = ''
            return false
        }
        i++;
    }


    agilidade = inputAgilidade.value.replace(/[a-zA-Z]/g, "")
    forca = inputForca.value.replace(/[a-zA-Z]/g, "")
    gatilho = inputGatilho.value.replace(/[a-zA-Z]/g, "")
    defesa = inputDefesa.value.replace(/[a-zA-Z]/g, "")
    return true
}




btnObjetos.addEventListener('click', (event) => {
    let nome = inputNomeObjeto.value
    if (nome === '') {
        alert('Nome de objeto vazio')
        inputNomeObjeto.value = ''
        return
    }
    let i = 0;
    while (i <= nome.length) {
        if (nome[i] <= 9 && nome[i] != ' ') {
            alert("Nome não pode ter numeros")
            inputNomeObjeto.value = ''
            return false
        }
        i++;
    }
    const dados = { 
        nome: nome, 
        resistencia: select.options[select.selectedIndex].text
    }
    inputNomeObjeto.value = ''
    adicionarObjetos(dados)
    textoAlerta.textContent = "Objeto adicionado com sucesso!!"
    show.style.visibility = "visible"
})

showBotao.addEventListener('click', ()=>{
    show.style.visibility = 'hidden'
})