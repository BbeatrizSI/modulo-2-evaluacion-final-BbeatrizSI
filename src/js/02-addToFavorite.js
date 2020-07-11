'use strict';

function addToFavorite(ev) {
  ev.currentTarget.classList.toggle('cardShow-selected');

  for (let i = 0; i < shows.length; i++) {
    const numberId = parseInt(cardShows[i].dataset.id);
    let indexShows = shows.map((show) => show.idShow).indexOf(numberId);
    let indexFavorite = favoriteShows

      .map((show) => show.idShow)
      .indexOf(numberId);
    console.log(numberId);
    console.log(indexShows);
    console.log(indexFavorite);
    if (cardShows[i].classList.contains('cardShow-selected')) {
      console.log('Esto es que tiene la clase');
      if (indexFavorite === -1) {
        console.log('Esto es que tiene la clase y no existe en favoritos');
        favoriteShows.push(shows[indexShows]);
        console.log(shows[indexShows]);
      } else {
        console.log('No sé qué pasa');
      }
    } else {
      favoriteShows.splice(indexFavorite, 1);
      console.log('Esto es que NO tiene la clase');
    }
  }
}

function listenCardShowsClicks() {
  cardShows = document.querySelectorAll('.js-cardShow');

  for (let i = 0; i < shows.length; i++) {
    cardShows[i].addEventListener('click', addToFavorite);
  }
}
