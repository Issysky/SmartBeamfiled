//用户数据的store
import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import request from './axios'

export const useUserStore = defineStore('user', () => {
  // 登陆后返回的用户数据
  const userData = ref({
    name: 'admin'
  })
  // 二级路由
  let secRouter = ref({
    name: '1'
  })
  // 定义登录url
  // const loginUrl = 'https://api.ihmeng.cn/login/'
  const loginUrl = '/login/'

  // 点击登录 使用async/await返回一个promise对象
  const login = async (username, 　pwd) => {
    await axios
      .post(loginUrl, {
        username: username,
        password: pwd
      })
      .then((response) => {
        console.log('登录成功，返回res', response.data)
        userData.value = response.data // 使用 Object.assign 来修改 userData 的属性
        // 保存token到localStorage
        localStorage.setItem('token', 'Bearer ' + userData.value.token)
      })
      .catch((error) => {
        console.error('登陆失败，error', error.response)
      })
  }
  // 获取一级路由菜单 返回一个数组
  const getFirstRouter = () => {
    let firstRouter = []
    for (let key in userData.value.menu) {
      firstRouter.push(userData.value.menu[key])
    }
    firstRouter.sort((a, b) => {
      return a.sort - b.sort
    })
    return firstRouter
  }
  // 根据一级路由修改二级路由 二级路由通过store获取
  const changeSecondRouter = (router_name) => {
    if (!router_name) return
    for (let key in userData.value.menu) {
      if (userData.value.menu[key].router_name === router_name) {
        secRouter.value = userData.value.menu[key]
      }
    }
    secRouter.value.children.sort((a, b) => {
      return a.sort - b.sort
    })
    secRouter.value.children.forEach((item) => {
      if (item.hasOwnProperty('icon') && item.icon !== null) {
        item.icon = 'iconfont  icon-' + item.icon
      }
    })
  }
  return { userData, login, getFirstRouter, changeSecondRouter, secRouter }
})
