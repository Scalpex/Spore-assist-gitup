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

        if (player.role !== 'Astronaute') {
            button.disabled = true; // Désactive le bouton pour les non-Astronautes
        }

        if (player.role === 'Mutant') {
            button.classList.add('mutant-light-effect');
        }

        if (player.role === 'medecin') {
            button.classList.add('medecin-light-effect');
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

// Fonction pour sélectionner un joueur au hasard avec le rôle "Astronaute"
document.getElementById('randomButton').addEventListener('click', () => {
    const astronauts = players.filter(player => player.role === 'Astronaute');
    
    // Vérifier s'il y a au moins un joueur avec le rôle "Astronaute"
    if (astronauts.length > 0) {
        const randomIndex = Math.floor(Math.random() * astronauts.length);
        const selectedAstronaut = astronauts[randomIndex];

        // Obtenir l'index du joueur dans la liste complète des joueurs
        selectedPlayerIndex = players.indexOf(selectedAstronaut);

        updatePlayerButtons();
    } else {
        alert("Aucun joueur avec le rôle 'Astronaute' disponible.");
    }
});



// Fonction pour enregistrer les joueurs dans le localStorage
function savePlayersToLocalStorage() {
    localStorage.setItem('players', JSON.stringify(players));
}

// Bouton "Le mutant va paralyser"
document.getElementById('nextButton').addEventListener('click', () => {
    if (selectedPlayerIndex !== null) {
        players[selectedPlayerIndex].role = "info"; // Attribuer le rôle de mutant
        savePlayersToLocalStorage();
        window.location.href = 'info.html'; // Rediriger vers la page para
    }
});

// Bouton de sortie pour retourner à la page "équipe" et réinitialiser la variable "turn" à 1
document.getElementById('exitButton').addEventListener('click', () => {
    localStorage.setItem('turn', '1');
    window.location.href = 'equipe.html';
});
