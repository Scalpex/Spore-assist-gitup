// Récupérer les joueurs depuis le localStorage
let players = JSON.parse(localStorage.getItem('players')) || [];

// Fonction pour afficher le compteur de nuit depuis le localStorage
const turnDisplay = document.getElementById('turnDisplay');
turnDisplay.textContent = localStorage.getItem('turn');


// Variables pour les sélections
let selectedVoterIndex = null;
let selectedTargetIndex = null;

// Afficher les joueurs dans les colonnes
function displayPlayers() {
    const alivePlayers = players.filter(player => player.status !== 'mort');
    const voterList = document.getElementById('voterList');
    const targetList = document.getElementById('targetList');
    const blankVoteButton = document.getElementById('blankVoteButton');
    
    voterList.innerHTML = '';
    targetList.innerHTML = '';

    alivePlayers.forEach((player, index) => {
        // Bouton pour la colonne de gauche (votants)
        const voterButton = document.createElement('button');
        voterButton.textContent = player.name;
        voterButton.classList.add('player-button');
        voterButton.onclick = () => selectVoter(index);

        // Appliquer le filigrane si le joueur a déjà voté
        if (player.voteTarget !== null && player.voteTarget !== "") {
            voterButton.classList.add('player-voted');
        }

        if (index === selectedVoterIndex) voterButton.classList.add('selected');
        voterList.appendChild(voterButton);

        // Bouton pour la colonne de droite (cibles)
        const targetButton = document.createElement('button');
        targetButton.textContent = player.name;
        targetButton.classList.add('player-button');
        targetButton.onclick = () => selectTarget(index);
        if (index === selectedTargetIndex) targetButton.classList.add('selected');
        targetList.appendChild(targetButton);
    });

    // Appliquer la classe de sélection pour le vote blanc si sélectionné
    if (selectedTargetIndex === -1) {
        blankVoteButton.classList.add('selected');
    } else {
        blankVoteButton.classList.remove('selected');
    }

    // Compteur de votes restants
    updateRemainingCount();
   
}



// Sélectionner un votant
function selectVoter(index) {
    const alivePlayers = players.filter(player => player.status !== 'mort');
    const turn = parseInt(localStorage.getItem('turn'), 10); // Assurez-vous que 'turn' est un nombre
    selectedVoterIndex = index;
    selectedTargetIndex = alivePlayers[index].voteTarget  || null;
    const player = alivePlayers[index];

    if (alivePlayers[index].voteTarget !== "") {
        selectedTargetIndex = null;
    }

    // Vérification du joueur résistant
    if (player.genome === "résist" && player.trace && player.trace.includes("M" + (turn - 1))) {
        alert("Attention ! Tu es le joueur résistant ! La mutation n'a eu aucun effet sur toi ! Tu ne pouras jamais devenir un Mutant et ce quoi qu'il arrive");
    }

    // Vérification du joueur hôte
    if (player.genome === "hôte" && player.status === "mut" && player.trace && player.role === "Mutant" && player.trace.includes("S" + (turn - 1))) {
        alert("Attention ! Tu as le gène 'hôte' ! Le soin des médecins n'a eu aucun effet sur toi. tu est et tu resteras toujours un MUTANT quoi qu'il arrive");
    }

    if (player.role === "fana" && player.status !== "mut"){
        kaboomButton.classList.remove('hidden');
        kaboomButton.classList.add('kaboombutton-style'); // Ajout de la même classe que le bouton "Vote blanc"
    } 
    if (player.role !== "fana" || player.status === "mut"){
        kaboomButton.classList.add('hidden');
        kaboomButton.classList.remove('kaboombutton-style');
    }

    // Mettre à jour l'affichage des joueurs
    displayPlayers();
}

// Sélectionner une cible
function selectTarget(index) {
    selectedTargetIndex = index;
    displayPlayers();
}


// Sélectionner le vote blanc comme cible
document.getElementById('blankVoteButton').addEventListener('click', () => {
    if (selectedVoterIndex !== null) {
        selectedTargetIndex = -1; // Utiliser -1 pour représenter le vote blanc
        displayPlayers(); // Mettre à jour l'affichage
    } else {
        alert('Veuillez sélectionner un votant avant de voter blanc.');
    }
});

// Enregistrer le vote
document.getElementById('submitVoteButton').addEventListener('click', () => {
    const alivePlayers = players.filter(player => player.status !== 'mort');
    kaboomButton.classList.add('hidden');
    kaboomButton.classList.remove('kaboombutton-style');
    if (selectedVoterIndex !== null && selectedTargetIndex !== null) {
        // Vérifier si le vote blanc est sélectionné
        if (selectedTargetIndex === -1) {
            alivePlayers[selectedVoterIndex].voteTarget = 'blanc';
        } else {
            alivePlayers[selectedVoterIndex].voteTarget = selectedTargetIndex;
        }

        // Enregistrer les données dans le localStorage
        localStorage.setItem('players', JSON.stringify(players));

        // Réinitialiser la sélection et mettre à jour l'affichage
        resetSelection();
        displayPlayers();
    } else {
        alert('Veuillez sélectionner un votant et une cible.');
    }
});
//effet kaboom
document.getElementById('kaboomButton').addEventListener('click', () => {
    const turn = localStorage.getItem('turn');
    const alivePlayers = players.filter(player => player.status !== 'mort');
    const selectedTarget = alivePlayers[selectedTargetIndex];
    kaboomButton.classList.add('hidden');
    kaboomButton.classList.remove('kaboombutton-style');
    if (selectedTargetIndex === -1 || selectedTargetIndex === null ) {
        alert('Veuillez sélectionner une cible à dégommer !');
    }
    else {
        alivePlayers[selectedVoterIndex].status = 'mort';
        alivePlayers[selectedVoterIndex].trace += " Tk" + turn;
        alivePlayers[selectedTargetIndex].status = 'mort';
        alivePlayers[selectedTargetIndex].trace += " Tk" + turn;
        alivePlayers[selectedVoterIndex].voteTarget = null;
        alivePlayers[selectedTargetIndex].voteTarget = null;
        // Enregistrer les données dans le localStorage
        localStorage.setItem('players', JSON.stringify(players));

        
        if (selectedTarget && selectedTarget.rank === "chef") {
        window.location.href = 'leadKaboom.html';
}


        // Réinitialiser la sélection et mettre à jour l'affichage
        resetSelection();
        displayPlayers();
        updateRemainingCount();
    }});

   


// Réinitialiser les sélections
function resetSelection() {
    selectedVoterIndex = null;
    selectedTargetIndex = null;
}


function countVotesForPlayers() {
    // Compter les votes pour chaque joueur
    const alivePlayers = players.filter(player => player.status !== 'mort');
    alivePlayers.forEach(voter => {
        if (typeof voter.voteTarget === "number") {
            // Utiliser l'indice pour identifier le joueur cible dans alivePlayers
            const targetPlayer = alivePlayers[voter.voteTarget];
            if (targetPlayer) {
                targetPlayer.voteCount += 1; // Incrémenter le nombre de votes reçus pour le joueur cible
            }
        }
    });

    console.log("Nombre de votes pour chaque joueur :");
    alivePlayers.forEach(player => console.log(`${player.name}: ${player.voteCount} votes`));
}
// 2. Fonction pour compter et enregistrer le nombre de votes blancs dans le localStorage
function countAndSaveBlankVotes() {
    const alivePlayers = players.filter(player => player.status !== 'mort');
    // Compter le nombre de votes blancs (voteTarget est nul ou vide)
    const blankVotes = alivePlayers.filter(player => player.voteTarget === "blanc").length;
    
    // Enregistrer le nombre de votes blancs dans le localStorage
    localStorage.setItem('blankVotes', blankVotes);

    console.log(`Nombre de votes blancs enregistrés dans le localStorage : ${blankVotes}`);
}

// Mettre à jour le compteur de votes restants
function updateRemainingCount() {
    const alivePlayers = players.filter(player => player.status !== 'mort');
    const votesRemaining = alivePlayers.filter(player => player.voteTarget === null || player.voteTarget === "").length;
    document.getElementById('voteCounter').textContent = `Joueurs restants à voter : ${votesRemaining}`;

    const showResultsButton = document.getElementById('showResultsButton');
    
    // Afficher le bouton de résultats quand tous ont voté
    if (votesRemaining === 0) {
        showResultsButton.classList.remove('hidden');
        showResultsButton.classList.add('button-style'); // Ajout de la même classe que le bouton "Vote blanc"
    } else {
        showResultsButton.classList.add('hidden');
        showResultsButton.classList.remove('button-style');
    }
   
}

// Rediriger vers "result.html" au clic du bouton (attendre que le bouton soit visible)
document.addEventListener('DOMContentLoaded', () => {
    const showResultsButton = document.getElementById('showResultsButton');
    showResultsButton.addEventListener('click', () => {
        countAndSaveBlankVotes();
        countVotesForPlayers() ;
        localStorage.setItem('players', JSON.stringify(players));

        window.location.href = 'result.html';
    });
});



// Afficher les boutons des joueurs au chargement de la page
displayPlayers();

// Bouton de sortie pour réinitialiser "turn" et retourner à la page équipe
document.getElementById('exitButton').addEventListener('click', () => {
    localStorage.setItem('turn', '1');
    window.location.href = 'equipe.html';
});