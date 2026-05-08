/* =========================================
   footer.js 自动抓取footer内的当前年份
   ========================================= */

const anoAtual = new Date().getFullYear();
document.getElementById("ano").textContent = anoAtual;