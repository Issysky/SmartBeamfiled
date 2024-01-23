<!-- 带装饰线的标题,出现于大屏页面组件中 -->
<template>
  <div class="label-wrapper" :style="{ width: width }">
    <p class="label">{{ label }}</p>
    <div class="line-wrapper">
      <div class="bold"></div>
      <div class="light"></div>
    </div>
  </div>
</template>

<script setup lang="js">
import { defineProps } from 'vue'

const props = defineProps({
  label: {
    default: '标题'
  },
  width: {
    default: '80%'
  }
})
</script>
<style scoped lang="less">
.label-wrapper {
  p {
    font-size: 1.4em;
    font-weight: bold;
    margin: 0;
  }
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
}
</style>
