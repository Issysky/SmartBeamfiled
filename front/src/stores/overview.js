// 大屏项目信息组件的store
import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, reactive } from 'vue'

export const useOverviewStore = defineStore('overview', () => {
  const projectInfo = reactive({
    data: []
  })
  //   项目制梁计划
  const planInfo = reactive({
    data: []
  })
  //   项目信息
  const infoUrl = '/projectInfo/1/'
  //   项目制梁计划
  const planUrl = '/projectBeamInfo/'
  //   获取项目基础信息
  const getProjectInfo = async () => {
    const res = await axios.get(infoUrl, {
      headers: { Authorization: localStorage.getItem('token') }
    })
    let tempdata = []
    for (let i = 1; i <= 5; i++) {
      if (res.data[`info${i}_title`] && res.data[`info${i}_content`] && res.data[`info${i}_img`]) {
        tempdata.push({
          title: res.data[`info${i}_title`],
          content: res.data[`info${i}_content`],
          icon: res.data[`info${i}_img`]
        })
      }
    }
    projectInfo.data = tempdata
  }
  //   获取项目制梁计划
  const getProjectPlan = async () => {
    const res = await axios.get(planUrl, {
      headers: { Authorization: localStorage.getItem('token') }
    })
    let data = []
    data.push({
      title: '制梁任务',
      value: res.data.beamDataCount,
      icon: 'icon-incomplete'
    })
    data.push({
      title: '已制梁',
      value: res.data.beamDataUnfinishedCount,
      icon: 'icon-complete'
    })
    planInfo.data = data
  }
  return { projectInfo, getProjectInfo, getProjectPlan, planInfo }
})
