import Vue from 'vue'
import MintUI from 'mint-ui'
import { Popup, Picker, Cell, Checklist, Radio, Loadmore, Spinner, InfiniteScroll} from 'mint-ui'
import Toast from 'mint-ui'
import MessageBox from 'mint-ui'
import Indicator from 'mint-ui';

import 'mint-ui/lib/style.css'

Vue.use(MintUI)
Vue.use(Toast)
Vue.use(MessageBox)
Vue.use(Indicator)
Vue.component(Popup.name, Popup, Picker.name, Picker, Cell.name, Cell, Checklist.name, Checklist, Radio.name, Radio, Loadmore.name, Loadmore, Spinner.name, Spinner, InfiniteScroll)
