<template>
	<div class="publish-box">
		<headers headName="发布提醒"></headers>
		<div class="contentScollr">
		<div class="user-info clear">
			<img src="../assets/images/a_image1.png" class="left" />
			<div class="left">
				<p class="name">
					候德胜
				</p>
				<p class="sex">
					男&emsp;42岁
				</p>
				<p class="disease">
					症状:脑肿瘤
				</p>
			</div>
		</div>
		<div class="choose-time clear" @click="openPicker()">
			<img src="../assets/images/a42_icon1.png" class="left" />
			<div class="left time-div">
				{{pickerValue}}
			</div>
		</div>
		<div class="txt-box">
			<textarea maxlength="200" v-model="contentWord" placeholder="请添加详细描述"></textarea>
		</div>
		<p class="msg-notice clear" @click="chooseMsg()">
			<img src="../assets/images/c14_xz.png" v-if="radioVal==1" />
			<img src="../assets/images/c73_xz.png" v-if="radioVal==0" />
			<span>选择发送短信</span>
		</p>
		<p class="sure-btn" @click="publish()">
			确认
		</p>
		<mt-datetime-picker
            ref="picker"
            type="datetime"
			:startDate="startDate"
            year-format="{value}"
  month-format="{value}"
  date-format="{value}"
  @confirm="handleConfirm">
        </mt-datetime-picker>
	</div>
	</div>
	</div>
</template>
<script>
let d = new Date(),
time = d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日'+d.getHours()+'点'+d.getMinutes()+'分'
	import headers from '../components/Header';
	export default {
		data(){
			return{
				pickerValue:'请选择提醒时间',
				startDate: new Date(),
				contentWord:'',
				radioVal:0,
				id:this.$route.params.id,
				age:'',
				illness:'',
				headImg:'',
				userName:'',
				sex:'',
			}
		},
		methods:{
			openPicker() {
				this.$refs.picker.open();
			},
			handleConfirm(res){
			  let d=new Date(res);
				this.pickerValue=d.getFullYear()+'-'+((d.getMonth()+1)>9?(d.getMonth()+1):'0'+(d.getMonth()+1))+'-'+(d.getDate()>9?d.getDate():'0'+d.getDate())+' '
				this.pickerValue +=(d.getHours()>9?d.getHours():'0'+d.getHours())+':'+(d.getMinutes()>9?d.getMinutes():'0'+d.getMinutes())+':00'
			},
			chooseMsg(){
				this.radioVal==0?this.radioVal=1:this.radioVal=0;
			},
			publish(){
				if(this.pickerValue=='请选择提醒时间'){
					this.$toast('请选择提醒时间')
					return false
				}
				if(this.contentWord==''){
					this.$toast('请添加详细描述')
					return false
				}
				var that=this
				that.$ajax.post('/user/sendpcnotifications',{
					useraccount:that.id,
					content:that.contentWord,
					send_at:that.pickerValue,
					tosms:that.radioVal,
				})
				.then(function(res){
					if(res.data.status==200){
						that.$toast('提醒发送成功')
						that.$router.push({name:'HealthManage',params:{id:that.id}})
						}else if(res.data.status==401){
							that.BaseSet.linkLogin(that)
						}else{
							that.$toast(res.data.message)
						}
				})
				.catch(function(err){
							that.BaseSet.linkLogin(that)
				})
			}
		},
		components:{headers}
	}
</script>
<style lang="scss" scoped>
	.publish-box{
		display: flex;
    	height: 100%;
    	flex-direction: column;
    	.contentScollr{
    		flex: 1;
    		overflow: scroll;
    		-webkit-overflow-scrolling:touch;
    	}
		.left{
			float: left;
		}
		.user-info{
			padding: 1.1rem /* 23/20 */ 0.8rem /* 15/20 */;
			background: #fff;
			margin-bottom: 0.5rem /* 10/20 */;
			>img{
				width: 2.5rem /* 50/20 */;
				height: 2.5rem /* 50/20 */;
				border-radius: 50%;
				margin-right: 0.5rem /* 10/20 */;
			}
			.name{
				font-size: 0.7rem /* 14/20 */;
				line-height: 1rem /* 20/20 */;
				color: #444;
			}
			.sex{
				font-size: 0.6rem /* 12/20 */;
				line-height: 0.8rem /* 17/20 */;
				color: #666;
			}
			.disease{
				font-size: 0.6rem /* 12/20 */;
				line-height: 0.8rem /* 17/20 */;
				color: #ff4646;
			}
		}
		.choose-time{
			background: #fff;
			padding: 1rem /* 20/20 */ 0.5rem /* 10/20 */;
			margin-bottom: 0.5rem /* 10/20 */;
			>img{
				width: 2.5rem /* 50/20 */;
				height: 2.5rem /* 50/20 */;
				border-radius: 50%;
				margin-right: 0.5rem /* 10/20 */;
			}
			.time-div{
				line-height: 2.5rem /* 50/20 */;
				font-size: 0.7rem /* 14/20 */;
				color: #444;
			}
		}
		.txt-box{
			background: #fff;
			margin: 0.1rem /* 3/20 */ 0.8rem /* 15/20 */ 0.6rem /* 11/20 */ 0.8rem /* 15/20 */;
			textarea{
				width: 15.7rem /* 345/20 */;
				height: 6.5rem /* 150/20 */;
				padding: 0.5rem /* 10/20 */ 0.8rem /* 15/20 */;
				resize: none;
				border-radius: 0.3rem /* 5/20 */;
				font-size: 0.7rem /* 14/20 */;
				color: #333;
			}
		}
		.msg-notice{
			margin: 0 0.8rem /* 15/20 */;
			line-height: 0.8rem /* 16/20 */;
			>img{
				width: 0.8rem /* 15/20 */;
				height: 0.8rem /* 15/20 */;
				float: left;
			}
			span{
				font-size: 0.6rem /* 11/20 */;
				color: #999;
				margin-left: 0.3rem /* 5/20 */;
				float: left;
			}
		}
		.sure-btn{
			width: 100%;
			height: 2.5rem /* 50/20 */;
			background: #4CC6D8;
			color: #fff;
			text-align: center;
			line-height: 2.5rem;
			font-size: 0.8rem /* 15/20 */;
			position: fixed;
			bottom: 0;
		}
	}
</style>
