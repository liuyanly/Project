<template>
	<div class="message-user">
		<headers headName="消息" NoBack='true'></headers>
		<div class="contentScollr">
			<ul class="list-ul">
				<li class="clear">
					<router-link :to="{ name: 'DoctorMsg', params: {id:3} }">
						<div class="left img-box">
							<img src="../assets/images/f1_icon1.png" />
							<span class="num" v-if="doctor.count>1&&doctor.count<100">{{doctor.count}}</span>
							<span class="num" v-if="doctor.count>100">99+</span>
						</div>
						<div class="left word">
							<p class="line1 clear">
								<span class="left">我的医生</span>
								<span class="right" id="getTime"></span>
							</p>
							<p class="line2" id="getText">
								暂无消息，敬请期待
							</p>
						</div>
					</router-link>
				</li>
				<li class="clear">
					<router-link :to="{ name: 'DoctorMsg', params: {id:2} }">
						<div class="left img-box">
							<img src="../assets/images/f1_icon2.png" />
							<span class="num" v-if="assistant.count>0&&assistant.count<100">{{assistant.count}}</span>
							<span class="num" v-if="assistant.count>100">99+</span>
						</div>
						<div class="left word">
							<p class="line1 clear">
								<span class="left">就诊消息</span>
								<span class="right" v-if="assistantContent!=null">{{assistantContent.created_at}}</span>
							</p>
							<p class="line2" v-if="assistantContent!=null">
								{{assistantContent.content}}
							</p>
							<p class="line2" v-else>
								暂无消息，敬请期待
							</p>
						</div>
					</router-link>
				</li>
				<!-- <li class="clear">
				<router-link :to="{ name: 'DoctorMsg', params: {id:2} }">
				<div class="left img-box">
					<img src="../assets/images/f1_icon3.png" />
					<span class="num" v-if="assistant.count>0&&assistant.count<100">{{assistant.count}}</span>
					<span class="num" v-if="assistant.count>100">99+</span>
				</div>
				<div class="left word">
					<p class="line1 clear">
						<span class="left">咨询问诊</span>
						<span class="right" v-if="assistantContent!=null">{{assistantContent.created_at.date.substring(0,19)}}</span>
					</p>
					<p class="line2" v-if="assistantContent!=null">
						{{assistantContent.content}}
					</p>
					<p class="line2" v-else>
						暂无消息，敬请期待
					</p>
				</div>
				</router-link>
			</li> -->
				<li class="clear">
					<router-link :to="{ name: 'DoctorMsg', params: {id:1} }">
						<div class="left img-box">
							<img src="../assets/images/f1_icon4.png" />
							<span class="num" v-if="system.count>0&&system.count<100">{{system.count}}</span>
							<span class="num" v-if="system.count>100">99+</span>
						</div>
						<div class="left word">
							<p class="line1 clear">
								<span class="left">系统消息</span>
								<span class="right" v-if="systemContent!=null">{{systemContent.created_at}}</span>
							</p>
							<p class="line2" v-if="systemContent!=null">
								{{systemContent.content}}
							</p>
							<p class="line2" v-else>
								暂无消息，敬请期待
							</p>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
		<footers FootOn='msg'></footers>
	</div>
</template>

<script>
//导入模板
import headers from "../components/Header.vue";
import footers from "../components/Footer.vue";
export default {
  data() {
    return {
      doctor: "",
      assistant: "",
      system: "",
      doctorContent: "",
      assistantContent: "",
      systemContent: "",
      doctorTime: "",
      assistantTime: "",
      systemTime: ""
    };
  },
  beforeCreate() {
    webim = this.webim;
    webim.listeners.onMsgNotify = onMsgNotify;
    selType = webim.SESSION_TYPE.C2C;
  },
  mounted() {
    this.BaseSet.getToken(this);
    this.getData();
  },
  methods: {
    getData() {
      var that = this;
      that.$ajax
        .get("/user/mynotifications")
        .then(function(res) {
          if (res.data.status == 200) {
            //that.doctor = res.data.data.doctor
            that.assistant = res.data.data.assistant;
            that.system = res.data.data.system;
            that.doctorContent = res.data.data.doctor.data;
            that.assistantContent = res.data.data.assistant.data;
            that.systemContent = res.data.data.system.data;
          }
        })
        .catch(function(err) {
          that.BaseSet.linkLogin(that);
        });
    }
  },
  components: { headers, footers }
  //请求数据接口
};
var webim;
var selType = "";
var selToID = "";
var selSess = "";
var friendHeadUrl = "";
function onMsgNotify(newMsgList) {
  //console.warn(newMsgList);
  var sess, newMsg;
  //获取所有聊天会话
  var sessMap = webim.MsgStore.sessMap();

  for (var j in newMsgList) {
    //遍历新消息
    newMsg = newMsgList[j];
    //if (newMsg.getSession().id() == selToID) {
    //为当前聊天对象的消息
    //在聊天窗体中新增一条消息
    //console.warn(newMsg);
    addMsg(newMsg);
    //}
    //msgList.push(newMsg.elems[0].content.text);
  }
}
//聊天页面增加一条消息
function addMsg(msg, prepend) {
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
  var innerStr;
  //解析消息

  //获取消息子类型
  //会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
  //会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
  var subType = msg.getSubType();

  switch (subType) {
    case webim.C2C_MSG_SUB_TYPE.COMMON: //普通消息
      innerStr = convertMsgtoHtml(msg, msg.getFromAccountNick());
      break;
  }

  //如果是发给自己的消息
  if (!isSelfSend) {
    console.log(innerStr);
    document.getElementById("getText").innerHTML = innerStr;
    document.getElementById("getTime").innerHTML = webim.Tool.formatTimeStamp(
      msg.getTime()
    );
  }
}
//把消息转换成Html
function convertMsgtoHtml(msg, realname) {
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
        html += realname + "：" + webim.Tool.formatText2Html(eleHtml);
        break;
			case webim.MSG_ELEMENT_TYPE.CUSTOM:
        var eleHtml = convertTextMsgToHtml(content);
        //转义，防XSS
        html += realname + "：" + webim.Tool.formatText2Html(eleHtml);
        break;
      case webim.MSG_ELEMENT_TYPE.IMAGE:
        if (i <= count - 2) {
          var customMsgElem = elems[i + 1]; //获取保存图片名称的自定义消息elem
          var imgName = customMsgElem.getContent().getData(); //业务可以自定义保存字段，demo中采用data字段保存图片文件名
          html += convertImageMsgToHtml(content, imgName);
          i++; //下标向后移一位
        } else {
          html += realname + "给您发了一条图片信息";
        }
        break;

      case webim.MSG_ELEMENT_TYPE.SOUND:
        html += realname + "给您发了一条语音信息";
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
</script>

<style lang="scss" scoped>
.message-user {
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .list-ul {
    background: #fff;
    li {
      padding: 1rem /* 20/20 */ 0.8rem /* 15/20 */;
      border-bottom: 1px solid #e5e5e5;
      .left {
        float: left;
      }
      .right {
        float: right;
      }
      .img-box {
        margin-right: 0.5rem /* 10/20 */;
        position: relative;
        > img {
          width: 2.5rem /* 50/20 */;
          height: 2.5rem /* 50/20 */;
        }
        .num {
          font-size: 0.5rem /* 10/20 */;
          color: #fff;
          position: absolute;
          width: 0.8rem /* 16/20 */;
          height: 0.8rem /* 16/20 */;
          text-align: center;
          border-radius: 50%;
          background: #ff2906;
          top: -0.1rem /* -2/20 */;
          right: 0;
        }
      }
      .word {
        width: calc(100% - 3.3rem);
        .line1 {
          line-height: 1.1rem /* 21/20 */;
          margin-bottom: 0.4rem /* 8/20 */;
          .left {
            font-size: 0.75rem;
            color: #444;
          }
          .right {
            font-size: 0.6rem /* 12/20 */;
            color: #999;
          }
        }
        .line2 {
          font-size: 0.7rem /* 13/20 */;
          color: #666;
          width: 14.1rem /* 282/20 */;
          line-height: 0.9rem /* 18/20 */;
          height: 0.9rem /* 18/20 */;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
