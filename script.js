const choices = ['rock', 'paper', 'scissors'];
const choiceButtons = document.querySelectorAll('.choice-btn');
const playerChoiceDisplay = document.getElementById('player-choice');
const computerChoiceDisplay = document.getElementById('computer-choice');
const resultDisplay = document.getElementById('result');

choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.id;
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
        
        playerChoiceDisplay.textContent = getEmoji(playerChoice) + ' ' + capitalize(playerChoice);
        computerChoiceDisplay.textContent = getEmoji(computerChoice) + ' ' + capitalize(computerChoice);
        
        determineWinner(playerChoice, computerChoice);
    });
});

function getEmoji(choice) {
    switch (choice) {
        case 'rock': return '🪨';
        case 'paper': return '  /span>  ;
        case 'scissors': return '✂️';
        default: return '';
    }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function determineWinner(player, computer) {
    if (player === computer) {
        resultDisplay.textContent = "It's a Tie!";
        resultDisplay.className = 'tie';
    } else if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        resultDisplay.textContent = "You Win!";
        resultDisplay.className = 'win';
    } else {
        resultDisplay.textContent = "You Lose!";
        resultDisplay.className = 'loss';
    }
}
