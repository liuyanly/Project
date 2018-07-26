<template>
	<div class="my-data">
		<div class="all_header">
            <div class="back" @click="Back">
                <img src="../assets/images/b1_fanhui.png"/>
            </div>
            <div class="name">学术、研究成果</div>
            <div class="right" @click="complete()">保存</div>
        </div>
		<div class="contentScollr">
			<div class="form-box">
				<div class="form">
					<ul>
						<li>
							<textarea maxlength="200" placeholder="请输入详细内容" v-model="achievements" @keyUp="numChange()">
							</textarea>
							<span class="word-num">文字上限200字</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
//导入模板
export default {
  	data () {
	    return {
			achievements:'',
			wordNum:200,
		}
  	},
  	methods:{
	  	Back(){
	        //this.$toast('111')
			this.$router.go(-1)
	    },
		numChange(){
			this.wordNum = 200 - this.achievements.length
		},
		complete(){
			if(this.achievements==''){
				this.$toast('请输入您的学术、研究成果');
				return false;
			}
			window.sessionStorage.setItem('case',this.achievements)
			this.$router.push({name:'MyData'})
		},
  	},
	mounted:function(){
		if(sessionStorage.getItem('case')){
			this.achievements = sessionStorage.getItem('case')
			this.numChange()
		}
  	}
}
</script>

<style lang="scss" scoped>
.all_header{
		width: 100%;
		height:2.2rem;
		background-color: #4CC6D8;
		overflow: hidden;
		text-align: center;
		position: relative;
		line-height: 2.2rem;
		top: 0;
		left: 0;
		z-index: 999;
	}
	.all_header .back{
		width: 0.475rem;
		height: 0.8rem;
		position: absolute;
		left: 0.75rem;
		top: 0.65rem;
	}
	.all_header .back img{
		width: 0.475rem;
		height: 0.8rem;
	}
	.all_header .name{
		color: #ffffff;
		font-size: 0.9rem;
    }
    .all_header .right{
		position: absolute;
		right: 0.75rem;
        top:0;
        color: #ffffff;
		font-size: 0.75rem;
		img{
			width: .9rem /* 37/40 */;
			height: .9rem /* 37/40 */;
			vertical-align: middle;
		}
    }
	.my-data{
	    height: 100%;
		display: flex;
		flex-direction: column;
		.contentScollr{
			flex: 1;
			overflow: scroll;
			-webkit-overflow-scrolling:touch;
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
	                //padding: 0 .75rem;
	                //height: 2.25rem;
	                //line-height: 2.25rem;
	                overflow: hidden;
	                position: relative;
	                border-bottom: #e5e5ee 1px solid;
					&:last-child{
						//border-bottom: none;
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
	        }
	    }
	}
</style>
