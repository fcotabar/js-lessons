'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// AJAX REQUEST WIDHT XMLHttpRequest

// const getCountryData = function (country) {
//     const request = new XMLHttpRequest();

//     request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//     request.send();

//     request.addEventListener('load', function () {

//         const [data] = JSON.parse(this.responseText);
//         console.log(data);
//         const html = `
//         <article class="country">
//             <img class="country__img" src="${data.flag}" />
//             <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//             </div>
//         </article>
//     `;

//         countriesContainer.insertAdjacentHTML('beforeend', html);
//         countriesContainer.style.opacity = 1;
//     });
// };

// getCountryData('colombia');
// getCountryData('mexico');


///////////////////////////////////////
// Using callbacks hells

// const renderCountry = function (data, className = '') {
//     const html = `
//     <article class="country ${className}">
//         <img class="country__img" src="${data.flag}" />
//         <div class="country__data">
//         <h3 class="country__name">${data.name}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
//         <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//         <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//         </div>
//     </article>
//     `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;

// };

// const getCountryAndNeighbour = function (country) {

//     // AJAX call country 1
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//     request.send();

//     request.addEventListener('load', function () {

//         const [data] = JSON.parse(this.responseText);
//         console.log(data);

//         // Render country1
//         renderCountry(data);

//         // Get neighbour country (2)
//         const [neighbour] = data.borders;

//         if (!neighbour) return;

//         // AJAX call country 1
//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//         request2.send();

//         request2.addEventListener('load', function () {
//             // console.log(this.responseText);
//             const data2 = JSON.parse(this.responseText);
//             renderCountry(data2, 'neighbour');
//         });
//     });
// };

// getCountryAndNeighbour('mexico');


///////////////////////////////////////
// Using FETCH and PROMISES

const renderCountry = function (data, className = '') {
    const html = `
    <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
    </article>
    `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    // countriesContainer.style.opacity = 1;

};

const renderError = function (error) {
    const errorMsg = error;
    countriesContainer.insertAdjacentText('beforeend', errorMsg);
};

//////////////////////////
// More explained version

// const getCountryData = function (country) {
//     // fetch will return a promise
//     fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//         .then(function (response) {
//             console.log(response);
//             return response.json(); // the .json() converts the response to an object
//         })
//         .then(function (data) {
//             console.log(data);
//             renderCountry(data[0]); // data is an array
//         });

// };

// ///////////////////////
// // Shorter version
// const getCountryData = function (country) {
//     // fetch will return a promise
//     fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//         .then(response => {
//             console.log(response);

//             if (!response.ok) throw new Error(`Country not found (${response.status})`);

//             return response.json();
//         })
//         .then(data => {
//             renderCountry(data[0]);

//             const neighbour = data[0].borders[0];

//             if (!neighbour) return;

//             // fecht country 2
//             return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//         })
//         .then(response2 => response2.json())
//         .then(data2 => renderCountry(data2, 'neighbour'))
//         .catch(error => {
//             console.log(`Error: ${error.message}`);
//             renderError(`Something went wrong!! ${error.message}. Try again!`);
//         })
//         .finally(() => countriesContainer.style.opacity = 1);

// };


///////////////////////
// Shortest version

const getJSON = function (url, errorMsg = 'Some error') {
    return fetch(url)
        .then(response => {
            // console.log(response);

            if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

            return response.json();
        });
};

const getCountryData = function (country) {
    // fetch will return a promise
    getJSON(`https://restcountries.eu/rest/v2/name/${country}`, 'Country not found')
        .then(data => {
            renderCountry(data[0]);

            const neighbour = data[0].borders[0];

            if (!neighbour) throw new Error('No neighbour found!');

            // fecht country 2
            return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbour}`, 'Country not found');
        })
        .then(data2 => renderCountry(data2, 'neighbour'))
        .catch(error => {
            // console.log(`Error: ${error.message}`);
            renderError(`Something went wrong!! ${error.message}. Try again!`);
        })
        .finally(() => countriesContainer.style.opacity = 1);

};



// getCountryData('mexico');

btn.addEventListener('click', function () {
    // e.preventDefault();
    getCountryData('colombia');
});



/////////////////////////
// Challenge1

/*
Test data:
§ Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
§ Coordinates 2: 19.037, 72.873
§ Coordinates 3: -33.933, 18.474
*/

const getJSON2 = function (lat = 52.508, long = 13.381) {
    const url = `https://geocode.xyz/${lat},${long}?geoit=json`;
    return fetch(url)
        .then(response => {
            if (response.status !== 200) throw new Error(`Error: (${response.status})`);

            return response.json();
        });
};

// getJSON2().then(data => console.log(data));

const whereAmI = function (lat, long) {
    getJSON2(lat, long)
        .then(data => {
            console.log(`You are in ${data.city}, ${data.country}`);
            getCountryData(data.country);
        })
        .catch(err => console.log(err));
};

// whereAmI();
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// fetch('http://swapi.dev/api/people/?page=1')
//     .then(resp => resp.json())
//     .then(data => console.log(data.results[0]));

/////////////////////////////////
// Construct Promises

// const lotteryPromise = new Promise(function (resolve, reject) {
//     console.log('Lottery draw is happening!!');

//     setTimeout(function () {
//         if (Math.random() >= 0.5) resolve('You WIN the lottery!!');
//         else reject(new Error('You lost your money'));
//     }, 3000);
// });

// lotteryPromise
//     .then(data => console.log(data))
//     .catch(err => console.error(err));

/////////////////////////////////
// Promisifying setTimeout -- Real world examples

const wait = function (seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);
    });
};

// wait(1)
//     .then(() => {
//         console.log('I wated 1 seconds');
//         return wait(1);
//     })
//     .then(() => {
//         console.log('I wated 2 seconds');
//         return wait(1);
//     })
//     .then(() => {
//         console.log('I wated 3 seconds');
//         return wait(1);
//     })
//     .then(() => console.log('Waited 4 second'));

///////////////////////////////////
// Challenge 2

// const imageContainer = document.querySelector('.images');

// const createImage = function (imagePath) {
//     return new Promise(function (resolve, reject) {
//         const img = document.createElement('img');
//         img.src = imagePath;

//         img.addEventListener('load', function () {
//             imageContainer.append(img);
//             resolve(img);
//         });

//         img.addEventListener('error', function () {
//             reject(new Error('Image not found'));
//         });

//     });
// };

// let currentImg;
// createImage('img/img-1.jpg')
//     .then(img => {
//         currentImg = img;
//         console.log(img, 'imgage 1 loaded');
//         return wait(2);
//     })
//     .then(() => {
//         currentImg.style.display = 'none';
//         // console.log(img);
//         return createImage('img/img-2.jpg');
//     })
//     .then((img) => {
//         currentImg = img;
//         currentImg.style.display = 'block';
//         return wait(2);
//     })
//     .then(() => {
//         currentImg.style.display = 'none';


//     })
//     .catch(err => console.error(err));


//////////////////////////////////////
//          Async function          //
//////////////////////////////////////

const myTime = function (number) {
    const now = new Date();
    console.log(`(${number}) => (${now.getHours()}:${now.getMinutes()}:${now.getSeconds()})`);
};

// myTime(0);

const asyncWhereAmI = async function (country) {
    myTime(1);
    const response = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
    myTime(2);
    // console.log(response);
    const data = await response.json();
    console.log(data);
};
asyncWhereAmI('colombia');
console.log('FIRST');
myTime(3);




///////////////////////////////////
// Challenge 3

const imageContainer = document.querySelector('.images');

const createImage = function (imagePath) {
    return new Promise(function (resolve, reject) {
        const img = document.createElement('img');
        img.src = imagePath;

        img.addEventListener('load', function () {
            imageContainer.append(img);
            resolve(img);
        });

        img.addEventListener('error', function () {
            reject(new Error('Image not found'));
        });

    });
};





// let currentImg;
// createImage('img/img-1.jpg')
//     .then(img => {
//         currentImg = img;
//         console.log(img, 'imgage 1 loaded');
//         return wait(2);
//     })
//     .then(() => {
//         currentImg.style.display = 'none';
//         // console.log(img);
//         return createImage('img/img-2.jpg');
//     })
//     .then((img) => {
//         currentImg = img;
//         currentImg.style.display = 'block';
//         return wait(2);
//     })
//     .then(() => {
//         currentImg.style.display = 'none';


//     })
//     .catch(err => console.error(err));


const loadNPause = async function () {
    try {
        let currentImg = await createImage('img/img-1.jpg');
        console.log(currentImg);
        await wait(2);
        console.log('2 seconds passed');
        currentImg.style.display = 'none';
        currentImg = await createImage('img/img-2.jpg');
        // currentImg.style.display = 'block';
        await wait(2);
        currentImg.style.display = 'none';
    } catch (err) {
        console.error(err);
    }

};

// loadNPause();


// PART 2
const loadAll = async function (imgArr) {
    try {
        const imgs = imgArr.map(async img => await createImage(img));
        // console.log(imgs);
        const imgsEl = await Promise.all(imgs);
        console.log(imgsEl);
        imgsEl.forEach(img => img.classList.add('parallel'));
    } catch (err) {
        console.error(err);
    }
};
//Images to load
// ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);