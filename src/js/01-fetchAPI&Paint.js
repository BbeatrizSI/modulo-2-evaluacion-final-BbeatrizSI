'use strict';

/* PETICIÓN AL SERVIDOR Y PINTADO DE SHOWS */

// Selectores Botón, Input, Sección de búsqueda y Sección de favoritos. Variables para Shows encontrados y para favoritos.

const searchBtn = document.querySelector('.js-search-button');
const searchInput = document.querySelector('.js-search-input');
const favoriteListSection = document.querySelector('.js-favoriteShows-section');
const searchSection = document.querySelector('.js-search-section');
const containerDeleteAllBtn = document.querySelector(
  '.js-deleteAllBtnContainer'
);
const form = document.querySelector('.js-form');

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
  fetch(`http://api.tvmaze.com/search/shows?q=${searchInput.value}`)
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
        };
      }
      paintShows();
    });
}

//Pintar las tarjetas en la sección de elementos buscados. Si el id del elemento buscado existe en favoritos, le aplica la clase de seleccionado.

function paintShows() {
  let codeHTML = '';

  for (let i = 0; i < shows.length; i++) {
    const numberId = shows[i].idShow;
    let indexFavorite = favoriteShows
      .map((show) => show.idShow)
      .indexOf(numberId);

    if (indexFavorite !== -1) {
      codeHTML += `<div class="cardShow js-cardShow cardShow-selected" data-id="${shows[i].idShow}">`;
      codeHTML += `<img src="${shows[i].imgShow}" alt="Portada de ${shows[i].titleShow}" />`;
      codeHTML += `<h2>${shows[i].titleShow}</h2>`;
      codeHTML += `</div>`;
    } else {
      codeHTML += `<div class="cardShow js-cardShow" data-id="${shows[i].idShow}">`;
      codeHTML += `<img src="${shows[i].imgShow}" alt="Portada de ${shows[i].titleShow}" />`;
      codeHTML += `<h2>${shows[i].titleShow}</h2>`;
      codeHTML += `</div>`;
    }
  }
  searchSection.innerHTML = codeHTML;
  listenCardShowsClicks();
}

searchBtn.addEventListener('click', getSearchedInfo);
form.addEventListener('submit', getSearchedInfo);
