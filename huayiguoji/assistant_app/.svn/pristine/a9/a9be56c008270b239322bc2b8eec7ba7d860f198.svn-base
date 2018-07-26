<template>
	<div class="message">
		<headers :headName="title"></headers>
		<div class="contentScollr">
		<mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill='false' ref="loadmore">
		<p class="nothing" v-if="dataList == '暂无消息'">
			暂无消息
		</p
		<ul class="list-ul" v-else>
			<li class="clear" v-for="data in dataList" @click="viewMsg(data.data.type,data.id)">
				<div class="left img-box">
					<img v-if="id==1" src="../assets/images/b1_icon4.png" />
					<img v-else :src="data.sender.translates.avatar_img" />
				</div>
				<div class="left word">
					<p class="line1 clear">
						<span class="left" v-if="id!=1">{{data.sender.realname}}<span class="c1" v-if="data.type=='doctor'">({{data.department_title}})</span></span>
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
  data () {
    return {
      id:this.$route.params.id,
	  dataList:[],
	  title:'就诊消息',
		allLoaded:false,//是否为最后一页
		page:1,
		per_page:7,//每页最大数
		last:false,
    }
  },
  mounted(){
	  if(this.id == 1){
		  this.title = '系统消息'
	  }else if(this.id == 2){
		  this.title = '就诊消息'
	  }else if(this.id == 3){
		  this.title = '我的医生'
	  }
	this.BaseSet.getToken(this)
	this.getDataList()
  },
  methods: {
		loadBottom() {
        this.allLoaded = false;
        setTimeout(function() {
            if (!this.last) {
                this.getDataList()
            } else {
                this.allLoaded = true;
            }
            this.$refs.loadmore.onBottomLoaded();
        }, 500);
    },
	viewMsg(type,mid){
		if(type=='doctor'||type=='system'){
			this.$router.push({name:'MsgDetail',params:{id:mid}})
		}else if(type==1){
			this.$router.push({})
		}else if(type==2){
			this.$router.push({})
		}else{

		}
	},
	getDataList(){
		var that = this
		that.$ajax.get('/user/notificationslist/'+that.id+'?per_page='+that.per_page+'&page='+that.page)
		.then(function(res){
			console.log(res.data)
			if(res.data.status == 200){
				if(res.data.data.notifications.length){
					that.page++
						that.last = false;
						for(let i = 0;i < res.data.data.notifications.length;i++){
								that.dataList.push(res.data.data.notifications[i])
						};
				}else{
						that.last = true;
				}
			}
		})
		.catch(function(err){
			that.BaseSet.linkLogin(that)
		})
	}
  },
  components: { headers},
  //请求数据接口
}
</script>

<style lang="scss" scoped>
.message{
	width: 100%;
	display: flex;
	height: 100%;
	flex-direction: column;
	.contentScollr{
		flex: 1;
		overflow: scroll;
		-webkit-overflow-scrolling:touch;
	}
	.list-ul{
		background: #fff;
		li{
			padding: 1rem /* 20/20 */ .8rem /* 15/20 */;
			border-bottom: 1px solid #e5e5e5;
			.left{
				float:left;
			}
			.right{
				float: right;
			}
			.img-box{
				margin-right: .5rem /* 10/20 */;
				position: relative;
				>img{
					width: 2.5rem /* 50/20 */;
					height: 2.5rem /* 50/20 */;
					border-radius: 50%;
				}
				.num{
					font-size: .5rem /* 10/20 */;
					color: #fff;
					position: absolute;
					width: .8rem /* 16/20 */;
					height: .8rem /* 16/20 */;
					text-align: center;
					border-radius: 50%;
					background: #ff2906;
					top: -.1rem /* -2/20 */;
					right: 0;
				}
			}
			.word{
				.line1{
					line-height: 1.1rem /* 21/20 */;
					margin-bottom: .4rem /* 8/20 */;
					.left{
						font-size: .75rem;
						color: #444;
					}
					.right{
						font-size: .6rem /* 12/20 */;
						color: #999;
					}
					.c1{
						font-size: .7rem /* 13/20 */;
						color: #4cc6d8;
					}
				}
				.line2{
					font-size: .7rem /* 13/20 */;
					color: #666;
					width: 14.1rem /* 282/20 */;
					line-height: .9rem /* 18/20 */;
					height: .9rem /* 18/20 */;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
	.nothing{
		font-size: .7rem;
		color: #444;
		text-align: center;
		line-height: 2rem /* 40/20 */;
	}
}
</style>
