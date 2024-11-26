<template>
  <header>
    <div class="user-menu">
      <span class="username">{{ username }}</span>
      <div class="dropdown-menu">
        <router-link to="/settings" class="menu-item">
          <i class="fas fa-cog"></i> 설정
        </router-link>
        <button @click="logout" class="menu-item">
          <i class="fas fa-sign-out-alt"></i> 로그아웃
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      username: localStorage.getItem('username') || '사용자'
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('TMDb-Key')
      localStorage.removeItem('username')
      this.$router.push('/signin')
    }
  }
}
</script>