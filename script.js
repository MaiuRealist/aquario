.peixe {
    position: absolute;
    width: var(--tamanho);
    height: auto;
    left: 0;
    top: 0;
    user-select: none;
    will-change: transform;
    filter: drop-shadow(0 3px 8px rgba(0, 0, 0, 0.45));
}

.bolha {
    position: absolute;
    bottom: -30px;
    width: var(--tamanho);
    height: var(--tamanho);
    border: 1px solid rgba(180, 230, 240, 0.35);
    border-radius: 50%;
    background: rgba(160, 220, 235, 0.025);
    animation: subir var(--duracao) linear infinite;
    animation-delay: var(--atraso);
}

@keyframes subir {
    0% {
        transform: translate3d(0, 0, 0);
        opacity: 0;
    }

    10% {
        opacity: 0.45;
    }

    50% {
        transform: translate3d(var(--desvio), -50vh, 0);
    }

    100% {
        transform: translate3d(calc(var(--desvio) * -0.5), -115vh, 0);
        opacity: 0;
    }
}

.fundo {
    position: absolute;
    inset: auto 0 0;
    height: 18vh;
    pointer-events: none;
}

.planta {
    position: absolute;
    bottom: 0;
    width: 7px;
    border-radius: 100% 0 100% 0;
    background: linear-gradient(to top, #092b25, #12483b);
    transform-origin: bottom;
    opacity: 0.8;
}

.planta::after {
    content: "";
    position: absolute;
    left: 5px;
    bottom: 35%;
    width: 6px;
    height: 55%;
    border-radius: 0 100% 0 100%;
    background: #0c392f;
    transform: rotate(-25deg);
}

.planta1 {
    left: 8%;
    height: 16vh;
    transform: rotate(-8deg);
}

.planta2 {
    left: 78%;
    height: 13vh;
    transform: rotate(10deg);
}

.planta3 {
    left: 90%;
    height: 19vh;
    transform: rotate(-12deg);
}

.pedra {
    position: absolute;
    bottom: -2vh;
    width: 12vw;
    height: 5vh;
    border-radius: 60% 50% 25% 25%;
    background: #101e22;
    box-shadow: inset 0 5px 8px rgba(100, 130, 130, 0.08);
}

.pedra1 {
    left: 22%;
}

.pedra2 {
    right: 15%;
    width: 8vw;
    height: 4vh;
}
