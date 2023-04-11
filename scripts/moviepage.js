const div = document.createElement("div");
// getting current movie from localStorage which was clicked to see it's detail
const movie = JSON.parse(localStorage.getItem("current-movie"));
// fetching the details of movie from api using it's imdbID
const url = `http://www.omdbapi.com/?apikey=85055747&i=${movie.imdbID}`;
fetch(url)
  .then((response) => response.json())
  .then((movie) => {
    console.log(movie);
    if (movie.Response === "True") {
      // if movie found show it's details
      div.innerHTML = `    
        <div class="card border-0 mb-1 col-md-11  mx-auto mt-5 position-relative" id="artist-details">
            <div class="row h-100">
                <div class="col-sm-3 col-12 "id="artist-image" style="background-image: url(${movie.Poster});"></div>
                  <div class="card-body col-sm-5 col pt-5">
                    <div class="position-relative">
                      <!-- artist name  -->
                      <h1 class="card-title m-0 w-75">${movie.Title}</h1>
                      <!-- artist followers  -->
                      <h5 class=" position-absolute">Released : ${movie.Released}</h5>
                    </div>
                      <!-- artist information  -->
                      <h5 class="card-text m-0 my-4">${movie.Genre}</h5>
                      <h5 class="mb-5">${movie.Plot} </h5>
                      <!-- play all button  -->
                    <div  class="d-inline-block p-2  rounded me-5 text-white " id="play-all">IMDB RATING ${movie.imdbRating}</div>
                      <!-- follow link  -->
                      <p class="d-inline-block">${movie.Runtime}</p>
                      <p>Votes : ${movie.imdbVotes}</p>
                    </div>
              </div>
           </div>
        
        `;
        // adding it to body element  
      document.querySelector("body").appendChild(div);
    }
  })
  .catch(function (err) {
    // There was an error
    console.warn("Something went wrong.", err);
  });
