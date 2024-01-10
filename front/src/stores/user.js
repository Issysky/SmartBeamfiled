import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import request from './axios'

export const useUserStore = defineStore('user', () => {
  // 登陆后返回的用户数据
  const userData = ref({
    name: 'admin',
  })

  const data = {
    status: 200,
    msg: '登陆成功',
    token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZV9pZCI6MSwiZXhwIjoxNzA0OTU3NTAwfQ.SrlCzcXUpCE1vQgRbTftwVfrMshsBv-7UbrpFbfSJxs',
    menu: {
      数字大屏: {
        name: '数字大屏',
        router_name: 'screen',
        sort: 1
      },
      设备数据: {
        name: '设备数据',
        router_name: 'equip',
        sort: 2,
        children: [
          {
            id: 2,
            router_name: 'equip-template',
            name: '模板',
            sort: 200
          },
          {
            id: 3,
            router_name: 'equip-steam',
            name: '蒸养棚',
            sort: 201
          },
          {
            id: 4,
            router_name: 'equip-monitor',
            name: '监控',
            sort: 202
          },
          {
            id: 5,
            router_name: 'equip-mix_station',
            name: '拌合站',
            sort: 203
          },
          {
            id: 6,
            router_name: 'equip-security',
            name: '安全',
            sort: 204
          },
          {
            id: 7,
            router_name: 'equip-pedstal',
            name: '设备-台座',
            sort: 205
          },
          {
            id: 8,
            router_name: 'equip-spreder',
            name: '布料机',
            sort: 206
          },
          {
            id: 9,
            router_name: 'equip-torpedo ',
            name: '鱼雷罐',
            sort: 207
          },
          {
            id: 10,
            router_name: 'equip-environment',
            name: '环境监测',
            sort: 208
          }
        ]
      }
    },
    permission: {
      steam_list: ['GET']
    }
  }
  let secRouter = ref({
    name:'1'
  })
  // 定义登录url
  const loginUrl = 'https://api.ihmeng.cn/login/'

  // 点击登录 使用async/await返回一个promise对象
  const login = async (username, pwd) => {
    await axios
      .post(loginUrl, {
        username: username,
        password: pwd
      })
      .then((response) => {
        console.log('登录成功，返回res', response.data)
        userData.value = response.data // 使用 Object.assign 来修改 userData 的属性
        // 保存token到localStorage
        localStorage.setItem('token', userData.token)
      })
      .catch((error) => {
        console.error('登陆失败，error', error.response)
      })
  }
  // 获取一级路由菜单 返回一个数组
  const getFirstRouter = () => {
    let firstRouter = []
    for (let key in data.menu) {
      firstRouter.push(data.menu[key])
    }
    firstRouter.sort((a, b) => {
      return a.sort - b.sort
    })
    return firstRouter
  }
  // 根据一级路由修改二级路由 二级路由通过store获取
  const changeSecondRouter = (router_name) => {
    if (!router_name) return 
    for (let key in data.menu) {
      if (data.menu[key].router_name === router_name) {
        secRouter.value = data.menu[key]
      }
    }
    secRouter.value.children.sort((a, b) => {
      return a.sort - b.sort
    })
  }
  return { userData, login, data, getFirstRouter, changeSecondRouter, secRouter }
})
