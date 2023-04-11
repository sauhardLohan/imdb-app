const movieList = document.getElementById("movie-list");
// getting favourites list from localStorage 
let favouriteMovies = JSON.parse(localStorage.getItem("favourites"));
function unfavouriteMovie(id) {
  // function to unfavourite a movie 
  favouriteMovies = favouriteMovies.filter((movie) => movie.imdbID !== id);
  // setting new favourite array to localStorage 
  localStorage.setItem("favourites", JSON.stringify(favouriteMovies));
  alert("Movie deleted from favourites reload to see");
}
const div = document.createElement("div");

if (favouriteMovies == null || favouriteMovies[0] == undefined) {
  // if favourites list is empty, show heading 
  div.innerHTML = `
  <h1 class="text-center mt-5">NO MOVIES IN FAVOURITES</h1>
`;
  document.getElementById("heading").appendChild(div);
} else {
  // showing favourites list 
  div.innerHTML = `
<h1 class="text-center mt-5">Favourites</h1>
`;
  document.getElementById("heading").appendChild(div);
  // mapping over favoutite array to show every item as a li element 
  favouriteMovies.map((movie) => {
    const li = document.createElement("li");
    this.id = movie.imdbID;
    li.innerHTML = `
  <li >
    <div id="movies" class=" d-flex justify-content-between  mx-4 my-1">
    <div class="w-100 d-flex"><div id="movie-poster" class="me-3"><img src="${movie.Poster}" alt="movie-poster" class="h-100 w-100"></div>
    <div class="d-flex align-items-center"><a href="./MoviePage.html" id="${movie.imdbID}" class="me-1 display-6 " onclick="obj.handleMovieClick(this.id)" target="_blank">${movie.Title}</a></div>
    </div>
       <button  id="${movie.imdbID}" class="unfav-button" onclick="unfavouriteMovie(this.id)">Unfavourite</button>
    </div>
  </li>
  `;
  // appending li item to movieList ul tag 
    movieList.appendChild(li);
  });
}
