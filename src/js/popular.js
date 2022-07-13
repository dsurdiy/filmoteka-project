// import axios from 'axios'

import cardTpl from '../template/film-card.hbs';

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/trending/movie/day?' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const main = document.querySelector('.popular__mov');
const genres = [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Adventure',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 80,
    name: 'Crime',
  },
  {
    id: 99,
    name: 'Documentary',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Family',
  },
  {
    id: 14,
    name: 'Fantasy',
  },
  {
    id: 36,
    name: 'History',
  },
  {
    id: 27,
    name: 'Horror',
  },
  {
    id: 10402,
    name: 'Music',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10749,
    name: 'Romance',
  },
  {
    id: 878,
    name: 'Science Fiction',
  },
  {
    id: 10770,
    name: 'TV Movie',
  },
  {
    id: 53,
    name: 'Thriller',
  },
  {
    id: 10752,
    name: 'War',
  },
  {
    id: 37,
    name: 'Western',
  },
];

// document.addEventListener('DOMContentLoaded', popularOnPageLoad);

// function popularOnPageLoad() {
//   getMovies(API_URL);
// }

export async function getMovies(url) {
  try {
    const response = await fetch(url);
    const toJson = await response.json();
    showMovies(toJson.results);
    return toJson.total_results;
  } catch (error) {
    console.log(error);
  }
}

export function showMovies(data) {
  const markup = data
    .map(el => {
      const { title, poster_path, release_date, genre_ids, id } = el;
      let movieGenre;

      movieGenre = genres
        .filter(el => el.id === genre_ids[0] || el.id === genre_ids[1] || el.id === genre_ids[2])
        .map(el => el.name)
        .join(', ');

      let dateToYear = new Date(release_date);
      const year = dateToYear.getFullYear();
      return cardTpl({ title, poster_path, release_date, genre_ids, id, movieGenre, year });
    })
    .join('');

  // const markup = data.map(({title, poster_path, release_date, genre_ids, id}) => {
  //    let movieGenre;

  //     movieGenre = genres.filter(el => el.id === genre_ids[0] || el.id === genre_ids[1] || el.id === genre_ids[2])
  //     .map(el => el.name).join(', ');

  //     let dateToYear = new Date(release_date);
  //     const year = dateToYear.getFullYear();

  //     return `<div class="movie" data-movieid=${id}>
  //         <img class="popular__image" src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">
  //             <div class="movie-info">
  //                 <h3>${title.toUpperCase()}</h3>
  //                 <div class="movie__description">
  //                     <div class="movie__genre">${movieGenre}</div>
  //                     <div class="movie__release_date">${year}</div>

  //                 </div>
  //             </div>
  //     </div>`
  // }).join("");

  main.insertAdjacentHTML('beforeend', markup);
}

// let page = 1;

// const link = document.querySelector('.number');
// const wrapper = document.querySelector('.popular__mov');
// const previuos = document.querySelector('.previous');
// const next = document.querySelector('.next');
// const navigation = document.querySelector('.navigation');

// document.addEventListener('click', handleLink);
// previuos.addEventListener('click', handlePrevBtn);
// next.addEventListener('click', handleNextBtn);

// function handleLink(e) {

//   if(e.target.className === "number") {
//     console.log(e.target.className);
//     page = e.target.innerText;
//     console.log(page);
//     wrapper.innerHTML = "";
//     document.removeEventListener("DOMContentLoaded", popularOnPageLoad);
//     getMovies(BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY+`&genre&page=${page}`);
//   }
// }

// function handlePrevBtn(e) {
//   if(Number(page) === 1) {
//     return
//   } else {
//     console.log(page);
//     page = Number(page) - 1;
//     wrapper.innerHTML = "";
//     document.removeEventListener("DOMContentLoaded", popularOnPageLoad);
//     getMovies(BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY+`&genre&page=${page}`);
//   }
//   if(page > 1) {

//     const addPage = `<button type="button" class="number">${Number(page) - 1}</button>
//     <button type="button" class="number">${Number(page)}</button>
//     <button type="button" class="number">${Number(page) + 1}</button>
//     `
//     navigation.innerHTML = ""

//     navigation.insertAdjacentHTML('beforeend', addPage)
//   }
// }

// function handleNextBtn() {
//     page = Number(page) + 1;
//     console.log(page);
//     wrapper.innerHTML = "";
//     document.removeEventListener("DOMContentLoaded", popularOnPageLoad);
//     getMovies(BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY+`&genre&page=${page}`);

//     if(page > 1) {

//       const addPage = `<button type="button" class="number">${Number(page) - 1}</button>
//       <button type="button" class="number">${Number(page)}</button>
//       <button type="button" class="number">${Number(page) + 1}</button>
//       `
//       navigation.innerHTML = ""

//       navigation.insertAdjacentHTML('beforeend', addPage)
//     }
// }
