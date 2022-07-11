import axios from 'axios';
import cardTemplate from '../template/film-cardWQ.hbs';

const API_KEY = 'api_key=1b50ba0e0b99203af5e26bdcee6d2298';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const watchedBtn = document.querySelector('button[data-action="watched"]');
const queueBtn = document.querySelector('button[data-action="queue"]');
const wqGallery = document.querySelector('.watched_and_queue');

watchedBtn.addEventListener('click', watched);
queueBtn.addEventListener('click', queue);
let watchedMoviesId = [];

function watched() {
  clearQueue();
  watchedMoviesId = JSON.parse(localStorage.getItem('Watched'));
  watchedMoviesId.map(id => {
    getWQMovies(id);
  });
}

function queue() {
  clearWatched();
  watchedMoviesId = JSON.parse(localStorage.getItem('Queue'));
  watchedMoviesId.map(id => {
    getWQMovies(id);
  });
}

async function getWQMovies(id) {
  try {
    return await axios.get(`https://api.themoviedb.org/3/movie/${id}?${API_KEY}`).then(response => {
      showWatchedMovies(response.data);
    });
  } catch (error) {
    console.log(error);
  }
}

function showWatchedMovies(data) {
  const { title, poster_path, release_date, genres, id, vote_average } = data;
  if (genres.length > 3) {
    genres.length = 3;
  }
  let genre = genres.reverse().map(genre => {
    return genre.name;
  });

  let dateToYear = new Date(release_date);
  const year = dateToYear.getFullYear();
  //  const markup = `<div class="movie" data-movieid=${id}>
  //         <img class="popular__image" src="${poster_path ? IMG_URL + poster_path : "http://via.placeholder.com/1080x1580"}" alt="${original_title}">
  //             <div class="movie-info">
  //                 <h3>${original_title}</h3>
  //                 <div class="movie__description">
  //                     <div class="movie__genre">${genre}</div>
  //                     <div class="movie__release_date">${release_date}</div>
  //                 </div>
  //             </div>
  //     </div>`
  const markup = cardTemplate({ title, poster_path, year, movieGenre: genre, id, vote_average });
  wqGallery.insertAdjacentHTML('beforeend', markup);
}

function clearWatched() {
  wqGallery.innerHTML = '';
}

function clearQueue() {
  wqGallery.innerHTML = '';
}
