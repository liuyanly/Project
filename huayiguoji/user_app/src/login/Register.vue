<template>
	<div class="find-password">
		<headers headName="注册"></headers>
		<div class="contentScollr">
		<div class="form-box">
			<ul class="form-list">
				<li>
					<input type="number" class="input-p" placeholder="请输入手机号" v-model="telNum" />
				</li>
				<li>
					<input type="number" class="input-p" placeholder="验证码" v-model="codeNum" />
					<span :class="{disabled:btnType==1}" class="code-btn" @click="getCode()">{{codeContent}}</span>
				</li>
				<li>
					<input type="password" class="input-p" v-model="password" placeholder="6-16位字母、数字密码" />
				</li>
				<li>
					<input type="password" class="input-p" placeholder="再次输入密码" v-model="repeatPassword" />
				</li>
			</ul>
			<p class="agree-p">
				<span class="tip">注册表明已阅读并接受<router-link :to="{ name: 'ServerClause', params: {} }"><span class="c1">“用户服务条款”</span></router-link>
				</span>
			</p>
			<p class="sure-btn" @click="sureEdit()">
				注册
			</p>
		</div>
		<p class="bottom-p">
			已有账户了？
			<router-link :to="{ name: 'Login', params: {} }"><span class="c1">去登录</span></router-link>
		</p>
	</div>
	</div>

</template>
<script>
	import headers from "../components/Header"
	export default {
		data() {
			return {
				telNum: '',
				codeNum: '',
				password: '',
				repeatPassword: '',
				codeContent: '获取验证码',
				time: 60,
				btnType: 0,
				agreeValue: 0,
			}
		},
		mounted(){
			this.BaseSet.setInfo('userInfo','')
		},
		methods: {
			//验证码倒计时
			timing() {
				var that = this;
				if(this.time == 0) {
					this.btnType = 0;
					this.codeContent = "获取验证码";
				} else {
					this.btnType = 1;
					this.codeContent = this.time + '秒';
					this.time--;
					setTimeout(function() {
						that.timing();
					}, 1000)
				}
			},
			getCode() {
				var that = this;
				if(this.telNum != '' && this.telNum.length == 11&&this.time==60) {
					this.timing();
					//请求接口，获取验证码
					var that = this;
					this.$ajax.post('/auth/code/register', {
							username: that.telNum
						})
						.then(function(res) {
							var data = res.data;
							if(data.status == 422) {
								that.$toast(data.message);
							}
							//							console.log(res);
						})
						.catch(function(err) {

							//							console.log(err);
						});
				} else{
//					this.$toast('手机号码不正确');
//					return false;
				}
			},
			sureEdit() {
				var that = this;
				if(this.telNum == '') {
					this.$toast('请输入手机号码')
					return false;
				}
				if(this.telNum.length != 11) {
					this.$toast('手机号码格式不正确')
					return false;
				}
				if(this.codeNum == "") {
					this.$toast('请输入验证码')
					return false;
				}
				if(this.codeNum.length != 4) {
					this.$toast('验证码不正确')
					return false;
				}
				if(this.password == "") {
					this.$toast('请输入密码')
					return false;
				}
				const regExp = /^[a-zA-Z\d]{6,16}$/;
				if(!regExp.test(this.password)) {
					this.$toast('密码格式不正确')
					return false;
				}
				if(this.repeatPassword == "") {
					this.$toast('请重复密码')
					return false;
				}
				if(!regExp.test(this.repeatPassword) && this.password != this.repeatPassword) {
					this.$toast('密码不一致')
					return false;
				}
				//找回密码
				var that = this;
				this.$ajax.post('/auth/register', {
						username: that.telNum,
						password: that.password,
						code: that.codeNum,
					})
					.then(function(res) {
						var data = res.data;
						if(data.status == 422) {
							that.$toast(data.message)
						}else if(data.status == 200){
							that.$toast('注册成功，立即去登录！')
							setTimeout(function(){
								that.$router.push({name:'Login'})
							},1000)
						}else{
							that.$toast(data.message)
						}
					})
					.catch(function(err) {

						//							console.log(err);
					});
			},
		},
//
		components: {
			headers
		},
	}
</script>
<style lang="scss" scoped>
	input:-ms-input-placeholder {
		color: #999;
		font-size: .7rem/* 28/40 */
		;
	}
	input::-moz-placeholder {
		color: #999;
		font-size: .7rem/* 28/40 */
		;
	}
	input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #999;
		font-size: .7rem/* 28/40 */
		;
	}
	input::-webkit-input-placeholder {
		color: #999;
		font-size: .7rem/* 28/40 */
		;
	}
	.find-password {
		position: relative;
		display: flex;
		height: 100%;
		flex-direction: column;
		.contentScollr{
			flex: 1;
			overflow: auto;
			-webkit-overflow-scrolling:touch;
		}
		.form-box {
			margin-top: .5rem;
			.form-list {
				background: #fff;
				li {
					padding: 0 .8rem/* 30/40 */
					;
					border-bottom: 1px solid #e5e5e5;
					line-height: 2.3rem/* 90/40 */
					;
					position: relative;
					.input-p {
						line-height: 2.3rem/* 90/40 */
						;
						font-size: #333;
						font-size: .7rem/* 28/40 */
						;
						color: #333;
						width: 100%;
					}
					.code-btn {
						display: block;
						position: absolute;
						height: 1.6rem/* 66/40 */
						;
						width: 4.1rem/* 164/40 */
						;
						border-radius: .3rem/* 10/40 */
						;
						line-height: 1.6rem;
						background: #4cc6d8;
						text-align: center;
						color: #fff;
						font-size: .7rem/* 28/40 */
						;
						right: .8rem/* 30/40 */
						;
						top: .3rem/* 12/40 */
						;
					}
					.disabled {
						background: #999;
					}
				}
			}
		}
		.c1 {
			color: #4cc6d8;
		}
		.agree-p {
			margin: 1.4rem/* 56/40 */
			.8rem/* 30/40 */
			;
			position: relative;
			padding-left: 1.6rem/* 64/40 */
			;
			line-height: 1.3rem/* 50/40 */
			;
			img {
				width: 1.3rem/* 50/40 */
				;
				height: 1.3rem/* 50/40 */
				;
				position: absolute;
				left: 0;
			}
			input {
				width: 1.3rem;
				height: 1.3rem;
				position: absolute;
				left: 0;
				z-index: 10;
			}
			.tip {
				font-size: .7rem/* 28/40 */
				;
				color: #666;
			}
		}
		.sure-btn {
			width: 17.2rem/* 688/40 */
			;
			height: 2rem/* 82/40 */
			;
			background: #4cc6d8;
			border-radius: .3rem/* 10/40 */
			;
			text-align: center;
			line-height: 2rem;
			color: #fff;
			font-size: .8rem/* 32/40 */
			;
			margin: 0 auto;
			margin-top: 1.5rem/* 60/40 */
			;
		}
		.bottom-p {
			position: absolute;
			text-align: center;
			font-size: .7rem/* 28/40 */
			;
			color: #999;
			bottom: .9rem/* 36/40 */
			;
			left: 6.3rem/* 250/40 */
			;
		}
	}
</style>
