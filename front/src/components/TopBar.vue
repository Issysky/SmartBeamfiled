<!-- 自定义的顶部栏 -->
<template>
  <div class="top-bar">
    <div class="label-wrapper">
      <p>AHM指挥梁场</p>
    </div>
    <!-- 点击拖拽窗口区域 -->
    <div class="drag"></div>
    <!-- 功能按钮 -->
    <div class="function-wrapper">
      <!-- 关闭 -->
      <button class="close btn" @click="handleClose">
        <el-icon><Close /></el-icon>
      </button>
      <!-- 退出最大化 在最大化时候显示 -->
      <button class="unmax btn" v-if="isMax" @click="handleUnmax">
        <el-icon><Notification /></el-icon>
      </button>
      <!-- 最大化，在默认窗口显示 -->
      <button class="max btn" v-if="!isMax" @click="handleMax">
        <el-icon><FullScreen /></el-icon>
      </button>
      <!-- 最小化 -->
      <button class="min btn" @click="handleMini">
        <el-icon><Minus /></el-icon>
      </button>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref } from 'vue'

// 是否显示最大化/还原按钮
let isMax = ref(false)

// 四个按钮事件
const handleClose = () => {
  // 清除本地存储
  localStorage.removeItem('token')
  window.topBar.close()
}
const handleMini = () => {
  window.topBar.mini()
}
const handleMax = () => {
  window.topBar.max()
  isMax.value = true
}
const handleUnmax = () => {
  window.topBar.unmax()
  isMax.value = false
}
</script>
<style scoped lang="less">
main {
  .top-bar {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .label-wrapper {
      width: 18%;
      p {
        font-size: 22px;
        font-weight: bold;
        margin: 0;
      }
    }
    .drag {
      flex: 1;
      height: 100%;
      -webkit-app-region: drag;
    }
    .function-wrapper {
      width: 12%;
      margin-right: 15px;
      .btn {
        width: 30px;
        height: 30px;
        font-size: 18px;
        background-color: transparent;
        border: none;
        margin-left: 15px;
        line-height: 35px;
        float: right;
        &:hover {
          background-color: #e6f7ff;
        }
      }
      .close {
        &:hover {
          background-color: #ff4d4f;
        }
      }
    }
  }
}
</style>
