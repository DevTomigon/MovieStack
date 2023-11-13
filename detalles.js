document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id");

  const selectedMovie = movies.find((movie) => movie.id === movieId);

  if (selectedMovie) {
    const detallesContainer = document.getElementById("detalles-container");
    detallesContainer.innerHTML = `

        <div class="flex-1 mr-3 bg-black rounded-xl h-[450px] text-white mt-4 ml-4 flex items-center justify-center flex-col">
        <img src="${selectedMovie.image}" alt="${selectedMovie.title}" class="mt-4 mr-4 p-4">
        <table class="mt-5 ml-3 w-[300px] p-4 mb-7">
            <tr>
                <td class="bg-white text-gray-900">Original Language:</td>
                <td class="bg-white text-gray-900">${
                  selectedMovie.original_language
                }</td>
            </tr>
            <tr>
                <td class="bg-gray-400">Release Date:</td>
                <td class="bg-gray-400">${
                  selectedMovie.release_date
                }</td>
            </tr>
            <tr>
                <td class="bg-white text-gray-900">Runtime:</td>
                <td class="bg-white text-gray-900">${
                  selectedMovie.runtime
                } minutes</td>
            </tr>
            <tr>
                <td class="bg-gray-400">Status:</td>
                <td class="bg-gray-400">${selectedMovie.status}</td>
            </tr>
        </table>
    </div>
    <div class="flex-1 border border-black text-white mr-3 bg-black rounded-xl h-[450px] mt-4 ml-4 pb-4 text-center justify-center items-center flex flex-col">
    <h1 class="text-2xl font-bold  text-cyan-500 mt-4 bg-white rounded-md">${
      selectedMovie.title
    }</h1>
    <p class="text-md mt-2">${selectedMovie.tagline}</p>
    <p class="mt-2">Genre: ${selectedMovie.genres.join(", ")}</p>
    <p class="mt-2">${selectedMovie.overview}</p>
    <table class="mt-2 w-[400px] ml-12 bg-gray-400">
        <tr>
            <td class="bg-white text-gray-900">Vote Average ⭐:</td>
            <td class="bg-white text-gray-900">${selectedMovie.vote_average}</td>
        </tr>
        <tr>
            <td class="bg-gray-400">Budget:</td>
            <td class="bg-gray-400">${selectedMovie.budget}</td>
        </tr>
        <tr>
            <td class="bg-white text-gray-900">Revenue:</td>
            <td class="bg-white text-gray-900">${selectedMovie.revenue}</td>
        </tr>
    </table>
</div>`;
  } else {
    console.error("Película no encontrada");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const mostrarDetallesBtn = document.getElementById("mostrarDetallesBtn");
    const detallesContainer = document.getElementById("detalles");

    mostrarDetallesBtn.addEventListener("click", () => {
      detallesContainer.style.display =
        detallesContainer.style.display === "none" ? "block" : "none";
    });
  });
});
