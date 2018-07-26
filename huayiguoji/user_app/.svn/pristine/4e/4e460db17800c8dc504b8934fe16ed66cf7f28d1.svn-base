<template>
	<div class="add-card">
		<headers headName='添加银行卡'></headers>
		<div class="contentScollr">
        <div class="form_box">
            <div class="form">
                <ul>
                    <li>
                        <span class="name">持卡人</span>
                        <input type="text" v-model="userName" class="text" placeholder="请输入持卡人姓名">
                    </li>
                    <li>
                        <span class="name">卡号</span>
                        <input type="number" v-model="cardNum" class="text" placeholder="请输入银行卡号">
                    </li>
                    <li>
                        <span class="name">所属银行</span>
                        <input type="text" class="text time" placeholder="请选择" @click="openPopup" v-model="bankValue" readonly>
                        <img src="../assets/images/c13_liebiao.png" class="arrow">
                    </li>
					<li>
                        <span class="name">开户行</span>
                        <input type="text" v-model="bankAd" class="text" maxlength="20" placeholder="请输入开户行">
                    </li>
                </ul>
            </div>
        </div>
        <div class="up_btn" @click="addBtn()">添加</div>
        <mt-popup v-model="popupStatus" position="bottom">
			<div class="popup-box">
				<p class="head clear">
					<span class="cancel" @click="closePopup()">取消</span>
					<span class="title">银行</span>
					<span class="sure" @click="sureValue()">确认</span>
				</p>
				<mt-picker :slots="bankArr" valueKey="title" @change="onValuesChange"></mt-picker>
			</div>

        </mt-popup>
	</div>
	</div>
</template>
<script>
//导入模板
import headers from "../components/Header.vue";
export default {
  data () {
    return {
      userName:'',
      popupStatus:false,
	  bankValue:'',
	  bankId:'',
	  bankChangeValue:'',
	  cardNum:'',
	  bankAd:'',
	  bankArr:[{
			flex:1,
		  	values:[],
		  	className:'slot1',
			textAlign: 'center',
	  	}]
    }
  },
  mounted(){
	  //设置token
	  this.BaseSet.getToken(this)
	  this.getCard()
  },
  methods: {
        openPopup() {
            this.popupStatus=true;
        },
		closePopup(){
			this.popupStatus=false;
		},
		onValuesChange(picker, values) {
		    this.bankChangeValue = values;
	    },
		sureValue(){
			this.popupStatus=false;
			this.bankValue = this.bankChangeValue[0].title
			this.bankId = this.bankChangeValue[0].id
		},
		getCard(){
			var that=this
			that.$ajax.get('/category?e_s[module]=bank')
			.then(function(res){
				console.log(res.data)
				if(res.data.status==200){
					that.bankArr[0].values=res.data.data
				}else{
					that.$toast(res.data.message)
				}
			})
			.catch(function(err){
				that.$toast(err)
			})
		},
		addBtn(){
			if(this.userName==''){
				this.$toast('请输入持卡人姓名');
				return false;
			}
			if(this.cardNum==''){
				this.$toast('请输入银行卡号');
				return false;
			}
			if(this.cardNum.length!=15&&this.cardNum.length!=19){
				this.$toast('银行卡号格式不正确');
				return false;
			}
			if(this.bankValue==''){
				this.$toast('请选择所属银行');
				return false;
			}
			if(this.bankName==''){
				this.$toast('请输入开户行');
				return false;
			}
			var that=this;
			this.$ajax.post('/bank',{
				title:that.bankAd,
				realname:that.userName,
				cardno:that.cardNum,
				category_id:that.bankId,
				_me:'user-api'
			})
			.then(function(res){
				console.log(res);
				if(res.data.status==200){
					that.$toast("银行卡添加成功！")
					setTimeout(function(){
						that.$router.push({name:'WithdrawalsHaveCard',params:{id:1,status:1}});
					},1500)
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
  components: { headers},
  //请求数据接口
}
</script>

<style lang="scss" scoped>
.add-card{
    width: 100%;
	display: flex;
	height: 100%;
	flex-direction: column;
	.contentScollr{
		flex: 1;
		overflow: auto;
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
    .form_box{
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
                .tag{
                    float: right;
                    font-size: .7rem;
                    color: #333333;
                }
                .text{
                    float: right;
                    font-size: .7rem;
                    color: #333333;
                    margin-top: .65rem;
                    text-align: right;
                    width: 12.5rem;
                }
                .time{
                    margin-right: .875rem;
                }
                .text::-webkit-input-placeholder{
                    color: #999999;
                }
                .arrow{
                    width: .3rem;
                    height: .6rem;
                    position: absolute;
                    right: .75rem;
                    top: 50%;
                    margin-top: -0.3rem;
                }
            }
        }
        .pic_box{
            width: 100%;
            overflow: hidden;
            box-sizing: border-box;
            padding: 0 .75rem;
            padding-bottom: 1.25rem;
            .title{
                width: 100%;
                color: #999999;
                font-size: .7rem;
                margin-top: 1.35rem;
            }
            li{
                width: 3.95rem;
                height: 3.95rem;
                overflow: hidden;
                float: left;
                margin-right: .2rem;
                position: relative;
                margin-top: .55rem;
                img{
                   width: 3.95rem;
                    height: 3.95rem;
                    object-fit: cover;
                }
                .close{
                    position: absolute;
                    width: 1.25rem;
                    height: 1.25rem;
                    right: .125rem;
                    top: .125rem
                }
            }
        }
    }
    .up_btn{
        width: 17.2rem;
        height: 2.05rem;
        text-align: center;
        margin:1.5rem auto;
        background-color: #4DC6D8 ;
        color: #ffffff;
        line-height: 2.05rem;
        font-size: .8rem;
        border-radius:.25rem;
    }
}
</style>
