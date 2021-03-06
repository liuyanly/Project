/**
 * Created by Administrator on 2017/12/6.
 */
Vue.component('login-box',{
    template:'<div class="fade" v-show="loginType==1">'+
    '<div class="msg-box">'+
    '<div class="detail-box clearFix">'+
    '<img class="left" src="images/g1_bg1.png">'+
    '<form class="demoform1">'+
    '<div class="right relative content-box">'+
    '<img class="absolute" @click="cancel" src="images/f84_guanbi.png"/>'+
    '<p class="login-title">登录</p>'+
    '<p class="input-p clearFix"><img class="input-img left" src="images/g1_icon1.png"><input class="tel left" v-model="telNum" type="number" datatype="m" nullmsg="请填写手机号码" placeholder="手机号" errormsg="手机号码不正确"></p>'+
    '<p class="input-p clearFix"><img class="input-img left" src="images/g1_icon2.png"><input class="tel left" v-model="psw" type="password" datatype="n6-16| /\w{6,16}/i" placeholder="请输入密码" nullmsg="请输入密码" errormsg="密码不正确"></p>'+
    '<p class="forget-psw" onclick="window.location.href=\'../doctor/forget_password.html\'">忘记密码？</p>'+
'<p class="btn-login-p"><button type="button" class="login-btn" @click="nowLogin">登录</button> </p>'+
    '<p class="not-account clearFix"><span>没有账号，去</span><span class="c1" onclick="window.location.href=\'register.html\'">注册</span> </p>'+
    '</div>'+
    '</form>'+
    '</div>'+
    '</div>'+
    '</div>',
    props:[],
    data:function () {
     return{
         loginType:0,
         telNum:'',
         psw:'',
     }
    },
    created:function () {
        var that=this;
        window.eventHub.$on('needLogin',function (num) {
            console.log(1234);
            that.loginType=num;
        })
    },
    mounted:function () {
        if(this.loginType==1){
            localStorage.setItem('doctorId','');
            localStorage.setItem('doctorName','');
            localStorage.setItem('doctorInfo','');
        }
        $(".demoform1").Validform({
            tiptype:3
        });
    },
    methods:{
        nowLogin:function () {
            if(this.telNum==''){
                this.$alert('请输入手机号码', '提示', {
                    confirmButtonText: '确定',
                })
                return false;
            }
            if(this.telNum.length!=11){
                this.$alert('手机号码不正确', '提示', {
                    confirmButtonText: '确定',
                })
                return false;
            }
            if(this.psw==""){
                this.$alert('请输入密码', '提示', {
                    confirmButtonText: '确定',
                })
                return false;
            }
            var regExp=/^[a-zA-Z\d]{6,16}$/;
            if(!regExp.test(this.psw)){
                this.$alert('密码不正确', '提示', {
                    confirmButtonText: '确定',
                })
                return false;
            }

            var that=this;
            axios.post(assistantApi+'/auth/login',{
                username:that.telNum,
                password:that.psw,
                login_type:'phone'
            })
                .then(function (res) {
                    if(res.data.status==200){
                        that.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                        localStorage.setItem('doctorId',1);
                        localStorage.setItem('doctorName',res.data.data.nickname);
                        localStorage.setItem('doctorInfo',JSON.stringify(res.data.data));
                        window.location.reload();
                    }else{
                        that.$alert(res.data.message, '提示', {
                            confirmButtonText: '确定',
                            type:'error',
                        }).then(function () {

                        })
                    }
                })
                .catch(function (err) {
                    that.$alert(err.message, '提示', {
                        confirmButtonText: '确定',
                        type:'error',
                    }).then(function () {

                    })
                })
        },
        cancel:function () {
            this.loginType=0;
        },
    },

})