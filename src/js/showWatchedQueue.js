import axios from 'axios';
import alertMessage from './alert';
import cardTemplate from '../template/film-cardWQ.hbs';

const API_KEY = 'api_key=1b50ba0e0b99203af5e26bdcee6d2298';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const watchedBtn = document.querySelector('button[data-action="watched"]');
const queueBtn = document.querySelector('button[data-action="queue"]');
const wqGallery = document.querySelector('.watched_and_queue');

watchedBtn.addEventListener('click', watched);
queueBtn.addEventListener('click', queue);
let watchedMoviesId = [];

import { page } from './pagination-library';

watchedBtn.click();

export function watched(event) {
  clearQueue();

  watchedMoviesId = JSON.parse(localStorage.getItem('Watched'));
  if (watchedMoviesId === 0 || watchedMoviesId < 1) {
    return alertMessage();
  }
  watchedMoviesId.slice(page * 20 - 20, page * 20).map(id => {
    getWQMovies(id);
  });
}

export function queue(event) {
  clearWatched();
  watchedMoviesId = JSON.parse(localStorage.getItem('Queue'));

  if (watchedMoviesId === 0 || watchedMoviesId < 1) {
    return alertMessage();
  }
  watchedMoviesId.slice(page * 20 - 20, page * 20).map(id => {
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
    return ' ' + genre.name;
  });

  let dateToYear = new Date(release_date);
  const year = dateToYear.getFullYear();

  let vote = vote_average.toFixed(1);

  const markup = cardTemplate({ title, poster_path, year, movieGenre: genre, id, vote });
  wqGallery.insertAdjacentHTML('beforeend', markup);
}

function clearWatched() {
  wqGallery.innerHTML = '';
}

function clearQueue() {
  wqGallery.innerHTML = '';
}
