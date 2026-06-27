// ==========================================
// 1. CONFIGURAÇÕES E ESTADO DO JOGO
// ==========================================
let moedas = 0;
let moedasPorClique = 1;
let moedasPorSegundo = 0;
let custoClique = 10;
let custoAuto = 50;

// ==========================================
// 2. ELEMENTOS DA INTERFACE (HTML)
// ==========================================
const txtMoedas = document.getElementById("txt-moedas");
const txtPorClique = document.getElementById("txt-por-clique");
const txtPorSegundo = document.getElementById("txt-por-segundo");
const txtCustoClique = document.getElementById("txt-custo-clique");
const txtCustoAuto = document.getElementById("txt-custo-auto");

const btnUpgradeClique = document.getElementById("btn-upgrade-clique");
const btnUpgradeAuto = document.getElementById("btn-upgrade-auto");
const capivaraClicavel = document.getElementById("capivara-clicavel");
const areaClique = document.getElementById("area-clique");

// ==========================================
// 3. ANIMAÇÃO DO CLIQUE (NÚMERO FLUTUANTE)
// ==========================================
function criarNumeroFlutuante(evento) {
    // Cria uma caixinha de texto invisível no HTML
    const numero = document.createElement("div");
    numero.classList.add("numero-flutuante");
    numero.innerText = `+$${moedasPorClique}`;

    // Calcula onde o clique do mouse aconteceu dentro da área da capivara
    const retangulo = areaClique.getBoundingClientRect();
    const x = evento.clientX - retangulo.left;
    const y = evento.clientY - retangulo.top;

    // Posiciona o texto exatamente onde o mouse clicou
    numero.style.left = `${x}px`;
    numero.style.top = `${y}px`;

    // Adiciona o número na tela (o CSS se encarrega de fazê-lo voar e sumir)
    areaClique.appendChild(numero);

    // Remove o número do código depois de 0.8 segundos para não travar o jogo
    setTimeout(() => {
        numero.remove();
    }, 800);
}

// ==========================================
// 4. MEMÓRIA DO JOGO (SALVAMENTO NO NAVEGADOR)
// ==========================================
function salvarJogo() {
    localStorage.setItem("capivara_moedas", moedas);
    localStorage.setItem("capivara_clique", moedasPorClique);
    localStorage.setItem("capivara_segundo", moedasPorSegundo);
    localStorage.setItem("capivara_custoClique", custoClique);
    localStorage.setItem("capivara_custoAuto", custoAuto);
}

function carregarJogo() {
    if (localStorage.getItem("capivara_moedas") !== null) {
        moedas = parseInt(localStorage.getItem("capivara_moedas"));
        moedasPorClique = parseInt(localStorage.getItem("capivara_clique"));
        moedasPorSegundo = parseInt(localStorage.getItem("capivara_segundo"));
        custoClique = parseInt(localStorage.getItem("capivara_custoClique"));
        custoAuto = parseInt(localStorage.getItem("capivara_custoAuto"));
    }
}

function resetarJogo() {
    if (confirm("Quer mesmo recomeçar sua fazenda de capivaras do zero?")) {
        localStorage.clear();
        window.location.reload();
    }
}

// ==========================================
// 5. EVENTOS E MECÂNICAS
// ==========================================

// Detecta o clique na capivara e dispara os ganhos e os efeitos
capivaraClicavel.addEventListener("click", (evento) => {
    moedas += moedasPorClique;
    criarNumeroFlutuante(evento); // Passa o clique do mouse para saber a posição exata
    atualizarTela();
});

// Compra de Upgrade: Cliques Manuais
function comprarRoupinha() {
    if (moedas >= custoClique) {
        moedas -= custoClique;
        moedasPorClique += 1;
        custoClique = Math.floor(custoClique * 1.5); // Multiplica o preço por 1.5x
        atualizarTela();
        salvarJogo();
    }
}

// Compra de Upgrade: Ganhos Automáticos
function comprarEstagiaria() {
    if (moedas >= custoAuto) {
        moedas -= custoAuto;
        moedasPorSegundo += 1;
        custoAuto = Math.floor(custoAuto * 1.6); // Multiplica o preço por 1.6x
        atualizarTela();
        salvarJogo();
    }
}

// ==========================================
// 6. LOOPS DE TEMPO (RELOGIOS DO JOGO)
// ==========================================

// Roda a cada 1 segundo (1000ms) para adicionar moedas automáticas
setInterval(() => {
    moedas += moedasPorSegundo;
    atualizarTela();
}, 1000);

// Roda a cada 5 segundos (5000ms) para salvar o progresso em segundo plano
setInterval(() => {
    salvarJogo();
}, 5000);

// ==========================================
// 7. ATUALIZAÇÃO DA TELA
// ==========================================
function atualizarTela() {
    // Atualiza os números nos textos do HTML
    txtMoedas.innerText = moedas;
    txtPorClique.innerText = moedasPorClique;
    txtPorSegundo.innerText = moedasPorSegundo;
    txtCustoClique.innerText = custoClique;
    txtCustoAuto.innerText = custoAuto;

    // Desativa ou ativa os botões de compra dependendo do seu dinheiro
    btnUpgradeClique.disabled = (moedas < custoClique);
    btnUpgradeAuto.disabled = (moedas < custoAuto);
}

// ==========================================
// 8. INICIALIZAÇÃO AUTOMÁTICA
// ==========================================
carregarJogo();  // Tenta puxar o save antigo
atualizarTela(); // Garante que a tela comece com as informações certas
