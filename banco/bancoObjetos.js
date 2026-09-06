window.loadObjetos = function () {
    const dados = localStorage.getItem("bdObjetos");
    return dados ? JSON.parse(dados) : [];
}

window.adicionarObjetos = function(novoObjeto){
    let bancoAtual = loadObjetos()
    bancoAtual.push(novoObjeto);
    save(bancoAtual); // Salva automaticamente
}


window.editObjetos = function(index, dados){
    let bancoAtual = loadObjetos()
    if(bancoAtual[index]){
        bancoAtual.splice(index, 1, dados)
        save(bancoAtual)
    }
}
window.save = function (bancoAtual) {
    console.log(bancoAtual)
    localStorage.setItem("bdObjetos", JSON.stringify(bancoAtual));
}