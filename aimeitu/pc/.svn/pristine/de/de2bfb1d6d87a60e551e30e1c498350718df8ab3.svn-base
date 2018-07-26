/**
 * Author:lints
 * date: 2018-04-12
 * 对axios请求进行再次封装(封装方法有get,post,put,delete)
 * @param {Object} object 请求数据包含：url请求地址(必填)，params参数(选填)，headers请求头(选填)
 */
import axios from 'axios';


let ajax = {
  get: function (object) {
    return axios.get(
      object.url, {
        params: object.params || {},
        headers: object.headers || {}
      }
    )
  },
  post: function (object) {
    return axios.post(
      object.url, {
        params: object.params || {},
        headers: object.headers || {}
      }
    )
  },
  put: function (object) {
    return axios.put(
      object.url, {
        params: object.params || {},
        headers: object.headers || {}
      }
    )
  },
  del: function (object) {
    return axios.delete(
      object.url, {
        params: object.params || {},
        headers: object.headers || {}
      }
    )
  }
}
export default ajax;
