import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 引入 Element Plus+ 组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// elem中文语言包
import zhCn from 'element-plus/dist/locale/zh-cn'
import axios from 'axios'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// 注册 Element Plus+ 组件库
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

axios.defaults.baseURL = 'https://api.ihmeng.cn'
app.mount('#app')
