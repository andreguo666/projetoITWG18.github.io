// Grupo: 18, Número: 66567, Nome: Tiago Sun, PL: 21
// Grupo: 18, Número: 66585, Nome: Lecheng Guo, PL: 21
// Grupo: 18, Número: 66565, Nome: Xiaoqi Liu, PL: 21

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

function getPlayers() {
    return JSON.parse(localStorage.getItem("players")) || [];
}

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    const players = getPlayers();

    console.log("Username escrito:", username);
    console.log("Password escrita:", password);
    console.log("Players guardados:", players);

    const player = players.find(function(p) {
        return p.username === username && p.password === password;
    });

    console.log("Player encontrado:", player);

    if (player) {
        localStorage.setItem("loggedPlayer", JSON.stringify(player));
        window.location.href = "escolhermodo.html";
    } else {
        message.textContent = "Username ou palavra-passe incorretos.";
        localStorage.removeItem("loggedPlayer");
    }

    loginForm.reset();
});