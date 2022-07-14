import * as paginationjs from 'paginationjs';
import { getMovies, showMovies } from './popular';
import { notiflixLoading, notiflixLoadingRemove } from './spinner';

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/trending/movie/day?' + API_KEY + '&genre';

let page = 1;
let previousPagesShow = false;
let get_url = API_URL;

if (screen.width > 767) {
  previousPagesShow = true;
}

document.querySelector('.js-search-form').addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  notiflixLoading();

  const query = e.currentTarget.elements.searchQuery.value;

  if (query === '') {
    notiflixLoadingRemove();
    return;
  }

  document.querySelector('.popular__mov').innerHTML = '';
  page = 1;
  get_url = `${BASE_URL}/search/movie?${API_KEY}&language=en-US&include_adult=false&query=${query}`;

  makePagination();

  notiflixLoadingRemove();
}
makePagination();
function makePagination() {
  $('#pagination-container').pagination({
    dataSource: function getPagination(done) {
      $.ajax({
        type: 'GET',
        url: get_url,
        success: function (response) {
          showMovies(response.results);
          const arr = new Array(response.total_results);
          if (arr.length <= 20) {
            $('#pagination-container').pagination('hide');
          }
          done(arr);
        },
      });
    },
    afterPageOnClick: function (event) {
      event.preventDefault();
      document.querySelector('.popular__mov').innerHTML = '';
      page = parseInt(event.target.innerText);
      const url = get_url + `&page=${page}`;
      getMovies(url);
    },
    afterPreviousOnClick: function (event) {
      event.preventDefault();
      document.querySelector('.popular__mov').innerHTML = '';
      page -= 1;
      const url = get_url + `&page=${page}`;
      getMovies(url);
    },
    afterNextOnClick: function (event) {
      event.preventDefault();
      document.querySelector('.popular__mov').innerHTML = '';
      page += 1;
      const url = get_url + `&page=${page}`;
      getMovies(url);
    },
    pageSize: 20,
    prevText: '',
    nextText: '',
    ellipsisText: '&#8943',
    showFirstOnEllipsisShow: previousPagesShow,
    showLastOnEllipsisShow: previousPagesShow,
    callback: function (data, pagination) {
      // template method of yourself

      var html = data;
      $('#data-container').html(html);
    },
  });
}
