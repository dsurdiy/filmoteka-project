const axios = require('axios');
const API_KEY = `1b50ba0e0b99203af5e26bdcee6d2298`;
const BASE_URL = 'https://api.themoviedb.org/3/search/movie'

export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchThemovie() {
        console.log('До запроса ', this);

        const url = `${BASE_URL}?api_key=${API_KEY}&language=en-US&page=${this.page}&include_adult=false&query=${this.searchQuery}`;

        try {
            const axiosFetch = await axios.get(url);
            console.log(axiosFetch);
            console.log('После запроса, если ок ', this);
            const { data } = axiosFetch;

            this.incrementPage();

            return data.results;
        } catch (error) {
            console.log(error);
        }
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery
    }
}

