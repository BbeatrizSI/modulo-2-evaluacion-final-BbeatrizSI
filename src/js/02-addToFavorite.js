'use strict';

/* GESTIÓN DE FAVORITOS */

//marcar una serie como favorita añadiéndole la clase y metiéndola en el array de favoritas si no está previamente (si ya está, la borra)

function addToFavorite(ev) {
  ev.currentTarget.classList.toggle('cardShow-selected');

  for (let i = 0; i < shows.length; i++) {
    const numberId = parseInt(cardShows[i].dataset.id);
    let indexShows = shows.map((show) => show.idShow).indexOf(numberId);
    let indexFavorite = favoriteShows
      .map((show) => show.idShow)
      .indexOf(numberId);

    if (cardShows[i].classList.contains('cardShow-selected')) {
      if (indexFavorite === -1) {
        favoriteShows.push(shows[indexShows]);
      }
    } else if (indexFavorite !== -1) {
      favoriteShows.splice(indexFavorite, 1);
    }
  }

  paintFavoriteShows();

  storeFavorites();
}

//pintar las favoritas en su sección

function paintFavoriteShows() {
  let codeHTML = '';
  for (let i = 0; i < favoriteShows.length; i++) {
    codeHTML += `<li><div class="favorite-cardShow js-favCardShow" data-id="${favoriteShows[i].idShow}">`;
    codeHTML += `<div class="container-favleft"><img src="${favoriteShows[i].imgShow}" alt="Portada de ${favoriteShows[i].titleShow}" />`;
    codeHTML += `<h3>${favoriteShows[i].titleShow}</h3></div>`;
    codeHTML += `<div class="container-favright"><i class="fas fa-star star"></i><span class="delete-favorite js-deleteFav" data-id="${favoriteShows[i].idShow}">X</span></div>`;
    codeHTML += `</div></li>`;
  }
  favoriteListSection.innerHTML = `<ul>${codeHTML}</ul>`;

  // habilitar las "X" en cuanto se pinten

  listenXClicks();

  //si existe algún elemento en el array de favoritos y el contenedor del botón de log está vacío, generar botón de log

  if (favoriteShows.length > 0 && logBtnContainer.innerHTML === '') {
    createLogBtn();
  } else if (xDeleteFav.length === 0) {
    logBtnContainer.innerHTML = '';
  }

  //si existe algún elemento en el array de favoritos y el contenedor del botón de reset está vacío, generar botón de reset

  if (favoriteShows.length > 0 && containerDeleteAllBtn.innerHTML === '') {
    createDeleteBtn();
  } else if (xDeleteFav.length === 0) {
    containerDeleteAllBtn.innerHTML = '';
  }
}

function listenCardShowsClicks() {
  cardShows = document.querySelectorAll('.js-cardShow');
  for (let i = 0; i < shows.length; i++) {
    cardShows[i].addEventListener('click', addToFavorite);
  }
}

// Crear botón Log (número de favoritos) y escucharlo

function createLogBtn() {
  const codeHTML = `<button id="favorite-button" class="favorite-button js-favorite-button" type="button">Log</button>`;

  logBtnContainer.innerHTML = codeHTML;

  logBtn = document.querySelector('.js-favorite-button');
  logBtn.addEventListener('click', countFavorites);
}

function countFavorites() {
  console.log(`Tienes ${favoriteShows.length} series favoritas en tu lista.`);
}
