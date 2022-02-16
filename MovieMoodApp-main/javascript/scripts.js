// create app object //
const movieMood = {}

// create variables for API information //
movieMood.apiURL = `https://api.themoviedb.org/3/discover/movie`;
movieMood.apiKey = `c7b080a6a4bebf767174709ad40d8d83`;

// create method to retrive data from API //

movieMood.getMovie = function (userDecadeValue, userGenreValue) {

    // construct URL endpoint and specifcy the paremeters we want to include  //
    const url = new URL(movieMood.apiURL);
    url.search = new URLSearchParams({
        // include URL parms here
        api_key: movieMood.apiKey,
        year: userDecadeValue,
        with_genres: userGenreValue,
    });

    // pass in new URL featuring params provided by the URLSearchParams constructor //
    fetch(url)
        .then(function (response) {
            // parse this response into JSON
            // return JSON response so that it can be used in the next function
            return response.json();
        })
        //parse the JSON Promise response and log out readable data (AKA data in JSON format)
        .then(function (jsonResponse) {
            console.log(jsonResponse);
        });
}

// create method to display to display API data //

movieMood.displayMovies = function (movieArray) {
    // clear the old selections //
    const ulElement = document.querySelector('#movie-display-ul');
    ulElement.innerHTML = '';
    movieArray.forEach(function (individualMovieObject) {

        // extract the data from API (movieId, movieTitle, moivePoster, movieSynopsis)

        const movieId = individualMovieObject.id;
        const movieTitle = individualMovieObject.title;
        const moviePoster = individualMovieObject.poster_path;
        const movieSynopsis = individualMovieObject.overview;

        console.log(movieId, movieTitle, moviePoster, movieSynopsis)

    });
}

// Listen for the user input //
movieMood.eventListenerSetup = function () {

    const userInput = document.querySelector('button');

    userInput.addEventListener("click", function () {

        // Get search parmeter inputs from user //

        const userGenreInput = document.getElementById("user-input-one");
        const userGenreValue = userGenreInput.value;
        console.log(userGenreValue);

        const userDecadeInput = document.getElementById("user-input-two");
        console.log(userDecadeInput);
        const userDecadeValue = userDecadeInput.value;
        console.log(userDecadeValue);
    });
}


// create a forEach array 


// create li element for movies to be appended onto page

// const liElement = document.createElement('li');

// liElement.classList.add('movie');

// // create h2 element for movie title to be appended

// const heading = document.createElement('h2');

// // create img element for movie poster to be apended onto page 

// const image = document.createElement('img');

// // create p element for movie synopsis to be appended onto page

// const pargraph = document.createElement('p');

// // // create app intialization method //

movieMood.init = function () {
    movieMood.eventListenerSetup();
    movieMood.getMovie();
};

// call init method //

movieMood.init();


