<template>
	<div class="msg-detail">
		<headers headName="消息详情"></headers>
		<div class="contentScollr">
		<ul class="list-ul">
			<li class="clear">
				<div class="left img-box">
					<img v-if="data.type == 'assistant'" :src="info.translates.avatar_img" />
					<img v-else src="../assets/images/f1_icon4.png" />
					<!-- <span class="num">22</span> -->
				</div>
				<div class="left word">
					<p class="line1 clear">
						<span v-if="data.type == 'assistant'" class="left">{{info.realname}}</span>
						<span v-else class="left">系统消息</span>
						<span class="right">{{time}}</span>
					</p>
				</div>
			</li>
		</ul>
		<div class="content-word">
			{{data.content}}
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
      id:this.$route.params.id,
	  data:'',
	  info:'',
	  time:'',
    }
  },
  mounted(){
	this.BaseSet.getToken(this)
	this.getDetail()
  },
  methods: {
	Back(){
  		this.$router.go(-1)
	},
	getDetail(){
		var that = this
		that.$ajax.get('/user/notifications/'+that.id)
		.then(function(res){
			console.log(res.data)
			if(res.data.status == 200){
				that.data = res.data.data.data
				that.info = res.data.data.sender
				that.time = res.data.data.created_at
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
.msg-detail{
	width: 100%;
	display: flex;
	height: 100%;
	flex-direction: column;
	.contentScollr{
		flex: 1;
		overflow: auto;
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
			}
			.word{
				width: calc(100% - 3rem);
				.line1{
					line-height: 2.5rem /* 21/20 */;
					width: 100%;
					.left{
						font-size: .75rem;
						color: #444;
					}
					.right{
						font-size: .6rem /* 12/20 */;
						color: #999;
					}
				}
			}
		}
	}
	.content-word{
		padding: 1rem /* 20/20 */ .8rem /* 15/20 */;
		line-height: 1.2rem /* 24/20 */;
		font-size: .7rem /* 14/20 */;
		color: #333;
		background: #fff;
	}
}
</style>
