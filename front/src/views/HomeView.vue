<!-- 主页 -->
<template>
  <div class="home-wrapper">
    <div ref="BgVideoWrapper" class="bg-video-wrapper">
      <video autoplay loop src="/src/assets/video/bgVideo5.mp4"></video>
    </div>
    <div class="header"><TopBar></TopBar></div>
    <div ref="container" class="container">
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
</script>
<style scoped lang="less">
.home-wrapper {
  position: relative;
  .container {
    position: relative;
    width: 100vw;
    height: 100vh;
    padding-left: 1vw;
    padding-right: 5vw;
    display: flex;
    z-index: 2;
  }

  .bg-video-wrapper {
    position: absolute;
    // background-color: #000;
    top: 0;
    left: 0;
    widows: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;
    // border-radius: 15px;
    video {
      width: 112%;
      height: 110%;
    }
  }
}
</style>
