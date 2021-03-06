/**
 * Created by Administrator on 2018/1/10.
 */
var assistantApi = "http://api-hygjassistant.zpftech.com",
    userApi = "http://api-hygjuser.zpftech.com";

//获取localStorage中的用户信息
function getUserInfo() {
    if (localStorage.getItem('assistantInfo') != '' && localStorage.getItem('assistantInfo') != null) {
        var assistantInfo = JSON.parse(localStorage.getItem('assistantInfo'));
        return assistantInfo;
    }
}

//获取token
function getToken(el) {
    if (getUserInfo()) {
        axios.defaults.headers.common["Authorization"] = 'Bearer ' + getUserInfo().api_token
    } else {
        localStorage.assistantId = ""
        linkLogin(el)


    }
}

//登录
function linkLogin(el) {
    localStorage.removeItem('assistantInfo')
    localStorage.removeItem('assistantId')
    localStorage.removeItem('assistantName')
    location.href = "index.html"
        // if(!localStorage.getItem('userInfo')){
        //     el.loginType = 1
        // }
}

// 获取url参数
function getparams(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
}

// // 获取url参数
// function getUrlParam(name) {
//     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
//     var r = window.location.search.substr(1).match(reg); //匹配目标参数
//     if (r != null) return unescape(r[2]);
//     return null; //返回参数值
// }
var userInstance = axios.create({
        baseURL: 'http://api-hygjuser.zpftech.com'
    }),
    doctorInstance = axios.create({
        baseURL: 'http://api-hygjdoctor.zpftech.com'
    }),
    assistantInstance = axios.create({
        baseURL: 'http://api-hygjassistant.zpftech.com'
    });