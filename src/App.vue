<template>
  <div id="app">
    <nav class="navigation">
      <div class="nav-left">
        <router-link to="/">Home</router-link>
      </div>
      <div class="nav-right">
        <div class="search-icon" @click="goToSearch">
          🔍
        </div>
      </div>
    </nav>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToSearch() {
      this.$router.push('/search')
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
  color: #bb1616;
  text-decoration: none;
  font-weight: 800;
  font-size: xx-large;
}

.nav-right {
  color: #e5e5e5;
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
  color: #e5e5e5;
}

a:hover {
  color: #ffffff;
}

/* 활성 링크 스타일 */
.router-link-active {
  color: #e50914;
}
</style>