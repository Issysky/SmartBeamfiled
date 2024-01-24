// 大屏拌合站信息表格store
import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import axios from 'axios'

export const useFormMixStore = defineStore('form', () => {
  const tableData = reactive({
    label: [
      {
        label: '编号',
        prop: 'TaskId'
      },
      {
        label: '浇筑部位',
        prop: 'PouringPosition'
      },
      {
        label: '超标等级',
        prop: 'ExcessGrade'
      }
    ],
    data: [
      {
        TaskId: 'sjdhsfjhsf23890',
        PouringPosition: 'Tom',
        ExcessGrade: 0
      },
      {
        TaskId: 'sjdhsfjhsf238903',
        PouringPosition: 'Tom',
        ExcessGrade: 1
      },
      {
        TaskId: 'sjdhsfjhsf23890',
        PouringPosition: 'Tom',
        ExcessGrade: 0
      },
      {
        TaskId: 'sjdhsfjhsf23890',
        PouringPosition: 'Tom',
        ExcessGrade: 2
      }
    ],
    width: ['20%', '55%', '20%']
  })
  const url = '/mixStationData/'
  // 获取最新数据
  const getTableData = async () => {
    const res = await axios.get(url, {
      params: { type: 'latest' },
      headers: { Authorization: localStorage.getItem('token') }
    })
    tableData.data = res.data
  }
  return { tableData, getTableData }
})
