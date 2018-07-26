// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueVideoPlayer from 'vue-video-player'
import App from './App'
import router from './router/index'
import util from './util/util'
// import './assets/scss/index.scss'
import 'video.js/dist/video-js.css'
Vue.use(VueVideoPlayer);

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
