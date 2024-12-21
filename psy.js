// Fonction pour afficher le compteur de nuit depuis le localStorage
const turnDisplay = document.getElementById('turnDisplay');
turnDisplay.textContent = localStorage.getItem('turn');

// Récupérer la liste des joueurs du localStorage
let players = JSON.parse(localStorage.getItem('players')) || [];

// Afficher la liste des joueurs dans des boutons
const buttonContainer = document.querySelector('.button-container');
let selectedPlayerIndex = null;

// Fonction pour afficher la phrase conditionnelle dans le statusMessage
function updatestatusMessage() {
    const statusMessageDiv = document.getElementById('statusMessage');
    const psy = players.find(player => player.role === 'psy');
    const selectedPlayer = players[selectedPlayerIndex];

    if (psy.status === 'para') {
        statusMessageDiv.innerHTML = `(Le psychologue est <span class="status-paralyzed">paralysé</span>.)`;
    } else if (psy.status === 'mut') {
        statusMessageDiv.innerHTML = `(Le psychologue est <span class="status-mutated">muté</span>.)`;
    } else if (psy.status === 'mort') {
        statusMessageDiv.innerHTML = `(Le psychologue est <span class="status-dead">mort</span>.)`;
    } else if (psy.status === 'sain') {
        if (selectedPlayerIndex === null) {
            statusMessageDiv.innerHTML = '(Sélectionnez un joueur)';
        } else if (selectedPlayer) {
            if (selectedPlayer.status === 'mut') {
                statusMessageDiv.innerHTML = `(${selectedPlayer.name} est un(e) <span class="status-mutated">mutant(e)</span>.)`;
            } else {
                statusMessageDiv.innerHTML = `(${selectedPlayer.name} n'est PAS un(e) mutant(e).)`;
            }
        }
    }
}

// Fonction pour afficher la liste des boutons des joueurs
function updatePlayerButtons() {
    buttonContainer.innerHTML = ''; // Vider la liste actuelle
    const psy = players.find(player => player.role === 'psy');

    players.forEach((player, index) => {
        const button = document.createElement('button');
        button.classList.add('player-button');
        button.textContent = player.name;

        // Ajout d'effet lumineux si sélectionné
        if (selectedPlayerIndex === index) {
            button.classList.add('selected');
        }

        // Vérifier si le joueur est le psychologue ou un mutant et ajouter les classes
        if (player.role === 'psy') {
            button.classList.add('psy-light-effect');
        }
        if (player.status === 'mut') {
            button.classList.add('mut-light-effect');
        }
        if (player.status === 'mort') {
            button.classList.add('dead-light-effect');
        }

        // Désactiver la sélection si psy n'est pas "sain"
        if (psy.status === 'sain') {
            button.addEventListener('click', () => {
                selectedPlayerIndex = index;
                updatePlayerButtons();
                updatestatusMessage();
            });
        } else {
            button.disabled = true; // Désactiver le bouton
        }

        buttonContainer.appendChild(button);
    });

    // Appel pour mettre à jour le message de statut à chaque fois que les boutons sont mis à jour
    updatestatusMessage();
}

// Appel de la fonction pour afficher les boutons des joueurs
updatePlayerButtons();

// Fonction pour enregistrer les joueurs dans le localStorage
function savePlayersToLocalStorage() {
    localStorage.setItem('players', JSON.stringify(players));
}

// Bouton "next"
document.getElementById('nextButton').addEventListener('click', () => {
    const turn = localStorage.getItem('turn');
    const psy = players.find(player => player.role === 'psy');
    if (psy.status === 'sain' && selectedPlayerIndex === null ){
        alert('Veuillez sélectionner un joueur à analyser.');
    }
    else {

    if (selectedPlayerIndex !== null) {
        players[selectedPlayerIndex].trace += " Y" + turn; // mettre a jour la trace
        savePlayersToLocalStorage();
    }

    // Redirection selon le tour
    if (turn === "1") {
        window.location.href = "at_genet.html";
    } else {
        window.location.href = "genet.html";
    }
}});

// Bouton de sortie pour réinitialiser "turn" et retourner à la page équipe
document.getElementById('exitButton').addEventListener('click', () => {
    localStorage.setItem('turn', '1');
    window.location.href = 'equipe.html';
});
