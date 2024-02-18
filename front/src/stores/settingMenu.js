import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'

export const useSettingMenuStore = defineStore('settingMenu', () => {
  // 是否展示设置菜单
  const currentPath = ref('')

  // 修改大屏概况信息的url
  const changeScreenInfoUrl = '/info/project/1/'

  // 大屏视频的地址
  const screenVideoUrl = ref('videosrc')

  // 获取大屏视频地址
  const getScreenVideoUrl =  (event) => {
    const file = event.target.files[0]
    if(file){
      screenVideoUrl.value = URL.createObjectURL(file)
    }
  }
  // 获取当前路由
  const getCurrentPath = (path) => {
    currentPath.value = path
  }

  // 修改大屏概况信息
  const changeScreenInfo = async (body) => {
    const res = await axios.patch(changeScreenInfoUrl, body,{headers:{'Authorization':localStorage.getItem('token')}})
  }

  return {
    currentPath,
    getCurrentPath,
    changeScreenInfo,
    screenVideoUrl,
    getScreenVideoUrl
  }
})
