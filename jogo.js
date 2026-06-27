let moedas = 0;
let moedasPorClique = 1;
let moedasPorSegundo = 0;
let custoClique = 10;
let custoAuto = 50;

const txtMoedas = document.getElementById("txt-moedas");
const txtPorClique = document.getElementById("txt-por-clique");
const txtPorSegundo = document.getElementById("txt-por-segundo");
const txtCustoClique = document.getElementById("txt-custo-clique");
const txtCustoAuto = document.getElementById("txt-custo-auto");
const btnUpgradeClique = document.getElementById("btn-upgrade-clique");
const btnUpgradeAuto = document.getElementById("btn-upgrade-auto");
const capivaraClicavel = document.getElementById("capivara-clicavel");
const areaClique = document.getElementById("area-clique");

// Animação de Moedas Saltando da Capivara
function saltarMoeda(evento) {
    const moeda = document.createElement("div");
    moeda.classList.add("moeda-voadora");
    moeda.innerText = `+🪙${moedasPorClique}`;

    const retangulo = areaClique.getBoundingClientRect();
    const x = evento.clientX - retangulo.left;
    const y = evento.clientY - retangulo.top;

    moeda.style.left = `${x}px`;
    moeda.style.top = `${y}px`;

    areaClique.appendChild(moeda);
    setTimeout(() => { moeda.remove(); }, 600);
}

// Efeito de Festa/Brilho de Confetes ao comprar itens
function efeitoCompra(elementoBotao) {
    const cores = ['#ff0055', '#00ffcc', '#ffcc00', '#9900ff', '#ff5722'];
    for (let i = 0; i < 15; i++) {
        const confete = document.createElement("div");
        confete.classList.add("confete-efeito");
        confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
        
        // Direção aleatória da explosão
        const angulo = Math.random() * Math.PI * 2;
        const distancia = 30 + Math.random() * 50;
        confete.style.setProperty('--x', `${Math.cos(angulo) * distancia}px`);
        confete.style.setProperty('--y', `${Math.sin(angulo) * distancia}px`);
        
        confete.style.left = `50%`;
        confete.style.top = `50%`;
        
        elementoBotao.parentElement.appendChild(confete);
        setTimeout(() => { confete.remove(); }, 500);
    }
}

// LÓGICA DO CLIQUE
capivaraClicavel.addEventListener("click", (e) => {
    moedas += moedasPorClique;
    saltarMoeda(e);
    atualizarTela();
});

// COMPRAS
function comprarRoupinha() {
    if (moedas >= custoClique) {
        moedas -= custoClique;
        moedasPorClique += 1;
        custoClique = Math.floor(custoClique * 1.5);
        efeitoCompra(btnUpgradeClique);
        atualizarTela();
        salvarJogo();
    }
}

function comprarEstagiaria() {
    if (moedas >= custoAuto) {
        moedas -= custoAuto;
        moedasPorSegundo += 1;
        custoAuto = Math.floor(custoAuto * 1.6);
        efeitoCompra(btnUpgradeAuto);
        atualizarTela();
        salvarJogo();
    }
}

// SISTEMA DE SALVAMENTO
function salvarJogo() {
    localStorage.setItem("cap_m", moedas);
    localStorage.setItem("cap_c", moedasPorClique);
    localStorage.setItem("cap_s", moedasPorSegundo);
    localStorage.setItem("cap_cc", custoClique);
    localStorage.setItem("cap_ca", custoAuto);
}

function carregarJogo() {
    if (localStorage.getItem("cap_m") !== null) {
        moedas = parseInt(localStorage.getItem("cap_m"));
        moedasPorClique = parseInt(localStorage.getItem("cap_c"));
        moedasPorSegundo = parseInt(localStorage.getItem("cap_s"));
        custoClique = parseInt(localStorage.getItem("cap_cc"));
        custoAuto = parseInt(localStorage.getItem("cap_ca"));
    }
}

function resetarJogo() {
    if (confirm("Quer mesmo zerar seu parquinho de capivaras?")) {
        localStorage.clear();
        window.location.reload();
    }
}

// TIMERS
setInterval(() => { moedas += moedasPorSegundo; atualizarTela(); }, 1000);
setInterval(() => { salvarJogo(); }, 5000);

// ATUALIZAR INTERFACE
function atualizarTela() {
    txtMoedas.innerText = moedas;
    txtPorClique.innerText = moedasPorClique;
    txtPorSegundo.innerText = moedasPorSegundo;
    txtCustoClique.innerText = custoClique;
    txtCustoAuto.innerText = custoAuto;

    // Gerencia se os botões podem ser comprados
    btnUpgradeClique.disabled = (moedas < custoClique);
    btnUpgradeAuto.disabled = (moedas < custoAuto);

    // Adiciona efeito de brilho amarelo piscante quando a criança tem dinheiro para comprar
    if (moedas >= custoClique) btnUpgradeClique.classList.add("botao-brilhando");
    else btnUpgradeClique.classList.remove("botao-brilhando");

    if (moedas >= custoAuto) btnUpgradeAuto.classList.add("botao-brilhando");
    else btnUpgradeAuto.classList.remove("botao-brilhando");
}

carregarJogo();
atualizarTela();
