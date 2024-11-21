import { createRouter, createWebHistory } from 'vue-router'
import MovieList from '@/components/MovieList.vue'
import MovieDetail from '@/views/MovieDetail.vue'
import SearchPage from '@/views/SearchPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MovieList
  },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: MovieDetail
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router