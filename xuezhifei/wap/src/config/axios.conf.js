/**
 * Author: lints
 * date: 2018-04-13
 * @param {Object} config 发起请求拦截器
 * @param {Object} response 接收请求拦截器
 */

import Vue from 'vue';
import axios from 'axios';
import ajax from '../assets/js/axios.package';

// Vue.prototype.$ajax = axios;
Vue.prototype.$get = ajax.get;
Vue.prototype.$post = ajax.post;
Vue.prototype.$put = ajax.put;
Vue.prototype.$del = ajax.del;

// 请求拦截器
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});
// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});
