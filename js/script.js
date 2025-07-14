// ^ Building simple router
const global = {
    currentPage: window.location.pathname,
    search: {
        term: '',
        type: '',
        page: 1,
        totalPages: 1,
        totalResults: 0
    },
    api: {
        apiKey: '',
        apiUrl: 'https://api.themoviedb.org/3/'
    }
}
// console.log(global.currentPage); -> To check the page where we are home,move,tvshows or other page


// ! POPULAR MOVIES  // Display 20 most popular movies
async function displayPopularMovies(){
    const { results } = await fetchAPIData('movie/popular'); // Destructure the results
    // console.log(results);
    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <a href = "movie-details.html?id=${movie.id}">
                ${
                movie.poster_path
                        ? `<img
                        src = "https://image.tmdb.org/t/p/w500${movie.poster_path}"
                        class = "card-img-top"
                        alt = "${movie.title}"
                        />`
                            : `<img
                        src = "../images/no-image.jpg"
                        class = "card-img-top"
                        alt = "${movie.title}"
                       />`
                }
            </a>
            <div class = "card-body">
                <h5 class = "card-title">${movie.title}</h5>
                <p class = "card-text">
                    <small class = "text-muted">Release: ${movie.release_date}</small>
                </p>
            </div>
        `;
        
        document.querySelector('#popular-movies').appendChild(div);
    });
}


// ! Display 20 most popular tv shows
async function displayPopularShows(){
    const { results } = await fetchAPIData('tv/popular'); 

    results.forEach((show) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <a href = "tv-details.html?id=${show.id}">
                ${
                show.poster_path
                        ? `<img
                        src = "https://image.tmdb.org/t/p/w500${show.poster_path}"
                        class = "card-img-top"
                        alt = "${show.name}"
                        />`
                            : `<img
                        src = "../images/no-image.jpg"
                        class = "card-img-top"
                        alt = "${show.name}"
                       />`
                }
            </a>
            <div class = "card-body">
                <h5 class = "card-title">${show.name}</h5>
                <p class = "card-text">
                    <small class = "text-muted">Air Date: ${show.first_air_date}</small>
                </p>
            </div>
            `;
        document.querySelector('#popular-shows').appendChild(div);
    });
}


// & Display Movies Details
async function displayMoviesDetails(){
    const movieId = document.location.search.split('=')[1];
    // console.log(movieId); // On the window object there's a location API or location object that has a search property that we can get all the query string 
    
    const movie = await fetchAPIData(`movie/${movieId}`);

    // Overlay for background image
    displayBackgroundImage('movie', movie.backdrop_path);

    const div = document.createElement('div');

    div.innerHTML = `
        <div class="details-top">
          <div>
            ${movie.poster_path
                ? `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
               />` 
                   : `<img
                    src="../images/no-image.jpg"
                    class="card-img-top"
                    alt="${movie.title}"
                   />`
            };
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
            ${movie.production_companies.map((company) => `<span>${company.name}</span>`).join(', ')}
          </div>
        </div>
    `;

    document.querySelector('#movie-details').appendChild(div);
}


// ^ Display Show Details
async function displayShowDetails(){
    const showId = document.location.search.split('=')[1];
    
    const show = await fetchAPIData(`tv/${showId}`);

    // Overlay for background image
    displayBackgroundImage('tv', show.backdrop_path);

    const div = document.createElement('div');

    div.innerHTML = `
        <div class="details-top">
          <div>
            ${show.poster_path
                ? `<img
                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="${show.name}"
               />` 
                   : `<img
                    src="../images/no-image.jpg"
                    class="card-img-top"
                    alt="${show.name}"
                   />`
            };
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${show.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number of Episodes:</span> ${show.number_of_episodes}</li>
            <li><span class="text-secondary">Last Episodes To Air:</span> ${show.last_episode_to_air.name}</li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
            ${show.production_companies.map((company) => `<span>${company.name}</span>`).join(', ')}
          </div>
        </div>
    `;

    document.querySelector('#show-details').appendChild(div);
}

// Display Backdrop on details page
function displayBackgroundImage(type, backgroundPath){
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath}`; 
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';

    if(type === 'movie'){
        document.querySelector('#movie-details').appendChild(overlayDiv);
    }else{
        document.querySelector('#show-details').appendChild(overlayDiv);
    }
}

// ^ Search Movies/Shows
async function search(){
    // QueryString is this `?type=movie&search-term=goodfellas` in url when you send input msg
    const queryString = window.location.search;
    const URLParams = new URLSearchParams(queryString); 
    // console.log(URLParams); // We not see any data but we have to use methods to see 
    // console.log(URLParams.get('type')); // Basically we can put this in variable but we have to use in others page also so we will put in global state.

    global.search.type = URLParams.get('type');  // type = movie or tv
    global.search.term = URLParams.get('search-term'); // search-term is name in my input 

    if(global.search.term !== '' && global.search.term !== null){
        //@todo - make request and display results
        const { results, total_pages, page, total_results } = await searchAPIData();
        
        global.search.page = page;
        global.search.totalPages = total_pages;
        global.search.totalResults = total_results;

        if(results.length === 0 ){
            showAlert('No results found');
            return;
        }
        
        displaySearchResults(results);

        document.querySelector('#search-term').value = '';

    }else{
        // alert('Please enter a search term'); // lets do custom alert
        showAlert('Please enter a search term');
    }
}

// ^ After Search display cards and movies
function displaySearchResults(results){
    // Clear previous results
    document.querySelector('#search-results').innerHTML = '';
    document.querySelector('#search-results-heading').innerHTML = '';
    document.querySelector('#pagination').innerHTML = '';


    results.forEach((result) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <a href = "${global.search.type}-details.html?id=${result.id}">
                ${
                result.poster_path
                        ? `<img
                        src = "https://image.tmdb.org/t/p/w500/${result.poster_path}"
                        class = "card-img-top"
                        alt = "${global.search.type === 'movie' ? result.title : result.name}" 
                        />`
                            : `<img
                        src = "../images/no-image.jpg"
                        class = "card-img-top"
                        alt = "${global.search.type === 'movie' ? result.title : result.name}" 
                       />`
                }
            </a>
            <div class = "card-body">
                <h5 class = "card-title">${global.search.type === 'movie' ? result.title : result.name}</h5>
                <p class = "card-text">
                    <small class = "text-muted">Release: ${global.search.type === 'movie' ? result.release_date : result.first_air_date}</small>
                </p>
            </div>
        `;

        document.querySelector('#search-results-heading').innerHTML = `
            <h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>
        `;
        
        document.querySelector('#search-results').appendChild(div);
    });

    displayPagination();
}

// & Create and Display Pagination For Search
function displayPagination(){
    const div = document.createElement('div');
    div.classList.add('pagination');
    div.innerHTML = `
        <button class="btn btn-primary" id="prev">Prev</button>
        <button class="btn btn-primary" id="next">Next</button>
        <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
    `;

    document.querySelector('#pagination').appendChild(div);

    // Disable prev button if on first page
    if(global.search.page === 1){
        document.querySelector('#prev').disabled = true;
    }

    // Disable next button if on last page
    if(global.search.page === global.search.totalPages){
        document.querySelector('#next').disabled = true;
    }

    // ! Now we want to add an eventListener so that we can actually change the page [to change the page we need send another request to the API with particular page or else we will get same results on next page]
    // Next Page
    document.querySelector('#next').addEventListener('click', async () => {
        global.search.page++;
        const { results, total_pages } = await searchAPIData();
        displaySearchResults(results);
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // makes it smooth scroll
        });
    });

    // Prev Page
    document.querySelector('#prev').addEventListener('click', async () => {
        global.search.page--;
        const { results, totalPages } = await searchAPIData();
        displaySearchResults(results); 
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // makes it smooth scroll
        });
    })
}

//^ Display Slider Movies
async function displaySlider(){
    const { results } = await fetchAPIData('movie/now_playing');

    results.forEach((movie) =>{
        const div = document.createElement('div');
        div.classList.add('swiper-slide');

        div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Movie Title" />
            </a>
            <h4 class="swiper-rating">
                <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
            </h4>
        `;

        document.querySelector('.swiper-wrapper').appendChild(div);

    });
    initSwiper();
}

function initSwiper(){
    // https://swiperjs.com/swiper-api
    const swiper = new Swiper('.swiper',{
        slidesPerView : 1,
        spaceBetween: 30,
        freeMode: true,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        breakpoints: {
            500:{
                slidesPerView: 2
            },
            700:{
                slidesPerView: 3
            },
            1200:{
                slidesPerView: 4
            },
        },
    });
}


// ^ Fetch data from TMDB API
async function fetchAPIData(endpoint){
    /*
     * Register your ke at https://www.themoviedb.org/settings/api and enter here
     * Only use this for developement or very small projects. You should store your key and make requests from a server. 
    */
    const API_KEY = global.api.apiKey; // * Production application you shouldn't provide the API_KEY it should not be in public
    const API_URL = global.api.apiUrl;

    showSpinner();  // Right before we make a request

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

    const data = await response.json();

    hideSpinner();

    return data;
}


// * Make Request To Search 
async function searchAPIData(){
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiUrl;

    showSpinner();
    
    const response = await fetch(`${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`);

    const data = await response.json();

    hideSpinner();

    return data;
}



// It show spinner 
function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

//? Highlight active link -: it will show yello color when we click another page
function highlightActiveLink(){
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link)=>{
        if(link.getAttribute('href') === global.currentPage){
            link.classList.add('active');
        }
    });
}


//^ Show Alert [custom]
function showAlert(message, className = 'error'){
    const alertEl = document.createElement('div');
    alertEl.classList.add('alert',className);
    alertEl.appendChild(document.createTextNode(message));
    document.querySelector('#alert').appendChild(alertEl);

    setTimeout(() => alertEl.remove(), 3000);
}


function addCommasToNumber(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
}

//& Init App -> Basically check which page we are
function init(){
    switch(global.currentPage){
        case '/':
        case '/index.html':
            displaySlider();
            displayPopularMovies();
            // console.log('Home');
            break;
        case '/shows.html':
            displayPopularShows();
            // console.log('Shows');
            break;
        case '/movie-details.html':
            displayMoviesDetails();
            // console.log('Movie Details');
            break;
        case '/tv-details.html':
            displayShowDetails();
            // console.log('TV Details');
            break;
        case '/search.html':
            search();
            // console.log('Search');
            break;
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded',init);