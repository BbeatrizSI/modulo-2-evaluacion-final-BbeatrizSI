'use strict';

// Selectores Botón, Input, Sección de búsqueda y Sección de favoritos. Variables para Shows encontrados y para favoritos.

const searchBtn = document.querySelector('.js-search-button');
const searchInput = document.querySelector('.js-search-input');
const favoriteSection = document.querySelector('.js-favorite-section');
const searchSection = document.querySelector('.js-search-section');

let searchedShows = [];
let favoriteShows = [];

// Función que pinta las tarjetas que se obtienen de la búsqueda con su listener sobre el Botón

function paintShowCards() {
  fetch(`http://api.tvmaze.com/search/shows?q=${searchInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const divShow = document.createElement('div');
        divShow.className = 'cardShow js-cardShow';
        const imgShow = document.createElement('img');
        const titleShow = document.createElement('h2');

        if (data[i].show.image) {
          imgShow.src = data[i].show.image.original;
          imgShow.setAttribute(
            'alt',
            `Portada de la serie ${data[i].show.name}`
          );
        } else {
          imgShow.src =
            'https://via.placeholder.com/210x295/80cefe/666666/?text=TV';
          imgShow.setAttribute('alt', 'Portada no disponible');
        }

        const title = document.createTextNode(data[i].show.name);
        titleShow.appendChild(title);
        divShow.appendChild(imgShow);
        divShow.appendChild(titleShow);

        searchSection.appendChild(divShow);

        //Convierto el NodeList que se me genera en un array
        searchedShows = [...document.querySelectorAll('.js-cardShow')];
      }

      //Esta función es para aplicarle la clase de seleccionado a las tarjetas al clickearlas

      function selectShow(ev) {
        ev.currentTarget.classList.toggle('cardShow-selected');
      }

      for (let i = 0; i < searchedShows.length; i++) {
        searchedShows[i].addEventListener('click', selectShow);
      }
    });
}

searchBtn.addEventListener('click', paintShowCards);
