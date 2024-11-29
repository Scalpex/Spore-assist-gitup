let players = JSON.parse(localStorage.getItem('players')) || [];
const mut = players.find(player => player.status === 'mut');
const turn = localStorage.getItem('turn');
const checkDoc = players.filter(player => player.role === 'medecin' && (player.status === 'mort' || player.status === 'mut')).length;
if (turn !== 1 &&(checkDoc === 2 || !mut)){window.location.href = "fin.html";}

else {



// Afficher le compteur de nuit depuis le localStorage
const turnDisplay = document.getElementById('turnDisplay');
turnDisplay.textContent = localStorage.getItem('turn');

// Récupérer la liste des joueurs du localStorage
let players = JSON.parse(localStorage.getItem('players')) || [];


// Fonction pour obtenir le nombre de mutants et le statut de l'informaticien
function updateStatusMessage() {
    const statusMessageDiv = document.getElementById('statusMessage');
    const informaticien = players.find(player => player.role === 'info');
    const mutantsCount = players.filter(player => player.status === 'mut').length;

    if (informaticien) {
        if (informaticien.status === 'para') {
            statusMessageDiv.innerHTML = `(L'informaticien est <span class="status-paralyzed">paralysé</span>.)`;
        } else if (informaticien.status === 'mut') {
            statusMessageDiv.innerHTML = `(L'informaticien est <span class="status-mutated">muté</span>.)`;
        } else if (informaticien.status === 'mort') {
            statusMessageDiv.innerHTML = `(L'informaticien est <span class="status-dead">mort</span>.)`;
        } else {
            statusMessageDiv.textContent = `(il y a ${mutantsCount} mutant(s) à bord.)`;
        }
    }
}

// Appeler la fonction au chargement de la page
updateStatusMessage();



// Bouton "info" pour appliquer les effets sélectionnés sur les joueurs choisis
document.getElementById('nextButton').addEventListener('click', () => {
    const turn = localStorage.getItem('turn');
      
        // Redirection selon le tour
    if (turn === "1") {
        window.location.href = "at_psy.html";
    } else {
        window.location.href = "psy.html";
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
}