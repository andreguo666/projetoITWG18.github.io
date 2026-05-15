/* =========================================
   jogo.js - 游戏Principal do Jogo
   ========================================= */

// Grupo: 18, Número: 66567, Nome: Tiago Sun, PL: 21
// Grupo: 18, Número: 66585, Nome: Lecheng Guo, PL: 21
// Grupo: 18, Número: 66565, Nome: Xiaoqi Liu, PL: 21

//执行 JS 代码
document.addEventListener("DOMContentLoaded", function() {
    
    // 找到要塞入宝石的盒子
    const tabuleiro = document.getElementById("tabuleiro-jogo");

    // 生成的宝石：8 x 8 = 64
    const totalGemas = 64;
    //几种宝石
    const tiposDeGemas = 5;

  
//加入shuffle按钮
function gerarTabuleiro() {
    // 先清空棋盘
    tabuleiro.innerHTML = "";
    //循环 (Ciclo for)自动重复 64 次
    for (let i = 0; i < totalGemas; i++) {
        
        //凭空创造一个新的div 
        const novaGema = document.createElement("div");

        // Math.random() 会生成 0.0000... 到 0.9999... 的小数
        // 乘以 5 变成 0.0... 到 4.999...
        // Math.floor() 会向下取整，去掉小数部分，变成 0 到 4，最后 + 1
        const tipoAleatorio = Math.floor(Math.random() * tiposDeGemas) + 1;

        //给这个新 div 贴上 CSS 类名
        // 第一个是通用的 'gema'，第二个是随机出来的 'tipo-X'
        novaGema.classList.add("gema", "tipo-" + tipoAleatorio);

        // 把新 div，塞进网页的空盒里
        tabuleiro.appendChild(novaGema);
    }
    console.log("Tabuleiro gerado com sucesso!");
}

gerarTabuleiro();


    // 计时器

    let tempo = 60;

    const timer = document.getElementById("timer");

    const countdown = setInterval(function () {

        tempo--;

        timer.textContent = tempo;

        // 最后10秒变红
        if (tempo <= 10) {
            timer.style.color = "red";
        }

        // 时间结束
        if (tempo <= 0) {

            clearInterval(countdown);

            alert("Fim do jogo!");

        }

    }, 1000);

    const botaoShuffle =
        document.getElementById("btn-shuffle");

botaoShuffle.addEventListener("click", function () {
    gerarTabuleiro();
});

});