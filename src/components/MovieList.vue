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
        <h3>{{ movie.title }}</h3>
        <div class="movie-info">
          <p>평점: {{ movie.vote_average }}/10</p>
          <p>개봉일: {{ movie.release_date }}</p>
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
      loading: true
    }
  },
  methods: {
    goToDetail(movieId) {
      this.$router.push(`/movie/${movieId}`)
    }
  },
  async created() {
    try {
      const response = await tmdbApi.getPopular()
      this.movies = response.data.results
    } catch (error) {
      console.error('Error:', error)
    } finally {
      this.loading = false
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
  background: rgba(0, 0, 0, 0.05);
  padding: 10px;
  border-radius: 8px;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 100%;
  border-radius: 8px;
}

.movie-card h3 {
  margin-top: 10px;
  font-size: 1rem;
}

.movie-info {
  font-size: 0.9rem;
  color: #666;
}

.movie-info p {
  margin: 5px 0;
}
</style>