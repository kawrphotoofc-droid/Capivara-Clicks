// ==========================================
// 1. VARIÁVEIS DE ESTADO (Dados do Jogo)
// ==========================================
let moedas = 0;
let moedasPorClique = 1;
let moedasPorSegundo = 0;

let custoClique = 10;
let custoAuto = 50;

// ==========================================
// 2. MAPEAMENTO DOS ELEMENTOS DA TELA (HTML)
// ==========================================
const txtMoedas = document.getElementById("txt-moedas");
const txtPorClique = document.getElementById("txt-por-clique");
const txtPorSegundo = document.getElementById("txt-por-segundo");
const txtCustoClique = document.getElementById("txt-custo-clique");
const txtCustoAuto = document.getElementById("txt-custo-auto");

const btnUpgradeClique = document.getElementById("btn-upgrade-clique");
const btnUpgradeAuto = document.getElementById("btn-upgrade-auto");
const capivaraClicavel = document.getElementById("capivara-clicavel");

// ==========================================
// 3. SISTEMA DE SALVAMENTO (LocalStorage)
// ==========================================

function salvarJogo() {
    localStorage.setItem("capivara_moedas", moedas);
    localStorage.setItem("capivara_clique", moedasPorClique);
    localStorage.setItem("capivara_segundo", moedasPorSegundo);
    localStorage.setItem("capivara_custoClique", custoClique);
    localStorage.setItem("capivara_custoAuto", custoAuto);
    console.log("Jogo salvo automaticamente!");
}

function carregarJogo() {
    // Só tenta carregar se encontrar um registro antigo no navegador
    if (localStorage.getItem("capivara_moedas") !== null) {
        moedas = parseInt(localStorage.getItem("capivara_moedas"));
        moedasPorClique = parseInt(localStorage.getItem("capivara_clique"));
        moedasPorSegundo = parseInt(localStorage.getItem("capivara_segundo"));
        custoClique = parseInt(localStorage.getItem("capivara_custoClique"));
        custoAuto = parseInt(localStorage.getItem("capivara_custoAuto"));
    }
}

function resetarJogo() {
    if (confirm("Quer mesmo deletar seu progresso e começar do zero?")) {
        localStorage.clear(); // Limpa a memória local
        window.location.reload(); // Recarrega a página limpa
    }
}

// ==========================================
// 4. LÓGICA DAS AÇÕES E DO JOGO
// ==========================================

// Evento de clicar na Capivara
capivaraClicavel.addEventListener("click", () => {
    moedas += moedasPorClique;
    atualizarTela();
});

// Comprar Upgrade de Clique (Roupinha)
function comprarRoupinha() {
    if (moedas >= custoClique) {
        moedas -= custoClique;
        moedasPorClique += 1;
        custoClique = Math.floor(custoClique * 1.5); // Aumenta o preço do próximo em 50%
        atualizarTela();
        salvarJogo();
    }
}

// Comprar Upgrade Automático (Estagiária)
function comprarEstagiaria() {
    if (moedas >= custoAuto) {
        moedas -= custoAuto;
        moedasPorSegundo += 1;
        custoAuto = Math.floor(custoAuto * 1.6); // Aumenta o preço do próximo em 60%
        atualizarTela();
        salvarJogo();
    }
}

// ==========================================
// 5. MOTORES DE TEMPO (Loops de Execução)
// ==========================================

// Motor de Ganhos por Segundo (Executa a cada 1000ms = 1 segundo)
setInterval(() => {
    moedas += moedasPorSegundo;
    atualizarTela();
}, 1000);

// Motor de Salvamento Automático (Executa a cada 5000ms = 5 segundos)
setInterval(() => {
    salvarJogo();
}, 5000);

// ==========================================
// 6. ATUALIZAÇÃO VISUAL DA INTERFACE
// ==========================================
function atualizarTela() {
    // Atualiza os textos numéricos
    txtMoedas.innerText = moedas;
    txtPorClique.innerText = moedasPorClique;
    txtPorSegundo.innerText = moedasPorSegundo;
    txtCustoClique.innerText = custoClique;
    txtCustoAuto.innerText = custoAuto;

    // Bloqueia os botões se o jogador não tiver dinheiro suficiente
    btnUpgradeClique.disabled = (moedas < custoClique);
    btnUpgradeAuto.disabled = (moedas < custoAuto);
}

// ==========================================
// 7. INICIALIZAÇÃO DO JOGO
// ==========================================
carregarJogo();  // Busca dados salvos no navegador
atualizarTela(); // Renderiza os dados corretos na tela
