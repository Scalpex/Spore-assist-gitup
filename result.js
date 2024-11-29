

// Afficher le compteur de nuit depuis le localStorage
const turnDisplay = document.getElementById('turnDisplay');
turnDisplay.textContent = localStorage.getItem('turn');

// Récupérer la liste des joueurs et le nombre de votes blancs du localStorage
let players = JSON.parse(localStorage.getItem('players')) || [];
const blankVotes = parseInt(localStorage.getItem('blankVotes'), 10) || 0;
 // Initialiser l'index globalement
// Conteneur des boutons et élément pour le message d'état
const buttonContainer = document.querySelector('.button-container');
const statusMessageDiv = document.getElementById('statusMessage');
let preselectedIndex = null;

function updateDisplay() {
    buttonContainer.innerHTML = ''; // Réinitialiser le contenu des boutons

    const maxVoteCount = Math.max(...players.map(player => player.voteCount));
    const playersWithMaxVotes = players.filter(player => player.voteCount === maxVoteCount);
    const isTie = ((playersWithMaxVotes.length > 1) && (maxVoteCount > blankVotes)) || (blankVotes === maxVoteCount);
    const isBlank = maxVoteCount < blankVotes;
    const isPlayer = (maxVoteCount > blankVotes) && (playersWithMaxVotes.length === 1);

    // Afficher les boutons pour les joueurs
    players.forEach((player, index) => {
        if (player.voteCount > 0) {
            const button = document.createElement('button');
            button.classList.add('player-button');
            button.textContent = `${player.name} : ${player.voteCount} votes`;

            // Appliquer la classe "selected" si c'est le joueur pré-sélectionné
            if (index === preselectedIndex) {
                button.classList.add('selected');
            }

            if (isTie) {
                if (player.voteCount < maxVoteCount){button.setAttribute('disabled', 'true')}
                button.addEventListener('click', () => {
                    // Mettre à jour la sélection
                    document.querySelectorAll('.player-button').forEach(btn => btn.classList.remove('selected'));
                    button.classList.add('selected');
                    preselectedIndex = index; // Met à jour l'index sélectionné
                    updateDisplay();
                });}
            else if (isPlayer) {
                // Identifier l'index du joueur avec le maximum de votes
                const playerWithMaxVotesIndex = players.findIndex(player => player.voteCount === maxVoteCount);
                if (index === playerWithMaxVotesIndex) {
                    button.classList.add('selected'); // Ajouter "selected" au bon bouton
                    preselectedIndex = playerWithMaxVotesIndex;
                    button.setAttribute('disabled', 'true');;
                    }
            }
            else { button.setAttribute('disabled', 'true');}
           buttonContainer.appendChild(button);
        }});

    // Ajouter le bouton "Vote blanc" si applicable
    if (blankVotes > 0) {
        const blankVoteButton = document.createElement('button');
        blankVoteButton.classList.add('player-button');
        blankVoteButton.textContent = `Vote blanc : ${blankVotes} votes`;

        if (preselectedIndex === 'blank') {
            blankVoteButton.classList.add('selected');
        }

        if (isTie) {
            blankVoteButton.addEventListener('click', () => {
                // Mettre à jour la sélection
                document.querySelectorAll('.player-button').forEach(btn => btn.classList.remove('selected'));
                blankVoteButton.classList.add('selected');
                preselectedIndex = 'blank'; // Met à jour pour vote blanc
            })
        if (maxVoteCount > blankVotes){blankVoteButton.setAttribute('disabled', 'true');}
        
        } else if (isBlank) {
            blankVoteButton.classList.add('selected');
            blankVoteButton.setAttribute('disabled', 'true');
            
        } else {
            blankVoteButton.setAttribute('disabled', 'true');
        }

        buttonContainer.appendChild(blankVoteButton);
    }

    // Mettre à jour le message d'état
    if (isBlank) {
        statusMessageDiv.textContent = "La majorité des joueurs a voté blanc. Personne n'est éliminé.";
    } else if (isPlayer) {
        statusMessageDiv.textContent = `La majorité des joueurs ont voté pour ${playersWithMaxVotes[0].name}.`;
    } else if (isTie) {
        const lead = players.find(player => player.rank === 'chef');
        if (!lead) {
            statusMessageDiv.textContent = "Il y a égalité ! Aucun leader n'est défini pour trancher.";
        } else {
            statusMessageDiv.textContent = `Il y a égalité ! C'est votre leader : ${lead.name} qui doit trancher !`;
        }
    }
}

updateDisplay();



// Fonction pour enregistrer les joueurs dans le localStorage
function savePlayersToLocalStorage() {
    localStorage.setItem('players', JSON.stringify(players));}


function resetAllVotes() {
    players.forEach(player => {
        if (player.status === "para") {
            player.status = "sain";}
        player.voteTarget = "";
        player.voteCount = 0;
    });
    savePlayersToLocalStorage();
}

// Bouton "next"
document.getElementById("validateNightButton").addEventListener('click', () => {
    const turn = localStorage.getItem('turn');
    const maxVoteCount = Math.max(...players.map(player => player.voteCount));
    const playersWithMaxVotes = players.filter(player => player.voteCount === maxVoteCount);
    const isTie = ((playersWithMaxVotes.length > 1) && (maxVoteCount > blankVotes)) || (blankVotes === maxVoteCount);
    const isBlank = maxVoteCount < blankVotes;
    const isPlayer = (maxVoteCount > blankVotes) && (playersWithMaxVotes.length === 1);

    // Si aucun joueur ou vote blanc n'est sélectionné
    if (isTie && preselectedIndex === null) {
        alert("Aucun choix n'a été effectué.");
        return;
    }

    // Si le vote blanc est sélectionné
    if (isBlank) {
        resetAllVotes();
        window.location.href = 'para.html';
        return;
    }

    // Si un joueur est sélectionné
    const selectedPlayer = players[preselectedIndex];
    if (selectedPlayer) {
        selectedPlayer.status = "mort";
        selectedPlayer.trace = (selectedPlayer.trace || "") + " TV" + turn;

        if (selectedPlayer.rank === "chef") {
            savePlayersToLocalStorage();
            alert("Attention ! Le leader est mort, vous devez en choisir un nouveau");
            resetAllVotes();
            window.location.href = 'leader.html';
        } else {
            savePlayersToLocalStorage();
            resetAllVotes();
            window.location.href = 'para.html';
        }
    } else {
        resetAllVotes();
        window.location.href = 'para.html';
    }
});

document.getElementById('exitButton').addEventListener('click', () => {
    localStorage.setItem('turn', '1');
    window.location.href = 'equipe.html';
});


