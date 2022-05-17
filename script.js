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

function playRound(playerSelection, computerSelection) {
  let playerLc = playerSelection.toLowerCase();
  let computerLc = computerSelection.toLowerCase();
  let winMessage = `You win! ${playerLc[0].toUpperCase() + playerLc.slice(1)} beats ${computerLc[0].toUpperCase() + computerLc.slice(1)}`;
  let loseMessage = `You lose! ${computerLc[0].toUpperCase() + computerLc.slice(1)} beats ${playerLc[0].toUpperCase() + playerLc.slice(1)}`;
  let drawMessage = `It's a draw! ${playerLc[0].toUpperCase() + playerLc.slice(1)} and ${computerLc[0].toUpperCase() + computerLc.slice(1)} are equal!`;

  if (playerLc === computerLc) {
    return drawMessage;
  } 
  
  if (
    (playerLc === 'rock' && computerLc === 'scissors')
    || (playerLc === 'paper' && computerLc === 'rock')
    || (playerLc === 'scissors' && computerLc === 'paper')
  ) {
    return winMessage;
  } 

  return loseMessage;
}
