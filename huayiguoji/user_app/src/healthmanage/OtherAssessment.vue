<template>
	<div class="pressure-assessment">
		<headers :headName="headName"></headers>
		<div class="contentScollr">
			<div class="content" v-html="content">
			</div>
        <!-- <div class="head_box" @click="openPicker()">
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
					<tr>
						<td>舒张压(SBP)</td>
						<td>141mmHg</td>
					</tr>
					<tr>
						<td>收缩压(DBP)</td>
						<td>75mmHg</td>
					</tr>
					<tr>
						<td>降压约服用</td>
						<td></td>
					</tr>
					<tr>
						<td>风险因素</td>
						<td>1</td>
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
						<td></td>
						<td><img src="../assets/images/c34_bq1.png" /></td>
						<td><img src="../assets/images/c34_bq2.png" /></td>
						<td><img src="../assets/images/c34_bq3.png" /></td>
					</tr>
					<tr>
						<td>1-2其他危险因素</td>
						<td><img src="../assets/images/c34_bq1.png" /></td>
						<td class="current"><img src="../assets/images/c34_bq2.png" /><span>我</span></td>
						<td><img src="../assets/images/c34_bq3.png" /></td>
						<td><img src="../assets/images/c34_bq3.png" /></td>
					</tr>
					<tr>
						<td>3个及以上危险因素</td>
						<td><img src="../assets/images/c34_bq2.png" /></td>
						<td><img src="../assets/images/c34_bq3.png" /></td>
						<td><img src="../assets/images/c34_bq3.png" /></td>
						<td><img src="../assets/images/c34_bq4.png" /></td>
					</tr>
					<tr>
						<td>靶器官损害、糖尿病</td>
						<td><img src="../assets/images/c34_bq3.png" /></td>
						<td><img src="../assets/images/c34_bq3.png" /></td>
						<td><img src="../assets/images/c34_bq3.png" /></td>
						<td><img src="../assets/images/c34_bq4.png" /></td>
					</tr>
					<tr>
						<td>有症状CVD、CKD4期以上糖尿病合并靶器官损害或危险因素</td>
						<td><img src="../assets/images/c34_bq4.png" /></td>
						<td><img src="../assets/images/c34_bq4.png" /></td>
						<td><img src="../assets/images/c34_bq4.png" /></td>
						<td><img src="../assets/images/c34_bq4.png" /></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="comprehensive">
			<p class="title-p">
				综合情况
			</p>
			<div class="content-word">
				您的血压处于1级高血压范围之内，鉴于您同时合并有其他代谢相关问题，建议您开始改善生活方式，定期监测血压；
			</div>
		</div>
        <mt-datetime-picker
            ref="picker"
            type="date"
            year-format="{value}"
  month-format="{value}"
  date-format="{value}"
  @confirm="handleConfirm">
        </mt-datetime-picker> -->
		</div>
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
	  id:this.$route.params.id,
	  headName:this.$route.params.title,
	  content:'',
    }
  },
  mounted:function(){
	  this.BaseSet.getToken(this)
	  this.getData()
  },
  methods:{
	openPicker(num) {
        this.$refs.picker.open();
    },
	getData(){
		var that = this
		that.$ajax.get('/analysis/'+that.id)
		.then(function(res){
			that.content = res.data.data.content;
		})
		.catch(function(err){

		})
	},
    handleConfirm(res){
		let d=new Date(res);
		this.pickerValue=(d.getFullYear())+'-'+((d.getMonth()+1)>9?d.getMonth()+1:'0'+(d.getMonth()+1))+'-'+(d.getDate()>9?d.getDate():'0'+d.getDate());
    },
},
  created:function(){

  },
 components:{headers},
}
</script>

<style lang="scss" scoped>
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
		background: #fff;
	}
	.content{
		padding: .5rem .75rem;
		p{
			font-size: .7rem;
			color: #444;
		}
		img{
			width: 100%!important;
			margin-top: .5rem /* 10/20 */;
		}
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
		}
		.current{
			border: .1rem /* 4/40 */ solid #4cc6d8;
			position: relative;
			span{
				position: absolute;
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
