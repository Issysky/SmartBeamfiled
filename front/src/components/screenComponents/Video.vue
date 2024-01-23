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
  width: 43%;
  height: 46%;
  position: absolute;
  background-color: transparent;
  top: 10%;
  right: 29%;
  video {
    position: absolute;
    border-radius: 20px;
    overflow: hidden;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
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
