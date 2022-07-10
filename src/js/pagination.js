import * as paginationjs from 'paginationjs';

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/trending/movie/day?' + API_KEY + '&genre';

import { getMovies } from './popular';

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
    const page = event.target.innerText;
    const url = API_URL + `&page=${page}`;
    getMovies(url);
  },
  pageSize: 20,
  callback: function (data, pagination) {
    // template method of yourself

    var html = data;
    $('#data-container').html(html);
  },
});
