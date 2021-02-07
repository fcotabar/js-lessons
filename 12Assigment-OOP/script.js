'use strict';

const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
};

const francisco = new Person('Francisco', 1982);

console.log(francisco instanceof Person);


// Prototypes
Person.prototype.getBirthYeaer = function () {
    console.log(this.birthYear);
};

francisco.getBirthYeaer();

console.log(Person.prototype);

console.log(francisco.__proto__);

console.log(francisco.__proto__.__proto__);

// Challenge 1
const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
};

Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed}km/h`);
};
Car.prototype.break = function () {
    this.speed -= 5;
    console.log(`${this.make} going at ${this.speed}km/h`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
mercedes.accelerate();

bmw.break();
mercedes.break();


///////////////////////////////////////
// ES6 CLASSES
////////////////////////////////////

// Class expression
/* 
const ClassName = class {
    constructor(){}
};
*/

// Class declaration

class PersonClass {
    constructor(fullName, age) {
        this.fullName = fullName;
        this.age = age;
    }

    // Methods are added to the prototype property of the Class Object
    calcAge() {
        const now = new Date();
        console.log(now.getFullYear() - this.age);
    }

    get getAge() {
        const now = new Date();
        return now.getFullYear() - this.age;
    }

    set setName(name) { }
}

const lore = new PersonClass('Lorena', 1978);
const ft = new PersonClass('Francisco', 1982);

lore.calcAge();
ft.calcAge();

console.log(`Lore's age is ${lore.getAge}`);


// Challenge 2

class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        this.speed += 10;
        console.log(`${this.make} going at ${this.speed}km/h`);
    }

    break() {
        this.speed -= 5;
        console.log(`${this.make} going at ${this.speed}km/h`);
    }

    get speedUS() {
        return `${this.make} going at ${this.speed / 1.6}mi/h`;
    }

    set speedUS(speed) {
        this.speed = speed * 1.6;
    }
}

const ford = new CarCl('Ford', 120);
// ford.accelerate();
console.log(ford.speedUS);
ford.speedUS = 120;
console.log(ford.speedUS);

const EV = function (make, speed, charge) {
    Car.call(this, make, speed);
    this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

const telsa = new EV('Telsa', 120, 23);
console.log(telsa);


////////////////////////////////////////
// ES6 child class


class StudenCl extends PersonClass {
    constructor(fullName, age, course) {
        // Super calls the parent constructor
        // It must be first before other this call
        super(fullName, age);
        this.course = course;
    }
}

const martha = new StudenCl('Martha', 1990, 'Computer Science');

console.log(martha.getAge);