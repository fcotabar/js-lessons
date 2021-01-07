'use strict';

const bookings = [];

// DEFAULT PARAMETERS
const createBooking = function(flightNum, numPassengers = 1, price = 1.99) {
    const booking = {
        flightNum,
        numPassengers,
        price
    };
    console.log(booking);
    bookings.push(booking);
};

createBooking('LH123');

/**
 * CREATE HIGHER-ORDER FUNCTIONS
 */

// first class functions
const oneWord = function(str) {
    return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function(str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
};

// HIGHER-ORDER
const transformer = function(str, fn) {
    console.log(`Original string: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);

    console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);


/**
 * FUNCTIONS RETURNING FUNCTIONS
 * @param {*} greeting 
 */
const greet = greeting => name => console.log(`${greeting} ${name}`);

const greeterHey = greet('Hey');

greeterHey('Francisco');


const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    // book: function() {}
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
        this.bookings.push({ flight: `${this.iataCode}${flightNum}`, firstName: name });
    }
};

lufthansa.book(239, 'Francisco');
lufthansa.book(239, 'Lorena');
console.log(lufthansa);


/**
 * BIND FUNCTIONS
 */

lufthansa.planes = 300;
lufthansa.buyPlane = function() {
    console.log(this);

    this.planes++;
    console.log(this.planes);
};

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

const someFn = function() {
    // console.log(this);
    console.log(`${this.airline} ${this.bookings[1].firstName}`);
};

const otherFn = someFn.bind(lufthansa);

otherFn();

// buyPlane.bind()

const poll = {
    question: 'What is your favorite programming language?',
    options: ['0: Javascript', '1: Python', '2: Rust', '3: C++'],
    answers: new Array(4).fill(0),
    registerNewAnswer() {
        console.log(this);
        const answer = Number(prompt(`${this.question}\n ${this.options.join('\n')}\n (Write option number)`));
        answer < 4 && this.answers[answer]++;
        console.log(this.answers);

    }
};
// poll.registerNewAnswer();
document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));

/**
 * IIFE => Immediatly Invoked Function Expressions
 * (function(){})();
 * (()=>{})();
 */

(function() {
    console.log('Function that only runs once.');
})();

(() => console.log('This ALSO runs once.'))();


/**
 * CLOSURE
 * 
 *  Example 1
 */

let f;

const g = function() {
    const a = 23;
    f = function() {
        console.log(a * 2);
    };
};

const h = function() {
    const b = 64;
    f = function() {
        console.log(b * 2);
    };
};

// f(); At this point f is not a function
g();
f(); // g(); should run first so f could be assinged
console.dir(f);

h();
f();
console.dir(f);

/**
 * Example 2
 */

const boardPassengers = function(n, wait) {
    const perGroup = n / 3;
    setTimeout(function() {
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000);
    console.log(`Will start bording in ${wait} seconds`);
};

boardPassengers(180, 5);

/**
 *  Code challenge
 */

(function() {
    const header = document.querySelector('h1');
    header.style.color = 'red';
    document.body.addEventListener('click', function() {
        header.style.color = 'blue';
    });
})();