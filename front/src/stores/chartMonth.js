// 月度生产曲线store
import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'

export const useChartMonthStore = defineStore('chartMonth', () => {
  // 定义图表option
  const option = reactive({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: [],
        minInterval: 4
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '未完成',
        type: 'bar',

        emphasis: {
          focus: 'series'
        },
        data: []
      },
      {
        name: '未完成',
        type: 'line',
        data: [],
        emphasis: {
          focus: 'series'
        }
      }
    ]
  })
  // 定义请求地址
  const url = 'beam_plan'
  //   重新渲染图表
  const chartSetOption = (myChart) => {
    myChart.setOption(option)
  }
  //   获取图表数据
  const getChartData = async (myChart, month) => {
    await axios
      .get(url, {
        params: {
          query_month: '2024-01'
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then((res) => {
        getSeriesData(res.data.day_count)
        getxAxisData(res.data.day_count)
        chartSetOption(myChart)
      })
      .catch((err) => {
        console.log(err, '请求错误')
      })
  }
  // 获取option的xAxis数据
  const getxAxisData = (data) => {
    let arr = []
    for (let key in data) {
      arr.push(key.substring(6, 11))
    }
    option.xAxis[0].data = arr
  }
  // 获取option的series数据
  const getSeriesData = (data) => {
    let arr = []
    for (let key in data) {
      arr.push(data[key])
    }
    option.series[0].data = arr
    option.series[1].data = arr
  }
  return {
    option,
    getChartData,

  }
})
