import axios from 'axios';

// 创建一个新的 Axios 实例
const request = axios.create();

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    console.log('About to make a request');
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

export default request;