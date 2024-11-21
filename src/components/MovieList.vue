<template>
  <div class="movie-list">
    <div v-if="loading">Loading...</div>
    <div v-else class="movie-grid">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <img 
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" 
          :alt="movie.title"
        >
        <h3>{{ movie.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { tmdbApi } from '@/api/tmdb';

export default {
  name: 'MovieList',
  data() {
    return {
      movies: [],
      loading: true
    }
  },
  async created() {
    try {
      const response = await tmdbApi.getPopular();
      this.movies = response.data.results;
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      this.loading = false;
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
</style>