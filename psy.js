// Afficher le compteur de nuit depuis le localStorage
const turnDisplay = document.getElementById('turnDisplay');
turnDisplay.textContent = localStorage.getItem('turn');

// Récupérer la liste des joueurs du localStorage
let players = JSON.parse(localStorage.getItem('players')) || [];

// Afficher la liste des joueurs dans des boutons
const buttonContainer = document.querySelector('.button-container');
let selectedPlayerIndex = null;

// Fonction pour obtenir le nombre de mutants et le statut de l'psy
function updateStatusMessage() {
    const statusMessageDiv = document.getElementById('statusMessage');
    const psy = players.find(player => player.role === 'psy');

    if (psy) {
        if (psy.status === 'para') {
            statusMessageDiv.innerHTML = `Le psycologue est <span class="status-paralyzed">paralysé</span>.`;
        } else if (psy.status === 'mut') {
            statusMessageDiv.innerHTML = `Le psycologue est <span class="status-mutated">muté</span>.`;
        } else if (psy.status === 'mort') {
            statusMessageDiv.innerHTML = `Le psycologue est <span class="status-dead">mort</span>.`;
        } else if (selectedPlayerIndex.status ==='mut'){
            statusMessageDiv.textContent = `{selectedPlayerIndex.name} est un(e) mutant(e)`;
        }
    }
}

function updatePlayerButtons() {
    buttonContainer.innerHTML = ''; // Vider la liste actuelle
    players.forEach((player, index) => {
        const button = document.createElement('button');
        button.classList.add('player-button');
        button.textContent = player.name;
        
        // Ajout d'effet lumineux si sélectionné
        if (selectedPlayerIndex === index) {
            button.classList.add('selected');
        }

        // Vérifier si le joueur a le statut "mut" et ajouter la classe correspondante
        if (player.role === 'psy') {
            button.classList.add('psy-light-effect'); // Ajoute la classe pour l'effet lumineux
        }

        // Vérifier si le joueur a le statut "mut" et ajouter la classe correspondante
        if (player.status === 'mut') {
            button.classList.add('mut-light-effect'); // Ajoute la classe pour l'effet lumineux
        }

        if (player.status === 'mort') {
            button.classList.add('dead-light-effect'); // Ajoute la classe pour l'effet lumineux
        }

        button.addEventListener('click', () => {
            // Sélectionner le joueur et mettre à jour les boutons
            selectedPlayerIndex = index;
            updatePlayerButtons();
        });

        buttonContainer.appendChild(button);
    });
}

// Appel de la fonction pour afficher les boutons joueurs
updatePlayerButtons();

// Fonction pour enregistrer les joueurs dans le localStorage
function savePlayersToLocalStorage() {
    localStorage.setItem('players', JSON.stringify(players));
}

// Bouton "Le mutant va Mutuer"
document.getElementById('nextButton').addEventListener('click', () => {
    if (selectedPlayerIndex !== null) {
        players[selectedPlayerIndex].status = "para"; // Attribuer statut para
        players[selectedPlayerIndex].trace += "P" + localStorage.getItem('turn'); // mettre a jour la trace
        savePlayersToLocalStorage();
        window.location.href = 'mutue.html'; // Rediriger vers la page Mutue
    }
});

// Bouton de sortie pour retourner à la page "équipe" et réinitialiser la variable "turn" à 1
document.getElementById('exitButton').addEventListener('click', () => {
    localStorage.setItem('turn', '1');
    window.location.href = 'equipe.html';
});
