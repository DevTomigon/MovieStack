export function getUniqueGenres(moviesData) {
    return [...new Set([].concat(...moviesData.map(movie => movie.genres)))];
  }
  
  export function redirectToDetails(movieId) {
    window.location.href = `detalles.html?id=${movieId}`;
  }
  
  export function createMovieCard(movie) {
    const card = document.createElement("article");
    const movieId = movie.id;
    const imageUrl = `https://moviestack.onrender.com/static/${movie.image}`;
    card.className =
    "w-[200px] sm:w-[300px] md:w-[200px] lg:w-[300px] rounded-lg p-2 font-semibold shadow-md m-2 sm:m-4 flex flex-col     justify-center items-center bg-gray-200";

    card.innerHTML = `
    <h2 class="text-black rounded-md bg-gray-100 shadow-md shadow-gray-400 text-center mb-2 p-2">${movie.title}</h2>
    <img src="${imageUrl}" alt="${movie.title}" class="rounded-lg w-full">
    <p class="p-3 text-black">${movie.tagline}</p>
    <p class="bg-black text-white p-3 rounded-lg h-[100px] overflow-y-scroll overview hidden" style="overflow-y: scroll;">
    ${movie.overview}
    </p>
    <a href="detalles.html?id=${movieId}" class="hover:bg-sky-500 bg-gray-100 shadow-md shadow-gray-400 text-black flex justify-center items-center p-2 w-[250px] text-center rounded-md mb-2 zoom-effect">Ver más</a>
    <button class="favorite-button text-lg"><i class="fas fa-star">FAVORITO</i></button>
    `;
  
    card.setAttribute("data-id", movieId);

  
    
    const favoriteButton = card.querySelector(".favorite-button");
    if (favoriteButton) {
      favoriteButton.addEventListener("click", () => toggleFavorite(movieId));
    }
  
    return card;
  }

  export function toggleFavorite(movieId) {
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
  
    const index = favoriteMovies.indexOf(movieId);
    if (index === -1) {
      favoriteMovies.push(movieId);
    } else {
      favoriteMovies.splice(index, 1);
    }
  
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
  }
  

  export function getFavoriteMovies() {
    return JSON.parse(localStorage.getItem('favoriteMovies')) || [];
  }
  
  export function renderMovies(moviesContainer, moviesList) {
    moviesContainer.innerHTML = '';
  
    moviesList.forEach(movie => {
      const card = createMovieCard(movie);
      moviesContainer.appendChild(card);
    });
  }