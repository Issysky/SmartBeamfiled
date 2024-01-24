// 大屏制梁数据表格store
import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import axios from 'axios'

export const useFormBeamStore = defineStore('beam', () => {
  const tableData = reactive({
    label: [
      {
        label: '梁号',
        prop: 'beam_name'
      },
      {
        label: '梁型',
        prop: 'beam_type'
      },
      {
        label: '生产开始时间',
        prop: 'bind_start_time'
      },
      {
        label: '养生开始时间',
        prop: 'steam_start_time'
      },
      {
        label: '养生结束时间',
        prop: 'steam_end_time'
      },
      {
        label: '生产结束时间',
        prop: 'grouting_end_time'
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
    width: ['15%', '10%', '17%', '17%', '17%', '17%']
  })
  const url = '/produced_beam/'
  // 获取最新数据
  const getTableData = async () => {
    const res = await axios.get(url, {
      params: { type: 'screen' },
      headers: { Authorization: localStorage.getItem('token') }
    })
    res.data.forEach((item) => {
      item.bind_start_time = handleTime(item.bind_start_time)
      item.steam_start_time = handleTime(item.steam_start_time)
      item.steam_end_time = handleTime(item.steam_end_time)
      item.grouting_end_time = handleTime(item.grouting_end_time)
    })
    tableData.data = res.data
  }

  // 处理时间
  const handleTime = (time) => {
    const hourtime = time.split('T')[1] 
    const fulltime = time.split('T').join(' ').substring(5, 19)
    return fulltime
  }
  return { tableData, getTableData }
})
