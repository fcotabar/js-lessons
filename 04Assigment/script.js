'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const numberBx = document.querySelector('.number');

const message = document.querySelector('.message');
const guessN = document.querySelector('.guess');
guessN.value = '';

const checkBtn = document.querySelector('.check');

const body = document.querySelector('body');
const againBtn = document.querySelector('.again');

checkBtn.addEventListener('click', function() {
    const guessingN = Number(guessN.value);
    console.log(guessingN, typeof guessingN);

    // Compare number
    if (!guessingN) message.textContent = '⛔️ No number';
    else if (secretNumber === guessingN) {
        message.textContent = '🎉 Correct number';
        numberBx.style.width = '30rem';
        numberBx.textContent = secretNumber;
        body.style.backgroundColor = '#60b347';
        if (highscore < score) {
            document.querySelector('.highscore').textContent = score;
            highscore = score;
        }
    } else if (score > 0) {
        if (secretNumber > guessingN) {
            message.textContent = '📉 Too low';
        } else if (secretNumber < guessingN) {
            message.textContent = '📈 Too high';
        }
        score--;
        document.querySelector('.score').textContent = score;
    } else {
        message.textContent = '💥 You loose';
        body.style.backgroundColor = 'red';
    }
});

againBtn.addEventListener('click', function() {
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    score = 20;
    body.style.backgroundColor = '#222';
    numberBx.style.width = '15rem';
    numberBx.textContent = '?';
    guessN.value = '';
    message.textContent = 'Start guessing...';
    document.querySelector('.score').textContent = score;
    console.log(secretNumber);
});

// guessN.value = 34;

console.log(
    secretNumber,
    message,
    score,
    guessN,
    checkBtn,
    typeof score.textContent
);