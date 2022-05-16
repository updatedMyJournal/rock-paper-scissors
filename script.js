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
