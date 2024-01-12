<!-- 蒸养卡片 出现在三极路由蒸养棚中 -->
<template>
  <div class="card">
    <!-- 标题 -->
    <p class="label">一号蒸养棚</p>
    <!-- 左侧区域 -->
    <div class="left-wrapper">
      <!-- <img src="" alt=""> -->
      <!-- 是否开门的占位符 -->
      <span>{{ equipStore.equipSteamData[0]?.door[0] ? '开门' : '关门' }}</span
      ><span>{{ equipStore.equipSteamData[0]?.door[1] ? '大开门' : '关门' }}</span>
      <el-button>一键蒸养</el-button>
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
import { onMounted, ref, watch } from 'vue'
import { useEquipStore } from '../stores/equip.js'
import { Chart } from '@antv/g2'
import * as echarts from 'echarts'

//定义时间范围
const timeRange = ref('')

//  引入store
const equipStore = useEquipStore()
// 定义isActive,控制按钮的样式
const isActive = ref(true)
// 定义图表数据
const chartData = ref(equipStore.equipTempData)
// 定义图表dom
const chart = ref(null)
// const myChart = echarts.init(document.getElementById('container'))
let myChart = ref()
const option = ref({
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      //定义显示内容
      const text =
        params[0].name +
        '<br/>' +
        params[0].marker +
        params[0].seriesName +
        ' : ' +
        params[0].value +
        '℃<br/>' +
        params[1].marker +
        params[1].seriesName +
        ' : ' +
        params[1].value +
        '℃<br/>' +
        params[2].marker +
        params[2].seriesName +
        ' : ' +
        params[2].value +
        '℃<br/>' +
        params[3].marker +
        params[3].seriesName +
        ' : ' +
        params[3].value +
        '%RH<br/>' +
        params[4].marker +
        params[4].seriesName +
        ' : ' +
        params[4].value +
        '%RH<br/>' +
        params[5].marker +
        params[5].seriesName +
        ' : ' +
        params[5].value +
        '%RH<br/>'
      return text
    }
  },
  legend: {
    data: ['温度1', '温度2', '温度3', '湿度1', '湿度2', '湿度3'],
    itemHeight: 0,
    itemWidth: 15,
    textStyle: {
      fontSize: 10 // 设置图例的字体大小
    }
  },
  grid: {
    top: '15%',
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      // saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: equipStore.equipTempData.showTime,
    axisLabel: {
      interval: function (index, value) {
        // 假设你的数据总量是 dataLength
        let dataLength = equipStore.equipTempData.showTime.length
        // 你想要显示的数据量 是 3
        let displayDataCount = 3
        // 计算间隔
        let interval = Math.floor(dataLength / displayDataCount)
        // 只有当 index 是 interval 的倍数时才显示标签
        return index % interval === 0
      }
    }
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '温度1',
      type: 'line',
      stack: '1',
      smooth: true,
      showSymbol: false,
      data: equipStore.equipTempData.data1
    },
    {
      name: '温度2',
      type: 'line',
      stack: '2',
      smooth: true,
      showSymbol: false,
      data: equipStore.equipTempData.data2
    },
    {
      name: '温度3',
      type: 'line',
      stack: '3',
      smooth: true,
      showSymbol: false,
      data: equipStore.equipTempData.data3
    },
    {
      name: '湿度1',
      type: 'line',
      stack: '4',
      smooth: true,
      showSymbol: false,
      data: equipStore.equipTempData.data4
    },
    {
      name: '湿度2',
      type: 'line',
      stack: '5',
      smooth: true,
      showSymbol: false,
      data: equipStore.equipTempData.data5
    },
    {
      name: '湿度3',
      type: 'line',
      stack: '6',
      smooth: true,
      showSymbol: false,
      data: equipStore.equipTempData.data6
    }
  ]
})
// const getAntVChart = () => {
//   const chart = new Chart({
//     container: 'container',
//     autoFit: true
//   })

//   chart
//     .data(chartData.value)
//     .encode('x', 'time')
//     .encode('y', 'value')
//     .encode('color', 'name')
//     .scale('x', {
//       range: [0, 1]
//     })
//     .scale('y', {
//       nice: true
//     })
//     .axis('y', { labelFormatter: (d) => d + '°C' })
//   chart.axis('x', {
//     tickCount: 3
//   })

//   chart.line().encode('shape', 'smooth')

//   chart.point().encode('shape', 'point').tooltip(false)

//   chart.render()
// }

// 点击切换按钮的事件
const handle = () => {
  isActive.value = !isActive.value
  console.log(option.series[0])
  myChart.setOption(option.value)
}

onMounted(() => {
  // 获取图表dom
  myChart = echarts.init(document.getElementById('container'))
  const requestData = {
    type: 'tem_hum',
    name: 'room1',
    time_from: '2024-01-01 12:30:00',
    time_to: '2024-01-01 12:40:00'
  }
  // 发送请求
  equipStore.getEquipTempData(requestData)
  // 窗口变化时图表自适应
  window.addEventListener('resize', function (event) {
    myChart.resize()
    myChart.setOption(option.value)
  })
  myChart.setOption(option.value)
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
    background-color: #bfc;
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
        width: 100%;
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
