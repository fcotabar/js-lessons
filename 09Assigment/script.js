'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovements = function(movements, sort = false) {
    containerMovements.innerHTML = '';

    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
    movs.forEach(function(mov, i) {
        // console.log(`${i + 1}) >>>----> ${mov}`);
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">
                ${i + 1} ${type}
            </div>
            <div class="movements__date">3 days ago</div>
            <div class="movements__value">${mov}€</div>
        </div>
      `;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};
// displayMovements(account1.movements);

const calcDisplayBalance = function(acc) {
    const balance = acc.movements.reduce((acu, curr) => acu + curr, 0);
    acc.balance = balance;
    labelBalance.textContent = `${balance} €`;
};
// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function(acc) {
    const incomes = acc.movements.filter(mov => mov > 0).reduce((acu, mov) => acu + mov, 0);
    labelSumIn.textContent = `${incomes}€`;

    const summaryOut = acc.movements.filter(mov => mov < 0).reduce((acu, mov) => acu + mov, 0);
    labelSumOut.textContent = `${Math.abs(summaryOut)}€`;

    const interest = acc.movements
        .filter(mov => mov > 0)
        .map(interest => interest * acc.interestRate / 100)
        .filter(interest => interest >= 1)
        .reduce((acu, interest) => acu + interest, 0);
    labelSumInterest.textContent = `${Math.abs(interest)}€`;
};

// calcDisplaySummary(account1.movements);

const createUsernames = function(accs) {
    accs.forEach(function(acc) {
        acc.username = acc.owner
            .toLowerCase()
            .split(' ')
            .map(name => name[0])
            .join('');
    });
};
createUsernames(accounts);
// console.log(accounts);

const updateUI = function(acc) {
    // Display movements
    displayMovements(acc.movements);
    // Display balance
    calcDisplayBalance(acc);
    // Display summary
    calcDisplaySummary(acc);

};

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function(e) {
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

        // Update UI
        updateUI(currentAccount);
        // console.log(currentAccount);
    }
});

btnTransfer.addEventListener('click', function(e) {
    // Prevents for submtion
    e.preventDefault();

    const amount = Number(inputTransferAmount.value);

    const transferTo = accounts.find(acc => acc.username === inputTransferTo.value);

    if (amount && amount > 0 && amount <= currentAccount.balance) {

        if (transferTo && transferTo.username !== currentAccount.username) {
            currentAccount.movements.push(amount * -1);
            transferTo.movements.push(amount);

            updateUI(currentAccount);
            inputTransferTo.value = inputTransferAmount.value = '';
            console.log(`${transferTo.owner} => ${transferTo.movements}`);
        }
    }
});

btnLoan.addEventListener('click', function(e) {
    // Prevents for submition
    e.preventDefault();

    const loan = Number(inputLoanAmount.value);
    if (loan &&
        loan > 0 &&
        currentAccount.movements.some(mov => mov >= loan * 0.1)) {
        currentAccount.movements.push(loan);
        updateUI(currentAccount);
        inputLoanAmount.value = '';
        console.log(`Loan given: ${loan}`);
    }
});

btnClose.addEventListener('click', function(e) {
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
btnSort.addEventListener('click', function(e) {
    // Prevents for submition
    e.preventDefault();

    // currentAccount.movements.sort((a, b) => a - b);
    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

const movementsUSD = movements.map(mov => mov * eurToUsd);

// console.log(movementsUSD);


// const deposits = movements.filter(mov => mov > 0);
// console.log(deposits);
// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);
// const depositsSum = deposits.reduce((acumulative, current) => acumulative + current, 0);
// console.log(`Deposits sum: ${depositsSum}`);

// const maxNumber = movements.reduce((acu, curr) => curr > acu ? curr : acu, movements[0]);
// console.log(maxNumber);

const account = accounts.find(acc => acc.username === 'js');
console.log(account);

/**
 * FLATMAP
 */

// To get the balance in all accounts

const bankBalance = accounts.map(acc => acc.movements);
console.log(bankBalance);
const flatBankBalance = bankBalance.flat();
console.log(flatBankBalance);
const sumBankBalance = flatBankBalance.reduce((acu, mov) => acu + mov, 0);
console.log(sumBankBalance);

// All of the previouse code is the same as this:
const bankBalance2 = accounts
    .map(acc => acc.movements)
    .flat()
    .reduce((acu, mov) => acu + mov, 0);
console.log(bankBalance2);

// All previouse is the same as:
const bankBalance3 = accounts
    .flatMap(acc => acc.movements)
    .reduce((acu, mov) => acu + mov, 0);
console.log(bankBalance3);
console.log(accounts.flatMap(acc => acc.movements)); // Example of flatMap


/**
 * SORT FUNCTION
 */

// For numbers a compareFunction must be specifide
// If:
// return > 0 => A, B (keeps same orther)
// return < 0 => B, A (switch order elements)

// ASCENDING
movements.sort((a, b) => {
    if (a > b) return 1; // its the same than return the a - b value: if a is greater the value would be positive
    if (a < b) return -1; // it's the same to return a - b value: if b is greater then te value would be negative an there are gone a switch places b,a
});
console.log(movements);

// Its the same as doing this:
movements.sort((a, b) => a - b);
console.log(movements);

// DESCENDING
movements.sort((a, b) => b - a);
console.log(movements);


const y = Array.from({ length: 7 }, (elem, index) => index + 1);
console.log(y);


const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] }
];

dogs.forEach(dog => dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28));
console.log(dogs);


const owner = 'Sarah';
console.log(dogs.find(acc => acc.owners.includes(owner)));

/////////////////////////////////////////////////