<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'

onMounted(() => {
  // 通过await async来获取网络状态
  async function checkConnection() {
    const connection = await window.topBar.pingInter()
    console.log(connection, 'connection')
  }

  checkConnection()
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    window.topBar.getMenu()
  })
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
