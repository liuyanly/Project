<template>
	<div class="d5">
		<headers headName="在线咨询"></headers>
		<publicPhoto :name='name' :sex='sex' :age='age'></publicPhoto>
		<!--对话内容-->
		<div class="y-back-ee y-clear duihua" v-for="li in comments">
			<div class="ziji" v-if="li.type=='me'">
				<span class="aui-text-center duihua-riqi">02月09日 12:00</span>
				<div class="ziji_inner y-clear">
					<div class="aui-pull-left duihua">{{li.commentsInner}}</div>
					<div class="y-touxiang-60 aui-pull-left"><img src="../assets/images/a_image1.png" /></div>
				</div>
			</div>
			<div class="duifang" v-if="li.type=='you'">
				<span class="aui-text-center duihua-riqi">02月09日 12:00</span>
				<div class="ziji_inner y-clear">
					<div class="y-touxiang-60 aui-pull-left"><img src="../assets/images/a_image1.png" /></div>
					<div class="aui-pull-left duihua">{{li.commentsInner}}</div>
				</div>
			</div>
		</div>
		<!--输入框-->
		<div class="d5_shurukuang y-clear">
			<div class="aui-pull-left luyin"><img src="../images/a9_1yuyin@2x.png" /></div>
			<div class="aui-pull-left shurukuang">
				<input @keyup.enter="submitComments" v-model="pinglun" placeholder="请输入评论内容~" />
			</div>
			<div class="aui-pull-right tianjia"><img src="../images/a9_1tianjia@2x.png" /></div>
		</div>
	</div>
</template>

<script>
	import headers from '../components/Header'
	import publicPhoto from '@/components/parts/photo'

	export default {
		name: 'd4twxq',
		data() {
			return {
				//				submitComments:false,
				pinglun: '',
				title: "在线咨询",
				name: '',
				sex: '',
				age: '',
				// zijipic: '/src/images/pic_h.png',
				comments: [{
						commentsInner: '你好,你发个图,我看看具体情况',
						type: 'you',
					},
					{
						commentsInner: '手指脱皮是什么原因？每年的这个季节 都会脱皮，是不是人们常说的血热，需 要涂抹什么药膏，能治好不让脱皮吗？',
						type: 'me',
					},
				]
			}
		},
		components: {
			headers,
			publicPhoto,
		},
		methods: {
			//添加评论
			submitComments: function() {
				if(this.pinglun == '') {
					this.$toast('请输入评论内容');
				} else {
					this.comments.push({
						commentsInner: this.pinglun,
						type: 'me',
					})
					this.pinglun = ''
				}
				//
			},

		}

	}
</script>

<style scoped>

	.d5 {
		/*padding-top: 2.2rem;*/
		height: 100%;
		background: #f5f5f5;
		overflow-y: auto;
		padding-bottom: 2.95rem;
	}
	.kong_88{
		height: 2.2rem;
	}
.duihua {
		/*width: 11rem;*/
		/*min-height: 1.05rem;*/
		background: rgba(76, 198, 216, 1);
		position: relative;
		border-radius: 0.25rem;
		padding: 0.375rem;
		color: #fff;
		font-size: 0.7rem;
		/*margin: 0 auto;*/
	}
	.duifang .duihua {
		width: 12rem;
		background: #fff;
		color: #333;
	}

	.ziji_inner {
		margin: 0 auto;
		width: 15.3rem;

	}
	.ziji .duihua {
		width: 12rem;
		margin-right: 0.825rem;
	}
	.duifang .duihua {
		margin-left: 0.825rem;
	}
	.duihua-riqi {
		text-align: center;
		display: block;
		width: 6.45rem;
		/*padding: 0.25rem 1.1rem;*/
		background: #fff;
		border-radius: 0.5rem;
		font-size: 0.55rem;
		color: #666;
		margin: 0.75rem auto;
	}
	.ziji .duihua:after {
		content: '';
		border-top: 0.55rem solid transparent;
		border-left: 0.8rem solid rgba(76, 198, 216, 1);
		border-bottom: 0.55rem solid transparent;
		position: absolute;
		top: 0.325rem;
		right: -0.55rem;
	}
	.duifang .duihua:after {
		content: '';
		border-top: 0.55rem solid transparent;
		border-right: 0.8rem solid #fff;
		border-bottom: 0.55rem solid transparent;
		position: absolute;
		top: 0.325rem;
		left: -0.55rem;
	}
	.y-back-ee {
		background: #F5F5F5;
		/*height: 100%;*/
	}
	.luyin, .tianjia {
		width: 1.25rem;
		height: 1.25rem;
		border-radius: 100%;
		margin-top: 0.15rem;
	}
	.luyin img, .tianjia img {
		width: 100%;
		height: 100%;
		border-radius: 100%;
	}
	.d5_shurukuang {
		/*padding: 0.4rem 0.6rem;*/
		padding: 0.4rem 0.6rem 0.4rem 0.6rem;
		background: #fff;
		width: 94%;
		position: fixed;
		bottom: 0;
		border-top: 1px solid #dcdcdc;
	}
	.shurukuang {
		margin: 0 auto;
		display: inline-block;
		width: 74%;
		height: 1.5rem;
		background: rgba(238, 238, 238, 1);
		position: fixed;
		left: 50%;
		margin-left: -37%;
		border-radius: 0.25rem;
	}
	.shurukuang input {
		display: inline-block;
		width: 95%;
		height: 100%;
		margin: 0 auto;
		background: rgba(238, 238, 238, 1);
		padding: 0 0.45rem;
		border-radius: 0.25rem;
		font-size: 0.75rem;
	}

</style>
