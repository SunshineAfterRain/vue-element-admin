import axios from 'axios'
import { Message } from 'element-ui'
import Router from './../router'

axios.defaults.timeout = 5000
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/api' : ''
axios.defaults.withCredentials = true

axios.interceptors.response.use(
  response => {
      return response
  },
  error => {
    console.log(error.response)
      if (error.response) {
          switch (error.response.status) {
              case 404:
                  // 404暂时跳转到登陆
                  Router.replace({
                      path: 'login'
                  })
          }
      }
      return Promise.reject(error.message)
  })

const request = {
  async get (url, params) {
    try {
      return await new Promise((resolve, reject) => {
         axios.get(url, params).then((res) => {
          resolve(res.data)
         }).catch((err) => {
           reject(err)
         })
      })
    } catch (e) {
        Message({
          message: e.message,
          type: 'error',
          duration: 5 * 1000
        })
    }
  },
  async post (url, params) {
    try {
      return await new Promise((resolve, reject) => {
         axios.post(url, params).then((res) => {
          resolve(res.data)
         }).catch((err) => {
           reject(err)
         })
      })
    } catch (e) {
        Message({
          message: e.message,
          type: 'error',
          duration: 5 * 1000
        })
    }
  }

}

export default request