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
        concluMessage.innerHTML = `<I>(Pour le Maitre du jeu)</I><br>\
         Et je lui dévoile le Nombre de mutant si hack=>info <br>\
        ou bien la cible si hack=>psy/génét<br>\
        et si cette cible est donc: mutante ou non, pour le Psy.<br>\
        ou bien: hôte, réistante ou neutre pour le Genetic.<br><br>`;
        hideActionButtons(); // Cacher les boutons d'action si le hacker n'est pas "sain"
    } else if (hack.status === 'mut') {
        statusMessageDiv.innerHTML = `Le hacker est <span class="status-mutated">muté</span>.`;
        concluMessage.innerHTML = `<I>(Pour le Maitre du jeu)</I><br>\
        Et je lui dévoile le Nombre de mutant si hack=>info <br>\
       ou bien la cible si hack=>psy/génét<br>\
       et si cette cible est donc: mutante ou non, pour le Psy.<br>\
       ou bien: hôte, réistante ou neutre pour le Genetic.<br><br>`;
        hideActionButtons();
    } else if (hack.status === 'mort') {
        statusMessageDiv.innerHTML = `Le hacker est <span class="status-dead">mort</span>.`;
        concluMessage.innerHTML = `<I>(Pour le Maitre du jeu)</I><br>\
         Et je lui dévoile le Nombre de mutant si hack=>info <br>\
        ou bien la cible si hack=>psy/génét<br>\
        et si cette cible est donc: mutante ou non, pour le Psy.<br>\
        ou bien: hôte, réistante ou neutre pour le Genetic.<br><br>`;
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
    const mutantsCount = players.filter(player => player.status === 'mut').length;
    const inf = players.find(player => player.role === 'info');
    const psy = players.find(player => player.role === 'psy');
    const gene = players.find(player => player.role === 'gene');

    

    if (actionSelected === 'info') {
        if (inf.status === 'mort' || inf.status === 'mut' || inf.status === 'para') {
            resultMessage.innerHTML = `(L'informaticien est innactif cette nuit.)`;
            concluMessage.innerHTML = `<I>(Pour le Maitre du jeu)</I><br>\
         Et je lui dévoile le Nombre de mutant si hack=>info <br>\
        ou bien la cible si hack=>psy/génét<br>\
        et si cette cible est donc: mutante ou non, pour le Psy.<br>\
        ou bien: hôte, réistante ou neutre pour le Genetic.<br><br>`;
        } else {
        resultMessage.innerHTML = `(Il y a ${mutantsCount} mutant(s) à bord)`;
        }
    } else if (actionSelected === 'psy') {
        if (psy.status === 'mort' || psy.status === 'mut' || psy.status === 'para') {
            resultMessage.innerHTML = `(Le Psy est innactif cette nuit.)`;
            concluMessage.innerHTML = `<I>(Pour le Maitre du jeu)</I><br>\
            Et je lui dévoile le Nombre de mutant si hack=>info <br>\
           ou bien la cible si hack=>psy/génét<br>\
           et si cette cible est donc: mutante ou non, pour le Psy.<br>\
           ou bien: hôte, réistante ou neutre pour le Genetic.<br><br>`;
        } else {
            const inspectionResult = psykedResult === 'mut' ? 'mutant' : (psykedResult === 'mort' ? 'mort' : 'sain');
            resultMessage.innerHTML = `(le Psy a inspecté : ${psykedName}. <br>Résultat : ${inspectionResult}.)`;
        }
    } else if (actionSelected === 'gene') {
        if (gene.status === 'mort' || gene.status === 'mut' || gene.status === 'para') {
            resultMessage.innerHTML = `(Le Génétic. est innactif cette nuit.)`;
            concluMessage.innerHTML = `<I>(Pour le Maitre du jeu)</I><br>\
            Et je lui dévoile le Nombre de mutant si hack=>info <br>\
           ou bien la cible si hack=>psy/génét<br>\
           et si cette cible est donc: mutante ou non, pour le Psy.<br>\
           ou bien: hôte, réistante ou neutre pour le Genetic.<br><br>`;
        } else {
            const genomeResult = genedResult === 'hôte' ? 'hôte' : (genedResult === 'résist' ? 'résistant' : 'neutre');
            resultMessage.innerHTML = `(le Génét. a inspecté : ${genedName}. <br>Résultat : ${genomeResult}.)`;
        }
    }}




function updatconcluMessage() {
    const concluMessage = document.getElementById('concluMessage');
    const turn = localStorage.getItem('turn'); // Récupérer la valeur de 'turn'
    const mutantsCount = players.filter(player => player.status === 'mut').length;
    const psyked = players.filter(player => player.trace.includes("Y" + turn));
    const psykedName = psyked.length > 0 ? psyked[0].name : "Personne";
    const psykedResult = psyked.length > 0 ? psyked[0].status : null;
    const gened = players.filter(player => player.trace.includes("G" + turn));
    const genedName = gened.length > 0 ? gened[0].name : "Personne";
    const genedResult = gened.length > 0 ? gened[0].genome : null;
    const inspectionResult = psykedResult === 'mut' ? 'mutant' : (psykedResult === 'mort' ? 'mort' : 'sain');
    const genomeResult = genedResult === 'hôte' ? 'hôte' : (genedResult === 'résist' ? 'résistant' : 'neutre');
    const inf = players.find(player => player.role === 'info');
    const psy = players.find(player => player.role === 'psy');
    const gene = players.find(player => player.role === 'gene');
    


    if (actionSelected === 'info' && inf.status === 'sain') {
        concluMessage.innerHTML = `<I>(Pour le Maitre du jeu)</I><br>\
         Et je lui dévoile le <B>Nombre</B> de mutant si hack=>info <br>\
         <I>(montrer sur ses doigts) :</I> <B> ${mutantsCount} Mutant(s)</B><br>\
        ou bien la cible si hack=>psy/génét<br>\
        et si cette cible est donc: mutante ou non, pour le Psy.<br>\
        ou bien: hôte, réistante ou neutre pour le Genetic.<br><br>`
    }

    if (actionSelected === 'psy' && inspectionResult === 'mutant' && psy.status === 'sain') {
        concluMessage.innerHTML = `<I>(Pour le Maitre du jeu)</I><br>\
        Et je lui dévoile le nombre de mutant si hack=>info <br>\
        ou bien la cible si hack=>psy/génét : <B>${psykedName}</B> <br>\
        et si cette cible est donc: <B>Mutante</B> ou non, pour le Psy.<I><B>(Oui !)</B></I><br>\
        ou bien: hôte, réistante ou neutre pour le Genetic.\
        <br><br>`
    }

    if (actionSelected === 'psy' && inspectionResult !== 'mutant' && psy.status === 'sain') {
        concluMessage.innerHTML = `<I>(Pour le Maitre du jeu)</I><br>\
        Et je lui dévoile le nombre de mutant si hack=>info <br>\
        ou bien la cible si hack=>psy/génét : <B>${psykedName}</B> <br>\
        et si cette cible est donc: mutante ou <B>Non</B>, pour le Psy.<I><B>(Non !)</B></I><br>\
        ou bien: hôte, réistant ou neutre pour le Genetic.\
        <br><br>`
    }

    if (actionSelected === 'gene' && genomeResult === 'résistant' && gene.status === 'sain') {
        concluMessage.innerHTML = `<I>(Pour le Maitre du jeu)</I><br>\
        Et je lui dévoile le nombre de mutant si hack=>info <br>\
        ou bien la cible si hack=>psy/génét : <B>${genedName}</B><br>\
        et si cette cible est donc: mutante ou non, pour le Psy.<br>\
        ou bien: hôte <I>(Non)</I>, <B>Réistante </B><I>(Oui !)</I> ou neutre <I>(Non)</I> pour le Genetic.\
        <br><br>`
    }

    if (actionSelected === 'gene' && genomeResult === 'neutre' && gene.status === 'sain') {
        concluMessage.innerHTML = `<I>(Pour le Maitre du jeu)</I><br>\
        Et je lui dévoile le nombre de mutantssi hack=>info <br>\
        ou bien la cible si hack=>psy/génét : <B>${genedName}</B><br>\
        et si cette cible est donc: mutante ou non, pour le Psy.<br>\
        ou bien: hôte <I>(Non)</I>, réistante <I>(Non)</I> ou <B>Neutre</B> <I>(Oui !)</I> pour le Genetic.\
        <br><br>`
    }

    if (actionSelected === 'gene' && genomeResult === 'hôte' && gene.status === 'sain') {
        concluMessage.innerHTML = `<I>(Pour le Maitre du jeu)</I><br>\
        Et je lui dévoile le nombre de mutant si hack=>info <br>\
        ou bien la cible si hack=>psy/génét : <B>${genedName}</B><br>\
        et si cette cible est donc: mutante ou non, pour le Psy.<br>\
        ou bien: <B>Hôte </B><I>(Oui !)</I>, réistante <I>(Non)</I> ou neutre <I>(Non)</I> pour le Genetic.\
        <br><br>`
    }

}

     

// Appeler cette fonction pour charger le statut initial du hacker
updatestatusMessage();

// Gestionnaire d'événements pour chaque bouton d'action
infoButton.addEventListener('click', () => {
    actionSelected = 'info';
    infoButton.classList.add('selected');
    psyButton.classList.remove('selected');
    geneButton.classList.remove('selected');
    updatresultMessage();
    updatconcluMessage();
});

psyButton.addEventListener('click', () => {
    actionSelected = 'psy';
    psyButton.classList.add('selected');
    infoButton.classList.remove('selected');
    geneButton.classList.remove('selected');
    updatresultMessage();
    updatconcluMessage();
});

geneButton.addEventListener('click', () => {
    actionSelected = 'gene';
    geneButton.classList.add('selected');
    infoButton.classList.remove('selected');
    psyButton.classList.remove('selected');
    updatresultMessage();
    updatconcluMessage();
});
 

document.getElementById('nextButton').addEventListener('click', () => {
    const info = players.find(player => player.role === 'info');
    const psy = players.find(player=> player.role === 'psy');
    const gene = players.find(player=> player.role === 'gene');
    const turn = localStorage.getItem('turn');
    const hack = players.find(player => player.role === 'hack');
   
    if (hack.status === 'sain' && actionSelected === null){
        alert('Veuillez sélectionner un rôle à hacker.');
    }
    else {
   
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
    }});
    


// Bouton de sortie pour retourner à la page "équipe" et réinitialiser la variable "turn" à 1
document.getElementById('exitButton').addEventListener('click', () => {
    localStorage.setItem('turn', '1');
    window.location.href = 'equipe.html';
});

