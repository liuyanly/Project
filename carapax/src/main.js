import Vue from 'vue';
import iView from 'iview';
import echarts from 'echarts';
import axios from 'axios';

import App from './App';

import router from './router/index';
import store from './vuex/store';
import util from './util/util';
import Highlight from './highlight';

import 'iview/dist/styles/iview.css';

Vue.prototype.$echarts = echarts;
Vue.prototype.$util = util;

Vue.use(iView);
Vue.use(Highlight);

Vue.config.productionTip = false;

axios.interceptors.request.use(
    config => {
        if (localStorage.token) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token
            config.headers['X-OAUTH-TOKEN'] = localStorage.token;
        }else if(!localStorage.token && router.history.current.path==='/authorize'){
            router.push({path: '/authorize'});
        } else {
            router.push({path: '/login'})
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                /*case 401:
                    // 这里写清除token的代码
                    router.push({path: '/login'});*/
                /*case 404:
                    router.replace({
                        path: '/404',
                        query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                    });*/
                /*case 500:
                    router.replace({
                        path: '/500',
                        query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                    })*/
            }
        }
        return Promise.reject(error.response.data)
    }
);

Vue.prototype.$http = axios;

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});


