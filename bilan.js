// Afficher le compteur de nuit depuis le localStorage
const turnDisplay = document.getElementById('turnDisplay');
turnDisplay.textContent = localStorage.getItem('turn');

// Récupérer la liste des joueurs du localStorage
let players = JSON.parse(localStorage.getItem('players')) || [];

// Afficher la liste des joueurs dans des boutons
const buttonContainer = document.querySelector('.button-container');
let selectedPlayerIndex = null;


// Fonction pour afficher la phrase conditionnelle dans le statusMessage
function updatemortStatusMessage() {

    const turn = parseInt(localStorage.getItem('turn'), 10); // Assurez-vous que 'turn' est un nombre
    const mortStatusMessageDiv = document.getElementById('mortStatusMessage');
    const morts = players.filter(player => player.trace.includes('T' + (turn - 1)));
    
    if (morts.length === 0) { // Utilisez '===' pour la comparaison
        mortStatusMessageDiv.innerHTML = `Tout le monde se réveille frais et reposé,<Br> prêt à démarrer cette nouvelle journée à bord !`;
    }
    else if (morts.length === 1) {
        const premierNom = morts[0].name;
        mortStatusMessageDiv.innerHTML = `Cette nuit, un joueur a été lâchement assassiné :<br> ${premierNom} est mort dans d'atroces souffrances.<br> Passons à l'autopsie pour voir son rôle et si c'était un mutant`; // Correction de la syntaxe de concaténation
    } 
    else if (morts.length === 2) {
        const premierNom = morts[0].name;
        const deuxiemeNom = morts[1].name;
        mortStatusMessageDiv.innerHTML = `Cette nuit, deux joueurs ont été lâchement assassinés :<br> ${premierNom} et ${deuxiemeNom} sont morts dans d'atroces souffrances.<br> Passons à l'autopsie pour voir leurs rôles et mutations`; // Correction de la syntaxe de concaténation
    } 
        }
updatemortStatusMessage();

function updatechefStatusMessage() {
    const chefStatusMessageDiv = document.getElementById('chefStatusMessage');
    const chef = players.find(player => player.rank === 'chef'); // Utilisez '===' pour la comparaison

    // Vérifiez que le chef existe et que son statut est "mort"
    if (chef && chef.status === 'mort') {
        chefStatusMessageDiv.innerHTML = `Votre chef est mort, veuillez élire un nouveau Leader.`;
        updatePlayerButtons(); // Affiche les boutons de joueurs pour choisir un nouveau chef
    } else {
        chefStatusMessageDiv.innerHTML = `Passons aux votes.`;
    }
}
updatechefStatusMessage();
     
   
// Muté, Soigné, Inspecté par le Psy, par le Généticien, par l'esp, par l'espion hacké,  

// Fonction pour afficher la liste des boutons des joueurs
function updatePlayerButtons() {
    buttonContainer.innerHTML = ''; // Vider la liste actuelle
    
    players.forEach((player, index) => {
        const button = document.createElement('button');
        button.classList.add('player-button');
        button.textContent = player.name;

        // Ajout d'effet lumineux si sélectionné
        if (selectedPlayerIndex === index) {
            button.classList.add('selected');
        }
        
        if (player.status === 'mort') {
            button.classList.add('dead-light-effect');
        }

        button.addEventListener('click', () => {
            // Désélectionner l'ancien joueur
            selectedPlayerIndex = index;
            updatePlayerButtons();
        });

        buttonContainer.appendChild(button);
    });
}



// Fonction pour enregistrer les joueurs dans le localStorage
function savePlayersToLocalStorage() {
    localStorage.setItem('players', JSON.stringify(players));
}

// Bouton "next"
document.getElementById('nextButton').addEventListener('click', () => {
    const chef = players.find(player => player.rank === 'chef') // Utilisez '===' pour la comparaison

    // Vérifiez que le chef existe et que son statut est "mort"

    if (chef && chef.status !== "mort"){
        window.location.href = "vote.html";
        }
    else if (chef && chef.status === 'mort')
            {chef.rank ="";
            players[selectedPlayerIndex].rank = "chef"; 
               savePlayersToLocalStorage();
               window.location.href = "vote.html"}
        
    else {alert("Attention ! Le leader est mort, vous devez en choisir un nouveau");}}


 );

// Bouton de sortie pour réinitialiser "turn" et retourner à la page équipe
document.getElementById('exitButton').addEventListener('click', () => {
    localStorage.setItem('turn', '1');
    window.location.href = 'equipe.html';
});


