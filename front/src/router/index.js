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
      path: '/startVideo',
      name: 'startVideo',
      component: () => import('../views/StartVideoView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      children: [
        // 大屏
        {
          path: 'screen',
          name: 'screen',
          component: () => import('../views/secondViews/ScreenView.vue'),
        },
        // 设备管理
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
          path: 'production',
          name: '生产数据',
          component: () => import('../views/secondViews/ProductionView.vue'),
          children: [
            {
              path: 'production__beam',
              name: '梁片数据',
              component: () => import('../views/thirdViews/ProductionBeamView.vue')
            },
            {
              path: 'production__beam__plan',
              name: '梁片计划排程',
              component: () => import('../views/thirdViews/ProductionPlanView.vue')
            },
            {
              path: 'blank',
              name: '空白页',
              component: () => import('../views/thirdViews/BlankView.vue')
            }
          ]
        },
        // 安全
        {
          path: 'security',
          name: 'security',
          component: () => import('../views/secondViews/SecurityView.vue'),
          children: [
            {
              path: 'alarm__chart',
              name: 'alarm__chart',
              component: () => import('../views/thirdViews/AlarmChartView.vue')
            }
          ]
        },
        // AI问答
        {
          path: 'ai',
          name: 'ai',
          component: () => import('../views/secondViews/AIQAView.vue'),
          children: [
            {
              path: 'ai__production',
              name: 'ai__production',
              component: () => import('../views/thirdViews/AIProductionView.vue')
            }
          ]
        }
      ]
    },
    // 通配符路由，用于捕获所有未匹配的路由
    {
      path: '/:pathMatch(.*)*',
      redirect: '/home/equip/equip__template'
    }
  ]
})

export default router
