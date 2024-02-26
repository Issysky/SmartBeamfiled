// 有害气体store
import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'
import { exportExcel } from '@/utils/excelConfig.js'

export const useEquipGasStore = defineStore('equipGas', () => {
  // 请求地址
  const url = '/device/harmful_gas/'
  // 图表数据
  const gasData = reactive({
    data: []
  })
  // 总页数
  const totalPage = ref(0)
  // 图表的表头
  const gasColumns = [
    { name: '序号', width: '', key: 'name' },
    { name: '报警区域', width: '', key: 'event_type' },
    { name: '设备名称', width: '', key: 'upload_time' },
    { name: '传感器类别', width: '', key: 'is_handled' },
    { name: '当前数据', width: '', key: 'image_url' },
    { name: '报警事件', width: '', key: 'detail' },
    { name: '报警时间', width: '', key: 'detail' }
  ]
  // 图表数据的key
  const securityDataKey = ['name', 'event_type', 'upload_time', 'is_handled', 'image_url', 'detail']

  // 导出excel的图表数据表头

  // 获取区域数据
  const getGasData = async (name) => {
    const res = await axios.get(url, {
      params: {
        name: name,
        is_latest: true
      },
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    console.log(res, 'res.data')
    const data = []
    let (key in res.data[0]) {
      if(key === 'ch4'){
        data.push({
          name: '甲烷',
          value: res.data[0][key]
        })
      }else if(key === 'co'){
        data.push({
          name: '一氧化碳',
          value: res.data[0][key]
        })
    }else if(key === 'co2'){
        data.push({
          name: '二氧化碳',
          value: res.data[0][key]
        })
      }

  }
  }

  return {
    gasData,
    getGasData,
    gasColumns,
    totalPage
  }
})
