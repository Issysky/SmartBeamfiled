<!-- 主页 -->
<template>
  <div class="home-wrapper">
    <!-- <div v-if="">Connected</div>
    <div v-else>No connection</div> -->
    <div class="header"><TopBar></TopBar></div>
    <div class="container">
      <LeftBar></LeftBar>
      <MainContent>
        <router-view></router-view>
      </MainContent>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import LeftBar from '@/components/LeftBar.vue'
import MainContent from '@/components/MainContent.vue'
import TopBar from '../components/TopBar.vue'
import { useUserStore } from '../stores/user.js'

// 定义路由
const router = useRouter()

// 引入store
const userStore = useUserStore()
// 使用navigator.onLine判断是否联网
const online = ref(navigator.onLine)

onMounted(() => {
})
</script>
<style scoped lang="less">
.home-wrapper {
  .container {
    width: 100vw;
    height: 100vh;
    display: flex;
    padding-left: 1vw;
    padding-right: 5vw;
  }
}
</style>
