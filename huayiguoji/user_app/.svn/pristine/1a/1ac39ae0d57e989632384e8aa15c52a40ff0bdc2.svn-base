<template>
  <div class="blood-assessment">
    <headers headName="血脂风险评估"></headers>
    <div class="contentScollr">
      <div class="head_box" @click="openPicker()">
        <span>{{pickerValue}}</span>
        <img src="../assets/images/c12_xiala.png" alt="">
      </div>
      <div class="pressure-status">
        <p class="title-p">
          血脂状况
        </p>
        <table class="table-status">
          <tbody>
          <tr class="head-tr">
            <td>项目</td>
            <td>数值</td>
          </tr>
          <tr v-for="(item,index) in dataHealthModel" :key="index">
            <td>{{item.title}}</td>
            <td><span>{{item.pivot.value?item.pivot.value:"-"}}</span><span>{{item.unit}}</span></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="risk">
        <p class="title-p">
          风险评估
        </p>
        <div class="risk-box">
          <p class="title">
            <!-- 我的危险分级：低危(10年危险性＜5%) -->
            我的危险分级：<span>{{dataBL.risk_stratification_str}}</span>
          </p>
          <div class="thermometer-chart relative">
            <img src="../assets/images/c35_zhuzhuang.png">
            <span class="best absolute">极高危</span>
            <span class="high absolute">高危</span>
            <span class="middle absolute">中危</span>
            <span class="low absolute">低危</span>
            <div class="current absolute clearFix" v-bind:style="{bottom: dataBlnum+'%'}"><span
              class="me left"><span>我</span></span><span class="num left">{{dataBL.risk_stratification}}</span><span
              class="status left">({{blStr}})</span></div>
          </div>
        </div>
      </div>
      <div class="chart-box">
        <div class="title-p clear">
          <span class="left">目标值</span>
          <p class="right">
            <img src="../assets/images/c35_dian1.png"/><span>总固醇</span>
            <img src="../assets/images/c35_dian.png"/><span>低密度脂蛋白</span>
          </p>
        </div>
        <div id="mychart">

        </div>
      </div>
      <div class="pressure-status lifestyle">
        <p class="title-p">
          生活方式
        </p>
        <p class="head-top">
          暂不需要改善生活方式
        </p>
        <table class="table-status">
          <tbody>
          <tr class="head-tr">
            <td>生活方式</td>
            <td>内容</td>
          </tr>
          <tr v-for="(item,index) in dataSituationModel" :key="index">
            <td>{{item.title}}</td>
            <td>{{item.value?item.value:"-"}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="comprehensive">
        <p class="title-p">
          药物治疗
        </p>
        <div class="content-word">
          暂时不需要开始药物治疗。
        </div>
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
    today = (d.getFullYear()) + '-' + ((d.getMonth() + 1) > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate());

  export default {
    data() {
      return {
        pickerValue: today,
        barData: [1.5, 1.5],
        lineBarData: [4.5, 4.5],
        dataBL: {},
        dataBlnum: 0,
        dataHealthModel: [],
        dataSituationModel: []
      }
    },
    computed: {
      blStr: function () {
        var str = String(this.dataBL.risk_stratification_str);
        if (str == 'undefined') {
          console.log('==========',str)
          return '无'
        } else {
          return str.split('(')[0];
        }

      }
    },
    methods: {
      openPicker(num) {
        this.$refs.picker.open();
      },
      handleConfirm(res) {
        let d = new Date(res);
        this.pickerValue = (d.getFullYear()) + '-' + ((d.getMonth() + 1) > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate());
      },
      getData() {
        var that = this
        that.$ajax.get('/check/bloodfat')
          .then(function (res) {
            console.log(res.data)
            if (res.data.status == 200) {
              if (typeof res.data.data == "string") {
              that.$toast("该患者还没有体征检测的一般数据，或基础问卷未填写！");
              setTimeout(function() {
                that.$router.go(-1);
              }, 1500);
            } else {
              that.dataObj = res.data.data;
              that.dataBL = that.dataObj.bl;
              that.dataBlnum = that.dataBL.risk_stratification;
              that.dataHealthModel = that.dataObj.health_model;
              that.dataSituationModel = that.dataObj.situation_model;
              console.log(that.dataBL);
              console.log(that.dataHealthModel);
              console.log(that.dataSituationModel)
            }
            }
          })
          .catch(function (err) {
            that.linkLogin(that)
          })
      }
    },
    created: function () {

    },
    mounted: function () {
      this.BaseSet.getToken(this);
      this.myChart.barLine(this.lineBarData, this.barData, "mychart");
      this.getData();
    },
    components: {headers},
  }
</script>

<style lang="scss" scoped>
  .blood-assessment {
    // width: 100%;
    // overflow: hidden;
    // margin-top: 4.2rem;
    display: flex;
    height: 100%;
    flex-direction: column;
    .contentScollr {
      flex: 1;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
    .detail-title {
      line-height: 2.5rem /* 100/40 */
    ;
      text-align: center;
      font-size: .8rem /* 30/40 */
    ;
      color: #666;
      height: 2.5rem;
      background: #eee;
    }
    .head_box {
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
      span {
        color: #4CC6D8;
        font-size: .7rem;
      }
      img {
        width: .5rem;
        height: .3rem;
        vertical-align: middle;
        margin-left: .15rem;
      }
    }
    .title-p {
      margin-top: .5rem /* 20/40 */
    ;
      font-size: .8rem /* 30/40 */
    ;
      line-height: 2rem /* 80/40 */
    ;
      padding: 0 .8rem /* 30/40 */
    ;
      color: #4CC6D8;
      background: #fff;
    }
    .table-status {
      width: 100%;
      background: #fff;
      tr, td {
        border: 1px solid #e5e5e5;
        line-height: 2.3rem /* 90/40 */
      ;
        font-size: .7rem /* 28/40 */
      ;
        color: #666;
      }
      tr:nth-of-type(2n) {
        background: #f9f6f6;
      }
      td {
        padding: 0 .8rem /* 30/40 */
      ;
        width: 50%;
      }
      .head-tr {
        td {
          color: #333;
          font-weight: 600;
        }
      }
    }
    .risk-box {
      background: #fff;
      padding-bottom: 2.1rem /* 83/40 */
    ;
      .title {
        font-size: .7rem /* 28/40 */
      ;
        color: #666;
        text-align: center;
        line-height: .7rem /* 28/40 */
      ;
        padding-top: .7rem /* 26/40 */
      ;
        border-top: 1px solid #e5e5e5;
      }
      .thermometer-chart {
        position: relative;
        text-align: center;
        padding-top: 2.1rem /* 83/40 */
      ;
        width: 6.5rem /* 260/40 */;
        margin: 0 auto;
        .absolute {
          position: absolute;
        }
        > img {
          width: .8rem /* 34/40 */
        ;
        }
        > span {
          font-size: .6rem /* 24/40 */
        ;
          left: 0;
          text-align: right;
          width: 2.5rem /* 100/40 */;
        }
        .best {
          color: #FC4F4F;
          top: 1.8rem /* 71/40 */
        ;
        }
        .high {
          color: #FF902E;
          top: 3.4rem /* 135/40 */
        ;
        }
        .middle {
          color: #FFD52E;
          top: 5rem /* 200/40 */
        ;
        }
        .low {
          color: #4CC6D8;
          top: 6.7rem /* 265/40 */
        ;
        }
        .current {
          position: absolute;
          // right: -1.5rem /* -100/40 */;
          left: 3.8rem;
          width: 100%;
          .me {
            float: left;
            width: 1.3rem /* 53/40 */
          ;
            height: .8rem /* 32/40 */
          ;
            line-height: .8rem /* 32/40 */
          ;
            background: url("../assets/images/a1_me.png");
            background-size: 1.3rem .8rem;
            background-repeat: no-repeat;
            color: #fff;
            text-align: center;
            span {
              margin-left: .3rem /* 2/40 */
            ;
              font-size: .6rem /* 22/40 */
            ;
              vertical-align: middle;
              display: inline-block;
              margin-top: -.3rem;
            }
          }
          .left {
            float: left;
          }
          .num {
            font-size: .9rem /* 36/40 */
          ;
            color: #4CC6D8;
            line-height: .9rem /* 36/40 */
          ;
            margin-left: .3rem /* 10/40 */
          ;
          }
          .status {
            font-size: .6rem /* 24/40 */
          ;
            color: #4CC6D8;
            line-height: .6rem /* 24/40 */
          ;
            margin-top: .2rem /* 12/40 */
          ;
          }
        }
      }
    }
    .lifestyle {
      .head-top {
        line-height: 2rem /* 80/40 */
      ;
        padding: 0 .8rem /* 30/40 */
      ;
        font-size: .7rem /* 28/40 */
      ;
        background: #F9F6F6 100%;
        color: #333;
        border-top: 1px solid #e5e5e5;
      }
      .table-status {
        td {
          line-height: .9rem /* 36/40 */
        ;
          padding: .7rem /* 30/40 */
          .8rem;
          &:nth-of-type(1) {
            width: 5.3rem /* 214/40 */
          ;
          }
          &:nth-of-type(2) {
            width: calc(100% - 5.3rem);
          }
        }
      }
    }
    .chart-box {
      margin-bottom: .5rem /* 20/40 */
    ;
      background: #fff;
      #mychart {
        width: 100%;
        height: 17.5rem /* 700/40 */
      ;
      }
      .title-p {
        border-bottom: 1px solid #e5e5e5;
        .left {
          float: left;
        }
        .right {
          float: right;
          img {
            width: .8rem /* 30/40 */
          ;
            height: .8rem /* 30/40 */
          ;
            margin-right: .2rem /* 8/40 */
          ;
            float: left;
            margin-top: .6rem /* 25/40 */
          ;
            &:nth-of-type(2) {
              margin-left: .6rem /* 25/40 */
            ;
            }
          }
          span {
            float: left;
            line-height: 2rem /* 80/40 */
          ;
          }
          font-size: .6rem /* 24/40 */
        ;
          color: #666;
          line-height: 2rem /* 80/40 */
        ;
        }
      }
    }
    .comprehensive {
      .title-p {
        border-bottom: 1px solid #e5e5e5;
      }
      .content-word {
        font-size: .7rem /* 26/40 */
      ;
        color: #666;
        line-height: .9rem /* 36/40 */
      ;
        padding: .7rem /* 28/40 */
        .8rem /* 30/40 */
      ;
        background: #fff;
        padding-bottom: 1.3rem /* 52/40 */
      ;
      }
    }
  }
</style>
