<template>
<div class="container">
    <div class="wrapper clearfix">
        <div class="main">
            <div class="topic-wapper">
                <div class="topic" ref="topic-hook">
                    <div class="topic-item" v-for="(testingItem, testingIndex) in testingItems">
                        <div class="topic-title"><span class="state">({{testingItem.question_type_name}})</span><span v-html="testingItem.body_html">{{testingItem.body_html}}</span></div>
                        <div class="topic-content" v-for="(item, index) in testingItem.option_html_list.split('|NTK|')">
                            <div class="topic-radio">
                                <i class="icon-radio" :class="[index == radioIndex ? 'checked' : '']" @click="isRadiio(testingItem,item,index)"></i>
                            </div>
                            <!-- <div class="topic-radio">
                                <i class="icon-radio" :class="[testingItem.id == radioIndex[testingIndex]? 'checked' : '']" @click="isRadiio(testingItem,item,index)"></i>
                            </div> -->
                            <div v-html="item">{{item}}</div>
                        </div>
                        <div class="topic-check">
                            <div class="check-con"><strong>难度{{testingItem.difficulty_value*100/10}}</strong><span class="text-msg">{{testingItem.question_from}}</span></div>
                        </div>
                        <span class="collect" :class="{collected: collect}" @click="iscollect"></span>
                    </div>
                    <!-- <div class="topic-item">
                        <dl>
                            <dt><span class="state">(单选)</span>三个班级分别有1名，2名，3名学生获奖，这6名
        学生要排成一排合影，则同班学生排在一起的概率是(  )</dt>
                            <dd>
                                <mt-checklist
                                  :max="1"
                                  v-model="options2Value"
                                  :options="options2">
                                </mt-checklist>
                            </dd>
                        </dl>
                        <div class="topic-check">
                            <div class="check-con"><strong>难度4.9</strong><span class="text-msg">2016年湖南师大附中月考</span></div>
                        </div>
                        <span class="collect" :class="{collected: collect}" @click="iscollect"></span>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
    <div class="footer">
        <a href="javascript:;" class="btn btn-primary" @click="showReport">交卷并查看结果</a>
    </div>
</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
  data() {
        return {
            toppicId: this.$util.baseset.getInfo('topic_id'),
            testingItems: [],
            testingIndex: '-1',
            radioIndex: "-1",
            // radioIndex: [],
            collect: true,
            // options1Value: [],
            // options2Value: [],
            // options1: [
            //   {
            //     label: 'A、1/30',
            //     value: 'A'
            //   },
            //   {
            //     label: 'B、1/15',
            //     value: 'B',
            //   },
            //   {
            //     label: 'C、1/10',
            //     value: 'C'
            //   },
            //   {
            //     label: 'D、1/5',
            //     value: 'D'
            //   }
            // ],
            // options2: [
            //   {
            //     label: 'A、1/30',
            //     value: 'A'
            //   },
            //   {
            //     label: 'B、1/15',
            //     value: 'B',
            //   },
            //   {
            //     label: 'C、1/10',
            //     value: 'C'
            //   },
            //   {
            //     label: 'D、1/5',
            //     value: 'D'
            //   }
            // ],
        }
    },
    created(){
        this.getTestingItems()
    },
    methods: {
        getTestingItems(){
            // 今日检测
            var that = this;
            const url = this.$util.baseset.baseurl+'parent/testing';
            const params = {
                'token': '5cf21f370f9c3ef80e8bf04af34a838d',
                // 'topic_id': this.toppicId,
                'topic_id': '2663527,2663332,2662520',
            }
            this.$ajax.post(url, params)
            .then(function(res) {
                var data = res.data;
                console.log(data);
                if(data.code === 200) {
                    that.testingItems = data.data;
                    console.log(that.testingItems)
                }
            })
            .catch(function(err) {
                 console.log(err)
             });
        },
        isRadiio(praentEle,e,index){
            this.radioIndex = index;
             // this.radioIndex.push(praentEle.id);
             // console.log(this.radioIndex)
            // testingItem
            this.$util.baseset.setInfo('topic_id',praentEle.id);
            this.$util.baseset.setInfo('answer',e.split('、')[0]);
        },
        iscollect() {
            this.collect = !this.collect;
        },
        submitPrompt() {
            MessageBox({
              title: '',
              message: '您确定放弃本次考试吗?',
              showCancelButton: true
            });
        },
        showReport() {
            this.$router.push({name:'report'})
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.topic-wapper {
    position: relative;
    margin-bottom: 16px;
    .topic {
        .topic-item {
            position: relative;
            margin-bottom: 10px;
            padding: 10px 15px;
            background: #fff;
            line-height: 20px;
            color: #151515;
            .topic-title {
                margin-bottom: 10px;
            }
            .topic-content {
                display: flex;
                margin-bottom: 10px;
                .topic-radio {
                    flex: 26px 0 0;
                    .icon-radio {
                        display: inline-block;
                        width: 16px;
                        height: 16px;
                        margin-top: 2px;
                        @include bg-image(f30_icon1);
                        background-size: 16px 16px;
                        background-repeat: no-repeat;
                        &.checked{
                           @include bg-image(f30_icon2);
                            background-size: 16px 16px;
                            background-repeat: no-repeat;
                        }
                    }
                }
            }
            dt,dd{
                margin-bottom: 10px;
            }
            .state {
                margin-right: 5px;
                color: #999;
            }
            .collect {
                position: absolute;
                top:60px;
                right: 15px;
                display: inline-block;
                width: 20px;
                height: 19px;
                @include bg-image(f28_icon1);
                background-size: 20px 19px;
                background-repeat: no-repeat;
                &.collected{
                   @include bg-image(f28_icon2);
                    background-size: 20px 19px;
                    background-repeat: no-repeat;
                }
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
        }
    }
}
</style>
