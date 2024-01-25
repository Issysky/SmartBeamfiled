<!-- 工程进度 -->
<template>
  <div class="product-process-wrapper">
    <Line class="line" :width="'80%'" :label="'制梁进度'"></Line>
    <div class="chart-wrapper">
      <ChartMonth class="chart"></ChartMonth>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted, onBeforeMount, reactive } from 'vue'
import Line from '../Line.vue'
import ChartMonth from '../../components/ChartMonth.vue'
</script>
<style scoped lang="less">
.product-process-wrapper {
  width: 22%;
  height: 21%;
  position: absolute;
  top: 72%;

  padding-top: 1%;
  background-color: var(--screen-card-color);
  color:var(--screen-font-color);
  border-radius: 15px;
  // box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.4);
  display: flex;
  flex-direction: column;
  .line {
    padding-left: 6%;
  }
  .chart-wrapper {
    width: 100%;
    height: 80%;
    .chart {
      height: 100%;
    }
  }
}
</style>
