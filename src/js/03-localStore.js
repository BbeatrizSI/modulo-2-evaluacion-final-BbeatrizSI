'use strict';

//almacenar el array de favoritos en el localStorage cada vez que se añade o elimina un elemento.

function storeFavorites() {
  localStorage.setItem('favoriteList', JSON.stringify(favoriteShows));
}

// recuperar la info del LocalStorage (se ejecuta al arrancar la página)

function getFromLocalStorage() {
  const favShowsRaw = localStorage.getItem('favoriteList');
  const favShows = JSON.parse(favShowsRaw);

  if (favShowsRaw !== null) {
    favoriteShows = favShows;
    paintFavoriteShows();
  }
}
