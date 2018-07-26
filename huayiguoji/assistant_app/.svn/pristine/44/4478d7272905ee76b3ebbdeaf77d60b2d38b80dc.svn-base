<template>
	<div class="publish-box">
		<headers headName="发布随访"></headers>
		<div class="contentScollr">
		<div class="user-info clear">
			<img :src="headImg" class="left" />
			<div class="left">
				<p class="name">
					{{userName}}
				</p>
				<p class="sex">
					{{sex}}&emsp;{{age}}
				</p>
				<p class="disease">
					症状:{{illness}}
				</p>
			</div>
		</div>
		<div class="choose-time1 clear" @click="openPopup()">
			<div class="left time-div">
				{{pickerValue1}}
			</div>
			<img class="xiala-img" src="@/assets/images/a19_liebiao@2x.png" />
		</div>
		<div class="choose-time clear" @click="openPicker()">
			<img src="@/assets/images/a42_icon1.png" class="left" />
			<div class="left time-div">
				{{pickerValue}}
			</div>
		</div>
		<div class="txt-box">
			<textarea maxlength="200" v-model="contentWord" placeholder="请添加详细描述"></textarea>
			<img src="@/assets/images/b5_icon1.png" @click="chooseTem()" />
		</div>
		<!-- <p class="msg-notice clear" @click="chooseMsg()">
			<img src="../assets/images/c14_xz.png" v-if="radioVal==1" />
			<img src="../assets/images/c73_xz.png" v-if="radioVal==0" />
			<span>选择发送短信</span>
		</p> -->
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
		<mt-popup v-model="popupStatus" position="bottom">
			<div class="popup-box">
				<p class="head clear">
					<span class="cancel" @click="closePopup(1)">取消</span>
					<span class="title">选择干预</span>
					<span class="sure" @click="sureValue(1)">确认</span>
				</p>
				<mt-picker :slots="wayArr" valueKey="name" @change="onValuesChange1"></mt-picker>
			</div>
        </mt-popup>
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
				id:'',
				pickerValue:'请选择随访时间',
				pickerValue1:'请选择随访类型',
				startDate: new Date(),
				popupStatus: false,
				contentWord:'',
				radioVal:0,
				userName:'',
				wayArr:[{
		  			flex:1,
		  		  	values:[],
		  		  	className:'slot1',
		  			textAlign: 'center',
		  	  	}],
				headImg:'',
				sex:'',
				age:'',
				illness:'',
				interId:'',
			}
		},
		mounted(){
			this.id=this.BaseSet.getInfo('patientId')
			this.BaseSet.getToken(this)
			this.getData()
			this.getFollow();
			this.pickerValue1 = this.$route.params.title
			if(this.$route.params.id == 0){
				this.BaseSet.setInfo('followContent','')
			}else{
				this.interId = this.$route.params.id
			}
			if(this.BaseSet.getInfo('followContent')){
				this.contentWord = this.BaseSet.getInfo('followContent').replace(/<\/?(img|a|p|br)[^>]*>/gi, '')
			}
		},
		methods:{
			chooseTem(){
				if(this.interId != ''){
					this.$router.push({name:'ChooseTemplate',params:{id:this.interId}})
				}else{
					this.$toast('请选择随访类型')
					this.popupStatus=true
				}
			},
			getFollow(){
				this.$ajax.get('/category?e_s[module]=follow')
				.then((res)=>{
					if(res.data.status == 200){
						for(var i = 0;i<res.data.data.length;i++){
							var tem = {
								id:res.data.data[i].id,
								name:res.data.data[i].title
							}
							this.wayArr[0].values.push(tem)
						}
					}
				})
				.catch((err)=>{
					this.BaseSet.linkLogin(this)
				})
			},
			openPicker() {
				this.$refs.picker.open();
			},
			handleConfirm(res){
			  let d=new Date(res);
			  this.pickerValue=this.BaseSet.getNowFormatDate(d)
			},
			chooseMsg(){
				this.radioVal==0?this.radioVal=1:this.radioVal=0;
			},
			getData(){
				var that=this
				that.$ajax.get('/user/'+that.id)
				.then(function(res){
					if(res.data.status==200){
					  that.userName=res.data.data.realname
					  that.sex=res.data.data.translates.sex
					  that.age = res.data.data.translates.age
					  that.headImg=res.data.data.translates.avatar_img
					  that.illness = res.data.data.illness
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
			publish(){
				if(this.pickerValue=='请选择随访时间'){
					this.$toast('请选择随访时间')
					return false
				}
				if(this.pickerValue1=='请选择随访类型'){
					this.$toast('请选择随访类型')
					return false
				}
				if(this.contentWord==''){
					this.$toast('请添加详细描述')
					return false
				}
				var that=this
				that.$ajax.post('/visit',{
					user_id:that.BaseSet.getInfo('patientId'),
					content:that.contentWord,
					visited_at:that.pickerValue,
					tosms:that.radioVal,
				})
				.then(function(res){
					if(res.data.status==200){
	  				  console.log(res.data.data)
					  that.$router.push({name:'Follow'})
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
			openPopup(num) {
				this.popupStatus=true;
	        },
			closePopup(num){
				this.popupStatus=false;
			},
			onValuesChange1(picker, values) {
				if(values[0]){
					this.changeInter = values
				}
		    },
			sureValue(num){
				this.popupStatus=false;
				this.pickerValue=this.changeInter[0].name;
				this.interId = this.changeInter[0].id;
			},
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
		.mint-popup-bottom {
    width: 100%;
  }
  
		.popup-box {
    width: 100%;
    .head {
      line-height: 3rem /* 120/40 */;
      padding: 0 0.8rem /* 33/40 */;
      border-bottom: 1px solid #e5e5e5;
      .cancel {
        font-size: 0.8rem /* 30/40 */;
        color: #999;
        float: left;
      }
      .sure {
        font-size: 0.8rem /* 30/40 */;
        color: #999;
        float: right;
      }
      .title {
        font-size: 0.9rem /* 36/40 */;
        color: #4cc6d8;
        float: left;
        width: 13.8rem;
        text-align: center;
      }
    }
    .popup-list {
      padding-top: 5.2rem /* 208/40 */;
      li {
        line-height: 1.6rem /* 64/40 */;
        text-align: center;
        font-size: 0.9rem /* 36/40 */;
        color: #333;
        border-bottom: 1px solid #e5e5e5;
        &:first-child {
          border-top: 1px solid #e5e5e5;
        }
      }
    }
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
		.choose-time1{
			background: #fff;
			padding: 0 /* 20/20 */ 0.5rem /* 10/20 */;
			margin-bottom: 0.5rem /* 10/20 */;
			.xiala-img{
				float: right;
				width: .3rem /* 14/40 */;
				height: .7rem /* 26/40 */;
				margin-top: .9rem /* 35/40 */;
			}
			.time-div{
				float: left;
				line-height: 2.5rem /* 50/20 */;
				font-size: 0.7rem /* 14/20 */;
				color: #444;
			}
		}
		.txt-box{
			background: #fff;
			margin: 0.1rem /* 3/20 */ 0.8rem /* 15/20 */ 0.6rem /* 11/20 */ 0.8rem /* 15/20 */;
			position: relative;
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
				width: 1.1rem /* 45/40 */;
				height: 1.1rem /* 45/40 */;
				position: absolute;
				bottom: 1.5rem;
				right: 1.1rem /* 44/40 */;
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
