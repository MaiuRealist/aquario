const peixesContainer = document.getElementById("peixes");
const bolhasContainer = document.getElementById("bolhas");

/*
 * COLOQUE SUAS IMAGENS AQUI
 *
 * Exemplo:
 * const imagens = [
 *     "peixes/peixe1.png",
 *     "peixes/peixe2.png",
 *     "peixes/peixe3.png"
 * ];
 *
 * Enquanto você ainda não colocou as imagens, usamos peixes desenhados
 * em SVG para a página funcionar imediatamente.
 */

const imagens = [];

const cores = [
    ["#e7a23b", "#d76b35"],
    ["#5aa9d6", "#2d638b"],
    ["#d86b72", "#9d394c"],
    ["#c9b75c", "#77702f"],
    ["#8b78c7", "#54448c"]
];

const peixes = [];

function numero(min, max) {
    return Math.random() * (max - min) + min;
}

function peixeSvg(cor1, cor2) {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 90">
            <defs>
                <linearGradient id="g" x1="0" x2="1">
                    <stop offset="0" stop-color="${cor1}"/>
                    <stop offset="1" stop-color="${cor2}"/>
                </linearGradient>
            </defs>
            <path d="M30 45 Q5 12 5 8 Q35 15 52 30
                     C75 5 130 10 151 45
                     C130 80 75 85 52 60
                     Q35 75 5 82 Q5 78 30 45Z"
                  fill="url(#g)"/>
            <circle cx="125" cy="35" r="5" fill="#061018"/>
            <circle cx="127" cy="33" r="1.7" fill="white"/>
            <path d="M70 20 Q82 45 70 70"
                  fill="none" stroke="rgba(255,255,255,.25)" stroke-width="4"/>
        </svg>
    `;
}

function criarPeixe(i) {
    const elemento = document.createElement("div");
    elemento.className = "peixe";

    const tamanho = numero(55, 125);
    const escala = tamanho / 100;

    elemento.style.setProperty("--tamanho", `${tamanho}px`);

    if (imagens.length > 0) {
        const img = document.createElement("img");
        img.src = imagens[i % imagens.length];
        img.className = "peixe";
        img.alt = "";
        img.style.width = `${tamanho}px`;
        elemento.replaceWith(img);
        return prepararPeixe(img, escala);
    }

    const [cor1, cor2] = cores[i % cores.length];
    elemento.innerHTML = peixeSvg(cor1, cor2);

    peixesContainer.appendChild(elemento);
    return prepararPeixe(elemento, escala);
}

function prepararPeixe(elemento, escala) {
    const peixe = {
        el: elemento,
        x: numero(-200, window.innerWidth),
        y: numero(100, Math.max(150, window.innerHeight - 250)),
        vx: numero(0.25, 0.75),
        vy: numero(-0.12, 0.12),
        escala,
        direcao: 1,
        proximaMudanca: performance.now() + numero(1500, 5000)
    };

    peixes.push(peixe);
    return peixe;
}

function atualizarPeixe(peixe, agora) {
    if (agora > peixe.proximaMudanca) {
        peixe.vy = numero(-0.16, 0.16);
        peixe.vx = numero(0.25, 0.75);
        peixe.proximaMudanca = agora + numero(1800, 6000);
    }

    peixe.x += peixe.vx * peixe.direcao;
    peixe.y += peixe.vy;

    const largura = peixe.el.offsetWidth || 100;
    const altura = peixe.el.offsetHeight || 50;

    if (peixe.x > window.innerWidth + 100) {
        peixe.x = -largura - 100;
    }

    if (peixe.x < -largura - 100) {
        peixe.x = window.innerWidth + 100;
    }

    const topo = 70;
    const fundo = window.innerHeight - 180;

    if (peixe.y < topo) {
        peixe.y = topo;
        peixe.vy = Math.abs(peixe.vy);
    }

    if (peixe.y > fundo) {
        peixe.y = fundo;
        peixe.vy = -Math.abs(peixe.vy);
    }

    peixe.el.style.transform =
        `translate3d(${peixe.x}px, ${peixe.y}px, 0) scaleX(${peixe.direcao}) scale(${peixe.escala})`;
}

function animar(agora) {
    for (const peixe of peixes) {
        atualizarPeixe(peixe, agora);
    }

    requestAnimationFrame(animar);
}

function criarBolhas() {
    for (let i = 0; i < 22; i++) {
        const bolha = document.createElement("div");
        bolha.className = "bolha";

        const tamanho = numero(3, 11);

        bolha.style.left = `${numero(2, 98)}%`;
        bolha.style.setProperty("--tamanho", `${tamanho}px`);
        bolha.style.setProperty("--duracao", `${numero(8, 20)}s`);
        bolha.style.setProperty("--atraso", `${numero(-20, 0)}s`);
        bolha.style.setProperty("--desvio", `${numero(-100, 100)}px`);

        bolhasContainer.appendChild(bolha);
    }
}

function iniciar() {
    // Quantidade de peixes.
    for (let i = 0; i < 9; i++) {
        criarPeixe(i);
    }

    criarBolhas();
    requestAnimationFrame(animar);
}

window.addEventListener("resize", () => {
    for (const peixe of peixes) {
        peixe.y = Math.min(peixe.y, window.innerHeight - 180);
    }
});

iniciar();
