import * as paginationjs from 'paginationjs';
import { getMovies } from './popular';

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/trending/movie/day?' + API_KEY + '&genre';

let page = 1;
let previousPagesShow = false;

if (screen.width > 767) {
  previousPagesShow = true;
}

$('#pagination-container').pagination({
  dataSource: function (done) {
    $.ajax({
      type: 'GET',
      url: API_URL,
      success: function (response) {
        const arr = new Array(response.total_results);
        done(arr);
      },
    });
  },
  afterPageOnClick: function (event) {
    event.preventDefault();
    document.querySelector('.popular__mov').innerHTML = '';
    page = event.target.innerText;
    const url = API_URL + `&page=${page}`;
    getMovies(url);
  },
  afterPreviousOnClick: function (event) {
    event.preventDefault();
    document.querySelector('.popular__mov').innerHTML = '';
    if (page > 1) {
      page = page - 1;
      const url = API_URL + `&page=${page}`;
      getMovies(url);
    }
  },
  afterNextOnClick: function (event) {
    event.preventDefault();
    document.querySelector('.popular__mov').innerHTML = '';
    page = page + 1;
    const url = API_URL + `&page=${page}`;
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
