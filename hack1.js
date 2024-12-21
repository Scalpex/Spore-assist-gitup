// Afficher le compteur de nuit depuis le localStorage
const turnDisplay = document.getElementById('turnDisplay');
turnDisplay.textContent = localStorage.getItem('turn');

// Récupérer la liste des joueurs du localStorage
let players = JSON.parse(localStorage.getItem('players')) || [];

// Définir la variable globale pour la sélection d'action
let actionSelected = null;

const infoButton = document.getElementById('infoButton');
const psyButton = document.getElementById('psyButton');
const geneButton = document.getElementById('geneButton');

function skip(){
    const turn = localStorage.getItem('turn');
    const hack = players.find(player => player.role === 'hack');

    if (turn !== 1 && !hack){
        window.location.href = "indic.html"
    }
}
skip();

// Fonction pour afficher la phrase conditionnelle dans le statusMessage
function updatestatusMessage() {
    const statusMessageDiv = document.getElementById('statusMessage');
    const hack = players.find(player => player.role === 'hack');

    // Afficher le statut du hacker
    if (hack.status === 'para') {
        statusMessageDiv.innerHTML = `Le hacker est <span class="status-paralyzed">paralysé</span>.`;
        hideActionButtons(); // Cacher les boutons d'action si le hacker n'est pas "sain"
    } else if (hack.status === 'mut') {
        statusMessageDiv.innerHTML = `Le hacker est <span class="status-mutated">muté</span>.`;
        hideActionButtons();
    } else if (hack.status === 'mort') {
        statusMessageDiv.innerHTML = `Le hacker est <span class="status-dead">mort</span>.`;
        hideActionButtons();
    } else if (hack.status === 'sain') {
        showActionButtons(); // Afficher les boutons d'action si le hacker est "sain"
    }
}


function hidePrevButton(){
    const prev = localStorage.getItem('hacking')
    if (prev === "inf"){
        infoButton.disabled = true;
        infoButton.classList.add('status-disable');

    }

    else if (prev === "psy"){
        psyButton.disabled = true;
        psyButton.classList.add('status-disable');

    }

    else if (prev === "gen"){
        geneButton.disabled = true;
        geneButton.classList.add('status-disable');

    }
}

hidePrevButton();

// Fonction pour enregistrer les joueurs dans le localStorage
function savePlayersToLocalStorage() {
    localStorage.setItem('players', JSON.stringify(players));
}

// Fonction pour cacher les boutons d'action
function hideActionButtons() {
    document.querySelector('.action-selection').style.display = 'none';
    document.getElementById('resultMessage').style.display = 'none';
}

// Fonction pour afficher les boutons d'action
function showActionButtons() {
    document.querySelector('.action-selection').style.display = 'flex';
    document.getElementById('resultMessage').style.display = 'block';
}


function updatresultMessage() {
    const resultMessage = document.getElementById('resultMessage');
    const turn = localStorage.getItem('turn'); // Récupérer la valeur de 'turn'
    const psyked = players.filter(player => player.trace.includes("Y" + turn));
    const psykedName = psyked.length > 0 ? psyked[0].name : "Personne";
    const psykedResult = psyked.length > 0 ? psyked[0].status : null;
    
    const gened = players.filter(player => player.trace.includes("G" + turn));
    const genedName = gened.length > 0 ? gened[0].name : "Personne";
    const genedResult = gened.length > 0 ? gened[0].genome : null;

    

    if (actionSelected === 'info') {
        const inf = players.find(player => player.role === 'info');
        if (inf.status === 'mort' || inf.status === 'mut' || inf.status === 'para') {
            resultMessage.innerHTML = `(L'informaticien est innactif cette nuit.)`;
        } else {
        const mutantsCount = players.filter(player => player.status === 'mut').length;
        resultMessage.innerHTML = `(Il y a ${mutantsCount} mutant(s) à bord)`;
        }
    } else if (actionSelected === 'psy') {
        const psy = players.find(player => player.role === 'psy');
        if (psy.status === 'mort' || psy.status === 'mut' || psy.status === 'para') {
            resultMessage.innerHTML = `(Le Psy est innactif cette nuit.)`;
        } else {
            const inspectionResult = psykedResult === 'mut' ? 'mutant' : (psykedResult === 'mort' ? 'mort' : 'sain');
            resultMessage.innerHTML = `(le Psy a inspecté ${psykedName}. Résultat : ${inspectionResult}.)`;
        }
    } else if (actionSelected === 'gene') {
        const gene = players.find(player => player.role === 'gene');
        if (gene.status === 'mort' || gene.status === 'mut' || gene.status === 'para') {
            resultMessage.innerHTML = `(Le Génétic. est innactif cette nuit.)`;
        } else {
            const genomeResult = genedResult === 'hôte' ? 'hôte' : (genedResult === 'résist' ? 'résistant' : 'neutre');
            resultMessage.innerHTML = `(le Génétic. a inspecté ${genedName}. Résultat : ${genomeResult}.)`;
        }
    }
}

// Appeler cette fonction pour charger le statut initial du hacker
updatestatusMessage();

// Sélection des boutons d'action


// Gestionnaire d'événements pour chaque bouton d'action
infoButton.addEventListener('click', () => {
    actionSelected = 'info';
    infoButton.classList.add('selected');
    psyButton.classList.remove('selected');
    geneButton.classList.remove('selected');
    updatresultMessage();
});

psyButton.addEventListener('click', () => {
    actionSelected = 'psy';
    psyButton.classList.add('selected');
    infoButton.classList.remove('selected');
    geneButton.classList.remove('selected');
    updatresultMessage();
});

geneButton.addEventListener('click', () => {
    actionSelected = 'gene';
    geneButton.classList.add('selected');
    infoButton.classList.remove('selected');
    psyButton.classList.remove('selected');
    updatresultMessage();
});
 

document.getElementById('nextButton').addEventListener('click', () => {
    const info = players.find(player => player.role === 'info');
    const psy = players.find(player=> player.role === 'psy');
    const gene = players.find(player=> player.role === 'gene');
    const turn = localStorage.getItem('turn');
   
    if (actionSelected !== null){
        if (actionSelected === 'info'){
            info.trace += " H" + turn;
            localStorage.setItem('hacking','inf');}
        if (actionSelected === 'psy'){
            psy.trace += " H" + turn;
            localStorage.setItem('hacking','psy');}
        if (actionSelected === 'gene'){
            gene.trace += " H" + turn;
            localStorage.setItem('hacking','gen');}
        }
        savePlayersToLocalStorage();
 
        // Redirection selon le tour
    if (turn === "1") {
        window.location.href = "at_fana.html";
    } else {
        window.location.href = "indic.html";
        }
    });
    


// Bouton de sortie pour retourner à la page "équipe" et réinitialiser la variable "turn" à 1
document.getElementById('exitButton').addEventListener('click', () => {
    localStorage.setItem('turn', '1');
    window.location.href = 'equipe.html';
});
