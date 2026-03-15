import axios from 'axios'

// 创建axios实例
const request = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 5000
})

// 请求拦截器（和vue2一致）
request.interceptors.request.use(
  (config) => {
    // 后续加token，先占位
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data // 直接返回数据，简化后续调用
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request
