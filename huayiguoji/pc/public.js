/**
 * Created by Administrator on 2018/1/10.
 */
var userApi = "http://api-hygjuser.zpftech.com",
    doctorApi = "http://api-hygjdoctor.zpftech.com",
    assistantApi = "http://api-hygjassistant.zpftech.com",
    picApi = "http://api.assistant.hygj.local/file";

//获取localStorage中的用户信息
function getUserInfo() {
    if(localStorage.getItem('assistantInfo')!=''&&localStorage.getItem('assistantInfo')!=null){
        var userInfo = JSON.parse(localStorage.getItem('assistantInfo'));
        return userInfo;
    }
}
// 获取url参数
function getparams(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

    var r = decodeURIComponent(window.location.search).substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
var userInstance = axios.create({
        baseURL: 'http://api-hygjuser.zpftech.com'
    }),
    doctorInstance = axios.create({
        baseURL: 'http://api-hygjdoctor.zpftech.com'
    }),
    assistantInstance = axios.create({
        baseURL: 'http://api-hygjassistant.zpftech.com'
    });