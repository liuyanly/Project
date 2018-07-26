<template>
    <div class="my_wallet">
        <headers headName='我的钱包'></headers>
        <div class="contentScollr">
            <div class="wallet_head">
                <div class="balance">
                    <div class="name">余额</div>
                    <div class="price">
                        <span class="icon">¥</span>
                        <span class="num">{{walletData.money}}</span>
                    </div>
                    <div class="foot">
                        <router-link :to="{ name: 'Recharge', params: {} }">
                            <div class="recharge">充值</div>
                        </router-link>
                        <a href="javascript:;" @click="LinkToWithfrawal">
                            <div class="tixian">提现</div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="title">
                    交易记录
                </div>
                <div class="box" :style="{'-webkit-overflow-scrolling': scrollMode}" style="overflow:auto">
                    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill=false bottomPullText='上拉刷新' bottomLoadingText='加载中......'>
                        <ul>
                            <li v-for="data in dataList">
                                <div class="name">{{data.title}}</div>
                                <div class="tag">
                                    <span class="time">{{data.created_at}}</span>
                                    <span class="type">{{data.translates.status_desc}}</span>
                                </div>
                                <div :class="{'minus' :data.status==0}" class="num add">
                                    <span v-if="data.status==1">+</span>
                                    <span v-else>-</span>{{data.money}}元</div>
                            </li>
                        </ul>
                    </mt-loadmore>
                </div>
                <p class="nothing" v-if="dataList.length==0">
                    暂无交易记录
                </p>
            </div>
        </div>
    </div>
</template>

<script>
//导入模板
import headers from "../components/Header.vue";
export default {
  data () {
    return {
      dataList:[],
	  walletData:'',
	  currentPage:1,
	  per_page:20,
	  total_page:0,
	  allLoaded:false,//分页
      scrollMode:"auto",
      card_status: 0
    }
  },
  mounted(){
	  this.BaseSet.getToken(this)
	  this.getDataList()
	  this.getWalletData()
  },
  methods:{
	  //加载更多
	  loadBottom() {
		if(this.currentPage==this.total_page){
			this.$toast('已经是最后一页了')
			this.allLoaded = true;// 若数据已全部获取完毕
		}
		this.currentPage+=1
		this.getDataList()
		this.$refs.loadmore.onBottomLoaded();
	  },
	  //获取交易记录
	getDataList(){
		var that = this
		that.$ajax.get('user/billlog?per_page='+that.per_page+'&page='+that.currentPage)
		.then(function(res){
			if(res.data.status==200){
			  that.total_page=res.data.data.paginate.total_page
			  if(that.total_page==0){
				  that.$toast('暂无数据')
			  }
			  console.log(res.data.data)
			  if(res.data.data.bill_log instanceof Array){
				  that.dataList=that.dataList.concat(res.data.data.bill_log)
			  }
			  that.$nextTick(function () {
				   that.scrollMode = "touch";
			 });
		  }else if(res.data.status==401){
			  that.BaseSet.linkLogin(that)
		  }else{
			  //that.$toast(res.data.message)
		  }
		})
		.catch(function(err){
			that.BaseSet.linkLogin(that)
		})
	},
	getWalletData(){
		var that = this
		that.$ajax.get('/user/mywallet')
		.then(function(res){
			if(res.data.status == 200){
                that.walletData = res.data.data
                 that.card_status = res.data.data.card_status;
			}else if(res.data.status == 401){
				that.BaseSet.linkLogin(that)
			}else{
				//that.$toast(res.data.message)
			}
		})
		.catch(function(err){
			that.$toast(err)
		})
    },
    LinkToWithfrawal() {
      var that = this;
      if (that.card_status > 0) {
        that.$router.push(`/ChooseCard`);
      } else {
        that.$router.push(`/AddCard`);
      }
    }
  },
  components: { headers},
  //请求数据接口
}
</script>

<style lang="scss" scoped>
.nothing {
  font-size: 0.7rem /* 28/40 */;
  color: #666;
  text-align: center;
  margin-top: 1rem /* 40/40 */;
}
.my_wallet {
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
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
      .recharge,
      .tixian {
        width: 5.4rem;
        height: 1.55rem;
        border-radius: 0.25rem;
        border: #ffffff 1px solid;
        color: #ffffff;
        text-align: center;
        line-height: 1.55rem;
        font-size: 0.8rem;
        display: inline-block;
        margin: 0 0.625rem;
      }
    }
  }
  .list {
    width: 100%;
    overflow: hidden;
    .title {
      width: 100%;
      height: 1.5rem;
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
          color: #666666 !important;
        }
        .add {
          color: #8cc53b;
        }
      }
    }
  }
}
</style>
