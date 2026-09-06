
const tela = document.querySelector(".conteiner")
tela.innerHTML = '' 

const dados = loadPersonagens()

window.onload = function () {
    dados.forEach(item => {
        const div = document.createElement("div")
        div.style.border = '1px solid black'
        
        // Adiciona uma classe CSS em vez de estilizar direto no JS
        div.classList.add("card") 

        div.innerHTML = `
            <h3 class="card-nome">${item.nome}</h3>
            <div class="card-status">
                <div class="status-item"><span class="label">❤️ Vida:</span> <span class="valor">${item.vida}</span></div>
                <div class="status-item"><span class="label">⚔️ Força:</span> <span class="valor">${item.forca}</span></div>
                <div class="status-item"><span class="label">⚡ Agilidade:</span> <span class="valor">${item.agilidade}</span></div>
                <div class="status-item"><span class="label">🎯 Gatilho:</span> <span class="valor">${item.gatilho}</span></div>
                <div class="status-item"><span class="label">🛡️ Defesa:</span> <span class="valor">${item.defesa}</span></div>
            </div>
        `;
        div.style.padding = '15px 15px 15px 15px'
        tela.appendChild(div)
    });
}
