<template>
<div class="container">
    <div class="fixed">
        <div class="header-box bolder">
            <div class="flex-item"><span>姓名：{{teacherObj.name}}</span></div>
            <div class="flex-item">
                <p>任教学科：{{teacherObj.position}}</p>
                <p>任教阶段：{{teacherObj.stage_name}}</p>
            </div>
        </div>
        <div class="header-box">
            <span class="flex-item h6">教材版本</span>
            <a class="flex-item header-r" href="javascript:;" @click="versionToggle">{{pickerSelect}}<i class="icon-arrow"></i></a>
        </div>
        <div class="option-box">
            <div class="option">
                <div class="select-a" id="grade">
                    <a class="select-menu" href="javascript:;">{{tmpText.gradeText?tmpText.gradeText:gradeText}}</a>
                    <div class="select-dropdown">
                            <a href="javascript:;" v-for="item in grade.data" @click="gradeToggle(item)">{{item.name}}</a>
                    </div>
                </div>
                <div class="select-a" id="unit">
                    <a class="select-menu" href="javascript:;" @click="getUnit()">{{String(tmpText.unitText?tmpText.unitText:unitText).split(" ")[0]}}</a>
                    <div class="select-dropdown">
                        <a href="javascript:;" v-for="(item,index) in unit.data" :class="[index == itemIndex ? 'active' : '']" @click="unitToggle(item,index)">{{item.name.split(" ")[0]}}
                            <div class="sub-select-dropdown">
                                <a href="javascript:;" v-for="chapter in chapter.data" @click="chapterToggle(chapter)">{{chapter.name}}</a>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="select-a" id="knowledge">
                    <a class="select-menu" href="javascript:;" @click="getKnowledge()">{{tmpText.knowledgeText?tmpText.knowledgeText:knowledgeText}}</a>
                    <div class="select-dropdown">
                        <a href="javascript:;" v-for="item in knowledge.data" @click="knowledgeToggle(item)">{{item.name}}</a>
                    </div>
                </div>
                <div class="select-a">
                    <a class="select-menu" href="javascript:;">{{tmpText.difficultyText?tmpText.difficultyText:difficultyText}}</a>
                    <div class="select-dropdown">
                        <a href="javascript:;" v-for="item in difficulty.data" @click="difficultyToggle(item)">{{item.name}}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="scroll">
        <div class="topic-wapper">
            <div class="modal"></div>
            <div class="topic" ref="topic-hook">
                <div class="topic-item" v-for="(topicItem,index) in topicItems" :topicId="topicItem.id">
                    <dl>
                        <dt @click="showDetail(topicItem)"><span class="state">({{topicItem.question_type_name}})</span><span v-html="topicItem.body_html">{{topicItem.body_html}}</span></dt>
                        <dd v-for="item in (topicItem.option_html_list || '').split('|NTK|')" v-html="item">{{item}}</dd>
                    </dl>
                    <div class="topic-check">
                        <div class="check-con"><strong>难度{{(topicItem.difficulty_value*100/10).toFixed(1)}}</strong><span class="text-msg">{{topicItem.question_from}}</span></div>
                        <!-- <div class="check-con"><i class="checkbox" :class="[(index == checkIndex)? 'checked':'']" @click="isCheck(topicItem,index)"></i></div> -->
                         <div class="check-con"><i class="checkbox" :class="[(index == checkIndex)&&(topicItem.is_select == true)? 'checked':'']" @click="isCheck(topicItem,index)"></i></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer">
        <a href="javascript:;" class="btn" :class="[tmpData.length>0 ?'btn-primary':'btn-disabled']" @click="showSelected">预览已选题目</a>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom"
      popup-transition="popup-fade"
      closeOnClickModal="false" style="width:100%;">
        <mt-picker v-model="popupVisible" :slots="versionSlots" :showToolbar="true" valueKey="picker_name" :item-height="44" @change="onValuesChange">
            <span class="mint-datetime-action mint-datetime-cancel" @click="versionCancle">取消</span><span class="mint-datetime-action mint-datetime-confirm" @click="versionSelect">确定</span>
        </mt-picker>
    </mt-popup>
</div>
</template>

<script>
require("../../assets/js/jquery-1.11.0.min.js");
import select from '../../components/select';
export default {
    data() {
        return {
            teacherObj: {},
            popupVisible:false,
            versionId: '',
            versionSlots: [
                {
                  flex: 1,
                  values: [],
                  className: 'slot1',
                  textAlign: 'center'
                }
            ],
            pickerSelect: '',
            versionName:'',
            versionLastId: '',
            gradeText: '年级',
            bookId: '',
            grade: {
              data: []
            },
            unitText: '章节',
            unitId: '',
            unit: {
              data: []
            },
            itemIndex: '-1',
            chapterId: '',
            chapter: {
              data: []
            },
            knowledgeText: '知识点',
            knowledgeId: '',
            knowledge: {
              data: []
            },
            difficultyText: '难度',
            difficultyId: '',
            difficulty: {
              data: [
                  {
                    "id": "",
                    "name": "全部"
                  },
                  {
                    "id": 0,
                    "name": "易"
                  },
                  {
                    "id": 1,
                    "name": "中"
                  },
                  {
                    "id": 2,
                    "name": "难"
                  }
              ]
            },
            topicItems: [],
            tmpText: {
                'gradeText': this.$util.baseset.getInfo('gradeText'),
                'unitText':  this.$util.baseset.getInfo('unitText'),
                'knowledgeText': this.$util.baseset.getInfo('knowledgeText'),
                'difficultyText': this.$util.baseset.getInfo('difficultyText'),
            },
            checkIndex: -1,
            lastcheckIndex:-1,
            tmpData: this.$util.baseset.getInfo('tmpData'),
            token: '',
            tokenFirst: '',
        }
    },
    created(){
        this.tokenFirst = this.$util.baseset.getInfo('token');
        let params = this.$util.baseset.getQueryString();
        this.token = '46834f2fab58ab1840eb9d2ddc2460b2'; //测试数据
        // this.token = params.token;
        this.$util.baseset.setInfo('token',this.token);
        this.getGrade();
        // if(localStorage.tmpData){
            this.getTopicItems();
        // }
    },
    watch: {
        versionId: function(val,oldval){
            if(oldval){
                this.clearLocalStorage()
            }
        },
        tokenFirst: function(val, oldval){
            // 没发布之前监听token变化清空
            console.log("old "+val,"new "+this.token);
            if(val != this.token){
                this.clearLocalStorage()
            }
        }
    },
    mounted(){
        this.$nextTick(()=>{
            $(function(){
                $(".select-menu").click(function(){
                    $('.select-dropdown').hide();
                    // if($(this).text() == ""){

                    // }
                    // $(this).parent().parent().find(".sub-select-dropdown").hide();
                    if($(this).siblings(".select-dropdown").is(":hidden")){
                        $(this).addClass("active");
                        $(this).parents().find(".fixed").siblings(".scroll").find(".modal").show();
                        $(this).siblings(".select-dropdown").show();
                    }
                    else{
                        $(this).removeClass("active");
                        $(this).parents().find(".fixed").siblings(".scroll").find(".modal").hide();
                        $(this).siblings(".select-dropdown").hide();
                    }
                });
            });
        })
    },
    methods: {
        getGrade() {
            var that = this;
            const url = this.$util.baseset.baseurl+'teacher/topic_lists';
            // const params = {
            //     'token': this.token
            // }
            const params = {
                'token': this.$util.baseset.getInfo('token')
            }
            this.$ajax.post(url, params)
            .then(function(res) {
                var data = res.data;
                console.log(data);
                if(data.code === 200) {
                    if(data.data.length == 0){
                        that.$toast({
                            message: data.message
                        })
                    }
                    that.grade.data=[];
                    that.teacherObj = data.data.teacher_details;
                    console.log(that.teacherObj);
                    var versionArr = data.data.version_info;
                    for (var i = 0; i < versionArr.length; i++) {
                        that.versionSlots[0].values.push({
                            'picker_id': versionArr[i].id,
                            'picker_name': versionArr[i].version_name,
                        });
                    }
                    console.log(that.versionSlots[0].values);
                    var arr = data.data.bookInfo;
                    for (var i = 0; i < arr.length; i++) {
                        that.grade.data.push({
                            'name':arr[i].book_name,
                            'id':arr[i].id
                            });
                    }
                    that.$util.baseset.setInfo("courseId", data.data.user_info.course_id);
                }
            })
            .catch(function(err) {
                console.log(err)
            });
        },
        gradeToggle(e){
            // this.gradeText = e.name;
            this.tmpText.gradeText = e.name;
            this.$util.baseset.setInfo('gradeText',this.tmpText.gradeText);
            this.bookId = e.id;
            this.$util.baseset.setInfo('bookId',this.bookId);
            $(".select-dropdown").hide();
            $(".modal").hide();
            $(".select-menu").removeClass("active");
            console.log(e)
        },
        unitToggle(e,index) {
            this.itemIndex = index;
            // this.unitText = e.name;
            this.tmpText.unitText = e.name;
            this.$util.baseset.setInfo('unitText',this.tmpText.unitText);
            this.unitId = e.id;
            this.$util.baseset.setInfo('unitId',this.unitId);
            this.getChapter();
        },
        chapterToggle(e){
            this.chapterId = e.id;
            this.$util.baseset.setInfo('chapterId',this.chapterId);
            $(".select-dropdown").hide();
            $(".modal").hide();
            $(".select-menu").removeClass("active");
        },
        knowledgeToggle(e){
            // this.knowledgeText = e.name;
            this.tmpText.knowledgeText = e.name;
            this.$util.baseset.setInfo('knowledgeText',this.tmpText.knowledgeText);
            this.knowledgeId = e.id;
            this.$util.baseset.setInfo('knowledgeId',this.knowledgeId);
            $(".select-dropdown").hide();
            $(".modal").hide();
            $(".select-menu").removeClass("active");
            this.getTopicItems();
        },
        difficultyToggle(e){
            // this.difficultyText = e.name;
            this.tmpText.difficultyText = e.name;
            this.$util.baseset.setInfo('difficultyText',this.tmpText.difficultyText);
            this.difficultyId = e.id;
            this.$util.baseset.setInfo('difficultyId',this.difficultyId);
            $(".select-dropdown").hide();
            $(".modal").hide();
            $(".select-menu").removeClass("active");
            this.getTopicItems();
        },
        getUnit(){
            // 获取章
            console.log("book_id"+this.bookId);
            var that = this;
            const url = this.$util.baseset.baseurl+'teacher/filter_topic_list';
            // const params = {
            //     'token': this.token,
            //     'version_id': this.versionId,
            //     'book_id': this.bookId,
            // }
            const params = {
                'token': this.$util.baseset.getInfo('token'),
                'version_id': this.$util.baseset.getInfo('versionId'),
                'book_id': this.$util.baseset.getInfo('bookId'),
            }
            this.$ajax.post(url, params)
            .then(function(res) {
                var data = res.data;
                if(data.code === 200) {
                    that.unit.data = [];
                    var arr = data.data;
                    for (var i = 0; i < arr.length; i++) {
                        that.unit.data.push({
                            'name':arr[i].unit_name,
                            'id':arr[i].id
                            });
                    }
                    console.log(that.unit.data);
                }
            })
            .catch(function(err) {
                 console.log(err)
             });
        },
        getChapter(){
            // 获取节
            console.log("unit_id"+this.unitId);
            var that = this;
            const url = this.$util.baseset.baseurl+'teacher/filter_topic_list';
            // const params = {
            //     'token': this.token,
            //     'version_id':this.versionId,
            //     'book_id': this.bookId,
            //     'unit_id': this.unitId,
            // }
            const params = {
                'token': this.$util.baseset.getInfo('token'),
                'version_id': this.$util.baseset.getInfo('versionId'),
                'book_id': this.$util.baseset.getInfo('bookId'),
                'unit_id': this.$util.baseset.getInfo('unitId'),
            }
            this.$ajax.post(url, params)
            .then(function(res) {
                var data = res.data;
                console.log(data);
                if(data.code === 200) {
                    that.chapter.data = [];
                    var arr = data.data;
                    for (var i = 0; i < arr.length; i++) {
                        that.chapter.data.push({
                            'name':arr[i].chapter_name,
                            'id':arr[i].id
                            });
                    }
                    console.log(that.chapter.data);
                }
            })
            .catch(function(err) {
                 console.log(err)
             });
        },
        getKnowledge() {
            // 获取知识点
            console.log("chapter_id"+this.chapterId);
            var that = this;
            const url = this.$util.baseset.baseurl+'teacher/filter_topic_list';
            // const params = {
            //     'token': this.token,
            //     'version_id':this.versionId,
            //     'book_id': this.bookId,
            //     'unit_id': this.unitId,
            //     'chapter_id': this.chapterId,
            // }
            const params = {
                'token': this.$util.baseset.getInfo('token'),
                'version_id': this.$util.baseset.getInfo('versionId'),
                'book_id': this.$util.baseset.getInfo('bookId'),
                'unit_id': this.$util.baseset.getInfo('unitId'),
                'chapter_id': this.$util.baseset.getInfo('chapterId'),
            }
            this.$ajax.post(url, params)
            .then(function(res) {
                var data = res.data;
                console.log(data);
                if(data.code === 200) {
                    that.knowledge.data = [];
                    var arr = data.data;
                    for (var i = 0; i < arr.length; i++) {
                        that.knowledge.data.push({
                            'name':arr[i].knowledge_name,
                            'id':arr[i].id
                            });
                    }
                    console.log(that.chapter.data);
                }
            })
            .catch(function(err) {
                 console.log(err)
             });
        },
        getTopicItems() {
            // 获取题目
            console.log(this.tmpData);
            if(this.tmpData == null){
                this.tmpData = []
            }
            let that = this;
            const url = this.$util.baseset.baseurl+'teacher/filter_topic_list';
            // const params = {
            //     'token': this.token,
            //     'version_id':this.versionId,
            //     'book_id': this.bookId,
            //     'unit_id': this.unitId,
            //     'chapter_id': this.chapterId,
            //     'knowledge_id': this.knowledgeId,
            //     'difficulty': this.difficultyId
            // }
            const params = {
                'token': this.$util.baseset.getInfo('token'),
                'version_id': this.$util.baseset.getInfo('versionId'),
                'book_id': this.$util.baseset.getInfo('bookId'),
                'unit_id': this.$util.baseset.getInfo('unitId'),
                'chapter_id': this.$util.baseset.getInfo('chapterId'),
                'knowledge_id': this.$util.baseset.getInfo('knowledgeId'),
                'difficulty': this.$util.baseset.getInfo('difficultyId')
            }
            console.log(params);
            that.$indicator.open({
              text: '加载中...',
              spinnerType: 'fading-circle'
            });
            this.$ajax.post(url, params)
            .then(function(res) {
                var data = res.data;
                console.log(data);
                that.$indicator.close()
                if(data.code == 200) {
                    // that.topicItems = data.data;
                    // console.log(that.topicItems);
                        $(".scroll").scrollTop(0);
                        that.topicItems = [];
                        console.log(that.topicItems);
                        var topicArr = data.data;
                        if(!topicArr[0].third_knowledge_id){
                            that.topicItems = [];
                        }else{
                            if(topicArr.length == 0){
                                that.$toast('暂无数据');
                            }
                            for (var i = 0; i < topicArr.length; i++) {
                                 that.topicItems.push({
                                    'id': topicArr[i].id,
                                    'body_html': topicArr[i].body_html,
                                    'option_html_list': topicArr[i].option_html_list,
                                    'difficulty_value' : topicArr[i].difficulty_value,
                                    'question_from': topicArr[i].question_from,
                                    'third_knowledge_id': topicArr[i].third_knowledge_id,
                                    'question_type_name': topicArr[i].question_type_name,
                                    'is_select': false
                                 })
                            }
                            var tmpData;
                            if(localStorage.tmpData == null || localStorage.tmpData == ""){
                                tmpData = []
                            }else{
                                tmpData=JSON.parse(localStorage.tmpData)
                            }
                            // var tmpData=JSON.parse(localStorage.tmpData)
                            for (var j = 0; j < tmpData.length; j++) {
                                var isBreak=false;
                                for (var i = 0; i < that.topicItems.length; i++) {
                                if((that.topicItems[i].third_knowledge_id == tmpData[j].third_knowledge_id) && (that.topicItems[i].id == tmpData[j].id)){
                                        that.topicItems[i].is_select = true;
                                        that.checkIndex=i;
                                        that.lastcheckIndex=i;
                                        isBreak=true;
                                        break;
                                    }
                                }
                                if(isBreak){
                                    break;
                                }
                            }
                            console.log(that.topicItems)
                        }
                }
            })
            .catch(function(err) {
                 console.log(err)
             });
        },
        isCheck(e,index) {
            let flag=false;
            // console.log(e.id, e.third_knowledge_id);
            console.log("前 "+"checkIndex"+this.checkIndex, "index"+index,"lastcheckIndex"+this.lastcheckIndex);
            this.checkIndex = index;
            if(this.tmpData.length>0){
                    for(let key in this.tmpData){
                        if(this.tmpData[key].third_knowledge_id==e.third_knowledge_id){
                            this.tmpData[key].id=e.id;
                            flag=true;
                        }
                    }
            }
            if(!flag){
                console.log(1)
                 this.tmpData.push({
                                id:e.id,
                                third_knowledge_id:e.third_knowledge_id
                    })
            }
            // console.log(this.tmpData)
            e.is_select = !e.is_select;
            console.log(e.is_select)
            console.log("后 "+"checkIndex"+this.checkIndex, "index"+index,"lastcheckIndex"+this.lastcheckIndex);
            // if(e.is_select == false){
            //     this.tmpData.splice({
            //         id:e.id,
            //         third_knowledge_id:e.third_knowledge_id
            //     },1);
            // }
            if(this.lastcheckIndex===this.checkIndex){
                console.log(222)
                // this.tmpData.splice({
                //     id:e.id,
                //     third_knowledge_id:e.third_knowledge_id
                // },1);
                for (var i = 0; i < this.tmpData.length; i++) {
                    if((e.third_knowledge_id == this.tmpData[i].third_knowledge_id) && (e.id == this.tmpData[i].id)){
                        console.log(this.tmpData);
                        console.log("id:"+e.id,"third_knowledge_id:"+e.third_knowledge_id,"is_select:"+e.is_select);
                        this.tmpData.splice(i,1);
                    }
                }
                this.lastcheckIndex=-1;
                this.checkIndex=-1;
                console.log("后 "+"checkIndex"+this.checkIndex, "index"+index,"lastcheckIndex"+this.lastcheckIndex);
            }
            else{
                console.log(111)
                this.lastcheckIndex=index;
            }
            this.$util.baseset.setInfo('tmpData',this.tmpData);
        },
        versionToggle() {
            this.popupVisible = true;
            this.isPopupVisible=!this.isPopupVisible
        },
        onValuesChange(picker, values) {

          this.pickerSelect = values[0].picker_name;
          this.versionId = values[0].picker_id;
          this.$util.baseset.setInfo('versionId',this.versionId);
        },
        versionCancle() {
            console.log("1"+this.versionName,"2"+this.pickerSelect);
            console.log("1"+this.versionLastId,"2"+this.versionId);
            this.popupVisible = !this.popupVisible;
            this.pickerSelect = this.versionName?this.versionName:this.versionSlots[0].values[0].picker_name;
            this.versionLastId?this.$util.baseset.setInfo('versionId',this.versionLastId):this.$util.baseset.setInfo('versionId',this.versionSlots[0].values[0].picker_id);
            // that.pickerSelect = that.versionSlots[0].values[0].picker_name;
        },
        versionSelect(){
            this.versionName   = this.pickerSelect;
            this.versionLastId =  this.versionId;
            this.popupVisible  = !this.popupVisible;
        },
        showDetail(e) {
            this.$router.push({name:'detail'});
            this.$util.baseset.setInfo('topic_analysis_id',e.id);
            if(this.$util.baseset.isIOS()){
                iOSManager.returnTitle("题目解析");
            }else if(this.$util.baseset.isAndroid()){
                AndroidFunction.returnTitle("题目解析");
            }
        },
        showSelected(){
            if(this.tmpData.length>0){
                this.$router.push({name:'selected'});
                if(this.$util.baseset.isIOS()){
                    iOSManager.returnTitle("已选题目");
                    // returnByBlock("已选题目");
                }else if(this.$util.baseset.isAndroid()){
                    AndroidFunction.returnTitle("已选题目");
                }
            }
        },
        clearLocalStorage(){
            localStorage.removeItem('gradeText');
            localStorage.removeItem('bookId');
            localStorage.removeItem('unitText');
            localStorage.removeItem('unitId');
            localStorage.removeItem('chapterId');
            localStorage.removeItem('knowledgeText');
            localStorage.removeItem('knowledgeId');
            localStorage.removeItem('difficultyText');
            localStorage.removeItem('difficultyId');
            localStorage.removeItem('tmpData');
            this.tmpText.gradeText = this.$util.baseset.getInfo('gradeText');
            this.tmpText.unitText = this.$util.baseset.getInfo('unitText');
            this.tmpText.knowledgeText = this.$util.baseset.getInfo('knowledgeText');
            this.tmpText.difficultyText = this.$util.baseset.getInfo('difficultyText');
            this.getGrade();
            this.getTopicItems();
        }
    },
}

</script>

<style scoped lang="scss">
@import "../../assets/scss/index.scss";
.container {
    position: relative;
    width: 100%;
    height: 100%;
    // overflow: auto;
    .fixed {
        position: fixed;
        top:0;
        left: 0;
        right: 0;
        z-index:20;
        height: 155px;
        background: #f7f7f7;
    }
    .scroll {
        position: absolute;
        top: 155px;
        bottom: 44px;
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
         -webkit-overflow-scrolling: touch; /* 增加该属性，可以增加弹性 */
    }
    .footer {
        position: fixed;
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
.header-box {
    display: -webkit-box;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    background: #fff;
    @include border-bottom1px(#F7F7F7);
    .flex-item {
        -webkit-box-flex:1;
        -moz-box-flex:1;
        display: block;
    }
    &.bolder{
        padding: 8px 15px;
        height: auto;
        line-height: 24px;
        span{
            display: block;
            padding-top: 12px;
        }
        span,p{
            font-weight: bolder;
        }
        .flex-item:last-child{
            text-align: right;
        }
    }
    .header-r {
        text-align: right;
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
.option-box {
    // height: 45px;
    // line-height: 45px;
    margin-top: 10px;
    @include border-top1px(#F7F7F7);
    .option{
        display: -webkit-box;
        height: 45px;
        line-height: 45px;
        background: #fff;
        @include border-bottom1px(#F7F7F7);
        .select-a{
            -webkit-box-flex:1;
            -moz-box-flex:1;
            position: relative;
            width: 24%;
            height: 45px;
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
                cursor: pointer;
               &.active{
                    color: #2EA2FD;
                    @include bg-image('f22_icon5');
                }
            }
            .select-dropdown {
                position: absolute;
                // z-index: 11;
                top: 45px;
                left: 0;
                // max-height: 300px;
                // overflow: auto;
                display: none;
                width: 100%;
                margin-bottom: 100px;
                background: #fff;
                border:1px solid #F7F7F7;
                border-top: none 0;
                a{
                    display: block;
                    line-height: 20px;
                    padding: 13px 5px 12px;
                    font-size: 14px;
                    color: #666;
                    cursor: pointer;
                    // @include border-bottom1px(#F7F7F7);
                    border-bottom: 1px solid #F7F7F7;
                    &:last-child{
                        // @include border-none;
                        border-bottom: none;
                    }
                    .sub-select-dropdown {
                        position: absolute;
                        top: 0;
                        left: 100%;
                        display: none;
                        width: 160%;
                        text-align: left;
                        background: #F7F7F7;
                        a{
                            &.active{
                                background: #EEEEEE;
                            }
                        }
                    }
                    &.active {
                        // position: relative;
                        background: #F7F7F7;
                        .sub-select-dropdown {
                            display: block;
                        }
                    }
                }
            }
            &#grade{
                .select-dropdown {
                    width: 150%;
                }
            }
            &#unit{
                .select-dropdown {
                    left: -10%;
                    width: 120%;
                }
            }
            &#knowledge{
                position: static;
                .select-dropdown {
                    right: 0;
                }
            }
        }
    }
}
.topic-wapper {
    position: relative;
    // padding-bottom: 44px;
    .topic {
        .topic-item {
            margin-bottom: 10px;
            padding: 10px 15px;
            background: #fff;
            line-height: 20px;
            color: #151515;
            dl{
                // 自动换行
                word-wrap: break-word;
                word-break: normal;
            }
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
    // .modal {
    //     position: fixed;
    //     top: 155px;
    //     right: 0;
    //     bottom: 0;
    //     left: 0;
    //     z-index:10;
    //     display: none;
    //     background: rgba(0,0,0,0.30);
    // }
    .modal {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index:10;
        display: none;
        min-height: 468px;
        background: rgba(0,0,0,0.30);
    }
}
</style>
