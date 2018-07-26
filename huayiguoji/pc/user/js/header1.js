/**
 * Created by Administrator on 2017/11/16.
 */

Vue.component('my-header',{
    props: ['active'],
    template: '<header class="container">'+
    '<div class="login-area clearFix">'+
    '<p class="msg-center right">消息中心</p>'+
    '<p class="login-p right">'+
    '<a v-if="userId ==\'\'" href="#" class="login-btn">登录</a>'+
    '<span v-if="userId !=\'\'" class="already-login">Hi！毛杜拉</span>'+
    '<a href="#" v-if="userId ==\'\'" class="register-btn">注册</a>'+
    '<span v-if="userId !=\'\'" class="exit-login">退出</span>'+
    '<span v-if="active == 3" class="upload">上传档案</span>'+
    '</p>'+
    '</div>'+
    '<nav class="nav clearFix">'+
    '<div class="logo-box left"><img class="logo" src="images/a1_logo.png"><span class="logo-name">华医国际</span></div>'+
    '<ul class="nav-list right">'+
    '<li v-for="(data,index) in navList" v-bind:class="{active: active == index}"  @click="link(index+1)">{{data}}</li>'+
    '</ul>'+
    '</nav>'+
    '</header>',
    data: function () {
        return {
            navList:["首页","就医策划","智能问诊","在线咨询","健康资讯","论坛","个人中心"],
            userId:1
        }
    },
    mounted: function () {

    },
    methods:{
        getUserId:function () {

        },
        link:function (num) {
            if(this.userId != ''){
                if(num == 1){

                }else if(num == 2){

                }else if(num == 3){

                }else if(num == 4){

                }else if(num == 5){

                }else if(num == 6){

                }else{

                }
            }else{
                //window.location.href=
            }
        }
    }
})