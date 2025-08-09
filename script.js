// Rock Paper Scissors Lizard Spock — script.js

const choices = [
  { id: 'rock', emoji: '🪨' },
  { id: 'paper', emoji: '📄' },
  { id: 'scissors', emoji: '✂️' },
  { id: 'lizard', emoji: '🦎' },
  { id: 'spock', emoji: '🖖' }
];

const winningCases = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['spock', 'paper'],
  spock: ['scissors', 'rock']
};

let playerScore = 0;
let computerScore = 0;
let roundsToWin = 2; // best of 3 default -> first to 2

const playerScoreEl = document.getElementById('playerScore');
const computerScoreEl = document.getElementById('computerScore');
const resultEl = document.querySelector('.result');
const movesContainer = document.getElementById('moves');
const resetBtn = document.getElementById('resetBtn');
const bestOfSelect = document.getElementById('bestOf');
const roundText = document.getElementById('roundText');

function setBestOf(val){
  const num = Number(val);
  // best of N -> first to Math.ceil(N/2)
  roundsToWin = Math.ceil(num/2);
  roundText.textContent = `First to ${roundsToWin} wins the match. Press R to reset.`;
}

bestOfSelect.addEventListener('change', (e)=> setBestOf(e.target.value));
setBestOf(bestOfSelect.value);

// attach handlers to buttons
movesContainer.addEventListener('click', (e)=>{
  const btn = e.target.closest('.move-btn');
  if(!btn) return;
  const playerMove = btn.dataset.move;
  playRound(playerMove, btn);
});

// keyboard shortcuts: 1-5 for moves, R to reset
window.addEventListener('keydown', (e)=>{
  if(e.key === 'r' || e.key === 'R') resetGame();
  const keyMap = { '1':'rock','2':'paper','3':'scissors','4':'lizard','5':'spock' };
  if(keyMap[e.key]){
    // find button and simulate click
    const btn = document.querySelector(`.move-btn[data-move="${keyMap[e.key]}"]`);
    if(btn) btn.click();
  }
});

resetBtn.addEventListener('click', resetGame);

function getComputerMove(){
  const idx = Math.floor(Math.random()*choices.length);
  return choices[idx].id;
}

function playRound(playerMove, btnEl){
  if(playerScore >= roundsToWin || computerScore >= roundsToWin) return; // match over

  // highlight chosen button briefly
  document.querySelectorAll('.move-btn').forEach(b=>b.classList.remove('chosen'));
  btnEl.classList.add('chosen');
  setTimeout(()=> btnEl.classList.remove('chosen'), 600);

  const computerMove = getComputerMove();

  // show choices with emoji
  const playerEmoji = choices.find(c=>c.id===playerMove).emoji;
  const computerEmoji = choices.find(c=>c.id===computerMove).emoji;

  if(playerMove === computerMove){
    resultEl.textContent = `⚖️ Tie — both chose ${playerEmoji}`;
    resultEl.style.color = '';
    return;
  }

  if(winningCases[playerMove].includes(computerMove)){
    playerScore++;
    playerScoreEl.textContent = playerScore;
    resultEl.textContent = `✅ You win — ${playerEmoji} beats ${computerEmoji}`;
    resultEl.style.color = 'lightgreen';
  } else {
    computerScore++;
    computerScoreEl.textContent = computerScore;
    resultEl.textContent = `❌ You lose — ${computerEmoji} beats ${playerEmoji}`;
    resultEl.style.color = '#ff9b9b';
  }

  // check for match winner
  if(playerScore >= roundsToWin || computerScore >= roundsToWin){
    const winner = playerScore > computerScore ? 'You win the match 🎉' : 'Computer wins the match 🤖';
    resultEl.textContent = `${winner} — final score ${playerScore} : ${computerScore}`;
    // small glow to winner
    if(playerScore>computerScore){
      playerScoreEl.parentElement.style.boxShadow = '0 8px 30px rgba(124,58,237,0.12)';
    } else {
      computerScoreEl.parentElement.style.boxShadow = '0 8px 30px rgba(255,80,80,0.08)';
    }
  }
}

function resetGame(){
  playerScore = 0; computerScore = 0;
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  resultEl.textContent = 'Make a move';
  resultEl.style.color = '';
  document.querySelectorAll('.move-btn').forEach(b=>b.classList.remove('chosen'));
  document.querySelectorAll('.score').forEach(c=> c.style.boxShadow='');
}

// graceful enhancement: ensure buttons exist if JS generated
(function ensureButtons(){
  // no-op for now — markup already contains buttons
})();