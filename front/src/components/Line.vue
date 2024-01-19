<!-- 装饰线,出现于大屏页面组件中 -->
<template>
  <div class="line-wrapper" :style="{width:props.width}">
    <div class="bold"></div>
    <div class="light"></div>
  </div>
</template>

<script setup lang="js">
import { defineProps } from 'vue'

const props = defineProps({
    width:{
        default: '300px'
    }
})
</script>
<style scoped lang="less">
.line-wrapper {
  display: flex;
  align-items: center;
  .bold {
    flex: 1;
    height: 3px;
    background-color: #000;
  }
  .light {
    flex: 6;
    height: 1px;
    background-color: #22222233;
  }
}
</style>
