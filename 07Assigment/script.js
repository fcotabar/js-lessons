'use strict';

// const restaurant = {
//     name: 'Classico Italiano',
//     location: 'Via Angelo Tavanti 23, Firenze, Italy',
//     categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
//     starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
//     mainMenu: ['Pizza', 'Pasta', 'Risotto'],

//     openingHours: {
//         thu: {
//             open: 12,
//             close: 22,
//         },
//         fri: {
//             open: 11,
//             close: 23,
//         },
//         sat: {
//             open: 0, // Open 24 hours
//             close: 24,
//         },
//     },
//     testArr: function(...arr) {
//         console.log(arr);
//     },
// };

// const newArr = [1, 2, 3, [5, 7, 8], 9];

// console.log([...restaurant.categories]);
// restaurant.testArr([...restaurant.categories]);
// console.log(...newArr);

// const str = 'Francesco';
// console.log(str);
// console.log(...str);
// console.log([...str]);

// const obj1 = {
//     n1: 'hello',
//     n2: 3,
//     n3Obj: {
//         n1: 1,
//         n2: 2,
//     },
// };

// const obj2 = {...obj1 };

// obj2.n3Obj.n1 = 20;
// obj2.n1 = 20;
// console.log(obj1);
// console.log(obj2);

// console.log(restaurant.openingHours ? .mon ? .open);

// const guest = restaurant.guest ? ? 10;

const airline = 'TAP Air Portugal';
const plane = 'A320';

const announcement = 'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replaceAll('door', 'gate'));


///// STRINGS  - MASK CREDIT CARD

const maskCreditCard = function(number) {
    const str = number + ''; // Converts number to string is the same of doing String(number)

    console.log(str.slice(-3).padStart(str.length, '*'));
};

maskCreditCard(123456789);