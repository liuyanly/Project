<template>
  <div class="message">
    <headers :headName="title"></headers>
    <div class="contentScollr">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill='false' ref="loadmore">
        <p class="nothing" v-if="dataList == '暂无消息'">
          暂无消息
        </p>
        <ul class="list-ul" v-else>
          <li class="clear" v-for="(data,index) in dataList" @click="viewMsg(data.data.type,data.id,index)">
            <div class="left img-box">
              <img v-if="id==1" src="../assets/images/f1_icon4.png" />
              <img v-else :src="data.info.translates.avatar_img" />
            </div>
            <div class="left word">
              <p class="line1 clear">
                <span class="left" v-if="id!=1">{{data.info.realname}}
                  <span class="c1" v-if="data.type=='doctor'">({{data.department_title}})</span>
                </span>
                <span class="left" v-if="id==1">系统消息</span>
                <span class="right">{{data.created_at}}</span>
              </p>
              <p class="line2">
                {{data.data.content}}
              </p>
            </div>
          </li>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
//导入模板
import headers from "../components/Header.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      dataList: [],
      title: "就诊消息",
      allLoaded: false, //是否为最后一页
      page: 1,
      per_page: 7, //每页最大数
      last: false
    };
  },
  beforeCreate() {
    webim = this.webim;
  },
  mounted() {
    var that = this;
    if (this.id == 1) {
      this.title = "系统消息";
      this.getDataList();
    } else if (this.id == 2) {
      this.title = "就诊消息";
      this.getDataList();
    } else if (this.id == 3) {
      this.title = "我的医生";
      getRecentContactList();
      function getRecentContactList() {
        var options = {
          Count: reqRecentSessCount //最近的会话数
        };
        that.webim.getRecentContactList(
          options,
          function(resp) {
            var tempSess,
              tempSessMap = {}; //临时会话变量
            if (resp.SessionItem && resp.SessionItem.length > 0) {
              for (var i in resp.SessionItem) {
                var item = resp.SessionItem[i];
                var type = item.Type; //接口返回的会话类型
                var sessType,
                  typeZh,
                  sessionId,
                  sessionNick = "",
                  sessionImage = "",
                  senderId = "",
                  senderNick = "";
                if (type == webim.RECENT_CONTACT_TYPE.C2C) {
                  //私聊
                  typeZh = "私聊";
                  sessType = webim.SESSION_TYPE.C2C; //设置会话类型
                  sessionId = item.To_Account; //会话id，私聊时为好友ID或者系统账号（值为@TIM#SYSTEM，业务可以自己决定是否需要展示），注意：从To_Account获取,

                  if (sessionId == "@TIM#SYSTEM") {
                    //先过滤系统消息，，
                    webim.Log.warn("过滤好友系统消息,sessionId=" + sessionId);
                    continue;
                  }
                  var key = sessType + "_" + sessionId;
                  var c2cInfo = infoMap[key];
                  if (c2cInfo && c2cInfo.name) {
                    //从infoMap获取c2c昵称
                    sessionNick = c2cInfo.name; //会话昵称，私聊时为好友昵称，接口暂不支持返回，需要业务自己获取（前提是用户设置过自己的昵称，通过拉取好友资料接口（支持批量拉取）得到）
                  } else {
                    //没有找到或者没有设置过
                  }
                  if (c2cInfo && c2cInfo.image) {
                    //从infoMap获取c2c头像
                    sessionImage = c2cInfo.image; //会话头像，私聊时为好友头像，接口暂不支持返回，需要业务自己获取（前提是用户设置过自己的昵称，通过拉取好友资料接口（支持批量拉取）得到）
                  }
                  senderId = senderNick = ""; //私聊时，这些字段用不到，直接设置为空
                } else {
                  typeZh = "未知类型";
                  sessionId = item.ToAccount; //
                }

                if (!sessionId) {
                  //会话id为空
                  that.webim.Log.warn("会话id为空,sessionId=" + sessionId);
                  continue;
                }

                if (sessionId == "@TLS#NOT_FOUND") {
                  //会话id不存在，可能是已经被删除了
                  that.webim.Log.warn("会话id不存在,sessionId=" + sessionId);
                  continue;
                }

                if (sessionNick.length > maxNameLen) {
                  //帐号或昵称过长，截取一部分，出于demo需要，业务可以自己决定
                  sessionNick = sessionNick.substr(0, maxNameLen) + "...";
                }

                tempSess = tempSessMap[sessType + "_" + sessionId];
                if (!tempSess) {
                  //先判断是否存在（用于去重），不存在增加一个
                  tempSessMap[sessType + "_" + sessionId] = true;
                  that.$ajax.get("/user/" + sessionId).then(function(res) {
                    var _data = res.data.data;
                    that.dataList.push({
                      id: _data.id,
                      data: {
                        type: "doctor",
                        content: item.MsgShow
                      },
                      info: {
                        translates: {
                          avatar_img: _data.translates.avatar_img
                        },
                        realname: _data.realname,
                        jobtitle: _data.jobtitle,
                        department: _data.translates.department_title,
                        hospital: _data.translates.hospital_title
                      },
                      created_at: that.webim.Tool.formatTimeStamp(
                        item.MsgTimeStamp
                      )
                      // SessionType: sessType,//会话类型
                      // SessionTypeZh: typeZh,//会话类型中文
                      // SessionId: webim.Tool.formatText2Html(sessionId),//会话id
                      // SessionNick: webim.Tool.formatText2Html(sessionNick),//会话昵称
                      // SessionImage: sessionImage,//会话头像
                      // C2cAccount: webim.Tool.formatText2Html(senderId),//发送者id
                      // C2cNick: webim.Tool.formatText2Html(senderNick),//发送者昵称
                      // UnreadMsgCount: item.UnreadMsgCount,//未读消息数
                      // MsgSeq: item.MsgSeq,//消息seq
                      // MsgRandom: item.MsgRandom,//消息随机数
                      // MsgTimeStamp: webim.Tool.formatTimeStamp(item.MsgTimeStamp),//消息时间戳
                      // MsgShow: item.MsgShow//消息内容
                    });
                  });
                }
              }
            }
          },
          function(err) {
            alert(err.ErrorInfo);
          }
        );
      }
    }
    this.BaseSet.getToken(this);
  },
  methods: {
    loadBottom() {
      this.allLoaded = false;
      setTimeout(function() {
        if (!this.last) {
          this.getDataList();
        } else {
          this.allLoaded = true;
        }
        this.$refs.loadmore.onBottomLoaded();
      }, 500);
    },
    viewMsg(type, mid,i) {
      var that = this;
      if (type == "assistant" || type == "system") {
        this.$router.push({ name: "MsgDetail", params: { id: mid } });
      } else if (type == "doctor") {
        var otherInfo = that.dataList[i];
        var userInfo = JSON.parse(localStorage.userInfo);
        this.native.im({
          vueRouter: that.$router,
          status: 1,
          me: {
            id: userInfo.id,
            nickname: userInfo.realname,
            avatar: userInfo.translates.avatar_img,
            jobtitle: "",
            department: "",
            hospital: "",
            identity: "user"
          },
          other: {
            id: otherInfo.id,
            nickname: otherInfo.info.realname,
            avatar: otherInfo.info.translates.avatar_img,
            jobtitle: otherInfo.info.jobtitle,
            department: otherInfo.info.department,
            hospital: otherInfo.info.hospital,
            identity: "doctor"
          }
        });
        //this.$router.push({ name: "im", params: { id: mid } });
      } else if (type == 2) {
        this.$router.push({});
      } else {
      }
    },
    getDataList() {
      var that = this;
      that.$ajax
        .get(
          "/user/notificationslist/" +
            that.id +
            "?per_page=" +
            that.per_page +
            "&page=" +
            that.page
        )
        .then(function(res) {
          console.log(res.data);
          if (res.data.status == 200) {
            if (res.data.data.notifications.length) {
              that.page++;
              that.last = false;
              for (let i = 0; i < res.data.data.notifications.length; i++) {
                that.dataList.push(res.data.data.notifications[i]);
              }
            } else {
              that.last = true;
            }
          }
        })
        .catch(function(err) {
          that.BaseSet.linkLogin(that);
        });
    }
  },
  components: { headers }
  //请求数据接口
};
var webim;
var reqRecentSessCount = 50; //每次请求的最近会话条数，业务可以自定义
var options = {
  Count: reqRecentSessCount //最近的会话数
};
var infoMap = {};
var maxNameLen = 12; //我的好友或群组列表中名称显示最大长度，仅demo用得到
var totalCount = 200; //每次接口请求的条数，bootstrap table 分页时用到

//我的最近联系人
</script>

<style lang="scss">
.message {
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
          border-radius: 50%;
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
          .c1 {
            font-size: 0.7rem;
            color: #4cc6d8;
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
  .nothing {
    font-size: 0.7rem;
    color: #444;
    text-align: center;
    line-height: 2rem;
  }
}
</style>
