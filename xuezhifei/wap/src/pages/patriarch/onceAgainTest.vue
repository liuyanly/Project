<template>
<div class="container">
    <div class="wrapper clearfix">
        <div class="main">
            <div class="topic-wapper">
                <div class="topic" ref="topic-hook">
                    <div class="topic-item" v-for="(testingItem, testingIndex) in testingItems">
                        <div class="topic-title"><span class="state">({{testingItem.question_type_name}})</span><span v-html="testingItem.body_html">{{testingItem.body_html}}</span></div>
                        <!-- <div class="topic-content" v-for="(item, index) in testingItem.option_html_list.split('|NTK|')">
                            <div class="topic-radio">
                                <i class="icon-radio" :class="[index == radioIndex ? 'checked' : '']" @click="isRadiio(testingItem,item,index)"></i>
                            </div>
                            <div v-html="item">{{item}}</div>
                        </div> -->
                        <RadioGroup v-model="testingItem.result" v-for="(option,index) in testingItem.option_html_list" :key="index">
                            <Radio :label="option.split('、')[0]">
                                <span v-html="option">{{option}}</span>
                            </Radio>
                        </RadioGroup>
                        <!-- <div class="topic-content">
                            <mt-radio
                              v-model="testingItem.result"
                              :options="testingItem.option_html_list">
                            </mt-radio>
                        </div> -->
                        <div class="topic-check">
                            <div class="check-con"><strong>难度{{(testingItem.difficulty_value*100/10).toFixed(1)}}</strong><span class="text-msg">{{testingItem.question_from}}</span></div>
                        </div>
                        <span class="collect" :class="[testingItem.is_favorite == true ? 'collected': '']" @click="iscollect(testingItem)"></span>
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
        <a href="javascript:;" class="btn" :class="[this.count== testingItems.length ?'btn-primary':'btn-disabled']" @click="showReport">交卷并查看结果</a>
    </div>
</div>
</template>

<script>
export default {
  data() {
        return {
            // toppicId: this.$util.baseset.getInfo('topic_id'),
            // patriarchToken: this.$util.baseset.getInfo('patriarch_token'),
            patriarchToken: this.$util.baseset.getInfo('token'),
            testingData: this.$util.baseset.getInfo('testing_data'),
            testingItems: [],
            testingId: [],
            testingResult: [],
            params: {},
            count: 0,
        }
    },
    watch:{
        testingItems: {
            handler: function(val){
                this.count=0;
                for (var i = 0; i < val.length; i++) {
                    // console.log(val[i])
                    if(val[i].result!=''){
                        this.count+=1;
                        // console.log(this.count)
                    }
                }
            },
            deep:true
        }
    },
    created(){
        this.getTestingItems()
    },
    methods: {
        getTestingItems(){
            // 在练一遍
            var that = this;
            const url = this.$util.baseset.baseurl+'parent/once_again';
            const params = {
                'token': this.patriarchToken,
                'topic_id': this.testingData.error_topic_id,
                'knowledge_id': this.testingData.error_knowledge_id,
            }
            this.$ajax.post(url, params)
            .then(function(res) {
                var data = res.data;
                if(data.code === 200) {
                     // that.testingItems = data.data
                     var testingArr = data.data;
                     // console.log(testingArr);
                     for (var i = 0; i < testingArr.length; i++) {
                         let arr = testingArr[i].option_html_list.split('|NTK|');
                         // arr.map((item,index) => {
                         //    arr[index] = {
                         //        label: item,
                         //        value: item.split('、')[0]
                         //    }
                         // })
                         that.testingItems.push({
                            'id': testingArr[i].id,
                            'body_html': testingArr[i].body_html,
                            'option_html_list': arr,
                            'difficulty_value' : testingArr[i].difficulty_value,
                            'question_from': testingArr[i].question_from,
                            'third_knowledge_id': testingArr[i].third_knowledge_id,
                            'question_type_name': testingArr[i].question_type_name,
                            'is_favorite': Boolean(testingArr[i].is_favorite),
                            'result':''
                         })
                     }
                     console.log(that.testingItems)
                }
            })
            .catch(function(err) {
                 console.log(err)
             });
        },
        // isRadiio(praentEle,e,index){
        //     this.radioIndex = index;
        //      // this.radioIndex.push(praentEle.id);
        //      // console.log(this.radioIndex)
        //     // testingItem
        //     this.$util.baseset.setInfo('topic_id',praentEle.id);
        //     this.$util.baseset.setInfo('answer',e.split('、')[0]);
        // },
        iscollect(e) {
            var that = this;
            e.is_favorite = !e.is_favorite;
            console.log(e.is_favorite);
            const url = this.$util.baseset.baseurl+'parent/favorite_topic';
            const params = {
                'token': this.patriarchToken,
                'topic_id': e.id,
            }
            console.log(params)
            this.$ajax.post(url, params)
            .then(function(res) {
                var data = res.data;
                if(data.code === 200) {
                    that.$messagebox({
                      title: '',
                      message: data.message,
                    });
                }
            })
            .catch(function(err) {
                 console.log(err)
             });
        },
        showReport() {
            console.log(this.testingItems)
            var that = this;
            this.testingId = [];
            this.testingResult = [];
            for (var i = 0; i < this.testingItems.length; i++) {

                if(this.testingItems[i].result == null || this.testingItems[i].result == "" || this.testingItems[i].result == undefined || this.testingItems[i].result == "null"){
                    that.$messagebox({
                      title: '',
                      message: '您确定放弃本次考试吗?',
                      showCancelButton: true
                    });

                }else{
                    this.testingId.push(this.testingItems[i].id);
                    this.testingResult.push(this.testingItems[i].result);
                    this.params = {
                        'is_again':1,
                        'token': this.patriarchToken,
                        'topic_id': this.testingId.join(','),
                        'answer': this.testingResult.join(','),
                        'course_id': this.$util.baseset.getInfo('course_id'),
                        'release_id': this.$util.baseset.getInfo('release_id'),
                    }
                }
            }
            console.log(this.params)
            const url = this.$util.baseset.baseurl+'parent/submit_topic';
            this.$ajax.post(url, this.params)
            .then(function(res) {
                var data = res.data;
                if(data.code === 200) {
                    that.$toast({
                        message: data.message
                    });
                    that.$util.baseset.setInfo('testing_data',data.data);
                    that.$router.push({name:'report'})
                    if(that.$util.baseset.isIOS()){
                        iOSManager.returnTitle("检测报告");
                    }else if(that.$util.baseset.isAndroid()){
                        AndroidFunction.returnTitle("检测报告");
                    }
                }
                console.log(data.data);
            })
            .catch(function(err) {
                 console.log(err)
            });
        }
    }
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
                line-height: 1.8;
            }
            .ivu-radio-group {
                display: block;
                margin-bottom: 10px;
                .ivu-radio-wrapper{
                    white-space:normal;
                    font-size: 14px;
                    height: auto;
                    line-height: 20px;
                }
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
                bottom:15px;
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
