import axios from 'axios'
// import store from '../src/store'
import { defatutUrl } from './config'
import Qs from 'qs'

axios.defaults.baseURL = `${defatutUrl}`
// TODO: 跨域 true
axios.defaults.withCredentials = false
axios.defaults.timeout = 100000
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'; //配置请求头
axios.defaults.headers.get['Content-Type'] = 'application/json'; //配置请求头
axios.defaults.headers.delete['Content-Type'] = 'application/json'; //配置请求头
axios.defaults.headers.put['Content-Type'] = 'application/json'; //配置请求头

const instance = {}

;['get', 'post', 'put', 'delete'].forEach((key) => {
  instance[key] = function (...args) {
    // console.log([key], axios.defaults.baseURL,...args)
    return axios[key](...args)
      .then((res) => {
        // console.log('res.data------ ',res.data)
        if (res.data.status === '0' && res.data.msg) {
          // store.commit('session/GETSESSIONINFO', res.data.session)
        }
        // 全局信息提示
        if (res.data.type && res.data.msg) {
          // store.commit('message/SHOWMSG', res.data)
        }
        return res.data
      })
      .catch((err) => {
        console.log('err----- ',err)
      })
  }
})

const api = {
  user: {
    login: data => instance.post(`/user/login`, data), //登陆
    verificationcode: data => instance.post(`/user/verificationcode`, data), //获取验证码
    createUser: data => instance.post(`/user/createUser`, data), //注册
    forverificationcode: data => instance.post(`/user/forverificationcode`, data), //重新验证
    updateUser: data => instance.post(`/user/updateUser`, data), //注册
    loginInfo: data => instance.get(`/user/userInfo`, {params:data}) //获取个人信息
  },
  dynamic:{
    createdynamic: data => instance.post(`/user/createDynamic`, data), //注册
    dynamiclist: data => instance.get(`/user/dynamicList`, data), //列表
  },
  Img:{
    uploadImg: data => instance.post(`/uploadImg`,data),//上传图片
  },
  video:{
    uploadVideo: data => instance.post(`/uploadVideo`,data),//上传视频
  }
}

export default api
