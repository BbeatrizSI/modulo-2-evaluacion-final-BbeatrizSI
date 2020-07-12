'use strict';

function storeFavorites() {
  localStorage.setItem('favoriteList', JSON.stringify(favoriteShows));
}

// al arrancar la página
function getFromLocalStorage() {
  const favShowsRaw = localStorage.getItem('favoriteList');
  const favShows = JSON.parse(favShowsRaw);

  if (favShowsRaw !== null) {
    favoriteShows = favShows;
    paintFavoriteShows();
  }
}
