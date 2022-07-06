const btnContainerRef = document.querySelector('.js-btn-container');

btnContainerRef.addEventListener('click', onBtnContainerClick);

function onBtnContainerClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  const currentActiveBtn = document.querySelector('.library-btn--current');

  if (currentActiveBtn) {
    currentActiveBtn.classList.remove('library-btn--current');
  }

  const nextActiveBtn = e.target;
  nextActiveBtn.classList.add('library-btn--current');
}
