/* =========================================
   musica 音乐开关
   ========================================= */

// Grupo: 18, Número: 66567, Nome: Tiago Sun, PL: 21
// Grupo: 18, Número: 66585, Nome: Lecheng Guo, PL: 21
// Grupo: 18, Número: 66565, Nome: Xiaoqi Liu, PL: 21

document.addEventListener("DOMContentLoaded", function() {
    const musica=document.getElementById("musica-fundo")
    const btnMusica=document.getElementById("btn-musica")
    btnMusica.addEventListener("click",function(){
        if(musica.paused){
            musica.play();
            btnMusica.innerText="Musica:On"
        }else{
            musica.pause();
            btnMusica.innerText="Musica:Off"
        }
    });
});