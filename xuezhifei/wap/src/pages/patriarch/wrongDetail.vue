<template>
    <div class="topic-wapper">
        <div class="topic" ref="topic-hook">
            <div class="topic-item">
                <!-- <dl> -->
                <div  class="topic-title"><span class="state">({{errorItem[0].question_type_name}})</span><span v-html="errorItem[0].body_html">{{errorItem[0].body_html}}</span></div>
                <!-- <div class="topic-content">
                    <mt-radio
                      v-model="errorItem[0].result"
                      :options="errorItem[0].option_html_list">
                    </mt-radio>
                </div> -->
                <RadioGroup v-model="errorItem[0].result" v-for="(option,index) in errorItem[0].option_html_list" :key="index">
                    <Radio :label="option.split('、')[0]" disabled>
                        <span v-html="option">{{option}}</span>
                    </Radio>
                </RadioGroup>
                <!-- </dl> -->
                <div class="topic-check">
                    <div class="check-con"><strong>难度{{(errorItem[0].difficulty_value*100/10).toFixed(1)}}</strong><span class="text-msg">{{errorItem[0].question_from}}</span></div>
                </div>
                <span class="collect" :class="[errorItem[0].is_favorite == true ? 'collected': '']" @click="iscollect(errorItem[0])"></span>
            </div>
            <div class="topic-desc">
                <div class="title">解析</div>
                <div v-html="errorItem[0].anylysis_html">{{errorItem[0].anylysis_html}}</div>
                <!-- <div class="subtitle">本题主要考察排列与组合。</div>
                <p>这6名学生的排列有A 种方法，同班同学站在一起的几率
                共有A A A 种方法，则同班同学排在一起的概率是P= A
                <pre>A  A  A    1</pre>
                <pre>-------  = --</pre>
                <pre>   A       10</pre>
                </p>
                <div class="topic-check">
                    <div class="check-con lineheight30"><strong>故本题的答案为C</strong></div>
                    <div class="check-con"><a href="javascript:;" class="btn btn-default">报错</a></div>
                </div> -->
                <a href="javascript:;" class="btn btn-default" @click="reportError(errorItem[0])">报错</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
        return {
            // patriarchToken: this.$util.baseset.getInfo('patriarch_token'),
            patriarchToken: this.$util.baseset.getInfo('token'),
            testingData: this.$util.baseset.getInfo('testing_detail_data'),
            errorItem: [],
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
                    var errorArr = data.data;
                     // console.log(errorArr);
                     for (var i = 0; i < errorArr.length; i++) {
                         let arr = errorArr[i].option_html_list.split('|NTK|');
                         // arr.map((item,index) => {
                         //    arr[index] = {
                         //        label: item,
                         //        value: item.split('、')[0]
                         //    }
                         // })
                         that.errorItem.push({
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
                     console.log(that.errorItem)
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
        reportError(e){
            // 题目解析
            var that = this;
            const url = this.$util.baseset.baseurl+'teacher/topic_report_error';
            const params = {
                'token': this.patriarchToken,
                'topic_id': e.id,
            }
            this.$ajax.post(url, params)
            .then(function(res) {
                var data = res.data;
                console.log(data);
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
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/scss/index.scss";
.topic-wapper {
    margin-bottom: 16px;
    .topic {
        // .topic-item{
        //     position: relative;
        // }
        .topic-item, .topic-desc{
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
            .title {
                font-weight: bold;
            }
            .title,p {
                margin-bottom: 15px;
            }
            .subtitle {
                margin-bottom: 10px;
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
            .lineheight30{
                line-height: 30px;
            }
            strong {
                font-weight: bold;
                margin-right: 22px;
            }
            .text-msg {
                color: #3f3f3f;
            }
        }
        .topic-desc{
            .btn {
                position: absolute;
                bottom: 10px;
                right: 15px;
            }
        }
    }
}
</style>
