<template>
    <div class="evaluate-list">
        <headers headName="用户评价"></headers>
        <div class="contentScollr">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"
                   bottomPullText='上拉刷新' bottomLoadingText='加载中......'>
                   <ul><li class="evaluate-content" v-for="comment in commentArr" @click="viewDetail(1)">
            <p class="clear line1">
                <img :src="comment.translates.c?comment.translates.avatar_img:defaultImg" class="left" />
                <span class="name left">{{comment.translates.realname}}</span>
                <span class="left score-span"><scoreReadOnly :gradeNum="comment.stars" gradeShow="0"></scoreReadOnly></span>
                <span class="right time">{{comment.created_at.split(" ")[0]}}</span>
            </p>
            <p class="content-word">
                {{comment.content}}
            </p>
            <ul class="tag-list clear">
                <li v-for="tag in comment.translates.tags_desc">
                    {{tag}}
                </li>
            </ul>
        </li></ul>
        
        </mt-loadmore>
        <!-- <div class="evaluate-content" @click="viewDetail(1)">
            <p class="clear line1">
                <img src="" class="left" />
                <span class="name left">阿拉丁</span>
                <span class="left score-span"><scoreReadOnly gradeNum="4" gradeShow="0"></scoreReadOnly></span>
                <span class="right time">2017-05-28</span>
            </p>
            <p class="content-word">
                完成多项市级科技成果二、三等奖，发表国家期刊十余
                篇. 厉害厉害！完成多项市级科技成果二、三等奖，发
                表国家期刊十余篇. 厉害厉害！
            </p>
            <ul class="tag-list clear">
                <li>
                    态度好
                </li>
                <li>
                    认真仔细
                </li>
            </ul>
        </div>
        <div class="evaluate-content" @click="viewDetail(1)">
            <p class="clear line1">
                <img src="" class="left" />
                <span class="name left">阿拉丁</span>
                <span class="left score-span"><scoreReadOnly gradeNum="4" gradeShow="0"></scoreReadOnly></span>
                <span class="right time">2017-05-28</span>
            </p>
            <p class="content-word">
                完成多项市级科技成果二、三等奖，发表国家期刊十余
                篇. 厉害厉害！完成多项市级科技成果二、三等奖，发
                表国家期刊十余篇. 厉害厉害！
            </p>
            <ul class="tag-list clear">
                <li>
                    态度好
                </li>
                <li>
                    认真仔细
                </li>
            </ul>
        </div>
        <div class="evaluate-content" @click="viewDetail(1)">
            <p class="clear line1">
                <img src="" class="left" />
                <span class="name left">阿拉丁</span>
                <span class="left score-span"><scoreReadOnly gradeNum="4" gradeShow="0"></scoreReadOnly></span>
                <span class="right time">2017-05-28</span>
            </p>
            <p class="content-word">
                完成多项市级科技成果二、三等奖，发表国家期刊十余
                篇. 厉害厉害！完成多项市级科技成果二、三等奖，发
                表国家期刊十余篇. 厉害厉害！
            </p>
            <ul class="tag-list clear">
                <li>
                    态度好
                </li>
                <li>
                    认真仔细
                </li>
            </ul>
        </div> -->
    </div>
    </div>
</template>
<script>
import headers from "../components/Header";
import scoreReadOnly from "../components/ScoreReadOnly";
import avatarImg from "../assets/images/avatar.png";
export default {
  data() {
    return {
      defaultImg: avatarImg,
      id: this.$route.params.id,
      commentArr: [],
      currentPage: 1,
      per_page: 20,
      total_page: 0,
      allLoaded: false, //分页
      topStatus: false //分页
    };
  },
  mounted() {
    this.doctorComment();
  },
  methods: {
    loadBottom() {
      if (this.currentPage == this.total_page) {
        this.allLoaded = true; // 若数据已全部获取完毕
      }
      if (this.currentPage < this.total_page) {
        let oldPage = this.currentPage;
        this.currentPage = this.currentPage + 1;
        this.url = this.url.replace("&page=" + oldPage, "");
        this.url = this.url + "&page=" + this.currentPage;
        this.$refs.loadmore.onBottomLoaded();
      }
    },
    viewDetail(id) {
      this.$router.push({ name: "EvaluateInfo", params: { id: id } });
    },
    doctorComment() {
      var that = this;
      that.$ajax
        .get(
          "comment/doctorcomment/" +
            that.id +
            "?per_page=" +
            this.per_page +
            "&page=" +
            this.currentPage
        )
        .then(function(res) {
          if (res.data.status == 200) {
            console.log(res.data.data);
            that.commentArr = res.data.data.comment;
            that.$nextTick(function() {
              // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，
              // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，
              // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
              that.scrollMode = "touch";
            });
            that.total_page = res.data.data.paginate.total_page;
            if (that.currentPage == that.total_page) {
              that.allLoaded = true; // 若数据已全部获取完毕
            }
          } else if (res.data.status == 401) {
            that.BaseSet.linkLogin();
          } else {
            that.$toast(res.data.message);
          }
        })
        .catch(function(err) {
          that.$toast(err);
          that.BaseSet.linkLogin();
        });
    }
  },
  components: { headers, scoreReadOnly }
};
</script>
<style lang="scss" scoped>
.evaluate-list {
  background: #fff;
  display: flex;
  height: 100%;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .evaluate-content {
    padding: 0.5rem /* 20/40 */ 0.8rem /* 30/40 */;
    border-bottom: 1px solid #e5e5e5;
    .line1 {
      margin-bottom: 0.3rem /* 10/40 */;
      > img.left {
        width: 1.8rem /* 70/40 */;
        height: 1.8rem /* 70/40 */;
        border-radius: 50%;
        margin-right: 0.4rem /* 17/40 */;
      }
      .name {
        font-size: 0.6rem /* 24/40 */;
        color: #333;
        margin-right: 0.6rem /* 25/40 */;
        line-height: 1.8rem;
      }
      .score-span {
        margin-top: 0.5rem;
      }
      .time {
        font-size: 0.6rem /* 24/40 */;
        color: #999;
        line-height: 1.8rem;
      }
    }
    .content-word {
      font-size: 0.7rem /* 28/40 */;
      color: #333;
      line-height: 1.2rem /* 48/40 */;
    }
  }
  .tag-list {
    margin: 0.3rem /* 13/40 */ 0;
    li {
      float: left;
      padding: 0 0.3rem /* 14/40 */;
      line-height: 0.9rem /* 38/40 */;
      border: 1px solid #666;
      color: #666;
      text-align: center;
      margin-right: 0.5rem /* 20/40 */;
      font-size: 0.6rem /* 24/40 */;
      border-radius: 0.3rem /* 10/40 */;
    }
  }
}
</style>
