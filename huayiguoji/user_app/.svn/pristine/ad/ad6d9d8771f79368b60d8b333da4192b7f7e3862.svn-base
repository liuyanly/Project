<template>
    <div class="my-order">
        <headers headName='我的订单'></headers>
        <smallHeader @changeView="changeTypeView" :parentType='editType' :smallData='smallHeaderData'></smallHeader>
        <div class="contentScollr">
            <div :style="{'-webkit-overflow-scrolling': scrollMode}" style="overflow:auto">
                <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill=false bottomPullText='上拉刷新' bottomLoadingText='加载中......'>
                    <ul class="order-list not-pay" v-show="editType==0">
                        <li v-for="data in dataNotList">
                            <div class="top-div clear">
                                <div class="left">
                                    <p class="title-p">
                                        <span class="title">{{data.title}}</span>
                                        <span class="c1"></span>
                                    </p>
                                    <p class="time-p">
                                        {{data.created_at.substring(0,16)}}
                                    </p>
                                </div>
                                <div class="right">
                                    <p class="price">
                                        ¥{{data.money}}
                                    </p>
                                </div>
                            </div>
                            <p class="bottom-div clear">
                                <span class="pay-btn right">
                                    <router-link :to="{path: '/NowPay/'+data.money+'/'+encodeURI(data.title)+'/'+data.id+'/'+encodeURI(data.orderable_type.substring(data.orderable_type.lastIndexOf('\\')+1).toLowerCase())+'/'+data.orderno}">立即支付</router-link>
                                </span>
                            </p>
                        </li>
                    </ul>
                    <ul class="order-list already-pay" v-show="editType==1">
                        <li v-for="data in dataList">
                            <div class="top-div clear">
                                <div class="left">
                                    <p class="title-p">
                                        <span class="title">{{data.title}}</span>
                                        <span class="c1"></span>
                                    </p>
                                    <p class="time-p">
                                        {{data.created_at.substring(0,16)}}
                                    </p>
                                </div>
                                <div class="right">
                                    <p class="price">
                                        ¥{{data.money}}
                                    </p>
                                </div>
                            </div>
                            <p class="bottom-div clear">
                                <span class="left status">{{data.translates.status_desc}}</span>
                                <span class="pay-btn right">
                                    <router-link :to="{path: '/OrderDetail/2/'+data.id+'/'+data.comment_count}">查看详情</router-link>
                                </span>
                            </p>
                        </li>
                    </ul>
                    <ul class="order-list already-complete" v-show="editType==2">
                        <li v-for="data in dataCompleteList">
                            <div class="top-div clear">
                                <div class="left">
                                    <p class="title-p">
                                        <span class="title">{{data.title}}</span>
                                        <span class="c1"></span>
                                    </p>
                                    <p class="time-p">
                                        {{data.created_at.substring(0,16)}}
                                    </p>
                                </div>
                                <div class="right">
                                    <p class="price">
                                        ¥{{data.money}}
                                    </p>
                                </div>
                            </div>
                            <p class="bottom-div clear">
                                <span class="left status">{{data.translates.status_desc}}</span>
                                <span class="pay-btn right">
                                    <router-link :to="{path: '/OrderDetail/1/'+data.id+'/0'}">查看详情</router-link>
                                </span>
                            </p>
                        </li>
                    </ul>
                </mt-loadmore>
            </div>
        </div>
    </div>
</template>
<script>
//导入模板
import headers from "../components/Header.vue";
import smallHeader from "../components/SmallHeader.vue";
export default {
  data() {
    return {
      smallHeaderData: ["未支付", "已支付", "已完成"],
      editType: 0,
      dataNotList: [],
      dataList: [],
      dataCompleteList: [],
      currentPage: 1,
      per_page: 20,
      total_page: 0,
      allLoaded: false, //分页
      scrollMode: "auto"
    };
  },
  mounted() {
    this.BaseSet.getToken(this);
    this.getData();
  },
  methods: {
    changeTypeView(num) {
      //tab切换，数据展示
      this.dataNotList = [];
      this.dataList = [];
      this.dataCompleteList = [];
      this.allLoaded = false;
      if (num == 1) {
        num = 2;
      } else if (num == 2) {
        num = 1;
      }
      //console.log(this.editType)
      this.editType = num;
      this.currentPage = 1;
      this.getData();
    },
    loadBottom() {
      if (this.currentPage == this.total_page) {
        //this.$toast("已经是最后一页了");
        this.allLoaded = true; // 若数据已全部获取完毕
        console.log(this.allLoaded);
      }
      this.currentPage += 1;
      this.getData();
      this.$refs.loadmore.onBottomLoaded();
    },
    getData() {
      var that = this;
      that.$ajax
        .get(
          "/order?e_s[status]=" +
            that.editType +
            "&page=" +
            that.currentPage +
            "&per_page=" +
            that.per_page
        )
        .then(function(res) {
          if (res.data.status == 200) {
            that.total_page = res.data.data.paginate.total_page;
            if (that.total_page == 0) {
              that.$toast("暂无数据");
            }
            if (res.data.data.order instanceof Array) {
              if (that.editType == 0) {
                that.dataNotList = that.dataNotList.concat(res.data.data.order);
              } else if (that.editType == 1) {
                that.dataList = that.dataList.concat(res.data.data.order);
              } else {
                that.dataCompleteList = that.dataCompleteList.concat(
                  res.data.data.order
                );
              }
            }
            console.log(that.scrollMode);
            that.$nextTick(function() {
              // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，
              // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，
              // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
              that.scrollMode = "touch";
            });
          } else if (res.data.status == 401) {
            that.BaseSet.linkLogin(that);
          } else {
            that.$toast(res.data.message);
          }
        })
        .catch(function(err) {});
    }
  },
  components: { headers, smallHeader }
};
</script>
<style lang="scss" scoped>
.my-order {
  display: flex;
  height: 100%;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  a {
    color: #fff;
  }
  .order-list {
    margin-top: 0.5rem;
    li {
      background: #fff;
      margin-bottom: 0.3rem;
      .top-div {
        padding: 0.9rem 0.8rem;
        border-bottom: 1px solid #e5e5e5;
      }
      .left {
        float: left;
      }
      .right {
        float: right;
        font-size: 0.7rem;
        color: #fc4f4f;
        font-family: pingfangSc-medium;
        margin-top: 0.6rem;
        line-height: 0.7rem;
      }
      .title-p {
        line-height: 0.7rem;
        margin-bottom: 0.5rem;
        font-family: PingFang SC;
        .title {
          font-size: 0.7rem;
          color: #333;
        }
        .c1 {
          color: #4cc6d8;
          font-size: 0.6rem;
        }
      }
      .time-p {
        color: #999;
        line-height: 0.6rem;
        font-size: 0.6rem;
      }
      .bottom-div {
        padding: 0.8rem;
        text-align: right;
        .left.status {
          font-size: 0.6rem;
          color: #999;
          line-height: 1.3rem;
        }
        .right {
          display: inline-block;
          width: 4.5rem;
          height: 1.3rem;
          line-height: 1.3rem;
          background: #4cc6d8;
          font-size: 0.7rem;
          text-align: center;
          color: #fff;
          margin-top: 0;
          border-radius: 0.3rem;
        }
      }
    }
  }
}
</style>
