<!--数字大屏 -->
<template>
  <el-button type="primary" @click="fullScreen()">{{
    topBarStore.isMax ? '退出全屏' : '全屏'
  }}</el-button>
</template>

<script setup lang="js">
import { ref } from 'vue'
import { usetopBarStore } from '../../stores/topBar.js'

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
</script>
<style scoped lang="less"></style>
