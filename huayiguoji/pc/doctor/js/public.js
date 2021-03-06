/**
 * Created by Administrator on 2018/1/10.
 */
var userApi = "http://api-hygjuser.zpftech.com",
    doctorApi = "http://api-hygjdoctor.zpftech.com",
    assistantApi = "http://api-hygjassistant.zpftech.com",
    picApi = "http://api.assistant.hygj.local/file";

//获取localStorage中的用户信息
function getUserInfo() {
    if (localStorage.getItem('doctorInfo') != '' && localStorage.getItem('doctorInfo') != null) {
        var doctorInfo = JSON.parse(localStorage.getItem('doctorInfo'));
        return doctorInfo;
    }
}

//获取token
function getToken(el) {
    if (getUserInfo()) {
        axios.defaults.headers.common["Authorization"] = 'Bearer ' + getUserInfo().api_token
    } else {
        linkLogin(el)
    }
}

//登录
function linkLogin(el) {
    localStorage.removeItem('doctorInfo')
    localStorage.removeItem('doctorId')
    localStorage.removeItem('doctorName')
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

// 获取url参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

//日期截取
function getDate(str) {
    return str.length > 0 ? str.split(" ")[0] : console.error("字符串格式错误");
}

//时间不满10自动在前面加0
function p(s) {
    return s < 10 ? '0' + s : s;
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

//登录验证token
axios.interceptors.response.use(function(response) {
    // Do something with response data
    // console.log('--=======:', response);
    return response;
}, function(error) {
    //token认证失败自动返回登陆
    var _this = this;
    ELEMENT.MessageBox.confirm('用户认证已失效请重新登录!', '登录失效', {
        confirmButtonText: '确定',
        showCancelButton: false,
        type: 'error'
    }).then(function() {
        // linkLogin(_this)
        localStorage.setItem('doctorName', '');
        localStorage.setItem('doctorId', '');
        localStorage.setItem('doctorInfo', '');
        window.location.href = 'index.html'
    }).catch(function() {
        // linkLogin(_this)
        localStorage.setItem('doctorName', '');
        localStorage.setItem('doctorId', '');
        localStorage.setItem('doctorInfo', '');
        // window.location.reload();
        window.location.href = 'index.html'
    });
    return Promise.reject(error);
});
// url 传中文解码

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;

}
//聊天滚动条控制
function scrollBottom(_this) {
    _this.$nextTick(function() {
        //dom已更新
        $("#chat").scrollTop($("#chat")[0].scrollHeight);
    })
}