// Fonction pour afficher le compteur de nuit depuis le localStorage
const turnDisplay = document.getElementById('turnDisplay');
turnDisplay.textContent = localStorage.getItem('turn');

// Récupérer la liste des joueurs du localStorage
let players = JSON.parse(localStorage.getItem('players')) || [];

// Afficher la liste des joueurs dans des boutons
const buttonContainer = document.querySelector('.button-container');
let selectedPlayerIndex = null;

function skip(){
    const turn = localStorage.getItem('turn');
    const indic = players.find(player => player.role === 'indic');

    if (turn !== 1 && !indic){
        window.location.href = "journ.html"
    }
}
skip();

// Fonction pour afficher la phrase conditionnelle dans le statusMessage
function updatestatusMessage() {
    const statusMessageDiv = document.getElementById('statusMessage');
    const indic = players.find(player => player.role === 'indic');
    const fana = players.find(player => player.role === 'fana')


    if (indic.status === 'para') {
        statusMessageDiv.innerHTML = `(L'indic est <span class="status-paralyzed">paralysé</span>.)`;
    } else if (indic.status === 'mut') {
        statusMessageDiv.innerHTML = `(L'indic est <span class="status-mutated">muté</span>.)`;
    } else if (indic.status === 'mort') {
        statusMessageDiv.innerHTML = `(L'indic est <span class="status-dead">mort</span>.)`;
    } else if (indic.status === 'sain') {
        statusMessageDiv.innerHTML = `Si la cible est <span class="status-fana"> ${fana.name} </span> ou son voisin: (Faire \"oui\") <br>
        Si non: (Faire \"non\" de la tête) `;
        }
    }


// Fonction pour afficher la liste des boutons des joueurs
function updatePlayerButtons() {
    buttonContainer.innerHTML = ''; // Vider la liste actuelle
    const indic = players.find(player => player.role === 'indic');

    players.forEach((player, index) => {
        const button = document.createElement('button');
        button.classList.add('player-button');
        button.textContent = player.name;

        // Vérifier si le joueur est le psychologue ou un mutant et ajouter les classes
        if (player.role === 'fana') {
            button.classList.add('fana-light-effect');
        }
        if (player.role === 'indic') {
            button.classList.add('indic-light-effect');
        }

        if (player.satus === 'mort') {
            button.classList.add('dead-light-effect');
        }
      
        // Désactiver la sélection si psy n'est pas "sain"
        if (indic.status === 'sain') {
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
}

// Appel de la fonction pour afficher les boutons des joueurs
updatePlayerButtons();
updatestatusMessage();

// Fonction pour enregistrer les joueurs dans le localStorage
function savePlayersToLocalStorage() {
    localStorage.setItem('players', JSON.stringify(players));
}

// Bouton "next"
document.getElementById('nextButton').addEventListener('click', () => {

    const turn = localStorage.getItem('turn');
    // Redirection selon le tour
    if (turn === "1") {
        window.location.href = "at_journ.html";
    } else {
        window.location.href = "journ.html";
    }
});

// Bouton de sortie pour réinitialiser "turn" et retourner à la page équipe
document.getElementById('exitButton').addEventListener('click', () => {
    localStorage.setItem('turn', '1');
    window.location.href = 'equipe.html';
});
