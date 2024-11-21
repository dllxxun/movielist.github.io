import { createRouter, createWebHistory } from 'vue-router'
import MovieList from '@/components/MovieList.vue'
import MovieDetail from '@/views/MovieDetail.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router