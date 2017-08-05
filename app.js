var turn,
    round,
    scores,
    roundScore,
    activePlayer,
    activated,
    roll1, roll2, roll3,
    tie;

//Initialize game
init();

//Roll dice
document.querySelector('.btn-roll').addEventListener('click', function() {
  if(activated){
    //First roll
    if(roll1){
      //1. Random numbers for three dice
      var die1 = Math.floor(Math.random() * 6) + 1;
      var die2 = Math.floor(Math.random() * 6) + 1;
      var die3 = Math.floor(Math.random() * 6) + 1;

      //2. Display the result
      var die1DOM = document.querySelector('.die-pos1');
      var die2DOM = document.querySelector('.die-pos2');
      var die3DOM = document.querySelector('.die-pos3');
      var dice_phDOM = document.querySelectorAll('.dice-placeholder');

      dice_phDOM[0].classList.add('hide');
      dice_phDOM[1].classList.add('hide');
      dice_phDOM[2].classList.add('hide');

      die1DOM.classList.remove('hide');
      die2DOM.classList.remove('hide');
      die3DOM.classList.remove('hide');

      die1DOM.src = 'dice-' + die1 + '.png';
      die2DOM.src = 'dice-' + die2 + '.png';
      die3DOM.src = 'dice-' + die3 + '.png';

      //3. Place largest die in first die position
      activated = false;
      setTimeout(function(){
        var highestDie = Math.max(die1, die2, die3);
        roundScore[activePlayer - 1] += highestDie;
        die1DOM.src = 'dice-' + highestDie + '.png';
        document.getElementById('current-' + activePlayer).textContent = roundScore[activePlayer - 1];
        die1DOM.classList.add('lock-die');
        dice_phDOM[1].classList.remove('hide');
        dice_phDOM[2].classList.remove('hide');
        die2DOM.classList.add('hide');
        die3DOM.classList.add('hide');
        activated = true;
      }, 1000);
      roll1 = false;
      roll2 = true;
    }

    //Second roll
    else if(roll2){
      //1. Random numbers for remaining two dice
      var die2 = Math.floor(Math.random() * 6) + 1;
      var die3 = Math.floor(Math.random() * 6) + 1;

      //2. Display the result
      var die2DOM = document.querySelector('.die-pos2');
      var die3DOM = document.querySelector('.die-pos3');
      var dice_phDOM = document.querySelectorAll('.dice-placeholder');

      dice_phDOM[1].classList.add('hide');
      dice_phDOM[2].classList.add('hide');

      die2DOM.classList.remove('hide');
      die3DOM.classList.remove('hide');

      die2DOM.src = 'dice-' + die2 + '.png';
      die3DOM.src = 'dice-' + die3 + '.png';

      //3. Place largest die in second die position
      activated = false;
      setTimeout(function(){
        var highestDie = Math.max(die2, die3);
        roundScore[activePlayer - 1] += highestDie;
        die2DOM.src = 'dice-' + highestDie + '.png';
        document.getElementById('current-' + activePlayer).textContent = roundScore[activePlayer - 1];
        die2DOM.classList.add('lock-die');
        dice_phDOM[2].classList.remove('hide');
        die3DOM.classList.add('hide');
        activated = true;
      }, 1000);
      roll2 = false;
      roll3 = true;
    }

    //Third roll
    else if(roll3){
      //1. Random numbers for last remaining die
      var die3 = Math.floor(Math.random() * 6) + 1;

      //2. Display the result
      var die3DOM = document.querySelector('.die-pos3');
      var dice_phDOM = document.querySelectorAll('.dice-placeholder');

      dice_phDOM[2].classList.add('hide');
      die3DOM.classList.remove('hide');

      die3DOM.src = 'dice-' + die3 + '.png';
      die3DOM.classList.add('lock-die');

      //3. Update and display round score
      roundScore[activePlayer - 1] += die3;
      document.getElementById('current-' + activePlayer).textContent = roundScore[activePlayer - 1];
      roll3 = false;
      roll1 = true;

      setTimeout(function(){
          nextPlayer();
      }, 1000);
    }
  }
});

function nextPlayer() {
  if (turn % 2  === 0) {
    //**********debug tie breaker**********
    //var tieBreaker = prompt("Set a tie?");
    //if(tieBreaker == "yes") { roundScore[1] = roundScore[0] };
    //*************************************
    findWinner();
    roundScore = [0, 0];
    document.getElementById('current-1').textContent = '0';
    document.getElementById('current-2').textContent = '0';
  }

  activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;

  // if (tie && (turn % 2 === 0)) {
  //   document.getElementById('tie-label').classList.toggle('hide');
  //   document.getElementById('round-display').classList.toggle('hide');
  //   if (roundScore[0] !== roundScore[1]) { tie = false; }
  // } else {
  //   //Set next round number and update display when current turn is even
  //   if (turn % 2 === 0) {
  //     round += 1;
  //     document.getElementById('round-number').textContent = round;
  //   }
  // }

  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.player-2-panel').classList.toggle('active');

  clearDice();

  //Set next turn number
  turn += 1;
}

function findWinner() {
    console.log(tie);
    //If there is a tie without a previous tie
    if (roundScore[0] === roundScore[1] && tie === false) {
      document.getElementById('tie-label').textContent = 'Tie Breaker Round';
      document.getElementById('tie-label').classList.remove('hide');
      document.getElementById('round-display').classList.add('hide');
      tie = true;
    //If there is a tie after a tie breaker round
    } else if (roundScore[0] === roundScore[1] && tie === true) {
      document.getElementById('tie-label').textContent = 'Y\'all like ties?';
    //If there is a winner
    } else {
      if (tie) {
        document.getElementById('tie-label').classList.add('hide');
        document.getElementById('round-display').classList.remove('hide');
        tie = false;
      }
      var winnerIndex = roundScore.indexOf(Math.max(...roundScore));
      scores[winnerIndex] += 1;
      document.getElementById('score-' + (winnerIndex + 1)).textContent = scores[winnerIndex];

      //Set next round number and update display
      round += 1;
      document.getElementById('round-number').textContent = round;
    }
}

//New game
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  turn = 1;
  round = 1;
  scores = [0, 0]
  roundScore = [0, 0];
  activePlayer = 1;
  roll1 = true;
  roll2 = false;
  roll3 = false;
  activated = true;
  tie = false;

  clearDice();

  document.getElementById('name-1').textContent = 'Player 1';
  document.getElementById('name-2').textContent = 'Player 2';

  document.getElementById('score-1').textContent = '0';
  document.getElementById('score-2').textContent = '0';

  document.getElementById('current-1').textContent = '0';
  document.getElementById('current-2').textContent = '0';

  document.getElementById('tie-label').classList.add('hide');
  document.getElementById('round-display').classList.remove('hide');
  document.getElementById('round-number').textContent = round;

  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-2-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-2-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.add('active');
}

function clearDice() {
  document.querySelector('.dice-placeholder.die-pos1').classList.remove('hide');
  document.querySelector('.dice-placeholder.die-pos2').classList.remove('hide');
  document.querySelector('.dice-placeholder.die-pos3').classList.remove('hide');
  document.querySelector('.dice.die-pos1').classList.add('hide');
  document.querySelector('.dice.die-pos2').classList.add('hide');
  document.querySelector('.dice.die-pos3').classList.add('hide');
  document.querySelector('.dice.die-pos1').classList.remove('lock-die');
  document.querySelector('.dice.die-pos2').classList.remove('lock-die');
  document.querySelector('.dice.die-pos3').classList.remove('lock-die');
}

//todo
//user sets rounds to win
//animate locked die border
