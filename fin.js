// Fonction pour afficher le compteur de nuit depuis le localStorage
const turnDisplay = document.getElementById('turnDisplay');
turnDisplay.textContent = localStorage.getItem('turn');

// Récupérer la liste des joueurs du localStorage
let players = JSON.parse(localStorage.getItem('players')) || [];
   
function updateStatusMessage() {
    const statusMessageDiv = document.getElementById('statusMessage');
    const mut = players.find(player => player.status === 'mut');
    const checkDoc = players.filter(player => player.role === 'medecin' && (player.status === 'mort' || player.status === 'mut')).length;

if (!mut) {statusMessageDiv.innerHTML = `L'humanité a gagné !<br><br>  Il n'y a plus aucun mutant à bord.`;
    
}


if (checkDoc === 2){statusMessageDiv.innerHTML = `Les mutants ont gagné !<br><br>Il n'y a plus de médecins valides à bord.`
    
}}
updateStatusMessage();
// Bouton de sortie pour réinitialiser "turn" et retourner à la page équipe
document.getElementById('exitButton').addEventListener('click', () => {
    localStorage.setItem('turn', '1');
    window.location.href = 'equipe.html';
});
