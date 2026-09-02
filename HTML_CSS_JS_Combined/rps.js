let score = {
      wins : 0,
      losses : 0,
      ties : 0,
    }
    function updateScore(){
        document.querySelector('.js_score').innerHTML = `Wins:${score.wins} , Losses:${score.losses} , Ties:${score.ties}`;
      }
      updateScore();
    function pickComputerMove() {
      let randomNumber = Math.random();
      let computerMove = '';
      if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'Rock';
      } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'Paper';
      } else {
        computerMove = 'Scissors';
      }
      return computerMove;
    }

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('Rock');
  } else if (event.key === 'p') {
    playGame('Paper');
  } else if (event.key === 's') {
    playGame('Scissors');
  } 
});

const rockButton = document.querySelector('.js_rock_button');
rockButton.addEventListener('click', () => {
  playGame('Rock');
});

const paperButton = document.querySelector('.js_paper_button'); 
paperButton.addEventListener('click', () => {
  playGame('Paper');
});

const scissorsButton = document.querySelector('.js_scissors_button');
scissorsButton.addEventListener('click', () => {
  playGame('Scissors');
}); 

const resetButton = document.querySelector('.js_reset_button');
resetButton.addEventListener('click', () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  updateScore();
  alert('The Score was Reset')
});

const autoPlayButton = document.querySelector('.js_auto_play_button');
autoPlayButton.addEventListener('click', () => {
  autoPlay();
});

    let isAutoPlaying = false;
    let intervalId;
    function autoPlay() {
      if(!isAutoPlaying){
      intervalId = setInterval(()=>{
        let playerMove = pickComputerMove();
        playGame(playerMove);
      }, 1000);
      isAutoPlaying = true;
    }else{
      clearInterval(intervalId);
      isAutoPlaying = false;}
    }
    function playGame(playerMove) {
      let computerMove = pickComputerMove();
      let result = '';
      // Player chooses Rock
      if (playerMove === 'Rock') {
        if (computerMove === 'Rock') {
          result = 'Tie';
        } else if (computerMove === 'Paper') {
          result = 'You Lose';
        } else if (computerMove === 'Scissors') {
          result = 'You Win';
        }
      }
      else if (playerMove === 'Paper') {
        if (computerMove === 'Rock') {
          result = 'You Win';
        } else if (computerMove === 'Paper') {
          result = 'Tie';
        } else if (computerMove === 'Scissors') {
          result = 'You Lose';
        }
      }
      // Player chooses Scissors
      else if (playerMove === 'Scissors') {
        if (computerMove === 'Rock') {
          result = 'You Lose';
        } else if (computerMove === 'Paper') {
          result = 'You Win';
        } else if (computerMove === 'Scissors') {
          result = 'Tie';
        }
      }
      if(result==='You Win'){
        score.wins+=1;
      }else if(result ==='You Lose'){
        score.losses+=1;
      }else if(result === 'Tie'){
        score.ties+=1
      }
      updateScore();
    }
