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
  } else if (event.key === 'F5') {
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
  // checkConnection()
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
@font-face {
  font-family: 'alimamaFont';
  src: url('./assets/font/阿里妈妈数黑体.ttf') format('truetype');
}
main {
  width: 100vw;
  height: 100vh;
  // min-width: 100vw;
  // min-height: 100vh;
  // overflow: auto;
  background-color: var(--BgColor);
  /* 对所有元素的滚动条进行样式设置 */
  ::-webkit-scrollbar {
    width: 7px; /* 设置滚动条的宽度 */
    height: 5px; /* 设置滚动条的高度，对于横向滚动条 */
  }

  /* 滚动条轨道 */
  ::-webkit-scrollbar-track {
    background: #f1f1f1; /* 设置轨道的背景颜色 */
    border-radius: 10px;
  }

  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    background: #888; /* 设置滑块的背景颜色 */
    border-radius: 10px
  }

  /* 当鼠标悬停在滚动条上时，改变滑块的背景颜色 */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}
</style>
