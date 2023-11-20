// main.js

import {
  getUniqueGenres,
  renderMovies,
  populateGenreOptions,
  addToFavorites,
  removeFromFavorites,
  renderMoviesListWithFavorites,
  handleButtonClick,
  setAllMovies,
  setIsFavsPage,
  getFavoriteMovies,
  getIsFavsPage
} from './funciones.js';

let moviesContainer;
let allMovies = [];

document.addEventListener("DOMContentLoaded", () => {
  const genreSelect = document.getElementById('genreSelect');
  const searchInput = document.getElementById('searchInput');
  moviesContainer = document.getElementById('movies-container');

  if (genreSelect && searchInput) {
    genreSelect.addEventListener('change', filterMovies);
    searchInput.addEventListener('input', filterMovies);
  }

  const apiKey = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd";
  const apiUrl = "https://moviestack.onrender.com/api/movies";

  window.handleButtonClick = handleButtonClick;

  function filterMovies() {
    const selectedGenre = genreSelect.value.toLowerCase();
    const searchText = searchInput.value.toLowerCase();
  
    const filteredMovies = allMovies.filter(movie =>
      ((selectedGenre === 'todos' || (movie.genres && movie.genres.map(g => g.toLowerCase()).includes(selectedGenre))) &&
        (searchText === '' || movie.title.toLowerCase().includes(searchText)))
    );
  
    renderMoviesListWithFavorites(filteredMovies, moviesContainer);
  }

  

  // aca empieza el fetch
  fetch(apiUrl, {
    headers: {
      "x-api-key": apiKey
    }
  })
    .then(response => response.json())
    .then(data => {
      allMovies = data.movies;
      setAllMovies(allMovies);
      setIsFavsPage(window.location.href.includes("favs.html"));
      const genres = getUniqueGenres(allMovies);
      if (genreSelect) {
        populateGenreOptions(genres, genreSelect);
        genreSelect.addEventListener('change', filterMovies);
      } else {
        console.error('genreSelect is null.');
      }

      if (searchInput) {
        searchInput.addEventListener('input', filterMovies);
      } else {
        console.error('searchInput is null.');
      }

      renderMovies(moviesContainer, allMovies);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});
