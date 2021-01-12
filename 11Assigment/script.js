'use strict';


const nav = document.querySelector('.nav');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');



///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////////////
// BUTTON SCROLL
btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();

  /**
   * **** ALL OF THIS MANUALLY *****
   */
  // const s1coord = section1.getBoundingClientRect();
  // console.log('Section1', s1coord);
  // const btn1coord = btnScrollTo.getBoundingClientRect();
  // console.log(`Button:`, btn1coord);

  // console.log('Current Scroll (y):', window.pageYOffset);
  // console.log('Height/width viewport: ', document.documentElement.clientHeight, document.documentElement.clientWidth);

  // // Scrolling
  // window.scrollTo({
  //   left: s1coord.left,
  //   top: s1coord.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });

  /**
   * ****** IT'S DONE BY THIS FUNCTION:
   */

  section1.scrollIntoView({ behavior: 'smooth' });

});

/////////////////////////////////////////////////
// Page Navigation

// Event delegation
// 1. Add Event Listener to common parent element
// 2. Determin which element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);

  // MATCHING STRATEGY
  // CHECK IF CONTAIN CLASS
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log('link', id, 'vs', e.target.href);

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }

});

/////////////////////////////////////////////////
// Menu fade animation

// // v1
// nav.addEventListener('mouseover', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const img = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 0.5;
//     });
//     img.style.opacity = 0.5;

//     console.log(e.target, img);
//   }
// });

// nav.addEventListener('mouseout', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const img = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 1;
//     });
//     img.style.opacity = 1;

//     // console.log(e.target, img);
//   }
// });


// // v2
// const handleHover = function (e, opacity) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const img = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = opacity;
//     });
//     img.style.opacity = opacity;

//     console.log(e.target, img);
//   }
// };

// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });

// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

// v3
const handleHover = function (e) {
  // e still is the event object
  // this is the argument passed to the bind function
  // in the bind method the this keyword is the argument passed

  const opacity = this;

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const img = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    img.style.opacity = opacity;

    console.log(e.target, img);
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));


/////////////////////////////////////////////////
// TAb implementation

document.querySelector('.operations__tab-container').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('operations__tab')) {
    // Removes active tab
    document.querySelectorAll('.operations__tab').forEach(el => el.classList.remove('operations__tab--active'));
    e.target.classList.add('operations__tab--active');

    // Content
    // remove active content
    document.querySelectorAll('.operations__content').forEach(el => el.classList.remove('operations__content--active'));
    // get content to display
    const dataTab = `.operations__content--${e.target.getAttribute('data-tab')}`;
    document.querySelector(dataTab).classList.add('operations__content--active');

    console.log(e.target, dataTab, this.children);
  }

});


/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// Lectures

// Select elements

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

const randomInt = (min, max) => Math.floor((Math.random() * (max - min + 1)) + min);

// let timerCountDown = 10;
// const checkRandomFn = () => {
//   console.log(randomInt(0, 1));
//   timerCountDown--;
//   if (timerCountDown === 0) clearInterval(timer);

// };

// const timer = setInterval(checkRandomFn, 1000);



/**
 * EVENT PROPAGATION
 */

// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// let i = 0;
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   // if (e.target === e.currentTarget) console.log('LINK: target');
//   this.style.backgroundColor = randomColor();
//   console.log(typeof e);
//   console.log(new Date(e.timeStamp));
//   console.log(`Orden de ejcución: ${i} - Link`);
//   i++;
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   // console.log(this, e.target);
//   // if (e.target === e.currentTarget) console.log('LINKs: target');
//   this.style.backgroundColor = randomColor();
//   console.log(`Orden de ejcución: ${i} - Links`);
//   i++;
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   // if (e.target === e.currentTarget) console.log('Nav: target');
//   this.style.backgroundColor = randomColor();
//   console.log(`Orden de ejcución: ${i} - Nav`);
//   i++;
// });
