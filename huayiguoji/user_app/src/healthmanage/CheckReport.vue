<template>
	<div class="check_report">
		<headers headName="体检报告"></headers>
		<div class="contentScollr">
        <div class="head_box">
            <ul>
                <li>
					<p class="hospital" @click="openPopup(2)" :title="hospitalVal">
		                <span>{{hospitalVal}}</span><img src="../assets/images/c12_xiala.png" v-if="currentXiaLa!=2"/>
		                <img src="../assets/images/c12_xiala_p.png" v-if="currentXiaLa==2" />
		            </p>
                </li>
                <li>
					<p class="department" @click="openPopup(3)" :title="departmentVal">
		                <span>{{departmentVal}}</span><img src="../assets/images/c12_xiala.png" v-if="currentXiaLa!=3"/>
		                <img src="../assets/images/c12_xiala_p.png" v-if="currentXiaLa==3" />
		            </p>
                </li>
                <li>
					<p class="date" @click="openDatePicker" :title="dateVal">
		                {{dateVal}}<img src="../assets/images/c12_xiala.png" v-if="currentXiaLa!=1"/>
		                <img src="../assets/images/c12_xiala_p.png" v-if="currentXiaLa==1" />
		            </p>
                </li>
            </ul>
        </div>
        <div class="content" :style="{'-webkit-overflow-scrolling': scrollMode}" style="overflow:auto">
			<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" bottomPullText='上拉刷新' bottomLoadingText='加载中......'>
            <ul>
                <li v-for="data in dataList" @click="viewDetail(data.id)">
                    <div class="status">{{data.title}}</div>
                    <div class="name">{{data.translates.hospital_title}}</div>
                    <div class="tag">{{data.translates.department_title}}</div>
                    <div class="time">{{data.checked_at.substring(0,10)}}</div>
                </li>
            </ul>
			</mt-loadmore>
        </div>
		<div class="foot">
			<router-link :to="{path: '/UpReport'}" >
				<p class="left">
			上传体检报告
				</p>
			</router-link>
			<router-link :to="{path: '/Plant'}" >
			<p class="right">
				体检申请
			</p>
			</router-link>
		</div>
		<mt-datetime-picker
			ref="picker1"
			type="date"
			:startDate="startDate"
			:endDate="endDate"
			year-format="{value}"
		 	month-format="{value}"
			date-format="{value}"
			@confirm="handleConfirm"
		    v-model="pickerValue">
		</mt-datetime-picker>
		<mt-popup v-model="popupStatus1" position="bottom" :closeOnClickModal='closeType'>
            <div class="popup-box">
                <p class="head clear">
                    <span class="cancel" @click="closePopup()">取消</span>
                    <span class="title" v-if="currentXiaLa==2">选择医院</span>
                    <span class="sure" @click="sureValue(2)">确认</span>
                </p>
                <mt-picker :slots="hospitalArr" valueKey='title' @change="onValuesChange1"></mt-picker>
            </div>
        </mt-popup>
        <mt-popup v-model="popupStatus2" position="bottom" :closeOnClickModal='closeType'>
            <div class="popup-box">
                <p class="head clear">
                    <span class="cancel" @click="closePopup()">取消</span>
                    <span class="title">选择科室</span>
                    <span class="sure" @click="sureValue(3)">确认</span>
                </p>
                <mt-picker :slots="slots" valueKey="title" @change="onValuesChange2"></mt-picker>
            </div>
        </mt-popup>
	</div>
	</div>
</template>

<script>
let d=new Date();
var today=(d.getFullYear())+'-'+((d.getMonth()+1)>9?d.getMonth()+1:'0'+(d.getMonth()+1))+'-'+(d.getDate()>9?d.getDate():'0'+d.getDate());

import headers from '../components/Header.vue'
export default {
  data () {
    return {
		id:this.$route.params.id,
		hospitalVal: '全部医院',
		hospitalChangeVal:'',
		departmentVal: '全部科室',
		departmentId:0,
		departmentChangeVal:'',
		slots: this.hospitalArr,
		popupStatus:false,
		popupStatus1:false,
		popupStatus2:false,
		currentXiaLa:0,
		closeType:false,
		pickerValue:'',
		dateVal:'全部时间',
		startDate: new Date("2000"),
		endDate: new Date(),
		dataList:[],
		hospitalData:[],
		hospitalArr:[
			{
			  flex: 1,
			  values: [],
			  className: 'slot1',
			  textAlign: 'center'
			}
		],
		departmentArr:[{
			flex:1,
			values:[],
			className:'slot1',
			textAlign: 'center',
		},{
			divider: true,
			content: '-',
			textAlign: 'center',
		},{
			flex:1,
			values:[],
			className:'slot3',
			textAlign: 'center',
		}],
		sendData:{
			'me':'user-api',
			'report_id':2,
			'hospital_id':'',
			'created_at':'',
		},
		scrollMode:"auto",
		dataList:[],
	  	currentPage:1,
	  	per_page:7,
	  	total_page:0,
	  	allLoaded:false,//分页
	  	topStatus:false,//分页
    }
  },
  mounted(){
	  this.BaseSet.getToken(this)
	  this.getDepartment()
	  this.getList()
	  this.getHospital()
  },
  methods:{
	  loadBottom() {
		  if(this.currentPage<this.total_page){
			  if(this.currentPage==this.total_page){
				  this.$toast('已经是最后一页了')
				this.allLoaded = true;// 若数据已全部获取完毕
			  }
			  if(this.currentPage<this.total_page){
				  this.currentPage=this.currentPage+1
				  this.getList()
				  this.$refs.loadmore.onBottomLoaded();
			  }else{

			  }
		  }
	  },
	Back(){
		this.$router.go(-1)
	},
	viewDetail(id){
		this.$router.push({name:'ReportDetail',params:{id:id}})
	},
	getDepartment(){
		var that=this
		//获取科室
		this.$ajax.get('/category?e_s[module]=department')
		.then(function(res){
			if (res.data.status == 200) {
				that.departmentArr[0].values.push({id:0,cover_id:0,pid:0,title:"全部科室",module:"department",translates:{sub_cates:[{id:0,cover_id:0,title:"全部科室"}]}})
              for(var i=0;i<res.data.data.length;i++){
                if(res.data.data[i].pid==0){
                  that.departmentArr[0].values.push(res.data.data[i])
                }
              }
              that.departmentArr[2].values = that.departmentArr[0].values[0].translates.sub_cates
            }
		})
		.catch(function(err){
			that.$toast(err)
		})
	},
	getList(){
		//获取列表
		this.BaseSet.getToken(this)
		var that=this;
		var params={
			per_page:this.per_page,
			page:this.currentPage,
			'e_s[user_id]':this.id,
		}
		if(this.dateVal != '全部时间'){
			params['e_s[checked_at]'] = this.dateVal
		}
		if(this.hospitalId != ''){
			params['e_s[hospital_id]']=this.hospitalId
		}
		if(this.departmentId != ''){
			params['e_s[department_id]']=this.departmentId
		}
		// '/archive?e_s[_me]=user-api'+'&e_s[report_id]='+that.sendData.report_id+'&e_s[department_id]='+that.departmentId+'&e_s[hospital_id]='+that.sendData.hospital_id+'&e_s[created_at]='+that.sendData.created_at
		this.$ajax.get('/archive',{params:params})
		.then(function(res){
			if(res.data.status == 200){
				if(res.data.data.paginate.total_page==0){
					that.$toast('暂无数据')
				}else{
					for(var i=0; i<res.data.data.data.length;i++){
						that.dataList.push(res.data.data.data[i])
					}
					that.total_page=res.data.data.paginate.total_page
				}
				if(that.currentPage==that.total_page){
					that.allLoaded = true;// 若数据已全部获取完毕
				}
				that.$nextTick(function () {
					 // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，
					 // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，
					 // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
					 that.scrollMode = "touch";
			   });

			}else if(res.data.status == 401){
				that.BaseSet.linkLogin(that)
			}else{
				that.$toast(res.data.message)
			}
		})
		.catch(function(err){
			//that.$toast(err)
			that.BaseSet.linkLogin(that)
		})
	},
	openDatePicker(){
		//打开日期picker
		this.$refs.picker1.open();
	},
	onValuesChange1(picker, values) {
		if(values.length==0){
			values=this.hospitalArr[0].values
		}
	   this.hospitalChangeVal=values;
	},
	onValuesChange2(picker, values) {
		var that=this;
		var index=that.departmentArr[0].values.indexOf(values[0])
			picker.setSlotValues(1,that.departmentArr[0].values[index].translates.sub_cates)//Object.keys()会返回一个数组，当前省的数组
			this.departmentChangeVal=values;
	},
	handleConfirm(res){
		let d=new Date(res);
		let oldDate=this.dateVal
		this.dateVal=(d.getFullYear())+'-'+((d.getMonth()+1)>9?d.getMonth()+1:'0'+(d.getMonth()+1))+'-'+(d.getDate()>9?d.getDate():'0'+d.getDate());
		//科室筛选
		// if(this.url.indexOf('?')==-1){
		// 	this.url=this.url+'?e_s[created_at]='+this.dateVal
		// }else if(this.url.indexOf('&e_s[created_at]='+oldDate)==-1){
		// 	this.url=this.url+'&e_s[created_at]='+this.dateVal
		// }else{
		// 	this.url=this.url.replace('&e_s[created_at]='+oldDate,'')
		// 	this.url=this.url+'&e_s[created_at]='+this.dateVal
		// }
		this.dataList = []
		this.currentPage = 1
		this.getList()
	},
	openPopup(id) {
		this.currentXiaLa=id;
		if(id==1){
			this.slots=this.cityArr;
			this.popupStatus=true;
		}else if(id==2){
			this.slots=this.hospitalArr
			this.popupStatus1=true;
		}else{
			this.slots=this.departmentArr
			this.popupStatus2=true;
		}
	},
	closePopup(){
		this.popupStatus1=false;
		this.popupStatus2=false;
		this.currentXiaLa=0;
	},
	getHospital(){
		var that=this
		that.$ajax.get('/hospital')
		.then(function(res){
			if(res.data.status == 200){
				that.hospitalData=res.data.data
				that.hospitalArr[0].values = res.data.data
			}else{
				that.$toast(res.data.message)
			}
		})
		.catch(function(err){
			that.$toast(err)
		})
	},
	sureValue(id){
		this.popupStatus1=false;
		this.popupStatus2=false;
		this.currentXiaLa=0;
		if(id==2){
			var id = this.hospitalId
			if(this.hospitalChangeVal.length==0){
				this.hospitalVal=this.hospitalData[0].title
				this.hospitalId=this.hospitalData[0].id
			}else{
				this.hospitalVal=this.hospitalChangeVal[0].title
				this.hospitalId=this.hospitalChangeVal[0].id
			}
			// //科室筛选
			// if(this.url.indexOf('?')==-1){
			// 	this.url=this.url+'?e_s[hospital_id]='+this.hospitalId
			// }else if(this.url.indexOf('&e_s[hospital_id]='+id)!=-1){
			// 	this.url=this.url.replace('&e_s[hospital_id]='+id,'')
			// 	this.url=this.url+'&e_s[hospital_id]='+this.hospitalId
			// }else{
			// 	this.url=this.url+'&e_s[hospital_id]='+this.hospitalId
			// }
			this.dataList = []
			this.currentPage = 1
			this.getList()
		}else{
			var id = this.departmentId
			// if(this.departmentChangeVal.length==2){
			// 	this.departmentVal=this.departmentChangeVal[1].title
			// 	this.departmentId=this.departmentChangeVal[1].id
			// }
			this.departmentVal=this.departmentChangeVal[1].title
				this.departmentId=this.departmentChangeVal[1].id
			// //科室筛选
			// if(this.url.indexOf('?')==-1){
			// 	this.url=this.url+'?e_s[department_id]='+this.departmentId
			// }else if(this.url.indexOf('&e_s[department_id]='+id)==-1){
			// 	this.url=this.url+'&e_s[department_id]='+this.departmentId
			// }else{
			// 	this.url=this.url.replace('&e_s[department_id]='+id,'')
			// 	this.url=this.url+'&e_s[department_id]='+this.departmentId
			// }
			this.dataList = []
			this.currentPage = 1
			this.getList()
		}
		//this.bankValue = this.bankChangeValue;
	},
  },
  //请求数据接口
  components:{headers,}
}
</script>

<style lang="scss" scoped>
.check_report{
    width: 100%;
	display: flex;
	height: 100%;
	flex-direction: column;
	.contentScollr{
		flex: 1;
		overflow: auto;
		-webkit-overflow-scrolling:touch;
	}
    .head_box{
        width: 100%;
        height: 2.05rem;
        overflow: hidden;
        position: relative;
        left: 0;
		z-index: 1000;
        background-color: #fff;
        li{
            width: 33.33%;
            float: left;
            height:.9rem;
            box-sizing: border-box;
            border-right: #e5e5e5 1px solid;
            text-align: center;
            margin-top: .55rem;
            font-size: 0;
			p{
                float: left;
                width: 5.6rem /* 249/40 */;
                font-size: .7rem /* 28/40 */;
                color: #666;
                line-height: .9rem /* 36/40 */;
                height: .9rem;
                text-align: center;
                padding: 0 .3rem /* 10/40 */;
                >img{
                    width: .5rem /* 20/40 */;
                    height: .3rem /* 11/40 */;
                    vertical-align: middle;
                    margin-left: .2rem /* 8/40 */;
                }
            }
            .city,.hospital{
                border-right: 1px solid #dcdcdc;
            }
            .hospital{
                span{
                    max-width: 4.6rem;
                    height: .9rem;
                    display: inline-block;
                    overflow: hidden;
                }
                img{
                    margin-top: -.3rem /* -14/40 */;
                }
            }
        }
        li:last-child{
            border: none;
        }
    }
    .content{
        width: 100%;
        overflow: hidden;
        margin-top: .5rem;
        background-color: #fff;
		margin-bottom:2.45rem;
        li{
            width: 100%;
            height: 4.5rem;
            border-bottom: #e5e5e5 1px solid;
            position: relative;
            box-sizing: border-box;
            padding: 0 .75rem;
            overflow: hidden;
            .status{
                margin-top: .55rem;
                color: #333333;
                font-size: .7rem;
            }
            .name{
                margin-top: .3rem;
                color: #666666;
                font-size: .7rem;
            }
            .tag{
                margin-top: .3rem;
                color: #666666;
                font-size: .7rem;
            }
            .time{
                position: absolute;
                top: 1.9rem;
                right: .75rem;
                color: #999999;
                font-size: .7rem;
            }
        }
    }
    .foot{
		width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
		.left{
			float: left;
		}
		.right{
			float: right;
			background: #fff;
			color: #4cc6d8;
		}
		p{
			height: 2.45rem;
			width: 50%;
			background-color: #4CC6D8;
			text-align: center;
	        color: #ffffff;
	        font-size: .75rem;
	        line-height: 2.45rem;
		}
    }
}
.mint-popup{
	width: 100%;
}
.popup-box{
	width: 100%;
	.head{
		line-height: 3rem /* 120/40 */;
		padding: 0 .8rem /* 33/40 */;
		border-bottom: 1px solid #e5e5e5;
		.cancel{
			font-size: .8rem /* 30/40 */;
			color: #999;
			float: left;
		}
		.sure{
			font-size: .8rem /* 30/40 */;
			color: #999;
			float: right;
		}
		.title{
			font-size: .9rem /* 36/40 */;
			color: #4CC6D8;
			float: left;
			width: 13.8rem;
			text-align: center;
		}
	}
	.popup-list{
		padding-top: 5.2rem /* 208/40 */;
		li{
			line-height: 1.6rem /* 64/40 */;
			text-align: center;
			font-size: .9rem /* 36/40 */;
			color: #333;
			border-bottom: 1px solid #e5e5e5;
			&:first-child{
				border-top: 1px solid #e5e5e5;
			}
		}
	}
}
</style>
