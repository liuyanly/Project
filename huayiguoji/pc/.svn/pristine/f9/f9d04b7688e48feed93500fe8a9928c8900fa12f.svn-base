/**
 * Created by Administrator on 2017/11/16.
 */
// 获取url参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
window.eventHub = new Vue();
var id = localStorage.getItem('userId');
var name = localStorage.getItem('userName');
Vue.component('my-header', {
    props: ['active'],
    template: '<header class="container">' +
        '<div class="login-area clearFix">' +
        '<p class="msg-center right"  @click="msgCenter">消息中心</p>' +
        '<p class="login-p right">' +
        '<a v-if="userId ==\'\'||userId==null" href="#" class="login-btn" @click="login()">登录</a>' +
        '<span v-if="userId !=\'\'&&userId!=null" class="already-login">Hi！{{userName}}</span>' +
        '<a href="#" v-if="userId ==\'\'||userId==null" @click="register()" class="register-btn">注册</a>' +
        '<span v-if="userId !=\'\'" @click="exitLogin()" class="exit-login">退出</span>' +
        '<span v-if="active == 3" class="upload">上传档案</span>' +
        '</p>' +
        '</div>' +
        '<nav class="nav clearFix">' +
        '<div class="logo-box left"><img class="logo" src="images/a1_logo.png"><span class="logo-name">华医国际</span></div>' +
        '<ul class="nav-list right">' +
        '<li v-for="(data,index) in navList" v-bind:class="{active: active == index}"  @click="link(index+1)">{{data}}</li>' +
        '</ul>' +
        '</nav>' +
        '</header>',
    data: function () {
        return {
            navList: ["首页", "就医策划", "智能问诊", "在线咨询", "健康资讯", "论坛", "个人中心"],
            userId: id,
            userName: name,
        }
    },
    created: function () {
        var that = this;
    },
    mounted: function () {
        if (this.userId == '' || this.userId == null) {
            //window.eventHub.$emit('needLogin',1);
            //return false;
        }
    },
    methods: {
        getUserId: function () {

        },
        link: function (num) {
            if (this.userId != '' || this.userId == null) {
                if (num == 1) {
                    location.href = "index.html";
                } else if (num == 2) {
                    location.href = "medical_planning.html";
                } else if (num == 3) {
                    location.href = './huimei.html';
                    // getToken(this)
                    // console.log(JSON.parse(localStorage.userInfo).id)
                    // axios.post(userApi + '/answersheet', {
                    //         user_id: JSON.parse(localStorage.userInfo).id
                    //     })
                    //     .then(function (res) {
                    //         console.log(res)
                    //         if (res.data.status == 200) {
                    //             // window.open('http://amc.huimeionline.com/pc?key=2B095E15BF2EC9DC98C44737C02621E3&serialNumber=1&registerUrl=http://hygjpc.zpftech.com/doctor/html/huimei_list.html&isHistoryRecord=1&userGui=' + JSON.parse(localStorage.userInfo).id + '#/home/index/2B095E15BF2EC9DC98C44737C02621E3')
                    //             window.open('http://amc.huimeionline.com/pc?key=2B095E15BF2EC9DC98C44737C02621E3&serialNumber=1&registerUrl=http://hygjpc.zpftech.com/user/index.html&userGui=' + JSON.parse(localStorage.userInfo).id + '#/home/index/2B095E15BF2EC9DC98C44737C02621E3');
                    //         }

                    //     })
                } else if (num == 4) {
                    location.href = "online_ask.html";
                } else if (num == 5) {

                } else if (num == 6) {

                } else {
                    location.href = "personal.html";
                }
            } else {
                window.eventHub.$emit('needLogin', 1);
            }
        },
        login: function () {
            window.eventHub.$emit('needLogin', 1);
        },
        msgCenter: function () {
            location.href = "server_pic.html";
        },
        exitLogin: function () {
            var that = this;
            this.$confirm('确认退出登录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                localStorage.setItem('userId', '');
                localStorage.setItem('userName', '');
                localStorage.setItem('userInfo', '');
                location.href = "index.html";
            }).catch(function () {
                that.$message({
                    type: 'info',
                    message: '已取消退出登录'
                });
            });

        },
        register: function () {
            location.href = "register.html";
        }
    }
})