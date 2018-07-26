// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import util from './util'
import chart from './chart.js'
import 'mint-ui/lib/style.css'
import { DatetimePicker, Popup, Picker, Loadmore, Spinner, InfiniteScroll} from 'mint-ui'
import Toast from 'mint-ui'
import MessageBox from 'mint-ui'

Vue.config.productionTip = false
//引入公用方法
Vue.use(util)
Vue.use(Toast)
Vue.use(MessageBox)
//图片查看插件
import wcView from 'wc-view';
import 'wc-view/style.css';
import vuePicturePreview from 'vue-picture-preview'
Vue.use(vuePicturePreview)
//引入axios
import axios from 'axios'
Vue.prototype.$ajax=axios;
axios.defaults.baseURL = 'http://api-hygjassistant.zpftech.com';    //医助端默认api
//引入Mint-UI
Vue.component(DatetimePicker.name, DatetimePicker, Popup.name, Popup, Picker.name, Picker, Loadmore.name, Loadmore, Spinner.name, Spinner, InfiniteScroll)
Vue.use(wcView)
Vue.use(chart)
//引入公共"样式
import './assets/css/common.scss'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
