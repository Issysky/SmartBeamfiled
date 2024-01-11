// 设备数据的store
import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useEquipStore = defineStore('equip', () => {
    // 蒸养棚数据
    let equipSteamData = ref([])
    // 获取蒸养数据的url
    const equipSreamUrl = '/steam/'

    // 获取蒸养数据
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

    return { equipSteamData ,getEquipSteamData }
})
