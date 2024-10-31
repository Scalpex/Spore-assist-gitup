// Afficher le compteur de nuit depuis le localStorage
const turnDisplay = document.getElementById('turnDisplay');
turnDisplay.textContent = localStorage.getItem('turn');

// Récupérer la liste des joueurs du localStorage
let players = JSON.parse(localStorage.getItem('players')) || [];

// Afficher la liste des joueurs dans des boutons
const buttonContainer = document.querySelector('.button-container');
let selectedPlayerIndices = []; // Pour stocker les indices des joueurs sélectionnés
let actionSelected = null; // Pour suivre l'action sélectionnée

// Sélection des boutons d'action "heal" et "kill"
const healButton = document.getElementById('healButton');
const killButton = document.getElementById('killButton');

// Fonction pour compter les médecins sains
function getHealthyDoctorsCount() {
    return players.filter(player => player.role === 'medecin' && player.status === 'sain').length;
}

// Fonction pour activer ou désactiver les boutons d'action en fonction du nombre de médecins sains
function updateActionButtons() {
    const healthyDoctorsCount = getHealthyDoctorsCount();
    // Désactiver les boutons "heal" et "kill" si aucun médecin sain n'est disponible
    healButton.disabled = (healthyDoctorsCount === 0);
    killButton.disabled = (healthyDoctorsCount === 0);
    button.disabled = (healthyDoctorsCount === 0);
}

// Met à jour les boutons des joueurs en fonction des critères
function updatePlayerButtons() {
    const healthyDoctorsCount = getHealthyDoctorsCount();
    buttonContainer.innerHTML = ''; // Vider la liste actuelle des boutons

    players.forEach((player, index) => {
        const button = document.createElement('button');
        button.classList.add('player-button');
        
        // Ajouter le texte "hôte" après le nom si le génome est "hôte"
        button.textContent = player.name + ( player.status === 'mut' && player.genome === "hôte" ? " hôte" : "");
    
        // Afficher effet lumineux pour les médecins sains
        if (player.role === 'medecin' && player.status === 'sain') {
            button.classList.add('medecin-light-effect');
        }

        if (player.genome === 'hôte' && player.status === 'mut') {
            button.classList.add('mut-hôte-light-effect')
        }
        
        // Vérifier si le joueur a le statut "mut" et ajouter la classe correspondante
        if (player.status === 'mut') {
            button.classList.add('mut-light-effect'); 
        }

        if (player.status === 'mort') {
            button.classList.add('dead-light-effect'); // Ajoute la classe pour l'effet lumineux
        }
    
        // Vérifier si le joueur a le statut "para" et ajouter la classe correspondante
        if (player.status === 'para') {
            button.classList.add('para-light-effect');
        }
    
        // Appliquer les effets de sélection si le joueur est dans selectedPlayerIndices
        if (selectedPlayerIndices.includes(index)) {
            if (actionSelected === 'heal') {
                button.classList.add('heal-effect');
            } else if (actionSelected === 'kill') {
                button.classList.add('kill-effect');
            } else if  (actionSelected === null)
                button.classList.add('selected');

        }
    
        // Gérer la sélection et désélection des joueurs au clic
        button.addEventListener('click', () => {
            if (selectedPlayerIndices.includes(index)) {
                // Si le joueur est déjà sélectionné, on le désélectionne
                selectedPlayerIndices = selectedPlayerIndices.filter(i => i !== index);

            } else if (
                (healthyDoctorsCount === 1 && selectedPlayerIndices.length === 0) || // Condition pour un médecin sain
                (healthyDoctorsCount === 2 && actionSelected === 'heal' && selectedPlayerIndices.length < 2) || // Deux médecins sains
                (healthyDoctorsCount === 2 && actionSelected === 'kill' && selectedPlayerIndices.length === 0) // Un médecin en cas d'action "tuer"
            ) {selectedPlayerIndices.push(index);
            }
            updatePlayerButtons(); // Rafraîchir l'affichage après la modification
        });
    
        buttonContainer.appendChild(button);
    });
}

// Fonction pour enregistrer les joueurs dans le localStorage
function savePlayersToLocalStorage() {
    localStorage.setItem('players', JSON.stringify(players));
}

// Gérer la sélection des actions "soigne" et "Tue"
healButton.addEventListener('click', () => {
    actionSelected = 'heal';
    healButton.classList.add('selected');
    killButton.classList.remove('selected');
    selectedPlayerIndices = []; // Réinitialiser la sélection des joueurs
    updatePlayerButtons();
});

killButton.addEventListener('click', () => {
    actionSelected = 'kill';
    killButton.classList.add('selected');
    healButton.classList.remove('selected');
    selectedPlayerIndices = []; // Réinitialiser la sélection des joueurs
    updatePlayerButtons();
});

// Bouton "info" pour appliquer les effets sélectionnés sur les joueurs choisis
document.getElementById('at_info-Button').addEventListener('click', () => {
    const turn = localStorage.getItem('turn');

    if (selectedPlayerIndices.length > 0 && actionSelected) {
        selectedPlayerIndices.forEach(index => {
            const player = players[index];
            if (actionSelected === 'heal') {
                // Soigner le joueur, sauf s'il est "hôte"
                if (player.genome !== "hôte") {
                    player.status = "sain";
                }
                player.trace += " S" + turn;
            } else if (actionSelected === 'kill') {
                player.status = "mort";
                player.trace += " T" + turn;
            }
        });
        
        savePlayersToLocalStorage();
        updatePlayerButtons(); // Mise à jour des boutons après changement de statut

        // Redirection selon le tour
        if (turn === "1") {
            window.location.href = "at_info.html";
        } else {
            window.location.href = "info.html";
        }
    } else {
        alert("Veuillez sélectionner des joueurs et une action avant de continuer.");
    }
});

// Bouton de sortie pour retourner à la page "équipe" et réinitialiser la variable "turn" à 1
document.getElementById('exitButton').addEventListener('click', () => {
    localStorage.setItem('turn', '1');
    window.location.href = 'equipe.html';
});

// Appel initial pour afficher les boutons joueurs et mettre à jour l'état des boutons d'action
updatePlayerButtons();
updateActionButtons();