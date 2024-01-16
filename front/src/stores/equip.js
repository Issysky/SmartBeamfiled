// 设备数据的store
import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'

export const useEquipStore = defineStore('equip', () => {
  // 蒸养棚数据
  let equipSteamData = reactive([])
  //  温湿度数据
  let equipTempData = reactive({})
  // 获取蒸养数据的url
  const equipSreamUrl = '/steam/'

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
  // 获取最新温湿度数据,用于绘制图表
  // const getEquipTempData = async (requestData) => {
  //   await axios
  //     .get(equipSreamUrl, {
  //       params: requestData,
  //       headers: {
  //         Authorization: localStorage.getItem('token')
  //       }
  //     })
  //     .then((response) => {
  //       let data = ref({
  //         trueTime: [],
  //         showTime: [],
  //         data1: [],
  //         data2: [],
  //         data3: [],
  //         data4: [],
  //         data5: [],
  //         data6: []
  //       })
  //       console.log('获取温湿度成功，返回res', response.data)
  //       // 设置antv的数据格式
  //       // response.data.forEach((item) => {
  //       //   for (let i = 0; i < 6; i++) {
  //       //     let data
  //       //     if (i < 3) {
  //       //       data = {
  //       //         value: item.tem[i],
  //       //         time: item.time,
  //       //         name:'温度'+(i+1)
  //       //       }
  //       //     } else {
  //       //       data = {
  //       //         value: item.hum[i - 3],
  //       //         time: item.time,
  //       //         name:'湿度'+(i-2)
  //       //       }
  //       //     }

  //       //     equipTempData.value.push(data)
  //       //   }
  //       // })
  //       // 设置echarts的数据格式
  //       response.data.forEach((item) => {
  //         data.value.trueTime.push(item.time.split('T').join(' '))
  //         data.value.showTime.push(item.time.slice(5, 16).split('T').join(' '))
  //         data.value.data1.push(item.tem[0])
  //         data.value.data2.push(item.tem[1])
  //         data.value.data3.push(item.tem[2])
  //         data.value.data4.push(item.hum[0])
  //         data.value.data5.push(item.hum[1])
  //         data.value.data6.push(item.hum[2])
  //       })
  //       equipTempData.value = data.value

  //     })
  //     .catch((error) => {
  //       console.error('获取温湿度失败，error', error)
  //     })

  // }
  const getEquipTempData = async (requestData) => {
    const response = await axios.get(equipSreamUrl, {
      params: requestData,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    let data = ref({
      trueTime: [],
      showTime: [],
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      data5: [],
      data6: []
    })
    console.log('获取温湿度成功，返回res', response.data)
    // 设置echarts的数据格式
    response.data.forEach((item) => {
      data.value.trueTime.push(item.time.split('T').join(' '))
      data.value.showTime.push(item.time.slice(5, 16).split('T').join(' '))
      data.value.data1.push(item.tem[0])
      data.value.data2.push(item.tem[1])
      data.value.data3.push(item.tem[2])
      data.value.data4.push(item.hum[0])
      data.value.data5.push(item.hum[1])
      data.value.data6.push(item.hum[2])
    })
    equipTempData.value = data.value
  }

  return { equipSteamData, equipTempData, getEquipSteamData, getEquipTempData }
})
