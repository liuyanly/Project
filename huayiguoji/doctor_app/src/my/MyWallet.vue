<template>
    <div class="my_wallet">
        <headers headName='我的钱包'></headers>
        <div class="contentScollr">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill='false' ref="loadmore">
                <div class="wallet_head">
                    <div class="balance">
                        <div class="name">余额</div>
                        <div class="price">
                            <span class="icon">¥</span>
                            <span class="num">{{money}}</span>
                        </div>
                        <div class="foot">
                            <div class="tixian" @click='LinkToWithfrawal'>提现</div>
                        </div>
                    </div>
                </div>
                <div class="list">
                    <div class="title">
                        交易记录
                    </div>
                    <div class="box">
                        <ul>
                            <li v-for='content in content'>
                                <div class="name">{{content.username}}</div>
                                <div class="tag">
                                    <span class="time">{{content.created_at}}</span>
                                </div>
                                <div class="num add">+{{content.money}}元</div>
                            </li>
                        </ul>
                    </div>
                </div>
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
      articles: "",
      money: "",
      allLoaded: false, //是否为最后一页
      page: 1,
      per_page: 6, //每页最大数
      last: false,
      content: [],
      card_status: 0
    };
  },
  components: { headers },
  //请求数据接口
  mounted() {
    this.queryMoney();
    this.getDataList(
      "/user/billlog?per_page=" + this.per_page + "&page=" + this.page
    );
  },
  methods: {
    queryMoney() {
      this.BaseSet.getToken(this); //用户端token
      var that=this;
      this.$ajax
        .get("/user/mywallet")
        .then(res => {
          let data = res.data;
          if (data.status == 200) {
            that.money = data.data.money;
            that.card_status = data.data.card_status;
          } else {
            that.$toast(data.message);
          }
        })
        .catch(err => {
          that.$toast(err);
        });
    },
    loadBottom() {
      this.allLoaded = false;
      setTimeout(function() {
        if (!this.last) {
          this.getDataList(
            "/user/billlog?per_page=" + this.per_page + "&page=" + this.page
          );
        } else {
          this.allLoaded = true;
        }
        this.$refs.loadmore.onBottomLoaded();
      }, 500);
    },
    getDataList(url) {
      this.page++;
      this.$ajax
        .get(url)
        .then(res => {
          let data = res.data.data;
          if (res.data.status == 200) {
            if (data.bill_log.length) {
              console.log(data.bill_log, "ttt");
              this.last = false;
              for (let i = 0; i < data.bill_log.length; i++) {
                this.content.push(data.bill_log[i]);
              }
            } else {
              this.last = true;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    LinkToWithfrawal() {
      var that = this;
      if (that.card_status > 0) {
        that.$router.push(`/ChooseCard`);
      } else {
        that.$router.push(`/AddCard`);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.my_wallet {
  height: 100%;
  display: flex;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    position: relative;
  }
  .balance {
    width: 100%;
    height: 12rem;
    background-color: #4cc6d8;
    box-sizing: border-box;
    padding: 0 0.75rem;
    overflow: hidden;
    .name {
      width: 100%;
      margin-top: 2rem;
      color: #ffffff;
      font-size: 0.7rem;
    }
    .price {
      width: 100%;
      overflow: hidden;
      margin-top: 0.5rem;
      color: #ffffff;
      .icon {
        font-size: 0.7rem;
      }
      .num {
        font-size: 1.9rem;
        font-weight: bold;
      }
    }
    .foot {
      width: 100%;
      overflow: hidden;
      margin-top: 2.5rem;
      text-align: center;
      font-size: 0;
      .tixian {
        width: 10rem /* 400/40 */;
        height: 1.55rem;
        border-radius: 0.25rem;
        border: #ffffff 1px solid;
        color: #ffffff;
        text-align: center;
        line-height: 1.55rem;
        font-size: 0.8rem;
        display: inline-block;
        margin: 0 auto;
      }
    }
  }
  .list {
    width: 100%;
    overflow: hidden;
    .title {
      width: 100%;
      height: 1.5rem;
      line-height: 1.5rem;
      box-sizing: border-box;
      padding: 0 0.75rem;
      color: #999999;
      font-size: 0.7rem;
    }
    .box {
      width: 100%;
      overflow: hidden;
      background-color: #fff;
      li {
        width: 100%;
        height: 3rem;
        overflow: hidden;
        box-sizing: border-box;
        padding: 0 0.75rem;
        border-bottom: #e5e5e5 1px solid;
        position: relative;
        .name {
          width: 100%;
          color: #333333;
          font-size: 0.7rem;
          margin-top: 0.625rem;
        }
        .tag {
          width: 100%;
          color: #999999;
          font-size: 0.7rem;
        }
        .num {
          position: absolute;
          right: 0.75rem;
          top: 1.175rem;
          font-size: 0.7rem;
        }
        .minus {
          color: #666666;
        }
        .add {
          color: #8cc53b;
        }
      }
    }
  }
}
</style>
