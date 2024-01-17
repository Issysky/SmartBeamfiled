<!-- 月度生产计划 -->
<template>
  <div class="chart-wrapper">
    <div ref="chart" id="container"></div>
  </div>
</template>

<script setup lang="js">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import { useChartMonthStore } from '@/stores/chartMonth.js'

// 定义图表和图表挂载实例对象
const chart = ref(null)
let myChart

// 定义store
const chartMonthStore = useChartMonthStore()
onMounted(() => {
  const date = new Date()
  const year = date.getFullYear()
  myChart = echarts.init(chart.value)
  chartMonthStore.getChartData(myChart,year)
})
</script>
<style scoped lang="less">
.chart-wrapper { 
  width: 100%;
  height:50%;
  display: flex;
  justify-content: center;
  align-items: center;
  #container {
    width: 80%;
    height: 60%;
    background-color: #ff0;
  }
}
</style>
