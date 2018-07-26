<template>
	<div class="publish-box">
		<headers headName="发布干预"></headers>
		<div class="contentScollr">
		<div class="user-info clear">
			<img :src="headImg" class="left" />
			<div class="left">
				<p class="name">
					{{userName}}
				</p>
				<p class="sex">
					{{sex}}&emsp;{{age}}岁
				</p>
				<p class="disease">
					症状:{{illness}}
				</p>
			</div>
		</div>
		<div class="choose-time clear" @click="openPopup()">
			<div class="left time-div">
				{{pickerValue}}
			</div>
			<img class="xiala-img" src="../images/a19_liebiao@2x.png" />
		</div>
		<div class="txt-box">
			<textarea maxlength="200" v-model="contentWord" placeholder="请添加详细描述"></textarea>
			<img src="../assets/images/d1_tianjia.png" @click="chooseTem()" />
		</div>
		<p class="sure-btn" @click="publish()">
			确认
		</p>
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
	import headers from '../components/Header';
	export default {
		data(){
			return{
				temId:this.$route.params.id,
				id:this.BaseSet.getInfo('vipId'),
				pickerValue:'选择干预',
				contentWord:'',
				popupStatus: false,
				changeInter:'',
				wayArr:[{
		  			flex:1,
		  		  	values:[],
		  		  	className:'slot1',
		  			textAlign: 'center',
		  	  	}],
				userName:'',
				sex:'',
				age:'',
				illness:'',
				headImg:'',
				interId:'',
			}
		},
		mounted(){
			this.BaseSet.getToken(this)
			this.getData()
			this.getIntervene()
			this.pickerValue = this.$route.params.title
			if(this.$route.params.id == 0){
				this.BaseSet.setInfo('interventionContent','')
			}else{
				this.interId = this.$route.params.id
			}
			if(this.BaseSet.getInfo('interventionContent')){
				this.contentWord = this.BaseSet.getInfo('interventionContent').replace(/<\/?(img|a|p|br)[^>]*>/gi, '')
			}
		},
		methods:{
			chooseTem(){
				if(this.interId != ''){
					this.$router.push({name:'ChooseTemplate',params:{id:this.interId}})
				}else{
					this.$toast('请先选择干预类型')
					this.popupStatus=true
				}
			},
			getData(){
				this.$ajax.get('/user/patient/'+this.id)
				.then((res)=>{
					if(res.data.status == 200){
						this.userName = res.data.data.realname
						this.sex = res.data.data.translates.sex
						this.age = res.data.data.translates.age
						this.illness = res.data.data.illness
						this.headImg = res.data.data.translates.avatar_img
					}
				})
				.catch((err)=>{
					this.BaseSet.linkLogin(this)
				})
			},
			getIntervene(){
				this.$ajax.get('/category?e_s[module]=intervene')
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
			publish(){
				var that = this;
				if(this.interId==0){
					this.$toast('请选择干预类型')
					return false
				}
				if(this.contentWord==''){
					this.$toast('请添加干预内容')
					return false
				}
				this.BaseSet.getToken(this)
				this.$ajax.post('/intervene',{
					user_id:this.id,
					category_id:this.interId,
					content:this.contentWord,
				})
				.then((res)=>{
					if(res.data.status == 200){
						that.$toast('干预发布成功')
						setTimeout(function(){
							that.$router.push({name:'Intervention',params:{}})
						},1000)
					}
				})
				.catch((err)=>{

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
		height: 100%;
    	display: flex;
    	flex-direction: column;
    	.contentScollr{
    		flex: 1;
    		overflow: scroll;
    		-webkit-overflow-scrolling:touch;
    		position: relative;
    	}
		.mint-popup-bottom{
			width: 100%;
		}
		.popup-box{
			width: 100%;
			.head{
				line-height: 3rem /* 120/40 */;
				padding: 0 .8rem /* 33/40 */;
				border-bottom: 1px solid #e5e5e5;
				.cancel{
					font-size: .8rem /* 30/40 */;
					color: #999;
					float: left;
				}
				.sure{
					font-size: .8rem /* 30/40 */;
					color: #999;
					float: right;
				}
				.title{
					font-size: .9rem /* 36/40 */;
					color: #4CC6D8;
					float: left;
					width: 13.8rem;
					text-align: center;
				}
			}
			.popup-list{
				padding-top: 5.2rem /* 208/40 */;
				li{
					line-height: 1.6rem /* 64/40 */;
					text-align: center;
					font-size: .9rem /* 36/40 */;
					color: #333;
					border-bottom: 1px solid #e5e5e5;
					&:first-child{
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
			padding: .9rem /* 36/40 */ 0.8rem;
			position: relative;
			textarea{
				width: 15.7rem /* 345/20 */;
				height: 6.5rem /* 150/20 */;
				padding: 0.5rem /* 10/20 */ 0.8rem /* 15/20 */;
				resize: none;
				border-radius: 0.3rem /* 5/20 */;
				font-size: 0.7rem /* 14/20 */;
				color: #333;
				background: #eee;
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
