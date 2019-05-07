import axios from 'axios'
import qs from 'qs'
axios.defaults.withCredentials = true // 允许请求携带cookie
// 创建axios实例
const Axios = axios.create({
  baseURL: 'http://39.100.78.143:8084/', // api的base_url
  timeout: 15000 // 请求超时时间
})
// 添加请求拦截器
Axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // console.log(config)
  return config
}, error => {
  // 对请求错误做些什么
  console.log(error)
  return Promise.reject(error)
})

// 添加响应拦截器
Axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  // console.log(response)
  return response.data
}, error => {
  return Promise.reject(error)
})
// 发起请求
export default (url, data, method = `GET`) => {
  data = data || ''
  if (method === `GET`) {
    return Axios.get(url, data.params ? data : {
      params: data
    })
  }
  if (method === 'delete' || method === 'DELETE') {
    return Axios.delete(url, data.params ? data : {
      params: data
    })
  }
  if (method === 'POST' || method === 'post') {
    return Axios.post(url, qs.stringify(data))
  }
  if (method === 'patch' || method === 'PATCH') {
    return Axios.patch(url, qs.stringify(data))
  }
  if (method === 'put' || method === 'PUT') {
    return Axios.put(url, qs.stringify(data))
  }
}
