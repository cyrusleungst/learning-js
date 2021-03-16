"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const renderCountry = function (data, className = "") {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            parseFloat(data.population) / 1000000
          ).toFixed(1)}</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  // countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMessage = `Something went wrong`) {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMessage}, ${response.status}`);

    return response.json();
  });
};

///////////////////////////////////////

//old school method using XMLHttpRequest
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();

//   request.addEventListener("load", function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//   <article class="country">
//     <img class="country__img" src="${data.flag}" />
//     <div class="country__data">
//         <h3 class="country__name">${data.name}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           parseFloat(data.population) / 1000000
//         ).toFixed(1)}</p>
//         <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//         <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//     </div>
//   </article>
//   `;

//     countriesContainer.insertAdjacentHTML("beforeend", html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData("china");
// getCountryData("gb");
// getCountryData("germany");

// const getCountryAndNeighbour = function (country) {
//   //AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();

//   request.addEventListener("load", function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     //Render country 1
//     renderCountry(data);

//     //Get neighbour country, country 2
//     const [neighbour] = data.borders;

//     if (!neighbour) return;

//     //AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open("GET", `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener("load", function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);

//       renderCountry(data2, "neighbour");
//     });
//   });
// };

// getCountryAndNeighbour("mexico");

//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();

//Using fetch and promises
// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// const getCountryData = function (country) {
//   //Country 1
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then((response) => {
//       console.log(response);

//       if (!response.ok) {
//         throw new Error(`Country not found, ${response.status}`);
//       }

//       return response.json();
//     })
//     .then((data) => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders[0];
//       const neighbour = "asdasd";

//       if (!neighbour) return;

//       //Neighbour of country 1, country 2
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`Country not found, ${response.status}`);
//       }

//       return response.json();
//     })
//     .then((data) => renderCountry(data, "neighbour"))
//     .catch((error) => {
//       console.error(`${error}`);
//       renderError(`Something went wrong, ${error.message}. Try again`);
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

const getCountryData = function (country) {
  //Country 1
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    `Country not found`
  )
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error(`No neighbour found`);

      //Neighbour of country 1, country 2
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        `Country not found`
      );
    })
    .then((data) => renderCountry(data, "neighbour"))
    .catch((error) => {
      console.error(`${error}`);
      renderError(`Something went wrong, ${error.message}. Try again`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

//btn.addEventListener("click", () => getCountryData("china"));

//btn.addEventListener("click", () => getCountryData("australia"));

//WHERE AM I
// const whereAmI = function (lat, lng) {
//   //part 1:1 reverse geocode
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then((response) => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Problem with geocoding, ${response.status}`);

//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`Country not found, ${response.status}`);
//       }

//       return response.json();
//     })
//     .then((data) => renderCountry(data[0]))
//     .catch((error) => console.log(`${error.message}, pepe`));
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

console.log(`Test start`);
setTimeout(() => console.log("O sec timer"), 0);
Promise.resolve("Resolved promise 1").then((response) => console.log(response));
console.log("Test end");

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log("Lottery draw is happening");
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve("You WON");
    } else {
      reject(new Error("You LOST"));
    }
  }, 2000);
});

// error is the rejected function i.e. 'You lost' and resolve is the fufilled function
lotteryPromise
  .then((resolve) => console.log(resolve))
  .catch((error) => console.log(error));

//Promisfying set timeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     console.log("I waited for 1 seconds");
//     return wait(1);
//   })
//   .then(() => {
//     console.log("I waited for 2 seconds");
//     return wait(1);
//   })
//   .then(() => {
//     console.log("I waited for 3 seconds");
//     return wait(1);
//   })
//   .then(() => {
//     console.log("I waited for 4 seconds");
//     return wait(1);
//   })
//   .then(() => {
//     console.log("I waited for 5 seconds");
//     return wait(1);
//   })
//   .then(() => {
//     console.log("I waited for 6 seconds");
//     return wait(1);
//   })
//   .then(() => {
//     console.log("I waited for 7 seconds");
//     return wait(1);
//   })
//   .then(() => console.log("I waited for 8 second"));

//Create fufilled or rejected promise quickly
// Promise.resolve("You winnored").then((res) => console.log(res));
// Promise.resolve(new Error("You are a loser")).catch((res) =>
//   console.error(res)
// );

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   (position) => resolve(position),
//     //   (error) => reject(error)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition().then((position) => console.log(position));

// const whereAmI = function () {
//   getPosition()
//     .then((position) => {
//       const { latitude: lat, longitude: lng } = position.coords;
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     //part 1:1 reverse geocode
//     .then((response) => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Problem with geocoding, ${response.status}`);

//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`Country not found, ${response.status}`);
//       }

//       return response.json();
//     })
//     .then((data) => renderCountry(data[0]))
//     .catch((error) => console.log(`${error.message}, pepe`));
// };

//btn.addEventListener("click", whereAmI);

// PART 1
// 1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

// If this part is too tricky for you, just watch the first part of the solution.

// PART 2
// 2. Comsume the promise using .then and also add an error handler;
// 3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
// 4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
// 5. After the second image has loaded, pause execution for 2 seconds again;
// 6. After the 2 seconds have passed, hide the current image.

// TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const imgContainer = document.querySelector(".images");

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement("img");
//     img.src = imgPath;

//     img.addEventListener("load", function () {
//       imgContainer.append(img);
//       resolve(img);
//     });
//     img.addEventListener("error", () => reject(new Error("Image not found")));
//   });
// };

// let currentImg;

// createImage("img/img-1.jpg")
//   .then((img) => {
//     currentImg = img;
//     console.log("Image 1 loaded");
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = "none";
//     return createImage("img/img-2.jpg");
//   })
//   .then((img) => {
//     currentImg = img;
//     console.log("Image 2 loaded");
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = "none";
//   })
//   .catch((error) => console.error(error));

//CREATE WHEREAMI FUNCTION WITH ASYNC AWAIT
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    //Geolocation
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;

    //Reverse geocoding
    const geoRes = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!geoRes.ok) throw new Error("Problem getting location data");
    const geoData = await geoRes.json();

    //Country data
    const response = await fetch(
      `https://restcountries.eu/rest/v2/name/${geoData.country}`
    );
    if (!response.ok) throw new Error("Problem getting country");
    const data = await response.json();
    renderCountry(data[0]);

    return `You are in ${geoData.city}, ${geoData.country}`;
  } catch (error) {
    renderError(`Something went wrong ${error.message}`);

    //Reject promose returned from async function
    throw error;
  }
};

// console.log("1. Will get location");
// const city = whereAmI();
// console.log(city);

// whereAmI()
//   .then((city) => console.log(`2: ${city}`))
//   .catch((error) => console.error(`2: ${error.message}`))
//   .finally(() => console.log("3. Finished getting location"));

// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (error) {
//     console.error(`2: ${error.message}`);
//   }
//   console.log("3. Finished getting location");
// })();

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     const data = await Promise.all([
//       getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
//       getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
//       getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
//     ]);

//     console.log(data.map((d) => d[0].capital));
//   } catch (err) {
//     console.error(err);
//   }
// };

// get3Countries("germany", "italy", "portugal");

//Promise.race()
// (async function () {
//   const response = await Promise.race([
//     getJSON(`https://restcountries.eu/rest/v2/name/germany`),
//     getJSON(`https://restcountries.eu/rest/v2/name/italy`),
//     getJSON(`https://restcountries.eu/rest/v2/name/portugal`),
//   ]);
//   console.log(response[0]);
// })();

// const timeout = function (seconds) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long`));
//     }, seconds * 1000);
//   });
// };

// Promise.race([
//   getJSON(`https://restcountries.eu/rest/v2/name/tanzania`),
//   timeout(5),
// ])
//   .then((data) => console.log(data[0]))
//   .catch((err) => console.error(err));

// //Promise.allSettled()
// Promise.allSettled([
//   Promise.resolve("Success"),
//   Promise.resolve("Error"),
//   Promise.resolve("Another Success"),
// ]).then((res) => console.log(res));

// //Promise.any [ES2021]
// Promise.any([
//   Promise.resolve("Success"),
//   Promise.resolve("Error"),
//   Promise.resolve("Another Success"),
// ]).then((res) => console.log(res));

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this 
time using async/await (only the part where the promise is consumed). Compare 
the two versions, think about the big differences, and see which one you like 
more.
Don't forget to test the error handler, and to set the network speed to 
'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 
'imgArr';
2. Use .map to loop over the array, to load all the images with the 
   'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. 
To test, turn off the 'loadNPause' function.
*/

//PART 1
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector(".images");

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath;

    img.addEventListener("load", function () {
      imgContainer.append(img);
      resolve(img);
    });
    img.addEventListener("error", () => reject(new Error("Image not found")));
  });
};

// let currentImg;

// createImage("img/img-1.jpg")
//   .then((img) => {
//     currentImg = img;
//     console.log("Image 1 loaded");
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = "none";
//     return createImage("img/img-2.jpg");
//   })
//   .then((img) => {
//     currentImg = img;
//     console.log("Image 2 loaded");
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = "none";
//   })
//   .catch((error) => console.error(error));

const loadNPause = async function () {
  try {
    //load image 1
    let img = await createImage("img/img-1.jpg");
    console.log("Image 1 loaded");
    await wait(2);
    img.style.display = "none";

    //load image 2
    img = await createImage("img/img-2.jpg");
    console.log("Image 2 loaded");
    await wait(2);
    img.style.display = "none";
  } catch (err) {
    console.error(err);
  }
};

// loadNPause();

//PART 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async (img) => await createImage(img));
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach((img) => img.classList.add("parallel"));
  } catch (err) {
    console.error(err);
  }
};

loadAll(["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"]);
