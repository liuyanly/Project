/**
 * author: lints
 * date: 2018-04-17
 * @param {Object} obj 用戶数据对象
 * IM接收消息
 */
function ReceiveMsg(listeners,self) {
    this.msg = []; //发送数据数组
    this.sdkAppID = 1400082841; //用户所属应用id,必填
    this.accountType = 25089; //用户所属应用帐号类型，必填
    // this.loginInfo = {
    //     'sdkAppID': this.sdkAppID, //用户所属应用id,必填
    //     'identifier': customData.id, //当前用户ID,必须是否字符串类型，必填
    //     'identifier': customData.id, //当前用户ID,必须是否字符串类型，必填
    //     'accountType': this.accountType, //用户所属应用帐号类型，必填
    //     'userSig': customData.im_sig, //当前用户身份凭证，必须是字符串类型，必填
    //     'identifierNick': customData.nickname, //当前用户昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id
    //     'headurl': customData.translates.avatar_img //当前用户默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息
    // };
    this.loginInfo = {
        'sdkAppID': this.sdkAppID, //用户所属应用id,必填
        'identifier': self.id, //当前用户ID,必须是否字符串类型，必填
        'accountType': this.accountType, //用户所属应用帐号类型，必填
        'userSig': self.userSig, //当前用户身份凭证，必须是字符串类型，必填
        'identifierNick': self.identifierNick, //当前用户昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id
        'headurl': '' //当前用户默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息
    };
    this.listeners = listeners; //接收消息监听事件对象,详情看IM api
    this.options = {
        isAccessFormalEnv: true, //是否访问正式环境下的后台接口，True-访问正式，False-访问测试环境默认访问正式环境接口，选填
        isLogOn: false //	是否开启控制台打印日志,True-开启;False-关闭，默认开启，选填
    };
}
ReceiveMsg.prototype.login = function () {
    // 登录
    webim.login(this.loginInfo, this.listeners, this.options, function (resp) {
        console.info('%clogin success', 'color:green;font-size:18px')
    }, function (err) {
        console.info('%clogin error', 'color:red;font-size:18px')
    });
};