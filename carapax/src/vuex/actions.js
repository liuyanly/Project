import util from '../util/util';

export default {
  async getMessageList({ commit }, url) {
    commit('getMessageList', await util.http.get(url));
  },

  //keyauth
  resetDomain({ commit }, val) {
      console.log(val);
    commit('resetDomain', val);
  },
  resetProject({ commit }, val) {
    commit('resetProject', val);
  },
  /*域信息*/
  async getDomainList({ commit }) {
    commit('getDomainList', await util.http.get('/keyauth/domain'));
  },
  /*用户信息*/
  async getUserList({ commit }) {
    commit('getUserList', await util.http.get('/keyauth/user'));
  },
  /*客户端信息*/
  async getConsumerList({ commit }) {
    commit('getConsumerList', await util.http.get('/keyauth/consumer'));
  },
  /*角色信息*/
  async getRoleList({ commit }){
    commit('getRoleList', await util.http.get('/keyauth/role'));
  },
  /*获取服务信息*/
  async getService ({commit}) {
    commit('getService', await util.http.get('/keyauth/catalog'));
  },


  //设备接入
  async getDeviceList ({ commit }, params) {
    let pageSize = params.pageSize;
    let pageNum = params.pageNum;
    commit('getDeviceList', await util.http.get(`/gateway/devices/?page_size=${pageSize}&page_number=${pageNum}`));
  },

  //设备类型
  async getDeviceTypeList ({ commit }) {

    commit('getDeviceTypeList', await util.http.get(`/gateway/devicetypes/`));
  },

  //设备标签
  async getDeviceTagList ({ commit }) {
    commit('getDeviceTagList', await util.http.get('/gateway/tags/'));
  },

  //proxy
  async getProxyList ({ commit }) {
    commit('getProxyList', await util.http.get('/gateway/proxy/'));
  },


  //文件管理
  async getScriptList({ commit }) {
    commit('getScriptList', await util.http.get('/valuka/scripts?status=1'));
  },
  async getScriptTagList ({ commit }) {
    commit('getScriptTagList', await util.http.get('/valuka/tags'));
  },

  //作业管理
  async getOnlineJobsList ({ commit }) {
    commit('getOnlineJobsList', await util.http.get('/valuka/online/jobs?status=INIT'));
  },
  async getOfflineJobsList ({commit}) {
    commit('getOfflineJobsList', await util.http.get('/valuka/jobs/offlinejob'))
  },
  async createOfflineJob({commit}, params) {
    console.log(params);
    commit('createOfflineJob', await util.http.create('/valuka/jobs/offlinejob/', params));
  },
  async stopOfflineJob({commit}, id) {
    commit('stopOfflineJob',  await util.http.delete('/valuka/jobs/offlinejob/'+id));
  },

  //调度中心
  async getJobList({ commit }) {
      commit('getJobList', await util.http.get('/dispatchCenter/ui/joblistdetails'));
  }
}
