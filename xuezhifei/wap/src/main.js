// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios';
import router from './router/index'
import './config/index.js'
import util from './util/util'
import './assets/scss/index.scss'


Vue.prototype.$util = util;
Vue.prototype.$ajax = axios;
Vue.config.productionTip = false
// 请求拦截器
axios.interceptors.request.use(function (config) {
      return config;
    }, function (error) {
      return Promise.reject(error);
    }
);
// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
