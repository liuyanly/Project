// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import util from "./util"  //公用的js
import chart from './chart.js'
//import './components/plugIn/aui-20170109-v2.1/css/aui.css'   //aui的css
import './components/plugIn/common.scss'   //公用的css
import './components/plugIn/style.css'   //公用的css
import Swiper from 'swiper'//引入swiper
import 'swiper/dist/css/swiper.min.css'
//引入axios
import axios from 'axios'
Vue.prototype.$ajax=axios;
axios.defaults.baseURL = 'http://api-hygjdoctor.zpftech.com';    //医助端默认api
//MintUI
import MintUI from 'mint-ui';
import { Popup, Picker, Loadmore, Spinner, InfiniteScroll} from 'mint-ui'
import Toast from 'mint-ui'
import MessageBox from 'mint-ui'
import 'mint-ui/lib/style.css';
//图片查看插件
import wcView from 'wc-view';
import 'wc-view/style.css';
import vuePicturePreview from 'vue-picture-preview'
Vue.use(vuePicturePreview)
Vue.use(wcView)
Vue.use(chart)
Vue.use(MintUI)
Vue.use(Toast)
Vue.use(MessageBox)
Vue.component(Popup.name, Popup, Picker.name, Picker, Loadmore.name, Loadmore, Spinner.name, Spinner, InfiniteScroll)

Vue.use(util)  //公用的js
//Vue.use(chart)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
