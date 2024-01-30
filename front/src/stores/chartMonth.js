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
      },
      formatter: function (params) {
        return (
          params[0].name +
          '<br/>' +
          params[0].marker +
          params[0].seriesName +
          ' : ' +
          params[0].value +
          '<br/>' +
          params[1].marker +
          params[1].seriesName +
          ' : ' +
          params[1].value
        )
      }
    },
    legend: {
      right: '1',
      textStyle: {
        color: '#fafafadd'
      }
    },
    grid: {
      left: '0%',
      right: '0%',
      top: '30%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: []
        // minInterval: 4
      },
      {
        type: 'value',
        show: false
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '计划产量',
        type: 'bar',
        emphasis: {
          focus: 'series'
        },
        data: [],
        itemStyle: {
          color: '#E36255'
        }
      },
      {
        name: '计划产量',
        type: 'line',
        data: [],
        xAxisIndex: 1,
        emphasis: {
          focus: 'series'
        },
        smooth: true,
        lineStyle: {
          color: '#E36255'
        },
        itemStyle: {
          color: '#E36255'
        }
      },
      {
        name: '完成产量',
        type: 'bar',
        emphasis: {
          focus: 'series'
        },
        data: [],
        itemStyle: {
          color: '#AEFDAE'
        }
      },
      {
        name: '完成产量',
        type: 'line',
        xAxisIndex: 1,
        data: [],
        emphasis: {
          focus: 'series'
        },
        smooth: true,
        lineStyle: {
          color: '#AEFDAE'
        },
        itemStyle: {
          color: '#AEFDAE'
        }
      }
    ]
  })
  // 定义已完成数据
  let resData = {}
  let chartMonthData = reactive({
    data: {}
  })
  // 在线状态
  const online = localStorage.getItem('online') === 'online'
  // 定义请求地址
  const url = '/beam_plan/'
  const url2 = '/finished_beam/'
  //   重新渲染图表
  const chartSetOption = (myChart) => {
    myChart.setOption(option)
  }
  //   获取图表数据
  const getChartData = async (myChart) => {
    getChartDataFromLocalStorage(myChart)
    if (online) {
      console.log('chartMonth在线')
      const res = await axios.get(url, {
        params: {
          latest_data: 'true'
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      chartMonthData.data = res.data
      localStorage.setItem('chartMonthData', JSON.stringify(chartMonthData.data))
      getFinishedData(myChart)
    }
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
    arr = []
    for (let key in resData) {
      arr.push(resData[key])
    }
    option.series[2].data = arr
    option.series[3].data = arr
    // 为了让折线图和柱状图顶点重合
    option.series[1].data = option.series[1].data.map((item, index) => [index * 100 + 30, item])
    option.series[3].data = option.series[3].data.map((item, index) => [index * 100 + 70, item])
  }
  // 获取已完成数据
  const getFinishedData = async (myChart) => {
    if (!online) {
      const data = localStorage.getItem('chartMonthResData')
      resData = JSON.parse(data)
    }
    if (online) {
      const res = await axios.get(url2, {
        params: {
          type: 'latest'
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      resData = res.data
      localStorage.setItem('chartMonthResData', JSON.stringify(resData))
    }
    getSeriesData(chartMonthData.data.day_count)
    getxAxisData(chartMonthData.data.day_count)
    chartSetOption(myChart)
    resetOption(myChart)
  }
  // 图表重绘
  const resetOption = (myChart) => {
    // setTimeout(() => {
    //   myChart.clear()
    //   myChart.setOption(option)
    // }, 10)
    setInterval(() => {
      myChart.clear()
      myChart.setOption(option)
    }, 8000)
  }

  //  离线状态从localStorage中获取数据
  const getChartDataFromLocalStorage = (myChart) => {
    if (!online) {
      console.log('chartMonth离线')
      const data = localStorage.getItem('chartMonthData')
      chartMonthData.data = JSON.parse(data)
      if (chartMonthData.data) {
        getFinishedData(myChart)
      }
    }
  }
  return {
    option,
    getChartData
  }
})
