<template>
  <div class="login-container">
    <div class="login-box">
      <h1>로그인</h1>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <input 
            type="email" 
            v-model="email" 
            placeholder="이메일"
            required
          >
        </div>
        <div class="input-group">
          <input 
            type="password" 
            v-model="password" 
            placeholder="비밀번호"
            required
          >
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      // 간단한 로그인 검증
      if (this.email && this.password) {
        localStorage.setItem('isLoggedIn', 'true')
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #141414;
}

.login-box {
  background-color: rgba(0, 0, 0, 0.75);
  padding: 60px 68px 40px;
  border-radius: 4px;
  width: 100%;
  max-width: 450px;
}

h1 {
  color: white;
  margin-bottom: 28px;
  font-size: 32px;
}

.input-group {
  margin-bottom: 16px;
}

input {
  width: 100%;
  height: 50px;
  padding: 16px 20px;
  border: none;
  border-radius: 4px;
  background-color: #333;
  color: white;
  font-size: 16px;
}

button {
  width: 100%;
  height: 50px;
  background-color: #e50914;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  margin-top: 24px;
  cursor: pointer;
}

button:hover {
  background-color: #f40612;
}
</style>