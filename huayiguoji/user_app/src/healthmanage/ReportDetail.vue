<template>
	<div class="report_detail">
		<headers headName='体检报告'></headers>
		<div class="contentScollr">
        <div class="info">
            <div class="head">个人资料</div>
            <div class="content">
                <ul>
                    <li>
                        <span class="name">姓名</span>：{{userInfo.realname}}<span class="tag">（{{translates.sex}}，{{translates.age}}岁）</span>
                    </li>
                    <li>
                        <span class="name">居住地</span>：{{translates.province_title}}{{translates.city_title}}{{translates.area_title}}{{userInfo.area}}
                    </li>
                    <li>
                        <span class="name">联系电话</span>：{{userInfo.phone_no}}
                    </li>
                </ul>
            </div>
        </div>
        <!-- <div class="describe">
            <div class="head">病情描述</div>
            <div class="content">
                <div class="txt">
                    <span class="name">现有结果检查、日期异常提示：</span>详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容
                </div>
                <div class="txt">
                    <span class="name">家族病史：</span>详细内容详细内容详细内容详细内容详细内容详细内容详细内容详细内容
                </div>
                <div class="table">
                    <ul>
                        <li>
                            <dl>
                                <dd class="time">日期</dd>
                                <dd class="miaosu">既往症状描述</dd>
                                <dd class="ziliao">院外诊断或治疗</dd>
                                <dd class="hospital">诊断医院</dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dd class="time"><span>05-092017</span></dd>
                                <dd class="miaosu"><span>头疼腰疼腿疼肾疼全身疼</span></dd>
                                <dd class="ziliao"><span>化学治疗</span></dd>
                                <dd class="hospital"><span>北京协和医院</span></dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dd class="time"><span></span></dd>
                                <dd class="miaosu"><span></span></dd>
                                <dd class="ziliao"><span></span></dd>
                                <dd class="hospital"><span></span></dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dd class="time"><span></span></dd>
                                <dd class="miaosu"><span></span></dd>
                                <dd class="ziliao"><span></span></dd>
                                <dd class="hospital"><span></span></dd>
                            </dl>
                        </li>
                    </ul>
                </div> -->
				<div class="describe" v-for="data in descri">
		            <div class="head">{{data.title}}</div>
		            <div class="content">
		                <div class="txt">
		                    <span class="name">{{data.name}}：</span><span v-html="data.pivot.value"></span>
		                </div>
		            </div>
		        </div>
        <div class="data_box" v-if="archive_status != 0">
            <div class="head">检查数据</div>
			<ul v-if="abnormalData.length>0">
                <li v-for="(data,index) in abnormalData" @click="testData(aId,data.name)">{{data.name}}<span class="tag" v-if="data.count>0">{{data.count}}</span></li>
            </ul>
			<p class="noTip" v-else>
				暂无检查数据
			</p>
        </div>
        <div class="photo">
            <div class="head">原始图片</div>
            <ul v-if="photourl.length != 0">
                <!-- <li v-for="(item, key) in photourl" :key="key">
                    <img :src="item" class="wc-preview-img"  @click="$preview($event, photourl, key,'url')">
                </li> -->
				<li v-for="(item, key) in photourl" :key="key">
                        <img v-preview="item"
                         :src="item"
                         :key="key"
                         preview-title-enable="true"
                         preview-nav-enable="true">
                        <!-- <img :width="imgWidth" :height="imgHeight" :src="apiUrl+item" class="wc-preview-img evaluate-img"  @click="$preview($event, data.img, key)"> -->
                    </li>
            </ul>
			<p class="noTip" v-else>
				暂无原始图片
			</p>
        </div>
	</div>
	</div>
</template>

<script>
//导入模板
import headers from "../components/Header.vue";
export default {
  data () {
    return {
      id:this.$route.params.id,
	  aId:'',
	  dataInfo:'',
	  userInfo:'',
	  telNum:'',
	  descri:[],
      photourl:[],
	  translates:'',
	  abnormalData:[],
	  archive_status:0,
  	}
  },
  mounted(){
	  this.BaseSet.getToken(this)
	  this.getData()
  },
  methods:{
	  testData(id,title){
  		this.$router.push({name:'TestData',params:{id:this.id,fieldId:id,title:title}});
  	},
	getCount(data){
		var len = 0
		for(var i = 0;i<data.length;i++){
			len += data.abnormal_count
		}
		return len
	},
	getData(){
		var that=this
		that.$ajax.get('/archive/'+that.id)
		.then(function(res){
			if(res.data.status==200){
				that.dataInfo=res.data.data
				that.userInfo=res.data.data.user
				that.translates=res.data.data.user.translates
				that.aId = res.data.data.id
				that.archive_status = res.data.data.translates.archive_status
				// that.abnormalData = res.data.data.detection
                //重组检查数据
                 if (res.data.data.detection) {
				for(var i = 0;i<res.data.data.detection.length;i++){
					var tem = {
						name:res.data.data.detection[i].category,
						count:0,
					}
					for(var j = 0;j<res.data.data.detection[i].data.length;j++){
						tem.count += res.data.data.detection[i].data[j].abnormal_count
					}
					that.abnormalData.push(tem)
                }
                 }
				that.photourl=res.data.data.translates.images
				that.telNum=res.data.data.user.phone_no
				if(res.data.data.archivedatas instanceof Array && res.data.data.archivedatas.length>0){
					if(res.data.data.archivedatas[0].translates.fields){
						for(var i=0;i<res.data.data.archivedatas[0].translates.fields.length;i++){
							if(res.data.data.archivedatas[0].translates.fields[i].type==0){

							}else{
								that.descri.push(res.data.data.archivedatas[0].translates.fields[i])
							}
						}
					}
				}
			}else if(res.data.status==401){
				that.BaseSet.linkLogin(that)
			}
			else{
				that.$toast(res.data.message)
			}
		})
		.catch(function(err){
			console.log(err)
			that.BaseSet.linkLogin(that)
		})
	}
  },
  components: { headers},
  //请求数据接口
}
</script>

<style lang="scss" scoped>
.report_detail{
    width: 100%;
	display: flex;
	height: 100%;
	flex-direction: column;
	.contentScollr{
		flex: 1;
		overflow: auto;
		-webkit-overflow-scrolling:touch;
	}
    .info{
        width: 100%;
        background-color: #fff;
        .head{
            width: 100%;
            overflow: hidden;
            height: 2rem;
            box-sizing: border-box;
            padding: 0 .75rem;
            color: #4CC6D8;
            font-size: .7rem;
            line-height: 2rem;
            border-bottom: #e5e5e5 1px solid;
        }
        .content{
            width: 100%;
            box-sizing: border-box;
            padding: 0 .75rem;
            overflow: hidden;
            padding-bottom: .75rem;
            li{
                width: 100%;
                color: #333333;
                font-size: .7rem;
                overflow: hidden;
                margin-top: .7rem;
                .name{
                    width: 2.9rem;
                    float: left;
                }
                .tag{
                    color: #999999;
                }
            }
        }
    }
    .describe{
        width: 100%;
        background-color: #fff;
        margin-top: .5rem;
        overflow: hidden;
        .head{
            width: 100%;
            overflow: hidden;
            height: 2rem;
            box-sizing: border-box;
            padding: 0 .75rem;
            color: #4CC6D8;
            font-size: .7rem;
            line-height: 2rem;
            border-bottom: #e5e5e5 1px solid;
        }
        .content{
            width: 100%;
            overflow: hidden;
            .txt{
                width: 100%;
                box-sizing: border-box;
                padding: 0 .75rem;
                overflow: hidden;
                font-size: .7rem;
                color: #999999;
                margin: .875rem 0;
                float: left;
                .name{
                    color: #333333;
                }
            }
            .table{
                width: 100%;
                overflow: hidden;
                border-top: #e5e5e5 1px solid;
                li{
                    width: 100%;
                    overflow: hidden;
                    border-bottom: #e5e5e5 1px solid;
                    dd{
                        height: 2.25rem;
                        float: left;
                        display: flex;
                        display: -webkit-flex;
                        justify-content: center;
                        align-items: center;
                        color: #666666;
                        font-size: .6rem;
                        text-align: center;
                        border-right: #e5e5e5 1px solid;
                        box-sizing: border-box;
                    }
                    .time{
                        width: 3.25rem;

                    }
                    .miaosu{
                        width: 6.125rem;
                    }
                    .ziliao{
                        width: 6.125rem;
                    }
                    .hospital{
                        width: 3.25rem;
                    }
                }
                li:first-child dd{
                    color: #333333;
                    font-size: .65rem;
                }
                li:nth-child(even){
                    background-color: #F9F6F6;
                }
            }
        }
    }
    .data_box{
        width: 100%;
        background-color: #fff;
        overflow: hidden;
        margin-top: .5rem;
        .head{
            width: 100%;
            overflow: hidden;
            height: 2rem;
            box-sizing: border-box;
            padding: 0 .75rem;
            color: #4CC6D8;
            font-size: .7rem;
            line-height: 2rem;
            border-bottom: #e5e5e5 1px solid;
        }
        ul{
            width: 100%;
            overflow: hidden;
            box-sizing: border-box;
            padding: 0 .55rem;
            margin-top: .25rem;
            li{
                padding: .3rem .5rem;
                background-color: #eeeeee;
                color: #666666;
                font-size: .7rem;
                float: left;
                margin: .425rem .2rem;
                border-radius:.25rem;
                .tag{
                    width: .8rem;
                    height: .8rem;
                    border-radius:50%;
                    background-color: #EE774D;
                    text-align: center;
                    line-height: .8rem;
                    color: #ffffff;
                    font-size:.55rem;
                    display: inline-block;
                    vertical-align: middle;
                    margin-top: -4px;
                    margin-left: .25rem;
                }
            }
        }
    }
    .photo{
        width: 100%;
        background-color: #fff;
        overflow: hidden;
        margin-top: .5rem;
        .head{
            width: 100%;
            overflow: hidden;
            height: 2rem;
            box-sizing: border-box;
            padding: 0 .75rem;
            color: #999999;
            font-size: .75rem;
            line-height: 2rem;
            border-bottom: #e5e5e5 1px solid;
        }
        ul{
            width: 100%;
            overflow: hidden;
            box-sizing: border-box;
            padding: 0 .4rem;
            margin-top: .5rem;
            li{
                width: 5.3rem;
                height: 7.875rem;
                float: left;
                margin: .3rem .325rem;
                overflow: hidden;
                img{
                    width: 5.3rem;
                    height: 7.875rem;
                    object-fit: cover;
                }
            }
        }

    }
}
</style>
