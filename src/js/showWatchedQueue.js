import axios from 'axios'


const API_KEY = 'api_key=1b50ba0e0b99203af5e26bdcee6d2298';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';



const watchedBtn = document.querySelector('button[data-action="watched"]');
const queueBtn = document.querySelector('button[data-action="queue"]');
const wqGallery = document.querySelector('.watched_and_queue')

watchedBtn.addEventListener("click", watched);
queueBtn.addEventListener("click", queue);
let watchedMoviesId = [];

function watched() {
    //watchedMoviesId = localStorage.getItem("Watched")
    clearQueue();
     watchedMoviesId = [453395, 924482, 667739,507086]
    watchedMoviesId.map(id => {
        getWQMovies(id)
    })
    
} 

function queue() {
    clearWatched();
    //watchedMoviesId = localStorage.getItem("Queue")
      watchedMoviesId = [507086,526896,634649]
    watchedMoviesId.map(id => {
        getWQMovies(id)
    })
    
}


async function getWQMovies(id) {

  try {
    return await axios.get(`https://api.themoviedb.org/3/movie/${id}?${API_KEY}`)
    .then( response => {
      showWatchedMovies(response.data)
    })
    
  } catch (error) {
    console.log(error);
  } 
}

 function showWatchedMovies(data) {
     const { original_title, poster_path, release_date, genres, id } = data
        let genre = genres.map(genre =>{return genre.name})
     const markup = `<div class="movie" data-movieid=${id}>
            <img class="popular__image" src="${poster_path ? IMG_URL + poster_path : "http://via.placeholder.com/1080x1580"}" alt="${original_title}">
                <div class="movie-info">
                    <h3>${original_title}</h3>
                    <div class="movie__description"> 
                        <div class="movie__genre">${genre}</div>
                        <div class="movie__release_date">${release_date}</div>
                    </div>
                </div>
        </div>`
    
     wqGallery.insertAdjacentHTML("beforeend", markup)
      
}

function clearWatched() {
    wqGallery.innerHTML = "";
}

function clearQueue() {
    wqGallery.innerHTML = "";
}