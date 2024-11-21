import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: process.env.VUE_APP_TMDB_API_KEY,
        language: 'ko-KR'
    }
});

export const tmdbApi = {
    getNowPlaying: () => instance.get('/movie/now_playing'),
    getPopular: () => instance.get('/movie/popular'),
    getTopRated: () => instance.get('/movie/top_rated'),
    searchMovies: (query) => instance.get('/search/movie', {
        params: { query }
    })
};