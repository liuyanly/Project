<template>
<div class="container">
    <div class="wrapper clearfix">
        <div class="main">
            <div class="header-box bolder">
                <span>姓名：{{teacherObj.name}}</span>
                <span>任教学科：{{teacherObj.position}}</span>
                <span>任教阶段：{{teacherObj.stage_name}}</span>
            </div>
            <div class="header-box">
                <span class="h6">教材版本</span>
                <a class="header-r" href="javascript:;" @click="versionToggle">{{pickerSelect}}<i class="icon-arrow"></i></a>
            </div>
            <div class="topic-wapper">
                <!-- <div class="modal" :class="{show:isShow}"></div> -->
                <div class="modal"></div>
                <div class="option-box">
                    <div class="option">
                        <div class="select-a">
                            <a class="select-menu" href="javascript:;" @click="toggle(grade)" :class="{active:grade.isShow}">年级<span class="caret"></span></a>
                            <!-- <div class="select-dropdown" v-show="grade.isShow"> -->
                            <div class="select-dropdown">
                                    <a href="javascript:;" v-for="item in grade.data" :selectid="item.id">{{item.name}}</a>
                            </div>
                        </div>
                        <div class="select-a">
                            <a class="select-menu" href="javascript:;" @click="toggle(setion)" :class="{active:setion.isShow}">章节<span class="caret"></span></a>
                            <!-- <div class="select-dropdown" v-show="setion.isShow"> -->
                            <div class="select-dropdown">
                                <a href="javascript:;" v-for="item in setion.data">{{item}}</a>
                                <a href="javascript:;">第五章
                                    <div class="sub-select-dropdown">
                                        <a href="javascript:;">全部</a>
                                        <a href="javascript:;">第一节</a>
                                        <a href="javascript:;">第二节</a>
                                        <a href="javascript:;">第三节</a>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="select-a">
                            <a class="select-menu" href="javascript:;" @click="toggle(knowledge)" :class="{active:knowledge.isShow}">知识点<span class="caret"></span></a>
                            <!-- <div class="select-dropdown" v-show="knowledge.isShow"> -->
                            <div class="select-dropdown">
                                <a href="javascript:;" v-for="item in knowledge.data">{{item}}</a>
                            </div>
                        </div>
                        <div class="select-a">
                            <a class="select-menu" href="javascript:;" @click="toggle(difficulty)" :class="{active:difficulty.isShow}">难度<span class="caret"></span></a>
                            <!-- <div class="select-dropdown" v-show="difficulty.isShow"> -->
                            <div class="select-dropdown">
                                <a href="javascript:;" v-for="item in difficulty.data">{{item}}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="topic" ref="topic-hook">
                    <div class="topic-item">
                        <dl>
                            <dt @click="showDetail"><span class="state">(单选)</span>三个班级分别有1名，2名，3名学生获奖，这6名
学生要排成一排合影，则同班学生排在一起的概率是(  )</dt>
                            <dd>A、1/30</dd>
                            <dd>B、1/15</dd>
                            <dd>C、1/10</dd>
                            <dd>D、1/5</dd>
                        </dl>
                        <div class="topic-check">
                            <div class="check-con"><strong>难度4.9</strong><span class="text-msg">2016年湖南师大附中月考</span></div>
                            <div class="check-con"><i class="checkbox" :class="{checked: checkbox}" @click="isCheck"></i></div>
                        </div>
                    </div>
                    <div class="topic-item">
                        <dl>
                            <dt><span class="state">(单选)</span>三个班级分别有1名，2名，3名学生获奖，这6名
学生要排成一排合影，则同班学生排在一起的概率是(  )</dt>
                            <dd>A、1/30</dd>
                            <dd>B、1/15</dd>
                            <dd>C、1/10</dd>
                            <dd>D、1/5</dd>
                        </dl>
                        <div class="topic-check">
                            <div class="check-con"><strong>难度4.9</strong><span class="text-msg">2016年湖南师大附中月考</span></div>
                            <div class="check-con">
                                <i class="checkbox" :class="{checked: checkbox}" @click="isCheck"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer">
        <a href="javascript:;" class="btn btn-primary" @click="showSelected">预览已选题目</a>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom"
      popup-transition="popup-fade"
      closeOnClickModal="false" style="width:100%;">
        <mt-picker v-model="popupVisible" :slots="versionSlots" :showToolbar="true" :item-height="44" @change="onValuesChange">
            <span class="mint-datetime-action mint-datetime-cancel" @click="versionCancle">取消</span><span class="mint-datetime-action mint-datetime-confirm" @click="versionSelect">确定</span>
        </mt-picker>
    </mt-popup>
    <!-- <selects name="" id="" :isPopupVisible='isPopupVisible'></selects> -->
</div>
</template>

<script>
require("../../assets/js/jquery-1.11.0.min.js");
require("../../assets/js/select.js");
import select from '../../components/select';
export default {
    data() {
        return {
            teacherObj: {},
            checkbox: false,
            // isShow: false,
            grade: {
              isShow: false,
              data: []
            },
            setion: {
              isShow: false,
              data: ['全部','第一章','第二章','第三章','第四章']
            },
            knowledge: {
              isShow: false,
              data: ['全部','函数运用','概率','不等式']
            },
            difficulty: {
              isShow: false,
              data: ['全部','易','中','难']
            },
            popupVisible:false,
            versionSlots: [
                {
                  flex: 1,
                  values: [],
                  className: 'slot1',
                  textAlign: 'center'
                }
            ],
            pickerSelect: '',
            // mypopupVisible: this.isPopupVisible//data中新增字段

        }
    },
    components: {
        // 'selects':select
    },
    // props: {
    //   isPopupVisible: {
    //       type: Boolean,
    //       default: false
    //     }
    // },
    // watch: {
    //     isPopupVisible(val) {
    //         this.mypopupVisible = val;//新增result的watch，监听变更并同步到myResult上
    //     }},
    created(){
        this.getData();
    },
    methods: {
        getData() {
            var that = this;
            const url = this.$util.baseset.baseurl+'teacher/topic_lists';
            const params = {
                'token': '9e74a4b6b266931e387dc345c064f628'
            }
            this.$ajax.post(url, params)
            .then(function(res) {
                var data = res.data;
                if(data.code === 200) {
                    that.teacherObj = data.data.teacher_details;
                    console.log(data.data);
                    var versionArr = data.data.version_info;
                    for (var i = 0; i < versionArr.length; i++) {
                        that.versionSlots[0].values.push(versionArr[i].version_name)
                    }
                    var gradeArr = data.data.bookInfo;
                    for (var i = 0; i < gradeArr.length; i++) {
                        that.grade.data.push({
                            'name':gradeArr[i].book_name,
                            'id':gradeArr[i].id
                            });
                    }
                    console.log(that.grade.data)
                }
            })
            .catch(function(err) {
                console.log(err)
            });
        },
        isCheck() {
            // return this.checkbox = this.checkbox === false ? true : false
            this.checkbox = !this.checkbox;
        },
        toggle(ele) {
            // this.isShow = !this.isShow;
            ele.isShow = !ele.isShow;
        },
        versionToggle() {
            this.popupVisible = true;
            // console.log(=true)
            this.isPopupVisible=!this.isPopupVisible
        },
        versionCancle() {
            var that = this;
            this.popupVisible = !this.popupVisible;
            that.pickerSelect = that.versionSlots[0].values[0];
        },
        versionSelect(){
            this.popupVisible = !this.popupVisible;
        },
        showDetail() {
            this.$router.push({name:'detail'});
        },
        showSelected(){
            this.$router.push({name:'selected'});
        },
        onValuesChange(picker, values) {
          var that = this;
          that.pickerSelect = values[0];
        }
    },
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/index.scss";
.container {
    width: 100%;
    height: 100%;
    overflow: auto;
    .wrapper {
        width: 100%;
        min-height: 100%;
        .main{
            padding-bottom: 44px;
        }
    }
    .footer {
        position: relative;
        width: 100%;
        height: 44px;
        margin-top: -44px;
        clear: both;
        .btn{
            display: block;
            padding: 13px 0;
            border-radius: 0;
            font-size: 16px;
        }
    }
}
.header-box {
    display: flex;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    justify-content: space-between;
    background: #fff;
    @include border-bottom1px(#F7F7F7);
    &.bolder{
        span{
            font-weight: bolder;
        }
    }
    .header-r {
        vertical-align: middle;
        color: #666;
        .icon-arrow {
            display: inline-block;
            margin-left: 10px;
            width: 7px;
            height: 12px;
            @include bg-image('f22_icon4');
            background-size: 7px 12px;
            background-repeat: no-repeat;
        }
    }
}
.topic-wapper {
    position: relative;
    margin-top: 10px;
    margin-bottom: 16px;
    .option-box {
        height: 45px;
        line-height: 45px;
        @include border-top1px(#F7F7F7);
        .option{
            display: flex;
            height: 45px;
            line-height: 45px;
            justify-content: space-between;
            background: #fff;
            @include border-bottom1px(#F7F7F7);
            .select-a{
                position: relative;
                width: 100%;
                text-align: center;
                .select-menu{
                    max-width: 100%;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                    display: inline-block;
                    padding: 0 15px 0 0;
                    font-size: 16px;
                    color: #666;
                    @include bg-image('f22_icon1');
                    background-size: 8px 4px;
                    background-position: center right;
                    background-repeat: no-repeat;
                   // .caret {
                   //      display: inline-block;
                   //      width: 0;
                   //      height: 0;
                   //      margin-left: 5px;
                   //      vertical-align: middle;
                   //      border-top: 4px dashed;
                   //      border-top: 4px solid\9;
                   //      border-right: 4px solid transparent;
                   //      border-left: 4px solid transparent;
                   //      color: #BBBBBB;
                   //  }
                   &.active{
                        color: #2EA2FD;
                        @include bg-image('f22_icon5');
                        // .caret {
                        //     color: #2EA2FD;
                        // }
                    }
                }
                .select-dropdown {
                    position: absolute;
                    z-index: 11;
                    top: 45px;
                    left: 0;
                    display: none;
                    width: 98%;
                    // max-height: 200px;
                    // overflow: auto;
                    background: #fff;
                    border:1px solid #F7F7F7;
                    border-top: none 0;
                    a{
                        display: block;
                        height: 45px;
                        line-height: 45px;
                        font-size: 14px;
                        color: #666;
                        cursor: pointer;
                        @include border-bottom1px(#F7F7F7);
                        &:last-child{
                            @include border-none;
                        }
                        .sub-select-dropdown {
                            position: absolute;
                            top: 0;
                            left: 100%;
                            display: none;
                            width: 100%;
                            background: #F7F7F7;
                            a{
                                &.active{
                                    background: #EEEEEE;
                                }
                            }
                        }
                        &.active {
                            position: relative;
                            background: #F7F7F7;
                            .sub-select-dropdown {
                                display: block;
                            }
                        }
                    }
                }
            }
        }
    }
    .topic {
        .topic-item {
            margin-bottom: 10px;
            padding: 10px 15px;
            background: #fff;
            line-height: 20px;
            color: #151515;
            dt,dd{
                margin-bottom: 10px;
            }
            .state {
                margin-right: 5px;
                color: #999;
            }
        }
        .topic-check{
            display: flex;
            justify-content: space-between;
            strong {
                font-weight: bold;
                margin-right: 22px;
            }
            .text-msg {
                color: #3f3f3f;
            }
            .checkbox {
                display: inline-block;
                width: 14px;
                height: 14px;
                margin-top: 3px;
                @include bg-image(f22_icon2);
                background-size: 14px 14px;
                background-repeat: no-repeat;
                &.checked{
                   @include bg-image(f22_icon3);
                    background-size: 14px 14px;
                    background-repeat: no-repeat;
                }
            }
        }
    }
    .modal {
        position: absolute;
        top: 45px;
        right: 0;
        bottom: -78px;
        left: 0;
        z-index:10;
        display: none;
        background: rgba(0,0,0,0.30);

    }
}
</style>
