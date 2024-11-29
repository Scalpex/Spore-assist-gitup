const turn = localStorage.getItem('turn');
let players = JSON.parse(localStorage.getItem('players')) || [];
const mut = players.find(player => player.status === 'mut');
const checkDoc = players.filter(player => player.role === 'medecin' && (player.status === 'mort' || player.status === 'mut')).length;
if (turn !== 1 &&(checkDoc === 2 || !mut)){window.location.href = "fin.html";}


else {

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
document.getElementById('mutantMutueButton').addEventListener('click', () => {
    if (selectedPlayerIndex !== null) {
        players[selectedPlayerIndex].status = "para"; // Attribuer statut para
        players[selectedPlayerIndex].trace += " P" + localStorage.getItem('turn'); // mettre a jour la trace
        savePlayersToLocalStorage();
        window.location.href = 'mutue.html'; // Rediriger vers la page Mutue
    }
});

// Bouton de sortie pour retourner à la page "équipe" et réinitialiser la variable "turn" à 1
document.getElementById('exitButton').addEventListener('click', () => {
    localStorage.setItem('turn', '1');
    window.location.href = 'equipe.html';
});

}