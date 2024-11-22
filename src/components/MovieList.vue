<template>
  <div class="movie-list">
    <div v-if="loading">Loading...</div>
    <div v-else class="movie-grid">
      <div v-for="movie in movies" 
           :key="movie.id" 
           class="movie-card"
           @click="goToDetail(movie.id)">
        <img 
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" 
          :alt="movie.title"
        >
        <div class="movie-info">
          <h3>{{ movie.title }}</h3>
          <div class="genres">
            {{ getGenres(movie.genre_ids) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { tmdbApi } from '@/api/tmdb'

export default {
  name: 'MovieList',
  data() {
    return {
      movies: [],
      loading: true,
      genres: []
    }
  },
  async created() {
    try {
      // 장르 정보 가져오기
      const genresResponse = await tmdbApi.getGenres()
      this.genres = genresResponse.data.genres
      
      const response = await tmdbApi.getPopular()
      this.movies = response.data.results
    } catch (error) {
      console.error('Error:', error)
    } finally {
      this.loading = false
    }
  },
  methods: {
    getGenres(genreIds) {
      return genreIds
        .map(id => this.genres.find(genre => genre.id === id)?.name)
        .filter(name => name)
        .join(', ')
    },
    goToDetail(movieId) {
      this.$router.push(`/movie/${movieId}`)
    }
  }
}
</script>

<style scoped>
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.movie-card {
  transition: transform 0.3s ease;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 100%;
  display: block;
  border-radius: 8px 8px 0 0;
}

.movie-info {
  padding: 15px;
  background: rgba(0, 0, 0, 0.8);
}

.movie-info h3 {
  margin: 0;
  font-size: 1.1rem;
  color: white;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.genres {
  font-size: 0.9rem;
  color: #aaa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>