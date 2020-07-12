'use strict';

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
}

//pintar las favoritas en su sección

function paintFavoriteShows() {
  let codeHTML = '';
  for (let i = 0; i < favoriteShows.length; i++) {
    codeHTML += `<li><div class="favorite-cardShow js-favCardShow" data-id="${favoriteShows[i].idShow}">`;
    codeHTML += `<div class="container-favleft"><img src="${favoriteShows[i].imgShow}" alt="Portada de ${favoriteShows[i].titleShow}" />`;
    codeHTML += `<h3>${favoriteShows[i].titleShow}</h3></div>`;
    codeHTML += `<span class="delete-favorite js-deleteFav">X</span>`;
    codeHTML += `</div></li>`;
  }
  favoriteSection.innerHTML = codeHTML;
}

function listenCardShowsClicks() {
  cardShows = document.querySelectorAll('.js-cardShow');
  for (let i = 0; i < shows.length; i++) {
    cardShows[i].addEventListener('click', addToFavorite);
  }
}
