<!-- 主页 -->
<template>
  <div class="home-wrapper">
    <!-- <div v-if="online">Connected</div>
    <div v-else>No connection</div> -->
    <LeftBar></LeftBar>
    <MainContent></MainContent>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import LeftBar from '@/components/LeftBar.vue'
import MainContent from '@/components/MainContent.vue'

// 定义路由
const router = useRouter()

// 使用navigator.onLine判断是否联网 
// const online = ref(navigator.onLine)

// onMounted(() => {
//   window.addEventListener('online', () => (online.value = true))
//   window.addEventListener('offline', () => (online.value = false))
// })
</script>
<style scoped lang="less">
.home-wrapper {
  width: 100vw;
  height: 100vh;
  background-color: #252526;
  display: flex;
  padding-left: 1vw;
  padding-right: 4vw;
}
</style>
