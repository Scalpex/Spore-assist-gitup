// Fonction pour afficher le compteur de nuit depuis le localStorage
const turnDisplay = document.getElementById('turnDisplay');
turnDisplay.textContent = localStorage.getItem('turn');

// Récupérer la liste des joueurs du localStorage
let players = JSON.parse(localStorage.getItem('players')) || [];

// Afficher la liste des joueurs dans des boutons
const buttonContainer = document.querySelector('.button-container');
let selectedPlayerIndex = null;

function skip(){
    const turn = localStorage.getItem('turn');
    const journ = players.find(player => player.role === 'journ');

    if (turn !== 1 && !journ){
        window.location.href = "esp.html"
    }
}
skip();

// Fonction pour afficher la phrase conditionnelle dans le statusMessage
function updatestatusMessage() {
    const statusMessageDiv = document.getElementById('statusMessage');
    const journ = players.find(player => player.role === 'journ');
    const selectedPlayer = players[selectedPlayerIndex];
    const turn = localStorage.getItem('turn'); // Récupérer la valeur de 'turn'

    if (journ.status === 'para') {
        statusMessageDiv.innerHTML = `(Le journaliste est <span class="status-paralyzed">paralysé</span>.)`;
    } else if (journ.status === 'mut') {
        statusMessageDiv.innerHTML = `(Le journaliste est <span class="status-mutated">muté</span>.)`;
    } else if (journ.status === 'mort') {
        statusMessageDiv.innerHTML = `(Le journaliste est <span class="status-dead">mort</span>.)`;
    } else if (journ.status === 'sain') {
        if (selectedPlayerIndex === null) {
            statusMessageDiv.innerHTML = '(Sélectionnez un joueur)';
        } else if (selectedPlayer) {
                statusMessageDiv.innerHTML = `(Ce joueur a été : `;
            if (selectedPlayer.trace.includes("P" + (turn-1))){
                statusMessageDiv.innerHTML += '<span class="yes-effect">paralysé</span>, '}
            else {statusMessageDiv.innerHTML += '<span class="no-effect">paralysé</span>, '; 
            }
            if (selectedPlayer.trace.includes("M" + (turn-1))){
                statusMessageDiv.innerHTML += '<span class="yes-effect">muté</span>, '}
            else {statusMessageDiv.innerHTML += '<span class="no-effect">muté</span>, '; 
            }
            if (selectedPlayer.trace.includes("S" + (turn-1))){
                statusMessageDiv.innerHTML += '<span class="yes-effect">soigné</span>, '}
            else {statusMessageDiv.innerHTML += '<span class="no-effect">soigné</span>, '; 
            }

            if (selectedPlayer.trace.includes("H" + (turn-1))){
                statusMessageDiv.innerHTML += '<span class="yes-effect">hacké</span>, '}
            else {statusMessageDiv.innerHTML += '<span class="no-effect">hacké</span>, '; 
            }

            statusMessageDiv.innerHTML += '<br>analysé par: '

            if (selectedPlayer.trace.includes("Y" + (turn-1))){
                statusMessageDiv.innerHTML += '<span class="yes-effect">le psy</span>, '}
            else {statusMessageDiv.innerHTML += '<span class="no-effect">le psy</span>, '; 
            }
            if (selectedPlayer.trace.includes("G" + (turn-1))){
                statusMessageDiv.innerHTML += '<span class="yes-effect">le généticien</span>, '}
            else {statusMessageDiv.innerHTML += '<span class="no-effect">le généticien</span>, '; 
            }

            if (selectedPlayer.trace.includes("E" + (turn-1))){
                statusMessageDiv.innerHTML += '<span class="yes-effect">l\'espion</span>.)'}
            else {statusMessageDiv.innerHTML += '<span class="no-effect">l\'espion</span>.) '; 
            }

            }
        }
    }
// Muté, Soigné, Inspecté par le Psy, par le Généticien, par l'Indic, par l'espion hacké,  

// Fonction pour afficher la liste des boutons des joueurs
function updatePlayerButtons() {
    buttonContainer.innerHTML = ''; // Vider la liste actuelle
    const journ = players.find(player => player.role === 'journ');
    players.forEach((player, index) => {
        const button = document.createElement('button');
        button.classList.add('player-button');
        button.textContent = player.name;

        // Ajout d'effet lumineux si sélectionné
        if (selectedPlayerIndex === index) {
            button.classList.add('selected');
        }
        if (player.role === 'journ') {
            button.classList.add('journ-light-effect');
        }

        if (player.status === 'mort') {
            button.classList.add('dead-light-effect');
        }

        // Désactiver la sélection si psy n'est pas "sain"
        if (journ.status === 'sain') {
            button.addEventListener('click', () => {
                selectedPlayerIndex = index;
                updatePlayerButtons();
                updatestatusMessage();
            });
        } else {
            button.disabled = true; // Désactiver le bouton
        }

        buttonContainer.appendChild(button);
    });

    // Appel pour mettre à jour le message de statut à chaque fois que les boutons sont mis à jour
    updatestatusMessage();
}

// Appel de la fonction pour afficher les boutons des joueurs
updatePlayerButtons();

// Fonction pour enregistrer les joueurs dans le localStorage
function savePlayersToLocalStorage() {
    localStorage.setItem('players', JSON.stringify(players));
}

// Bouton "next"
document.getElementById('nextButton').addEventListener('click', () => {
    const turn = localStorage.getItem('turn');
    const journ = players.find(player => player.role === 'journ');
    if (journ.status === 'sain' && selectedPlayerIndex === null ){
        alert('Veuillez sélectionner un joueur à analyser.');
    }
    else {

    if (selectedPlayerIndex !== null) {
        players[selectedPlayerIndex].trace += " J" + turn; // mettre a jour la trace
        savePlayersToLocalStorage();
    }

    // Redirection selon le tour
    if (turn === "1") {
        window.location.href = "at_esp.html";
    } else {
        window.location.href = "esp.html";
    }
}});

// Bouton de sortie pour réinitialiser "turn" et retourner à la page équipe
document.getElementById('exitButton').addEventListener('click', () => {
    localStorage.setItem('turn', '1');
    window.location.href = 'equipe.html';
});
