<!-- 大屏中的视频组件 -->
<template>
  <div class="video-wrapper">
    <input type="file" id="fileInput" accept="video/*" @change="handleFileChange" />
    <label for="fileInput" class="custom-file-upload">选择视频</label>
    <video ref="videoPlayer" controls></video>
  </div>
</template>

<script setup lang="js">
import { ref } from 'vue'

const videoPlayer = ref(null)

function handleFileChange(event) {
  const file = event.target.files[0]
  if (file) {
    const url = URL.createObjectURL(file)
    videoPlayer.value.src = url
  }
}
</script>

<style scoped lang="less">
.video-wrapper {
  width: 51%;
  height: 60%;
  position: absolute;
  // background-color: #fff;
  top: 10%;
  right: 23%;
  video {
    position: absolute;
    border-radius: 20px;
    overflow: hidden;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    background-color: #000;
    transform: translateX(-50%) translateY(-50%);
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
</style>
