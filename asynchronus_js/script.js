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
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  // countriesContainer.style.opacity = 1;
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

const getJSON = function (url, errorMessage = `Something went wrong`) {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMessage}, ${response.status}`);

    return response.json();
  });
};

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

btn.addEventListener("click", () => getCountryData("australia"));

//WHERE AM I
const whereAmI = function (lat, lng) {
  //part 1:1 reverse geocode
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then((response) => {
      console.log(response);

      if (!response.ok)
        throw new Error(`Problem with geocoding, ${response.status}`);

      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Country not found, ${response.status}`);
      }

      return response.json();
    })
    .then((data) => renderCountry(data))
    .catch((error) => console.log(`${error.message}, pepe`));
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
