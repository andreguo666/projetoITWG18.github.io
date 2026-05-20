/* =========================================
   ranking.js - 排行榜读取与渲染逻辑
   ========================================= */

document.addEventListener("DOMContentLoaded", function() {
    
    const tbody = document.getElementById("corpo-ranking");
    
    //从浏览器仓库里把数据拿出来
    let rankingNormal = JSON.parse(localStorage.getItem("rankingNormal"));

    // 为了不让页面太难看
    if (!rankingNormal || rankingNormal.length === 0) {
        rankingNormal = [
            { nome: "Alien", pontuacao: 890 },
            { nome: "C.Ronaldo", pontuacao: 760 },
            { nome: "Pai natal", pontuacao: 500 }
        ];
        // 存进去做底子
        localStorage.setItem("rankingNormal", JSON.stringify(rankingNormal));
    }

    // 3. 开始把数据画到网页上 (Renderizar a Tabela)
    tbody.innerHTML = ""; // 先清空

    for (let i = 0; i < rankingNormal.length; i++) {
        
        // 我们只显示前 10 名 (Top 10)
        if (i >= 10) break; 

        let tr = document.createElement("tr");

        // 给前三名发奖牌特效类名
        if (i === 0) {
            tr.classList.add("ouro");
        } else if (i === 1) {
            tr.classList.add("prata");
        } else if (i === 2) {
            tr.classList.add("bronze");
        }

        // 把排名、名字、分数塞进格子里
        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${rankingNormal[i].nome}</td>
            <td>${rankingNormal[i].pontuacao}</td>
        `;

        tbody.appendChild(tr);
    }
});