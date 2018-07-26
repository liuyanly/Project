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
var id = localStorage.getItem('doctorId');
var doctorName = localStorage.getItem('doctorName');

Vue.component('my-header', {
    props: ['active'],
    template: '<header class="container">' +
    '<div class="login-area clearFix">' +
    '<p class="msg-center right cursor" @click="notLogin(1)" :class="{c1:doctorId!=\'\'&&doctorId!=null&&active==0}">消息中心</p>' +
    '<p class="login-p right">' +
    '<a v-if="doctorId ==\'\'||doctorId ==null" href="#" class="login-btn" @click="login()" style="border-right: none">登录</a>' +
    '<span v-if="doctorId !=\'\'&&doctorId!=null" class="already-login">Hi！{{doctorName}}</span>' +
    '<span v-if="doctorId !=\'\'&&doctorId!=null" @click="exitLogin()" class="exit-login">退出</span>' +
    /*'<span class="upload cursor" @click="notLogin(2)">上传档案</span>'+*/
    '</p>' +
    '</div>' +
    '<nav class="nav clearFix">' +
    '<div class="logo-box left"><img class="logo" src="images/a1_logo.png"><span class="logo-name">华医国际</span></div>' +
    '<ul class="nav-list right">' +
    '<li v-for="(data,index) in navList" v-bind:class="{active: active == index+1}"  @click="link(index+1)">{{data}}</li>' +
    '</ul>' +
    '</nav>' +
    '</header>',
    data: function () {
        return {
            navList: ["首页", "我的任务", "分诊", "远程医疗", "惠美决策", "我的患者", "健康资讯", "论坛", "个人中心"],
            doctorId: id,
            doctorName: doctorName,
        }
    },
    created: function () {
        var that = this;

    },
    mounted: function () {
        if (this.doctorId == '' || this.doctorId == null) {
            //window.eventHub.$emit('needLogin',1);
            //return false;
        }
    },
    methods: {
        getDoctorId: function () {

        },
        link: function (num) {
            if (this.doctorId != '' && this.doctorId != null) {
                if (num == 1) {
                    location.href = "index.html";
                } else if (num == 2) {
                    location.href = "my_task.html";
                } else if (num == 3) {
                    //location.href="my_patient.html";
                } else if (num == 4) {
                    //location.href="online_ask.html";
                } else if (num == 5) {
                    location.href = "huimei.html"
                    // userGui
                    // console.log(localStorage)
                    // location.href="huimei.html";
                    // window.open("http://www.jb51.net");
                    // location.href = 'http://amc.huimeionline.com/pc?key=2B095E15BF2EC9DC98C44737C02621E3&serialNumber=1&registerUrl=http://hygjpc.zpftech.com/user/index.html&userGui=' + JSON.parse(localStorage.userInfo).id + '#/home/index/2B095E15BF2EC9DC98C44737C02621E3';
                    // window.open('http://amc.huimeionline.com/pc?key=2B095E15BF2EC9DC98C44737C02621E3&serialNumber=1#/home/index/2B095E15BF2EC9DC98C44737C02621E3');
                } else if (num == 6) {
                    location.href = "my_patient.html"
                } else if (num == 7) {

                } else if (num == 8) {

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
        notLogin: function (type) {
            if (this.doctorId == '' || this.doctorId == null) {
                window.eventHub.$emit('needLogin', 1);
            } else {
                if (type == 1) {
                    location.href = "msg_center.html";
                } else {
                    location.href = "up_archives.html";
                }
            }
        },
        register: function () {
            location.href = "register.html";
        },
        exitLogin: function () {
            var that = this;
            this.$confirm('确认退出登录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                localStorage.setItem('doctorName', '');
                localStorage.setItem('doctorId', '');
                localStorage.setItem('doctorInfo', '');
                // window.location.reload();
                window.location.href = 'index.html'
            }).catch(function () {
                that.$message({
                    type: 'info',
                    message: '已取消退出登录'
                });
            });

        }
    }
})