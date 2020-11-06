'use strict';

/* PETICIÓN AL SERVIDOR Y PINTADO DE SHOWS */

// Selectores Botón, Input, Sección de búsqueda y Sección de favoritos. Variables para Shows encontrados y para favoritos.

const searchBtn = document.querySelector('.js-search-button');
const logBtnContainer = document.querySelector('.js-logBtnContainer');
const searchInput = document.querySelector('.js-search-input');
const favoriteListSection = document.querySelector('.js-favoriteShows-section');
const searchSection = document.querySelector('.js-search-section');
const containerDeleteAllBtn = document.querySelector(
  '.js-deleteAllBtnContainer'
);
const form = document.querySelector('.js-form');
let logBtn = '';

let searchedShows = [];
let favoriteShows = [];
let shows = [];
let cardShows = [];
let favCardShows = [];
let xDeleteFav = [];

//recuperar del LocalStorage la info almacenada

getFromLocalStorage();

//Recibir info de la API y generar un array de objetos con el id, imagen y título de las series buscadas

function getSearchedInfo(ev) {
  ev.preventDefault();
  fetch(`https://api.tvmaze.com/search/shows?q=${searchInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      searchedShows = data;

      for (let i = 0; i < searchedShows.length; i++) {
        let imgUrl = '';
        if (searchedShows[i].show.image === null) {
          imgUrl = 'https://via.placeholder.com/210x295/ebcd80/666666/?text=TV';
        } else {
          imgUrl = searchedShows[i].show.image.medium;
        }

        shows[i] = {
          idShow: searchedShows[i].show.id,
          imgShow: imgUrl,
          titleShow: searchedShows[i].show.name,
          language: searchedShows[i].show.language,
        };
      }
      paintShows();
    });
}

//Pintar las tarjetas en la sección de elementos buscados. Si el id del elemento buscado existe en favoritos, le aplica la clase de seleccionado.

function paintShows() {
  let codeHTML = '';
  const prefLanguages = ['English', 'Spanish', 'Portuguese'];

  for (let i = 0; i < shows.length; i++) {
    const numberId = shows[i].idShow;
    let indexFavorite = favoriteShows
      .map((show) => show.idShow)
      .indexOf(numberId);

    let recomend = '';

    if (prefLanguages.includes(shows[i].language)) {
      recomend = `<i class="far fa-thumbs-up recomend" title="You undestand it!!"></i>`;
    } else {
      recomend = `<i class="fas fa-exclamation-triangle caution" title="Aware: language is ${shows[i].language}"></i>`;
    }

    let option = '';

    if (indexFavorite !== -1) {
      option = 'cardShow-selected';
    }

    codeHTML += `<div class="cardShow js-cardShow ${option}" data-id="${shows[i].idShow}">`;
    codeHTML += `<img src="${shows[i].imgShow}" alt="Portada de ${shows[i].titleShow}" />`;
    codeHTML += `<h2>${shows[i].titleShow}</h2>`;
    codeHTML += `<span class="language-container"><i class="fas fa-language language" title="${shows[i].language}"></i>${recomend}</span>`;
    codeHTML += `</div>`;
  }
  searchSection.innerHTML = codeHTML;
  listenCardShowsClicks();
}

searchBtn.addEventListener('click', getSearchedInfo);
form.addEventListener('submit', getSearchedInfo);
