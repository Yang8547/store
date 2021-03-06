/*
send ajax request
retrun promise object
1. improvment1: handle exception?
    create a new promise object
    if error happens, not return reject but error message
2. improvment2: return response.data
    when request resolve: resolve(response.data)
 */

import axios from 'axios'
import {message} from 'antd'
import jsonp from 'jsonp'

export default function ajax(url, data={}, type='GET') {

  return new Promise((resolve, reject) => {
    let promise
    // 1. 执行异步ajax请求
    if(type==='GET') { // 发GET请求
      promise = axios.get(url, { // 配置对象
        params: data // 指定请求参数
      })
    } else { // 发POST请求
      promise = axios.post(url, data)
    }
    // 2. 如果成功了, 调用resolve(value)
    promise.then(response => {
      resolve(response.data)
    // 3. 如果失败了, 不调用reject(reason), 而是提示异常信息
    }).catch(error => {
      // reject(error)
      message.error('Oops, something wrong: ' + error.message)
    })
  })


}

/*
jsonp get weather
 */
export const reqWeather = (city) => {

  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    // send jsonp request
    jsonp(url, {}, (err, data) => {
      // console.log('jsonp()', err, data)
      // success
      if (!err && data.status==='success') {
        // get data
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else {
        // fail
        message.error('get weather info fail!')
      }

    })
  })
}