<template>
  <div class="search-page">
    <!-- 필터링 섹션 -->
    <div class="filters">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="영화 제목 검색"
        @input="handleSearch"
      />

      <select v-model="selectedGenre" @change="applyFilters">
        <option value="">장르 선택</option>
        <option value="28">액션</option>
        <option value="12">모험</option>
        <option value="16">애니메이션</option>
        <option value="35">코미디</option>
        <!-- 필요한 장르 추가 -->
      </select>

      <select v-model="minRating" @change="applyFilters">
        <option value="">평점 선택</option>
        <option value="8">8점 이상</option>
        <option value="7">7점 이상</option>
        <option value="6">6점 이상</option>
      </select>

      <select v-model="sortBy" @change="applyFilters">
        <option value="">정렬 기준</option>
        <option value="popularity">인기순</option>
        <option value="release_date">개봉년도순</option>
        <option value="vote_average">평점순</option>
      </select>

      <button @click="resetFilters" class="reset-button">필터 초기화</button>
    </div>

    <!-- 결과 섹션 -->
    <div class="movies-grid" v-if="!loading">
      <div
        v-for="movie in filteredMovies"
        :key="movie.id"
        class="movie-card"
        @click="goToDetail(movie.id)"
      >
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
        />
        <div class="movie-info">
          <h3>{{ movie.title }}</h3>
          <div class="meta">
            <span>⭐ {{ movie.vote_average.toFixed(1) }}</span>
            <span>📅 {{ movie.release_date }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loading">Loading...</div>
  </div>
</template>

<script>
import { tmdbApi } from '@/api/tmdb';

export default {
  name: 'SearchPage',
  data() {
    return {
      movies: [],
      filteredMovies: [],
      loading: true,
      searchQuery: '',
      selectedGenre: '',
      minRating: '',
      sortBy: '',
    };
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await tmdbApi.getPopular();
        this.movies = response.data.results;
        this.filteredMovies = [...this.movies];
        this.loading = false;
      } catch (error) {
        console.error('Error:', error);
      }
    },
    handleSearch() {
      if (this.searchQuery) {
        this.filteredMovies = this.movies.filter((movie) =>
          movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.filteredMovies = [...this.movies];
      }
      this.applyFilters();
    },
    applyFilters() {
      let result = [...this.movies];

      // 검색어 필터링
      if (this.searchQuery) {
        result = result.filter((movie) =>
          movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      // 장르 필터링
      if (this.selectedGenre) {
        result = result.filter((movie) =>
          movie.genre_ids.includes(Number(this.selectedGenre))
        );
      }

      // 평점 필터링
      if (this.minRating) {
        result = result.filter(
          (movie) => movie.vote_average >= Number(this.minRating)
        );
      }

      // 정렬
      if (this.sortBy) {
        result.sort((a, b) => {
          switch (this.sortBy) {
            case 'popularity':
              return b.popularity - a.popularity;
            case 'release_date':
              return new Date(b.release_date) - new Date(a.release_date);
            case 'vote_average':
              return b.vote_average - a.vote_average;
            default:
              return 0;
          }
        });
      }

      this.filteredMovies = result;
    },
    resetFilters() {
      this.searchQuery = '';
      this.selectedGenre = '';
      this.minRating = '';
      this.sortBy = '';
      this.filteredMovies = [...this.movies];
    },
    goToDetail(movieId) {
      this.$router.push(`/movie/${movieId}`);
    },
  },
  created() {
    this.fetchMovies();
  },
};
</script>

<style scoped>
.search-page {
  padding: 20px;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filters input,
.filters select,
.filters button {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.reset-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  cursor: pointer;
}

.reset-button:hover {
  background-color: #c0392b;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.movie-card {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-info {
  padding: 10px;
}

.meta {
  display: flex;
  gap: 10px;
  font-size: 0.9rem;
  color: #666;
}

.loading {
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;
}
</style>
