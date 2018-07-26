<template>
	<div class="my-data">
		<headers headName="住址"></headers>
		<div class="contentScollr">
		<div class="form-box">
			<div class="form">
				<ul>
					<li>
						<span class="name">所在城市</span>
						<input type="text" class="text time" placeholder="请选择" @click="openPopup(1)" v-model="city" readonly>
						<img src="../assets/images/c13_liebiao.png" class="arrow">
					</li>
					<li class="text-li">
						<textarea maxlength="200" placeholder="请输入详细地址" v-model="addressDetail">
						</textarea>
					</li>
				</ul>
			</div>
		</div>
		<p class="complete-btn" @click="complete()">
			保存
		</p>
		<mt-popup v-model="popupStatus" position="bottom">
			<div class="popup-box">
				<p class="head clear">
					<span class="cancel" @click="closePopup(1)">取消</span>
					<span class="title">城市</span>
					<span class="sure" @click="sureValue(1)">确认</span>
				</p>
				<mt-picker :slots="cityArr" valueKey="title" @change="onValuesChange1"></mt-picker>
			</div>
        </mt-popup>
	</div>
	</div>
</template>

<script>
//导入模板
import headers from '../components/Header.vue'
export default {
  	data () {
	    return {
			addressDetail:'',
			city: '',
			proviceId:'',
			cityId:'',
			areaId:'',
			changeCity:'',
			proviceTitle:'',
			cityeTitle:'',
			areaTitle:'',
			popupStatus: false,
			cityArr:[{
	  			flex:1,
	  		  	values:[],
	  		  	className:'slot1',
	  			textAlign: 'center',
	  	  	},{
	  			flex:1,
	  		  	values:[],
	  		  	className:'slot2',
	  			textAlign: 'center',
	  	  	},{
	  			flex:1,
	  		  	values:[],
	  		  	className:'slot3',
	  			textAlign: 'center',
	  	  	}],
		}
  	},
  	methods:{
	  	Back(){
	        //this.$toast('111')
			this.$router.go(-1)
	    },
		complete(){
			if(this.city==''){
				this.$toast('请选择城市');
				return false;
			}
			if(this.addressDetail==''){
				this.$toast('请输入详细的住址');
				return false;
			}
			var addressInfo={
				proviceId:this.proviceId,
				cityeId:this.cityId,
				areaId:this.areaId,
				proviceTitle:this.proviceTitle,
				cityeTitle:this.cityeTitle,
				areaTitle:this.areaTitle,
				detail:this.addressDetail
			}
			localStorage.setItem('addressInfo',JSON.stringify(addressInfo))
			this.$router.push({name:'MyData',params:{type:1}})
		},
		openPopup(num) {
			if(num==1){
				this.popupStatus=true;
			}else{
				//this.popupStatus2=true;
			}
        },
		closePopup(num){
			this.popupStatus=false;
		},
		onValuesChange1(picker, values) {
			this.BaseSet.setCity(this,picker, values)
	    },
		sureValue(num){
			var that=this
            that.popupStatus=false;
            if(that.changeCity[1]!=undefined&&that.changeCity[2]!=undefined){
                that.city = that.changeCity[0].title+' '+that.changeCity[1].title+' '+that.changeCity[2].title
				that.proviceId = that.changeCity[0].id
                that.cityId = that.changeCity[1].id
				that.areaId = that.changeCity[2].id
				that.proviceTitle=that.changeCity[0].title
				that.cityeTitle=that.changeCity[1].title
				that.areaTitle=that.changeCity[2].title
            }
		},
  	},
	mounted:function(){
		this.BaseSet.getAddress(this)
		if(localStorage.getItem('addressInfo')){
			var obj=JSON.parse(localStorage.getItem('addressInfo'))
			this.proviceId = obj.proviceId
			this.cityId = obj.cityId
			this.areaId = obj.areaId
			this.proviceTitle=obj.proviceTitle
			this.cityeTitle=obj.cityeTitle
			this.areaTitle=obj.areaTitle
			this.addressDetail=obj.detail
			this.city=this.proviceTitle+' '+this.cityeTitle+' '+this.areaTitle
		}
  	},
	components:{headers,}
}
</script>

<style lang="scss" scoped>
	.my-data{
	    width: 100%;
		display: flex;
		height: 100%;
		flex-direction: column;
		.contentScollr{
			flex: 1;
			overflow: scroll;
			-webkit-overflow-scrolling:touch;
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
		.head-top{
			padding: .5rem /* 21/40 */ .8rem /* 30/40 */;
			background: #fff;
			margin-bottom: .6rem /* 22/40 */;
			.name{
				line-height: 2.5rem /* 98/40 */;
				font-size: .7rem /* 28/40 */;
				color: #333;
				float: left;
			}
			.head-img{
				width: 2.5rem /* 98/40 */;
				height: 2.5rem /* 98/40 */;
				border-radius: 50%;
				float: left;
				margin-right: .2rem /* 7/40 */;
				margin-left: 12.7rem /* 516/40 */;
			}
			.btn-img{
				vertical-align: middle;
				float: right;
				width: .3rem /* 14/40 */;
				height: .7rem /* 26/40 */;
				margin-top: .9rem;
			}
		}
	    .form-box{
	        width: 100%;
	        overflow: hidden;
	        background-color: #fff;
	        .form{
	           width: 100%;
	           overflow: hidden;
	           li{
	                width: 100%;
	                box-sizing: border-box;
	                padding: 0 .75rem;
	                height: 2.25rem;
	                line-height: 2.25rem;
	                overflow: hidden;
	                position: relative;
	                border-bottom: #e5e5ee 1px solid;
					&:last-child{
						border-bottom: none;
					}
					.name{
	                    font-size: .7rem;
	                    color: #333333;
	                    float: left;
	                }
	                .text{
	                    float: right;
	                    font-size: .7rem;
	                    color: #333333;
	                    //margin-top: .65rem;
						line-height: 2.25rem /* 90/40 */;
	                    text-align: right;
	                    width: 12.5rem;
						margin-right: .5rem;
	                }
	                .arrow{
	                    width: .3rem;
	                    height: .6rem;
	                    position: absolute;
	                    right: .75rem;
	                    top: 50%;
	                    margin-top: -0.3rem;
	                }
					textarea{
						margin: .8rem /* 30/40 */;
						width: calc(100% - 2.6rem);
						height: 6rem /* 300/40 */;
						background: #eee;
						padding: .5rem /* 20/40 */;
						padding-bottom: 1rem /* 40/40 */;
						font-size: .7rem /* 28/40 */;
						color: #333;
						border-radius: .3rem /* 10/40 */;
						resize: none;
					}
					textarea::-webkit-input-placeholder{
	                    color: #999999;
	                }
	                .text::-webkit-input-placeholder{
	                    color: #999999;
	                }
	                .word-num{
	                	position: absolute;
						right: 1.3rem;
						bottom: 1.2rem;
						font-size: .7rem /* 28/40 */;
						color: #999;
	                }
	            }
				.text-li{
					height: auto;
					line-height: auto;
					padding: 0;
				}
	        }
	    }
		.complete-btn{
			width: 17.2rem /* 688/40 */;
			height: 2rem /* 82/40 */;
			line-height: 2rem /* 82/40 */;
			text-align: center;
			background: #4cc6d8;
			border-radius: .3rem /* 10/40 */;
			color: #fff;
			font-size: .8rem /* 32/40 */;
			margin: 0 auto;
			margin-top: 1.5rem /* 60/40 */;
		}
	}
</style>
