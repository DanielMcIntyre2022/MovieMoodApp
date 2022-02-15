// create app object //
const movieMood = {}


// create variables for API information //
movieMood.apiURL = `https://api.themoviedb.org/3/discover/movie`;
movieMood.apiKey = `c7b080a6a4bebf767174709ad40d8d83`;

// created test varaible for URL endpoint utilizing variables created above 
const testAPIkey = `${movieMood.apiURL}api_key=${movieMood.apiKey}`;

// create an event listener for user selection via button click //

const userInput = document.querySelector('button');

userInput.addEventListener("click", function () {
    console.log(userInput)

    const userGenreInput = document.getElementById("user-input-one");
    const userGenreValue = userGenreInput.value;
    console.log(userGenreValue);

    const userDecadeInput = document.getElementById("user-input-two");
    console.log(userDecadeInput);
    const userDecadeValue = userDecadeInput.value;
    console.log(userDecadeValue);
    
    // create method to retrive data from API //
    // movieMood.retriveMovies = () => {
        
        // construct URL endpoint and specifcy the paremeters we want to include  //
        const url = new URL(movieMood.apiURL);
        url.search = new URLSearchParams({
            api_key: movieMood.apiKey,
            year: userDecadeInput,
            with_genres: userGenreValue
        });
        console.log(url);
        
        // pass in new URL featuring params provided by the URLSearchParams constructor //
        fetch(url)
            .then(function(response) {
                // parse this response into JSON
                // return JSON response so that it can be used in the next function
                return response.json();
            })
            //parse the JSON Promise response and log out readable data (AKA data in JSON format)
            .then(function(jsonResponse) {
                console.log(jsonResponse);
                //pass the data into the displayMovies method
                //AKA call the displayMovies within retriveMovies
                // movieMood.displayMovies(jsonResponse);
            });
            // console.log(displayMovies.retriveMovies);
            
});



// Get search parmeter inputs from user //



// store in variables //



// declare init method //

// movieMood.init();

// // // create app intialization method //

// movieMood.init = () => {
//     movieMood.getMovie();
// };






















