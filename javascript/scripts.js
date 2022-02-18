// create app object //
const movieMood = {}

// create variables for API information //
movieMood.apiURL = `https://api.themoviedb.org/3/discover/movie`;
movieMood.apiKey = `c7b080a6a4bebf767174709ad40d8d83`;


// Event Listener: Listen for the user input //
movieMood.eventListenerSetup = function () {

    const userInput = document.querySelector('button');

    userInput.addEventListener("click", function () {

        // Get search parmeter inputs from user //

        const userGenreInput = document.getElementById("user-input-one");
        const userGenreValue = userGenreInput.value;
        console.log(userGenreValue);

        const userDecadeInput = document.getElementById("user-input-two");
        const userDecadeValue = userDecadeInput.value;
        console.log(userDecadeValue);

        movieMood.getMovie(userDecadeValue, userGenreValue);
    });


    // Create method to retrive data from API //
    movieMood.getMovie = function (userDecadeValue, userGenreValue) {

        // construct URL endpoint and specify the paremeters we want to include  //
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
                console.log(response);
                return response.json();
            })
            //parse the JSON Promise response and log out readable data (AKA data in JSON format)
            .then(function (jsonResponse) {
                console.log(jsonResponse);

                // movieMood.displayMovies(jsonResponse);

                // get the total number query results pages
                let totalPages = jsonResponse.total_pages;
                console.log('Total pages to choose from: ', totalPages);
                // Make sure we have a full page of results
                totalPages = totalPages - 1;
                console.log('Total pages - 1: ', totalPages);
                // Gereate a random page number to return
                const randomPage = Math.floor(Math.random() * `${totalPages}`) + 1;
                console.log('This is the random page to display: ', randomPage);


                movieMood.getDetails(userDecadeValue, userGenreValue, randomPage);
            });
    }



    // Second API call to get specific page of results (and combine poster_path results to grab poster img files)
    movieMood.getDetails = function (userDecadeValue, userGenreValue,randomPage) {
        console.log('Random page we will use: ',randomPage);
        console.log('Checking passed year and genre variables: ', userDecadeValue, userGenreValue)

        // construct URL endpoint and specify the paremeters we want to include  //
        const url = new URL(movieMood.apiURL);
        url.search = new URLSearchParams({
            // include URL parms here
            api_key: movieMood.apiKey,
            year: userDecadeValue,
            with_genres: userGenreValue,
            page: `${randomPage}`
        });


        // pass in new URL featuring params provided by the URLSearchParams constructor //
        fetch(url)
            .then(function (responseTwo) {
                // parse this response into JSON
                // return JSON response so that it can be used in the next function
                console.log(responseTwo);
                return responseTwo.json();
            })
            //parse the JSON Promise response and log out readable data (AKA data in JSON format)
            .then(function (jsonResponseTwo) {
                console.log(jsonResponseTwo);

                movieMood.displayMovies(jsonResponseTwo);
            });
    }
}



// Create method to display to display API data //
movieMood.displayMovies = function (jsonResponseTwo) {

    // clear the old movie selections //
    const ulElement = document.querySelector('#movie-display-ul');
    ulElement.innerHTML = '';

    
    // create a loop to display the first 3 movies returned from the random page of query results array//
    for (let i = 0; i <= 2; i++) {
        // test our data gets in here
        // console.log(movieTitle);
        
        const movieId = jsonResponseTwo.results[i].id;
        console.log(movieId);
        const movieTitle = jsonResponseTwo.results[i].title;
        const moviePoster = jsonResponseTwo.results[i].poster_path;
        const movieSynopsis = jsonResponseTwo.results[i].overview;

        // create li element for movies to be appended onto page
        const liElement = document.createElement('li');
        liElement.classList.add('movie');

        // // create h2 element for movie title to be appended
        const heading = document.createElement('h2');
        heading.textContent = movieTitle;

        // // create img element for movie poster to be apended onto page 
        const image = document.createElement('img');
        image.src = moviePoster;

        // // create p element for movie synopsis to be appended onto page
        const paragraph = document.createElement('p');
        console.log(paragraph);

        // paragraph.classList.add("synopsis");
        paragraph.textContent = movieSynopsis;
        liElement.append(heading, paragraph);

        // add the Li to the ul //
        ulElement.appendChild(liElement);
    };
}


// Create app intialization method //
movieMood.init = function () {
    movieMood.eventListenerSetup();
};

// call init method //
movieMood.init();


