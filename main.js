movies.forEach(movie => {
    const card = document.createElement("article");
    card.className = "w-[360px] bg-white rounded-lg p-8 font-semibold zoom-effect shadow-md m-10";
    
    
    card.innerHTML = `
        <h2 class="text-orange-700 bg-black text-center mb-2 rounded-sm">${movie.title} </h2>
        <img src="${movie.image}" alt="${movie.nombre} class="rounded-lg">
        <p class="p-6">${movie.tagline}</p>
        <p class="bg-black text-white p-6 rounded-lg">${movie.overview}</p>
    `;

    const container = document.getElementById("movies-container");


    container.appendChild(card);
});