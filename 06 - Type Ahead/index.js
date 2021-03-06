const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

const prom = fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));


function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithWhitespace(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="u-text-prominent">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="u-text-prominent">${this.value}</span>`);
    return `
    <li class="c-search__item">
      <span>${cityName}, ${stateName}</span>
      <span class="u-text-shadowed">${numberWithWhitespace(place.population)}</span>
    </li>
    `;
  }).join('');

  searchList.innerHTML = html;
}

const searchInput = document.querySelector('.js-search__input');
const searchList = document.querySelector('.js-search__list');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
