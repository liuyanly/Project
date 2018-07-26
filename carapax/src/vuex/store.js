import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions.js';
import mutations from './mutations.js';

Vue.use(Vuex);

const state = {
    messageList: [],
    permission: {},
    changeProject: false,

	  userCenter: {
      	domainList: [],
      	roleList: [],
      	userList: [],
      	consumerList: [],
      	resourceList: [],
      	serviceList:[],
      	reset: {
        	resetDomain: '',
        	resetProject: ''
      	},
        status: {
      	  domainSign: false
        }
    },
    gateway: {
        deviceList: {},
        deviceTypeList: [],
        deviceTagList: [],
        proxyList: [],
    },
    valuka: {
        onlineJobsList: [],
        offlineJobsList: [],
        scriptList: [],
        scriptTagList: [],
    },
    dispatchCenter: {
        jobList: []
    }
};

const store = new Vuex.Store({
    state,
    actions,
    mutations,
});

export default store;
