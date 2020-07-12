'use strict';

// crear botón de limpiar favoritos cuando la sección de favoritos tiene contenido

function createDeleteBtn() {
  let codeHTML =
    '<button id="delete-fav-button" class="delete-fav-button js-deleteAllFav" type="button">Clear</button>';
  containerDeleteAllBtn.innerHTML = codeHTML;
}

function clearAllFavorites() {
  localStorage.removeItem('favoriteList');
  for (let i = 0; i < cardShows.length; i++) {
    cardShows[i].classList.remove('cardShow-selected');
  }
  favoriteListSection.innerHTML = '';
}

if (favoriteShows.length > 0) {
  const deleteAllBtn = document.querySelector('.js-deleteAllFav');
  deleteAllBtn.addEventListener('click', clearAllFavorites);
  console.log('he llegado hasta aquí');
}
