// Grupo: 18, Número: 66567, Nome: Tiago Sun, PL: 21
// Grupo: 18, Número: 66585, Nome: Lecheng Guo, PL: 21
// Grupo: 18, Número: 66565, Nome: Xiaoqi Liu, PL: 21

const signup = document.getElementById("caixa-signup");
const message = document.getElementById("message");

function getPlayers() {
    return JSON.parse(localStorage.getItem("players")) || [];
}

function savePlayers(players) {
    localStorage.setItem("players", JSON.stringify(players));
}

signup.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("nome").value.trim().toLowerCase();
    const birthdate = document.getElementById("data-nasc").value;
    const avatar = document.getElementById("avatar").value;
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("senha").value.trim();

    const players = getPlayers();

    const playerExists = players.some(function(p) {
        return p.email === email || p.username === username;
    });

    if (playerExists) {
        message.textContent = "Já existe uma conta com esse username ou e-mail.";
        return;
    }

    const newPlayer = {
        username: username,
        email: email,
        password: password,
        birthdate: birthdate,
        avatar: avatar
    };

    players.push(newPlayer);
    savePlayers(players);

    console.log("Conta criada:", newPlayer);
    console.log("Todos os players:", getPlayers());

    message.textContent = "Registo efetuado.";
    signup.reset();
});