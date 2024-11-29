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
       
        
        if (player.status === 'para') {
        button.classList.add('para-light-effect');
        }   
        
        if (player.role === 'fana') {
            button.classList.add('fana-light-effect');
        }

        if (player.role === 'journ') {
            button.classList.add('journ-light-effect');
        }

        if (player.role === 'indic') {
            button.classList.add('indic-light-effect');
        }

        if (player.role === 'hack') {
            button.classList.add('hack-light-effect');
        }

        if (player.status === 'mut') {
            button.classList.add('mutant-light-effect');
        }

        if (player.role === 'psy') {
            button.classList.add('psy-light-effect');
        }

        if (player.role === 'medecin') {
            button.classList.add('medecin-light-effect');
        }

        if (player.role === 'info') {
            button.classList.add('info-light-effect');
        }

        if (player.role === 'gene') {
            button.classList.add('gene-light-effect');
        }


        button.addEventListener('click', () => {
            if (selectedPlayerIndex === index) {
                // Si le joueur est déjà sélectionné, désélectionnez-le
                selectedPlayerIndex = null;
            } else {
                // Sinon, sélectionnez ce joueur
                selectedPlayerIndex = index;
            }

            // Mettre à jour l'affichage
            updatePlayerButtons();
        });

        buttonContainer.appendChild(button);
    });

     // Mettre à jour le texte du bouton "nextButton"
     const nextButton = document.getElementById('nextButton');
     if (selectedPlayerIndex !== null) {
         const selectedPlayer = players[selectedPlayerIndex];
         nextButton.textContent = `${selectedPlayer.name} est l'espion`;
     } else {
         nextButton.textContent = "Passer";
     }
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
        players[selectedPlayerIndex].role = "esp"; // Attribuer le rôle de mutant
        savePlayersToLocalStorage();
        window.location.href = 'esp.html'; // Rediriger vers la page para
    }
    else { 
        let turn = parseInt(localStorage.getItem('turn'), 10); // Récupérer 'turn' et le convertir en nombre

            // Incrémenter 'turn' de 1
            turn += 1;

            // Enregistrer la nouvelle valeur de 'turn' dans le localStorage
            localStorage.setItem('turn', turn.toString());
    
            // Redirection vers la page bilan
            window.location.href = "bilan.html";
}});


// Bouton de sortie pour retourner à la page "équipe" et réinitialiser la variable "turn" à 1
document.getElementById('exitButton').addEventListener('click', () => {
    localStorage.setItem('turn', '1');
    window.location.href = 'equipe.html';
});
