/**
 * Created by Administrator on 2018/1/10.
 */
var userApi = "http://api-hygjuser.zpftech.com ",
    doctorApi = "http://api-hygjdoctor.zpftech.com",
    assistantApi = "http://api-hygjassistant.zpftech.com",
    picApi = "http://api.assistant.hygj.local/file";

//获取localStorage中的用户信息
function getUserInfo() {
    var userInfo = JSON.parse(localStorage.assistantInfo);
    return userInfo;
}
// 获取url参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
var userInstance = axios.create({
        baseURL: 'http://api.user.hygj.local'
    }),
    doctorInstance = axios.create({
        baseURL: 'http://api.doctor.hygj.local'
    }),
    assistantInstance = axios.create({
        baseURL: 'http://api.assistant.hygj.local'
    });