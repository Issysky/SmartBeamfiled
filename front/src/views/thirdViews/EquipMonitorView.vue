<!-- 三极路由 监控页面 从属于二级路由设备数据 -->
<template>
  <div class="main">
    <div id="container"></div>
    <button @click="update">更新数据</button>
  </div>
</template>

<script setup lang="js">
import * as echarts from 'echarts'
import { onMounted } from 'vue'

let myChart

const option = {
  title: {
    text: 1
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
    textStyle: {
      fontSize: 14 // 设置图例的字体大小
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [
      '2024-01-01 12:30:00',
      '2024-01-01 12:30:30',
      '2024-01-01 12:31:00',
      '2024-01-01 12:31:30',
      '2024-01-01 12:32:00'
    ]
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
      data: []
    },
    {
      name: '温度2',
      type: 'line',
      stack: '2',
      smooth: true,
      data: [49.4, 44.2, 46.9, 47.8, 48.1]
    },
    {
      name: '温度3',
      type: 'line',
      stack: '3',
      smooth: true,
      data: [24.1, 25.6, 29.2, 24.4, 25.5]
    },
    {
      name: '湿度1',
      type: 'line',
      stack: '4',
      smooth: true,
      data: [21.2, 28.2, 29.4, 29.3, 29.3]
    },
    {
      name: '湿度2',
      type: 'line',
      stack: '5',
      smooth: true,
      data: [40.1, 47.3, 45.9, 48.6, 40.7]
    },
    {
      name: '湿度3',
      type: 'line',
      stack: '6',
      smooth: true,
      data: [43.1, 42.4, 44.4, 42.5, 50]
    }
  ]
}
const update = () => {
  option.title.text = Math.random()
  option.series[0].data = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
  myChart.setOption(option)
  myChart.resize()
}

onMounted(() => {
  myChart = echarts.init(document.getElementById('container'))
  // 绘制图表
  myChart.setOption(option)
  window.addEventListener('resize', () => {
    update()
  })
})
</script>
<style scoped lang="less">
#container {
  width: 40vw;
  height: 30vh;
  background-color: #fff;
}
</style>
