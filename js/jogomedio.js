/* =========================================
   jogomedio.js - Zen Garden Mode
   ========================================= */

// Grupo: 18, Número: 66567, Nome: Tiago Sun, PL: 21
// Grupo: 18, Número: 66585, Nome: Lecheng Guo, PL: 21
// Grupo: 18, Número: 66565, Nome: Xiaoqi Liu, PL: 21


/* =========================================
   Configuração Global
========================================= */

const linhas = 9;
const colunas = 9;
const tiposDeGemas = 5;

let matriz = [];

let linhaSelecionada = -1;
let colunaSelecionada = -1;

let bloqueado = true;

let pontuacaoAtual = 0;


/* =========================================
   Inicialização
========================================= */

document.addEventListener("DOMContentLoaded", function() {

    iniciarJogo();


    alert("🌸 Bem-vindo ao Zen Garden Mode.\nRelaxa e aproveita o jogo.");

    const btnComecar =
        document.getElementById("btn-comecar");

    const btnEmbaralhar =
        document.getElementById("btn-embaralhar");



    /* =========================================
       Botão Começar
    ========================================= */

btnComecar.addEventListener("click", function() {
    // 第一次点击：开始游戏
    if (bloqueado === true) {
        bloqueado = false;
        btnComecar.innerText = "Terminar Jogo";
        btnComecar.style.backgroundColor = "#000";
    }

    // 第二次点击：结束游戏
    else {
        bloqueado = true;
        alert(
            "🌸 Sessão terminada.\nPontuação final: "
            + pontuacaoAtual
        );
        location.reload();
    }
});



    /* =========================================
       Shuffle (Sem Penalização)
    ========================================= */

    btnEmbaralhar.addEventListener("click", function() {

        if (bloqueado) {
            return;
        }

        iniciarJogo();
        linhaSelecionada = -1;
        colunaSelecionada = -1;
        console.log("🌸 Zen Shuffle!");
    });
});

/* =========================================
   Gerar Tabuleiro
========================================= */

function iniciarJogo() {

    for (let l = 0; l < linhas; l++) {

        matriz[l] = [];
        for (let c = 0; c < colunas; c++) {
            let tipoAleatorio;
            let temMatch;

            do {
                tipoAleatorio =
                    Math.floor(Math.random() * tiposDeGemas) + 1;

                let matchHorizontal =
                    (c >= 2) &&
                    (matriz[l][c-1] === tipoAleatorio) &&
                    (matriz[l][c-2] === tipoAleatorio);

                let matchVertical =
                    (l >= 2) &&
                    (matriz[l-1][c] === tipoAleatorio) &&
                    (matriz[l-2][c] === tipoAleatorio);

                temMatch =
                    matchHorizontal || matchVertical;

            } while (temMatch);

            matriz[l][c] = tipoAleatorio;
        }
    }

    desenharTabuleiro();
}


/* =========================================
   Renderização
========================================= */

function desenharTabuleiro() {

    const tabuleiro =
        document.getElementById("tabuleiro-jogo");

    tabuleiro.innerHTML = "";

    for (let l = 0; l < linhas; l++) {
        for (let c = 0; c < colunas; c++) {

            const novaGema =
                document.createElement("div");

            if (matriz[l][c] === 0) {

                novaGema.classList.add("gema", "vazia");

            } else {

                novaGema.classList.add(
                    "gema",
                    "tipo-" + matriz[l][c]
                );
            }


            if (
                l === linhaSelecionada &&
                c === colunaSelecionada
            ) {

                novaGema.classList.add("selecionada");
            }


            novaGema.addEventListener("click", function() {

                clicarGema(l, c);

            });

            tabuleiro.appendChild(novaGema);
        }
    }
}


/* =========================================
   Clique nas Gemas
========================================= */

function clicarGema(l, c) {

    if (bloqueado) return;

    if (
        linhaSelecionada === -1 &&
        colunaSelecionada === -1
    ) {

        linhaSelecionada = l;
        colunaSelecionada = c;

        desenharTabuleiro();

    } else {

        let distanciaLinha =
            Math.abs(l - linhaSelecionada);

        let distanciaColuna =
            Math.abs(c - colunaSelecionada);

        let ehAdjacente =
            (distanciaLinha + distanciaColuna === 1);


        if (ehAdjacente) {

            bloqueado = true;

            let l1 = linhaSelecionada;
            let c1 = colunaSelecionada;

            let l2 = l;
            let c2 = c;


            let temp = matriz[l1][c1];

            matriz[l1][c1] = matriz[l2][c2];

            matriz[l2][c2] = temp;


            linhaSelecionada = -1;
            colunaSelecionada = -1;

            desenharTabuleiro();


            setTimeout(function() {

                let matches = encontrarMatches();

                if (matches.length > 0) {

                    processarEliminacao(matches);

                } else {

                    let tempVolta = matriz[l1][c1];

                    matriz[l1][c1] = matriz[l2][c2];

                    matriz[l2][c2] = tempVolta;

                    desenharTabuleiro();

                    bloqueado = false;
                }

            }, 300);

        } else {

            linhaSelecionada = -1;
            colunaSelecionada = -1;

            desenharTabuleiro();
        }
    }
}


/* =========================================
   Encontrar Matches
========================================= */

function encontrarMatches() {

    let paraEliminar = [];


    // Horizontal

    for (let l = 0; l < linhas; l++) {
        for (let c = 0; c < colunas - 2; c++) {

            let tipo = matriz[l][c];

            if (
                tipo !== 0 &&
                tipo === matriz[l][c+1] &&
                tipo === matriz[l][c+2]
            ) {

                paraEliminar.push({l:l, c:c});
                paraEliminar.push({l:l, c:c+1});
                paraEliminar.push({l:l, c:c+2});
            }
        }
    }


    // Vertical

    for (let c = 0; c < colunas; c++) {

        for (let l = 0; l < linhas - 2; l++) {

            let tipo = matriz[l][c];

            if (
                tipo !== 0 &&
                tipo === matriz[l+1][c] &&
                tipo === matriz[l+2][c]
            ) {

                paraEliminar.push({l:l, c:c});
                paraEliminar.push({l:l+1, c:c});
                paraEliminar.push({l:l+2, c:c});
            }
        }
    }

    return paraEliminar;
}


/* =========================================
   Eliminação
========================================= */

function processarEliminacao(matches) {

    let n = 0;

    for (let i = 0; i < matches.length; i++) {

        let l = matches[i].l;
        let c = matches[i].c;

        if (matriz[l][c] !== 0) {

            matriz[l][c] = 0;

            n++;
        }
    }


    if (n >= 3) {

        let pontosGanhos = 10 * (n - 2);

        pontuacaoAtual += pontosGanhos;

        document.getElementById(
            "pontuacao-jogo"
        ).innerText = pontuacaoAtual;


        // Zen visual effect

        if (pontuacaoAtual >= 100) {

            document.body.style.filter =
                "brightness(1.05)";
        }
    }

    desenharTabuleiro();

    setTimeout(function() {

        aplicarGravidade();

    }, 300);
}


/* =========================================
   Gravidade
========================================= */

function aplicarGravidade() {

    for (let c = 0; c < colunas; c++) {

        let novaColuna = [];


        for (let l = linhas - 1; l >= 0; l--) {

            if (matriz[l][c] !== 0) {

                novaColuna.push(matriz[l][c]);
            }
        }


        while (novaColuna.length < linhas) {

            novaColuna.push(
                Math.floor(Math.random() * tiposDeGemas) + 1
            );
        }


        for (let l = linhas - 1; l >= 0; l--) {

            matriz[l][c] =
                novaColuna[linhas - 1 - l];
        }
    }

    desenharTabuleiro();


    setTimeout(function() {

        let novosMatches =
            encontrarMatches();

        if (novosMatches.length > 0) {

            processarEliminacao(novosMatches);

        } else {

            bloqueado = false;
        }

    }, 300);
}