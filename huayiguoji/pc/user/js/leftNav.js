/**
 * Created by Administrator on 2017/11/20.
 */
Vue.component('my-left-nav', {
    props: ['active'],
    template: '<div class="left-nav">' +
        '<ul class="outer-list">' +
        '<li v-for=\'(data,index) in navDataList\' @click="link(index+1)">' +
        '<p class="firstMenu" v-bind:class="{active: active == index+1}">{{data.first}}<img src="images/f1_xiala.png" v-show="data.sec.length>0&&menuType!=index+1" class="sonList" @click="openSonMenu(index+1)">' +
        '<img src="images/f1_xiala_p.png" v-if="data.sec.length>0&&menuType==index+1" class="sonList" @click="openSonMenu(index+1)">' +
        '</p>' +
        '<ul v-if="data.sec.length>0" class="secMenu" v-show="menuType==index+1" v-bind:class="{active: active == 2}">' +
        '<li v-for="(dt,i) in data.sec" v-bind:class="{sonActive: active == index+1+\'\'+(i+1)}" @click="sonLink(index+1,i+1)">{{dt}}</li>' +
        '</ul>' +
        '</li>' +
        '</ul>' +
        '</div>',
    data: function () {
        return {
            menuType: 0,
            navDataList: [{
                    first: '个人资料',
                    sec: []
                }, {
                    first: '健康管理',
                    sec: ['体检报告', '问卷调查', '体征监测', '健康评估', '健康干预', '跟踪随防']
                },
                {
                    first: '疾病管理',
                    sec: []
                }, {
                    first: '我的服务',
                    sec: ['图文咨询', '电话咨询', '视频咨询', '就医策划']
                },
                {
                    first: '会员信息',
                    sec: []
                }, {
                    first: '我的钱包',
                    sec: []
                }, {
                    first: '我的订单',
                    sec: ['未完成', '已付款', '已完成']
                },
                {
                    first: '我的评价',
                    sec: []
                }, {
                    first: '我的收藏',
                    sec: []
                }, {
                    first: '服务反馈',
                    sec: []
                }, {
                    first: '修改密码',
                    sec: []
                },
                {
                    first: '关于我们',
                    sec: []
                },
                // {
                //     first: '惠美决策',
                //     sec: []
                // }
            ]
        }
    },
    mounted: function () {
        var index = this.active.substr(0, 1)
        if (index == 2 || index == 4 || index == 7) {
            this.openSonMenu(index)
        }
    },
    methods: {
        openSonMenu: function (type) {
            this.menuType = type;
            /*if(this.sonStatus==false){
                this.menuType=type;
                this.sonStatus=true;
            }else{
                this.menuType=0;
                this.sonStatus=false;
            }*/
        },
        link: function (i) {
            if (i == 1) {
                location.href = "personal.html";
            } else if (i == 2) {
                this.openSonMenu(2);
            } else if (i == 3) {
                //location.href="question_survey.html";
            } else if (i == 4) {
                this.openSonMenu(4);
            } else if (i == 5) {
                location.href = "vip_info.html";
            } else if (i == 6) {
                location.href = "my_wallet.html";
            } else if (i == 7) {
                this.openSonMenu(7);
            } else if (i == 8) {
                location.href = "my_evaluation.html";
            } else if (i == 9) {
                location.href = "my_collection.html";
            } else if (i == 10) {
                location.href = "service_feedback.html";
            } else if (i == 11) {
                location.href = "edit_password.html";
            } else if (i == 13) {
                // 惠美
                // location.href = "huimei_log.html";

            } else {
                location.href = "about_us.html";
            }
        },
        sonLink: function (num, i) {
            if (num == 2) {
                if (i == 1) {
                    location.href = "health_control.html";
                } else if (i == 2) {
                    location.href = "question_survey.html";
                } else if (i == 3) {
                    location.href = "sign_detection.html";
                } else if (i == 4) {
                    location.href = "health_evaluation.html";
                } else if (i == 5) {
                    location.href = "health_intervention.html";
                } else {
                    location.href = "tracking_follow.html";
                }
            } else if (num == 4) {
                if (i == 1) {
                    location.href = "server_pic.html";
                } else if (i == 2) {
                    location.href = "server_tel.html";
                } else if (i == 3) {
                    location.href = "server_video.html";
                } else {

                }
            } else if (num == 7) {
                if (i == 1) {
                    location.href = "my_order.html";
                } else if (i == 2) {
                    location.href = "my_order_pay.html";
                } else {
                    location.href = "my_order_complete.html";
                }
            }
        }
    }
})