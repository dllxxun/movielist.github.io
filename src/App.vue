<template>
  <div id="app" :class="currentTheme">
    <nav class="navigation">
      <div class="nav-left">
        <span class="home-link" @click="goToHome">Home</span>
        <span class="wishlist-link" @click="goToWishlist">내가 찜한 콘텐츠</span>
        <span class="popular-link" @click="goToPopular">대세 콘텐츠</span>
      </div>
      
      <div class="nav-right">
        <div v-if="isLoggedIn" class="user-menu">
          <span class="search-icon" @click="goToSearch">🔍</span>
          <span class="nickname" @click="toggleDropdown">{{ userNickname }}님</span>
          <div v-if="showDropdown" class="dropdown">
            <button @click="goToSettings" class="menu-item">
              <i class="fas fa-cog"></i> 설정
            </button>
            <button @click="handleLogout" class="menu-item">
              <i class="fas fa-sign-out-alt"></i> 로그아웃
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div class="main-content">
      <router-view @theme-changed="updateTheme"></router-view>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      userNickname: '',
      showDropdown: false,
      currentTheme: 'light'
    }
  },
  created() {
    this.checkLoginStatus()
    this.loadUserSettings()
  },
  methods: {
    checkLoginStatus() {
      this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
      if (this.isLoggedIn) {
        this.userNickname = localStorage.getItem('userNickname')
      }
    },
    loadUserSettings() {
      const savedSettings = localStorage.getItem('userSettings')
      if (savedSettings) {
        const settings = JSON.parse(savedSettings)
        this.currentTheme = settings.theme
      }
    },
    updateTheme(theme) {
      this.currentTheme = theme
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
    handleLogout() {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('rememberMe')
      this.isLoggedIn = false
      this.showDropdown = false
      this.$router.push('/signin')
    },
    goToSettings() {
      this.$router.push('/settings')
      this.showDropdown = false
    },
    goToHome() {
      this.$router.push('/home')
    },
    goToWishlist() {
      this.$router.push('/wishlist')
    },
    goToSearch() {
      this.$router.push('/search')
    },
    goToPopular() {
      this.$router.push('/popular')
    }
  },
  watch: {
    $route() {
      this.checkLoginStatus()
    }
  }
}
</script>

<style>
/* 전역 스타일 */
body {
  margin: 0;
  padding: 0;
  background-color: #141414;
  color: white;
}

#app {
  min-height: 100vh;
  background-color: #141414;
}

.navigation {
  padding: 20px;
  background-color: #141414;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-left a {
  display: flex;
  align-items: center;
  gap: 10px;
}

.home-link {
  color: #ee0909;
  font-weight: 800;
  font-size: xxx-large;
  cursor: pointer;
}

.wishlist-link {
  color: #e5e5e5;
  padding: 25px;
  cursor: pointer;
}

.wishlist-link:hover {
  color: #ff0000;
}

.popular-link {
  color: #e5e5e5;
  padding: 25px;
  cursor: pointer;
}

.popular-link:hover {
  color: #ff0000;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-icon {
  cursor: pointer;
  padding: 8px;
}

.user-menu {
  position: relative;
  cursor: pointer;
}

.nickname {
  color: #e5e5e5;
  cursor: pointer;
  padding: 8px;
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #141414;
  border: 1px solid #333;
  border-radius: 4px;
  padding: 8px;
}

.dropdown button {
  background: none;
  border: none;
  color: #e5e5e5;
  cursor: pointer;
  padding: 8px 16px;
  width: 100%;
  text-align: left;
}

.dropdown button:hover {
  background-color: #333;
}

.signin-link, .logout-link {
  color: #e5e5e5;
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;
  transition: color 0.2s ease;
}

.signin-link:hover, .logout-link:hover {
  color: #ffffff;
}

.search-icon {
  cursor: pointer;
  padding: 8px;
  font-size: 1.2rem;
  transition: transform 0.2s ease;
}

.search-icon:hover {
  transform: scale(1.1);
}

.main-content {
  padding: 20px;
}

/* 링크 스타일 */
a {
  color: #ff0000;
}

a:hover {
  color: #ffffff;
}

/* 활성 링크 스타일 */
.router-link-active {
  color: #e50914;
}

/* body 태그에 대한 라이트 모드 스타일 */
.light body {
  background-color: #ffffff;
  color: #141414;
}

/* 앱 전체 라이트 모드 스타일 */
.light #app {
  background-color: #ffffff;
}

/* 영화 정보 라이트 모드 스타일 */
.light .movie-genres,
.light .rating {
  color: #ffffff;
}

/* 별점 스타일 */
.light .star {
  color: #FFD700;
}

/* 장르 태그 라이트 모드 스타일 */
.light .genre-tag {
  background-color: #f5f5f5;
  color: #000000;
  border: 1px solid #e0e0e0;
}

/* 영화 카드 컨테이너 라이트 모드 스타일 */
.light .movie-grid,
.light .movie-list {
  background-color: #ffffff;
}

/* 영화 제목 라이트 모드 스타일 */
.light .movie-title {
  color: #ffffff;
}

/* 페이지 제목 라이트 모드 스타일 */
.light h1,
.light h2,
.light h3 {
  color: #141414;
}

/* 검색 입력창 라이트 모드 스타일 */
.light input[type="text"],
.light input[type="search"] {
  background-color: #ffffff;
  color: #141414;
  border: 1px solid #e0e0e0;
}

/* 컨텐츠 섹션 라이트 모드 스타일 */
.light .section-title {
  color: #141414;
}

/* 테마 스타일 추가 */
.light {
  background-color: #ffffff;
  color: #141414;
}

.light .navigation {
  background-color: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.light .home-link {
  color: #ee0909;
  font-weight: 1000;
  font-size: xxx-large;
  cursor: pointer;
}

.light .wishlist-link,
.light .popular-link {
  color: #141414;
}

.light .wishlist-link:hover,
.light .popular-link:hover {
  color: #ff0000;
}

.light .search-icon,
.light .nickname {
  color: #141414;
}

.light .main-content {
  background-color: #ffffff;
  color: #141414;
}

/* 각 페이지별 라이트 모드 스타일 */
.light .settings-container,
.light .wishlist-container,
.light .popular-container,
.light .search-container,
.light .signin-container {
  background-color: #ffffff;
  color: #000000;
}

/* 영화 카드 라이트 모드 스타일 */
.light .movie-card {
  background-color: #2c2929;
  border: 1px solid #e0e0e0;
}

.light .movie-title,
.light .movie-info {
  color: #000000;
}

/* 드롭다운 메뉴 라이트 모드 */
.light .dropdown {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.light .dropdown button {
  color: #141414;
}

.light .dropdown button:hover {
  background-color: #f5f5f5;
}

.dark {
  background-color: #141414;
  color: #ffffff;
}

/* 드롭다운 메뉴 스타일 수정 */
.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width:100%;
  padding: 8px 16px;
  border: none;
  background: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.menu-item i {
  width: 16px;
}

/* 설정 아이콘 스타일 */
.fa-cog {
  margin-right: 8px;
}

/* 드롭다운 애니메이션 */
.dropdown {
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>