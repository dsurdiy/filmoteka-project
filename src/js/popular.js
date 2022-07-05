// import axios from 'axios'

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY+'&genre';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const main = document.querySelector('.popular__mov');

const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

document.addEventListener("DOMContentLoaded", popularOnPageLoad);

function popularOnPageLoad() {
    getMovies(API_URL);
}

async function getMovies(url) {
    try {
      await fetch(url).then(res => res.json()).then(data => {
          showMovies(data.results);
      })
    }
    catch (error) {
      console.log(error);
    }
}

function showMovies(data) {

    const markup = data.map(({title, poster_path, release_date, genre_ids}) => {
       let movieGenre;

        movieGenre = genres.filter(el => el.id === genre_ids[0] || el.id === genre_ids[1] || el.id === genre_ids[2])
        .map(el => el.name).join(', ');

        let dateToYear = new Date(release_date);
        const year = dateToYear.getFullYear();

        return `<div class="movie">
            <a class="popular__link" href="${poster_path}"><img class="popular__image" src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}"></a>
                <div class="movie-info">
                    <h3>${title.toUpperCase()}</h3>
                    <div class="movie__description"> 
                        <div class="movie__genre">${movieGenre}</div>
                        <div class="movie__release_date">${year}</div>
                    </div>
                </div>
        </div>`
    }).join("");
    main.insertAdjacentHTML('beforeend', markup);
}
