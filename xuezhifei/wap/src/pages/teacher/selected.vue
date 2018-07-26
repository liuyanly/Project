<template>
<div class="container">
    <!-- <div class="wrapper clearfix">
        <div class="main"> -->
            <div class="topic-wapper">
                <div class="topic" ref="topic-hook">
                    <div class="topic-item" v-for="(topicItem,index) in topicItems" :topicId="topicItem.id">
                        <dl>
                            <dt @click="showDetail(topicItem)"><span class="state">({{topicItem.question_type_name}})</span><span v-html="topicItem.body_html">{{topicItem.body_html}}</span></dt>
                            <dd v-for="item in topicItem.option_html_list.split('|NTK|')" v-html="item">{{item}}</dd>
                        </dl>
                        <div class="topic-check">
                            <div class="check-con"><strong>难度{{(topicItem.difficulty_value*100/10).toFixed(1)}}</strong><span class="text-msg">{{topicItem.question_from}}</span></div>
                            <div class="check-con"><i class="checkbox" :class="[topicItem.is_select == true ? 'checked':'']" @click="isCheck(topicItem)"></i></div>
                        </div>
                    </div>
                </div>
            </div>
       <!--  </div>
    </div> -->
    <div class="footer">
        <a href="javascript:;" class="btn" :class="[tmpData.length>0 ?'btn-primary':'btn-disabled']" @click="issueSure">去发布({{tmpData.length}})</a>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom"
      popup-transition="popup-fade"
      closeOnClickModal="false" style="width:100%;">
        <mt-picker :slots="classSlots" :showToolbar="true" valueKey="name" :item-height="44" @change="onValuesChange">
            <span class="mint-datetime-action mint-datetime-cancel" @click="issueCancle">取消</span><span class="mint-datetime-action mint-datetime-confirm" @click="issueSelect">确定</span>
        </mt-picker>
    </mt-popup>
</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
  data() {
        return {
            token: this.$util.baseset.getInfo('token'),
            tmpData: this.$util.baseset.getInfo('tmpData'),
            toppicId: [],
            thirdKnowledgeId: [],
            topicItems: [],
            // checkIndex: '-1',
            popupVisible:false,
            classId: '',
            classSlots: [
                {
                  flex: 1,
                  values: [],
                  className: 'slot1',
                  textAlign: 'center'
                }
            ]
        }
    },
    created(){
        for (var i = 0; i < this.tmpData.length; i++) {
            this.toppicId.push(this.tmpData[i].id);
            this.thirdKnowledgeId.push(this.tmpData[i].third_knowledge_id);
        }
        console.log(this.toppicId);
        console.log(this.thirdKnowledgeId);
        this.getClassList()
        console.log(this.classSlots[0].values);
        this.getSelectedTopic()
    },
    computed: {
        // count() {
        //     let count = 0;
        //     for (let i = 0; i < this.topicItems.length; i++) {
        //         if(this.topicItems[i].is_select == true){
        //             count++;
        //             console.log('count+:',count)
        //         }else{
        //             count--;
        //             console.log('count-:',count)
        //         }
        //     }
        //     return count
        // }
    },
    // mounted() {
    // },
    methods: {
        getClassList(){
            var that = this;
            const url = this.$util.baseset.baseurl+'teacher/class_list';
            const params = {
                'token': this.token,
            }
            this.$ajax.post(url, params)
            .then(function(res) {
                var data = res.data;
                console.log(data);
                if(data.code === 200) {
                    var arr = data.data;
                    for (var i = 0; i < arr.length; i++) {
                        that.classSlots[0].values.push({
                            'id': arr[i].class_id,
                            'name': arr[i].class_name
                        });
                    }
                }
            })
            .catch(function(err) {
                 console.log(err)
             });
        },
        getSelectedTopic(){
            console.log("topic_id:"+this.toppicId.join(','));
            var that = this;
            const url = this.$util.baseset.baseurl+'teacher/topic_preview';
            const params = {
                'token': this.token,
                'topic_id':this.toppicId.join(','),
            }
            this.$ajax.post(url, params)
            .then(function(res) {
                var data = res.data;
                console.log(data);
                if(data.code === 200) {
                    // that.topicItems = data.data;
                    var topicArr = data.data;
                    for (var i = 0; i < topicArr.length; i++) {
                         that.topicItems.push({
                            'id': topicArr[i].id,
                            'body_html': topicArr[i].body_html,
                            'option_html_list': topicArr[i].option_html_list,
                            'difficulty_value' : topicArr[i].difficulty_value,
                            'question_from': topicArr[i].question_from,
                            'third_knowledge_id': topicArr[i].third_knowledge_id,
                            'question_type_name': topicArr[i].question_type_name,
                            'is_select': true
                         })
                    }
                    console.log(that.topicItems);
                }
            })
            .catch(function(err) {
                 console.log(err)
             });
        },
        isCheck(e) {
            // this.checkIndex = index;
            // console.log("topic_id"+e.id)
            // console.log("third_knowledge_id"+e.third_knowledge_id);
            let flag=false;
            // console.log(e.third_knowledge_id,e.id);
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
            console.log(this.tmpData)
            e.is_select = !e.is_select;
            // if(!e.is_select){
            //     this.tmpData.splice({
            //         id:e.id,
            //         third_knowledge_id:e.third_knowledge_id
            //     },1);
            //     console.log(this.tmpData);
            //     console.log("id:"+e.id,"third_knowledge_id:"+e.third_knowledge_id,"is_select:"+e.is_select);
            // }
            if(!e.is_select){
                for (var i = 0; i < this.tmpData.length; i++) {
                    if((e.third_knowledge_id == this.tmpData[i].third_knowledge_id) && (e.id == this.tmpData[i].id)){
                        console.log(this.tmpData);
                        console.log("id:"+e.id,"third_knowledge_id:"+e.third_knowledge_id,"is_select:"+e.is_select);
                        this.tmpData.splice(i,1);
                    }
                }
            }
            this.$util.baseset.setInfo('tmpData',this.tmpData);
        },
        issueSure() {
            this.popupVisible = true;
        },
        issueCancle() {
            this.popupVisible = false;
        },
        issueSelect() {
            var that = this;
            const url = this.$util.baseset.baseurl+'teacher/topic_release';
            const params = {
                'token': this.token,
                'topic_id':this.toppicId.join(','),
                'third_knowledge_id': this.thirdKnowledgeId.join(','),
                'class_id': this.classId,
                'course_id': this.$util.baseset.getInfo('courseId'),
            }
            this.$ajax.post(url, params)
            .then(function(res) {
                var data = res.data;
                console.log(data);
                if(data.code === 200) {
                    MessageBox({
                      title: '',
                      message: data.message,
                    }).then(action => {
                        // that.$router.push({name:'teacher'});
                        if(that.$util.baseset.isIOS()){
                            iOSManager.returnTitle("题目发布成功");
                        }else if(that.$util.baseset.isAndroid()){
                            AndroidFunction.returnTitle("题目发布成功");
                        }
                    });
                    // if(that.$util.baseset.isIOS()){
                    //     iOSManager.returnTitle("题目发布成功");
                    // }else if(that.$util.baseset.isAndroid()){
                    //     AndroidFunction.returnTitle("题目发布成功");
                    // }
                    // MessageBox.confirm(data.message).then(action => {
                    //     that.$router.push({name:'teacher'});
                    // });
                    that.popupVisible = false;
                    localStorage.clear();
                }else if(data.code === 502){
                    MessageBox({
                      title: '',
                      message: data.message,
                    });
                    // MessageBox.confirm(data.message).then(action => {
                    //     console.log(11111111);
                    // });
                    that.popupVisible = false;
                }
                // that.$router.push({name:'teacher'});
            })
            .catch(function(err) {
                 console.log(err)
             });
        },
        onValuesChange(picker, values) {
          this.classId = values[0].id;
        },
        showDetail(e) {
            this.$router.push({name:'detail'});
            this.$util.baseset.setInfo('topic_analysis_id',e.id);
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
    .footer {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 44px;
        .btn{
            display: block;
            padding: 13px 0;
            border-radius: 0;
            font-size: 16px;
        }
    }
}
.topic-wapper {
    padding-bottom: 60px;
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
}
</style>
