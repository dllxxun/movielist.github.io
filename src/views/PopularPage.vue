<template>
  <div class="popular-page">
    <div class="view-controls">
      <button @click="viewMode = 'table'" :class="{ active: viewMode === 'table' }">
        Table View
      </button>
      <button @click="viewMode = 'scroll'" :class="{ active: viewMode === 'scroll' }">
        Infinite Scroll
      </button>
    </div>

    <TableView v-if="viewMode === 'table'" :movies="movies" />
    <InfiniteScrollView v-else :movies="movies" @load-more="loadMore" />

    <button class="top-button" v-if="viewMode === 'scroll'" @click="scrollToTop">
      Top ↑
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      viewMode: 'table',
      movies: [],
      currentPage: 1,
      loading: false
    }
  },
  methods: {
    async loadMore() {
      if (this.loading) return
      this.loading = true
      // API 호출 로직
      this.loading = false
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>