<!--数字大屏 -->
<template>
  <div class="screen-wrapper">
    <div class="beam-screen-wrapper">
      <div class="label">
        <BorderLineTitle class="title"></BorderLineTitle>
        <!-- <button class="fullscreen" @click="fullScreen()" v-if="isMax">
          <el-icon><FullScreen /></el-icon>
        </button>
        <button class="fullscreen" @click="fullScreen()" v-if="!isMax">
          <el-icon><Notification /></el-icon>
        </button> -->
        <div class="change-screen"><span class="left"><el-icon><DArrowLeft /></el-icon></span> 切换大屏</div>
      </div>
      <Overview></Overview>
      <Video></Video>
      <Environment> </Environment>
      <News></News>
      <BeamData></BeamData>
      <ProductProgress></ProductProgress>
      <MixStation></MixStation>
      <productionLine></productionLine>
    </div>
    <!-- <div ref="BgVideoWrapper" class="bg-video-wrapper">
      <video autoplay loop ref="video" src="/src/assets/video/bgVideo.mp4"></video>
    </div> -->
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
import productionLine from '@/components/screenComponents/ProductionLine.vue'

const topBarStore = usetopBarStore()
const isMax = ref(true)
// 全屏按钮点击事件
const fullScreen = () => {
  // 顶部栏的显示与隐藏
  const topBar = document.querySelector('.top-bar')
  const mainWrapper = document.querySelector('.main-wrapper')
  topBar.style.display = isMax.value ? 'none' : 'flex'
  mainWrapper.style.height = isMax.value ? 'auto' : '89vh'
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
  position: relative;
  // border-radius: 20px;
  // background-color: #3867a100;

  .beam-screen-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    // border-radius: 20px;
    .label {
      .title{
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 15px;
        // background-color: #bfc;
      }
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
      .change-screen{
        width: 80px;
        position: absolute;
        right: -100px;
        top: 3%;
        background-color: transparent;
        color: var(--screen-font-color);
        font-size: .7em;
        cursor: pointer; 
        transition: all .5s ease-in-out;
        &:hover{
          right: -40px;
        }
        .left{
          font-size: 1em;
          position: absolute;
          left: -12px;
          line-height: 1.7em;
        }
      }
    }
  }
}
</style>
