import './css/styles.css';
import debounce from 'lodash/debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,languages,flags`,
  )
    .then(res => res.json())
    .catch(error => console.log(`Smth wrong with request ${error}`));
}

input.addEventListener('input', debounce(search, DEBOUNCE_DELAY));

function clearData() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function renderCountries(countries) {
  return countries.map(country => {
    return `
    <li> 
    <img src = "${country.flags.svg}" alt = Flag of "${country.name}}" class = "flag" ">
    <span>${country.name}</span>
    </li>`;
  });
}

function search(e) {
  const inputValue = e.target.value.trim();
  if (inputValue === '') {
    clearData();
    return;
  }
  fetchCountries(inputValue).then(countries => {
    clearData();
    if (!countries || countries.length === 0) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    } else if (countries.length > 10) {
      Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (countries.length === 1) {
      countryInfo.insertAdjacentHTML('afterbegin', renderCountry(countries[0]));
    } else {
      console.log('countries :>> ', countries);
      const list = renderCountries(countries).join(' ');
      countryList.insertAdjacentHTML('afterbegin', list);
    }
  });
}

function renderCountry(country) {
  console.log('country :>> ', country);
  return `
    <div class="info-title">
    <img src = "${country.flags.svg}" alt = Flag of "${country.name}" class = "flag" ">
    <p><span>Country: </span>${country.name}</p>
    <p><span>Capital: </span>${country.capital}</p>
    <p><span>Population: </span>${country.population}</p>
    <p><span>language: </span>${Object.values(country.languages).join(', ')}</p>
  </div>`;
}






