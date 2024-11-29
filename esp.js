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
    const esp = players.find(player => player.role === 'esp');

    if (turn !== 1 && !esp){
        window.location.href = "bilan.html"
    }
}
skip();

updatePlayerButtons();

// Fonction pour afficher la phrase conditionnelle dans le statusMessage
function updatestatusMessage() {
    const statusMessageDiv = document.getElementById('statusMessage');
    const esp = players.find(player => player.role === 'esp');
    const selectedPlayer = players[selectedPlayerIndex];
    const turn = localStorage.getItem('turn'); // Récupérer la valeur de 'turn'

    if (esp.status === 'para') {
        statusMessageDiv.innerHTML = `(L'espion est <span class="status-paralyzed">paralysé</span>.)`;
    } else if (esp.status === 'mut') {
        statusMessageDiv.innerHTML = `(L'espion est <span class="status-mutated">muté</span>.)`;
    } else if (esp.status === 'mort') {
        statusMessageDiv.innerHTML = `(L'espion est <span class="status-dead">mort</span>.)`;
    } else if (esp.status === 'sain') {
        if (selectedPlayerIndex === null) {
            statusMessageDiv.innerHTML = '(Sélectionnez un joueur)';
        } else if (selectedPlayer) {
                statusMessageDiv.innerHTML = `(Ce joueur a été : `;
            if (selectedPlayer.trace.includes("P" + turn)){
                statusMessageDiv.innerHTML += '<span class="yes-effect">paralysé</span>, '}
            else {statusMessageDiv.innerHTML += '<span class="no-effect">paralysé</span>, '; 
            }
            if (selectedPlayer.trace.includes("M" + turn)){
                statusMessageDiv.innerHTML += '<span class="yes-effect">muté</span>, '}
            else {statusMessageDiv.innerHTML += '<span class="no-effect">muté</span>, '; 
            }
            if (selectedPlayer.trace.includes("S" + turn)){
                statusMessageDiv.innerHTML += '<span class="yes-effect">soigné</span>, '}
            else {statusMessageDiv.innerHTML += '<span class="no-effect">soigné</span>, '; 
            }

            if (selectedPlayer.trace.includes("H" + turn)){
                statusMessageDiv.innerHTML += '<span class="yes-effect">hacké</span>, '}
            else {statusMessageDiv.innerHTML += '<span class="no-effect">hacké</span>, '; 
            }

            statusMessageDiv.innerHTML += '<br>analysé par: '

            if (selectedPlayer.trace.includes("Y" + turn)){
                statusMessageDiv.innerHTML += '<span class="yes-effect">le psy</span>, '}
            else {statusMessageDiv.innerHTML += '<span class="no-effect">le psy</span>, '; 
            }
            if (selectedPlayer.trace.includes("G" + turn)){
                statusMessageDiv.innerHTML += '<span class="yes-effect">le généticien</span>, '}
            else {statusMessageDiv.innerHTML += '<span class="no-effect">le généticien</span>, '; 
            }
            if (selectedPlayer.trace.includes("I" + turn)){
                statusMessageDiv.innerHTML += '<span class="yes-effect">l\'indic</span>, '}
            else {statusMessageDiv.innerHTML += '<span class="no-effect">l\'indic</span>, '; 
            }

            if (selectedPlayer.trace.includes("J" + turn)){
                statusMessageDiv.innerHTML += '<span class="yes-effect">le journaliste</span>.)'}
            else {statusMessageDiv.innerHTML += '<span class="no-effect">le journaliste</span>.)'; 
            }

            }
        }
    }
// Muté, Soigné, Inspecté par le Psy, par le Généticien, par l'esp, par l'espion hacké,  

// Fonction pour afficher la liste des boutons des joueurs
function updatePlayerButtons() {
    buttonContainer.innerHTML = ''; // Vider la liste actuelle
    const esp = players.find(player => player.role === 'esp');
    players.forEach((player, index) => {
        const button = document.createElement('button');
        button.classList.add('player-button');
        button.textContent = player.name;

        // Ajout d'effet lumineux si sélectionné
        if (selectedPlayerIndex === index) {
            button.classList.add('selected');
        }
        if (player.role === 'esp') {
            button.classList.add('esp-light-effect');
        }

        if (player.status === 'mort') {
            button.classList.add('dead-light-effect');
        }

        // Désactiver la sélection si psy n'est pas "sain"
        if (esp.status === 'sain') {
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
    let turn = parseInt(localStorage.getItem('turn'), 10); // Récupérer 'turn' et le convertir en nombre

    if (selectedPlayerIndex !== null) {
        // Mettre à jour la trace du joueur sélectionné avec l'ancienne valeur de 'turn'
        players[selectedPlayerIndex].trace += " E" + turn;
        
        // Sauvegarder les modifications dans le localStorage
        savePlayersToLocalStorage();
        

    }
            // Incrémenter 'turn' de 1
            turn += 1;

            // Enregistrer la nouvelle valeur de 'turn' dans le localStorage
            localStorage.setItem('turn', turn.toString());
    
            // Redirection vers la page bilan
            window.location.href = "bilan.html";
});

// Bouton de sortie pour réinitialiser "turn" et retourner à la page équipe
document.getElementById('exitButton').addEventListener('click', () => {
    localStorage.setItem('turn', '1');
    window.location.href = 'equipe.html';
});
