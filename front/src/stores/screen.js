// 大屏store
import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'

export const useScreenStore = defineStore('screen', () => {
  // 获取新闻信息api
  const newsUrl = '/news/'

  // 定义卡片是否展示的
  let cardShow = reactive({
    type1: false,
    type2: false,
    type3: false
  })
  // 获取生产线占用率图表option
  const productionLineOption = reactive({
    option: {
      title: {
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      // legend: {
      //   orient: 'vertical',
      //   left: 'left',
      //   textStyle: {
      //     color: '#fafafa'
      //   },
      //   top: '10%'
      // },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '70%',
          left: '0%',
          data: [
            {
              value: 10,
              name: '一号生产线',
              label: { color: '#f7ea8e' },
              // itemStyle: { color: '#f7ea8e' }
              itemStyle: { color: '#FF6E76' }
            },
            {
              value: 30,
              name: '二号生产线',
              label: { color: '#b0edef' },
              // itemStyle: { color: '#b0edef' }
              itemStyle: { color: '#FDDD60' }
            },
            {
              value: 50,
              name: '三号生产线',
              label: { color: '#aefdae' },
              // itemStyle: { color: '#aefdae' }
              itemStyle: { color: '#58D9F9' }
            },
            {
              value: 10,
              name: '四号生产线',
              label: { color: '#F1B2B2' },
              // itemStyle: { color: '#F1B2B2' }
              itemStyle: { color: '#7CFFB2' }
            }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  })

  // 获取新闻信息
  const getNewsData = async () => {
    const res = await axios.get(newsUrl, {
      headers: { Authorization: localStorage.getItem('token') }
    })
    return res.data
  }
  // 渲染图表
  const chartSetOption = (chart, option) => {
    console.log('渲染图表')
    chart.setOption(option)
    resetOption(chart, option)
  }
  // 图表重绘
  const resetOption = (myChart, option) => {
    setInterval(() => {
      myChart.clear()
      myChart.setOption(option)
    }, 7000)
  }
  // 更改卡片是否展示
  // const changeCardShow = (type) => {
  //   setTimeout(() => {
  //     cardShow.type1 = type
  //   }, 300)
  //   setTimeout(() => {
  //     cardShow.type2 = type
  //   }, 200)
  //   setTimeout(() => {
  //     cardShow.type3 = type
  //   }, 100)
  // }
  return { getNewsData, productionLineOption, chartSetOption }
})
