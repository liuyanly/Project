/**
 * Created by Administrator on 2017/11/20.
 */
Vue.component('my-left-nav',{
    props:['active'],
    template:'<div class="left-nav" style="height:580px">'+
    '<ul class="outer-list">'+
    '<li v-for=\'(data,index) in navDataList\' @click="link(index+1)">'+
    '<p class="firstMenu" v-bind:class="{active: active == index+1}">{{data.first}}<img src="images/f1_xiala.png" v-show="data.sec.length>0&&menuType!=index+1" class="sonList" @click="openSonMenu(index+1)">' +
    '<img src="images/f1_xiala_p.png" v-if="data.sec.length>0&&menuType==index+1" class="sonList" @click="openSonMenu(index+1)">'+
    '</p>'+
    '<ul v-if="data.sec.length>0" class="secMenu" v-show="menuType==index+1" v-bind:class="{active: active == 2}">'+
    '<li v-for="(dt,i) in data.sec" v-bind:class="{sonActive: active == index+1+\'\'+(i+1)}" @click="sonLink(index+1,i+1)">{{dt}}</li>'+
    '</ul>'+
    '</li>'+
    '</ul>'+
    '</div>',
    data:function () {
        return{
            menuType:0,
            navDataList: [{first:'我的任务',sec:[]},{first:'远程会诊',sec:[]},
                {first:'双向会诊',sec:[]}
            ]
        }
    },
    mounted:function () {

    },
    methods:{
        openSonMenu: function (type) {
            this.menuType=type;
            /*if(this.sonStatus==false){
                this.menuType=type;
                this.sonStatus=true;
            }else{
                this.menuType=0;
                this.sonStatus=false;
            }*/
        },
        link:function (i) {
         if(i == 1){
             location.href="my_task.html";
         }else if(i == 2){
             //location.href="health_control.html";
         }else if(i == 3){
             //location.href="question_survey.html";
         }else if(i == 4){
             location.href="msg_center.html";
         }else if(i == 5){
             //location.href="vip_info.html";
         }else{
             location.href="publish_msg.html";
         }
        },
        sonLink: function (num,i) {
            if(num == 2){
                if(i == 1){
                    //location.href="health_control.html";
                }else if(i == 2){
                    //location.href="question_survey.html";
                }else if(i == 3){
                    //location.href="sign_detection.html";
                }else if(i == 4){
                    //location.href="health_evaluation.html";
                }else if(i == 5){
                    //location.href="health_intervention.html";
                }else{
                    //location.href="tracking_follow.html";
                }
            }
        }
    }
})