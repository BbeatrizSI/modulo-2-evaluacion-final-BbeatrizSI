'use strict';

const searchBtn = document.querySelector('.js-search-button');
const searchInput = document.querySelector('.js-search-input');
const favoriteSection = document.querySelector('.js-favorite-section');
const searchSection = document.querySelector('.js-search-section');

function getShowsInfo() {
  fetch(`http://api.tvmaze.com/search/shows?q=${searchInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const divShow = document.createElement('div');
        divShow.className = 'cardShow';
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
        console.log(divShow);
      }
    });
}

searchBtn.addEventListener('click', getShowsInfo);
