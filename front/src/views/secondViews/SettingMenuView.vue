<!-- 点击设置按钮弹出 二级路由设置页面 -->
<template>
  <div class="setting-menu-wrapper">
    <!-- 遮罩 -->
    <div class="mask"></div>
    <div class="setting-menu">
      <!-- 顶部栏 -->
      <div class="header">
        <div
          class="nav"
          v-for="(item, index) in userStore.getSettingFirstRouter()"
          :key="index"
          :class="{ active: index === activeIndex }"
          @click="changeNavActive(index, item.router_name)"
        >
          {{ item.name }}
        </div>
        <button class="close" @click="close()">X</button>
      </div>
      <!-- 下方内容 -->
      <div class="content-wrapper">
        <!-- 左侧边栏 -->
        <div class="leftbar">
          <div class="nav" v-for="(item, index) in userStore.settingSecRouter.children" :key="index" @click="changeLeftActive(index,item.router_name)"
          :class="{active:index === leftActiveIndex}">
            {{ item.name }}
          </div>
        </div>
        <!-- 主要内容区 -->
        <div class="main-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { useRouter } from 'vue-router'
import { useSettingMenuStore } from '../../stores/settingMenu.js'
import { useUserStore } from '../../stores/user.js'
import { ref ,onMounted} from 'vue'

// 引入store
const settingMenuStore = useSettingMenuStore()
const userStore = useUserStore()
//  定义路由
const router = useRouter()

// 定义激活状态
const activeIndex = ref(0)
const leftActiveIndex = ref(0)
// 关闭设置弹窗
const close = () => {
  router.push(settingMenuStore.currentPath)
}
// 改变顶部导航激活状态
const changeNavActive = (index, routerName) => {
  activeIndex.value = index
  userStore.changeSettingSecondRouter(routerName)
  changeLeftActive(0, userStore.settingSecRouter.children[0].router_name)
}
// 改变左侧边栏激活状态
const changeLeftActive = (index, routerName) => {
    leftActiveIndex.value = index
    let path = '/home/setting_menu/'+routerName
    router.push({ path })
}

onMounted(() => {
  // 初始化激活状态
  // console.log(userStore.getSettingFirstRouter())
  changeNavActive(0, userStore.getSettingFirstRouter()[0].router_name)
})
</script>
<style scoped lang="less">
.setting-menu-wrapper {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 100;
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* 黑色半透明遮罩 */
    position: absolute;
    top: 0;
    left: 0;
  }
  .setting-menu {
    width: 50%;
    height: 60%;
    background-color: white;
    position: absolute;
    top: 40%;
    left: 55%;
    transform: translate(-50%, -50%);
    .header {
      display: flex;
      justify-content: space-around;
      height: 7%;
      position: relative;
      border-bottom: 1px solid #000;
      .nav {
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &:hover {
          background-color: #f0f0f0;
        }
      }
      .active{
        background-color: var(--color-primary);
        &:hover {
          background-color: var(--color-primary);
        }
      }
      .close {
        width: 30px;
        height: 25px;
        position: absolute;
        right: 0;
        cursor: pointer;
        background-color: var(--color-info);
        border: none;
        &:hover {
          background-color: var(--color-danger);
        }
      }
    }
    .content-wrapper {
      height: 93%;
      display: flex;
      .leftbar {
        width: 15%;
        height: 100%;
        border-right: 1px solid #000;
        .nav {
          width: 100%;
          height: 10%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #000;
          cursor: pointer;
          &:hover {
            background-color: #f0f0f0;
          }
          
        }
        .active {
          background-color: var(--color-primary);
          &:hover {
            background-color: var(--color-primary);
          }
        }
      }
      .main-content {
        width: 85%;
        height: 100%;
      }
    }
  }
}
</style>
