<template>
<div class="bgwhite">
    <div class="report-content">
        <div class="h4">{{message}}</div>
        <div class="circleChart" id="0"></div>
        <p>今日共答{{testingData.all_topic}}道题，正确{{testingData.right_topic}}道，错误{{testingData.error_topic}}道</p>
    </div>
    <div class="report-btn">
        <!-- <a href="javascript:;" class="btn btn-warning" @click="showWrongList">错题解析</a> -->
        <a href="javascript:;" class="btn" :class="[testingData.percentage<100?'btn-warning':'btn-disabled']" @click="showWrongList">错题解析</a>
    </div>
    <div class="report-btn">
        <a href="javascript:;" class="btn" :class="[testingData.percentage<100?'btn-primary':'btn-disabled']" @click="submitPrompt">再练一遍</a>
    </div>
</div>
</template>

<script>
require("../../assets/js/jquery-1.11.0.min.js");
require("../../assets/js/circleChart.min.js");
export default {
  data () {
    return {
        testingData: this.$util.baseset.getInfo('testing_data'),
        count: this.$util.baseset.getStr('count'),
        message: '',
        courseName: this.$util.baseset.getInfo('course_name')
    }
  },
  created(){
        console.log(this.testingData);
        this.showMessage(this.testingData.percentage);
  },

  mounted() {
    var that = this;
    $(".circleChart#0").circleChart({
        size: 130,
        value: that.testingData.percentage,
        color: "#2EA2FD",
        backgroundColor: "#eeeeee",
        widthRatio: 0.15,
        text: 0,
        textSize: 30,
        onDraw: function(el, circle) {
            circle.text(Math.round(circle.value) + "%");
        }
    });
  },
  methods: {
    showWrongList() {
        if(this.testingData.percentage < 100){
        // if(this.testingData.percentage == 100){
        //      this.$toast('没有错题!');
        // }else{
            this.$router.push({name:'wrongList'})
            if(this.$util.baseset.isIOS()){
                iOSManager.returnTitle("错题解析");
            }else if(this.$util.baseset.isAndroid()){
                AndroidFunction.returnTitle("错题解析");
            }
        }
    },
    submitPrompt() {
        if(this.testingData.percentage<100){
            this.count++;
            this.$util.baseset.setStr("count",this.count);
            console.log(this.count)
            if(this.count > 1){
                this.$messagebox({
                  title: '提示',
                  message: '系统正在升级，即将上线！',
                  showCancelButton: true,
                });
            }else{
                this.$router.push({name:'onceAgainTest'})
                if(this.$util.baseset.isIOS()){
                    iOSManager.returnTitle('今日'+this.courseName+'检测');
                }else if(this.$util.baseset.isAndroid()){
                    AndroidFunction.returnTitle('今日'+this.courseName+'检测');
                }
            }
        }
    },
    showMessage(val){
        if(val == 0){
            return this.message = '努力从今天开始，成功从“零”开始!';
        }
        if(val > 0 && val <= 30) {
            return this.message = '别把你的聪明藏起来!';
        }
        if(val > 30 && val <= 60) {
            return this.message = '还需要继续努力!';
        }
        if(val > 60 && val <= 80) {
            return this.message = '今天表现很不错哦！';
        }
        if(val > 80 && val <= 90) {
            return this.message = '噢，真棒！';
        }
        if(val > 90 && val <= 100) {
            return this.message = '我为你今天的表现感到骄傲！';
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.bgwhite{
    width: 100%;
    height: 100%;
    background: #fff;
}
.report-content {
    margin-bottom: 60px;
    padding-top: 20px;
    text-align: center;
    .h4 {
        font-weight: bold;
        margin-bottom: 20px;
    }
    .circleChart {
        margin-bottom: 70px;
    }
}
.report-btn {
    margin: 20px 52px 20px 53px;
    .btn{
        display: block;
        padding: 16px 0 15px;
        border-radius: 100px;
        font-size: 15px;
    }
}
</style>
