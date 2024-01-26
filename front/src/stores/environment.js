// 环境监测store
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import axiox from 'axios'

export const useEnvStore = defineStore('env', () => {
  // 定义空气质量option
  const airOption = reactive({
    option: {
      series: [
        {
          type: 'gauge',
          startAngle: 225,
          endAngle: -45,
          min: 0,
          max: 250,
          axisLine: {
            lineStyle: {
              width: 15,
              color: [
                [0.14, '#aefdae'],
                [0.3, '#b0edef'],
                [0.7, '#f7ea8e'],
                [1, '#F1B2B2']
              ]
            }
          },
          pointer: {
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            distance: -15,
            length: 0,
            lineStyle: {
              color: '#fff',
              width: 2
            }
          },
          splitLine: {
            distance: -15,
            length:7,
            lineStyle: {
              color: '#fff',
              width: 3
            }
          },
          axisLabel: {
            color: '#fafafadd',
            distance: -8,
            fontSize: 12,
            rotate: 'tangential',
            formatter: function (value) {
              if (value === 25) {
                return '优'
              } else if (value === 75) {
                return '良'
              } else if (value === 175) {
                return '轻'
              } else if (value == 225) {
                return '重'
              }
              return ''
            }
          },

          data: [
            {
              name: '',
              title: {
                show: true,
                fontSize: 8,
                offsetCenter: [0, '45%'],
                color:'#fafafadd'
              },
              value: 60,
              detail: {
                distance: -60,
                valueAnimation: true,
                formatter: '{value} μg/m3',
                color: '#fafafadd',
                offsetCenter: [0, '60%'],
                fontSize: 8
              }
            }
          ]
        }
      ]
    }
  })
  // 定义噪音option
  const noiseOption = reactive({
    option: {
      series: [
        {
          type: 'gauge',
          startAngle: 225,
          endAngle: -45,
          min: 50,
          max: 65,
          axisLine: {
            lineStyle: {
              width: 15,
              color: [
                [0.33, '#aefdae'],
                [0.66, '#f7ea8e'],
                [1, '#F1B2B2']
              ]
            }
          },
          pointer: {
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            distance: -15,
            length: 0,
            lineStyle: {
              color: '#fff',
              width: 2
            }
          },
          splitLine: {
            distance: -15,
            length: 7,
            lineStyle: {
              color: '#fff',
              width: 3
            }
          },
          axisLabel: {
            color: '#fafafadd',
            distance: -8,
            fontSize: 12,
            rotate: 'tangential',
            formatter: function (value) {
              if (value === 51.5) {
                return '优'
              }  else if (value === 63.5) {
                return '重'
              }
              return ''
            }
          },

          data: [
            {
              name: '',
              title: {
                show: true,
                fontSize: 8,
                offsetCenter: [0, '45%'],
                color:'#fafafadd'
              },
              value: 60,
              detail: {
                distance: -60,
                valueAnimation: true,
                formatter: '{value} 分贝',
                color: '#fafafadd',
                offsetCenter: [0, '60%'],
                fontSize: 8
              }
            }
          ]
        }
      ]
    }
  })

  const url = '/environmentData/'
  //   获取环境数据
  const getEnvData = async (chart, type) => {
    const res = await axiox.get(url, {
      params: { type: 'latest_data' },
      headers: { Authorization: localStorage.getItem('token') }
    })
    getOption(res.data[0])
    if (type == 'air') {
      chartSetOption(chart, airOption.option)
    } else if (type == 'noise') {
      chartSetOption(chart, noiseOption.option)
    }
    
    return res.data[0]
  }
  //   图表渲染
  const chartSetOption = (chart, option) => {
    console.log('渲染图表')
    chart.setOption(option)
  }
  // 更改图表option
  const getOption = (data) => {
    airOption.option.series[0].data[0].value = data.pm2_5
    noiseOption.option.series[0].data[0].value = data.noise
  }

  return { getEnvData }
})
