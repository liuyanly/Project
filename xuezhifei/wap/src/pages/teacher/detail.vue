<template>
    <div class="topic-wapper">
        <div class="topic" ref="topic-hook">
            <div class="topic-item">
                <dl>
                    <dt><span class="state">({{topicItem.question_type_name}})</span><span v-html="topicItem.body_html">{{topicItem.body_html}}</span></dt>
                    <dd v-for="item in topicItemOption" v-html="item">{{item}}</dd>
                </dl>
                <div class="topic-check">
                    <div class="check-con"><strong>难度{{(topicItem.difficulty_value*100/10).toFixed(1)}}</strong><span class="text-msg">{{topicItem.question_from}}</span></div>
                    <div class="check-con"><i class="checkbox" :class="[topicItem.is_select ? 'checked' : '']" @click="isCheck(topicItem)"></i></div>
                </div>
            </div>
            <div class="topic-item topic-desc">
                <div class="title">解析</div>
                <div v-html="topicItem.anylysis_html">{{topicItem.anylysis_html}}</div>
                <!-- <div class="subtitle">本题主要考察排列与组合。</div>
                <p>这6名学生的排列有A 种方法，同班同学站在一起的几率
                共有A A A 种方法，则同班同学排在一起的概率是P= A
                <pre>A  A  A    1</pre>
                <pre>-------  = --</pre>
                <pre>   A       10</pre>
                </p> -->
                <!-- <div class="topic-check">
                    <div class="check-con lineheight30"><strong>故本题的答案为C</strong></div>
                    <div class="check-con"><a href="javascript:;" class="btn btn-default">报错</a></div>
                </div> -->
                <a href="javascript:;" class="btn btn-default" @click="reportError(topicItem)">报错</a>
            </div>
        </div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
  data() {
        return {
            token: this.$util.baseset.getInfo('token'),
            topicAnalysisId: this.$util.baseset.getInfo('topic_analysis_id'),
            tmpData: this.$util.baseset.getInfo('tmpData'),
            topicItem: {},
            topicItemOption: [],
        }
    },
    created(){
        console.log(this.tmpData);
        this.getTopicAnalysis()
    },
    methods: {
        getTopicAnalysis(){
            // 题目解析
            var that = this;
            const url = this.$util.baseset.baseurl+'teacher/topic_analysis';
            const params = {
                'token': this.token,
                'topic_id':this.topicAnalysisId,
            }
            this.$ajax.post(url, params)
            .then(function(res) {
                var data = res.data;
                console.log(data);
                if(data.code === 200) {
                    that.topicItem = {};
                    var topicObj = data.data;
                    that.topicItem = {
                        'id': topicObj.id,
                        'body_html': topicObj.body_html,
                        'option_html_list': topicObj.option_html_list,
                        'difficulty_value' : topicObj.difficulty_value,
                        'question_from': topicObj.question_from,
                        'anylysis_html': topicObj.anylysis_html,
                        'third_knowledge_id': topicObj.third_knowledge_id,
                        'question_type_name': topicObj.question_type_name,
                        'is_select': false
                    };
                    console.log(that.topicItem);
                    that.topicItemOption = that.topicItem.option_html_list.split('|NTK|');
                    for (var j = 0; j < that.tmpData.length; j++) {
                        if(that.topicItem.id == that.tmpData[j].id){
                            that.topicItem.is_select = true;
                        }
                    }
                }
            })
            .catch(function(err) {
                 console.log(err)
             });
        },
        isCheck(e) {
            let flag=false;
            console.log(e.third_knowledge_id,e.id);
            if(this.tmpData.length>0){
                    for(let key in this.tmpData){
                        if(this.tmpData[key].third_knowledge_id==e.third_knowledge_id){
                            this.tmpData[key].id=e.id;
                            flag=true;
                        }
                    }
            }
            if(!flag){
                 this.tmpData.push({
                                id:e.id,
                                third_knowledge_id:e.third_knowledge_id
                    })
            }
            e.is_select = !e.is_select;
            if(!e.is_select){
                for (var i = 0; i < this.tmpData.length; i++) {
                    if((e.third_knowledge_id == this.tmpData[i].third_knowledge_id) && (e.id == this.tmpData[i].id)){
                        console.log()
                        this.tmpData.splice(i,1);
                    }
                }
            }
            this.$util.baseset.setInfo('tmpData',this.tmpData);
        },
        reportError(e){
            // 题目解析
            const url = this.$util.baseset.baseurl+'teacher/topic_report_error';
            const params = {
                'token': this.token,
                'topic_id': e.id,
            }
            this.$ajax.post(url, params)
            .then(function(res) {
                var data = res.data;
                console.log(data);
                if(data.code === 200) {
                    MessageBox({
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
    .topic {
        .topic-item {
            position: relative;
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
            .title {
                font-weight: bold;
            }
            .title,p {
                margin-bottom: 15px;
            }
            .subtitle {
                margin-bottom: 10px;
            }
            .btn {
                position: absolute;
                right: 15px;
                bottom: 10px;
            }
        }
        .topic-desc {
            padding-bottom: 40px;
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
}
</style>
