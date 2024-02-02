// 设备数据 蒸养棚的store
import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'

export const useEquipSteamStore = defineStore('equipSteam', () => {
  // 蒸养棚数据
  let equipSteamData = reactive([])
  //  温湿度数据
  let equipTempData = reactive({})
  // 定义图表的option
  const option = reactive({
    tooltip: {
      trigger: 'axis'
      // formatter: function (params) {
      //   //定义显示内容
      //   const text =
      //     params[0].name +
      //     '<br/>' +
      //     params[0].marker +
      //     params[0].seriesName +
      //     ' : ' +
      //     params[0].value +
      //     '℃<br/>' +
      //     params[1].marker +
      //     params[1].seriesName +
      //     ' : ' +
      //     params[1].value +
      //     '℃<br/>' +
      //     params[2].marker +
      //     params[2].seriesName +
      //     ' : ' +
      //     params[2].value +
      //     '℃<br/>' +
      //     params[3].marker +
      //     params[3].seriesName +
      //     ' : ' +
      //     params[3].value +
      //     '%RH<br/>' +
      //     params[4].marker +
      //     params[4].seriesName +
      //     ' : ' +
      //     params[4].value +
      //     '%RH<br/>' +
      //     params[5].marker +
      //     params[5].seriesName +
      //     ' : ' +
      //     params[5].value +
      //     '%RH<br/>'
      //   return text
      // }
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
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: []
  })
  // 获取蒸养数据的url
  const equipSreamUrl = '/steam/'

  // 色彩生成器
  function* colorGenerator(colorType,init_color) {
    while (colorType == 'tem') {
      yield `hsl(50,${100-init_color}%,50%)`
      init_color += 20
    }
    while (colorType == 'hum') {
      yield `hsl(200,${100-init_color}%,50%)`
      init_color += 20
    }
  }
  const colorGen1 = colorGenerator('tem',5)
  const colorGen2 = colorGenerator('hum',5)

  // 获取最新蒸养数据
  const getEquipSteamData = async (requestData) => {
    await axios
      .get(equipSreamUrl, {
        params: requestData,
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then((response) => {
        console.log('获取设备数据成功，返回res', response.data)
        equipSteamData.value = response.data
      })
      .catch((error) => {
        console.error('获取设备数据失败，error', error.response)
      })
  }

  // 获取温湿度数据用于绘图
  const getEquipTempData = async (requestData, myChart) => {
    await axios
      .get(equipSreamUrl, {
        params: requestData,
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then((response) => {
        console.log('获取温湿度数据成功，返回res', response.data)
        // 更新series数据
        getSeriesData(response.data)
        // 更新xAxis数据
        getxAxisData(response.data)
        console.log('option', option)
        // setOption
        setChartOption(myChart)
      })
  }
  // 获取option的series数据
  const getSeriesData = (responseData) => {
    let seriesData = []
    responseData.forEach((item, index) => {
      item.data.forEach((i, k) => {
        if (index == 0) {
          seriesData[k] = {
            name: i.name,
            type: 'line',
            stack: k,
            smooth: true,
            lineStyle: {
              color:
                i.name.substring(0, 2) === '温度' ? colorGen1.next().value : colorGen2.next().value
            },
            showSymbol: false,
            data: []
          }
        }
        seriesData[k].data.push(i.value)
      })
    })
    option.series = seriesData
  }
  // 获取option的xAxis数据
  const getxAxisData = (responseData) => {
    let xAxisData = []
    responseData.forEach((item) => {

      xAxisData.push(item.time.substring(5, 16).split('T').join(''))
    })
    option.xAxis.data = xAxisData
  }
  // setOption
  const setChartOption = (myChart) => {
    myChart.setOption(option)
  }
  return {
    equipSteamData,
    equipTempData,
    getEquipSteamData,
    getEquipTempData,
    option
  }
})
