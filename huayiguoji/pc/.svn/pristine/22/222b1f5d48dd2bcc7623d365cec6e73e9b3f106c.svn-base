/**
 * Created by Administrator on 2018/1/10.
 */
var userApi = "http://api-hygjuser.zpftech.com",
    doctorApi = "http://api-hygjdoctor.zpftech.com",
    assistantApi = "http://api-hygjassistant.zpftech.com",
    picApi = "http://api-hygjuser.zpftech.com/file";

//获取localStorage中的用户信息
function getUserInfo() {
    if (localStorage.getItem('userInfo') != '' && localStorage.getItem('userInfo') != null) {
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        return userInfo;
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
    localStorage.setItem('userInfo', '')
    // location.href = "index.html"
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

var userInstance = axios.create({
        baseURL: 'http://api-hygjuser.zpftech.com'
    }),
    doctorInstance = axios.create({
        baseURL: 'http://api-hygjdoctor.zpftech.com'
    }),
    assistantInstance = axios.create({
        baseURL: 'http://api-hygjassistant.zpftech.com'
    });

//聊天滚动条控制
function scrollBottom(_this) {
    _this.$nextTick(function () {
        //dom已更新
        $("#chat").scrollTop($("#chat")[0].scrollHeight);
    })
}

//交易明细显示支付方式
var comPayWay = function (state) {
    // 0:支付宝 1:线下支付 2：微信 3：余额 4：个人vip 5:家庭vip 6：企业vip
    var way = '';
    switch (state) {
        case 0:
            way = '支付宝支付';
            break;
        case 1:
            way = '线下支付';
            break;
        case 2:
            way = '微信支付';
            break;
        case 3:
            way = '余额支付';
            break;
        case 4:
            way = '个人vip支付';
            break;
        case 5:
            way = '家庭vip支付';
            break;
        case 6:
            way = '企业vip支付';
            break;
    }
    return way
}
// 不满10自动前面加0
function addZero(num) {
    return num < 10 ? '0' + num : num;
}