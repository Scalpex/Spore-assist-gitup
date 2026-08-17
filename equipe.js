// Tableau pour stocker les joueurs
let players = [];

// Charger les joueurs sauvegardés depuis le localStorage au démarrage de la page
function loadPlayersFromLocalStorage() {
    const storedPlayers = localStorage.getItem('players');
    if (storedPlayers) {
        players = JSON.parse(storedPlayers);
        updatePlayerList(); // Met à jour l'affichage de la liste
    }
}

// Sauvegarder les joueurs dans le localStorage
function savePlayersToLocalStorage() {
    localStorage.setItem('players', JSON.stringify(players));
}

// Référence aux éléments du DOM
const playerNameInput = document.getElementById('playerName');
const addPlayerButton = document.getElementById('addPlayerButton');
const playerList = document.getElementById('playerList');
const playerCountDisplay = document.getElementById('playerCount');
const briefingButton = document.getElementById('briefingButton');

// Fonction pour ajouter un joueur
addPlayerButton.addEventListener('click', () => {
    const playerName = playerNameInput.value.trim();
    if (playerName) {
        const newPlayer = {
            name: playerName,
            rank: "",
            role: "Astronaute",
            genome: "",
            status: "sain",
            trace: "",
            voteCount: 0
            
        };
        players.push(newPlayer);
        playerNameInput.value = ''; // Efface l'input
        updatePlayerList();
        savePlayersToLocalStorage(); // Sauvegarde les joueurs après ajout
    }
});

// Fonction pour mettre à jour la liste des joueurs
function updatePlayerList() {
    playerList.innerHTML = ''; // Efface la liste actuelle
    players.forEach((player, index) => {
        const li = document.createElement('li');
        li.className = 'player-item';
        li.textContent = player.name;

        // Icône de suppression
        const deleteIcon = document.createElement('span');
        deleteIcon.textContent = '🗑️'; // Utilisation d'une icône de corbeille
        deleteIcon.className = 'delete-icon';
        deleteIcon.addEventListener('click', () => {
            players.splice(index, 1); // Supprime le joueur du tableau
            updatePlayerList(); // Met à jour l'affichage
            savePlayersToLocalStorage(); // Sauvegarde après suppression
        });

        li.appendChild(deleteIcon);
        playerList.appendChild(li);
    });
    playerCountDisplay.textContent = players.length; // Met à jour le compteur de joueurs
}

// Fonction pour réinitialiser les attributs par défaut de tous les joueurs
function resetPlayerAttributes() {
    players.forEach(player => {
        player.rank = "";
        player.role = "Astronaute";
        player.genome = "";
        player.status = "sain";
        player.trace = "";
        player.voteCount = 0;
        player.voteTarget = "";  
    });
    savePlayersToLocalStorage(); // Sauvegarde les joueurs réinitialisés
}

// Redirection vers la page Briefing
briefingButton.addEventListener('click', () => {
    // Stocker la valeur "1" dans le localStorage sous la clé "turn"
    localStorage.setItem('turn', '1');
    
    resetPlayerAttributes();

    // Sauvegarder les joueurs avant de rediriger

    savePlayersToLocalStorage();
    // Rediriger vers la page Briefing
    window.location.href = "briefing.html";
});

// Charger les joueurs depuis le localStorage lorsque la page se charge
loadPlayersFromLocalStorage();

function resetAllVotes() {
    players.forEach(player => {
        player.voteTarget = "";
        player.voteCount = "";
    });
    localStorage.setItem('players', JSON.stringify(players)); // Sauvegarder la mise à jour dans le stockage local si nécessaire
}

resetAllVotes();
