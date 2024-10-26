// Afficher le compteur de nuit depuis le localStorage
const turnDisplay = document.getElementById('turnDisplay');
turnDisplay.textContent = localStorage.getItem('turn');

// Récupérer la liste des joueurs du localStorage
let players = JSON.parse(localStorage.getItem('players')) || [];

// Afficher la liste des joueurs dans des boutons
const buttonContainer = document.querySelector('.button-container');
let selectedPlayerIndex = null;

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

        button.addEventListener('click', () => {
            // Désélectionner l'ancien joueur
            selectedPlayerIndex = index;
            updatePlayerButtons();
        });

        buttonContainer.appendChild(button);
    });
}

updatePlayerButtons();

// Fonction pour sélectionner un joueur au hasard
document.getElementById('randomMutantButton').addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * players.length);
    selectedPlayerIndex = randomIndex;
    updatePlayerButtons();
});

// Fonction pour enregistrer les joueurs dans le localStorage
function savePlayersToLocalStorage() {
    localStorage.setItem('players', JSON.stringify(players));
}

// Bouton "Le mutant va paralyser"
document.getElementById('mutantParalyseButton').addEventListener('click', () => {
    if (selectedPlayerIndex !== null) {
        players.forEach(p => { p.role = "Astronaute"; p.genome = ""; }); // Réinitialiser les rôles et génomes
        players[selectedPlayerIndex].role = "Mutant"; // Attribuer le rôle de mutant
        players[selectedPlayerIndex].genome = "Hôte"; // Attribuer le génome
        savePlayersToLocalStorage();
        window.location.href = 'para.html'; // Rediriger vers la page para
    }
});

// Bouton de sortie pour retourner à la page "équipe" et réinitialiser la variable "turn" à 1
document.getElementById('exitButton').addEventListener('click', () => {
    localStorage.setItem('turn', '1');
    window.location.href = 'equipe.html';
});
