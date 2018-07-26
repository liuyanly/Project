<template>
  <div class="im-dialog">
    <headers headName="图文咨询"></headers>
    <section class="doctorInfo">
      <div class="avator"><img :src="doctorAvator" alt=""></div>
      <div class="doctorIntro">
        <div class="doctorName">{{doctorName}}
          <span>(
            <i>{{doctorDept}}</i>
            <i>{{doctorJob}}</i>)</span>
        </div>
        <div class="hospitalName">{{hospitalName}}</div>
      </div>
    </section>
    <i class="warning">医生回复仅为建议，具体诊疗请前往医院进行。</i>
    <div class="history" id="history">
      <div v-for="item in msglist" class="msg">
        <div :class="item.side">
          <div :class="item.side+'avator avator'"><img :src="item.avator" alt=""></div>
          <div :class="item.side+'content'">
            <div class="content">{{item.msg}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="iminput">
      <div class="addImg">
        <button @click="addImg"><img src="../assets/images/e2_tianjia.png" alt=""><input type="file" name="singleFile" id="singleFile" style="display:none" @change="uploadPic()"></button>      </div>
      <div class="inputcontainer"><input type="text" v-model="msgtext"></div>
      <div class="send">
        <button @click="sendMsg">发送</button>
      </div>
    </div>
  </div>
</template>
<script>
import headers from "../components/Header.vue";
import "../assets/js/webim.min";
import "../assets/js/webim_no_emotion.min";
import "../assets/js/spark-md5";
export default {
  name: "im",
  data() {
    return {
      msglist: [],
      doctorAvator: "",
      msgtext: "",
      doctorName: "",
      doctorJob: "",
      doctorDept: "",
      hospitalName: "",
      toUser: {
        Id: 0,
        avator: ""
      }
    };
  },
  components: { headers },
  beforeCreate() {
    webim = this.webim;
    webim.listeners.onMsgNotify = onMsgNotify;
    selType = webim.SESSION_TYPE.C2C;
  },
  mounted() {
    this.BaseSet.getToken(this);
    var userInfo = JSON.parse(localStorage.userInfo);
    identifier = userInfo.id;
    identifierNick = userInfo.realname;
    headurl = userInfo.translates.avatar_img;
    this.getUserInfo();
  },
  methods: {
    uploadPic: function() {
      var uploadFiles = document.getElementById("singleFile");
      var file = uploadFiles.files[0];
      var businessType; //业务类型，1-发群图片，2-向好友发图片
      if (selType == webim.SESSION_TYPE.C2C) {
        //向好友发图片
        businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.C2C_MSG;
      } else if (selType == webim.SESSION_TYPE.GROUP) {
        //发群图片
        businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.GROUP_MSG;
      }
      //封装上传图片请求
      var opt = {
        file: file, //图片对象
        onProgressCallBack: onProgressCallBack, //上传图片进度条回调函数
        //'abortButton': document.getElementById('upd_abort'), //停止上传图片按钮
        To_Account: selToID, //接收者
        businessType: businessType //业务类型
      };
      //上传图片
      webim.uploadPic(
        opt,
        function(resp) {
          //上传成功发送图片
          sendPic(resp, file.name);
          $("#upload_pic_dialog").modal("hide");
        },
        function(err) {
          alert(err.ErrorInfo);
        }
      );
    },
    addImg: function() {
      var img = document.getElementById("singleFile");
      img.click();
    },
    getUserInfo: function() {
      var that = this;
      this.$ajax
        .get("/user/" + that.$route.params.id)
        .then(function(res) {
          if (res.data.status == 200) {
            var data = res.data.data;
            that.toUser = {
              Id: data.id,
              avator: data.translates.avatar_img
            };
            that.doctorName = data.realname;
            that.doctorJob = data.jobtitle;
            that.doctorDept = data.translates.department_title;
            that.hospitalName = data.translates.hospital_title;
            that.doctorAvator = data.translates.avatar_img;
            init(that.toUser);
            onSelSess(selType, selToID);
          } else if (res.data.status == 401) {
            that.BaseSet.linkLogin(that);
          } else {
            that.$toast(res.data.message);
          }
        })
        .catch(function(err) {
          that.$toast(err);
        });
    },
    sendMsg: function() {
      var that = this;
      // that.msglist.push({
      //   side: "right",
      //   msg: that.msgtext,
      //   avator: userInfo.translates.avatar_img
      // });
      onSendMsg(that.msgtext);
      that.msgtext = "";
    }
  }
};
var webim;
function onProgressCallBack(loadedSize, totalSize) {}
//发送消息(文本或者表情)
function init(toUser) {
  selToID = toUser.Id.toString();
  friendHeadUrl = toUser.avator;
}
var reqMsgCount = 15; //每次请求的历史消息(c2c获取群)条数，仅demo用得到
//im配置
//当前用户身份
var getPrePageC2CHistroyMsgInfoMap = {}; //保留下一次拉取好友历史消息的信息
var AdminAcount = "admin";
var selType = ""; //当前聊天类型
var selToID = ""; //当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
var selSess = null; //当前聊天会话对象
var recentSessMap = {}; //保存最近会话列表
var reqRecentSessCount = 50; //每次请求的最近会话条数，业务可以自定义
var infoMap = {}; //初始化时，可以先拉取我的好友和我的群组信息
var identifier = "";
var identifierNick = "";
//默认好友头像
var friendHeadUrl = ""; //仅demo使用，用于没有设置过头像的好友
var headurl = "";
//监听新消息事件
var msgList = [];
var dateStart = null;
var dateEnd = null;
//newMsgList 为新消息数组，结构为[Msg]
function onMsgNotify(newMsgList) {
  //console.warn(newMsgList);
  var sess, newMsg;
  //获取所有聊天会话
  var sessMap = webim.MsgStore.sessMap();

  for (var j in newMsgList) {
    //遍历新消息
    newMsg = newMsgList[j];

    if (!selToID) {
      //没有聊天对象
      selToID = newMsg.getSession().id();
      selType = newMsg.getSession().type();
      selSess = newMsg.getSession();
      var headUrl;
      if (selType == webim.SESSION_TYPE.C2C) {
        headUrl = friendHeadUrl;
      } else {
        headUrl = groupHeadUrl;
      }
      addSess(
        selType,
        selToID,
        newMsg.getSession().name(),
        headUrl,
        0,
        "sesslist"
      ); //新增一个对象
      setSelSessStyleOn(selToID);
    }
    if (newMsg.getSession().id() == selToID) {
      //为当前聊天对象的消息
      //在聊天窗体中新增一条消息
      //console.warn(newMsg);
      addMsg(newMsg);
    }
    msgList.push(newMsg.elems[0].content.text);
  }
  //消息已读上报，以及设置会话自动已读标记
  webim.setAutoRead(selSess, true, true);

  for (var i in sessMap) {
    sess = sessMap[i];
    if (selToID != sess.id()) {
      //更新其他聊天对象的未读消息数
      if (!dateStart) {
        dateStart = new Date();
      }
      updateSessDiv(sess.type(), sess.id(), sess.name(), sess.unread());
      console.debug(sess.id(), sess.unread());
      dateEnd = new Date();
    }
  }
}
function onAppliedDownloadUrl(data) {
  console.debug(data);
}
function updateSessDiv(sess_type, to_id, name, unread_msg_count) {
  var headUrl;
  if (sess_type == webim.SESSION_TYPE.C2C) {
    headUrl = friendHeadUrl;
  }
  addSess(sess_type, to_id, name, headUrl, unread_msg_count, "sesslist");
}
function addSess(
  sess_type,
  to_id,
  name,
  face_url,
  unread_msg_count,
  sesslist,
  addPositonType
) {
  var sessDivId = "sessDiv_" + to_id;
  var sessDiv = document.getElementById(sessDivId);
  if (sessDiv) {
    //先判断是否存在会话DIV，已经存在，则不需要增加
    return;
  }
  var sessList = document.getElementsByClassName(sesslist)[0];
  sessDiv = document.createElement("div");
  sessDiv.id = sessDivId;
  //如果当前选中的用户是最后一个用户
  sessDiv.className = "sessinfo";
  //添加单击用户头像事件
  sessDiv.onclick = function() {
    if (sessDiv.className == "sessinfo-sel") return;
    onSelSess(sess_type, to_id);
  };
  var faceImg = document.createElement("img");
  faceImg.id = "faceImg_" + to_id;
  faceImg.className = "face";
  faceImg.src = face_url;

  if (name.length > maxNameLen) {
    //名称过长，截取一部分
    name = name.substr(0, maxNameLen) + "...";
  }

  var delchat = document.createElement("div");
  delchat.className = "delChat";
  delchat.innerHTML = "删除会话";
  delchat.onclick = function(e) {
    var selSess = webim.MsgStore.sessByTypeId(sess_type, to_id);
    if (sess_type == "C2C") {
      sess_type = 1;
      webim.setAutoRead(selSess, true, false);
    } else {
      sess_type = 2;
      webim.groupMsgReaded({
        GroupId: to_id,
        MsgReadedSeq: selSess._impl.curMaxMsgSeq
      });
    }
    delChat(sess_type, to_id);
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  var nameDiv = document.createElement("div");
  nameDiv.id = "nameDiv_" + to_id;
  nameDiv.className = "name";
  nameDiv.innerHTML = name;
  var badgeDiv = document.createElement("div");
  badgeDiv.id = "badgeDiv_" + to_id;
  badgeDiv.className = "badge";
  if (unread_msg_count > 0) {
    if (unread_msg_count >= 100) {
      unread_msg_count = "99+";
    }
    badgeDiv.innerHTML = "<span>" + unread_msg_count + "</span>";
    badgeDiv.style.display = "block";
  }
  sessDiv.appendChild(faceImg);
  sessDiv.appendChild(nameDiv);
  sessDiv.appendChild(badgeDiv);
  sessDiv.appendChild(delchat);
  if (!addPositonType || addPositonType == "TAIL") {
    sessList.appendChild(sessDiv); //默认插入尾部
  } else if (addPositonType == "HEAD") {
    sessList.insertBefore(sessDiv); //插入头部
  } else {
    console.log(webim.Log.error("未知addPositonType" + addPositonType));
  }
}
//被新实例踢下线的回调处理
//初始化demo

var isAccessFormalEnv = true; //是否访问正式环境

var isLogOn = true; //是否开启sdk在控制台打印日志

//初始化时，其他对象，选填
var options = {
  isAccessFormalEnv: isAccessFormalEnv, //是否访问正式环境，默认访问正式，选填
  isLogOn: isLogOn //是否开启控制台打印日志,默认开启，选填
};
var msgflow = document.getElementById("history");
var bindScrollHistoryEvent = {
  init: function() {
    msgflow.onscroll = function() {
      if (msgflow.scrollTop == 0) {
        msgflow.scrollTop = 10;
        if (selType == webim.SESSION_TYPE.C2C) {
          getPrePageC2CHistoryMsgs();
        } else {
          getPrePageGroupHistoryMsgs();
        }
      }
    };
  },
  reset: function() {
    msgflow.onscroll = null;
  }
};
//向上翻页，获取更早的好友历史消息
var getPrePageC2CHistoryMsgs = function(cbOk, cbError) {
  if (selType == webim.SESSION_TYPE.GROUP) {
    alert("当前的聊天类型为群聊天，不能进行拉取好友历史消息操作");
    return;
  }
  var tempInfo = getPrePageC2CHistroyMsgInfoMap[selToID]; //获取下一次拉取的c2c消息时间和消息Key
  var lastMsgTime;
  var msgKey;
  if (tempInfo) {
    lastMsgTime = tempInfo.LastMsgTime;
    msgKey = tempInfo.MsgKey;
  } else {
    alert("获取下一次拉取的c2c消息时间和消息Key为空");
    return;
  }
  var options = {
    Peer_Account: selToID, //好友帐号
    MaxCnt: reqMsgCount, //拉取消息条数
    LastMsgTime: lastMsgTime, //最近的消息时间，即从这个时间点向前拉取历史消息
    MsgKey: msgKey
  };
  webim.getC2CHistoryMsgs(
    options,
    function(resp) {
      var complete = resp.Complete; //是否还有历史消息可以拉取，1-表示没有，0-表示有
      if (resp.MsgList.length == 0) {
        webim.Log.warn("没有历史消息了:data=" + JSON.stringify(options));
        return;
      }
      getPrePageC2CHistroyMsgInfoMap[selToID] = {
        //保留服务器返回的最近消息时间和消息Key,用于下次向前拉取历史消息
        LastMsgTime: resp.LastMsgTime,
        MsgKey: resp.MsgKey
      };
      if (cbOk) {
        cbOk(resp.MsgList);
      } else {
        getHistoryMsgCallback(resp.MsgList, true);
      }
    },
    cbError
  );
};
function onSendMsg(msgContent) {
  if (!selToID) {
    alert("你还没有选中好友或者群组，暂不能聊天");
    //$("#send_msg_text").val("");
    return;
  }
  //获取消息内容
  var msgLen = webim.Tool.getStrBytes(msgContent);

  if (msgContent.length < 1) {
    alert("发送的消息不能为空!");
    //$("#send_msg_text").val("");
    return;
  }
  var maxLen, errInfo;
  if (selType == webim.SESSION_TYPE.C2C) {
    maxLen = webim.MSG_MAX_LENGTH.C2C;
    errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
  } else {
    maxLen = webim.MSG_MAX_LENGTH.GROUP;
    errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
  }
  if (msgLen > maxLen) {
    alert(errInfo);
    return;
  }
  //发消息处理
  handleMsgSend(msgContent);
}

function handleMsgSend(msgContent) {
  if (!selSess) {
    var selSess = new webim.Session(
      selType,
      selToID,
      selToID,
      friendHeadUrl,
      Math.round(new Date().getTime() / 1000)
    );
  }
  var isSend = true; //是否为自己发送
  var seq = -1; //消息序列，-1表示sdk自动生成，用于去重
  var random = Math.round(Math.random() * 4294967296); //消息随机数，用于去重
  var msgTime = Math.round(new Date().getTime() / 1000); //消息时间戳
  var subType; //消息子类型
  if (selType == webim.SESSION_TYPE.C2C) {
    subType = webim.C2C_MSG_SUB_TYPE.COMMON;
  } else {
    //webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
    //webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
    //webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
    //webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
    subType = webim.GROUP_MSG_SUB_TYPE.COMMON;
  }

  var msg = new webim.Msg(
    selSess,
    isSend,
    seq,
    random,
    msgTime,
    identifier,
    subType,
    identifierNick
  );

  var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
  //解析文本和表情
  var expr = /\[[^[\]]{1,3}\]/gm;
  var emotions = msgContent.match(expr);
  if (!emotions || emotions.length < 1) {
    text_obj = new webim.Msg.Elem.Text(msgContent);
    msg.addText(text_obj);
  } else {
    for (var i = 0; i < emotions.length; i++) {
      tmsg = msgContent.substring(0, msgContent.indexOf(emotions[i]));
      if (tmsg) {
        text_obj = new webim.Msg.Elem.Text(tmsg);
        msg.addText(text_obj);
      }
      emotionIndex = webim.EmotionDataIndexs[emotions[i]];
      emotion = webim.Emotions[emotionIndex];

      if (emotion) {
        face_obj = new webim.Msg.Elem.Face(emotionIndex, emotions[i]);
        msg.addFace(face_obj);
      } else {
        text_obj = new webim.Msg.Elem.Text(emotions[i]);
        msg.addText(text_obj);
      }
      restMsgIndex = msgContent.indexOf(emotions[i]) + emotions[i].length;
      msgContent = msgContent.substring(restMsgIndex);
    }
    if (msgContent) {
      text_obj = new webim.Msg.Elem.Text(msgContent);
      msg.addText(text_obj);
    }
  }

  msg.PushInfo = {
    PushFlag: 0,
    Desc: "测试离线推送内容", //离线推送内容
    Ext: "测试离线推送透传内容" //离线推送透传内容
  };

  msg.PushInfoBoolean = true; //是否开启离线推送push同步
  msg.sending = 1;
  msg.originContent = msgContent;
  addMsg(msg);
  //$("#send_msg_text").val("");
  //turnoffFaces_box();

  webim.sendMsg(
    msg,
    function(resp) {
      //发送成功，把sending清理
      //$("#id_" + msg.random)
      //.find(".spinner")
      //.remove();
      webim.Tool.setCookie("tmpmsg_" + selToID, "", 0);
    },
    function(err) {
      //alert(err.ErrorInfo);
      //提示重发
      //showReSend(msg);
    }
  );
}

function showReSend(msg) {
  //resend a dom
  var resendBtn = $('<a href="javascript:;">重发</a>');
  //绑定重发事件
  resendBtn.click(function() {
    //删除当前的dom
    //$("#id_" + msg.random).remove();
    //发消息处理
    handleMsgSend(msg.originContent);
  });
  $("#id_" + msg.random)
    .find(".spinner")
    .empty()
    .append(resendBtn);
}

//聊天页面增加一条消息
function addMsg(msg, prepend) {
  msgflow = document.getElementById("history");
  var isSelfSend,
    fromAccount,
    fromAccountNick,
    fromAccountImage,
    sessType,
    subType;

  //获取会话类型，目前只支持群聊
  //webim.SESSION_TYPE.GROUP-群聊，
  //webim.SESSION_TYPE.C2C-私聊，
  sessType = msg.getSession().type();

  isSelfSend = msg.getIsSend(); //消息是否为自己发的

  fromAccount = msg.getFromAccount();
  if (!fromAccount) {
    return;
  }
  if (isSelfSend) {
    //如果是自己发的消息
    if (identifierNick) {
      fromAccountNick = identifierNick;
    } else {
      fromAccountNick = fromAccount;
    }
    //获取头像
    if (headurl) {
      fromAccountImage = headurl;
    } else {
      fromAccountImage = friendHeadUrl;
    }
  } else {
    //如果别人发的消息
    var key = webim.SESSION_TYPE.C2C + "_" + fromAccount;
    var info = infoMap[key];
    if (info && info.name) {
      fromAccountNick = info.name;
    } else if (msg.getFromAccountNick()) {
      fromAccountNick = msg.getFromAccountNick();
    } else {
      fromAccountNick = fromAccount;
    }
    //获取头像
    if (info && info.image) {
      fromAccountImage = info.image;
    } else if (msg.fromAccountHeadurl) {
      fromAccountImage = msg.fromAccountHeadurl;
    } else {
      fromAccountImage = friendHeadUrl;
    }
  }

  var str;
  var innerStr;
  //解析消息

  //获取消息子类型
  //会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
  //会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
  var subType = msg.getSubType();

  switch (subType) {
    case webim.C2C_MSG_SUB_TYPE.COMMON: //普通消息
      innerStr = convertMsgtoHtml(msg);
      break;
  }

var userInfo = JSON.parse(localStorage.userInfo);
  //如果是发给自己的消息
  if (!isSelfSend) {
    str = `<div class="msg">
        <div class="left">
          <div class="leftavator avator"><img src="${fromAccountImage}" alt=""></div>
          <div class="leftcontent">
            <div class="content">${innerStr}</div>
          </div>
        </div>
      </div>`;
  } else {
    str = `<div class="msg">
        <div class="right">
          <div class="rightavator avator"><img src="${
            userInfo.translates.avatar_img
          }" alt=""></div>
          <div class="rightcontent ">
            <div class="content">${innerStr}</div>
          </div>
        </div>
      </div>`;
  }
  var onemsg = parseDom(str);
  function parseDom(arg) {
    var objE = document.createElement("div");

    objE.innerHTML = arg;

    return objE.childNodes;
  }
  //昵称  消息时间

  //消息列表

  if (prepend) {
    //300ms后,等待图片加载完，滚动条自动滚动到底部
    msgflow.insertBefore(onemsg[0], msgflow.firstChild);
    if (msgflow.scrollTop == 0) {
      setTimeout(function() {
        msgflow.scrollTop = 0;
      }, 300);
    }
  } else {
    msgflow.appendChild(onemsg[0]);
    //300ms后,等待图片加载完，滚动条自动滚动到底部
    setTimeout(function() {
      msgflow.scrollTop = msgflow.scrollHeight;
    }, 300);
  }
}
//把消息转换成Html
function convertMsgtoHtml(msg) {
  var html = "",
    elems,
    elem,
    type,
    content;
  elems = msg.getElems(); //获取消息包含的元素数组
  var count = elems.length;
  for (var i = 0; i < count; i++) {
    elem = elems[i];
    type = elem.getType(); //获取元素类型
    content = elem.getContent(); //获取元素对象
    switch (type) {
      case webim.MSG_ELEMENT_TYPE.TEXT:
        var eleHtml = convertTextMsgToHtml(content);
        //转义，防XSS
        html += webim.Tool.formatText2Html(eleHtml);
        break;
      case webim.MSG_ELEMENT_TYPE.IMAGE:
        if (i <= count - 2) {
          var customMsgElem = elems[i + 1]; //获取保存图片名称的自定义消息elem
          var imgName = customMsgElem.getContent().getData(); //业务可以自定义保存字段，demo中采用data字段保存图片文件名
          html += convertImageMsgToHtml(content, imgName);
          i++; //下标向后移一位
        } else {
          html += convertImageMsgToHtml(content);
        }
        break;
      case webim.MSG_ELEMENT_TYPE.SOUND:
        html += convertSoundMsgToHtml(content);
        break;
      default:
        webim.Log.error("未知消息元素类型: elemType=" + type);
        break;
    }
  }
  return html;
}

//解析文本消息元素
function convertTextMsgToHtml(content) {
  return content.getText();
}
//解析图片消息元素
function convertImageMsgToHtml(content, imageName) {
  var smallImage = content.getImage(webim.IMAGE_TYPE.SMALL); //小图
  var bigImage = content.getImage(webim.IMAGE_TYPE.LARGE); //大图
  var oriImage = content.getImage(webim.IMAGE_TYPE.ORIGIN); //原图
  if (!bigImage) {
    bigImage = smallImage;
  }
  if (!oriImage) {
    oriImage = smallImage;
  }
  return (
    "<img name='" +
    imageName +
    "' src='" +
    smallImage.getUrl() +
    "#" +
    bigImage.getUrl() +
    "#" +
    oriImage.getUrl() +
    "' style='CURSOR: hand' id='" +
    content.getImageId() +
    "' bigImgUrl='" +
    bigImage.getUrl() +
    "' />"
  );
}
//解析语音消息元素
function convertSoundMsgToHtml(content) {
  var second = content.getSecond(); //获取语音时长
  var downUrl = content.getDownUrl();
  if (
    webim.BROWSER_INFO.type == "ie" &&
    parseInt(webim.BROWSER_INFO.ver) <= 8
  ) {
    return (
      "[这是一条语音消息]demo暂不支持ie8(含)以下浏览器播放语音,语音URL:" +
      downUrl
    );
  }
  return (
    '<audio id="uuid_' +
    content.uuid +
    '" src="' +
    downUrl +
    '" controls="controls" preload="none"></audio>'
  );
}
function onSelSess(sess_type, to_id) {
  if (selToID != null) {
    selToID = to_id;
    //bindScrollHistoryEvent.reset();

    var sessMap = webim.MsgStore.sessMap(); //获取到之前已经保存的消息
    var sessCS = webim.SESSION_TYPE.GROUP + selToID;
    if (sessMap && sessMap[sessCS]) {
      //判断之前是否保存过消息
      selType = webim.SESSION_TYPE.GROUP;
      bindScrollHistoryEvent.init();

      function compare(property) {
        return function(a, b) {
          var value1 = a[property];
          var value2 = b[property];
          return value1 - value2;
        };
      }
      var sessMapOld = sessMap[sessCS]._impl.msgs.sort(compare("time"));

      for (var i = 0; i < sessMapOld.length; i++) {
        addMsg(sessMapOld[i]); //显示已经保存的消息
      }
    } else {
      if (sess_type == webim.SESSION_TYPE.GROUP) {
        if (selType == webim.SESSION_TYPE.C2C) {
          selType = webim.SESSION_TYPE.GROUP;
        }
        selSess = null;
        webim.MsgStore.delSessByTypeId(selType, selToID);

        getLastGroupHistoryMsgs(
          function(msgList) {
            getHistoryMsgCallback(msgList);
            bindScrollHistoryEvent.init();
          },
          function(err) {
            alert(err.ErrorInfo);
          }
        );
      } else {
        if (selType == webim.SESSION_TYPE.GROUP) {
          selType = webim.SESSION_TYPE.C2C;
        }
        //如果是管理员账号，则为全员推送，没有历史消息
        if (selToID == AdminAcount) {
          var sess = webim.MsgStore.sessByTypeId(selType, selToID);
          if (sess && sess.msgs() && sess.msgs().length > 0) {
            getHistoryMsgCallback(sess.msgs());
          } else {
            getLastC2CHistoryMsgs(
              function(msgList) {
                getHistoryMsgCallback(msgList);
                bindScrollHistoryEvent.init();
              },
              function(err) {
                alert(err.ErrorInfo);
              }
            );
          }
          return;
        }

        //拉取漫游消息
        getLastC2CHistoryMsgs(
          function(msgList) {
            getHistoryMsgCallback(msgList);
            //绑定滚动操作
            bindScrollHistoryEvent.init();
          },
          function(err) {
            alert(err.ErrorInfo);
          }
        );
      }
    }
  }
}
//获取历史消息(c2c或者group)成功回调函数
//msgList 为消息数组，结构为[Msg]
function getHistoryMsgCallback(msgList, prepage) {
  var msg;
  prepage = prepage || false;

  //如果是加载前几页的消息，消息体需要prepend，所以先倒排一下
  if (prepage) {
    msgList.reverse();
  }

  for (var j in msgList) {
    //遍历新消息
    msg = msgList[j];
    if (msg.getSession().id() == selToID) {
      //为当前聊天对象的消息
      selSess = msg.getSession();
      //在聊天窗体中新增一条消息
      addMsg(msg, prepage);
    }
  }
  //消息已读上报，并将当前会话的消息设置成自动已读
  webim.setAutoRead(selSess, true, true);
}

//获取最新的c2c历史消息,用于切换好友聊天，重新拉取好友的聊天消息
var getLastC2CHistoryMsgs = function(cbOk, cbError) {
  if (selType == webim.SESSION_TYPE.GROUP) {
    alert("当前的聊天类型为群聊天，不能进行拉取好友历史消息操作");
    return;
  }
  if (!selToID || selToID == "@TIM#SYSTEM") {
    alert("当前的聊天id非法，selToID=" + selToID);
    return;
  }
  var lastMsgTime = 0; //第一次拉取好友历史消息时，必须传0
  var msgKey = "";
  var options = {
    Peer_Account: selToID, //好友帐号
    MaxCnt: 15, //拉取消息条数
    LastMsgTime: lastMsgTime, //最近的消息时间，即从这个时间点向前拉取历史消息
    MsgKey: msgKey
  };
  selSess = null;
  webim.MsgStore.delSessByTypeId(selType, selToID);

  webim.getC2CHistoryMsgs(
    options,
    function(resp) {
      var complete = resp.Complete; //是否还有历史消息可以拉取，1-表示没有，0-表示有

      if (resp.MsgList.length == 0) {
        webim.Log.warn("没有历史消息了:data=" + JSON.stringify(options));
        return;
      }
      getPrePageC2CHistroyMsgInfoMap[selToID] = {
        //保留服务器返回的最近消息时间和消息Key,用于下次向前拉取历史消息
        LastMsgTime: resp.LastMsgTime,
        MsgKey: resp.MsgKey
      };
      //清空聊天界面
      //document.getElementsByClassName("msgflow")[0].innerHTML = "";
      if (cbOk) cbOk(resp.MsgList);
    },
    cbError
  );
};
//发送图片消息
function sendPic(images, imgName) {
  if (!selToID) {
    alert("您还没有好友，暂不能聊天");
    return;
  }

  if (!selSess) {
    selSess = new webim.Session(
      selType,
      selToID,
      selToID,
      friendHeadUrl,
      Math.round(new Date().getTime() / 1000)
    );
  }
  var msg = new webim.Msg(
    selSess,
    true,
    -1,
    -1,
    -1,
    identifier,
    0,
    identifierNick
  );
  var images_obj = new webim.Msg.Elem.Images(images.File_UUID);
  for (var i in images.URL_INFO) {
    var img = images.URL_INFO[i];
    var newImg;
    var type;
    switch (img.PIC_TYPE) {
      case 1: //原图
        type = 1; //原图
        break;
      case 2: //小图（缩略图）
        type = 3; //小图
        break;
      case 4: //大图
        type = 2; //大图
        break;
    }
    newImg = new webim.Msg.Elem.Images.Image(
      type,
      img.PIC_Size,
      img.PIC_Width,
      img.PIC_Height,
      img.DownUrl
    );
    images_obj.addImage(newImg);
  }
  msg.addImage(images_obj);
  //if(imgName){
  //    var data=imgName;//通过自定义消息中的data字段保存图片名称
  //    var custom_obj = new webim.Msg.Elem.Custom(data, '', '');
  //    msg.addCustom(custom_obj);
  //}
  //调用发送图片消息接口
  webim.sendMsg(
    msg,
    function(resp) {
      if (selType == webim.SESSION_TYPE.C2C) {
        //私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
        addMsg(msg);
      }
    },
    function(err) {
      alert(err.ErrorInfo);
    }
  );
}
</script>
<style lang="scss">
.im-dialog,
.f {
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  overflow: hidden;
}
$inputHeight: 2rem;
.doctorInfo {
  background-color: white;
  height: 3.57rem;
  overflow: hidden;
  .avator {
    width: 3rem;
    margin-top: 0.7rem;
    float: left;
    text-align: right;
    margin-right: 0.3rem;

    img {
      border-radius: 1000px;
      height: 2.19rem;
      width: 2.19rem;
      object-fit: cover;
    }
  }
  .doctorIntro {
    margin-top: 0.7rem;
    margin-left: 3rem;
    .doctorName {
      font-weight: bold;
      font-size: 0.6rem;
      color: #333;
      span {
        font-weight: normal;
        color: #4cc6d8;
        i:first {
          padding-right: 0.7rem;
        }
      }
    }
    .hospitalName {
      color: #999;
      font-size: 0.6rem;
    }
  }
}
.warning {
  display: block;
  text-align: center;
  font-size: 0.6rem;
  line-height: 1.2rem;
  color: #999;
}
.history {
  margin-bottom: $inputHeight;
  overflow-y: auto;
  flex: 1;

  .msg {
    overflow: hidden;
  }
  .left,
  .right {
    margin-bottom: 0.71rem;
  }
  .left {
    text-align: left;
    .leftavator {
      float: left;
      width: 2.03rem;
      img {
        width: 1.43rem;
        height: 1.43rem;
        border-radius: 100px;
        object-fit: cover;
        margin-left: 0.6rem;
      }
    }
    .leftcontent {
      margin: 0px 2.03rem 0px 2.5rem;
      height: auto;
      .content {
        text-align: left;
        display: inline-block;
        font-size: 0.8rem;
        border-radius: 0.3rem;
        position: relative;
        background-color: white;
        padding: 7px;
        color: #333;
        &::after {
          position: absolute;
          content: "";
          width: 0px;
          height: 0px;
          border-width: 6px;
          border-color: transparent white transparent transparent;
          border-style: solid;
          left: -12px;
          top: 6px;
        }
      }
    }
  }
  .right {
    .rightavator {
      float: right;
      width: 2.03rem;
      img {
        margin-right: 0.6rem;
        width: 1.43rem;
        height: 1.43rem;
        border-radius: 100px;
        object-fit: cover;
      }
    }
    .rightcontent {
      margin: 0px 2.5rem 0px 2.03rem;
      height: auto;
      text-align: right;
      .content {
        text-align: left;
        display: inline-block;
        font-size: 0.8rem;
        border-radius: 0.3rem;
        position: relative;
        background: #4cc6d8;
        padding: 7px;
        color: white;
        &::after {
          position: absolute;
          content: "";
          width: 0px;
          height: 0px;
          border-width: 6px;
          border-color: transparent transparent transparent #4cc6d8;
          border-style: solid;
          right: -12px;
          top: 6px;
        }
      }
    }
  }
}
.iminput {
  height: $inputHeight;
  background-color: white;
  position: fixed;
  left: 0px;
  bottom: 0px;
  right: 0px;
  overflow: hidden;
  .inputcontainer {
    width: 13.3rem;
    float: left;
    padding: 0px 0.2rem;
    background: #eee;
    border-radius: 0.3rem;
    margin: 0.2rem 0rem 0.2rem 0.2rem;
    input {
      background: transparent;
      min-height: 1.6rem;
      border: 0px;
      width: 100%;
      padding: 0.1srem 0px;
      line-height: 1rem;
    }
  }
  .addImg {
    width: 2.4rem;
    float: left;
    text-align: center;
    button {
      width: 1.3rem;
      height: 1.3rem;
      background-color: transparent;
      border: 0px;
      img {
        width: 1.3rem;
        height: 1.3rem;
      }
    }
  }
  .send {
    width: 2.4rem;

    float: left;
    text-align: center;
    button {
      background-color: transparent;
      border: 0px;
      width: 100%;
      height: 2rem;
    }
  }
}
</style>
