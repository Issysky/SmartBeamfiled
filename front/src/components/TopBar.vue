<!-- 自定义的顶部栏 出现在绝大多数页面，登录页面的顶部栏不是这个 -->
<template>
  <div class="top-bar">
    <div class="label-wrapper">
      <img src="../assets/logo.png" alt="" />
      <p>郑州艾环梦工程科技有限公司</p>
    </div>
    <!-- 点击拖拽窗口区域 下方两个都是-->
    <div class="nav-wrapper">
      <div
        class="nav"
        ref="nav"
        v-for="(item, index) in navArr"
        :key="item.sort"
        @click="changeActive(index, item.router_name)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="drag dragbox dragable" ref="drag1"></div>
    <div class="box dragbox dragable" ref="drag"></div>
    
    <!-- 功能按钮区域2 包含设置以及提醒信息按钮 -->
    <div class="function-wrapper2">
      <!-- 信息 -->
      <button class="message btn">
        <el-icon><Bell /></el-icon>
      </button>
      <!-- 设置 -->
      <button class="setting btn">
        <el-icon><Tools /></el-icon>
      </button>
    </div>
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
import { useRouter } from 'vue-router'

const router = useRouter()

// 引入store，内含顶部栏的关闭，最小化，最大化，还原事件
const topBarStore = usetopBarStore()
const userStore = useUserStore()

// 导航路由数组
const navArr = userStore.getFirstRouter()
// 获取顶部导航栏元素
const nav = ref(null)
// 获取可拖拽元素
const drag = ref(null)
const drag1 = ref(null)

// 获取大字体文件元素和小字体文件元素，文件在index.html中引入
const smallFs = document.querySelector('#smallFs')
const largeFs = document.querySelector('#largeFs')

// 改变顶部导航栏的激活状态
const changeActive = (index, router_name) => {
  nav.value.forEach((item) => {
    item.classList.remove('active')
  })
  nav.value[index].classList.add('active')
  if (router_name === 'screen') {
    hideLeftBar()
    router.push('/' + router_name)
  } else {
    showLeftBar()
    userStore.changeSecondRouter(router_name)
    router.push('/' + router_name )
  }
}

// 左侧边栏的显示隐藏
const showLeftBar = () => {
  // 获取左侧边栏元素和主要内容区域元素
  const leftBar = document.querySelector('.leftBar-wrapper')
  const mainWrapper = document.querySelector('.main-wrapper')
  leftBar.style.width = '12vw'
  // leftBar.style.visibility = 'visible'
  // 把主要内容区域设置为占据右侧
  mainWrapper.style.width = ''
  mainWrapper.style.marginRight = '4vw'
  mainWrapper.style.marginLeft = '8px'
}
const hideLeftBar = () => {
  // 获取左侧边栏元素和主要内容区域元素
  const leftBar = document.querySelector('.leftBar-wrapper')
  const mainWrapper = document.querySelector('.main-wrapper')
  // leftBar.style.visibility = 'hidden'
  // setTimeout(() => {
  leftBar.style.width = '0'
  // }, 100)
  // 把主要内容区域设置为占满全屏
  mainWrapper.style.flex = '1'
  mainWrapper.style.marginRight = '2vw'
  mainWrapper.style.marginLeft = '0'
}

onMounted(() => {
  // 初始化顶部导航栏激活状态
  nav.value[0].classList.add('active')
})
</script>
<style scoped lang="less">
.top-bar {
  position: relative;
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 0;
  // display: none;
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
  .nav-wrapper {
    // width: 40%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    margin-right: 2%;
    margin-bottom: -3vh;
    color: var(--HeaderFontColor);
    .nav {
      height: 65%;
      width: 7vw;
      padding-top: 10px;
      display: flex;
      justify-content: center;
      align-items: top;
      font-size: 1.1em;
      font-weight: bold;
      border-radius: 15px 15px 0 0;
      transition: all 0.2s;
      cursor: pointer;
    }
    .active {
      background-color: var(--MainContentBgColor);
      box-shadow: 0 -5px 10px -5px #33333366;
    }
  }
  .function-wrapper2 {
    width: 60px;
    height: 80%;
    color: var(--HeaderFontColor);
    .btn {
      width: 30px;
      height: 30px;
      font-size: 18px;
      background-color: transparent;
      border: none;
      line-height: 35px;
      color: var(--HeaderFontColor);
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

.dragable {
  -webkit-app-region: drag;
}
</style>
