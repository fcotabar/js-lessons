'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,

    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2021-01-07T17:01:17.194Z',
        '2021-01-08T23:36:17.929Z',
        '2021-01-10T00:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');



/////////////////////////////////////////////////
// Functions

const formatMovementsDate = function (date, locale) {
    const calcDaysPassed = (date1, date2) => Math.round(Math.abs((date2 - date1) / (24 * 60 * 60 * 1000)));

    const daysPassed = calcDaysPassed(new Date(), date);
    // console.log(daysPassed);

    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed <= 7) return `${daysPassed} days ago`;

    // console.log(locale);
    return new Intl.DateTimeFormat(locale).format(date);

    /// Manualy form
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();

    // return `${day}/${month}/${year}`;



};

const formatCur = function (val, locale, currency) {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(val);
};

const displayMovements = function (acc, sort = false) {
    containerMovements.innerHTML = '';

    const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;
    movs.forEach(function (mov, i) {
        // console.log(`${i + 1}) >>>----> ${mov}`);
        const type = mov > 0 ? 'deposit' : 'withdrawal';

        const date = new Date(acc.movementsDates[i]);
        const displayDate = formatMovementsDate(date, acc.locale);

        const formattedMov = formatCur(mov, acc.locale, acc.currency);

        const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">
              ${i + 1} ${type}
          </div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div>
      </div>
    `;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};
// displayMovements(account1.movements);

const calcDisplayBalance = function (acc) {
    const balance = acc.movements.reduce((acu, curr) => acu + curr, 0);
    acc.balance = balance;
    labelBalance.textContent = formatCur(balance, acc.locale, acc.currency);
};
// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
    const incomes = acc.movements.filter(mov => mov > 0).reduce((acu, mov) => acu + mov, 0);
    labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

    const summaryOut = acc.movements.filter(mov => mov < 0).reduce((acu, mov) => acu + mov, 0);
    labelSumOut.textContent = formatCur(Math.abs(summaryOut), acc.locale, acc.currency);

    const interest = acc.movements
        .filter(mov => mov > 0)
        .map(interest => interest * acc.interestRate / 100)
        .filter(interest => interest >= 1)
        .reduce((acu, interest) => acu + interest, 0);
    labelSumInterest.textContent = formatCur(Math.abs(interest), acc.locale, acc.currency);
};

// calcDisplaySummary(account1.movements);

const createUsernames = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner
            .toLowerCase()
            .split(' ')
            .map(name => name[0])
            .join('');
    });
};
createUsernames(accounts);
// console.log(accounts);

const updateUI = function (acc) {
    // Display movements
    displayMovements(acc);
    // Display balance
    calcDisplayBalance(acc);
    // Display summary
    calcDisplaySummary(acc);

};

const startLogoutCounter = function () {
    let time = 120;
    const tick = function () {
        const min = String(Math.trunc(time / 60)).padStart(2, 0);
        const sec = String(time % 60).padStart(2, 0);
        labelTimer.textContent = `${min}:${sec}`;


        if (time === 0) {
            clearInterval(timer);
            // Display UI and Message
            containerApp.style.opacity = 0;
            labelWelcome.textContent = `Log in to get started`;
        }
        time--;
    };

    tick();
    const timer = setInterval(tick, 1000);
    return timer;
};

///////////////////////////
// Event handlers

let currentAccount, timer;

// FAKE ALWAYS LOGIN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;



///// Manualy format dates
// const day = `${nowTime.getDate()}`.padStart(2, 0);
// const month = `${nowTime.getMonth() + 1}`.padStart(2, 0);
// const year = nowTime.getFullYear();
// const hour = `${nowTime.getHours()}`.padStart(2, 0);
// const min = `${nowTime.getMinutes()}`.padStart(2, 0);

// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;


btnLogin.addEventListener('click', function (e) {
    const nowTime = new Date();
    // Prevents for sumbmition
    e.preventDefault();

    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

    if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
        // Display UI and Message
        containerApp.style.opacity = 100;
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;

        // Clear input fields
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();

        const dateOpt = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };

        labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, dateOpt).format(nowTime);

        // Update UI
        updateUI(currentAccount);
        // console.log(currentAccount);

        if (timer) clearInterval(timer);
        timer = startLogoutCounter();
    }
});


btnTransfer.addEventListener('click', function (e) {
    // Prevents for submtion
    e.preventDefault();

    const amount = Number(inputTransferAmount.value);

    const transferTo = accounts.find(acc => acc.username === inputTransferTo.value);

    if (amount && amount > 0 && amount <= currentAccount.balance) {

        if (transferTo && transferTo.username !== currentAccount.username) {
            currentAccount.movements.push(amount * -1);
            transferTo.movements.push(amount);

            currentAccount.movementsDates.push(new Date().toISOString());
            transferTo.movementsDates.push(new Date().toISOString());

            updateUI(currentAccount);
            inputTransferTo.value = inputTransferAmount.value = '';
            console.log(`${transferTo.owner} => ${transferTo.movements}`);

            clearInterval(timer);
            timer = startLogoutCounter();
        }
    }
});


btnLoan.addEventListener('click', function (e) {
    // Prevents for submition
    e.preventDefault();

    const loan = Math.floor(inputLoanAmount.value);
    if (loan &&
        loan > 0 &&
        currentAccount.movements.some(mov => mov >= loan * 0.1)) {

        setTimeout(function () {
            currentAccount.movements.push(loan);
            currentAccount.movementsDates.push(new Date().toISOString());
            updateUI(currentAccount);
            inputLoanAmount.value = '';
            console.log(`Loan given: ${loan}`);
            clearInterval(timer);
            timer = startLogoutCounter();

        }, 2500);
    }
});


btnClose.addEventListener('click', function (e) {
    // Prevents for submition
    e.preventDefault();

    if (inputCloseUsername.value === currentAccount.username &&
        Number(inputClosePin.value) === currentAccount.pin) {
        containerApp.style.opacity = 0;

        const index = accounts.findIndex(acc => acc.username === currentAccount.username);

        accounts.splice(index, 1);
        console.log(accounts);
    }
    inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
    // Prevents for submition
    e.preventDefault();

    // currentAccount.movements.sort((a, b) => a - b);
    displayMovements(currentAccount, !sorted);
    sorted = !sorted;
});



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/**
 * NUMBERS AND ROUNDING
 */
// console.log(10 / 3);
// console.log(Number.isFinite(10 / 3));
// console.log(8 ** (1 / 3));

// const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;

// console.log(randomInt(0, 10));
// console.log(randomInt(0, 1));
// console.log(randomInt(1, 3));

// // MAX INTEGER
// console.log(2 ** 53 - 1);
// console.log(Number.MAX_SAFE_INTEGER);

// // BIG INTEGER
// console.log(8752985710985721957215727985729070985n);
// console.log(typeof 97598275928475984357982759285798273589n);

// console.log(sorted ?? cars);

/**
 * DATES
 */

const now = new Date();
const dateOptions = {
    timeZone: 'America/Bogota',
    timeZoneName: 'long',
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'long',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour12: true, // true is default. Just put it here for reference
    dayPeriod: 'short'
};

const dateOptions2 = {
    timeZone: 'America/Bogota',
    hour: 'numeric',
    dayPeriod: 'long'
};
const locale = navigator.language;
console.log(locale);

console.log(new Intl.DateTimeFormat('es-CO', dateOptions2).format(now));
console.log(now.toISOString());
console.log(now);

const money = 300000;
const monOpt = {
    style: 'currency',
    currency: 'COP',
    // currencyDisplay: 'code'
};
console.log(new Intl.NumberFormat('es-CO', monOpt).format(money));


// setInterval(() => {
//     const now = new Date();
//     console.log(new Intl.DateTimeFormat('default', {
//         hour: 'numeric',
//         minute: 'numeric',
//         second: 'numeric'
//     }).format(now));
// }, 1000);

// const firstDate = new Date(0);
// console.log(`First timestamp: ${firstDate}`);
// console.log(`First timestamp: ${firstDate.getTime()}`);

// const past = new Date(2020, 10, 19, 15, 25);
// console.log(past.getDay());
// console.log(past.toISOString());

// const calcMonthsPassed = (date1, date2) => Math.floor(Math.abs((date1 - date2) / (30 * 24 * 60 * 60 * 1000)));
// const months1 = calcMonthsPassed(new Date(2019, 1, 1), new Date(2020, 8, 1));

// console.log(months1);

// const calcYearsPassed = (date1, date2) => Math.floor(Math.abs((date1 - date2) / (12 * 30 * 24 * 60 * 60 * 1000)));
// const years1 = calcYearsPassed(new Date(0), new Date(2020, 8, 1));
// console.log(years1);

