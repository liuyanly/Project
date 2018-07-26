<template>
	<div class="blood-sugar-assessment">
		<headers headName="血糖评估"></headers>
		<div class="contentScollr">
			<div class="head_box" @click="openPicker()">
				<span>{{pickerValue}}</span>
				<img src="../assets/images/c12_xiala.png" alt="">
			</div>
			<div class="pressure-status">
				<p class="title-p">
					血糖状况
				</p>
				<table class="table-status">
					<tbody>
						<tr class="head-tr">
							<td>项目</td>
							<td>数值</td>
						</tr>
						<tr v-for="(item,index) in sugarList" :key="index">
							<td>{{item.title}}</td>
							<td>{{item.pivot.value?item.pivot.value:"-"}}
								<span>{{item.unit}}</span>
							</td>
						</tr>
						<tr>
							<td>降糖药服用</td>
							<td>{{isHa === 1 ? "是" : "否" }}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="pressure-status">
				<p class="title-p">
					糖代谢状态
				</p>
				<table class="table-status sugar-status">
					<tbody>
						<tr class="head-tr">
							<td>状态</td>
							<td>你的血糖所处位置</td>
						</tr>
						<tr v-bind:class="sugarObj.glucose_tolerance_status === 0 ? currentClass: ''">
							<td>正常</td>
							<td><img src="../assets/images/a43_icon1.png" /></td>
						</tr>
						<tr v-bind:class="sugarObj.glucose_tolerance_status === 6 ? currentClass: ''">
							<td>偏高</td>
							<td><img src="../assets/images/a43_icon1.png" /></td>
						</tr>
						<tr v-bind:class="sugarObj.glucose_tolerance_status === 1 ? currentClass: ''">
							<td>空腹血糖受损</td>
							<td><img src="../assets/images/a43_icon1.png" /></td>
						</tr>
						<tr v-bind:class="sugarObj.glucose_tolerance_status === 2 ? currentClass: ''">
							<td>糖耐量低减</td>
							<td><img src="../assets/images/a43_icon1.png" /></td>
						</tr>
						<tr v-bind:class="sugarObj.glucose_tolerance_status === 3 ? currentClass: ''">
							<td>空腹血糖受损+糖耐量低减</td>
							<td><img src="../assets/images/a43_icon1.png" /></td>
						</tr>
						<tr v-bind:class="sugarObj.glucose_tolerance_status === 4 ? currentClass: ''">
							<td>糖尿病可能性大</td>
							<td><img src="../assets/images/a43_icon1.png" /></td>
						</tr>
						<tr v-bind:class="sugarObj.glucose_tolerance_status === 5 ? currentClass: ''">
							<td>糖尿病</td>
							<td><img src="../assets/images/a43_icon1.png" /></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="pressure-status">
				<p class="title-p">
					血糖风险评估
				</p>
				<table class="table-status">
					<tbody>
						<tr class="head-tr">
							<td>项目</td>
							<td>内容</td>
						</tr>
						<tr>
							<td>风险评分</td>
							<td>{{sugarObj.score !== '' ? sugarObj.score : '-'}}</td>
						</tr>
						<tr>
							<td>风险分层</td>
							<td>{{sugarObj.diabetes_risk !== '' ? sugarObj.diabetes_risk : '-'}}</td>
						</tr>
						<tr>
							<td>建议</td>
							<td>{{sugarObj.glucose_tolerance_advice !== '' ? sugarObj.glucose_tolerance_advice : '-'}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<mt-datetime-picker ref="picker" type="date" year-format="{value}" month-format="{value}" date-format="{value}" @confirm="handleConfirm">
		</mt-datetime-picker>
	</div>
</template>

<script>
import headers from "../components/Header.vue";

let d = new Date(),
  today =
    d.getFullYear() +
    "-" +
    (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1)) +
    "-" +
    (d.getDate() > 9 ? d.getDate() : "0" + d.getDate());

export default {
  data() {
    return {
      pickerValue: today,
      sugarList: [],
      sugarObj: {},
      isHa: Number,
      currentClass: "current"
    };
  },
  methods: {
    openPicker(num) {
      this.$refs.picker.open();
    },
    handleConfirm(res) {
      let d = new Date(res);
      this.pickerValue =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1)) +
        "-" +
        (d.getDate() > 9 ? d.getDate() : "0" + d.getDate());
    },
    getData() {
      var that = this;
      that.$ajax
        .get("/check/bloodglucose")
        .then(function(res) {
          console.log(res.data);
          if (res.data.status == 200) {
            if (typeof res.data.data == "string") {
              that.$toast("您还没有体征检测的一般数据，或基础问卷未填写！");
              setTimeout(function() {
                that.$router.go(-1);
              }, 1500);
            } else {
              that.sugarList = res.data.data.bloodglucose;
              that.sugarObj = res.data.data.bg;
              that.isHa = res.daa.data.is_ha;
            }
          }
        })
        .catch(function(err) {
          that.linkLogin(that);
        });
    }
  },
  created: function() {},
  mounted: function() {
    this.BaseSet.getToken(this);
    this.getData();
  },
  components: { headers }
};
</script>

<style lang="scss" scoped>
.blood-sugar-assessment {
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
    line-height: 2.5rem /* 100/40 */;
    text-align: center;
    font-size: 0.8rem /* 30/40 */;
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
      color: #4cc6d8;
      font-size: 0.7rem;
    }
    img {
      width: 0.5rem;
      height: 0.3rem;
      vertical-align: middle;
      margin-left: 0.15rem;
    }
  }
  .title-p {
    margin-top: 0.5rem /* 20/40 */;
    font-size: 0.8rem /* 30/40 */;
    line-height: 2rem /* 80/40 */;
    padding: 0 0.8rem /* 30/40 */;
    color: #4cc6d8;
    background: #fff;
  }
  .table-status {
    width: 100%;
    background: #fff;
    tr,
    td {
      border: 1px solid #e5e5e5;
      //line-height: 2.3rem /* 90/40 */;
      font-size: 0.7rem /* 28/40 */;
      color: #666;
    }
    tr:nth-of-type(2n) {
      background: #f9f6f6;
    }
    td {
      padding: 0.8rem /* 30/40 */ 0.4rem 0.8rem 0.7rem;
      width: 50%;
    }
    .head-tr {
      td {
        color: #333;
        font-weight: 600;
      }
    }
  }
  .sugar-status {
    img {
      display: none;
      vertical-align: middle;
      width: 0.8rem /* 32/40 */;
      height: 0.6rem /* 22/40 */;
    }
    .current {
      border: 1px solid #fc4f4f;
      td {
        color: #fc4f4f;
        img {
          display: inline-block;
          vertical-align: middle;
          width: 0.8rem /* 32/40 */;
          height: 0.6rem /* 22/40 */;
        }
      }
    }
  }
}
</style>
