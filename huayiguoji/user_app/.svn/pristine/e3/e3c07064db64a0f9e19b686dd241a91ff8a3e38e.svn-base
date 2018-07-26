<template>
  <div class="huimei-list">
    <headers headName="智能问诊"></headers>
    <div class="contentScollr">
      <div class="content">
        <ul>
          <!-- <li v-for="data in dataList" @click="viewDetail(data.id)">
                    <div class="status">{{data.title}}</div>
                    <div class="name">{{data.translates.hospital_title}}</div>
                    <div class="tag">{{data.translates.department_title}}</div>
                    <div class="time">{{data.checked_at.substring(0,10)}}</div>
                </li> -->
          <li v-for='data in list' @click="goResult(data.sheet_id)">
            <div class="time">
              <span>{{data.created_at}}</span>问诊结果</div>
          </li>
        </ul>
      </div>
      
    </div>
    <div class="foot">
        <p @click="goHuimei">
          智能问诊
        </p>
    </div>
  </div>
</template>
<script>
import headers from "../components/Header.vue";
export default {
  data() {
    return {
      scrollMode: "auto",
      list: []
    };
  },
  mounted() {
    this.BaseSet.getToken(this);
    this.getHuimeiList();
  },
  methods: {
    getHuimeiList: function() {
      var that = this;
      this.$ajax
        .get("/answersheet")
        .then(function(res) {
          if (res.data.status == 200) {
            that.list = res.data.data;
          } else if (res.data.status == 401) {
            that.BaseSet.linkLogin(that);
          }
        })
        .catch(function(err) {
          that.BaseSet.linkLogin(that);
        });
    },
    goHuimei: function() {
      var userInfo = JSON.parse(localStorage.userInfo);
      //this.native.webView("http://amc.huimeionline.com?key=2B095E15BF2EC9DC98C44737C02621E3=")
      var src =
        "http://amc.huimeionline.com/?key=2B095E15BF2EC9DC98C44737C02621E3" +
        encodeURI("&askUrl=http://hygjuser.zpftech.com/huimeiresult.html") +
        encodeURI("&userName=" + userInfo.realname) +
        encodeURI("&userPhone=" + userInfo.phone_no) +
        encodeURI("&userGender=" + (userInfo.sex == "1" ? "88" : "89"));
      this.native.webView({ url: src });
    },
    goResult: function(id) {
      //this.native.webView("http://amc.huimeionline.com?key=2B095E15BF2EC9DC98C44737C02621E3=")
      var src =
        "http://amc.huimeionline.com/?key=2B095E15BF2EC9DC98C44737C02621E3/#/conclusion/" +
        encodeURI(id);
      this.native.webView({ url: src });
    }
  },
  components: { headers }
};
</script>

<style lang="scss" scoped>
.huimei-list {
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .head_box {
    width: 100%;
    height: 2.05rem;
    overflow: hidden;
    position: relative;
    left: 0;
    z-index: 1000;
    background-color: #fff;
    li {
      width: 33.33%;
      float: left;
      height: 0.9rem;
      box-sizing: border-box;
      border-right: #e5e5e5 1px solid;
      text-align: center;
      margin-top: 0.55rem;
      font-size: 0;
      p {
        float: left;
        width: 5.6rem;
        font-size: 0.7rem;
        color: #666;
        line-height: 0.9rem;
        height: 0.9rem;
        text-align: center;
        padding: 0 0.3rem;
        > img {
          width: 0.5rem;
          height: 0.3rem;
          vertical-align: middle;
          margin-left: 0.2rem;
        }
      }
      .city,
      .hospital {
        border-right: 1px solid #dcdcdc;
      }
      .hospital {
        span {
          max-width: 4.6rem;
          height: 0.9rem;
          display: inline-block;
          overflow: hidden;
        }
        img {
          margin-top: -0.3rem;
        }
      }
    }
    li:last-child {
      border: none;
    }
  }
  .content {
    width: 100%;
    overflow: hidden;
    margin-top: 0.5rem;
    background-color: #fff;
    li {
      width: 100%;
      height: 4.5rem;
      border-bottom: #e5e5e5 1px solid;
      position: relative;
      box-sizing: border-box;
      padding: 0 0.75rem;
      overflow: hidden;
      .status {
        margin-top: 0.55rem;
        color: #333333;
        font-size: 0.7rem;
      }
      .name {
        margin-top: 0.3rem;
        color: #666666;
        font-size: 0.7rem;
      }
      .tag {
        margin-top: 0.3rem;
        color: #666666;
        font-size: 0.7rem;
      }
      .time {
        position: absolute;
        top: 1.9rem;
        left: 0.75rem;
        color: #999999;
        font-size: 0.7rem;
      }
    }
  }
  .foot {
    width: 100%;
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 0px;
    p {
      height: 2.45rem;
      width: 100%;
      background-color: #4cc6d8;
      text-align: center;
      color: #ffffff;
      font-size: 0.75rem;
      line-height: 2.45rem;
    }
  }
}
.mint-popup {
  width: 100%;
}
.popup-box {
  width: 100%;
  .head {
    line-height: 3rem;
    padding: 0 0.8rem;
    border-bottom: 1px solid #e5e5e5;
    .cancel {
      font-size: 0.8rem;
      color: #999;
      float: left;
    }
    .sure {
      font-size: 0.8rem;
      color: #999;
      float: right;
    }
    .title {
      font-size: 0.9rem;
      color: #4cc6d8;
      float: left;
      width: 13.8rem;
      text-align: center;
    }
  }
  .popup-list {
    padding-top: 5.2rem;
    li {
      line-height: 1.6rem;
      text-align: center;
      font-size: 0.9rem;
      color: #333;
      border-bottom: 1px solid #e5e5e5;
      &:first-child {
        border-top: 1px solid #e5e5e5;
      }
    }
  }
}
</style>
