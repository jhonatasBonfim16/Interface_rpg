
export function load() {
    const dados = localStorage.getItem("bdPersonagem");
    return dados ? JSON.parse(dados) : [];
}

export function adicionarPersonagem(novoPersonagem) {
    let bancoAtual = load()
    bancoAtual.push(novoPersonagem);
    save(bancoAtual); // Salva automaticamente
}

export function edit(index, dados){
    let bancoAtual = load()
    if(bancoAtual[index]){
        bancoAtual.splice(index, 1, dados)
        save(bancoAtual)
    }

}
export function save(bancoAtual) {
    console.log(bancoAtual)
    localStorage.setItem("bdPersonagem", JSON.stringify(bancoAtual));
}



