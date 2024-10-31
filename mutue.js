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

            // Appliquer l'effet en fonction de l'action sélectionnée
            if (actionSelected === 'contaminate') {
                button.classList.add('contaminate-effect');
            } else if (actionSelected === 'kill') {
                button.classList.add('kill-effect');
            }
        }

        // Vérifier si le joueur a le statut "mut" et ajouter la classe correspondante
        if (player.status === 'mut') {
            button.classList.add('mut-light-effect'); // Ajoute la classe pour l'effet lumineux
        }

        if (player.status === 'mort') {
            button.classList.add('dead-light-effect'); // Ajoute la classe pour l'effet lumineux
        }

        // Vérifier si le joueur a le statut "para" et ajouter la classe correspondante
        if (player.status === 'para') {
            button.classList.add('para-light-effect'); // Ajoute la classe pour l'effet lumineux
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

// Gérer la sélection des actions "Contamine" et "Tue"
const contaminateButton = document.getElementById('contaminateButton');
const killButton = document.getElementById('killButton');
let actionSelected = null; // Pour suivre l'action sélectionnée

// Sélection des boutons "Contamine" et "Tue"
contaminateButton.addEventListener('click', () => {
    actionSelected = 'contaminate';
    contaminateButton.classList.add('selected');
    killButton.classList.remove('selected');
    updatePlayerButtons(); // Mettre à jour les boutons pour refléter la sélection
});

killButton.addEventListener('click', () => {
    actionSelected = 'kill';
    killButton.classList.add('selected');
    contaminateButton.classList.remove('selected');
    updatePlayerButtons(); // Mettre à jour les boutons pour refléter la sélection
});



// Bouton "Les mutants referment leurs yeux"
document.getElementById('at_med-Button').addEventListener('click', () => {
    if (selectedPlayerIndex !== null && actionSelected) {
        if (actionSelected === 'contaminate') {
            players[selectedPlayerIndex].status = "mut"; // Attribuer statut "mut"
            players[selectedPlayerIndex].trace += " M" + localStorage.getItem('turn'); // mettre a jour la trace
        } else if (actionSelected === 'kill') {
            players[selectedPlayerIndex].status = "mort"; // Attribuer statut "mort"
            players[selectedPlayerIndex].trace += " T" + localStorage.getItem('turn'); // mettre a jour la trace
        }
        savePlayersToLocalStorage();
        updatePlayerButtons(); // Mise à jour des boutons après changement de statut

        const turn = localStorage.getItem('turn');

        if (turn === "1") {
            window.location.href = "at_med.html"; // Redirection vers la page "at_mut"
        } else {
            window.location.href = "medsoin.html"; // Redirection vers la page "para"
        }
    } 
    
    

});

// Bouton de sortie pour retourner à la page "équipe" et réinitialiser la variable "turn" à 1
document.getElementById('exitButton').addEventListener('click', () => {
    localStorage.setItem('turn', '1');
    window.location.href = 'equipe.html';
});
