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
  // 总页数
  const totalPage = ref(0)
  // 图表的表头
  const mixColumns = [
    { name: '机器编号', width: '', key: 'MixingStationCode' },
    { name: '任务工单号', width: '', key: 'TaskId' },
    { name: '浇筑部位', width: '', key: 'PouringPosition' },
    { name: '强度等级', width: '', key: 'StrengthGrade' },
    { name: '实际方量', width: '', key: 'QuanityActual' },
    { name: '超标等级', width: '', key: 'ExcessGrade' },
    { name: '出料时间', width: '', key: 'DischargeTime' },
    { name: '详情', width: '', key: 'Detail' }
  ]
  // 图表数据的key
  const mixDataKey = [
    'MixingStationCode',
    'TaskId',
    'PouringPosition',
    'StrengthGrade',
    'QuanityActual',
    'ExcessGrade',
    'DischargeTime',
    'Detail'
  ]

  const getMixData = async (params) => {
    const res = await axios.get(url, {
      params: params,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })

    totalPage.value = res.data.total_pages
    console.log(res, 'res')
    mixData.data = res.data.results.map((item, index) => {
      // 处理时间格式,加静态详情字段
      return {
        ...item,
        DischargeTime: item.DischargeTime?.split('T')[0] + ' ' + item.DischargeTime?.split('T')[1],
        Detail: ''
      }
    })
    console.log(mixData.data, 'mixData.data')
  }

  return {
    mixData,
    getMixData,
    mixColumns,
    mixDataKey,
    totalPage
  }
})
