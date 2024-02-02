// 设备管理 拌合站数据store
import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'

export const useEquipMixStore = defineStore('equipMix', () => {
  // 请求地址
  const url = '/mixStationData/'
  // 拌合站图表数据
  const mixData = reactive({
    data: []
  })

  const getMixData = async (params) => {
    const res = await axios.get(url, {
      params: {
        page_size: 2,
        page: 1,
        ordering: '-UploadTime'
      },
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    console.log(res.data)
    mixData.data = res.data.results
    console.log(mixData.data)
  }

  return {
    mixData,
    getMixData
  }
})
