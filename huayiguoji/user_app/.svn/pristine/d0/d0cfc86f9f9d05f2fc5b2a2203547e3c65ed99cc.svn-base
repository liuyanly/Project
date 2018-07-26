import axios from 'axios'
import address from './assets/json/address3.json'

export default {
    install(Vue, options) {
        //挂载全局变量
        Vue.prototype.BaseSet = baseset;
        Vue.prototype.native = window.native;
        Vue.prototype.webim = webim;
        Vue.prototype.webim['listeners'] = imlistener;
        Vue.prototype.linecolor = linecolor;
        //设置动态计算rem
        window.rootFont = function() {
            var doc = document;
            var win = window;
            var docEl = doc.documentElement,
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                recalc = function() {
                    var clientWidth = doc.body.clientWidth;
                    /*clientWidth = $(window).width();*/
                    if (!clientWidth) return;
                    docEl.style.fontSize = 40 * (clientWidth / 750) + 'px';
                    if (docEl.style.fontSize) {
                        doc.getElementById('app').style.display = "block";
                    } else {
                        doc.getElementById('app').style.display = "block";
                    }
                };

            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
        }();
    }
}
let linecolor = ["#0554a3", "#8dfd05", "#fc8e13", "#684599", "#a93c97", "#de4598", "#eb1c22", "#f3c800", "#f4f92b", "#0da28e", "#f96e07", "#0e8bc3"]
    //全局变量与全局方法
let baseset = {
    //	baseurl:'http://api.lhzy.dev',
    baseurl: 'http://api.larawos.com',
    vippermissions: {
        tuwen: 1,
        dianhua: 2,
        shipin: 3
    },
    setInfo: function(key, value) {
        localStorage.setItem(key, value);
    },
    getInfo: function(key) {
        var result = localStorage.getItem(key);
        if (result == null || result == "" || result == undefined || result == "null") {
            result = localStorage.getItem(key);
        }
        return result;
    },
    //获取token
    getToken: function(el) {
        if (el.BaseSet.getInfo('userInfo')) {
            el.$ajax.defaults.headers.common["Authorization"] = 'Bearer ' + JSON.parse(el.BaseSet.getInfo('userInfo')).api_token
                //el.$ajax.defaults.headers.common["Authorization"] ='Bearer c04ef760f28fb98f3334d29f331947d2'
        } else {
            el.BaseSet.linkLogin(el)
        }
    },
    //token失效跳登录
    linkLogin: function(that) {
        that.$toast('请重新登录');
        localStorage.removeItem("userInfo");
        that.native.logout()
        setTimeout(function() {
            that.$router.push({
                name: 'Login'
            })
        }, 1500)
    },
    //获取城市
    getAddress(el) {
        let that = el
            // that.$ajax.get('/region?status=0')
            //     .then(function(res) {
            //         if (res.data.status == 200) {
            //             that.cityArr[0].values = res.data.data;
            //             that.cityArr[1].values = res.data.data[0].city
            //             that.cityArr[2].values = res.data.data[0].city[0].area
            //         } else {
            //             el.$toast(res.data.message)
            //         }
            //     })
            //     .catch(function(err) {
            //         that.$toast(err)
            //     })
        that.cityArr[0].values = address.data;
        that.cityArr[1].values = address.data[0].city
        that.cityArr[2].values = address.data[0].city[0].area

    },
    //城市赋值
    setCity: function(el, picker, values) {
        var that = el;
        if (values[0] != undefined && values[1] != undefined) { //这个判断类似于v-if的效果（可以不加，但是vue会报错）
            let index = that.cityArr[0].values.indexOf(values[0])
            picker.setSlotValues(1, that.cityArr[0].values[index].city) //Object.keys()会返回一个数组，当前省的数组
            let cityIndex = that.cityArr[0].values[index].city.indexOf(values[1])
            if (cityIndex != -1) {
                picker.setSlotValues(2, that.cityArr[0].values[index].city[cityIndex].area) //区/县数据就是一个数组
            } else if (cityIndex == -1) {
                picker.setSlotValues(2, that.cityArr[0].values[index].city[0].area) //区/县数据就是一个数组
            }
            if (values[2] == undefined) {
                values[2] = that.cityArr[0].values[index].city[cityIndex].area[0]
            }
            that.changeCity = values
        }
    },
    //选择城市并获取值
    setCityVal: function(el) {
        var that = el
        that.popupStatus = false;
        console.log(that.changeCity)
        if (that.changeCity[1] != undefined && that.changeCity[2] != undefined) {
            that.city = that.changeCity[0].title + ' ' + that.changeCity[1].title + ' ' + that.changeCity[2].title
            that.areaId = that.changeCity[2].id
            that.provinceId = that.changeCity[0].id
            that.cityId = that.changeCity[1].id
        }
    }
}

window.nativeWithinIOS = {
    shared: function(params, callback) {
        window.sharedCallback["callback"] = callback;
        window.parent.shared(JSON.stringify(params))
    },
    //上传头像
    photo: function(params, callback) {
        window.photoCallback["callback"] = callback;
        window.parent.photo(JSON.stringify(params))
    },
    //微信支付
    weChatPay: function(params, callback) {
        window.weChatPayCallback["callback"] = callback;
        window.parent.weChatPay(JSON.stringify(params))
    },
    //支付宝支付
    aliPay: function(params, callback) {

        window.aliPayCallback["callback"] = callback;
        window.parent.aliPay(JSON.stringify(params))
    },
    //语音搜索
    Speak: function(params) {
        window.parent.Speak(JSON.stringify(params))
    },
    SpeakEnd: function(params, callback) {

        window.speakCallback["callback"] = callback;
        window.parent.SpeakEnd(JSON.stringify(params))
    },
    gps: function(callback) {
        window.gpsCallback["callback"] = callback;
        var val = window.parent.gps();

    },
    im: function(params) {
        params.vueRouter = "";
        window.parent.im(JSON.stringify(params))
    },
    live: function(params) {
        window.parent.live(JSON.stringify(params))
    },
    living: function(params) {
        window.parent.living(JSON.stringify(params))
    },
    call: function(params) {
        window.parent.call(JSON.stringify(params))
    },
    webView: function(params) {
        window.parent.webView(JSON.stringify(params))
    },
    exit: function() {
        window.parent.exit()
    },
    register: function(params) {
        window.nativeWithinPC.register(params)
        window.parent.register(JSON.stringify(params))
    },
    logout: function() {
        window.parent.logout()
    },
    version: function() {
        window.parent.version()
    }
}
window.nativeWithinAndroid = {
    //图片上传
    photo: function(params, callback) {

        window.photoCallback["callback"] = callback;
        window.parent.user_app.photo(JSON.stringify(params))
    },
    //分享
    shared: function(params, callback) {

        window.sharedCallback["callback"] = callback;
        window.parent.user_app.shared(JSON.stringify(params))
    },
    //微信支付
    weChatPay: function(params, callback) {

        window.weChatPayCallback["callback"] = callback;
        window.parent.user_app.weChatPay(JSON.stringify(params))
    },
    //支付宝支付
    aliPay: function(params, callback) {

        window.aliPayCallback["callback"] = callback;
        window.parent.user_app.aliPay(JSON.stringify(params))
    },
    //语音搜索
    Speak: function(params) {
        window.parent.user_app.Speak(JSON.stringify(params))
    },
    //语音搜索-松手
    SpeakEnd: function(params, callback) {

        window.speakCallback["callback"] = callback;
        window.parent.user_app.SpeakEnd(JSON.stringify(params))
    },
    gps: function(callback) {

        window.gpsCallback["callback"] = callback;
        var val = window.parent.user_app.gps();
    },
    im: function(params) {
        params.vueRouter = "";
        window.parent.user_app.im(JSON.stringify(params))
    },
    live: function(params) {
        window.parent.user_app.live(JSON.stringify(params))
    },
    living: function(params) {
        window.parent.user_app.living(JSON.stringify(params))
    },
    call: function(params) {
        window.parent.user_app.call(JSON.stringify(params))
    },
    webView: function(params) {
        window.parent.user_app.webView(JSON.stringify(params))
    },
    exit: function() {
        window.parent.user_app.exit()
    },
    register: function(params) {
        window.nativeWithinPC.register(params)
        window.parent.user_app.register(JSON.stringify(params))
    },
    logout: function() {
        window.parent.user_app.logout()
    },
    version: function() {
        window.parent.user_app.version()
    }

}

window.nativeWithinPC = {
    photo: function(params, callback) {
        let uploadImageIds = [];
        let uploadImg = function(localIds, i) {
            console.log('单条图片上传：', localIds[i])
                //上传图片
            wx.uploadImage({
                localId: localIds[i], // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function(uploadRes) {
                    console.log('微信上传图片成功返回serverId：', uploadRes.serverId);
                    uploadImageIds.push(uploadRes.serverId);
                    if (i == localIds.length - 1) {
                        console.log('最终上传的serverIds：', uploadImageIds);
                        axios.post('http://api-hygjuser.zpftech.com/getfile', {
                                serverId: uploadImageIds
                            })
                            .then(res => {
                                console.log("serverIds上传成功：", res);
                                if (res.data.status == 200) {
                                    let tmpData = res.data.data;
                                    let tmpImgs = [];
                                    let tmpIds = [];
                                    for (let j in tmpData) {
                                        tmpIds.push(tmpData[j].id);
                                        tmpImgs.push(tmpData[j].url);
                                    }
                                    console.log('图片预览数据', {
                                        imgs: tmpImgs,
                                        id: tmpIds
                                    });
                                    console.log(callback);
                                    callback({
                                        imgs: tmpImgs.join(","),
                                        id: tmpIds.join(",")
                                    });
                                    console.log('执行callback')
                                }
                            })
                            //   .catch(err => {
                            //   console.log('serverIds上传失败：', err)
                            // })
                    }
                }
            });

        };

        console.log(params);
        params.openid = JSON.parse(localStorage.weChartPayInfo).openid,
            params.url = location.href.split('#')[0]
        axios.post('http://api-hygjuser.zpftech.com/getsignature', {
            openid: params.openid,
            url: params.url
        }).then(res => {
            let data = res.data.data;
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: 'wxd27ae67b907c5f4a', // 必填，公众号的唯一标识
                timestamp: data.timestamp.toString(), // 必填，生成签名的时间戳
                nonceStr: data.noncestr, // 必填，生成签名的随机串
                signature: data.signature, // 必填，签名
                jsApiList: ['chooseImage', 'uploadImage', 'downloadImage'] // 必填，需要使用的JS接口列表
            });
            // wx.ready(function () {
            //
            // })
            console.log('微信SDK签证配置信息：', res);
            //选择图片
            wx.chooseImage({
                count: params.num, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function(res) {
                    console.log('上传图片id：', res.localIds); //预览图片路径，返回数组
                    let localIds = res.localIds;
                    for (let i = 0; i < localIds.length; i++) {
                        uploadImg(localIds, i);
                    }


                    // if (params.num > 1) {
                    // for (let key in localIds) {
                    // //上传图片
                    // wx.uploadImage({
                    //   localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
                    //   isShowProgressTips: 1, // 默认为1，显示进度提示
                    //   success: function (uploadRes) {
                    //     console.log('微信上传图片成功返回serverId：', uploadRes);
                    //   }
                    // });
                    // uploadImageIds.push(localIds[key]);
                    // if (key >= localIds.length - 1) {
                    //所有图片上传完成，再上传图片的suploadImageIds给后端
                    // console.log('微信上传图片成功返回serverIds：', uploadImageIds)

                    // }

                    // }
                    // axios.post('http://api-hygjuser.zpftech.com/getfile', {
                    //   serverId: uploadRes.serverId
                    // })
                    //   .then(res => {
                    //     console.log("serverId上传成功：", res);
                    //   }).catch(err => {
                    //   console.log('serverId上传失败：', err)
                    // })

                    // //上传图片
                    // wx.uploadImage({
                    //   localId: res.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                    //   isShowProgressTips: 1, // 默认为1，显示进度提示
                    //   success: function (uploadRes) {
                    //     console.log('微信上传图片成功返回serverId：', uploadRes.serverId)
                    //     // axios.post('http://api-hygjuser.zpftech.com/getfile', {
                    //     //   serverId: [uploadRes.serverId]
                    //     // })
                    //     //   .then(res => {
                    //     //     console.log("serverId上传成功：", res);
                    //     //   }).catch(err => {
                    //     //   console.log('serverId上传失败：', err)
                    //     // })
                    //     //这里上传给服务器serverid
                    //     //下载图片
                    //     // wx.downloadImage({
                    //     //   serverId: uploadRes.serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
                    //     //   isShowProgressTips: 1, // 默认为1，显示进度提示
                    //     //   success: function (res) {
                    //     //     console.log('微信下载图片返回成功：', res.localId)
                    //     //     // var localId = res.localId; // 返回图片下载后的本地ID
                    //     //   }
                    //     // });
                    //   }
                    // });
                }
            });
            wx.error(function(res) {
                console.log('config错误返回：', res)
            })
        }).catch(err => {
            console.log('获取签证失败：', err);
        })
    },
    shared: function(params) {
        console.log(params)
    },
    weChatPay: function(params, callback) {
        let status = '';
        let data = typeof params.content == "string" ? JSON.parse(params.content) : params.content;
        console.log('微信支付传递的参数：', data)
        console.log('微信支付传递的参数：', typeof data)
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', data,
            function(res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                    status = '0';
                    console.log('微信支付成功：', res)
                } else {
                    status = '-2';
                    console.log('微信支付失败：', res)
                }
                callback({ status: status })
            }
        );
    },
    Speak: function(params) {
        console.log(params)
    },
    SpeakEnd: function(params) {
        console.log(params)
    },
    gps: function() {
        console.log("隐藏")
    },
    im: function(params) {
        params.vueRouter.push({
            name: 'im',
            params: {
                id: params.other.id,
                status: params.status
            }
        });
        //selToID = params.other.id;
        //friendHeadUrl = params.other.avatar;
    },
    live: function(params) {
        console.log("隐藏")
    },
    living: function(params) {
        console.log("隐藏")
    },
    call: function(params) {
        console.log("隐藏")
    },
    webView: function(params) {
        window.location.href = params.url;
    },
    exit: function() {
        window.parent.user_app.exit()
    },
    register: function(params) {

        //初始化时，其他对象，选填
        var isAccessFormalEnv = true; //是否访问正式环境
        var isLogOn = true; //是否开启sdk在控制台打印日志
        var options = {
            isAccessFormalEnv: isAccessFormalEnv, //是否访问正式环境，默认访问正式，选填
            isLogOn: isLogOn //是否开启控制台打印日志,默认开启，选填
        };
        var loginInfo = {
            sdkAppID: sdkAppID, //用户所属应用id,必填
            identifier: params.id, //当前用户ID,必须是否字符串类型，必填
            accountType: accountType, //用户所属应用帐号类型，必填
            userSig: params.imsign, //当前用户身份凭证，必须是字符串类型，必填
            identifierNick: params.realname, //当前用户昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id
            headurl: params.avatar //当前用户默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息
        };
        //监听事件
        var listeners = {
            onConnNotify: imlistener.onConnNotify, //监听连接状态回调变化事件,必填
            jsonpCallback: imlistener.jsonpCallback, //IE9(含)以下浏览器用到的jsonp回调函数，
            onMsgNotify: imlistener.onMsgNotify, //监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
            onKickedEventCall: imlistener.onKickedEventCall, //被其他登录实例踢下线
            onC2cEventNotifys: imlistener.onC2cEventNotifys, //监听C2C系统消息通道
            onAppliedDownloadUrl: imlistener.onAppliedDownloadUrl //申请文件/音频下载地址的回调
        };
        webim.login(
            loginInfo,
            listeners,
            options,
            function(resp) {
                loginInfo.identifierNick = resp.identifierNick; //设置当前用户昵称
                loginInfo.headurl = resp.headurl; //设置当前用户头像
            },
            function(err) {
                alert(err.ErrorInfo);
            }
        )
        return webim;
    },
    logout: function() {
        //window.parent.user_app.logout()
    },
    version: function() {
        console.log('1.0.1')
    }
}
window.back = function() {
    var status = 0;
    if (window.history.length > 0) {
        window.history.go(-1);
    } else {
        window.native.exit();
    }
}
window.photoCallback = function(data) {
    data = JSON.tryParse(data);
    window.photoCallback.callback(data);
}
window.sharedCallback = function(data) {
    data = JSON.tryParse(data);
    window.sharedCallback.callback(data);
}
window.weChatPayCallback = function(data) {
    data = JSON.tryParse(data);
    window.weChatPayCallback.callback(data);
}
window.aliPayCallback = function(data) {
    data = JSON.tryParse(data);
    window.aliPayCallback.callback(data);
}
window.gpsCallback = function(data) {
    data = JSON.tryParse(data);
    window.gpsCallback.callback(data);
}
window.speakCallback = function(data) {
    data = JSON.tryParse(data);
    window.speakCallback.callback(data);
}
window.liveListener = function(data) {
    data = JSON.tryParse(data);
    var userInfo = localStorage.userInfo;
    userInfo = JSON.tryParse(userInfo);
    axios({
        method: 'get',
        url: "/user/" + data.hostId,
        headers: {
            'Authorization': 'Bearer ' + userInfo.api_token
        }
    }).then(function(result) {
        if (result.status == 200) {
            var otherInfo = result.data.data;
            var livingData = {
                hostId: data.hostId,
                nickname: otherInfo.realname,
                avatar: otherInfo.translates.avatar_img,
                jobtitle: otherInfo.jobtitle,
                department: otherInfo.translates.department_title,
                hospital: otherInfo.translates.hospital_title,
                identity: 'doctor',
                callId: data.callId
            }
            native.living(livingData)
        }
    })
}
window.offline = function() {
    window.location.href = window.location.href.substr(0, window.location.href.indexOf("#") + 1);
}
window.native;

var userAgent = navigator.userAgent,
    isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1,
    isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    isWeChart = userAgent.indexOf('MicroMessenger') > -1;
if (isWeChart) {
    window.native = window.nativeWithinPC;
} else if (isiOS) {
    window.native = window.nativeWithinIOS;
} else if (isAndroid) {
    window.native = window.nativeWithinAndroid;
}
//window.native = window.nativeWithinPC;
JSON.tryParse = function(source) {
    if (typeof(source) === "string") {
        source = JSON.parse(source);
    }
    return source;
}


var accountMode = 0;
var sdkAppID = 1400082841;
var accountType = 25089;
var identifier = ""; //当前用户ID,必须是否字符串类型，必填
var userSig = ""; //当前用户身份凭证，必须是字符串类型，必填
var identifierNick = ""; //当前用户昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id
var headurl = ""; //当前用户默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息

//多终端登录被T

var imlistener = {
    onMsgNotify: function(newMsgList) {

    },
    onConnNotify: function(resp) {
        var info;
        switch (resp.ErrorCode) {
            case webim.CONNECTION_STATUS.ON:
                webim.Log.warn("建立连接成功: " + resp.ErrorInfo);
                break;
            case webim.CONNECTION_STATUS.OFF:
                info =
                    "连接已断开，无法收到新消息，请检查下你的网络是否正常: " +
                    resp.ErrorInfo;
                // alert(info);
                webim.Log.warn(info);
                break;
            case webim.CONNECTION_STATUS.RECONNECT:
                info = "连接状态恢复正常: " + resp.ErrorInfo;
                // alert(info);
                webim.Log.warn(info);
                break;
            default:
                webim.Log.error("未知连接状态: =" + resp.ErrorInfo);
                break;
        }
    },
    jsonpCallback: function(rspData) {
        webim.setJsonpLastRspData(rspData);
    },
    onKickedEventCall: function() {
        webim.Log.error("其他地方登录，被T了");
        document.getElementById("webim_demo").style.display = "none";
    },
    onC2cEventNotifys: {
        "96": this.onMultipleDeviceKickedOut
    },
    onMultipleDeviceKickedOut: function() {
        webim.Log.error("多终端登录，被T了");
        document.getElementById("webim_demo").style.display = "none";
    }
}