<!--数字大屏 -->
<template>
  <div class="screen-wrapper">
    <div class="label">
      <BorderLineTitle class="title"></BorderLineTitle>
      <button class="fullscreen" @click="fullScreen()" v-if="isMax">
        <el-icon><FullScreen /></el-icon>
      </button>
      <button class="fullscreen" @click="fullScreen()" v-if="!isMax">
        <el-icon><Notification /></el-icon>
      </button>
    </div>
    <Overview></Overview>
    <Video></Video>
    <Environment> </Environment>
    <News></News>
    <BeamData></BeamData>
    <ProductProgress></ProductProgress>
    <MixStation></MixStation>
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import { usetopBarStore } from '../../stores/topBar.js'
import Overview from '../../components/screenComponents/Overview.vue'
import Video from '../../components/screenComponents/Video.vue'
import Environment from '../../components/screenComponents/Environment.vue'
import News from '@/components/screenComponents/News.vue'
import BeamData from '@/components/screenComponents/BeamData.vue'
import ProductProgress from '@/components/screenComponents/ProductProgress.vue'
import MixStation from '@/components/screenComponents/MixStation.vue'
import BorderLineTitle from '@/components/screenComponents/BorderLineTitle.vue'

const topBarStore = usetopBarStore()
const isMax = ref(false)
// 全屏按钮点击事件
const fullScreen = () => {
  // 顶部栏的显示与隐藏
  const topBar = document.querySelector('.top-bar')
  const mainWrapper = document.querySelector('.main-wrapper')
  topBar.style.display = isMax.value ? 'none' : 'flex'
  mainWrapper.style.height = isMax.value ? 'auto' : '92vh'
  mainWrapper.style.marginRight = isMax.value ? '1vw' : '2vw'
  mainWrapper.style.marginLeft = isMax.value ? '-1vw' : '0'
  mainWrapper.style.borderRadius = isMax.value ? '0' : '15px'
  isMax.value = !isMax.value
}

onMounted(() => {})
</script>
<style scoped lang="less">
.screen-wrapper {
  width: 100%;
  height: 100%;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 42px;
  position: relative;
  .fullscreen {
    position: absolute;
    right: 0;
    top: 0;
    margin-top: 10px;
    margin-right: 10px;
    background-color: transparent;
    border: none;
    outline: none;
    color: var(--screen-font-color);
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
