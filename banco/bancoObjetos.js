export function loadObjetos() {
    const dados = localStorage.getItem("bdObjetos");
    return dados ? JSON.parse(dados) : [];
}

export function adicionarObjetos(novoObjeto){
    let bancoAtual = loadObjetos()
    bancoAtual.push(novoObjeto);
    save(bancoAtual); // Salva automaticamente
}


export function editObjetos(index, dados){
    let bancoAtual = loadObjetos()
    if(bancoAtual[index]){
        bancoAtual.splice(index, 1, dados)
        save(bancoAtual)
    }
}
export function save(bancoAtual) {
    console.log(bancoAtual)
    localStorage.setItem("bdObjetos", JSON.stringify(bancoAtual));
}