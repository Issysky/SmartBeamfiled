<!-- 二级路由页面显示的标题 -->
<template>
  <div class="label-wrapper">
    <div class="label">{{label}}</div>
    <div class="line"></div>
  </div>
</template>

<script setup lang="js">
import { defineProps, ref } from 'vue'

const props = defineProps({
  label: {
    default: '标题'
  }
})
</script>
<style scoped lang="less">
.label-wrapper {
  width: 94%;
  height: 10%;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 3%;
  .label{
    width: 95%;
    font-size: 1.3em;
    font-weight: 600;
  }
  .line{
    width: 100%;
    height: 2px;
    background-color: #000;
  }
}
</style>
