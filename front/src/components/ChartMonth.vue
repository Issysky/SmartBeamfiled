<!-- 月度生产统计图 -->
<template>
  <div class="chart-wrapper">
    <!-- 月份选择器 -->
    <div class="month-select">
      <p>2024年</p>
      <button class="last-month" @click="changeMonth('last')">
        <el-icon><ArrowLeftBold /></el-icon>
      </button>
      <p class="year">{{ monthValue + '月' }}</p>
      <button class="last-month" @click="changeMonth('next')">
        <el-icon><ArrowRightBold /></el-icon>
      </button>
      <p>生产曲线</p>
    </div>
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
// 定义date对象
const date = new Date()
//  定义月份
let month = date.getMonth() + 1
let monthValue = ref(month)
// 定义store
const chartMonthStore = useChartMonthStore()

// 修改月份
const changeMonth = (type) => {
  if (type === 'last') {
    monthValue.value--
  } else {
    monthValue.value++
  }
  chartMonthStore.getChartData(myChart, monthValue.value)
}

onMounted(() => {
  month = date.getMonth() + 1
  myChart = echarts.init(chart.value)
  chartMonthStore.getChartData(myChart, monthValue.value)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
})
</script>
<style scoped lang="less">
.chart-wrapper {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .month-select {
    width: 40%;
    height: 10%;
    font-size: 20px;
    font-weight: 600;
    color: #000;
    display: flex;
    justify-content: space-around;
    align-items: center;
    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
      line-height: 20%;
      &:hover {
        color: #409eff;
      }
    }
  }
  #container {
    width: 90%;
    height: 60%;
  }
}
</style>
