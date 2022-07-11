import * as paginationjs from 'paginationjs';

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/trending/movie/day?' + API_KEY + '&genre';

$('#pagination-container').pagination({
  dataSource: JSON.parse(localStorage.getItem('Watched')),
  afterPageOnClick: function (event) {
    event.preventDefault();
    document.querySelector('.watched_and_queue').innerHTML = '';
    const page = event.target.innerText;
  },
  pageSize: 20,
  prevText: '',
  nextText: '',
  ellipsisText: '&#8943',
  callback: function (data, pagination) {
    // template method of yourself

    var html = data;
    $('#data-container').html(html);
  },
});
