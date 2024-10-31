// Afficher le compteur de nuit depuis le localStorage
const turnDisplay = document.getElementById('turnDisplay');
turnDisplay.textContent = localStorage.getItem('turn');

// Récupérer la liste des joueurs du localStorage
let players = JSON.parse(localStorage.getItem('players')) || [];

// Afficher la liste des joueurs dans des boutons
const buttonContainer = document.querySelector('.button-container');
let selectedPlayerIndices = []; // Initialiser en tant que tableau vide

function updatePlayerButtons() {
    buttonContainer.innerHTML = ''; // Vider la liste actuelle

    players.forEach((player, index) => {
        const button = document.createElement('button');
        button.classList.add('player-button');
        button.textContent = player.name;

        // Vérifier si le joueur est sélectionné
        if (selectedPlayerIndices.includes(index)) {
            button.classList.add('selected');
        }

        // Vérifier si le joueur a le statut "mut" et ajouter la classe correspondante
        if (player.status === 'mut') {
        button.classList.add('mut-light-effect'); // Ajoute la classe pour l'effet lumineux
        }
        
        // Vérifier si le joueur a le statut "para" et ajouter la classe correspondante
        if (player.status === 'para') {
        button.classList.add('para-light-effect'); // Ajoute la classe pour l'effet lumineux
        }

        // Ajouter l'effet de sélection/désélection au clic
        button.addEventListener('click', () => {
            // Sélectionner/désélectionner un joueur
            if (selectedPlayerIndices.includes(index)) {
                selectedPlayerIndices = selectedPlayerIndices.filter(i => i !== index);
            } else if (selectedPlayerIndices.length < 2 && player.role === "Astronaute") {
                selectedPlayerIndices.push(index);
            }
            updatePlayerButtons();
        });

        buttonContainer.appendChild(button);
    });
}

updatePlayerButtons();

// Fonction pour sélectionner deux joueurs astronautes au hasard
document.getElementById('randomMedButton').addEventListener('click', () => {
    const astronautIndices = players
        .map((player, index) => (player.role === "Astronaute" ? index : null))
        .filter(index => index !== null);

    if (astronautIndices.length >= 2) {
        // Réinitialiser la sélection
        selectedPlayerIndices = [];
        // Mélanger les indices puis sélectionner les deux premiers
        selectedPlayerIndices = astronautIndices.sort(() => 0.5 - Math.random()).slice(0, 2);
        updatePlayerButtons();
    } else {
        alert("Pas assez d'astronautes pour faire une sélection.");
    }
});

// Fonction pour enregistrer les joueurs dans le localStorage
function savePlayersToLocalStorage() {
    localStorage.setItem('players', JSON.stringify(players));
}

// Bouton "next"
document.getElementById('medSoinButton').addEventListener('click', () => {
    if (selectedPlayerIndices.length === 2) {
        // Attribuer le rôle de "médecin" aux deux joueurs sélectionnés
        selectedPlayerIndices.forEach(index => {
            players[index].role = "medecin";
            players[index].genome = "neutre";
        });

        // Sélectionner un joueur aléatoire parmi ceux ayant un génome vide pour attribuer "hôte"
        const emptyGenomePlayers = players.filter(p => p.genome === "");
        if (emptyGenomePlayers.length > 0) {
            const randomhôte = emptyGenomePlayers[Math.floor(Math.random() * emptyGenomePlayers.length)];
            randomhôte.genome = "hôte";
        }

        // Sélectionner un joueur aléatoire parmi ceux ayant un génome vide pour attribuer "résist"
        const remainingEmptyGenomePlayers = players.filter(p => p.genome === "");
        if (remainingEmptyGenomePlayers.length > 0) {
            const randomResist = remainingEmptyGenomePlayers[Math.floor(Math.random() * remainingEmptyGenomePlayers.length)];
            randomResist.genome = "résist";

            // Vérifier le statut et le modifier si nécessaire
            if (randomResist.status === "mut") {
                randomResist.status = "sain";
            }
        }

        savePlayersToLocalStorage();
        window.location.href = 'medsoin.html'; // Rediriger vers la page medsoin
    } else {
        alert("Veuillez sélectionner deux joueurs avant de continuer.");
    }
});


// Bouton de sortie pour retourner à la page "équipe" et réinitialiser la variable "turn" à 1
document.getElementById('exitButton').addEventListener('click', () => {
    localStorage.setItem('turn', '1');
    window.location.href = 'equipe.html';
});
