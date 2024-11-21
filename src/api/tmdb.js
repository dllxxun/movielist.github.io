import axios from 'axios';

// API 키 확인
console.log('API Key:', process.env.VUE_APP_TMDB_API_KEY);

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
    // ... 나머지 메서드들
};