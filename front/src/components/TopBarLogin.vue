<!-- 自定义的顶部栏 出现在登录页面 -->
<template>
  <div class="top-bar">
    <div class="label-wrapper">
      <img src="../assets/logo.png" alt="" />
      <p>郑州艾环梦工程科技有限公司</p>
    </div>
    <!-- 点击拖拽窗口区域 -->
    <div class="drag dragable" ref="drag1"></div>
    <!-- 功能按钮区域1 包含关闭，放大，回复，最小化按钮 -->
    <div class="function-wrapper">
      <!-- 最小化 -->
      <button class="min btn" @click="handleMini">
        <el-icon><Minus /></el-icon>
      </button>
      <!-- 退出最大化 在最大化时候显示 -->
      <button class="unmax btn" v-if="isMax" @click="handleUnmax">
        <el-icon><Notification /></el-icon>
      </button>
      <!-- 最大化，在默认窗口显示 -->
      <button class="max btn" v-if="!isMax" @click="handleMax">
        <el-icon><FullScreen /></el-icon>
      </button>
      <!-- 关闭 -->
      <button class="close btn" @click="handleClose">
        <el-icon><Close /></el-icon>
      </button>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'

// 是否显示最大化/还原按钮
let isMax = ref(false)
// 导航路由数组

// 获取顶部导航栏元素
const nav = ref(null)
// 获取可拖拽元素
const drag = ref(null)
const drag1 = ref(null)

// 获取大字体文件元素和小字体文件元素，文件在index.html中引入
const smallFs = document.querySelector('#smallFs')
const largeFs = document.querySelector('#largeFs')


// 四个按钮关闭，放大，还原，最小化事件
const handleClose = () => {
  // 清除本地存储
  localStorage.removeItem('token')
  window.topBar.close()
}
const handleMini = () => {
  window.topBar.mini()
}
const handleMax = () => {
  console.log('放大')
  window.topBar.max()
  isMax.value = true
  // 放大的时候切换大字体文件，禁用小字体文件,禁用拖拽
  changeFontSize('large')
  changeDrag(false)
}
const handleUnmax = () => {
  console.log('还原')
  window.topBar.unmax()
  isMax.value = false
  // 还原的时候切换小字体文件，禁用大字体文件，启用拖拽
  changeFontSize('small')
  changeDrag(true)
}
// 改变窗口文字大小，接受一个size参数，size为目标字体大小，值为large或者small
const changeFontSize = (size) => {
  // 切换字体大小
  if (size === 'large') {
    smallFs.setAttribute('disabled', 'false')
    largeFs.removeAttribute('disabled')
  } else {
    smallFs.removeAttribute('disabled')
    largeFs.setAttribute('disabled', 'false')
  }
}
// 改变拖拽许可,接受一个isDrag参数，isDrag为false时禁用拖拽，为true时启用拖拽
const changeDrag = (isDrag) => {
  if (!isDrag) {
    drag.value.forEach((item) => {
      item.classList.remove('dragable')
    })
    drag1.value.classList.remove('dragable')
  } else {
    drag.value.forEach((item) => {
      item.classList.add('dragable')
    })
    drag1.value.classList.add('dragable')
  }
}
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
