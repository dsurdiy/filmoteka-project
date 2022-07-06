import axios from 'axios'

const refs = {
   cardsWrapper: document.querySelector('.popular__mov'),
   modal: document.querySelector('.film-details'),
   closeBtn: document.querySelector('.modal__icon-close'),
   modalWrapper: document.querySelector('.modal-wrapper'),
   backdrop: document.querySelector('.backdrop'),
   filmDetails: document.querySelector('.film-details'),
}
const API_KEY = '1b50ba0e0b99203af5e26bdcee6d2298'

// ---------------------- Should be added OR for library -----------------------------------------
if (refs.cardsWrapper) {refs.cardsWrapper.addEventListener('click', onMovieClick)}
// -----------------------------------------------------------------------------------------------
  
async function getDetails(id) {

  try {
    return await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
    .then( response => {
      return response.data
    })
    
  } catch (error) {
    console.log(error);
  }
}


async function onMovieClick(e) {
  const movieCard = e.target.closest('.movie');
  const movieId = movieCard.dataset.movieid;

  const response = await getDetails(movieId)

  renderModal()
  refs.filmDetails.insertAdjacentHTML('beforeend', modalMarkup(response)) 
  
}
  
function modalMarkup(res) {
  
    const background = `https://image.tmdb.org/t/p/original/${res.backdrop_path}`;
    refs.backdrop.style.backgroundImage = `url('${background}')`;
    refs.backdrop.style.backgroundSize = 'cover';
    refs.backdrop.style.backgroundPosition = '50% 50%';
   const markup = 
   `
     
      <img
        class="film-details__image"
        src="https://image.tmdb.org/t/p/w500${
     res.poster_path
   }"
        alt="${res.title}"
      />
      <div class="film-details__wrapper">
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
            <button type="button" class="film-details__btn film-details__btn--watched">add to Watched</button>
          </li>
          <li class="film-details__btn-item">
            <button type="button" class="film-details__btn film-details__btn--queue">add to queue</button>
          </li>
        </ul>
      </div>
   
   
  `  
  return markup
}





function closeModalBackdrop(e) {

  if (e.target.classList.value !== "backdrop") {
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
  refs.backdrop.addEventListener('click',e => closeModalBackdrop(e));
  document.addEventListener('keydown', e => closeModalEscape(e)); 
   
}
function renderModal() {
  refs.filmDetails.textContent = ''
  refs.modalWrapper.classList.remove('is-hidden');
  
  
  toggleModal()
  
}








