import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: process.env.VUE_APP_TMDB_API_KEY,
        language: 'ko-KR'
    }
});

export const tmdbApi = {
    getPopular: () => {
        console.log('API 요청 시작');
        return instance.get('/movie/popular')
            .then(response => {
                console.log('API 응답:', response);
                return response;
            })
            .catch(error => {
                console.error('API 에러:', error);
                throw error;
            });
    },
    getMovieDetails: (id) => instance.get(`/movie/${id}`),
    getNowPlaying: () => instance.get('/movie/now_playing'),
    getTopRated: () => instance.get('/movie/top_rated'),
    searchMovies: (query) => instance.get('/search/movie', {
        params: { query }
    })
};