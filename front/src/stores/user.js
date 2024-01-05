import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  // 登陆后返回的用户数据
  const userData = ref({})

  // 定义登录url
  const loginUrl = 'https://api.ihmeng.cn/login/'

  // 点击登录 使用async/await返回一个promise对象
  const login = async(username,pwd) => {
    await axios
      .post(loginUrl, {
        username: username,
        password: pwd
      })
      .then((response) => {
        console.log("登录成功，返回res",response.data)
        userData.value = response.data // 使用 Object.assign 来修改 userData 的属性
        // 保存token到localStorage
        localStorage.setItem('token', userData.token)
      })
      .catch((error) => {
        console.error("登陆失败，error",error.response)
      })
  }

  return { userData,  login }
})
