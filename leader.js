const turn = parseInt(localStorage.getItem('turn'), 10);
let players = JSON.parse(localStorage.getItem('players')) || [];
const mut = players.find(player => player.status === 'mut');
const checkDoc = players.filter(player => player.role === 'medecin' && (player.status === 'mort' || player.status === 'mut')).length;
const chef = players.find(player => player.rank === 'chef')
if (chef){chef.rank ="";}

if (turn !== 1 && (checkDoc === 2 || !mut)){window.location.href = "fin.html";}


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

        if (player.status === 'mort') {
            button.classList.add('dead-light-effect');
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


// Fonction pour enregistrer les joueurs dans le localStorage
function savePlayersToLocalStorage() {
    localStorage.setItem('players', JSON.stringify(players));
}

// Bouton "Le mutant va paralyser"
document.getElementById("validateNightButton").addEventListener('click', () => {
    const turn = localStorage.getItem('turn');
    if (selectedPlayerIndex !== null) {
        players[selectedPlayerIndex].rank = "chef"; 
        savePlayersToLocalStorage();
        if (turn === "1") {
        window.location.href = 'at_mut.html';
        } // Rediriger vers la page para
        else {
            window.location.href = "para.html"; // Redirection vers la page "para"
        }
    } 
    });
document.getElementById('exitButton').addEventListener('click', () => {
    localStorage.setItem('turn', '1');
    window.location.href = 'equipe.html';
});
}