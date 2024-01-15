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
      component: () => import('../views/HomeView.vue'),
      children: [
        // 大屏
        {
          path: 'screen',
          name: 'screen',
          component: () => import('../views/secondViews/ScreenView.vue')
        },
        // 设备数据
        {
          path: 'equip',
          name: 'equip',
          component: () => import('../views/secondViews/EquipView.vue'),
          children: [
            // 模板
            {
              path: 'equip__template',
              name: 'equip__template',
              component: () => import('../views/thirdViews/EquipTemplateView.vue')
            },
            // 蒸养棚
            {
              path: 'equip__steam',
              name: 'equip__steam',
              component: () => import('../views/thirdViews/EquipSteamView.vue')
            },
            // 监控
            {
              path: 'equip__monitor',
              name: 'equip__monitor',
              component: () => import('../views/thirdViews/EquipMonitorView.vue')
            }
          ]
        },
        // 生产数据
        {
          path:'production',
          name:'生产数据',
          component:()=>import('../views/secondViews/ProductionView.vue'),
          children:[
            {
              path:'production__beam',
              name:'梁体数据',
              component:()=>import('../views/thirdViews/ProductionBeamView.vue')
            },
            {
              path:'production__plan',
              name:'计划制定',
              component:()=>import('../views/thirdViews/ProductionPlanView.vue')
            }
          ]
        }
      ]
    }
  ]
})

export default router
