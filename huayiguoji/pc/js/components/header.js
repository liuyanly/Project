/**
 * Created by Administrator on 2017/11/16.
 */
// 获取url参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
window.eventHub = new Vue();
var id=sessionStorage.getItem('doctorId');
Vue.component('my-header',{
    props: ['active'],
    template: '<header class="container">'+
    '<div class="login-area clearFix">'+
    '<p class="msg-center right">消息中心</p>'+
    '<p class="login-p right">'+
    '<a v-if="doctorId ==\'\'" href="#" class="login-btn" @click="login()">登录</a>'+
    '<span v-if="doctorId !=\'\'" class="already-login">Hi！毛杜拉</span>'+
    '<a href="#" v-if="doctorId ==\'\'" class="register-btn">注册</a>'+
    '<span v-if="doctorId !=\'\'" @click="exitLogin()" class="exit-login">退出</span>'+
    '<span v-if="active == 3" class="upload">上传档案</span>'+
    '</p>'+
    '</div>'+
    '<nav class="nav clearFix">'+
    '<div class="logo-box left"><img class="logo" src="../images/a1_logo.png"><span class="logo-name">华医国际</span></div>'+
    '<ul class="nav-list right">'+
    '<li v-for="(data,index) in navList" v-bind:class="{active: active == index}"  @click="link(index+1)">{{data}}</li>'+
    '</ul>'+
    '</nav>'+
    '</header>',
    data: function () {
        return {
            navList:["首页","预约就诊","我的患者","我的服务","论坛","个人中心"],
            doctorId:id,
        }
    },
    created:function () {
        var that=this;

    },
    mounted: function () {

    },
    methods:{
        getDoctorId:function () {

        },
        link:function (num) {
            if(this.doctorId != ''){
                if(num == 1){
                    location.href="index.html";
                }else if(num == 2){
                    location.href="medical_planning.html";
                }else if(num == 3){

                }else if(num == 4){
                    location.href="online_ask.html";
                }else if(num == 5){

                }else if(num == 6){

                }else{
                    location.href="personal.html";
                }
            }else{
                window.eventHub.$emit('needLogin',1);
            }
        },
        login:function () {
            window.eventHub.$emit('needLogin',1);
        },
        exitLogin:function () {
            var that=this;
            this.$confirm('确认退出登录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function(){
                sessionStorage.setItem('doctorId','');
                location.href="index_no.html";
            }).catch(function (){
                that.$message({
                    type: 'info',
                    message: '已取消退出登录'
                });
            });

        }
    }
})