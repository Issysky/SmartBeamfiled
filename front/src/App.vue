<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // 通过await async来获取网络状态
  async function checkConnection() {
    const connection = await window.topBar.pingInter()
    console.log(connection, 'connection')
  }
  // 检查网络状态
  checkConnection()
  // 绑定右键菜单事件
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    window.topBar.getMenu()
  })
  // router.push({ path: '/home' })
})
</script>

<template>
  <main>
    <RouterView></RouterView>
  </main>
</template>

<style scoped lang="less">
main {
  width: 100vw;
  height: 100vh;
  background-color: var(--BgColor);
}
</style>
