//用户数据的store
import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import request from './axios'

export const useUserStore = defineStore('user', () => {
  // 登陆后返回的用户数据
  const userData = ref({
    name: 'admin',
    locked_menu_list: [],
    status:500,
  })
  // 二级路由
  let secRouter = ref({
    name: '1'
  })
  // 联网状态
  const online = localStorage.getItem('online') === 'online' ? true : false
  // 断网登出框的状态
  const logoutAlert = ref(false)
  // 定义登录url
  const loginUrl = '/login/'

  // 点击登录 使用async/await返回一个promise对象
  const login = async (username, pwd) => {
    if (online) {
      console.log('用户数据在线')
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
          localStorage.setItem('userData', JSON.stringify(response.data))
        })
        .catch((error) => {
          console.error('登陆失败，error', error.response)
        })
    } else {
      console.log('用户数据离线')
      userData.value = JSON.parse(localStorage.getItem('userData'))
    }
  }
  // 获取一级路由菜单 返回一个数组
  const getFirstRouter = () => {
    if (!online) {
      console.log('导航栏离线')
      let firstRouter = [
        {
          name: '数字大屏',
          router_name: 'screen',
          children: [
            {
              id: 1,
              router_name: 'screen_screen1',
              name: '数字大屏1',
              sort: '100',
              icon: null
            },
            {
              id: 32,
              router_name: 'screen_screen2',
              name: '隧道大屏1',
              sort: '101',
              icon: null
            }
          ]
        },
        {
          name: '安全',
          router_name: 'security',
          sort: 11,
          children: [
            {
              id: 26,
              router_name: 'alarm_chart',
              name: '报警图表',
              sort: 1101,
              icon: 'alarm_chart'
            },
            {
              id: 27,
              router_name: 'alarm_list',
              name: '报警图表',
              sort: 1102,
              icon: 'alarm_list'
            }
          ]
        }
      ]
      return firstRouter
    } else {
      let firstRouter = []
      for (let key in userData.value.menu) {
        firstRouter.push(userData.value.menu[key])
      }
      firstRouter.sort((a, b) => {
        return a.sort - b.sort
      })
      console.log(firstRouter)
      return firstRouter
    }
  }
  // 根据一级路由修改二级路由 二级路由通过store获取
  const changeSecondRouter = (router_name) => {
    for (let key in userData.value.menu) {
      if (userData.value.menu[key].router_name === router_name) {
        secRouter.value = userData.value.menu[key]
      }
    }
    secRouter.value.children?.sort((a, b) => {
      return a.sort - b.sort
    })
    secRouter.value.children?.forEach((item) => {
      if (item.hasOwnProperty('icon') && item.icon !== null) {
        item.icon = 'iconfont  icon-' + item.icon
      }
    })
  }

  const changeLogoutAlert = (state) => {
    logoutAlert.value = state
  }
  return {
    userData,
    login,
    getFirstRouter,
    changeSecondRouter,
    secRouter,
    changeLogoutAlert,
    logoutAlert
  }
})
