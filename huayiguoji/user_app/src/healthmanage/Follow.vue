<template>
	<div class="follow_box">
		<headers headName='跟踪随访'></headers>
		<div class="head_box" @click="openPicker()">
            <span>{{pickerValue}}</span>
            <img src="../assets/images/c12_xiala.png" alt="">
        </div>
		<div class="contentScollr">
		<router-link :to="{ name: 'PublishFollow', params: {} }">
		</router-link>
        <div class="content"  :style="{'-webkit-overflow-scrolling': scrollMode}">
			<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"  ref="loadmore"  bottomPullText='上拉刷新' bottomLoadingText='加载中......'>
				<ul v-if="dataList.length>0">
	                <li v-for="data in dataList">
	                    <div class="name" v-if="data.type == 0">医助提醒</div>
						<div class="name" v-if="data.type == 1">医生提醒</div>
	                    <div class="txt">{{data.content}}</div>
	                    <div class="time">{{data.created_at}}</div>
	                    <router-link :to="{path: '/FollowDetail/' + data.id+'/'+data.type }" >
	                    <div class="btn">查看</div>
	                    </router-link>
	                </li>
	            </ul>
				<p v-else class="noTip">
					暂无更多数据
				</p>
			</mt-loadmore>
        </div>
		<mt-datetime-picker
            ref="picker"
            type="date"
			:endDate="endDate"
            year-format="{value}"
  month-format="{value}"
  date-format="{value}"
  @confirm="handleConfirm">
        </mt-datetime-picker>
	</div>
	</div>
</template>

<script>
let d = new Date(),
today = (d.getFullYear())+'-'+((d.getMonth()+1)>9?d.getMonth()+1:'0'+(d.getMonth()+1))+'-'+(d.getDate()>9?d.getDate():'0'+d.getDate());

//导入模板
import headers from "../components/Header.vue";
export default {
  data () {
    return {
	  pickerValue:'全部',
	  endDate: new Date(),
	  dataList:[],
	  currentPage:1,
	  per_page:8,
	  total_page:0,
	  allLoaded:false,//分页
	  scrollMode:"auto",
    }
  },
  mounted(){
	  this.BaseSet.getToken(this)
	  this.getData('/visit?per_page='+this.per_page+'&page='+this.currentPage)
  },
  methods:{
	  loadBottom() {
		  if(this.currentPage==this.total_page){
			  this.allLoaded = true;// 若数据已全部获取完毕
		  }
		  this.currentPage+=1
		  if(this.pickerValue!='全部'){
			  this.getData('/visit?per_page='+this.per_page+'&page='+this.currentPage+'&m_s[created_at]='+this.pickerValue)
		  }else{
			  this.getData('/visit?per_page='+this.per_page+'&page='+this.currentPage)
		  }
		  this.$refs.loadmore.onBottomLoaded();
	  },
	  openPicker() {
		  this.$refs.picker.open();
      },
      handleConfirm(res){
  		let d=new Date(res);
  		this.pickerValue=(d.getFullYear())+'-'+((d.getMonth()+1)>9?d.getMonth()+1:'0'+(d.getMonth()+1))+'-'+(d.getDate()>9?d.getDate():'0'+d.getDate());
		this.currentPage=1
		this.dataList=[]
		this.getData('/visit?per_page='+this.per_page+'&page='+this.currentPage+'&m_s[created_at]='+this.pickerValue)
      },
	  getData(url){
		  var that=this
		  that.$ajax.get(url)
		  .then(function(res){
			  if(res.data.status==200){
				  that.total_page=res.data.data.paginate.total_page
				  if(that.total_page==0){
					  that.$toast('暂无数据')
				  }
				  if(res.data.data.visit instanceof Array){
					  that.dataList=that.dataList.concat(res.data.data.visit)
					  // for(var i=0;i<res.data.data.visit.length;i++){
						//   that.dataList.push(res.data.data.visit[i])
					  // }
				  }
				  that.$nextTick(function () {
					   // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，
					   // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，
					   // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
					   that.scrollMode = "touch";
				 });
			  }else if(res.data.status==401){
				  that.BaseSet.linkLogin(that)
			  }else{
				  that.$toast(res.data.message)
			  }
		  })
		  .catch(function(err){
			  //that.$toast(err)
			  that.BaseSet.linkLogin(that)
		  })
	  },
  },
  components: { headers},
  //请求数据接口
}
</script>

<style lang="scss" scoped>
.follow_box{
    width: 100%;
	position: relative;
	display: flex;
	height: 100%;
	flex-direction: column;
	.contentScollr{
		flex: 1;
		overflow: auto;
		-webkit-overflow-scrolling:touch;
	}
	.publisth-btn{
		position: relative;
		width: 4rem /* 160/40 */;
		height: 2.05rem;
		text-align: center;
		color: #4cc6d8;
		line-height: 2.05rem;
		top: 2.2rem;
		right: .8rem /* 30/40 */;
		font-size: .7rem /* 28/40 */;
		z-index: 101;
	}
    .head_box{
        width: 100%;
        height: 2.05rem;
        overflow: hidden;
        position: relative;
		z-index: 100;
        left: 0;
        background-color: #fff;
        text-align: center;
        line-height: 2.05rem;
        span{
            color: #4CC6D8;
            font-size:.7rem ;
        }
        img{
            width: .5rem;
            height: .3rem;
            vertical-align: middle;
            margin-left: .15rem;
        }
    }
    .content{
        width: 100%;
        overflow: auto;
        margin-top: .75rem;
        background-color: #fff;
		ul{
			height: auto;
			overflow: auto;
		}
        li{
            width: 100%;
            overflow: hidden;
            box-sizing: border-box;
            padding: 0 .75rem;
            height: 4.25rem;
            position: relative;
            border-bottom:#e5e5e5 1px solid;
            .name{
                color: #333333;
                font-size: .7rem;
                margin-top: .6rem;
            }
            .txt{
                width: 13rem;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                color: #666666;
                font-size: .7rem;
                margin-top: .2rem;
            }
            .time{
                color: #999999;
                font-size: .6rem;
                margin-top: .2rem;
            }
            .btn{
                position: absolute;
                width: 3rem;
                height: 1.25rem;
                top: 50%;
                right: .75rem;
                margin-top:-0.625rem;
                background-color: #4DC6D8;
                color: #ffffff;
                text-align: center;
                line-height: 1.35rem;
                font-size: .7rem;
                border-radius:.25rem;
            }
        }
    }
}
</style>
