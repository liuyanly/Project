import Vue from 'vue';
import util from '../util/util';

export default {
  changeProject(state) {
    state.changeProject = !state.changeProject;
  },
  getMessageList(state, response) {
    state.messageList = response.data.data;
  },
  //keyauth
  resetDomain(state, val) {
    state.userCenter.reset.resetDomain = val;
  },
  resetProject(state, val) {
    state.userCenter.reset.resetProject = val;
  },
  getDomainList(state, response) {
      state.userCenter.domainList = response.data;
  },
  getUserList(state, response) {
    state.userCenter.userList = response.data;
  },
  getConsumerList(state, response) {
    state.userCenter.consumerList = response.data;
  },
  getRoleList(state, response) {
    state.userCenter.roleList = response.data;
  },
  getService (state, response) {
    state.userCenter.serviceList = response.data.services;
  },



  //设备接入
  getDeviceList: (state, response) => {
    for(let device of response.data.data) {
      device.create_at = util.common.formatDateTime(device.create_at);
      device.online_time = util.common.formatDateTime(device.online_time);
      device.offline_time = util.common.formatDateTime(device.offline_time);
    }
    state.gateway.deviceList = response.data;
  },

  //设备类型
  getDeviceTypeList: (state, response) => {
    for(let type of response.data.data) {
      type.create_at = util.common.formatDateTime(type.create_at);
    }
    state.gateway.deviceTypeList = response.data.data;
  },

  //设备标签
  getDeviceTagList: (state, response) => {
    for(let tag of response.data.data) {
      tag.create_at = util.common.formatDateTime(tag.create_at);
      tag.update_at = util.common.formatDateTime(tag.update_at);
    }
    state.gateway.deviceTagList = response.data.data;
  },

  //proxy
  getProxyList: (state, response) => {
    for(let proxy of response.data.data) {
      proxy.create_at = util.common.formatDateTime(proxy.create_at);
      proxy.online_time = util.common.formatDateTime(proxy.online_time);
      proxy.offline_time = util.common.formatDateTime(proxy.offline_time);
    }
    state.gateway.proxyList = response.data.data;
  },


  //valuka
  //文件管理
  getScriptList: (state, response) => {
    console.log(response);
    state.valuka.scriptList = response.data;
  },
  getScriptTagList: (state, response) => {
    console.log(response);
    state.valuka.scriptTagList = response.data.data;
  },

  //作业管理
  getOnlineJobsList: (state, response) => {
    console.log(response);
    state.valuka.onlineJobsList = response.data.rows;
  },
  getOfflineJobsList: (state, response) => {
    console.log(response);
    state.valuka.offlineJobsList = response.data;
  },
  createOfflineJob: (state, response) => {
    console.log(response);
    state.valuka.offlineJobsList = response.data;
  },
    stopOfflineJob: (state, response) => {
      console.log(response);
    },


    //调度中心
    getJobList: (state, response) => {
        state.dispatchCenter.jobList = response.data;
    }

}

function getDelNum(data, nameId, id) {
    let editNum= 0;
    for(let item of data) {
        if(item[nameId] === id) {
            return editNum;
        }else{
            editNum++;
        }
    }
    return editNum;
}
