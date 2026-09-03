import { adicionarPersonagem } from './banco/banco.js'
import { adicionarObjetos} from './banco/bancoObjetos.js'

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
})

document.addEventListener('change', function (event) {
    if (event.target.classList.contains('shared')) {
        const countShared = document.querySelectorAll('.shared:checked').length;
        if (countShared > 3 && event.target.checked) {
            alert("O Limite é de apenas 3 escolhas");
            event.target.checked = false;
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
})