<<<<<<< HEAD
'use strict';

// Selectores Botón, Input, Sección de búsqueda y Sección de favoritos. Variables para Shows encontrados y para favoritos.

const searchBtn = document.querySelector('.js-search-button');
const searchInput = document.querySelector('.js-search-input');
const favoriteSection = document.querySelector('.js-favorite-section');
const searchSection = document.querySelector('.js-search-section');

let searchedShows = [];
let favoriteShows = [];
let divShow;

// Función que pinta las tarjetas que se obtienen de la búsqueda con su listener sobre el Botón

function paintShowCards() {
  fetch(`http://api.tvmaze.com/search/shows?q=${searchInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      searchedShows = data;
      for (let i = 0; i < searchedShows.length; i++) {
        divShow = document.createElement('div');
        divShow.className = 'cardShow js-cardShow';
        const imgShow = document.createElement('img');
        const titleShow = document.createElement('h2');

        if (searchedShows[i].show.image) {
          imgShow.src = searchedShows[i].show.image.medium;
          imgShow.setAttribute(
            'alt',
            `Portada de la serie ${searchedShows[i].show.name}`
          );
        } else {
          imgShow.src =
            'https://via.placeholder.com/210x295/80cefe/666666/?text=TV';
          imgShow.setAttribute('alt', 'Portada no disponible');
        }

        const title = document.createTextNode(searchedShows[i].show.name);
        titleShow.appendChild(title);
        divShow.appendChild(imgShow);
        divShow.appendChild(titleShow);

        searchSection.appendChild(divShow);
        console.log(divShow);
      }

      //Esta función es para aplicarle la clase de seleccionado a las tarjetas al clickearlas y agregar al array favoriteShows los items que tengan la clase 'cardShow-selected'

      function addToFavorite(ev) {
        ev.currentTarget.classList.toggle('cardShow-selected');

        // for (let i = 0; i < searchedShows.length; i++) {
        //   favoriteShows = searchedShows.filter((show) =>
        //     show.classList.contains('cardShow-selected')
        //   );
        //   favoriteSection.innerHTML(favoriteShows[i]);
        // }
      }

      const showCard = document.querySelectorAll('.js-cardShow');

      for (let i = 0; i < searchedShows.length; i++) {
        showCard[i].addEventListener('click', addToFavorite);
      }
    });
}

searchBtn.addEventListener('click', paintShowCards);
=======
'use strict';

// Selectores Botón, Input, Sección de búsqueda y Sección de favoritos. Variables para Shows encontrados y para favoritos.

const searchBtn = document.querySelector('.js-search-button');
const searchInput = document.querySelector('.js-search-input');
const favoriteSection = document.querySelector('.js-favorite-section');
const searchSection = document.querySelector('.js-search-section');

let searchedShows = [];
let favoriteShows = [];
let shows = [];
let cardShows = [];

//Recibir info de la API y generar un array de objetos con el id, imagen y título de las series buscadas

function getSearchedInfo() {
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

//Pintar las tarjetas en la sección de elementos buscados

function paintShows() {
  let codeHTML = '';
  for (let i = 0; i < shows.length; i++) {
    codeHTML += `<div class="cardShow js-cardShow" data-id="${shows[i].idShow}">`;
    codeHTML += `<img src="${shows[i].imgShow}" alt="Portada de ${shows[i].titleShow}" />`;
    codeHTML += `<h2>${shows[i].titleShow}</h2>`;
    codeHTML += `</div>`;
  }
  searchSection.innerHTML = codeHTML;
  listenCardShowsClicks();
}

searchBtn.addEventListener('click', getSearchedInfo);
>>>>>>> favorites
