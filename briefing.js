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

// Sélectionner le bouton et l'élément audio
const playButton = document.getElementById('playButton');
const briefingAudio = document.getElementById('briefingAudio');

// Ajouter un gestionnaire d'événement pour le bouton
playButton.addEventListener('click', function() {
    if (briefingAudio.paused) {
        briefingAudio.play(); // Lire l'audio si il est en pause
        playButton.textContent = '⏸'; // Changer l'icône pour pause
    } else {
        briefingAudio.pause(); // Mettre en pause si déjà en lecture
        playButton.textContent = '▶'; // Remettre l'icône play
    }
});

const text = "Bienvenu à bord du SLS Orbitron à destination du système Cygnus X-1.\n\nJe suis Oxana, votre ordinateur de bord.\n\nComme vous le savez, la vie sur Terre telle que vous l'avez connue n'est plus possible suite à l'arrivée de la spore hautement mutagène Sras-Sporvid 19.\nVous avez été sélectionné parmi les dernier survivants pour tenter de faire perdurer l'humanité à bord de ce vaisseau.\n\nMalheureusement, après 8 année terrienne de voyage, j'ai dû activer le protocole de réveil d'urgence car la présence de la spore a été détectée à bord.\nVous allez devoir trouver et éliminer cet organisme avant qu'il ne vous contamine tous.\n\nPréalablement, vous allez devoir choisir un leader pour vous départager en cas de blocage et d'égalité.\nPar la suite, vous serez redirigés vers vos cocons individuels pour vous reposer de l'hibernation cryogénique.\nDès demain, pour éviter toute propagation, vous ne pourrez plus vous regrouper à plus de 4 personnes en même temps.\n\nBonne chance..."
;
const typewriterElement = document.getElementById("typewriter");
let index = 0;

function typeEffect() {
    // Remplacer le saut de ligne par <br>
    if (text.charAt(index) === '\n') {
        typewriterElement.innerHTML += '<br>';
    } else {
        typewriterElement.innerHTML += text.charAt(index);
    }
        index++;
        setTimeout(typeEffect, 41); // Ajustez le temps pour changer la vitesse de frappe
    }


window.onload = function() {
    typeEffect();
};