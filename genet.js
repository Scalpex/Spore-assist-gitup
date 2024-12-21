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
    const gene = players.find(player => player.role === 'gene');
    const selectedPlayer = players[selectedPlayerIndex];

    if (gene.status === 'para') {
        statusMessageDiv.innerHTML = `(Le généticien est <span class="status-paralyzed">paralysé</span>.)`;
    } else if (gene.status === 'mut') {
        statusMessageDiv.innerHTML = `(Le généticien est <span class="status-mutated">muté</span>.)`;
    } else if (gene.status === 'mort') {
        statusMessageDiv.innerHTML = `(Le généticien est <span class="status-dead">mort</span>.)`;
    } else if (gene.status === 'sain') {
        if (selectedPlayerIndex === null) {
            statusMessageDiv.innerHTML = '(Sélectionnez un joueur)';
        } else if (selectedPlayer) {
            if (selectedPlayer.genome === 'hôte') {
                statusMessageDiv.innerHTML = `(${selectedPlayer.name} a le gêne <span class="status-mutated">hôte</span>.)`;
            } else if (selectedPlayer.genome === 'résist') {
                    statusMessageDiv.innerHTML = `(${selectedPlayer.name} a le gêne <span class="status-med">réistant</span>.)`;
            }
             else {
                statusMessageDiv.innerHTML = `(${selectedPlayer.name} a le gêne <span class="neutre-word">neutre</span>.)`;
            }
        }
    }
}

// Fonction pour afficher la liste des boutons des joueurs
function updatePlayerButtons() {
    buttonContainer.innerHTML = ''; // Vider la liste actuelle
    const gene = players.find(player => player.role === 'gene');

    players.forEach((player, index) => {
        const button = document.createElement('button');
        button.classList.add('player-button');
        button.textContent = player.name;

        // Ajout d'effet lumineux si sélectionné
        if (selectedPlayerIndex === index) {
            button.classList.add('selected');
        }

        // Vérifier si le joueur est le psychologue ou un mutant et ajouter les classes
        if (player.role === 'gene') {
            button.classList.add('gene-light-effect');
        }
        if (player.genome === 'hôte') {
            button.classList.add('mut-light-effect');
        }
        if (player.genome === 'résist') {
            button.classList.add('med-light-effect');
        }

        if (player.status === 'mort') {
            button.classList.add('dead-light-effect');
        }

        // Désactiver la sélection si psy n'est pas "sain"
        if (gene.status === 'sain') {
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
    const gene = players.find(player => player.role === 'gene');
    if (gene.status === 'sain' && selectedPlayerIndex === null ){
        alert('Veuillez sélectionner un joueur à analyser.');
    }
    else {

    if (selectedPlayerIndex !== null) {
        players[selectedPlayerIndex].trace += " G" + turn; // mettre a jour la trace
        savePlayersToLocalStorage();
    }

    // Redirection selon le tour
    if (turn === "1") {
        window.location.href = "at_hack.html";
    } else {
        window.location.href = "hack.html";
    }
}});



// Bouton de sortie pour réinitialiser "turn" et retourner à la page équipe
document.getElementById('exitButton').addEventListener('click', () => {
    localStorage.setItem('turn', '1');
    window.location.href = 'equipe.html';
});
