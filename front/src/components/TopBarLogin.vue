<!-- 自定义的顶部栏 出现在登录页面 废弃-->
<template>
  <div class="top-bar">
    <div class="label-wrapper">
      <img src="../assets/img/logo.png" alt="" />
      <p>郑州艾环梦工程科技有限公司</p>
    </div>
    <!-- 点击拖拽窗口区域 -->
    <div class="drag dragbox dragable" ref="drag1"></div>
    <div class="box dragbox dragable" ref="drag"></div>
    <!-- 功能按钮区域1 包含关闭，放大，回复，最小化按钮 -->
    <div class="function-wrapper">
      <!-- 最小化 -->
      <button class="min btn" @click="topBarStore.handleMini">
        <el-icon><Minus /></el-icon>
      </button>
      <!-- 退出最大化 在最大化时候显示 -->
      <button class="unmax btn" v-if="topBarStore.isMax" @click="topBarStore.handleUnmax">
        <el-icon><Notification /></el-icon>
      </button>
      <!-- 最大化，在默认窗口显示 -->
      <button class="max btn" v-if="!topBarStore.isMax" @click="topBarStore.handleMax">
        <el-icon><FullScreen /></el-icon>
      </button>
      <!-- 关闭 -->
      <button class="close btn" @click="topBarStore.handleClose">
        <el-icon><Close /></el-icon>
      </button>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import { usetopBarStore } from '../stores/topBar.js'
import { useUserStore } from '../stores/user.js'
// 是否显示最大化/还原按钮
let isMax = ref(false)

// 引入store，内含顶部栏的关闭，最小化，最大化，还原事件
const topBarStore = usetopBarStore()
const userStore = useUserStore()
// 获取顶部导航栏元素
const nav = ref(null)
// 获取可拖拽元素
const drag = ref(null)
const drag1 = ref(null)
</script>
<style scoped lang="less">
main {
  transition: all 0.3s linear;

  .top-bar {
    position: relative;
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 0;
    .label-wrapper {
      width: 31%;
      height: 100%;
      display: flex;
      align-items: center;
      img {
        height: 80%;
        object-fit: contain;
      }
      p {
        color: var(--HeaderFontColor);
        font-size: 1.6em;
        font-weight: bold;
        margin: 0;
      }
    }
    .drag {
      flex: 1;
      height: 100%;
      // -webkit-app-region: drag;
    }
    .box {
      position: absolute;
      top: 0;
      width: 52vw;
      left: 28vw;
      height: 2vh;
      // background-color: azure;
      // -webkit-app-region: drag;
    }
    .function-wrapper {
      width: 120px;
      height: 80%;
      margin-right: 15px;
      display: flex;
      justify-content: space-around;

      // background-color: #ff4d4f;
      .btn {
        width: 40px;
        height: 30px;
        font-size: 18px;
        background-color: transparent;
        border: none;
        line-height: 35px;
        transition: all 0.2s;
        color: var(--HeaderFontColor);
        &:hover {
          background-color: #dadada;
        }
      }
      .min {
        border-left: 1px solid var(--HeaderFontColor);
      }
      .close {
        &:hover {
          background-color: #ff4d4f;
        }
      }
    }
  }
}

.dragable {
  -webkit-app-region: drag;
}
</style>
