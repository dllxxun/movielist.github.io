<template>
  <div class="movie-detail" v-if="movie">
    <div class="backdrop" :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }">
      <div class="content">
        <div class="poster">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title">
        </div>
        <div class="info">
          <h1>{{ movie.title }}</h1>
          <div class="meta">
            <span class="year">{{ getYear(movie.release_date) }}</span>
            <span class="rating">⭐ {{ formatRating(movie.vote_average) }}</span>
            <div class="genres">{{ getGenres(movie.genres) }}</div>
          </div>
          <p class="overview">{{ movie.overview }}</p>
          <div class="trailer" v-if="trailerKey">
            <h3>예고편</h3>
            <iframe 
              :src="`https://www.youtube.com/embed/${trailerKey}`"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
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
      movie: null,
      trailerKey: null
    }
  },
  async created() {
    try {
      const movieId = this.$route.params.id
      const [movieResponse, videosResponse] = await Promise.all([
        tmdbApi.getMovieDetails(movieId),
        tmdbApi.getMovieVideos(movieId)
      ])
      
      this.movie = movieResponse.data
      const trailer = videosResponse.data.results.find(
        video => video.type === 'Trailer' && video.site === 'YouTube'
      )
      if (trailer) {
        this.trailerKey = trailer.key
      }
    } catch (error) {
      console.error('Error:', error)
    }
  },
  methods: {
    getYear(date) {
      return new Date(date).getFullYear()
    },
    formatRating(rating) {
      return Math.round(rating * 10) / 10
    },
    getGenres(genres) {
      return genres.map(genre => genre.name).join(', ')
    }
  }
}
</script>

<style scoped>
.movie-detail {
  min-height: 100vh;
  background-color: #141414;
}

.backdrop {
  position: relative;
  background-size: cover;
  background-position: center;
  padding: 40px 20px;
}

.backdrop::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
}

.content {
  position: relative;
  display: flex;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.poster img {
  width: 300px;
  border-radius: 8px;
}

.info {
  flex: 1;
  color: white;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.meta {
  margin-bottom: 20px;
}

.meta > * {
  margin-right: 20px;
}

.overview {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
}

.trailer {
  margin-top: 30px;
}

.trailer iframe {
  width: 100%;
  height: 400px;
  border-radius: 8px;
}
</style>