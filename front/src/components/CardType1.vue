<!-- 蒸养卡片 出现在三极路由蒸养棚中 -->
<template>
  <div class="card">
    <!-- 标题 -->
    <p class="label">一号蒸养棚</p>
    <!-- 左侧区域 -->
    <div class="left-wrapper">
      <img class="door-img" src="" alt="" @click="monitorStore.showMonitor" />
      <img class="door-img" src="" alt="" @click="monitorStore.showMonitor" />
      <el-button class="contarl-steam">一键蒸养</el-button>
    </div>
    <!-- 右侧区域 -->
    <div class="right-wrapper">
      <!-- 切换数据和控制的按钮 -->
      <div class="switch-btn">
        <button @click="handle()" :class="{ active: isActive }">数据</button>
        <button @click="handle()" :class="{ active: !isActive }">控制</button>
      </div>
      <div class="data">
        <p class="label">24小时温湿度曲线</p>
        <div class="chart" ref="chart" id="container"></div>
        <div class="info">
          <p>实时温度</p>
          <p>实时湿度</p>
          <p>蒸汽阀状态</p>
          <p>水阀状态</p>
        </div>
      </div>
      <div class="contral" v-if="!isActive">
        <p class="label">阀门控制</p>
        <div class="btn-wrapper"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted, reactive, ref, watch } from 'vue'
import { useEquipSteamStore } from '../stores/equipSteam.js'
import { useMonitorStore } from '../stores/monitor.js'
import * as echarts from 'echarts'

//定义时间范围
const timeRange = ref('')
//  引入store
const equipSteamStore = useEquipSteamStore()
const monitorStore = useMonitorStore()
// 定义isActive,控制按钮的样式
const isActive = ref(true)
// 定义图表dom
const chart = ref(null)
// 定义图表dom
let myChart

// 点击切换按钮的事件
const handle = () => {
  isActive.value = !isActive.value
}

// watch(equipStore.option, (newVal, oldVal) => {
//   if (myChart) {
//     myChart.setOption(equipStore.getChartOption())
//     console.log('图表数据更新了')
//   }
// })
onMounted(() => {
  // 获取图表dom
  myChart = echarts.init(document.getElementById('container'))
  const requestData = {
    type: 'tem_hum',
    name: 'room1',
    time_from: '2024-01-01 12:30:00',
    time_to: '2024-01-01 14:40:00',
    is_simplify:'true'
  }
  // 发送请求
  equipSteamStore.getEquipTempData(requestData, myChart)
  // 窗口变化时图表自适应
  window.addEventListener('resize', () => {
    myChart.resize()
  })
})
</script>
<style scoped lang="less">
.card {
  width: 44%;
  height: 36%;
  background-color: #fff;
  margin-bottom: 2%;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .label {
    font-size: 1em;
    width: 100%;
    text-align: center;
    margin: 0 auto;
  }
  .left-wrapper {
    width: 35%;
    height: 80%;
    background-color: rgb(100, 110, 108);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    .door-img {
      width: 45%;
      height: 45%;
      background-color: #1e4570;
      cursor: pointer;
    }
  }
  .right-wrapper {
    width: 60%;
    height: 80%;
    background-color: #bfc;
    position: relative;
    .switch-btn {
      position: absolute;
      right: 0;
      width: 44%;
      height: 10%;
      border-radius: 15px;
      background-color: #333;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      z-index: 99;
      button {
        width: 45%;
        height: 80%;
        font-size: 0.8em;
        background-color: transparent;
        border-radius: 15px;
        border: none;
        overflow: visible;
        white-space: nowrap;
        cursor: pointer;
        color: var(--HeaderFontColor);
      }
      .active {
        background-color: #fff;
        color: #333;
      }
    }
    .data {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .label {
        width: 100%;
        height: 12%;
        font-size: 0.8em;
        text-align: left;
      }
      .chart {
        width: 95%;
        height: 80%;
      }
      .info {
        width: 100%;
        height: 20%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        align-content: flex-start;
        p {
          width: 50%;
          margin: 0;
          font-size: 0.8em;
        }
      }
    }
    .contral {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      .label {
        width: 100%;
        height: 12%;
        font-size: 0.8em;
        text-align: left;
      }
      .btn-wrapper {
        width: 100%;
        height: 80%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        align-content: flex-start;
        background-color: #1e4570;
      }
    }
  }
}
</style>
