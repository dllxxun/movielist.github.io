import { createRouter, createWebHistory } from 'vue-router'
import MovieList from '@/components/MovieList.vue'
import MovieDetail from '@/views/MovieDetail.vue'
import SearchPage from '@/views/SearchPage.vue'
import SignInPage from '@/views/SignIn.vue'
import WishlistPage from '@/views/WishlistPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/signin'  // 첫 페이지를 로그인 페이지로 리다이렉트
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignInPage
  },
  {
    path: '/home',
    name: 'Home',
    component: MovieList,
    meta: { requiresAuth: true }
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
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: WishlistPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  if (to.path !== '/signin' && !isLoggedIn) {
    next('/signin')
  } else {
    next()
  }
})

export default router