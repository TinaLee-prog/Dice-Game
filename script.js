'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let scores, currentScore, activePlayer, playing;

//Starting conditions
const init = function(){
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

    const name0 = document.getElementById('inputPlayer0')?.value || 'Player 1';
    const name1 = document.getElementById('inputPlayer1')?.value || 'Player 2';
    document.getElementById('name--0').textContent = name0;
    document.getElementById('name--1').textContent = name1;
};
init();

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    //Reset currentScore
    currentScore = 0;
    //Switch player
    activePlayer = activePlayer === 0 ? 1:0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//Rolling dice functionality
btnRoll.addEventListener('click', function(){
    if(playing){
        //1. Generate a randow dice roll
        const dice = Math.trunc(Math.random()*6)+1;

        //2. Display dice
            diceEl.classList.remove('hidden');
            diceEl.src = `dice-${dice}.png`;

        //3. Check for rolled 1: if true, switch to next player
        if (dice !== 1){
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            //current0El.textContent = currentScore;
        }else{
        //Switch to next player
        switchPlayer();
        }
    }
});

btnHold.addEventListener('click',function(){
    if(playing){
        scores[activePlayer] += currentScore;
        //1. Add current score to acrive player's score
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //2. Check if player's score is >=100
        if(scores[activePlayer] >= 20){
            playing = false;
            diceEl.classList.add('hidden');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');

                document.getElementById(`name--${activePlayer}`).innerHTML = `<span>You Won!</span>`;

        }else{
        //3. Switch to the next player
        switchPlayer();
        }           
    }
});

btnNew.addEventListener('click', init);

//window
window.addEventListener('load', function(){
    const modal = this.document.getElementById('nameModal');
    const startBtn = this.document.getElementById('btnStartGame');

    startBtn.addEventListener('click',function(){
        const name0 = document.getElementById('inputPlayer0').value || 'Player 1';
        const name1 = document.getElementById('inputPlayer1').value || 'Player 2';

        document.getElementById('name--0').textContent = name0;
        document.getElementById('name--1').textContent = name1;

        modal.style.display = 'none'; // 關閉輸入視窗
    })
});
