
const refs = {
   btnClick: document.querySelector('.btn'),
   modal: document.querySelector('.film-details'),
   closeBtn: document.querySelector('.modal__icon-close'),
   modalWrapper: document.querySelector('.modal-wrapper'),
   backdrop: document.querySelector('.backdrop'),
   filmDetails: document.querySelector('.film-details'),
}

refs.btnClick.addEventListener('click', renderModal)



function modalMarkup() {
   
   
    return `
      <img
        class="film-details__image"
        src="https://fakeimg.pl/350x200/?text=Hello"
        alt="временная картинка"
      />
      <div class="film-details__wrapper">
        <h2 class="film-details__title">Title</h2>
        <ul class="film-details__list ">
          <li class="film-details__item">
            <p class="film-details__text">Vote / Votes</p>
            <span class="film-details__span film-details__span--accent"
              >7.3</span
            >
            <span class="film-details__separator">/</span>
            <span class="film-details__span film-details__span--noaccent"
              >1260</span
            >
          </li>
          <li class="film-details__item">
            <p class="film-details__text">Popularity</p>
            <span class="film-details__span">100.2</span>
          </li>
          <li class="film-details__item">
            <p class="film-details__text">Original Title</p>
            <span class="film-details__span">A FISTFUL OF LEAD</span>
          </li>
          <li class="film-details__item">
            <p class="film-details__text">Genre</p>
            <span class="film-details__span">Comedia</span>
          </li>
        </ul>
        <p class="film-details__about">About</p>
        <p class="film-details__overview">
          Four of the West’s most infamous outlaws assemble to steal a huge
          stash of gold from the most corrupt settlement of the gold rush towns.
          But not all goes to plan one is killed and the other three escapes
          with bags of gold hide out in the abandoned gold mine where they
          happen across another gang of three – who themselves were planning to
          hit the very same bank! As tensions rise, things go from bad to worse
          as they realise the bags of gold are filled with lead... they’ve been
          double crossed – but by who and how?
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
   refs.filmDetails.insertAdjacentHTML('beforeend', modalMarkup()) 
   toggleModal()
}

