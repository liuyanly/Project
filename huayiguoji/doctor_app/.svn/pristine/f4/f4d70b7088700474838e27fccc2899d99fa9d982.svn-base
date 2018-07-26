<template>
	<div class="message-doctor">
		<headers headName="消息" NoBack='true'></headers>
		<div class="contentScollr">
			<ul class="list-ul">
				<li class="clear">
					<router-link :to="{ name: 'DoctorMsg', params: {id:3} }">
					<div class="left img-box">
						<img src="../assets/images/f1_icon1.png" />
						<span class="num" v-if="doctor.count>0&&doctor.count<100">{{doctor.count}}</span>
						<span class="num" v-if="doctor.count>100">99+</span>
					</div>
					<div class="left word">
						<p class="line1 clear">
							<span class="left">咨询消息</span>
							<span class="right" id="getTime"></span>
						</p>
						<p class="line2" id="getText">
							暂无消息，敬请期待
						</p>
					</div>
					</router-link>
				</li>
				<!-- <li class="clear">
					<router-link :to="{ name: 'DoctorMsg', params: {} }">
					<div class="left img-box">
						<img src="../assets/images/f1_icon2.png" /> -->
						<!-- <span class="num">22</span> -->
					<!-- </div>
					<div class="left word">
						<p class="line1 clear">
							<span class="left">服务消息</span>
							<span class="right">03月12日&emsp;12:00</span>
						</p>
						<p class="line2">
							暂无消息，敬请期待
						</p>
					</div>
					</router-link>
				</li> -->
				<li class="clear">
					<router-link :to="{ name: 'DoctorMsg', params: {id:2} }">
					<div class="left img-box">
						<img src="../assets/images/b1_icon2.png" />
						<span class="num" v-if="patient.count>0&&patient.count<100">{{patient.count}}</span>
						<span class="num" v-if="patient.count>100">99+</span>
					</div>
					<div class="left word">
						<p class="line1 clear">
							<span class="left">会员消息</span>
							<span class="right" v-if="patientContent!=null">{{patientContent.created_at}}</span>
						</p>
						<p class="line2" v-if="patientContent!=null">
							{{patientContent.content}}
						</p>
						<p class="line2" v-else>
							暂无消息，敬请期待
						</p>
					</div>
					</router-link>
				</li>
				<li class="clear">
					<router-link :to="{ name: 'DoctorMsg', params: {id:1} }">
					<div class="left img-box">
						<img src="../assets/images/b1_icon4.png" />
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
				<li class="clear">
					<router-link :to="{ name: 'PublishMsg', params: {patientId:0} }"><img src="../assets/images/b5_icon1.png" class="left publish-img" /><div class="left publish-btn">发布消息</div></router-link>
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
      patient: "",
      system: "",
      doctorContent: "",
      patientContent: "",
      systemContent: "",
      doctorTime: "",
      patientTime: "",
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
      this.$ajax
        .get("/user/mynotifications")
        .then(res => {
          var that = this;
          if (res.data.status == 200) {
            that.doctor = res.data.data.doctor;
            that.patient = res.data.data.patient;
            that.system = res.data.data.system;
            that.doctorContent = res.data.data.doctor.data;
            that.patientContent = res.data.data.patient.data;
            that.systemContent = res.data.data.system.data;
          }
        })
        .catch(err => {
          console.log(err);
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
    document.getElementById("getText").innerHTML = innerStr;
    document.getElementById("getTime").innerHTML = webim.Tool.formatTimeStamp(
      msg.getTime()
    );
  }
}
//把消息转换成Html
function convertMsgtoHtml(msg,realname) {
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
        html += realname+"："+webim.Tool.formatText2Html(eleHtml);
        break;
      case webim.MSG_ELEMENT_TYPE.IMAGE:
        if (i <= count - 2) {
          var customMsgElem = elems[i + 1]; //获取保存图片名称的自定义消息elem
          var imgName = customMsgElem.getContent().getData(); //业务可以自定义保存字段，demo中采用data字段保存图片文件名
          html += convertImageMsgToHtml(content, imgName);
          i++; //下标向后移一位
        } else {
          html += realname+"给您发了一条图片信息";
        }
        break;
      case webim.MSG_ELEMENT_TYPE.SOUND:
        html += realname+"给您发了一条语音信息";
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
.message-doctor {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .list-ul {
    background: #fff;
    .publish-btn {
      line-height: 2.5rem;
      font-size: 0.75rem;
      color: #444;
    }
    .publish-img {
      width: 1.5rem;
      height: 1.5rem;
      margin-top: 0.5rem;
      margin-right: 1rem;
      margin-left: 0.5rem;
    }
    li {
      padding: 1rem 0.8rem;
      border-bottom: 1px solid #e5e5e5;
      .left {
        float: left;
      }
      .right {
        float: right;
      }
      .img-box {
        margin-right: 0.5rem;
        position: relative;
        > img {
          width: 2.5rem;
          height: 2.5rem;
        }
        .num {
          font-size: 0.5rem;
          color: #fff;
          position: absolute;
          width: 0.8rem;
          height: 0.8rem;
          text-align: center;
          border-radius: 50%;
          background: #ff2906;
          top: -0.1rem;
          right: 0;
        }
      }
      .word {
        width: calc(100% - 3.3rem);
        .line1 {
          line-height: 1.1rem;
          margin-bottom: 0.4rem;
          .left {
            font-size: 0.75rem;
            color: #444;
          }
          .right {
            font-size: 0.6rem;
            color: #999;
          }
        }
        .line2 {
          font-size: 0.7rem;
          color: #666;
          width: 14.1rem;
          line-height: 0.9rem;
          height: 0.9rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
