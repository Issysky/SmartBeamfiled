<!-- 自定义的顶部栏 -->
<template>
  <div class="top-bar">
    <div class="label-wrapper">
      <img src="../assets/logo.png" alt="" />
      <p>郑州艾环梦工程科技有限公司</p>
    </div>
    <!-- 点击拖拽窗口区域 -->
    <div class="drag" ></div>
    <div class="nav-wrapper">
      <div class="activebg" ref="activebg"></div>
      <div class="nav" v-for="item in navArr" :key="item.index" @click="changeActive(index)">{{ item.name }}</div>
    </div>
    <!-- 功能按钮区域2 包含设置以及提醒信息按钮 -->
    <div class="function-wrapper2">
      <!-- 信息 -->
      <button class="message btn" >
        <el-icon><Bell /></el-icon>
      </button>
      <!-- 设置 -->
      <button class="setting btn" >
          <el-icon><Tools /></el-icon>
      </button>
    </div>
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
const navArr = [
  {
    index:0,
    name:'数字大屏',
    path:'/home'
  },
  {
    index:1,
    name:'数字孪生',
    path:'/home'
  },
  {
    index:2,
    name:'设备管理',
    path:'/home'
  },
  {
    index:3,
    name:'劳务管理',
    path:'/home'
  },
  {
    index:4,
    name:'生产数据',
    path:'/home'
  },
  {
    index:5,
    name:'架设进度',
    path:'/home'
  }
]
// 获取大字体文件元素和小字体文件元素，文件在index.html中引入
const smallFs = document.querySelector('#smallFs')
const largeFs = document.querySelector('#largeFs')

// 获取激活状态的背景元素
const activebg = ref(null);
// 改变顶部导航栏的激活状态
function changeActive(index){
  console.log(activebg)
}

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
  window.topBar.max()
  isMax.value = true
  // 放大的时候切换大字体文件，禁用小字体文件
  smallFs.setAttribute('disabled', 'false')
  largeFs.removeAttribute('disabled')
}
const handleUnmax = () => {
  window.topBar.unmax()
  isMax.value = false
  // 还原的时候切换小字体文件，禁用大字体文件
  smallFs.removeAttribute('disabled')
  largeFs.setAttribute('disabled', 'false')
}
</script>
<style scoped lang="less">
main {
  .top-bar {
    position: relative;
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
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
        font-size: 1.6em;
        font-weight: bold;
        margin: 0;
      }
    }
    .drag {
      flex: 1;
      height: 100%;
      -webkit-app-region: drag;
    }
    .nav-wrapper{
      width: 40%;
      height: 100%;
      position: relative;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-right:2%;
      .nav {
        height: 35%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.1em;
        font-weight: bold;
        border-radius: 15px;
        cursor: pointer;
        &:hover {
          background-color: #e6f7ff;
        }
      }
      .activebg {
        width:16%;
        height: 35%;
        position: absolute;
        border-radius: 15px;
        left: 0;
        background-color: #e6f7ff;
        z-index: -1;
      }
    }
    .function-wrapper2 {
      width: 8%;
      height: 80%;
      .btn {
        width: 30px;
        height: 30px;
        font-size: 18px;
        background-color: transparent;
        border: none;
        margin-left: 15px;
        line-height: 35px;
        color:#333;
        cursor: pointer;
      }
      .message {
        transition: all 0.1s;
        &:hover {
          transform: scale(1.1);
        }
      }
      .setting {
        transition: all 0.3s;
        &:hover {
          transform: rotate(180deg);
        }
      }
    }
    .function-wrapper {
      width: 12%;
      height: 80%;
      margin-right: 15px;
      display: flex;
      justify-content: space-around;
      // background-color: #ff4d4f;
      .btn {
        width: 30px;
        height: 30px;
        font-size: 18px;
        background-color: transparent;
        border: none;
        margin-left: 15px;
        line-height: 35px;
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
