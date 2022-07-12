let logMessage = document.querySelector('.logs').firstElementChild;
let restartButton = document.querySelector('.restart');
let playerButtonsWrapper = document.querySelector('.buttons-wrapper.player');
let playerScoreElement = document.querySelector('.player-score');
let computerButtonsWrapper = document.querySelector('.buttons-wrapper.computer');
let computerScoreElement = document.querySelector('.computer-score');

let playerScore = 0;
let computerScore = 0;
let playerSelection;
let currentAnimatedComputerButton;

let playerHighlightTimer;
let computerHighlightTimer;
let computerAnimateTimer;
let textAnimateTimer;

// prevent mouse selection
document.addEventListener('pointerdown', (e) => e.preventDefault());

restartButton.onpointerdown = (e) => {
  e.target.setPointerCapture(e.pointerId);
  animate(e.target);
};

restartButton.onpointerup = (e) => {
  if (e.target.className.includes('hide')) return;
  
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

  playerSelection = button.dataset.name;

  logMessage.style.opacity = '';
  logMessage.innerHTML = '';

  clearTimeout(textAnimateTimer);
  removeAnimate(button);
  removeAnimate(currentAnimatedComputerButton);
  removeAllHighlight();
  highlightButton(button);
  playRound();

  if (isScoreTooHigh()) {
    restartButton.classList.remove('hide');
    logMessage.style.fontSize = '1.5em';

    let finalMessage;

    if (playerScore === computerScore) {
      finalMessage = 'It\'s a draw!';
    } else if (playerScore > computerScore) {
      logMessage.style.color = 'var(--player-color)';
      finalMessage = 'You win!';
    } else {
      logMessage.style.color = 'var(--computer-color)';
      finalMessage = 'You lose!';
    }

    appendAndAnimateLogText(finalMessage);
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
    appendAndAnimateLogText(drawMessage);
    return;
  }
  
  if (
    (playerLc === 'rock' && computerLc === 'scissors')
    || (playerLc === 'paper' && computerLc === 'rock')
    || (playerLc === 'scissors' && computerLc === 'paper')
  ) {

    playerScore += 1;
    playerScoreElement.textContent = playerScore;

    if (!isScoreTooHigh()) appendAndAnimateLogText(winMessage);

    return;
  } 

  computerScore += 1;
  computerScoreElement.textContent = computerScore;

  if (!isScoreTooHigh()) appendAndAnimateLogText(loseMessage);
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
    playerHighlightTimer = setTimeout(() => elem.classList.remove(selection), 2000);
  } else {
    selection = 'computer-highlight';
    elem.classList.add(selection);
    computerHighlightTimer = setTimeout(() => elem.classList.remove(selection), 2000);
  }
}

function removeAllHighlight() {
  clearTimeout(playerHighlightTimer);
  clearTimeout(computerHighlightTimer);

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
  logMessage.style.opacity = '0';
  logMessage.innerHTML = '';

  restartButton.classList.add('hide');
  removeAllHighlight();
  clearTimeout(textAnimateTimer);
}

function animate(elem) {
  elem.classList.add('animate');

  if (elem.className.includes('computer')) setTimeout(() => removeAnimate(elem), 100);
}

function removeAnimate(elem) {
  if (!elem) return;

  clearTimeout(computerAnimateTimer);
  elem.classList.remove('animate');
}

// put each char into a span to treat them separately
function appendAndAnimateLogText(str) {
  logMessage.innerHTML = '';

  textAnimateTimer = setTimeout(() => {
    let docFragment = new DocumentFragment();
    let arr = str.split('');
    
    for (let char of arr) {
      let span = document.createElement('span');
      
      span.innerHTML = char;
      docFragment.append(span);
    }

    logMessage.append(docFragment);
    animateLogText();
  }, 50);
}

let i = 0;

/*
  each letter gets opacity set to 1 every 15ms
  this creates an effect of each word gradually apprearing
*/
function animateLogText() {
  if (i >= logMessage.children.length) {
    i = 0;

    return;
  };

  let span = logMessage.children[i];

  span.className = 'show';
  i++;
  setTimeout(() => animateLogText(), 15);
}
