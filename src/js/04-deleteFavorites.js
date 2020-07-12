'use strict';

/* BOTÓN DE CLEAR Y "X" DE CADA SERIE FAVORITA */

// crear botón de limpiar favoritos cuando la sección de favoritos tiene contenido

function createDeleteBtn() {
  let codeHTML =
    '<button id="delete-fav-button" class="delete-fav-button js-deleteAllFav" type="button">Clear</button>';
  containerDeleteAllBtn.innerHTML = codeHTML;
}

// función para borrar todos los favoritos, tanto del local storage como del array de favoritos. También quita la clase de seleccionado a todo y vacía el aside donde se pintan.

function clearAllFavorites() {
  localStorage.removeItem('favoriteList');
  for (let i = 0; i < cardShows.length; i++) {
    cardShows[i].classList.remove('cardShow-selected');
  }
  favoriteListSection.innerHTML = '';
  containerDeleteAllBtn.innerHTML = '';
  favoriteShows.splice(0, favoriteShows.length);
}

const deleteAllBtn = document.querySelector('.js-deleteAllFav');
deleteAllBtn.addEventListener('click', clearAllFavorites);

// habilitar las "X" para que eliminen del array de favoritos y del LocalStorage una a una las series. También desaparecen del array y se le quita la clase de seleccionada.

favCardShows = document.querySelectorAll('.js-favCardShow');

function clearOneFav(ev) {
  const numberId = parseInt(ev.currentTarget.dataset.id);
  let indexShow = shows.map((show) => show.idShow).indexOf(numberId);
  let indexFavorite = favoriteShows
    .map((show) => show.idShow)
    .indexOf(numberId);

  if (indexFavorite !== -1) {
    favoriteShows.splice(indexFavorite, 1);
    if (cardShows[indexShow]) {
      cardShows[indexShow].classList.remove('cardShow-selected');
    }
    storeFavorites();
    paintFavoriteShows();
  }
}

function listenXClicks() {
  xDeleteFav = document.querySelectorAll('.js-deleteFav');
  for (let i = 0; i < xDeleteFav.length; i++) {
    xDeleteFav[i].addEventListener('click', clearOneFav);
  }
}
