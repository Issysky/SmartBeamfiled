<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { usetopBarStore } from './stores/topBar.js'
import Calendar from '@/components/Calendar.vue'

const router = useRouter()

const topBarStore = usetopBarStore()

// 监听键盘事件
const handleKeyDown = (event) => {
  if (event.key === 'F12') {
    // 打开调试
    window.topBar.openDevTools()
  }else if(event.key === 'F5'){
    // 刷新页面
    window.topBar.reload()
  }
}
onMounted(() => {
  // 监听键盘事件f12打开控制台
  window.addEventListener('keydown', handleKeyDown)
  // 通过await async来获取网络状态
  async function checkConnection() {
    const connection = await window.topBar.pingInter()
    console.log(connection, 'connection')
  }
  // 检查网络状态
  checkConnection()
  // 绑定右键菜单事件,
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    window.topBar.getMenu()
  })
  // 放大缩小字体
  window.addEventListener('resize', (e) => {
    // topBarStore.changeFontSize(!topBarStore.isMax ? 'small' : 'large')
  })
  // router.push({ path: '/home' })
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <main>
    <!-- <Calendar /> -->
    <RouterView></RouterView>
  </main>
</template>

<style scoped lang="less">
@font-face {
  font-family: 'textFont';
  src: url('./assets/font/微软雅黑.ttf') format('truetype');
}
main {
  width: 100vw;
  height: 100vh;
  // min-width: 100vw;
  // min-height: 100vh;
  // overflow: auto;
  background-color: var(--BgColor);
}
</style>
