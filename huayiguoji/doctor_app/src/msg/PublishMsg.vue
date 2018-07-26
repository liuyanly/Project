<template>
	<div class="publish-box">
		<headers headName="发布消息"></headers>
		<div class="contentScollr">
		<div class="user-info clear" v-if="patientId!=0" @click="ChoosePatient()">
			<img :src="patientImg" class="left" />
			<div class="left">
				<p class="name">
					<span>{{patientData.realname}}</span>
					<span class="disease">&emsp;{{patientData.illness}}</span>
				</p>
			</div>
		</div>
		<div class="user-info clear" v-if="patientId==0" @click="ChoosePatient()">
			<p class="tip">
				请选择患者
			</p>
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
		<!-- <p class="msg-notice clear" @click="chooseMsg()">
			<img src="../assets/images/c14_xz.png" v-if="radioVal==1" />
			<img src="../assets/images/c73_xz.png" v-if="radioVal==0" />
			<span>选择发送短信</span>
		</p> -->
		<p class="sure-btn" @click="publish()">
			发布
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
</template>
<script>
let d = new Date(),
time = d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日'+d.getHours()+'点'+d.getMinutes()+'分'
	import headers from '../components/Header';
	export default {
		data(){
			return{
				pickerValue:'请选择时间',
				startDate: new Date(),
				contentWord:'',
				radioVal:0,
				patientId: this.$route.params.patientId,
				patientImg:'',
				patientData:'',
				doctorImg:'',
				doctorDepartment:'',
				doctorData:'',
			}
		},
		mounted(){
			this.BaseSet.getToken(this)
			if(this.patientId != 0){
				this.getPatient()
			}
		},
		methods:{
			openPicker() {
				this.$refs.picker.open()
			},
			ChoosePatient(){
				this.$router.push({name:'ChoosePatient',params:{patientId:this.patientId}})
			},
			getPatient(){
                var that = this
                that.$ajax.get('/user/patient/'+that.patientId)
                .then(function(res){
                    if(res.data.status == 200){
                        that.patientData = res.data.data
						that.patientImg = res.data.data.translates.avatar_img
                    }
                })
                .catch(function(err){
                    //that.BaseSet.linkLogin(that)
                })
            },
			handleConfirm(res){
			  let d=new Date(res);
			  this.pickerValue=this.BaseSet.getNowFormatDate(res)
			},
			chooseMsg(){
				this.radioVal==0?this.radioVal=1:this.radioVal=0;
			},
			publish(){
				if(this.patientId==0||this.patientId==''){
					this.$toast('请选择患者')
					return false
				}
				if(this.pickerValue=='请选择时间'){
					this.$toast('请选择时间')
					return false
				}
				if(this.contentWord==''){
					this.$toast('请添加详细描述')
					return false
				}
				var that = this
				var dt = {
					model:'user_account',
					content:that.contentWord,
					id:that.patientId,
					send_at:that.pickerValue,
					tosms:that.radioVal
				}
				that.$ajax.post('/user/sendnotification',dt)
				.then(function(res){
					if(res.data.status == 200){
						that.$toast('消息发布成功')
						that.$router.push({name:'Message'})
					}
				})
				.catch(function(err){
					that.baseset.linkLogin(that)
				})
			}
		},
		components:{headers}
	}
</script>
<style lang="scss" scoped>
	.publish-box{
		height: 100%;
		display: flex;
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
			border-bottom: 1px  solid #e5e5e5;
			.tip{
				line-height: 2.5rem;
				font-size: .7rem /* 14/20 */;
				color: #666;
			}
			>img{
				width: 2.5rem /* 50/20 */;
				height: 2.5rem /* 50/20 */;
				border-radius: 50%;
				margin-right: 0.5rem /* 10/20 */;
			}
			.name{
				font-size: 0.7rem /* 14/20 */;
				line-height: 2.5rem;
				color: #444;
			}
			.disease{
				font-size: 0.6rem /* 12/20 */;
				//line-height: 0.8rem /* 17/20 */;
				color: #ff4646;
			}
		}
		.doctor-info{
			border: none;
			margin-bottom: .5rem;
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
			position: relative;
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
			img{
				position: absolute;
				right: .5rem /* 10/20 */;
				bottom: .5rem /* 10/20 */;
				width: 1rem /* 20/20 */;
				height: 1rem /* 20/20 */;
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
