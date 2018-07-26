<template>
	<div class="pressure-assessment">
		<headers headName="血压评估"></headers>
		<div class="contentScollr">
			<div class="head_box" @click="openPicker()">
				<span>{{pickerValue}}</span>
				<img src="../assets/images/c12_xiala.png" alt="">
			</div>
			<div class="pressure-status">
				<p class="title-p">
					血压状况
				</p>
				<table class="table-status">
					<tbody>
						<tr class="head-tr">
							<td>项目</td>
							<td>数值</td>
						</tr>
						<tr v-for="health in healthModel">
							<td>{{health.title}}</td>
							<td>{{health.pivot.value?health.pivot.value:"-"}}
								<span>{{health.unit}}</span></td>
						</tr>
						<tr>
							<td>风险因素</td>
							<td>{{dataBp.risk_factors?dataBp.risk_factors:"-"}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="pressure-reason">
				<p class="title-p">
					血压-危险因素
				</p>
				<table class="table-reason">
					<tbody>
						<tr class="head-tr">
							<td>其他危险因素和病史</td>
							<td><P class="title">正常值</P><p>SBP:130-139</p><p>DBP:85-89</p></td>
							<td><P class="title">1级高血压</P><p>SBP:140-159</p><p>DBP:90-99</p></td>
							<td><P class="title">2级高血压</P><p>SBP:160-179</p><p>DBP:100-109</p></td>
							<td><P class="title">3级高血压</P><p>SBP:≧180</p><p>DBP:≧110</p></td>
						</tr>
						<tr>
							<td>无危险因素</td>
							<td :class="[dataBp.position == 0 ? 'current':'']"></td>
							<td :class="[dataBp.position == 1 ? 'current':'']"><img src="../assets/images/c34_bq1.png" /><span class="me">我</span></td>
							<td :class="[dataBp.position == 2 ? 'current':'']"><img src="../assets/images/c34_bq2.png" /><span class="me">我</span></td>
							<td :class="[dataBp.position == 3 ? 'current':'']"><img src="../assets/images/c34_bq3.png" /><span class="me">我</span></td>
						</tr>
						<tr>
							<td>1-2其他危险因素</td>
							<td :class="[dataBp.position == 4 ? 'current':'']"><img src="../assets/images/c34_bq1.png" /><span class="me">我</span></td>
							<td :class="[dataBp.position == 5 ? 'current':'']"><img src="../assets/images/c34_bq2.png" /><span class="me">我</span></td>
							<td :class="[dataBp.position == 6 ? 'current':'']"><img src="../assets/images/c34_bq3.png" /><span class="me">我</span></td>
							<td :class="[dataBp.position == 7 ? 'current':'']"><img src="../assets/images/c34_bq3.png" /><span class="me">我</span></td>
						</tr>
						<tr>
							<td>3个及以上危险因素</td>
							<td :class="[dataBp.position == 8 ? 'current':'']"><img src="../assets/images/c34_bq2.png" /><span class="me">我</span></td>
							<td :class="[dataBp.position == 9 ? 'current':'']"><img src="../assets/images/c34_bq3.png" /><span class="me">我</span></td>
							<td :class="[dataBp.position == 10 ? 'current':'']"><img src="../assets/images/c34_bq3.png" /><span class="me">我</span></td>
							<td :class="[dataBp.position == 11 ? 'current':'']"><img src="../assets/images/c34_bq4.png" /><span class="me">我</span></td>
						</tr>
						<tr>
							<td>靶器官损害、糖尿病</td>
							<td :class="[dataBp.position == 12 ? 'current':'']"><img src="../assets/images/c34_bq3.png" /><span class="me">我</span></td>
							<td :class="[dataBp.position == 13 ? 'current':'']"><img src="../assets/images/c34_bq3.png" /><span class="me">我</span></td>
							<td :class="[dataBp.position == 14 ? 'current':'']"><img src="../assets/images/c34_bq3.png" /><span class="me">我</span></td>
							<td :class="[dataBp.position == 15 ? 'current':'']"><img src="../assets/images/c34_bq4.png" /><span class="me">我</span></td>
						</tr>
						<tr>
							<td>有症状CVD、CKD4期以上糖尿病合并靶器官损害或危险因素</td>
							<td :class="[dataBp.position == 16 ? 'current':'']"><img src="../assets/images/c34_bq4.png" /><span class="me">我</span></td>
							<td :class="[dataBp.position == 17 ? 'current':'']"><img src="../assets/images/c34_bq4.png" /><span class="me">我</span></td>
							<td :class="[dataBp.position == 18 ? 'current':'']"><img src="../assets/images/c34_bq4.png" /><span class="me">我</span></td>
							<td :class="[dataBp.position == 19 ? 'current':'']"><img src="../assets/images/c34_bq4.png" /><span class="me">我</span></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="comprehensive">
				<p class="title-p">
					综合情况
				</p>
				<div class="content-word">
					{{comprehensive_str}}
				</div>
			</div>
			<div class="comprehensive">
				<p class="title-p">
					改善生活方式
				</p>
				<div class="content-word">
					{{dataBp.is_change_lifestyle?"建议改善生活方式":"可以维持现状的生活方式"}}
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
today = (d.getFullYear())+'-'+((d.getMonth()+1)>9?d.getMonth()+1:'0'+(d.getMonth()+1))+'-'+(d.getDate()>9?d.getDate():'0'+d.getDate());

export default {
  data () {
    return {
      pickerValue:today,
	  //   id:this.$route.params.id,
	  healthModel: [],
	  dataBp: {},
	  comprehensive: '',
	  comprehensive_str: '',
    }
  },
  mounted:function(){
	  this.BaseSet.getToken(this)
	  this.getData();
  },
  methods:{
	openPicker(num) {
        this.$refs.picker.open();
    },
	getData(){
		var that = this
		// that.$ajax.get('/analysis/list/'+that.id)
		that.$ajax.get('/check/bloodpressure')
		.then(function(res){
			console.log(res.data.data)
			that.healthModel = res.data.data.health_model;
			that.dataBp = res.data.data.bp;
			that.comprehensive = res.data.data.bp.comprehensive;
			that.showMsg(that.comprehensive);
		})
		.catch(function(err){

		})
	},
    handleConfirm(res){
		let d=new Date(res);
		this.pickerValue=(d.getFullYear())+'-'+((d.getMonth()+1)>9?d.getMonth()+1:'0'+(d.getMonth()+1))+'-'+(d.getDate()>9?d.getDate():'0'+d.getDate());
	},
	showMsg(comprehensive) {
		console.log(comprehensive);
		switch (comprehensive)
			{
				case 1:
					this.comprehensive_str = '您的血压处于正常范围之内，目前无需特殊干预，请继续保持健康生活方式及定期监测血压；';
					break;
				case 2:
					this.comprehensive_str = '您的血压处于正常范围之内，鉴于您同时合并有其他代谢相关问题，建议您开始改善生活方式，定期监测血压；';
					break;
				case 3:
					this.comprehensive_str = '本次体检发现您的血压升高，建议您开始改善生活方式，并监测并记录血压；2-4周后心内科就诊；';
					break;
				case 4:
					this.comprehensive_str = '本次体检发现您的血压升高，建议您开始改善生活方式，并监测并记录血压；1周内心内科门诊就诊评估是否监测；';
					break;
				case 5:
					this.comprehensive_str = '本次体检发现您的血压明显升高，建议您开始改善生活方式，并尽快医院就诊，必要时开始药物治疗；';
					break;
				case 6:
					this.comprehensive_str = '您有高血压病史，目前血压控制达标，请继续保持健康生活方式并维持目前药物治疗';
					break;
				case 7:
					this.comprehensive_str = '您有高血压病史，目前血压控制未达标，请密切监测血压，如持续不达标请心内科门诊就诊。';
					break;
				default:
					this.comprehensive_str = '';
					break;
			}
	}
},
  created:function(){

  },
 components:{headers},
}
</script>

<style lang="scss">
.pressure-assessment{
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
	.title-p{
		margin-top: .5rem /* 20/40 */;
		font-size: .8rem /* 30/40 */;
		line-height: 2rem /* 80/40 */;
		padding: 0 .8rem /* 30/40 */;
		color: #4CC6D8;
		background: #fff;
	}
	.table-status{
		width: 100%;
		background: #fff;
		tr,td{
			border: 1px solid #e5e5e5;
			line-height: 2.3rem /* 90/40 */;
			font-size: .7rem /* 28/40 */;
			color: #666;
		}
		tr:nth-of-type(2n){
			background: #f9f6f6;
		}
		td{
			padding: 0 .8rem /* 30/40 */;
			width: 50%;
		}
		.head-tr{
			td{
				color: #333;
				font-weight: 600;
			}
		}
	}
	.table-reason{
		tr,td{
			border: 1px solid #e5e5e5;
			//line-height: 2.3rem /* 90/40 */;
			background: #fff;
			font-size: .6rem /* 24/40 */;
			color: #333;
			text-align: center;
		}
		td{
			padding: .8rem /* 30/40 */ 0;
			.me{
				display: none
			}
		}
		.current{
			border: .1rem /* 4/40 */ solid #4cc6d8;
			position: relative;
			.me{
				position: absolute;
				display: inline;
				font-size: .6rem /* 22/40 */;
				color: #4CC6D8;
				top: .1rem /* 4/40 */;
				left: 1.6rem /* 64/40 */;
			}
		}
		img{
			width: 1rem /* 40/40 */;
			height: 1rem /* 40/40 */;
		}
		.head-tr{
			td{
				color: #333;
				height: 1.9rem;
				width: 3.8rem /* 150/40 */;
				text-align: center;

			}
		}
	}
	.comprehensive{
		.title-p{
			border-bottom: 1px solid #e5e5e5;
		}
		.content-word{
			font-size: .7rem /* 26/40 */;
			color: #666;
			line-height: .9rem /* 36/40 */;
			padding: .7rem /* 28/40 */ .8rem /* 30/40 */;
			background: #fff;
			padding-bottom: 1.3rem /* 52/40 */;
		}
	}
}
</style>
