/**
 * Created by Administrator on 2017/11/20.
 */
Vue.component('my-left-nav', {
    props: ['active'],
    template: '<div class="left-nav" style="height:720px">' +
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
                },
                {
                    first: '医助管理',
                    sec: ["我的医助", "新增会员", "分配任务", "签约分配"]
                },
                {
                    first: '意见反馈',
                    sec: []
                },
                {
                    first: '修改密码',
                    sec: []
                },
                {
                    first: '关于我们',
                    sec: []
                },
            ]
        }
    },
    mounted: function () {
        var index = this.active.substr(0, 1)
        if (index == 2) {
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
                location.href = "advice_feedback.html";
            } else if (i == 4) {
                location.href = "edit_password.html";
            } else if (i == 5) {
                location.href = "about_us.html";
            } else {
                //location.href="publish_msg.html";
            }
        },
        sonLink: function (num, i) {
            if (num == 2) {
                if (i == 1) {
                    location.href = "my_assistant.html";
                } else if (i == 2) {
                    location.href = "add_vip.html";
                } else if (i == 3) {
                    location.href = "assignment_task.html";
                } else {
                    location.href = "contract_assignment.html";
                }
            }
        }
    }
})