import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'

export const useChartMonthStore = defineStore('chartMonth', () => {
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
        minInterval: 4,
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
        data: [19, 2, 1, 4, 30, 0, 20]
      },
      {
        name: '未完成',
        type: 'line',
        data: [19, 2, 1, 4, 30, 0, 20],
        emphasis: {
          focus: 'series'
        }
      },
      {
        name: '已完成',
        type: 'bar',

        emphasis: {
          focus: 'series'
        },
        data: [19, 2, 1, 4, 30, 0, 20]
      },
      {
        name: '已完成',
        type: 'line',

        emphasis: {
          focus: 'series'
        },
        data: [19, 2, 1, 4, 30, 0, 20]
      },
    ]
  })

  const url = '/beam_plan/'
  //   重新渲染图表
  const chartSetOption = (myChart) => {
    myChart.setOption(option)
  }

  const resData = {
    "一月": 12,
    "二月": 3,
    "三月": 2,
    "四月": 3,
    "五月": 5,
    "六月": 6,
    "七月": 13,
    "八月": 23,
    "九月": 22,
    "十月": 12,
    "十一月": 9,
    "十二月": 10
}
  //   获取图表数据
  const getChartData = async (myChart,year) => {
    await axios
      .get(url, {
        params: {
          monthly_plan: year
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then((res) => {
        getSeriesData(res.data)
        getxAxisData(res.data)
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
      arr.push(key)
    }
    option.xAxis[0].data = arr
  }
  const getSeriesData = (data) => {
    let arr = []
    for (let key in data) {
      arr.push(data[key])
    }
    option.series[0].data = arr
    option.series[1].data = arr
    arr = []
    for (let key in resData){
      arr.push(resData[key])
    }
    option.series[2].data = arr
    option.series[3].data = arr
  }
  return {
    option,
    chartSetOption,
    getChartData
  }
})
