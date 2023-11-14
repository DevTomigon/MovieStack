document.addEventListener("DOMContentLoaded", () => {
  const moviesContainer = document.getElementById("movies-container");
  const genreSelect = document.getElementById('genreSelect');
  const searchInput = document.getElementById('searchInput');

  const genres = getUniqueGenres();
  populateGenreOptions(genres);

  function getUniqueGenres() {
    return [...new Set([].concat(...movies.map(movie => movie.genres)))];
  }

  function populateGenreOptions(genres) {
    genres.forEach(genre => {
      const option = document.createElement('option');
      option.value = genre.toLowerCase();
      option.textContent = genre;
      genreSelect.appendChild(option);
    });
  }

  function redirectToDetails(event) {
    const movieId = event.currentTarget.getAttribute("data-id");
    window.location.href = `detalles.html?id=${movieId}`;
  }

  function createMovieCard(movie) {
    const card = document.createElement("article");
    card.className =
      "w-[200px] sm:w-[300px] md:w-[200px] lg:w-[300px] rounded-lg p-2 font-semibold zoom-effect shadow-md m-2 sm:m-4 flex flex-col justify-between";

    card.innerHTML = `
      <h2 class="text-cyan-500 bg-black text-center mb-2 rounded-sm">${movie.title}</h2>
      <img src="${movie.image}" alt="${movie.title}" class="rounded-lg w-full">
      <p class="p-3 text-cyan-500">${movie.tagline}</p>
      <p class="bg-black text-white p-3 rounded-lg h-[100px] overflow-y-scroll overview hidden" style="overflow-y: scroll;">
        ${movie.overview}
      </p>
      <button class="bg-blue-500 shadow-md shadow-black text-white p-2 rounded-md mb-2" onclick="toggleOverview(this.parentNode)">Ver Más</button>
    `;

    card.setAttribute("data-id", movie.id);
    card.addEventListener("click", redirectToDetails);

    return card;
  }

  function renderMovies(moviesList) {
    const nuevoDiv = document.createDocumentFragment();

    moviesList.forEach(movie => {
      const card = createMovieCard(movie);
      nuevoDiv.appendChild(card);
    });

    moviesContainer.innerHTML = '';
    moviesContainer.appendChild(nuevoDiv);
  }

  function filterMovies() {
    const selectedGenre = genreSelect.value.toLowerCase();
    const searchText = searchInput.value.toLowerCase();

    const filteredMovies = movies.filter(movie =>
      ((selectedGenre === 'todos' || (movie.genres && movie.genres.map(g => g.toLowerCase()).includes(selectedGenre))) &&
      (searchText === '' || movie.title.toLowerCase().includes(searchText)))
    );

    renderMovies(filteredMovies);
  }

  genreSelect.addEventListener('change', filterMovies);
  searchInput.addEventListener('input', filterMovies);

  filterMovies();
});
