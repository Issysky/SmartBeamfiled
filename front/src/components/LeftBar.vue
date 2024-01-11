<!-- 左侧边栏 出现在绝大多数页面中 -->
<template>
  <div class="leftBar-wrapper" ref="leftBar">
    <div class="user-wrapper">
      <img src="../assets/logo.png" alt="" />
      <p>中铁十七局集团</p>
    </div>
    <!-- 导航 -->
    <div class="nav-wrapper">
      <div class="label">{{ userStore.secRouter.name }}</div>
      <div
        class="nav"
        @click="handleClick(index)"
        v-for="(item, index) in userStore.secRouter.children"
        :key="index"
      >
        <!-- <span :class="item.icon"></span> -->
        <span class="iconfont icon-template"></span>
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted } from 'vue'
import { useUserStore } from '../stores/user.js'
import { useRouter } from 'vue-router'
import { useEquipStore } from '../stores/equip.js'

// 定义路由
const router = useRouter()
// 引入store
const userStore = useUserStore()
const equipStore = useEquipStore()
// 点击跳转不同三级路由
const handleClick = async (index) => {
  const path =
    '/home/' +
    userStore.secRouter.router_name +
    '/' +
    userStore.secRouter.children[index].router_name
  // 跳转到蒸养棚页面的操作
  if (path === '/home/equip/equip__steam') {
    const requestData = {
      name: 'room1',
      type: 'device_status'
    }
    equipStore.getEquipSteamData(requestData)
  }
  router.push({ path })
}
onMounted(() => {})
</script>
<style scoped lang="less">
.leftBar-wrapper {
  width: 0;
  height: 83vh;
  border-radius: 15px;
  background: var(--LeftNavBgColor);
  // display: flex;
  flex-direction: column;
  box-shadow: 7px 7px 10px #00000033;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  .user-wrapper {
    width: 100%;
    height: 14%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    img {
      width: 30px;
      height: 30px;
      object-fit: contain;
      border-radius: 50%;
      border: 1px solid #fff;
      margin-right: 3%;
    }
    p {
      font-size: 0.8em;
      color: var(--LeftNavFontColor);
      margin: 0;
      line-height: 1.5;
      white-space: nowrap;
    }
  }
  .nav-wrapper {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .label {
      width: 80%;
      height: 8%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3em;
      color: var(--LeftNavFontColor);
      font-weight: bold;
      border-bottom: 1px solid #fff;
      margin-bottom: 5%;
      white-space: nowrap;
    }
    .nav {
      width: 80%;
      height: 5vh;
      margin-bottom: 8%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 1.1em;
      color: var(--LeftNavFontColor);
      font-weight: 600;
      letter-spacing: 2px;
      border-radius: 10px;
      white-space: nowrap;

      cursor: pointer;
      &:hover {
        color: var(--LeftNavFontColor);
        background-color: #003f73;
      }
      span {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
