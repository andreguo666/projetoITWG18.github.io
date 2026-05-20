// Grupo: 18, Número: 66567, Nome: Tiago Sun, PL: 21
// Grupo: 18, Número: 66585, Nome: Lecheng Guo, PL: 21
// Grupo: 18, Número: 66565, Nome: Xiaoqi Liu, PL: 21

const signup=document.getElementById("caixa-signup");
const message=document.getElementById("message");

function getPlayers(){
    return JSON.parse(localStorage.getItem("players"))||[];
}

function savePlayers(){
    localStorage.setItem("players",JSON.stringify(players));
}

signup.addEventListener("submit",function(event){
    event.preventDefault();
    const username=document.getElementById("nome").value.toLowerCase;
    const password=document.getElementById("password").value;
    const email=document.getElementById("email").value.toLowerCase;
    const players=getPlayers();
    const playerExists= players.some(function(p){
        return p.email===email;
    })
    if (playerExists){
        message.textContent="ja existe";
        return;
    }
    const newPlayer={
        email=email,
        password=password,
        username=username,
    }
    players.push(newPlayer);
    savePlayers(players);
    message.textContent="registo effectuado";
    signup.reset();
})