import { getUniqueGenres, renderMovies } from './funciones.js';

document.addEventListener("DOMContentLoaded", () => {
  const moviesContainer = document.getElementById("movies-container");
  const genreSelect = document.getElementById('genreSelect');
  const searchInput = document.getElementById('searchInput');

  const apiKey = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd";
  const apiUrl = "https://moviestack.onrender.com/api/movies";

 
  function renderMoviesListWithFavorites(moviesList) {
    const favoriteMovies = getFavoriteMovies();
    const moviesWithFavorites = moviesList.map(movie => ({
      ...movie,
      isFavorite: favoriteMovies.includes(movie.id),
    }));

    renderMovies(moviesContainer, moviesWithFavorites);
  }

 
  function renderMoviesListOnFavsPage() {
    const favoriteMovies = getFavoriteMovies();
    const favoriteMoviesData = movies.filter(movie => favoriteMovies.includes(movie.id));
    renderMovies(moviesContainer, favoriteMoviesData);
  }

  
  function filterMovies() {
    const selectedGenre = genreSelect.value.toLowerCase();
    const searchText = searchInput.value.toLowerCase();

    const filteredMovies = movies.filter(movie =>
      ((selectedGenre === 'todos' || (movie.genres && movie.genres.map(g => g.toLowerCase()).includes(selectedGenre))) &&
        (searchText === '' || movie.title.toLowerCase().includes(searchText)))
    );

    renderMoviesListWithFavorites(filteredMovies);
  }

  
  function toggleFavorite(movieId) {
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];

    const index = favoriteMovies.indexOf(movieId);
    if (index === -1) {
      favoriteMovies.push(movieId);
    } else {
      favoriteMovies.splice(index, 1);
    }

    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
    renderMoviesListWithFavorites(movies); 
  }

 
  window.toggleLike = toggleFavorite;

  fetch(apiUrl, {
    headers: {
      "x-api-key": apiKey
    }
  })
  .then(response => response.json())
  .then(data => {
    const movies = data.movies;
    const genres = getUniqueGenres(movies);
    populateGenreOptions(genres);
    renderMovies(moviesContainer, movies);

    function populateGenreOptions(genresData) {
      genresData.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.toLowerCase();
        option.textContent = genre;
        genreSelect.appendChild(option);
      });
    }

    
    if (window.location.pathname.includes("favs.html")) {
      renderMoviesListOnFavsPage();
    }

    
    genreSelect.addEventListener('change', filterMovies);
    searchInput.addEventListener('input', filterMovies);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
});


function getFavoriteMovies() {
  return JSON.parse(localStorage.getItem('favoriteMovies')) || [];
}
