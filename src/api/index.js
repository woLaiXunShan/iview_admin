import axios from '@/axios'
export default {
  login: data => { // 登录接口
    return axios(`/login`, data, `post`)
  }
}
