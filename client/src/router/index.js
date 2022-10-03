import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: [{ auth: true }],
    component: () => import(/* webpackChunkName = "ChattinGan" */ ('@/views/IndexView.vue'))
  },
  {
    path: '/auth',
    meta: [{ auth: false }],
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import(/* webpackChunkName = "ChattinGan" */ ('@/views/auth/LoginView.vue'))
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import(/* webpackChunkName = "ChattinGan" */ ('@/views/auth/RegisterView.vue'))
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta[0].auth) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next('/auth/login')
    }
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  if (!to.meta[0].auth) {
    if (localStorage.getItem('token')) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
