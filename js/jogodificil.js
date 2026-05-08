document.addEventListener("DOMContentLoaded", function() {
    
    // 找到要塞入宝石的盒子
    const tabuleiro = document.getElementById("tabuleiro-jogo");

    // 生成的宝石：8 x 8 = 64
    const totalGemas = 100;
    //几种宝石
    const tiposDeGemas = 5;

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
});