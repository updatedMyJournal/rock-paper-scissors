let logMessage = document.querySelector('.logs').firstElementChild;
let restartButton = document.querySelector('.restart');
let playerButtonsWrapper = document.querySelector('.buttons-wrapper.player');
let playerScoreElement = document.querySelector('.player-score');
let computerButtonsWrapper = document.querySelector('.buttons-wrapper.computer');
let computerScoreElement = document.querySelector('.computer-score');
let currentAnimatedComputerButton;

let playerSelection;
let playerTimer;
let computerTimer;
let playerScore = 0;
let computerScore = 0;

// prevent mouse selection
document.addEventListener('pointerdown', (e) => e.preventDefault());

restartButton.onpointerdown = (e) => {
  e.target.setPointerCapture(e.pointerId);
  animate(e.target);
};

restartButton.onpointerup = (e) => {
  removeAnimate(e.target);
  reset();
};

playerButtonsWrapper.onpointerdown = (e) => {
  let button = e.target.closest('[data-name]');

  if (!button) return;

  button.setPointerCapture(e.pointerId);
  animate(button);
};

playerButtonsWrapper.onpointerup = (e) => {
  let button = e.target.closest('[data-name]');

  if (!button) return;

  if (isScoreTooHigh()) reset();

  logMessage.style.color = '';
  playerSelection = button.dataset.name;

  removeAnimate(button);
  removeHightlight();
  highlightButton(button);
  playRound();

  animate(currentAnimatedComputerButton);
  setTimeout(() => removeAnimate(currentAnimatedComputerButton), 100);

  if (isScoreTooHigh()) {
    restartButton.classList.remove('hide');
    logMessage.style.fontSize = '1.5em';

    if (playerScore === computerScore) {
      logMessage.textContent = 'It\'s a draw!';
    } else if (playerScore > computerScore) {
      logMessage.style.color = 'var(--player-color)';
      logMessage.textContent = 'You win!';
    } else {
      logMessage.style.color = 'var(--computer-color)';
      logMessage.textContent = 'You lose!';
    }
  }
};

function playRound() {
  let computerSelection = computerPlay();
  let winMessage = `You win! ${playerSelection} beats ${computerSelection}`;
  let loseMessage = `You lose! ${computerSelection} beats ${playerSelection}`;
  let drawMessage = `It's a draw! ${playerSelection} and ${computerSelection} are equal!`;
  let computerLc = computerSelection.toLowerCase()
  let playerLc = playerSelection.toLowerCase();

  if (playerLc === computerLc) {
    logMessage.textContent = drawMessage;
    return;
  }
  
  if (
    (playerLc === 'rock' && computerLc === 'scissors')
    || (playerLc === 'paper' && computerLc === 'rock')
    || (playerLc === 'scissors' && computerLc === 'paper')
  ) {
    logMessage.textContent = winMessage;
    playerScore += 1;
    playerScoreElement.textContent = playerScore;
    return;
  } 

  logMessage.textContent = loseMessage;
  computerScore += 1;
  computerScoreElement.textContent = computerScore;
}

function computerPlay() {
  let rockButtonComputer = document.querySelector('.rock.computer');
  let paperButtonComputer = document.querySelector('.paper.computer');
  let scissorsButtonComputer = document.querySelector('.scissors.computer');
  let random = 1 + Math.floor(Math.random() * 3);

  switch(random) {
    case 1:
      currentAnimatedComputerButton = rockButtonComputer;
      highlightButton(rockButtonComputer);
      animate(rockButtonComputer);

      return 'Rock';
    case 2:
      currentAnimatedComputerButton = paperButtonComputer;
      highlightButton(paperButtonComputer);
      animate(paperButtonComputer);

      return 'Paper';
    case 3:
      currentAnimatedComputerButton = scissorsButtonComputer;
      highlightButton(scissorsButtonComputer);
      animate(scissorsButtonComputer);

      return 'Scissors';
  }
}

function highlightButton(elem) {
  let selection;

  if (elem.classList.contains('player')) {
    selection = 'player-highlight';
    elem.classList.add(selection);
    playerTimer = setTimeout(() => elem.classList.remove(selection), 2000);
  } else {
    selection = 'computer-highlight';
    elem.classList.add(selection);
    computerTimer = setTimeout(() => elem.classList.remove(selection), 2000);
  }
}

function removeHightlight() {
  clearTimeout(playerTimer);
  clearTimeout(computerTimer);

  let highlightedPlayerButton = playerButtonsWrapper.querySelector('.player.player-highlight');
  let highlightedComputerButton = computerButtonsWrapper.querySelector('.computer.computer-highlight');

  if (highlightedPlayerButton) highlightedPlayerButton.classList.remove('player-highlight');

  if (highlightedComputerButton) highlightedComputerButton.classList.remove('computer-highlight');
}

function isScoreTooHigh() {
  return (playerScore >= 5 || computerScore >= 5);
}

function reset() {
  playerScore = 0;
  computerScore = 0;
  playerScoreElement.textContent = 0;
  computerScoreElement.textContent = 0;
  logMessage.style.fontSize = '';
  logMessage.style.color = '';
  logMessage.textContent = '';
  restartButton.classList.add('hide');
  removeHightlight();
}

function animate(elem) {
  elem.style.transform = 'translateY(10%)';
}

function removeAnimate(elem) {
  elem.style.transform = '';
}
