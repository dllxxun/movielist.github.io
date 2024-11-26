<template>
  <div class="settings-container">
    <h2>설정</h2>
    <div class="settings-section">
      <div class="setting-item">
        <label>언어 설정</label>
        <select v-model="settings.language" @change="saveSettings">
          <option value="ko">한국어</option>
          <option value="en">English</option>
        </select>
      </div>
      <div class="setting-item">
        <label>테마 설정</label>
        <select v-model="settings.theme" @change="saveSettings">
          <option value="light">라이트 모드</option>
          <option value="dark">다크 모드</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settings: {
        language: 'ko',
        theme: 'light'
      }
    }
  },
  mounted() {
    const savedSettings = localStorage.getItem('userSettings')
    if (savedSettings) {
      this.settings = JSON.parse(savedSettings)
    }
  },
  methods: {
    saveSettings() {
      localStorage.setItem('userSettings', JSON.stringify(this.settings))
      this.$emit('theme-changed', this.settings.theme)
    }
  }
}
</script>