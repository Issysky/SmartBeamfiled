<!-- 监控弹窗组件 出现在蒸养棚 -->
<template>
  <div class="monitor-wrapper">
    <div class="mask"></div>
    <div class="video">
      <button class="close" @click="monitorStore.hideMonitor">X</button>
      <img :src="monitorStore.getImgurl()" alt="" />
    </div>
  </div>
</template>

<script setup lang="js">
import axios from 'axios'
import { onMounted } from 'vue'
import { useMonitorStore } from '../stores/monitor.js'

const monitorStore = useMonitorStore()

// rtsp地址
const rtsp_url = 'rtsp://admin:ly1029384756@192.168.31.100:554/h264/Streaming/Channels/1'
// 请求地址
const url = 'http://127.0.0.1:5000/video_feed'

onMounted(() => {
  console.log('监控弹窗mounted')
})
</script>
<style scoped lang="less">
.monitor-wrapper {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 100;
  .mask {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px); /* 添加毛玻璃效果 */
    position: absolute;
    top: 0;
    left: 0;
  }
  .video {
    width: 60%;
    height: 60%;
    background-color: transparent;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .close {
      width: 30px;
      height: 30px;
      position: absolute;
      right: 10px;
      cursor: pointer;
      border: none;
      color: red;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
