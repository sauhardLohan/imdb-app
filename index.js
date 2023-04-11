const searchBar = document.getElementById("search-bar");
const form = document.querySelector("form");
// movie list ul component 
const movieList = document.getElementById("movie-list");
// heading to show when no movies are being searched
movieList.innerHTML = `<h1 class="text-center mt-5">Movies will show here search for movies to see list </h1>`;
// class imdb to handle movie search and showing results
class Imdb {
  constructor() {
    // movies array to show search results
    this.movies = [];
  }
  findCurrentMovie(id) {
    // to find movie with respect to id provided
    const movies = this.movies;
    return movies.filter((movie) => id == movie.imdbID)[0];
  }
  handleMovieClick(id) {
    // adding the movie clicked to current movie in local storage to access it in MoviePage
    localStorage.setItem(
      "current-movie",
      JSON.stringify(this.findCurrentMovie(id))
    );
  }
  isMovieFavourite(id) {
    // see if movie is already in favourite list or not
    const currentMovie = this.findCurrentMovie(id);
    let favourites = JSON.parse(localStorage.getItem("favourites"));
    if (favourites == null) {
      return false;
    }
    if (
      favourites.filter((movie) => movie.imdbID === currentMovie.imdbID)[0] !==
      undefined
    ) {
      return true;
    }
    return false;
  }
  handleFavouriteClick(id) {
    // adding to favourite list if not present already 
    let favourites = JSON.parse(localStorage.getItem("favourites"));
    if (favourites == null) {
      favourites = [];
    }
    const currentMovie = this.findCurrentMovie(id);
    if (this.isMovieFavourite(id)) {
      // Movie already in favourite list
      alert("Movie already in favourite list");
      return;
    }
    // Movie added to favourite list
    favourites.push(currentMovie);
    alert("Movie added to favourite list");
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }
  // function to handle search with search value to be input value
  handleSearch(e) {
    const search = e.target.value;
    if (e.target.value) {
      // set loading with a loader 
      movieList.innerHTML = `<div class="app-spinner"></div>`;
    } else {
      // if input bar is empty show heading  
      movieList.innerHTML = `<h1 class="text-center mt-5">Movies will show here search for movies to see list </h1>`;
    }
    // fetching search results from api using s parameter of OMDb API
    const url = `http://www.omdbapi.com/?apikey=85055747&s=${search}`;
    fetch(url)
      .then((response) => response.json())
      .then((movies) => {
        if (movies.Response === "True") {
          // if movies search response is successfull show movies 
          // unsetting loader 
          movieList.innerHTML = "";
          this.movies = movies.Search;
          movies.Search.map((movie) => {
            // showing each movie as a li item 
            const li = document.createElement("li");
            li.innerHTML = `
        <li >
          <div id="movies" class=" d-flex justify-content-between  mx-4 my-1">
          <div class="w-100 d-flex"><div id="movie-poster" class="me-2"><img src="${movie.Poster}" alt="movie-poster" class="h-100 w-100"></div>
          <div class="d-flex align-items-center"><a href="./MoviePage.html" id="${movie.imdbID}" class="me-1 display-6 " " target="_blank">${movie.Title}</a></div>
          </div>
          </div>
        </li>
        `;
        // adding it to movieList  ul component 
            movieList.appendChild(li);
          });
        }
      })
      .catch(function (err) {
        // There was an error
        alert("Something went wrong.");
        console.warn("Something went wrong.", err);
      });
  }
  handleSubmit = (e) => {
    // prevent page from reload on submit
    e.preventDefault();
  };
}
const obj = new Imdb();
searchBar.addEventListener("input", function (e) {
  // on entering of word in input bar show results 
  obj.handleSearch(e);
});
form.addEventListener("submit", function (e) {
    // prevent page from reload on submit
  obj.handleSubmit(e);
});
