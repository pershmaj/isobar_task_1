import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import SearchPage from '@/views/SearchPage/SearchPage.vue'
import LoginPage from '@/views/LoginPage/LoginPage.vue'
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'SearchPage',
    component: SearchPage,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  if(!store.state.token && to.name !== 'LoginPage') {
    next({ name: 'LoginPage' })
  } else {
    next()
  }
})

export default router
