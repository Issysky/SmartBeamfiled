// 大屏store
import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'

export const useScreenStore = defineStore('screen', () => {
  // 获取新闻信息api
  const newsUrl = '/news/'

  // 获取生产线占用率图表option
  const productionLineOption = reactive({
    option: {
      title: {
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: {
          color: '#fafafa'
        },
        top: '10%'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '70%',
          left: '30%',
          data: [
            {
              value: 10,
              name: '一号生产线',
              label: { color: '#f7ea8e' },
              itemStyle: { color: '#f7ea8e' }
            },
            {
              value: 30,
              name: '二号生产线',
              label: { color: '#b0edef' },
              itemStyle: { color: '#b0edef' }
            },
            {
              value: 50,
              name: '三号生产线',
              label: { color: '#aefdae' },
              itemStyle: { color: '#aefdae' }
            },
            {
              value: 10,
              name: '四号生产线',
              label: { color: '#F1B2B2' },
              itemStyle: { color: '#F1B2B2' }
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
  }
  return { getNewsData, productionLineOption, chartSetOption }
})
