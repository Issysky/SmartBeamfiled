import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 打开应用跳转到登录页
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    // 登录成功跳转首页
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
  ]
})

export default router
