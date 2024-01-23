<!--数字大屏 -->
<template>
  <div class="screen-wrapper">
    <div class="label">
      <BorderLineTitle class="title"></BorderLineTitle>

      <el-button type="primary" @click="fullScreen()">{{
        topBarStore.isMax ? '退出全屏' : '全屏'
      }}</el-button>
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
// 全屏按钮点击事件
const fullScreen = () => {
  topBarStore.isMax ? topBarStore.handleUnmax() : topBarStore.handleMax()
  // 顶部栏的显示与隐藏
  const topBar = document.querySelector('.top-bar')
  const mainWrapper = document.querySelector('.main-wrapper')
  topBar.style.display = topBarStore.isMax ? 'none' : 'flex'
  mainWrapper.style.height = topBarStore.isMax ? 'auto' : '83vh'
  mainWrapper.style.marginRight = topBarStore.isMax ? '1vw' : '2vw'
  mainWrapper.style.marginLeft = topBarStore.isMax ? '-1vw' : '0'
  mainWrapper.style.borderRadius = topBarStore.isMax ? '0' : '15px'
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
  .title {
    
  }
}
</style>
