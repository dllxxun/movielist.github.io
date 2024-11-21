<template>
  <div class="movie-detail" v-if="movie">
    <div class="backdrop" :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }">
      <div class="content">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" class="poster">
        <div class="info">
          <h1>{{ movie.title }}</h1>
          <div class="meta">
            <span>평점: {{ movie.vote_average }}/10</span>
            <span>개봉일: {{ movie.release_date }}</span>
          </div>
          <p class="overview">{{ movie.overview }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { tmdbApi } from '@/api/tmdb'

export default {
  name: 'MovieDetail',
  data() {
    return {
      movie: null
    }
  },
  async created() {
    try {
      const movieId = this.$route.params.id
      const response = await tmdbApi.getMovieDetails(movieId)
      this.movie = response.data
    } catch (error) {
      console.error('Error:', error)
    }
  }
}
</script>

<style scoped>
.movie-detail {
  min-height: 100vh;
}

.backdrop {
  position: relative;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}

.content {
  background: rgba(0, 0, 0, 0.7);
  padding: 2rem;
  display: flex;
  gap: 2rem;
  color: white;
}

.poster {
  width: 300px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
}

.info {
  flex: 1;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.meta {
  margin-bottom: 1rem;
}

.meta span {
  margin-right: 1rem;
}

.overview {
  line-height: 1.6;
  font-size: 1.1rem;
}
</style>