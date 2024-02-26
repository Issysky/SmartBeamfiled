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
    { name: '地点名称', width: '', key: 'name' },
    { name: '事件类型', width: '', key: 'event_type' },
    { name: '时间', width: '', key: 'upload_time' },
    { name: '处理状态', width: '', key: 'is_handled' },
    { name: '预览图', width: '', key: 'image_url' },
    { name: '详情', width: '', key: 'detail' }
  ]
  // 图表数据的key
  const securityDataKey = ['name', 'event_type', 'upload_time', 'is_handled', 'image_url', 'detail']

    // 导出excel的图表数据表头
    
})
