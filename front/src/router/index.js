import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 打开应用跳转到登录页
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    // 登录成功跳转首页
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      children: [
        // 大屏
        {
          path: 'screen',
          name: 'screen',
          component: () => import('../views/secondViews/ScreenView.vue')
        },
        {
          path: 'equip',
          name: 'equip',
          component: () => import('../views/secondViews/EquipView.vue'),
          children: [
            {
              path: 'equip-steam',
              name: 'equip-steam',
              component: () => import('../views/thirdViews/EquipSteamView.vue')
            }
          ]
        }
      ]
    }
  ]
})

export default router
