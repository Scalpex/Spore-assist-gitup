// Récupérer la variable "turn" depuis le localStorage
function loadTurn() {
    const turn = localStorage.getItem('turn');
    const turnDisplay = document.getElementById('turnDisplay');
    if (turn) {
        turnDisplay.textContent = turn;
    } else {
        turnDisplay.textContent = 1; // Valeur par défaut si non trouvée
    }
}

// Redirection vers la page Leader
document.getElementById('leaderButton').addEventListener('click', () => {
    window.location.href = "leader.html";
});

// Appel de la fonction pour charger la variable "turn"
loadTurn();
