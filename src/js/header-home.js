const refs = {
  searchForm: document.querySelector('.js-search-form'),
  warning: document.querySelector('.js-warning'),
};

refs.searchForm.addEventListener('submit', onSearchFormSubmit);

function onSearchFormSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const searchQuery = form.searchQuery.value;
  hideSearchWarning();

  if (searchQuery === '') {
    showSearchWarning();
    return;
  }

  // form.reset();
}

function showSearchWarning() {
  refs.warning.classList.remove('is-hidden');
}

function hideSearchWarning() {
  refs.warning.classList.add('is-hidden');
}
