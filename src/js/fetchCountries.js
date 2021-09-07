import {BASE_FETCH_URL} from '../const/index';
import {inputRefs, outputRefs} from '../const/refs';

import countryTpl from '../templates/country.hbs';
import countriesTpl from '../templates/countries.hbs';

import {error} from '../../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';

function fetchCountries(name) {
  return fetch(BASE_FETCH_URL + name)
    .then(response => {
      return response.json();
    });
}

function showMessage() {
  error({
    text: 'Too many matches found. Please enter a more specific query!',
    delay: 2000,
  });
}

function onCreateCountriesMarkup() {
  const filter = inputRefs.value.toLowerCase();

  fetchCountries(filter).then(data => {
    const dataLength = data.length;

    if (dataLength === 1) {
      const country = creatCountryMarkup(data);
      updatePage(country);
    } else if (dataLength > 1 && dataLength < 10) {
      updatePage(creatCountriesMarkup(data));
    } else {
      updatePage();
      showMessage();
    }

  }).catch(error => {
    console.log(error);
  });
}

function updatePage(markup = '') {
  outputRefs.innerHTML = markup;
}

function creatCountriesMarkup(country) {
  return countriesTpl(country);
}

function creatCountryMarkup(country) {
  return countryTpl(country);

  // через map
  // return country.map(countryTpl).join('');
}

const _debounce = require('lodash.debounce');

inputRefs.addEventListener('input', _debounce(onCreateCountriesMarkup, 500));


