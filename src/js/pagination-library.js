import * as paginationjs from 'paginationjs';
import { watched } from './showWatchedQueue';
import { queue } from './showWatchedQueue';

export let page = 1;

let previousPagesShow = false;

if (screen.width > 767) {
  previousPagesShow = true;
}

const watchedBtn = document.querySelector('button[data-action="watched"]');
const queueBtn = document.querySelector('button[data-action="queue"]');

watchedBtn.addEventListener('click', makePagination);
queueBtn.addEventListener('click', makePagination);

watchedBtn.click();
function makePagination(event) {
  page = 1;
  document.querySelector('#pagination-container').innerHTML = '';
  const action = event.target.dataset.action;
  const check = JSON.parse(localStorage.getItem(action.charAt(0).toUpperCase() + action.slice(1)));
  if (check && check.length > 0) {
    if (check.length <= 20) {
      $('#pagination-container').pagination('hide');
      return;
    }
    $('#pagination-container').pagination({
      dataSource: check,
      afterPageOnClick: function (event) {
        event.preventDefault();
        document.querySelector('.watched_and_queue').innerHTML = '';
        page = parseInt(event.target.innerText);
        if (action === 'watched') {
          watched(event);
        }
        if (action === 'queue') {
          queue(event);
        }
      },
      afterPreviousOnClick: function (event) {
        event.preventDefault();
        document.querySelector('.watched_and_queue').innerHTML = '';
        page -= 1;
        if (action === 'watched') {
          watched(event);
        }
        if (action === 'queue') {
          queue(event);
        }
      },
      afterNextOnClick: function (event) {
        event.preventDefault();
        document.querySelector('.watched_and_queue').innerHTML = '';
        page += 1;
        if (action === 'watched') {
          watched(event);
        }
        if (action === 'queue') {
          queue(event);
        }
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
}
