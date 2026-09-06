
window.loadPersonagens = function() {
    const dados = localStorage.getItem("bdPersonagem");
    return dados ? JSON.parse(dados) : [];
}

window.adicionarPersonagem = function (novoPersonagem) {
    let bancoAtual = loadPersonagens()
    bancoAtual.push(novoPersonagem);
    save(bancoAtual); // Salva automaticamente
}

window.edit = function(index, dados){
    let bancoAtual = loadPersonagens()
    if(bancoAtual[index]){
        bancoAtual.splice(index, 1, dados)
        save(bancoAtual)
    }

}
window.save = function(bancoAtual) {
    console.log(bancoAtual)
    localStorage.setItem("bdPersonagem", JSON.stringify(bancoAtual));
}



