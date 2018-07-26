<template>
	<div class="Risk_detail">
		<!-- <headers :headName="title"></headers> -->
        <headers headName="心血管疾病风险评估"></headers>
        <div class="contentScollr">
            <div class="head_box" @click="openPicker()">
                <span>{{pickerValue}}</span>
                <img src="../assets/images/c12_xiala.png" alt="">
            </div>
            <p class="detail-title">
                动脉硬化性心血管疾病(ASCVD)
            </p>
            <div class="chart-box">
                <div class="chart-info">
                    <p class="title">
                        10年ASCVD风险
                    </p>
                    <div class="center-box">
                        <p class="line1">
                            <span>{{cvd_10yearRisk}}</span>
                            (你的10年DSCVD风险)
                        </p>
                        <p class="line2">
                            同龄人最佳的10年ASCVD危险因素水平:<span>{{opt_10yearRisk}}</span>(同龄最佳值)
                        </p>
                    </div>
                </div>
                <div id="two-bar1" class="bar-chart"></div>
            </div>
            <div class="chart-box">
                <div class="chart-info">
                    <p class="title">
                        终身ASCVD风险
                    </p>
                    <div class="center-box">
                        <p class="line1">
                            <span>{{cvd_LifetimeRisk}}</span>
                            (你的终身DSCVD风险)
                        </p>
                        <p class="line2">
                            同龄人最佳的终身ASCVD危险因素水平:<span>{{opt_LifetimeRisk}}</span>(同龄最佳值)
                        </p>
                    </div>
                </div>
                <div id="two-bar2" class="bar-chart"></div>
            </div>
        </div>
        <mt-datetime-picker
            ref="picker"
            type="date"
            year-format="{value}"
  month-format="{value}"
  date-format="{value}"
  @confirm="handleConfirm">
        </mt-datetime-picker>
	</div>
</template>

<script>
import headers from "../components/Header.vue";

let d = new Date(),
today = (d.getFullYear())+'-'+((d.getMonth()+1)>9?d.getMonth()+1:'0'+(d.getMonth()+1))+'-'+(d.getDate()>9?d.getDate():'0'+d.getDate());

export default {
  data () {
    return {
      pickerValue:today,
	  twoBar_data: [1.72, 0.49],
      nameData:["10年风险","10年最优值"],
      barName:'10年ASCVD风险',
      twoBar_data2: [39, 8],
      nameData2:["终身风险","终身最优值"],
      barName2:'终身ASCVD风险',
      title:this.$route.params.title,
      ascvdObj:{}
    }
  },
  computed: {
      cvd_10yearRisk: function(){
          return this.ascvdObj.cvd_10yearRisk != ""? Number(this.ascvdObj.cvd_10yearRisk).toFixed(2) + "%" : "-";
      },
      opt_10yearRisk: function(){
          return this.ascvdObj.opt_10yearRisk != ""? Number(this.ascvdObj.opt_10yearRisk).toFixed(2) + "%" : "-";
      },
      cvd_LifetimeRisk: function(){
          return this.ascvdObj.cvd_10yearRisk != ""? Number(this.ascvdObj.cvd_10yearRisk).toFixed(2) + "%" : "-";
      },
      opt_LifetimeRisk: function(){
          return this.ascvdObj.opt_10yearRisk != ""? Number(this.ascvdObj.opt_10yearRisk).toFixed(2) + "%" : "-";
      },
  },
  methods:{
	openPicker(num) {
        this.$refs.picker.open();
    },
    handleConfirm(res){
		let d=new Date(res);
		this.pickerValue=(d.getFullYear())+'-'+((d.getMonth()+1)>9?d.getMonth()+1:'0'+(d.getMonth()+1))+'-'+(d.getDate()>9?d.getDate():'0'+d.getDate());
    },
    getData(){
        var that = this
        that.$ajax.get('/check/ascvd')
        .then(function(res){
            console.log(res.data)
            if(res.data.status == 200){
                if (typeof res.data.data == "string") {
              that.$toast("该患者还没有体征检测的一般数据，或基础问卷未填写！");
              setTimeout(function() {
                that.$router.go(-1);
              }, 1500);
            } else {
                that.ascvdObj = res.data.data;
                console.log(that.ascvdObj);
            }
            }
        })
        .catch(function(err){
                that.linkLogin(that)
        })
    },
},
  created:function(){

  },
  mounted:function(){
     this.getData();
	 this.myChart.twoBar(this.twoBar_data,"two-bar1",this.nameData,this.barName);
     this.myChart.twoBar(this.twoBar_data2,"two-bar2",this.nameData2,this.barName2);

 },
 components:{headers},
}
</script>

<style lang="scss" scoped>
.Risk_detail{
    // width: 100%;
    // overflow: hidden;
    // margin-top: 4.2rem;
    background: #fff;
    display: flex;
	height: 100%;
	flex-direction: column;
	.contentScollr {
		flex: 1;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}
    .detail-title{
        line-height: 2.5rem /* 100/40 */;
        text-align: center;
        font-size: .8rem /* 30/40 */;
        color: #666;
        height: 2.5rem;
        background: #eee;
    }
    .head_box{
        width: 100%;
        height: 2.05rem;
        overflow: hidden;
        // position: fixed;
        background: #fff;
        z-index: 1999;
        // top: 2.2rem;
        // left: 0;
        background-color: #fff;
        text-align: center;
        line-height: 2.05rem;
        span{
            color: #4CC6D8;
            font-size:.7rem ;
        }
        img{
            width: .5rem;
            height: .3rem;
            vertical-align: middle;
            margin-left: .15rem;
        }
    }
    .chart-box{
        border-bottom: .5rem /* 20/40 */ solid #f5f5f5;
    }
    .chart-info{
        padding: .8rem /* 30/40 */;
        padding-bottom:0;
        .title{
            font-size: .7rem /* 28/40 */;
            margin-bottom: 1.6rem /* 64/40 */;
            color: #4cc6d8;
        }
        .center-box{
            padding: 0 2.3rem /* 90/40 */;
            p{
                font-size: .6rem /* 22/40 */;
                color: #999;
                line-height: .7rem /* 26/40 */;
                text-align: center;
            }
            .line1{
                span{
                    font-size: 1.2rem /* 48/40 */;
                    color: #4cc6d8;;
                    font-family: impact;
                }
                margin-bottom: .8rem /* 32/40 */;
            }
        }
    }
	.bar-chart{
		width: 100%;
        height: 17rem;
	}
}
</style>
