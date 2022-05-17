function computerPlay() {
  let random = 1 + Math.floor(Math.random() * 3);

  switch(random) {
    case 1:
      return 'Rock';
    case 2:
      return 'Paper';
    case 3:
      return 'Scissors';
    default:
      throw new Error('Error in Math.random()');
  }
}

function playerPlay() {
  let playerInput;

  while (true) {
    playerInput = prompt('Rock, Paper or Scissors?');

    if (playerInput == null) break;

    if (playerInput.match(/^(rock|paper|scissors)$/i)) break;
  }
  
  return playerInput;
}

function playRound() {
  let playerSelection = playerPlay();
  let computerLc = computerPlay().toLowerCase();

  if (playerSelection == null) {
    return (
      { 
        message: 'You cancelled your input.',
        playerWonTheGame: false,
        draw: true,
      }
    );
  }

  let playerLc = playerSelection.toLowerCase();
  let winMessage = `You win! ${playerLc[0].toUpperCase() + playerLc.slice(1)} beats ${computerLc[0].toUpperCase() + computerLc.slice(1)}`;
  let loseMessage = `You lose! ${computerLc[0].toUpperCase() + computerLc.slice(1)} beats ${playerLc[0].toUpperCase() + playerLc.slice(1)}`;
  let drawMessage = `It's a draw! ${playerLc[0].toUpperCase() + playerLc.slice(1)} and ${computerLc[0].toUpperCase() + computerLc.slice(1)} are equal!`;

  if (playerLc === computerLc) {
    return (
      { 
        message: drawMessage,
        playerWonTheGame: false,
        draw: true,
      }
    );
  }
  
  if (
    (playerLc === 'rock' && computerLc === 'scissors')
    || (playerLc === 'paper' && computerLc === 'rock')
    || (playerLc === 'scissors' && computerLc === 'paper')
  ) {
    return { message: winMessage, playerWonTheGame: true, };
  } 

  return { message: loseMessage, playerWonTheGame: false, };
}

function game() {
  let playerCounter = 0;
  let computerCounter = 0;

  for (let i = 0; i < 5; i++) {
    let { message, playerWonTheGame, draw = false } = playRound();

    if (!draw) {
      if (playerWonTheGame) {
        playerCounter++;
      } else {
        computerCounter++;
      }
    }

    console.log(`${message} Player: ${playerCounter} Computer: ${computerCounter}`);
  }

  if (playerCounter > computerCounter) {
    console.log(`You win! Player: ${playerCounter} Computer: ${computerCounter}`)
  } else if (computerCounter > playerCounter) {
    console.log(`You lose! Player: ${playerCounter} Computer: ${computerCounter}`)
  } else {
    console.log(`It's a draw! Player: ${playerCounter} Computer: ${computerCounter}`)
  }
}

game();
