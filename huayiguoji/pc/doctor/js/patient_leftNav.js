/**
 * Created by Administrator on 2017/11/20.
 */
Vue.component('my-left-nav',{
    props:['active'],
    template:'<div class="left-nav" style="height:851px">'+
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
            navDataList: [{first:'健康管理',sec:["体检报告","问卷调查","体征监测","健康评估","健康干预","跟踪随访"]},
                {first:'疾病管理',sec:["疾病总览","门诊记录","入院记录","出院记录","手术记录","护理记录","检验检查","影像检查","医嘱处方"]}
            ]
        }
    },
    mounted:function () {
        var index=this.active.substr(0,1);
        this.openSonMenu(index);
    },
    methods:{
        openSonMenu: function (type) {
            this.menuType=type;
            /*if(this.sonStatus==false){
                this.menuType=type;
                this.sonStatus=true;
                console.log(1);
            }else{
                this.menuType=0;
                this.sonStatus=false;
                console.log(2);
            }*/
        },
        link:function (i) {
         if(i == 1){
             this.openSonMenu(1);
         }else{
             this.openSonMenu(2);
         }
        },
        sonLink: function (num,i) {
            if(num == 1){
                if(i == 1){
                    location.href="health_control.html";
                }else if(i == 2){
                    location.href="question_survey.html";
                }else if(i == 3){
                    location.href="sign_detection.html";
                }else if(i == 4){
                    location.href="health_evaluation.html";
                }else if(i == 5){
                    location.href="health_intervention.html";
                }else{
                    location.href="tracking_follow.html";
                }
            }else{
                if(i == 1){
                    //location.href="server_pic.html";
                }else if(i == 2){
                    //location.href="server_tel.html";
                }else if(i == 3){
                    //location.href="server_video.html";
                }else{

                }
            }
        }
    }
})