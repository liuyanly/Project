<template>
    <div class="list-wrapper">
        <div class="msg" :class="[msg?'show':'hide']">
            {{msg}}
        </div>
        <div class="list-item" v-for="listItem in listItems" @click="showTest(listItem)">
            <span class="flex-item">今日{{listItem.course_name}}检测</span>
            <a class="flex-item header-r" href="javascript:;"><i class="icon-danger"></i><i class="icon-arrow"></i></a>
        </div>
        <!-- <div class="list-item">
            <span>今日语文检测</span>
            <a class="header-r" href="javascript:;"><i class="icon-arrow"></i></a>
        </div>
        <div class="list-item">
            <span>今日英语检测</span>
            <a class="header-r" href="javascript:;"><i class="icon-arrow"></i></a>
        </div>
        <div class="list-item">
            <span>今日生物检测</span>
            <a class="header-r" href="javascript:;"><i class="icon-arrow"></i></a>
        </div> -->
    </div>
</template>

<script>
export default {

  data () {
    return {
        listItems: [],
        patriarchToken: '',
        classId: '',
        msg: '',
    }
  },
  created(){
        let params = this.$util.baseset.getQueryString();
        // this.patriarchToken = '277a25171277beb000290d9f1eecd995'; //测试数据
        // this.classId = 148; //测试数据
        this.patriarchToken = params.token;
        this.classId = params.class_id;
        this.$util.baseset.setInfo('token',this.patriarchToken);
        this.getTestingLists()
  },
  methods: {
    getTestingLists(){
        // 题目解析
            var that = this;
            const url = this.$util.baseset.baseurl+'parent/testing_lists';
            const params = {
                'token': this.patriarchToken,
                'class_id': this.classId,
            }
            this.$ajax.post(url, params)
            .then(function(res) {
                var data = res.data;
                console.log(data);
                if(data.code === 200) {
                    // that.$util.baseset.setInfo('patriarch_token',data.data.user_info.token);
                    that.listItems = data.data.list;
                    console.log(that.listItems)
                    if(that.listItems.length == 0){
                        // that.$toast('暂无数据')
                        that.msg = '暂无数据'
                    }
                }
            })
            .catch(function(err) {
                 console.log(err)
             });
    },
    showTest(e) {
        this.$util.baseset.setInfo('course_name', e.course_name);
        this.$util.baseset.setInfo('topic_id',e.topic_id);
        this.$util.baseset.setInfo('release_id',e.id);
        this.$util.baseset.setInfo('course_id',e.course_id);
        this.$router.push({name:'test'});
        if(this.$util.baseset.isIOS()){
            iOSManager.returnTitle('今日'+e.course_name+'检测');
        }else if(this.$util.baseset.isAndroid()){
            AndroidFunction.returnTitle('今日'+e.course_name+'检测');
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/scss/index.scss";
.list-wrapper {
    .list-item {
        // display: flex;
        display: -webkit-box;
        height: 50px;
        line-height: 50px;
        padding: 0 15px;
        justify-content: space-between;
        font-size: 15px;
        background: #fff;
        @include border-bottom1px(#F7F7F7);
        .flex-item {
            -webkit-box-flex:1;
            -moz-box-flex:1;
            display: block;
        }
        .header-r {
            text-align: right;
            color: #666;
            .icon-danger {
                display: inline-block;
                width: 8px;
                height: 8px;
                @include bg-image('f27_icon1');
                background-size: 8px 8px;
                background-repeat: no-repeat;
            }
            .icon-arrow {
                display: inline-block;
                margin-left: 10px;
                width: 7px;
                height: 12px;
                vertical-align: middle;
                @include bg-image('f22_icon4');
                background-size: 7px 12px;
                background-repeat: no-repeat;
            }
        }
    }
    .msg {
        display: none;
        padding-top: 300px;
        text-align: center;
    }
}
</style>
