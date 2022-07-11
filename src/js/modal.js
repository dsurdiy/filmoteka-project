import axios from 'axios'

const refs = {
  
  modal: document.querySelector('.film-details'),
  closeBtn: document.querySelector('.modal__icon-close'),
  modalWrapper: document.querySelector('.modal-wrapper'),
  backdrop: document.querySelector('.backdrop'),
  filmDetails: document.querySelector('.film-details'),
  iframe: document.querySelector('.trailer__trailer-iframe'),
  frameWrap: document.querySelector('.modal__frame-wrap'),
  closeFrameBtn: document.querySelector('.trailer__frame-close'),
  cardsWrapper: document.querySelector('.popular__mov'),
}

refs.cardsWrapper.addEventListener('click' , onMovieClick);

let response = null
const API_KEY = '1b50ba0e0b99203af5e26bdcee6d2298'
const BASE_URL = 'https://api.themoviedb.org/3/'


async function getDetails(id) {

  try {
    return await axios.get(`${BASE_URL}movie/${id}?api_key=${API_KEY}`)
    .then( response => {
      return response.data
    })
    
  } catch (error) {
    console.log(error);
  }
}



async function onMovieClick(e) {

  if (e.target === refs.cardsWrapper) {
    return 
  }
  
  const movieCard = e.target.closest('.film-card');
  const movieId = movieCard.dataset.id;

  response = await getDetails(movieId)
 
  renderModal()
  refs.filmDetails.insertAdjacentHTML('beforeend', modalMarkup(response)) 
  
  const watchedBtn = document.querySelector('.film-details__btn--watched')
    watchedBtn.addEventListener('click', watchedStorage)
  const queueBtn = document.querySelector('.film-details__btn--queue')
   queueBtn.addEventListener('click', queueStorage)

  
  onBtnFilmTrailerClick()
  
}




function modalMarkup(res) {

  const queuedMovies = localStorage.getItem('Queue');
  const queuedMoviesArray = JSON.parse(queuedMovies) || [];
  const MovieQueued = queuedMoviesArray.some(  
    movie => movie  === res.id
  )

  const watchedMovies = localStorage.getItem('Watched');
  const watchedMoviesArray = JSON.parse(watchedMovies) || [];
  const MovieWatched = watchedMoviesArray.some(
    movie => movie  === res.id
  )

  
  const background = `https://image.tmdb.org/t/p/original/${res.backdrop_path}`;
  refs.backdrop.style.backgroundImage = `url('${background}')`;
  refs.backdrop.style.backgroundSize = 'cover';
  refs.backdrop.style.backgroundPosition = '50% 50%';
  
  const markup =
    `
     
      <img
        class="film-details__image"
        src="https://image.tmdb.org/t/p/w500${res.poster_path
    }"
        alt="${res.title}"
      />
     
      <div class="film-details__wrapper" data-id=${res.id}>
        <button class="film-trailer__btn film-details__btn">Watch Trailer</button>
        <h2 class="film-details__title">${res.title}</h2>
        <ul class="film-details__list ">
          <li class="film-details__item">
            <p class="film-details__text">Vote / Votes</p>
            <span class="film-details__span film-details__span--accent"
              >${res.vote_average}</span
            >
            <span class="film-details__separator">/</span>
            <span class="film-details__span film-details__span--noaccent"
              >${res.vote_count}</span
            >
          </li>
          <li class="film-details__item">
            <p class="film-details__text">Popularity</p>
            <span class="film-details__span">${res.popularity.toFixed(2)}</span>
          </li>
          <li class="film-details__item">
            <p class="film-details__text">Original Title</p>
            <span class="film-details__span">${res.original_title}</span>
          </li>
          <li class="film-details__item">
            <p class="film-details__text">Genre</p>
            <span class="film-details__span">${res.genres
      .map(genre => genre.name).slice(0, 2).join(', ')}</span>
          </li>
        </ul>
        <p class="film-details__about">About</p>
        <p class="film-details__overview">
          ${res.overview}
        </p>
       
        <ul class="film-details__btn-list">
          <li class="film-details__btn-item">
            <button type="button" class="film-details__btn film-details__btn--watched " >${MovieWatched ?'remove from watched':'add to Watched'   }</button>
          </li>
          <li class="film-details__btn-item">
            <button type="button" class="film-details__btn film-details__btn--queue " >${MovieQueued ? 'remove from queue' : 'add to Queue'  }</button>
          </li>
        </ul>
      </div>
        
   
  `  
  
  return markup
}





function closeModalBackdrop(e) {
  
  if (e.target.classList.value !== "backdrop" ) {
    return;
  }
  closeModal();
  
  
}

function closeModalEscape(e) {
  if (e.key !== 'Escape') {
    return;
  }
  closeModal();
  
}


function closeModal() {
 
  refs.modalWrapper.classList.add('is-hidden')
  
  refs.backdrop.removeEventListener('click' , closeModal)
  
  
  document.removeEventListener('keydown', e => closeModalEscape(e))
}

function toggleModal() {
 
  refs.closeBtn.addEventListener('click', closeModal);
  refs.backdrop.addEventListener('click', e => closeModalBackdrop(e))

  document.addEventListener('keydown', e => closeModalEscape(e)); 
   
}
function renderModal() {

  refs.filmDetails.textContent = ''
  refs.modalWrapper.classList.remove('is-hidden');
  
  
  toggleModal()
  
}

////////localStorage////////
const btnWatchedAdd = 'Add To Watched';
const btnWatchedRemove = 'Remove From Watched';

const btnQueueAdd = 'Add To Queue';
const btnQueueRemove = 'Remove From Queue';



function watchedStorage(e) {
  const watchedBtn = e.target;
  
   
  const watchedStorageItem = localStorage.getItem('Watched');
  const watchedArray = JSON.parse(watchedStorageItem) || [];

  const watchedId = watchedArray.indexOf(response.id)
   if (watchedId !== -1) {
    
     
    watchedArray.splice(watchedId, 1)
    watchedBtn.innerText = btnWatchedAdd
  } else {
   
    watchedArray.push(response.id);
    
    watchedBtn.innerText = btnWatchedRemove;
  }
  localStorage.setItem('Watched', JSON.stringify(watchedArray));
  
  
}


function queueStorage(e) {
  const queueBtn = e.target;
  

  const queuedStorageItem = localStorage.getItem('Queue');
  const queueArray = JSON.parse(queuedStorageItem) || [];


   const watchedId = queueArray.indexOf(response.id)
   if (watchedId !== -1) {
    
     
    queueArray.splice(watchedId, 1)
    queueBtn.innerText = btnQueueAdd
  } else {

    
   
    queueArray.push(response.id);
    
    queueBtn.innerText = btnQueueRemove;
  }
  localStorage.setItem('Queue', JSON.stringify(queueArray));
  
  
}

   

////////MovieTrailer/////////

async function getMovieVideo(id) {
    try {
      const url = `${BASE_URL}movie/${id}/videos?api_key=${API_KEY}&language=en`;
      const response = await axios.get(url);
     
      
      refs.iframe.src = `https://www.youtube.com/embed/${response.data.results[0].key}` 
      
    } catch (error) {
      console.log(error);
    }
}

function movieTrailer(e) {

  const filmDetailsWrapper = e.target.closest('.film-details__wrapper')
  const filmTrailerId = filmDetailsWrapper.dataset.id
  getMovieVideo(filmTrailerId)
 toggleModal()
  refs.frameWrap.classList.remove('is-hidden-frame');
  
}
function closeFrame() {
  
 refs.frameWrap.classList.add('is-hidden-frame')
  refs.iframe.src = ''
  toggleModal()
  
}

function onBtnFilmTrailerClick() {
  
  
  refs.closeFrameBtn.addEventListener('click', closeFrame)
  
  const filmTrailer = document.querySelector('.film-trailer__btn')
  
  filmTrailer.addEventListener('click', movieTrailer)

  
  
}


