<template>
	<div class="intervention">
		<headers headName='健康干预'></headers>
        <div class="head_box" @click="openPicker()">
            <span>{{pickerValue}}</span>
            <img src="../assets/images/c12_xiala.png" alt="">
        </div>
		<div class="contentScollr">
        <div class="content" :style="{'-webkit-overflow-scrolling': scrollMode}" style="overflow:auto">
			<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" bottomPullText='上拉刷新' bottomLoadingText='加载中......'>
            <ul>
                <li v-for="data in dataList">
                    <div class="name">{{data.translates.category_title}}</div>
                    <div class="time">{{data.created_at}}</div>
                    <div class="btn" @click="viewDetail(data.category_id,data.translates.category_title,data.id)">查看</div>
                </li>
                <!-- <li>
                    <div class="name">医生意见</div>
                    <div class="time">2017-06-29 12:00</div>
                    <router-link :to="{path: '/InterventionDetail/' + 0 + '/'+'医生意见'}" >
                    <div class="btn">查看</div>
                    </router-link>
                </li>
                <li>
                    <div class="name">饮食干预</div>
                    <div class="time">2017-09-10 12:00</div>
                    <router-link :to="{path: '/InterventionDetail/' + 2 + '/'+'饮食干预'}" >
                    <div class="btn">查看</div>
                    </router-link>
                </li> -->
            </ul>
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
	  scrollMode:"auto",
      articles:'',
	  pickerValue:'全部',
	  endDate: new Date(),
	  dataList:[],
	  currentPage:1,
	  per_page:8,
	  total_page:0,
	  allLoaded:false,//分页
	  topStatus:false,//分页
    }
  },
  mounted(){
	  this.BaseSet.getToken(this)
	  this.getDataList()
  },
  methods:{
	  viewDetail(typeId,type,id){
		  if(typeId == 187){
			  this.$router.push({name:'InterventionDetail',params:{id:1,title:type,dId:id}})
		  }else if(typeId == 188){
			  this.$router.push({name:'InterventionDetail',params:{id:2,title:type,dId:id}})
		  }else{
			  this.$router.push({name:'InterventionDetail',params:{id:0,title:type,dId:id}})
		  }
	  },
	  loadBottom() {
		  if(this.currentPage<this.total_page){
			  if(this.currentPage==this.total_page){
				  this.$toast('已经是最后一页了')
				this.allLoaded = true;// 若数据已全部获取完毕
			  }
			  if(this.currentPage<this.total_page){
				  this.currentPage=this.currentPage+1
				  this.getDataList()
				  this.$refs.loadmore.onBottomLoaded();
			  }else{

			  }
		  }
	  },
	  openPicker() {
		  this.$refs.picker.open();
      },
      handleConfirm(res){
  		let d=new Date(res);
  		this.pickerValue=(d.getFullYear())+'-'+((d.getMonth()+1)>9?d.getMonth()+1:'0'+(d.getMonth()+1))+'-'+(d.getDate()>9?d.getDate():'0'+d.getDate());
		this.dataList = []
		this.getDataList()
      },
	  getDataList(){
		  var that = this
		  var params = {
			  per_page:that.per_page,
			  page: that.currentPage
		  }
		  if(that.pickerValue != '全部'){
			  params['m_s[created_at]'] = that.pickerValue
		  }
		  that.$ajax.get('/intervene',{params:params})
		  .then(function(res){
			  if(res.data.status == 200){
				  if(res.data.data.paginate.total_page==0){
					  that.$toast('暂无数据')
				  }else{
					  for(var i=0; i<res.data.data.data.length;i++){
						  that.dataList.push(res.data.data.data[i])
					  }
					  that.total_page=res.data.data.paginate.total_page
				  }
				  if(that.currentPage==that.total_page){
					  that.allLoaded = true;// 若数据已全部获取完毕
				  }
				  that.$nextTick(function () {
					   // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，
					   // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，
					   // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
					   that.scrollMode = "touch";
				 });
			  }
		  })
		  .catch(function(err){

		  })
	  }
  },
  components: { headers},
  //请求数据接口
}
</script>

<style lang="scss" scoped>
.intervention{
    width: 100%;
	display: flex;
	height: 100%;
	flex-direction: column;
	.contentScollr{
		flex: 1;
		overflow: auto;
		-webkit-overflow-scrolling:touch;
	}
    .head_box{
        width: 100%;
        height: 2.05rem;
        overflow: hidden;
        position: relative;
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
        margin-top: .5rem;
        background-color: #fff;
        li{
            width: 100%;
            overflow: hidden;
            box-sizing: border-box;
            padding: 0 .75rem;
            height: 3.5rem;
            position: relative;
            border-bottom:#e5e5e5 1px solid;
            .name{
                color: #333333;
                font-size: .7rem;
                margin-top: .875rem;
            }
            .time{
                color: #999999;
                font-size: .6rem;
                margin-top: .3rem;
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
