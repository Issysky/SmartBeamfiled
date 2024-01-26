<!--生产线使用率 大屏组件 -->
<template>
  <div class="product-line-wrapper">
    <Line :width="'60%'" :label="'生产线使用率'"></Line>
    <chartProductionLine></chartProductionLine>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted, onBeforeMount, reactive } from 'vue'
import Line from '../Line.vue'
import chartProductionLine from './chartProductionLine.vue'
</script>
<style scoped lang="less">
.product-line-wrapper {
  width: 21%;
  height: 30%;
  position: absolute;
  top: 38%;
  right: 2%;
  padding-left: 2%;
  padding-top: 1%;
  background-color: var(--screen-card-color);
  color: var(--screen-font-color);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
}
</style>
