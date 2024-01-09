<!-- 自定义的顶部栏 出现在绝大多数页面，登录页面的顶部栏不是这个 -->
<template>
  <div class="top-bar">
    <div class="label-wrapper">
      <img src="../assets/logo.png" alt="" />
      <p>郑州艾环梦工程科技有限公司</p>
    </div>
    <!-- 点击拖拽窗口区域 -->
    <div class="drag dragable" ref="drag1"></div>
    <div class="nav-wrapper">
      <div class="box dragable" ref="drag" v-for="item in navArr" :key="item.index"></div>
      <div
        class="nav"
        ref="nav"
        v-for="item in navArr"
        :key="item.index"
        @click="changeActive(item.index)"
      >
        {{ item.name }}
      </div>
    </div>
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
    index: 0,
    name: '数字大屏',
    path: '/home'
  },
  {
    index: 1,
    name: '数字孪生',
    path: '/home'
  },
  {
    index: 2,
    name: '设备管理',
    path: '/home'
  },
  {
    index: 3,
    name: '劳务管理',
    path: '/home'
  },
  {
    index: 4,
    name: '生产数据',
    path: '/home'
  },
  {
    index: 5,
    name: '架设进度',
    path: '/home'
  }
]
// 获取顶部导航栏元素
const nav = ref(null)
// 获取可拖拽元素
const drag = ref(null)
const drag1 = ref(null)

// 获取大字体文件元素和小字体文件元素，文件在index.html中引入
const smallFs = document.querySelector('#smallFs')
const largeFs = document.querySelector('#largeFs')

// 改变顶部导航栏的激活状态
const changeActive = (index) => {
  nav.value.forEach((item) => {
    item.classList.remove('active')
  })
  nav.value[index].classList.add('active')
  switch (index) {
    case 0:
      // router.push('/home')
      hideLeftBar()
      break
    case 1:
      // router.push('/home')
      hideLeftBar()
      break
    case 2:
      // router.push('/home')
      showLeftBar()
      break
    case 3:
      // router.push('/home')
      showLeftBar()
      break
    case 4:
      // router.push('/home')
      showLeftBar()
      break
    case 5:
      // router.push('/home')
      showLeftBar()
      break
  }
}

// 左侧边栏的显示隐藏
const showLeftBar = () => {
  // 获取左侧边栏元素和主要内容区域元素
  const leftBar = document.querySelector('.leftBar-wrapper')
  const mainWrapper = document.querySelector('.main-wrapper')
  leftBar.style.left = '0'
  leftBar.style.width = '12vw'
  leftBar.style.visibility = 'visible'
  // 把主要内容区域设置为占据右侧
  mainWrapper.style.flex = '1'
  mainWrapper.style.width = ''
  mainWrapper.style.height = '83vh'
  mainWrapper.style.marginRight = '4vw'
  mainWrapper.style.marginLeft = '8px'
}
const hideLeftBar = () => {
  // 获取左侧边栏元素和主要内容区域元素
  const leftBar = document.querySelector('.leftBar-wrapper')
  const mainWrapper = document.querySelector('.main-wrapper')
  leftBar.style.visibility = 'hidden'
  setTimeout(() => {
    leftBar.style.left = '-13vw'
    leftBar.style.width = '0'
  }, 100)
  // 把主要内容区域设置为占满全屏
  mainWrapper.style.width = '98vw'
  mainWrapper.style.flex = '1'
  mainWrapper.style.height = '89vh'
  mainWrapper.style.marginRight = '2vw'
  mainWrapper.style.marginLeft = '0'
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

onMounted(() => {
  // 初始化顶部导航栏激活状态
  nav.value[0].classList.add('active')
})
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
    .nav-wrapper {
      width: 40%;
      height: 100%;
      position: relative;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      margin-right: 2%;
      color: var(--HeaderFontColor);
      .box {
        width: 16.6666%;
        height: 35%;
        // -webkit-app-region: drag;
      }
      .nav {
        height: 65%;
        width: 16%;
        padding-top: 5px;
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
}

.dragable {
  -webkit-app-region: drag;
}
</style>
