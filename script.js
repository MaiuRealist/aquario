const peixesContainer = document.getElementById("peixes");
const bolhasContainer = document.getElementById("bolhas");

const peixes = [];

/*
 * PEIXES FEITOS 100% COM CÓDIGO.
 *
 * Não precisamos de PNGs. Cada peixe é um SVG criado pelo JavaScript.
 * Você pode alterar as cores no array CORES.
 */

const CORES = [
    ["#f6a623", "#d95d27"],
    ["#4db6d8", "#246a91"],
    ["#e66b78", "#9e3345"],
    ["#d8c34d", "#777022"],
    ["#a47bd1", "#65479b"],
    ["#62c48c", "#27704b"]
];

function numero(min, max) {
    return Math.random() * (max - min) + min;
}

function peixeSVG(cor1, cor2) {
    const id = "grad" + Math.random().toString(36).slice(2);

    return `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 220 110"
            aria-hidden="true"
        >
            <defs>
                <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="${cor1}"/>
                    <stop offset="100%" stop-color="${cor2}"/>
                </linearGradient>
            </defs>

            <!-- cauda -->
            <path
                d="M55 55
                   C31 28 10 22 5 18
                   C12 38 13 48 25 55
                   C13 62 12 72 5 92
                   C28 86 43 76 55 55Z"
                fill="${cor1}"
            />

            <!-- corpo -->
            <ellipse
                cx="112"
                cy="55"
                rx="72"
                ry="38"
                fill="url(#${id})"
            />

            <!-- nadadeira superior -->
            <path
                d="M90 25 Q105 3 126 17 L117 37Z"
                fill="${cor2}"
                opacity="0.9"
            />

            <!-- nadadeira inferior -->
            <path
                d="M94 82 Q110 105 128 91 L117 73Z"
                fill="${cor2}"
                opacity="0.9"
            />

            <!-- listrinha -->
            <path
                d="M82 23 Q98 55 82 87"
                fill="none"
                stroke="rgba(255,255,255,0.28)"
                stroke-width="5"
                stroke-linecap="round"
            />

            <!-- olho -->
            <circle cx="158" cy="43" r="6" fill="#071017"/>
            <circle cx="160" cy="41" r="2" fill="#fff"/>

            <!-- boca -->
            <path
                d="M176 57 Q183 61 188 56"
                fill="none"
                stroke="#071017"
                stroke-width="2.5"
                stroke-linecap="round"
            />
        </svg>
    `;
}

function criarPeixe(i) {
    const elemento = document.createElement("div");
    elemento.className = "peixe";

    const tamanho = numero(55, 135);

    elemento.style.setProperty("--tamanho", `${tamanho}px`);

    const [cor1, cor2] = CORES[i % CORES.length];
    elemento.innerHTML = peixeSVG(cor1, cor2);

    peixesContainer.appendChild(elemento);

    peixes.push({
        el: elemento,

        // Começa em posições diferentes.
        x: numero(-150, window.innerWidth + 100),
        y: numero(80, Math.max(120, window.innerHeight - 120)),

        // Velocidade individual.
        velocidade: numero(0.22, 0.65),

        // Pequena movimentação vertical.
        subida: numero(-0.12, 0.12),

        // 1 = direita | -1 = esquerda
        direcao: Math.random() > 0.5 ? 1 : -1,

        // Faz o peixe mudar suavemente de comportamento.
        proximaMudanca: performance.now() + numero(2000, 7000),

        // Mantém o peixe em uma profundidade diferente.
        escala: numero(0.75, 1.15)
    });
}

function atualizarPeixe(peixe, agora) {
    if (agora > peixe.proximaMudanca) {
        peixe.velocidade = numero(0.22, 0.65);
        peixe.subida = numero(-0.14, 0.14);

        peixe.proximaMudanca = agora + numero(2500, 7500);
    }

    peixe.x += peixe.velocidade * peixe.direcao;
    peixe.y += peixe.subida;

    // Limites verticais.
    const topo = 60;
    const fundo = window.innerHeight - 70;

    if (peixe.y < topo) {
        peixe.y = topo;
        peixe.subida = Math.abs(peixe.subida);
    }

    if (peixe.y > fundo) {
        peixe.y = fundo;
        peixe.subida = -Math.abs(peixe.subida);
    }

    // Quando sai por uma lateral, reaparece na outra.
    const largura = 160;

    if (peixe.direcao === 1 && peixe.x > window.innerWidth + largura) {
        peixe.x = -largura;
    }

    if (peixe.direcao === -1 && peixe.x < -largura) {
        peixe.x = window.innerWidth + largura;
    }

    peixe.el.style.transform =
        `translate3d(${peixe.x}px, ${peixe.y}px, 0)
         scaleX(${peixe.direcao})
         scale(${peixe.escala})`;
}

function animar(agora) {
    for (const peixe of peixes) {
        atualizarPeixe(peixe, agora);
    }

    requestAnimationFrame(animar);
}

function criarBolhas() {
    for (let i = 0; i < 18; i++) {
        const bolha = document.createElement("div");

        bolha.className = "bolha";

        const tamanho = numero(3, 9);

        bolha.style.left = `${numero(3, 97)}%`;
        bolha.style.setProperty("--tamanho", `${tamanho}px`);
        bolha.style.setProperty("--duracao", `${numero(10, 22)}s`);
        bolha.style.setProperty("--atraso", `${numero(-22, 0)}s`);
        bolha.style.setProperty("--desvio", `${numero(-80, 80)}px`);

        bolhasContainer.appendChild(bolha);
    }
}

function iniciar() {
    // Quantidade de peixes.
    for (let i = 0; i < 10; i++) {
        criarPeixe(i);
    }

    criarBolhas();

    requestAnimationFrame(animar);
}

window.addEventListener("resize", () => {
    for (const peixe of peixes) {
        peixe.y = Math.min(peixe.y, window.innerHeight - 70);
    }
});

iniciar();
