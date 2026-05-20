/* =========================================
   jogo.js - 游戏Principal do Jogo
   ========================================= */

// Grupo: 18, Número: 66567, Nome: Tiago Sun, PL: 21
// Grupo: 18, Número: 66585, Nome: Lecheng Guo, PL: 21
// Grupo: 18, Número: 66565, Nome: Xiaoqi Liu, PL: 21

// 全局变量设置
const linhas = 8;
const colunas = 8;
const tiposDeGemas = 5;

let matriz = []; // 真正的游戏数据在这里
let linhaSelecionada = -1; //被选中的第一颗宝石的行 (-1代表没选)
let colunaSelecionada = -1; //被选中的第一颗宝石的列
let bloqueado = true;
let pontuacaoAtual = 0;

document.addEventListener("DOMContentLoaded", function() {
});

// 1. 游戏初始化函数
function iniciarJogo() {
    // 生成初始数组（带防连消逻辑）
    //一行一行地生成
    for (let l = 0; l < linhas; l++) {
        matriz[l] = [];// 每到新的一行，就开辟一个空数组
        //内层循环一列一列地生成
        for (let c = 0; c < colunas; c++) {
            let tipoAleatorio;
            let temMatch;//记录是否发生了连消冲突
            //开启 do...while 循环：先抽一次，如果违规，就一直重抽，直到合格为止
            do {
                // 随机抽一个种类 (1 到 5)
                tipoAleatorio = Math.floor(Math.random() * tiposDeGemas) + 1;
                // 检查左边:
                // 条件：当前必须在第 3 列(索引2)或以后，且左边第一格、左边第二格都和现在抽的颜色一样
                let matchHorizontal = (c >= 2) && (matriz[l][c-1] === tipoAleatorio) && (matriz[l][c-2] === tipoAleatorio);
                // 检查上边:
                // 条件：当前必须在第 3 行(索引2)或以后，且上面第一格、上面第二格都和现在抽的颜色一样
                let matchVertical = (l >= 2) && (matriz[l-1][c] === tipoAleatorio) && (matriz[l-2][c] === tipoAleatorio);
                // 如果横向或纵向有一个触发了连消，temMatch 就会变成 true
                temMatch = matchHorizontal || matchVertical;
            } while (temMatch);// 只要有冲突 (true)，就回去重新执行大括号里的随机抽取
            
            matriz[l][c] = tipoAleatorio;
        }
    }
    // 数据生成完毕，开始渲染画面
    desenharTabuleiro(); 
}

// 渲染引擎
// 根据 matriz 的数据，在网页上画出宝石
function desenharTabuleiro() {
    const tabuleiro = document.getElementById("tabuleiro-jogo");
    tabuleiro.innerHTML = ""; // 清空旧画面

    for (let l = 0; l < linhas; l++) {
        for (let c = 0; c < colunas; c++) {
            const novaGema = document.createElement("div");
            
            // 如果这个位置的数字是 0，说明被消除了，暂时画个空的
            if (matriz[l][c] === 0) {
                novaGema.classList.add("gema", "vazia");
            } else {
                novaGema.classList.add("gema", "tipo-" + matriz[l][c]);
            }

            // 如果这颗宝石刚好是刚才被选中的那一颗，给它加个高亮边框！
            if (l === linhaSelecionada && c === colunaSelecionada) {
                novaGema.classList.add("selecionada"); 
            }

            //给每个生成的宝石绑定点击事件
            novaGema.addEventListener("click", function() {
                clicarGema(l, c); // 告诉程序我点了哪一行哪一列
            });

            tabuleiro.appendChild(novaGema);
        }
    }
}

// 玩家交互逻辑
function clicarGema(l, c) {
    // 如果棋盘被锁定了（正在处理消除或掉落），无视点击
    if (bloqueado) return;

    if (linhaSelecionada === -1 && colunaSelecionada === -1) {
        linhaSelecionada = l;
        colunaSelecionada = c;
        desenharTabuleiro();
    } 
    else {
        let distanciaLinha = Math.abs(l - linhaSelecionada);
        let distanciaColuna = Math.abs(c - colunaSelecionada);
        let ehAdjacente = (distanciaLinha + distanciaColuna === 1);

        if (ehAdjacente) {
            bloqueado = true; //上锁开始处理动画和逻辑

            // 记住这次交换的两个坐标
            let l1 = linhaSelecionada;
            let c1 = colunaSelecionada;
            let l2 = l;
            let c2 = c;

            // 第一步：先在视觉上把它们换过去
            let temp = matriz[l1][c1];
            matriz[l1][c1] = matriz[l2][c2];
            matriz[l2][c2] = temp;

            linhaSelecionada = -1;
            colunaSelecionada = -1;
            desenharTabuleiro();

            // 第二步：给玩家 0.3 秒的时间看清楚交换动作，然后再做裁判
            setTimeout(function() {
                
                let matches = encontrarMatches(); // 去扫描全盘

                if (matches.length > 0) {
                    // 匹配成功进入消除流程
                    processarEliminacao(matches);
                } else {
                    // 匹配失败把数据换回来
                    let tempVolta = matriz[l1][c1];
                    matriz[l1][c1] = matriz[l2][c2];
                    matriz[l2][c2] = tempVolta;
                    
                    desenharTabuleiro(); // 重新画一次，玩家会看到宝石退回去了
                    bloqueado = false;   // 解锁，让玩家重新思考
                }
            }, 300); // 300毫秒延迟

        } else {
            linhaSelecionada = -1;
            colunaSelecionada = -1;
            desenharTabuleiro();
        }
    }
}

//开始游戏
document.addEventListener("DOMContentLoaded", function() {
    iniciarJogo(); // 依然自动生成棋盘
    
    // 找到始按钮
    const btnComecar = document.getElementById("btn-comecar");
    const btnReiniciar = document.getElementById("btn-reiniciar");

    // 给开始按钮安装点击事件 
    btnComecar.addEventListener("click", function() {
        
        iniciarTemporizador(); // 点击后，正式启动计时器
        bloqueado = false;
        //立刻把按钮禁用掉
        btnComecar.disabled = true; 
        btnComecar.style.opacity = "0.5"; // 视觉上让按钮变灰
        btnComecar.innerText = "Em Jogo..."; // 把文字改成“游戏中”
        btnComecar.style.cursor = "not-allowed"; // 鼠标放上去变成禁止符号
    });
    btnReiniciar.addEventListener("click", function() {
        reiniciarJogoCompleto(btnComecar, btnReiniciar);
    });
});

//计时器
function iniciarTemporizador() {
    let tempo = 60; 
    const timer = document.getElementById("timer");
// setInterval 会每隔 1000 毫秒（1秒）执行一次大括号里的代码
    const countdown = setInterval(function () {
        tempo--;
        timer.textContent = tempo;
// 最后 10 秒文字变红警告
        if (tempo <= 10) {
            timer.style.color = "red";
        }

// 时间结束
        if (tempo <= 0) {
            clearInterval(countdown); // 停止倒数
            bloqueado = true; //锁死棋盘
            document.getElementById("btn-reiniciar").style.display = "block"; // 显示重新开始按钮
            
            // 延迟 100 毫秒，让网页把时间变成 0，然后再弹窗
            setTimeout(function() {
                // 弹窗问玩家名字
                let nomeJogador = prompt("⏱️ Tempo esgotado! Conseguiste " + pontuacaoAtual + " pontos.\nQual é o teu nome para o Ranking?");
                
                // 如果玩家没填或者点了取消，就叫他 "Anónimo"
                if (!nomeJogador || nomeJogador.trim() === "") {
                    nomeJogador = "Anónimo";
                }

                // 呼叫我们的存储引擎，把数据存起来
                salvarPontuacao(nomeJogador, pontuacaoAtual);

                alert("Pontuação guardada! Vai ao Ranking para ver a tua posição.");
            }, 100);
        }
    }, 1000); //用来关闭 setInterval (1秒跑一次的设定)
} //用来彻底关闭 iniciarTemporizador 函数


/* =========================================
   消除与重力引擎
   ========================================= */

// 1. 扫描全盘，寻找所有连在一起的宝石
function encontrarMatches() {
    let paraEliminar = [];

    // 检查横向
    for (let l = 0; l < linhas; l++) {
        for (let c = 0; c < colunas - 2; c++) {
            let tipo = matriz[l][c];
            if (tipo !== 0 && tipo === matriz[l][c+1] && tipo === matriz[l][c+2]) {
                paraEliminar.push({l: l, c: c});
                paraEliminar.push({l: l, c: c+1});
                paraEliminar.push({l: l, c: c+2});
            }
        }
    }

    // 检查纵向
    for (let c = 0; c < colunas; c++) {
        for (let l = 0; l < linhas - 2; l++) {
            let tipo = matriz[l][c];
            if (tipo !== 0 && tipo === matriz[l+1][c] && tipo === matriz[l+2][c]) {
                paraEliminar.push({l: l, c: c});
                paraEliminar.push({l: l+1, c: c});
                paraEliminar.push({l: l+2, c: c});
            }
        }
    }
    return paraEliminar;
}


// 2. 把匹配成功的宝石变成空洞 (0)，并计算分数
function processarEliminacao(matches) {
    
    // 专门用来记录这一次真正消除了多少颗宝石 (这是公式里的 'n')
    let n = 0; 

    // 遍历所有被判定为要消除的坐标
    for (let i = 0; i < matches.length; i++) {
        let l = matches[i].l;
        let c = matches[i].c;

        // 只有当这颗宝石在矩阵里还不是 0 的时候，我们才算它是一个有效的消除。
        if (matriz[l][c] !== 0) {
            matriz[l][c] = 0; // 变成空洞
            n++; // 消除数量 +1
        }
    }

    // 计分公式: 10 * (n - 2)
    if (n >= 3) {
        // 计算这次消除获得的分数
        let pontosGanhos = 10 * (n - 2);
        
        // 加到全局总分里
        pontuacaoAtual += pontosGanhos; 
        
        // 强行修改网页上的文字
        document.getElementById("pontuacao-jogo").innerText = pontuacaoAtual;
        
        // 在控制台打印出来
        console.log("eliminou" + n + " gemas！Pontuação: " + pontosGanhos + " | Total: " + pontuacaoAtual);
    }

    desenharTabuleiro();

    // 等待 0.3 秒，让玩家看到空洞，然后再让上面的宝石掉下来
    setTimeout(function() {
        aplicarGravidade();
    }, 300);
}

// 3. 重力下落与生成新宝石
function aplicarGravidade() {
    for (let c = 0; c < colunas; c++) {
        let novaColuna = [];
        
        // 从下往上扫描，把不是 0 的存活宝石收集起来
        for (let l = linhas - 1; l >= 0; l--) {
            if (matriz[l][c] !== 0) {
                novaColuna.push(matriz[l][c]);
            }
        }
        
        // 顶部的空缺，随机生成新宝石补齐
        while (novaColuna.length < linhas) {
            novaColuna.push(Math.floor(Math.random() * tiposDeGemas) + 1);
        }
        
        // 把排好序（有重力效果）的数据放回矩阵里
        for (let l = linhas - 1; l >= 0; l--) {
            matriz[l][c] = novaColuna[linhas - 1 - l];
        }
    }
    
    desenharTabuleiro();

    // 4连环消机制 新掉下来的宝石有可能正好凑成了三个！
    setTimeout(function() {
        let novosMatches = encontrarMatches();
        if (novosMatches.length > 0) {
            processarEliminacao(novosMatches); // 递归调用：再消一次
        } else {
            bloqueado = false; //没有任何可以消除的了，彻底解锁棋盘！
        }
    }, 300);
}

//5重置整个游戏状态
function reiniciarJogoCompleto(btnComecar, btnReiniciar) {
    //数据全面清零 
    pontuacaoAtual = 0;
    linhaSelecionada = -1;
    colunaSelecionada = -1;
    bloqueado = true; //重新开局前，棋盘再次锁定

    //更新网页上的文字显示
    document.getElementById("pontuacao-jogo").innerText = "0";
    document.getElementById("timer").innerText = "60";
    document.getElementById("timer").style.color = ""; // 恢复计时器原本的颜色

    //重新调用初始函数，洗牌生成全新的防连消棋盘
    iniciarJogo();

    // 恢复“开始按钮”的精神状态
    btnComecar.disabled = false;
    btnComecar.style.opacity = "1";
    btnComecar.innerText = "Começar Jogo";
    btnComecar.style.cursor = "pointer";

    //重新把 (重新开始按钮）藏起来
    btnReiniciar.style.display = "none";
    
    console.log("jogo ja reniciou");
}

// 6. 保存分数到浏览器的本地存储 (LocalStorage)
function salvarPontuacao(nome, pontuacao) {
    //从仓库拿数据
    let rankingNormal = JSON.parse(localStorage.getItem("rankingNormal")) || [];

    //在数组里寻找有没有一模一样的名字
    // findIndex 会挨个检查，如果找到了，就返回那个人在队伍里的位置 (0, 1, 2...)
    // 如果没找到，它会极其固定地返回 -1
    let indiceEncontrado = rankingNormal.findIndex(function(jogador) {
        return jogador.nome === nome; 
    });

    //智能分流处理逻辑
    if (indiceEncontrado !== -1) {
        // 情况 1：找到了同名玩家！
        // 检查他这次的分数是不是比以前的更高
        if (pontuacao > rankingNormal[indiceEncontrado].pontuacao) {
            rankingNormal[indiceEncontrado].pontuacao = pontuacao; // 强行覆盖旧分数
            console.log("🎉 Novo Recorde [" + nome + "] ponto maximo");
        } else {
            console.log("📉 jogador [" + nome + "] nao ultrapassou seu maximo");
        }
    } else {
        // 情况 2：返回了 -1，说明查无此人
        // 直接作为新数据塞进队伍里
        rankingNormal.push({
            nome: nome,
            pontuacao: pontuacao
        });
        console.log("👋 benvido [" + nome + "] entrar ranking！");
    }

    //重新排序
    rankingNormal.sort(function(a, b) {
        return b.pontuacao - a.pontuacao;
    });

    // 存回浏览器的仓库里
    localStorage.setItem("rankingNormal", JSON.stringify(rankingNormal));
}