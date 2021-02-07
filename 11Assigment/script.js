'use strict';


const nav = document.querySelector('.nav');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const header = document.querySelector('.header');

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
// Sticky navigation

// To get the nav height dinamicly
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});
headerObserver.observe(header);


// Reveal sections
const allSections = document.querySelectorAll('.section');
const revealSections = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionOberver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.15
});

allSections.forEach(function (section) {
  sectionOberver.observe(section);
  // section.classList.add('section--hidden');
});


// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  // console.log(entry.target.src);
  // console.log(entry.target.dataset.src);
  entry.target.src = entry.target.dataset.src;
  // entry.target.classList.remove('lazy-img');
  entry.target.addEventListener('load', function (e) {
    // console.log(e);
    e.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);

};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px' // To start loading images before they appear on screen
});

imgTargets.forEach(img => imgObserver.observe(img));


/////////////////////////////////////////////////
// Slides

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlides = slides.length;

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
  });
};

const goToSlide = function (slide) {
  slides.forEach((s, index) => s.style.transform = `translateX(${(index - slide) * 100}%)`);
};


const activateDot = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(b => b.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};


// Next slide
const nextSlide = function () {
  curSlide++;
  if (curSlide > maxSlides - 1) curSlide = 0;
  goToSlide(curSlide);
  activateDot(curSlide);
};

// Previous slide
const prevSlide = function () {
  curSlide--;
  if (curSlide === - 1) curSlide = maxSlides - 1;
  goToSlide(curSlide);
  activateDot(curSlide);

};

const init = function () {
  createDots();
  goToSlide(0);
  activateDot(0);



};

init();

// Event handlers
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);


document.addEventListener('keydown', function (e) {
  // console.log(e.target);
  if (e.key === 'ArrowRight') nextSlide();
  e.key === 'ArrowLeft' && prevSlide();

});


dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    console.log(slide);
    goToSlide(slide);
    activateDot(slide);
    curSlide = slide;
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


const obsCallback = function () { };

const obsOptions = {
  root: null,
  threshold: 0.10
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);