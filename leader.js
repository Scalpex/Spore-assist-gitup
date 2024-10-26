// Charger la variable "turn" depuis le localStorage et l'afficher
document.getElementById('turnDisplay').textContent = localStorage.getItem('turn') || '1';

// Charger les joueurs depuis le localStorage
let players = JSON.parse(localStorage.getItem('players')) || [];

// Référence aux éléments du DOM
const leaderPlayerList = document.getElementById('leaderPlayerList');
const exitButton = document.getElementById('exitButton');
const validateButton = document.getElementById('validateNightButton');

// Fonction pour mettre à jour la liste des joueurs sous forme de boutons en 2 colonnes pour la page leader
function updateLeaderPlayerList() {
    leaderPlayerList.innerHTML = '';
    players.forEach((player, index) => {
        const button = document.createElement('button');
        button.className = 'player-item';
        button.textContent = player.name;

        // Marquer le leader avec une étoile de chaque côté du nom
        if (player.rank === '⭐') {
            button.textContent = `⭐ ${player.name} ⭐`;
        }

        // Ajouter un événement pour choisir le leader
        button.addEventListener('click', () => {
            setLeader(index);
        });

        leaderPlayerList.appendChild(button);
    });
}

// Fonction pour définir le leader
function setLeader(index) {
    players.forEach((player, idx) => {
        if (idx === index) {
            player.rank = '⭐'; // Définir le joueur comme leader
        } else {
            player.rank = ''; // Enlever le statut de leader des autres
        }
    });
    savePlayersToLocalStorage();
    updateLeaderPlayerList();
}

// Sauvegarder les joueurs dans le localStorage
function savePlayersToLocalStorage() {
    localStorage.setItem('players', JSON.stringify(players));
}

// Réinitialiser la variable "turn" et rediriger vers la page équipe
exitButton.addEventListener('click', () => {
    localStorage.setItem('turn', '1');
    window.location.href = 'equipe.html';
});


// Vérification de la valeur de "turn" et redirection en fonction
validateButton.addEventListener('click', () => {
    const turn = localStorage.getItem('turn');
    
    if (turn === "1") {
        window.location.href = "at_mut.html"; // Redirection vers la page "at_mut"
    } else {
        window.location.href = "para.html"; // Redirection vers la page "para"
    }
});


// Charger la liste des joueurs au démarrage de la page leader
updateLeaderPlayerList();

