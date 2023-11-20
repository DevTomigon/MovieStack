// funciones.js

let allMovies = [];
let isFavsPage = false;
let moviesContainer;

export function setAllMovies(movies) {
  allMovies = movies;
}

export function setIsFavsPage(value) {
  isFavsPage = value;
}

document.addEventListener("DOMContentLoaded", () => {
  moviesContainer = document.getElementById('movies-container');
  const currentUrl = window.location.href;
  setIsFavsPage(currentUrl.includes("favs.html"));
});

export function getFavoriteMovies() {
  const favorites = localStorage.getItem('favoriteMovies');
  return favorites ? JSON.parse(favorites) : [];
}

export function getUniqueGenres(moviesData) {
  if (!Array.isArray(moviesData) || moviesData.length === 0) {
    return [];
  }

  const allGenres = moviesData.reduce((genres, movie) => {
    if (movie.genres && Array.isArray(movie.genres)) {
      return [...genres, ...movie.genres];
    }
    return genres;
  }, []);

  return [...new Set(allGenres)];
}

export function saveFavoriteMovies(favorites) {
  localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
}

export function addToFavorites(movieId) {
  const favorites = getFavoriteMovies();
  if (!favorites.includes(movieId)) {
    favorites.push(movieId);
    saveFavoriteMovies(favorites);
    console.log('Película añadida correctamente a favoritos');

    
    if (getIsFavsPage()) {
      const moviesContainer = document.getElementById('movies-container');
      renderMoviesListWithFavorites(allMovies, moviesContainer);
    }
  }
}

export function renderMovies(container, moviesList) {
  container.innerHTML = '';
  const favoriteMovies = getFavoriteMovies();

  moviesList.forEach(movie => {
    
    if (!getIsFavsPage() || (getIsFavsPage() && favoriteMovies.includes(movie.id))) {
      const card = createMovieCard(movie);
      container.appendChild(card);
    }
  });
}

export function renderMoviesListWithFavorites() {
  const favoriteMovies = getFavoriteMovies();

  if (favoriteMovies.length > 0) {
    const moviesToDisplay = allMovies.filter(movie => favoriteMovies.includes(movie.id));

    if (moviesContainer) {
      renderMovies(moviesContainer, moviesToDisplay);
    } else {
      console.error('moviesContainer is null.');
    }
  } else {
    
    console.warn('No hay películas marcadas como favoritas.');
  }
}

export function populateGenreOptions(genresData, genreSelect) {
  if (genreSelect) {
    genresData.forEach(genre => {
      const option = document.createElement('option');
      option.value = genre.toLowerCase();
      option.textContent = genre;
      genreSelect.appendChild(option);
    });
  }
}

export function removeFromFavorites(movieId) {
  const favorites = getFavoriteMovies();
  const updatedFavorites = favorites.filter(id => id !== movieId);
  saveFavoriteMovies(updatedFavorites);
}

export function handleButtonClick(movieId) {
  if (getIsFavsPage()) {
    removeFromFavorites(movieId);
    renderMoviesListWithFavorites();
  } else {
    addToFavorites(movieId);
    renderMoviesListWithFavorites();
  }
}

export function getIsFavsPage() {
  return isFavsPage;
}

export function createMovieCard(movie) {
  const card = document.createElement("article");
  const movieId = movie.id;
  const imageUrl = `https://moviestack.onrender.com/static/${movie.image}`;
  card.className =
    "w-[200px] sm:w-[300px] md:w-[200px] lg:w-[300px] rounded-lg p-2 font-semibold shadow-md m-2 sm:m-4 flex flex-col justify-center items-center bg-gray-200";

  card.innerHTML = `
    <h2 class="text-black rounded-md bg-gray-100 shadow-md shadow-gray-400 text-center mb-2 p-2">${movie.title}</h2>
    <img src="${imageUrl}" alt="${movie.title}" class="rounded-lg w-full">
    <p class="p-3 text-black">${movie.tagline}</p>
    <p class="bg-black text-white p-3 rounded-lg h-[100px] overflow-y-scroll overview hidden" style="overflow-y: scroll;">
      ${movie.overview}
    </p>
    <button class="favorite-button text-lg" data-id="${movieId}" id="favoriteButton" onclick="handleButtonClick('${movieId}')">
      ${isFavsPage ? 'Eliminar de Favoritas' : 'Añadir a Favoritas'}
    </button>
    <a href="detalles.html?id=${movieId}" class="hover:bg-sky-500 bg-gray-100 shadow-md shadow-gray-400 text-black flex justify-center items-center p-2 w-[250px] text-center rounded-md mb-2 zoom-effect">Ver más</a>
  `;

  card.setAttribute("data-id", movieId);

  return card;
}

export function filterMovies() {
  const genreSelect = document.getElementById('genreSelect');
  const searchInput = document.getElementById('searchInput');
  const moviesContainer = document.getElementById('movies-container');

  if (!genreSelect || !searchInput || !moviesContainer) {
    console.error('genreSelect, searchInput, or moviesContainer is null.');
    return;
  }

  const selectedGenre = genreSelect.value.toLowerCase();
  const searchText = searchInput.value.toLowerCase();

  const favoriteMovies = getFavoriteMovies();
  const filteredMovies = allMovies.filter(movie =>
    ((selectedGenre === 'todos' || (movie.genres && movie.genres.map(g => g.toLowerCase()).includes(selectedGenre))) &&
      (searchText === '' || movie.title.toLowerCase().includes(searchText)) &&
      favoriteMovies.includes(movie.id))
  );

  renderMoviesListWithFavorites(filteredMovies, moviesContainer);
}

