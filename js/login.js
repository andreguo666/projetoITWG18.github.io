// Grupo: 18, Número: 66567, Nome: Tiago Sun, PL: 21
// Grupo: 18, Número: 66585, Nome: Lecheng Guo, PL: 21
// Grupo: 18, Número: 66565, Nome: Xiaoqi Liu, PL: 21

const loginForm=document.getElementById("caixa-login");
const message=document.getElementById("message");

function getPlayers(){
    return JSON.parse(localStorage.getItem("players"))||[];
}

function savePlayers(){
    localStorage.setItem("players",JSON.stringify(players));
}

loginForm.addEventListener("submit", fuction(event))
{
    event.preventDefault();

    const username=document.getElementById("username").value.toLowerCase();
    const password=document.getElementById("password").value;
    const players=getPlayers();
    const player=players.find(function(p){
        return p.username===username && p.password===password;
    });
    if (player){
        const loggedPlayer={
            username:player.username,

        };
        localStorage.setItem("loggedPlayer",JSON.stringify(loggedPlayer));
        message.textContent="logging you in"
        console.log("jogador authenticado:",loggedPlayer);
        window.location.href('jogo.html');
    }else{
        message.textContent="Email ou palavrapasse errado"
        window.location.href('login.html');
    }
    loginForm.reset();
    
};