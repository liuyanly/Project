<template>
  <div class="monitoring_detail">
    <headers headName="体征监测"></headers>
    <div class="contentScollr">
      <div class="nav">
        <ul id="nav">
          <li v-for="(nav,index) in navItem" :key="index" @click="SubCates(nav.title,nav.id)" :class="{'active': isActive == nav.id}">
            {{nav.title}}
          </li>
        </ul>
      </div>
      <div class="time_search">
        <div class="time">
          <span class="txt" @click="openPicker(1)">{{timeValue}}</span><img src="../assets/images/c12_xiala.png" /></div>
        ~
        <div class="time">
          <span class="txt" @click="openPicker(2)">{{timeValue1}}</span><img src="../assets/images/c12_xiala.png" /></div>
        <div class="btn" @click="filterData()">查询</div>
      </div>
      <div class="chart-box">
        <p class="chart-name">
          <i>{{content}}</i>变化趋势
        </p>
        <ul class="chart-date clear">
          <li :class="{current:currentDate==7}" @click="changeCurrentDate(7)">
            周
          </li>
          <li :class="{current:currentDate==31}" @click="changeCurrentDate(31)">
            月
          </li>
          <li :class="{current:currentDate==365}" @click="changeCurrentDate(365)">
            年
          </li>
        </ul>
        <div id="main"></div>
        <!-- <div id="two-bar1"></div> -->
      </div>
      <div class="table-box" v-show="dataList.length>0">
        <table>
          <tr class="theadTr">
            <td>测量时间</td>
            <td v-for="data in titleFields">{{data.title}}{{data.unit!=""?"("+data.unit+")":""}}</td>
            <td>结果</td>
          </tr>
          <tr v-for="data in dataList">
            <td>
              <!-- <span class="tag"><img src="../assets/images/c20_1bq.png" /></span> -->
              <span>{{data.check_at.substring(0,10)}}</span>
            </td>
            <td v-for="dt in data.fields">
              <span>{{dt.pivot.value}}</span>
            </td>
            <td>
              <span>{{data.result}}</span>
            </td>
          </tr>
        </table>
      </div>
      <mt-datetime-picker ref="picker" type="date" v-model="pickerValue" year-format="{value}" month-format="{value}" date-format="{value}" @confirm="handleConfirm">
      </mt-datetime-picker>
      <mt-datetime-picker ref="picker1" type="date" v-model="pickerValue1" year-format="{value}" month-format="{value}" date-format="{value}" @confirm="handleConfirm1">
      </mt-datetime-picker>
    </div>
    <p class="input-btn" @click="link()">
      数据录入
    </p>
  </div>
</template>

<script>
import headers from "../components/Header.vue";
export default {
  data() {
    return {
      isActive: this.$route.params.id,
      content: "",
      pickerValue: this.getTimes(-7),
      pickerValue1: this.getTimes(),
      timeValue: this.getTimes(-7),
      timeValue1: this.getTimes(),
      currentDate: 7,
      dataList: [],
      titleFields: "",
      xData: ["01-18 2016", "02-25 2017", "01-05 2018"],
      line1: [110, 125, 141],
      line2: [65, 78, 75],
      twoBar_data: [1.8, 0.75],
      nameData: ["10年风险", "10年最优值"],
      barName: "10年ASCVD风险",
      navItem: [],
      patientId: this.BaseSet.getInfo("patientId")
    };
  },
  methods: {
    filterData() {
      if (this.pickerValue != "开始时间" && this.pickerValue1 != "结束时间") {
        this.getData( 
          "/checks/" +
            this.isActive +
            "?start_time=" +
            this.timeValue +
            " 00:00:00" +
            "&end_time=" +
            this.timeValue1 +
            " 23:59:59"
        );
      } else if (this.pickerValue == "开始时间") {
        this.$toast("请选择开始时间");
      } else if (this.pickerValue1 == "结束时间") {
        this.$toast("请选择结束时间");
      }
    },
    getTimes(timespan) {
      if (timespan === undefined) {
        timespan = 0;
      }
      var now = new Date();
      now.setDate(now.getDate() + timespan);
      return (
        now.getFullYear() +
        "-" +
        (now.getMonth() + 1) +
        "-" +
        now.getDate()
      ).toString();
    },
    getData(url) {
      var that = this;
      that.$ajax
        .get(url)
        .then(function(res) {
          if (res.data.status == 200 && !(res.data.data instanceof Array)) {
            if (res.data.data.data instanceof Array) {
              that.dataList = res.data.data.data;
              for (var i = 0; i < that.dataList.length; i++) {
                for (var j = 0; j < that.dataList[i].fields.length; j++) {
                  that.dataList[i].fields[j].pivot.value = parseFloat(
                    that.dataList[i].fields[j].pivot.value
                  ).toFixed(2);
                }
              }
              that.titleFields = that.dataList[0].fields;
            }
            var data = [];
            var name = [];
            for (var i = 0; i < res.data.data.fields.length; i++) {
              var dt = res.data.data.fields[i];
              var tem = {
                title: dt[0].title,
                data: [],
                color: that.linecolor[i],
                legendDot: "../src/assets/images/c20_1dian1.png",
                bgPic: "../src/assets/images/c20_1bg2.png",
                date: []
              };
              for (var j = 0; j < dt.length; j++) {
                var item = dt[j];
                tem.date.push(res.data.data.fields[0][j].check_at);
                tem.data.push(parseFloat(item.pivot.value).toFixed(2));
              }
              data.push(tem);
            }
            that.myChart.twoLine(data);
            // that.myChart.twoBar(that.twoBar_data,"two-bar1",that.nameData,that.barName)
            console.log(data);
          } else if (res.data.status == 401) {
            that.BaseSet.linkLogin(that);
          } else if (res.data.status == 200 && res.data.data instanceof Array) {
            that.$toast("暂无数据");
          } else {
            that.$toast(res.data.message);
          }
        })
        .catch(function(err) {
          //that.BaseSet.linkLogin(that);
        });
    },
    getHeadData() {
      var that = this;
      that.$ajax
        .get("/check")
        .then(function(res) {
          if (res.data.status == 200) {
            console.log(res.data.data);
            if (res.data.data instanceof Array) {
              that.navItem = res.data.data;
              var tempItem = that.navItem.filter(function(e) {
                return e.id == that.isActive;
              });
              that.content = tempItem[0].title;
            }
          } else if (res.data.status == 401) {
            that.BaseSet.linkLogin(that);
          } else {
            that.$toast(res.data.message);
          }
        })
        .catch(function(err) {
          that.$toast(err);
          //that.BaseSet.linkLogin(that);
        });
    },
    Back() {
      this.$router.go(-1);
    },
    link() {
      var that = this;
      this.$router.push({ name: "DataInput", params: { id: that.isActive } });
    },
    changeCurrentDate(num) {
      this.currentDate = num;
      this.pickerValue = this.timeValue = this.getTimes(-num);
      this.pickerValue1 = this.timeValue1 = this.getTimes();
      this.filterData();
    },
    SubCates(val, index) {
      this.content = val;
      this.isActive = index;
      this.filterData();
    },
    openPicker(num) {
      if (num == 1) {
        this.$refs.picker.open();
      } else {
        this.$refs.picker1.open();
      }
    },
    handleConfirm(res) {
      let d = new Date(res);
      this.pickerValue = this.timeValue =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1)) +
        "-" +
        (d.getDate() > 9 ? d.getDate() : "0" + d.getDate());
    },
    handleConfirm1(res) {
      let d = new Date(res);
      this.pickerValue1 = this.timeValue1 =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1)) +
        "-" +
        (d.getDate() > 9 ? d.getDate() : "0" + d.getDate());
    }
  },
  created: function() {},
  mounted: function() {
    this.BaseSet.getToken(this);
    this.getHeadData();
    this.patientId = this.BaseSet.getInfo("patientId");
    var that = this;
    this.filterData();
  },
  components: { headers }
};
</script>

<style lang="scss" scoped>
.monitoring_detail {
  width: 100%;
  background: #fff;
  display: flex;
  height: 100%;
  flex-direction: column;
  .contentScollr {
    margin-bottom:2rem;
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .nav {
    width: auto;
    height: 2rem;
    overflow: scroll;
    background-color: #fff;
    ul {
      height: 2rem;
      // overflow: scroll;
      // display: flex;
      // display: -webkit-flex;
      white-space: nowrap;
      overflow-x: scroll;
      overflow-y: hidden;
      -webkit-backface-visibility: hidden;
      -webkit-perspective: 1000;
      -webkit-overflow-scrolling: touch; /* 2 */
      text-align: justify; /* 3 */
      &::-webkit-scrollbar {
        display: none;
      }
    }
    li {
      //   width: auto;
      //   flex: 1;
      //   padding: 0 1rem;
      //   line-height: 1.9rem;
      //   font-size: 0.7rem;
      // white-space:nowrap;
      //   color: #666666;
      font-size: 0.7rem;
      margin: 0 1rem;
      display: inline-block;
      line-height: 1.9rem;
      white-space: nowrap;
      color: #666666;
    }
    li.active {
      border-bottom: #4cc6d8 2px solid;
    }
  }
  .time_search {
    width: 100%;
    background-color: #fff;
    height: 2rem;
    overflow: hidden;
    font-size: 0.7rem;
    text-align: center;
    line-height: 2rem;
    color: #666;
    border-top: #e5e5e5 1px solid;
    border-bottom: 0.5rem solid #f5f5f5;
    .time {
      display: inline-block;
      vertical-align: middle;
      font-size: 0.7rem;
      color: #999;
      margin: 0 0.25rem;
      img {
        width: 0.5rem;
        height: 0.275rem;
        vertical-align: middle;
      }
      .txt {
        color: #4cc6d8;
        margin-right: 0.25rem;
      }
    }
    .btn {
      width: 3rem;
      height: 1.25rem;
      display: inline-block;
      vertical-align: middle;
      line-height: 1.25rem;
      background-color: #4dc6d8;
      text-align: center;
      border-radius: 0.25rem;
      color: #ffffff;
      font-size: 0.7rem;
      margin-left: 0.5rem;
    }
  }
  .chart-box {
    .chart-name {
      font-size: 0.7rem;
      color: #4cc6d8;
      padding: 0.75rem;
      line-height: 0.7rem;
    }
    .chart-date {
      margin-left: 0.75rem;
      li {
        float: left;
        width: 2.1rem;
        height: 1.25rem;
        line-height: 1.25rem;
        border: 1px solid #999;
        border-radius: 0.625rem;
        text-align: center;
        margin-right: 0.35rem;
        font-size: 0.7rem;
        color: #999;
      }
      .current {
        background: #4cc6d8;
        color: #fff;
        border-color: #4cc6d8;
      }
    }
  }
  .table-box {
    width: 100%;
    overflow-y: hidden;
    overflow-x: auto;
    //border-top: #e5e5e5 1px solid;
    table {
      width: 100%;
      tr,
      td {
        border: 1px solid #e6e6e6;
        min-height: 2.2rem;
        text-align: center;
        position: relative;
        word-break: keep-all;
      }
      tr:nth-of-type(2n) {
        background: #f9f6f6;
      }
      td {
        padding: 0.5rem 0.5rem 0.5rem 0.5rem;
        font-size: 0.6rem;
        color: #666;
      }
      .theadTr {
        td {
          font-size: 0.6rem;
          color: #333;
        }
      }
      .tag {
        position: absolute;
        img {
          width: 0.6rem;
          height: 1.2rem;
        }
        left: 0;
      }
    }
    li {
      width: 100%;
      overflow: hidden;
      border-bottom: #e5e5e5 1px solid;
      dd {
        height: 2.25rem;
        float: left;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        color: #666666;
        font-size: 0.6rem;
        text-align: center;
        border-right: #e5e5e5 1px solid;
        box-sizing: border-box;
        width: 3.75rem;
        padding: 0 0.75rem 0 0.75rem;
        position: relative;
      }
      .tag {
        position: absolute;
        img {
          width: 0.6rem;
          height: 1.2rem;
        }
        left: 0;
      }
      .time {
        padding: 0 0.4rem 0 0.6rem;
      }
      .hospital {
        padding: 0 0.3rem 0 0.3rem;
      }
    }
    li:first-child dd {
      color: #333333;
      font-size: 0.65rem;
    }
    li:nth-child(even) {
      background-color: #f9f6f6;
    }
  }
  #main {
    width: 100%;
    height: 17rem;
    padding-bottom: 0.75rem;
    border-bottom: 0.5rem solid #f5f5f5;
  }
  #two-bar1 {
    width: 100%;
    height: 17rem;
  }
  .input-btn {
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    background: #4cc6d8;
    font-size: 0.8rem;
    color: #fff;
    position: fixed;
    bottom: 0;
    left: 0px;
    right: 0px;
  }
}
</style>
