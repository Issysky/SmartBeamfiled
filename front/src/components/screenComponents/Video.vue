<!-- 大屏中的视频组件 -->
<template>
  <div class="video-wrapper" :style="{ opacity: show ? '1' : '0' }">
    <div class="video">
      <div class="left"></div>
      <div class="content">
        <video ref="videoPlayer" :src="settingMenuStore.screenVideoUrl" controls></video>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import { useSettingMenuStore } from '../../stores/settingMenu.js'

const videoPlayer = ref(null)

let show = ref(false)

// 引入store
const settingMenuStore = useSettingMenuStore()

// 选择播放视频
function handleFileChange(event) {
  const file = event.target.files[0]
  if (file) {
    const url = URL.createObjectURL(file)
    videoPlayer.value.src = url
  }
}
onMounted(() => {
  setTimeout(() => {
    show.value = true
  }, 1000)
})
</script>

<style scoped lang="less">
.video-wrapper {
  width: 52%;
  height: 59%;
  position: absolute;
  // background-color: #fff;
  top: 12%;
  right: 24%;
  transition: var(--screen-card-transition);
  .video {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .left {
      width: 7%;
      height: 100%;
      background-color: #fff;
      background: url(../../assets/img/screenImg/视频装饰线.png);
      background-position: right;
      background-repeat: no-repeat;
      background-size: contain;
      opacity: 0.6;
    }
    .content {
      height: 90%;
      flex: 1;
      // visibility: hidden;
      video {
        border-radius: 20px;
        overflow: hidden;
        width: 100%;
        height: 100%;
        background-color: #000;
        box-shadow: var(--screen-card-shadow);
      }
      input {
        visibility: hidden;
      }
      .custom-file-upload {
        display: inline-block;
        font-size: 0.6em;
        background-color: #4caf50;
        color: white;
        cursor: pointer;
        border-radius: 5px;
        text-align: center;
        width: 80px;
        position: absolute;
        top: -5%;
        right: 5px;
      }
    }
    .right {
      width: 7%;
      height: 100%;
      background-color: #fff;
      background: url(../../assets/img/screenImg/视频装饰线.png);
      background-position: right;
      background-repeat: no-repeat;
      background-size: contain;
      transform: rotate(180deg);
      opacity: 0.6;
    }
  }
}
</style>
