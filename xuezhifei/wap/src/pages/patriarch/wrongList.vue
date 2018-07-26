<template>
<div class="topic-wapper">
    <div class="topic" ref="topic-hook">
        <div class="topic-item" v-for="(errorItem, errorIndex) in errorItems">
                <div class="topic-title" @click="showWrongDetail(errorItem)"><span class="state">({{errorItem.question_type_name}})</span><span v-html="errorItem.body_html">{{errorItem.body_html}}</span></div>
                <!-- <div class="topic-content">
                    <mt-radio
                      v-model="errorItem.result"
                      :options="errorItem.option_html_list">
                    </mt-radio>
                </div> -->
                <RadioGroup v-model="errorItem.result" v-for="(option,index) in errorItem.option_html_list" :key="index">
                    <Radio :label="option.split('、')[0]" disabled>
                        <span v-html="option">{{option}}</span>
                    </Radio>
                </RadioGroup>
            <div class="topic-check">
                <div class="check-con"><strong>难度{{(errorItem.difficulty_value*100/10).toFixed(1)}}</strong><span class="text-msg">{{errorItem.question_from}}</span></div>
            </div>
            <span class="collect" :class="[errorItem.is_favorite == true ? 'collected': '']" @click="iscollect(errorItem)"></span>
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
</template>

<script>
export default {
  data() {
        return {
            // patriarchToken: this.$util.baseset.getInfo('patriarch_token'),
            patriarchToken: this.$util.baseset.getInfo('token'),
            testingData: this.$util.baseset.getInfo('testing_data'),
            errorItems: [],
        }
    },
    created(){
        this.getErrorTopic()
    },
    methods: {
        getErrorTopic(){
            var that = this;
            const url = this.$util.baseset.baseurl+'parent/error_topic_analysis';
            const params = {
                'token': this.patriarchToken,
                'error_topic_id': this.testingData.error_topic_id,
                'error_answer_list': this.testingData.error_answer_list,
            }
            this.$ajax.post(url, params)
            .then(function(res) {
                var data = res.data;
                console.log(data);
                if(data.code === 200) {
                    // that.errorItems = data.data;
                    if(data.data.length == 0){
                        that.$toast('暂无数据')
                    }
                    var errorArr = data.data;
                     for (var i = 0; i < errorArr.length; i++) {
                         let arr = errorArr[i].option_html_list.split('|NTK|');
                         // arr.map((item,index) => {
                         //    arr[index] = {
                         //        label: item,
                         //        value: item.split('、')[0]
                         //    }
                         // })
                         that.errorItems.push({
                            'id': errorArr[i].id,
                            'body_html': errorArr[i].body_html,
                            'option_html_list': arr,
                            'difficulty_value' : errorArr[i].difficulty_value,
                            'question_from': errorArr[i].question_from,
                            'third_knowledge_id': errorArr[i].third_knowledge_id,
                            'question_type_name': errorArr[i].question_type_name,
                            'is_favorite': Boolean(errorArr[i].is_favorite),
                            'result':errorArr[i].error_answer
                         })
                     }
                     console.log(that.errorItems)
                }
            })
            .catch(function(err) {
                 console.log(err)
             });
        },
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
        showWrongDetail(e) {
            this.$util.baseset.setInfo('testing_detail_data',{
                'error_topic_id':e.id,
                'error_answer_list':e.result,
            })
            this.$router.push({name:'wrongDetail'})
            if(this.$util.baseset.isIOS()){
                iOSManager.returnTitle("题目解析");
            }else if(this.$util.baseset.isAndroid()){
                AndroidFunction.returnTitle("题目解析");
            }
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/scss/index.scss";
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
