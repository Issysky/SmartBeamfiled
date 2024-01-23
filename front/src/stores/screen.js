// 大屏store
import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'

export const useScreenStore = defineStore('screen', () => {
  const url = '/news/'
  const getNewsData = async () => {
    const res = await axios.get(url, { headers: { Authorization: localStorage.getItem('token') } })
    return res.data
  }
  return { getNewsData }
})
