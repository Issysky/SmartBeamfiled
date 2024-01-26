<!-- 主页 -->
<template>
  <div class="home-wrapper">
    <!-- <div ref="videoWrapper" class="start-video-wrapper">
      <video
        autoplay
        ref="video"
        src="../assets/video/startVideo.mp4"
      ></video>
    </div> -->
    <div ref="BgVideoWrapper" class="bg-video-wrapper">
      <video autoplay loop ref="video" src="/src/assets/video/bgVideo4.mp4"></video>
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
const video = ref(null)
const videoWrapper = ref(null)
const container = ref(null)
onMounted(() => {
  // video.value.addEventListener('ended', () => {
  //   videoWrapper.value.style.display = 'none'
  //   container.value.style.opacity = '1'
  // })
})
</script>
<style scoped lang="less">
.home-wrapper {
  position: relative;
  // background-image: linear-gradient(to left bottom, #141414, #242424, #353535, #474747, #595959);
  // background-image: linear-gradient(to right top, #141414, #242424, #353535, #474747, #595959);

  .container {
    position: relative;
    width: 100vw;
    height: 100vh;
    padding-left: 1vw;
    padding-right: 5vw;
    display: flex;
    z-index: 2;
    // opacity: 1;
    // transition: all 3s;
  }
  .start-video-wrapper {
    position: absolute;
    background-color: #000;
    top: 0;
    left: 0;
    widows: 100%;
    height: 100%;
    z-index: -1;
    video {
      width: 100%;
      height: 100%;
    }
  }
  .bg-video-wrapper {
    position: absolute;
    background-color: #000;
    top: 0;
    left: 0;
    widows: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;
    border-radius: 15px;
    video {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
