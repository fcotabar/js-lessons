'use strict';

// GET ELEMENTS
const diceImg = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// INITIALIZE VALUES
const player1 = {
    score: 0,
    scoreEl: document.querySelector('#score--0'),
    currScoreEl: document.querySelector('#current--0'),
    sectionEl: document.querySelector('.player--0'),
};

const player2 = {
    score: 0,
    scoreEl: document.querySelector('#score--1'),
    currScoreEl: document.querySelector('#current--1'),
    sectionEl: document.querySelector('.player--1'),
};

let current = player1;
let currentScore = 0;
let dice = 0;

player1.scoreEl.textContent = 0;
player2.scoreEl.textContent = 0;

diceImg.classList.add('hidden');

// DECLARING FUNCTIONS
const switchPlayer = function() {
    currentScore = 0;
    current.currScoreEl.textContent = currentScore;
    current.sectionEl.classList.remove('player--active');
    current = current === player1 ? player2 : player1;
    current.sectionEl.classList.add('player--active');
};

// SET ACTIONS TO BUTTONS
btnRoll.addEventListener('click', function() {
    dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    diceImg.src = `dice-${dice}.png`;
    diceImg.classList.remove('hidden');

    if (dice !== 1) {
        currentScore += dice;
        current.currScoreEl.textContent = currentScore;
    } else {
        switchPlayer();
    }
});

btnHold.addEventListener('click', function() {
    current.score += currentScore;
    current.scoreEl.textContent = current.score;

    if (current.score > 19) {
        // Got a winner
        current.sectionEl.classList.toggle('player--active');
        current.sectionEl.classList.toggle('player--winner');
        btnHold.disabled = true;
        btnRoll.disabled = true;
    } else {
        switchPlayer();
    }
});

btnNewGame.addEventListener('click', function() {
    // RESET EVERYTHING
    current.sectionEl.classList.remove('player--winner');
    current = player1;
    currentScore = 0;
    diceImg.classList.add('hidden');
    player1.score = 0;
    player2.score = 0;
    player1.sectionEl.classList.add('player--active');
    player2.sectionEl.classList.remove('player--active');
    player1.scoreEl.textContent = 0;
    player2.scoreEl.textContent = 0;
    player1.currScoreEl.textContent = 0;
    player2.currScoreEl.textContent = 0;
    btnHold.disabled = false;
    btnRoll.disabled = false;
});
console.log(diceImg, dice);
// diceImg.src = `dice-${dice}.png`;