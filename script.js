const winningCombination = ['rouge', 'vert']; // combinaison gagnante 
const availableColors = ['rouge', 'bleu', 'vert', 'jaune']; // 4 couleurs possibles


//Éléments du DOM

const notValidateColors = document.getElementById("not-validate-colors")
const playerInputValue = document.getElementById("player-input")
const guessButton = document.getElementById("guess-button")
const closeCombination = document.getElementById("close-combination")
const tryAgain = document.getElementById("try-again")
const winningGame = document.getElementById("winning-combination")
const remainingAttempts = document.getElementById ("remaining-attempts")
const outOfAttempts = document.getElementById ("out-of-try")

// Étape 1

function guessingCombinationWithTwoColors(playerCombination) {

    // Réinitialisation des messages d'erreur
    notValidateColors.innerHTML = ""; 
    closeCombination.innerHTML = ""; 
    tryAgain.innerHTML = "";

    console.log("Length of Player Combination:", playerCombination.length); // Pour vérifier la longueur
    // Vérification de la longueur de la combinaison
    if (!Array.isArray(playerCombination) || playerCombination.length !== 2) {
        notValidateColors.innerHTML = "Vous devez deviner une combinaison de deux couleurs.";
        return false; // Retourner false en cas d'erreur
    }

    // Vérification des couleurs valides
    for (let color of playerCombination) {
        if (!availableColors.includes(color)) {
             closeCombination.innerHTML = "Une des couleurs devinées n'est pas valide.";
             return false; // Retourner false en cas d'erreur
        }
    }

    console.log("Player combination:", playerCombination); console.log("Winning combination:", winningCombination);

    // Comparaison avec la combinaison gagnante
    if (playerCombination[0] === winningCombination[0] && playerCombination[1] === winningCombination[1]) {
        return true; // Retourner true si la combinaison est correcte
    } else {
        tryAgain.innerHTML = "Essayez encore !";
        return false; // Retourner false si la combinaison est incorrecte
    }
}


// Exemple d'appel de la fonction avec une combinaison du joueur
let playerCombination = playerInputValue.value 
let message = guessingCombinationWithTwoColors(playerCombination);
console.log(message); 


function rightCombinationOrNot() {
    const playerInputValue = document.getElementById("player-input").value;
    
    //permet d'enlever les espaces avant et après chaque mot
    const playerCombination = playerInputValue.split(',').map(color => color.trim());

    // Comparer la combinaison du joueur avec la combinaison gagnante
    if (playerCombination.length === 2 &&
        playerCombination[0] === winningCombination[0] &&
        playerCombination[1] === winningCombination[1]) {
        return true;
    } else {
        return false;
    }
}

function getPlayerCombination() { 
const playerInputValue = document.getElementById("player-input").value; 
return playerInputValue.split(',').map(color => color.trim());
}

const maxAttempts = 12; 
let attempts = 0; 

function gameStillOn() {
    const playerCombination = getPlayerCombination();
    console.log("Player Combination:", playerCombination);
    const isCorrect = guessingCombinationWithTwoColors(playerCombination);

    // Incrémenter le compteur d'essais après chaque tentative
    attempts++;
    remainingAttempts.innerHTML = `Essais restants : ${maxAttempts - attempts}`;

    if (isCorrect) {
        winningGame.innerHTML = "Vous avez gagné !";
    } else if (attempts >= maxAttempts) {
        outOfAttempts.innerHTML = "Vous avez épuisé tous vos essais.";
    }
}

// Ajouter l'événement sur le bouton
guessButton.addEventListener("click", gameStillOn);

// Initialiser les éléments affichés correctement dès le début
remainingAttempts.innerHTML = `Essais restants : ${maxAttempts}`;


