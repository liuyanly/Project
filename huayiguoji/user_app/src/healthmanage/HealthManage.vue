<template>
	<div class="health_manage">
		<headers headName='健康管理'></headers>
		<div class="contentScollr">
        <div class="nav">
            <ul>
                <li>
                    <router-link :to="{path: '/CheckReport'}" >
                    <img src="../assets/images/c19_icon1.png" alt="">
                    <span>体检报告</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{path: '/Survey'}" >
                    <img src="../assets/images/c19_icon2.png" alt="">
                    <span>问卷调查</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{path: '/Monitoring'}" >
                    <img src="../assets/images/c19_icon3.png" alt="">
                    <span>体征监测</span>
                    </router-link>
                </li>
                <li>
					<router-link :to="{ name: 'HealthAssessment', params: {} }">
                    <img src="../assets/images/c19_icon4.png" alt="">
                    <span>健康评估</span>
					</router-link>
                </li>
                <li>
                    <router-link :to="{path: '/Intervention'}" >
                    <img src="../assets/images/c19_icon5.png" alt="">
                    <span>健康干预</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{path: '/Follow'}" >
                    <img src="../assets/images/c19_icon6.png" alt="">
                    <span>跟踪随访</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="content">
            <div class="head">异常数据</div>
            <div class="box">
                <!-- <div class="title">肾功能</div> -->
                <div class="list">
                    <ul>
						<li :class="{normal:data.abnormal==-1}" v-for="data in dataList">
                            <dl>
                                <dd class="name"><span>{{data.title}}</span></dd>
                                <dd>{{data.pivot.value}}</dd>
                                <dd>{{data.unit}}</dd>
                                <dd>{{data.translates.range_desc}}</dd>
                                <dd><router-link :to="{ name: 'TrendMap', params: {id:data.id,title:data.title} }"><img v-if="data.abnormal==-1" src="../assets/images/c51_icon1.png" alt="">
								<img v-else src="../assets/images/c19_icon7.png" alt=""></router-link>
								</dd>
                            </dl>
                        </li>
                    </ul>
                </div>
            </div>
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
      dataList:[],
    }
  },
  mounted(){
	  this.BaseSet.getToken(this)
	  this.getData()
  },
  methods:{
	  getData(){
		  var that = this
		  that.$ajax.get('/health')
		  .then(function(res){
			  if(res.data.status==200){
				  console.log(res.data.data)
				  that.dataList=res.data.data
			  }else if(res.data.status==401){
				  that.BaseSet.linkLogin(that)
			  }else{
				  that.$toast(res.data.message)
			  }
		  })
		  .catch(function(err){
			  //that.$toast(err)
			  that.BaseSet.linkLogin(that)
		  })
	  }
  },
  components: { headers},
  //请求数据接口
}
</script>

<style lang="scss" scoped>
.health_manage{
	display: flex;
	height: 100%;
	flex-direction: column;
	.contentScollr{
		flex: 1;
		overflow: auto;
		-webkit-overflow-scrolling:touch;
	}
    .nav{
        width: 100%;
        overflow: hidden;
        background-color: #fff;
        padding-top: .75rem;
        padding-bottom: 1rem;
        li{
            width: 8.5rem;
            height: 3.75rem;
            line-height: 3.75rem;
            border-radius: .5rem;
            float: left;
            text-align: center;
            margin-left: .575rem;
            margin-bottom: .5rem;
            img{
                width: 1.15rem;
                height: 1.15rem;
                vertical-align: middle;
            }
            span{
                color: #ffffff;
                font-size: .8rem;
            }
        }
        li:nth-child(1){
            background-color: #82CAD5;
        }
        li:nth-child(2){
            background-color: #FAC075;
        }
        li:nth-child(3){
            background-color: #808EBC;
        }
        li:nth-child(4){
            background-color: #80BEF8;
        }
        li:nth-child(5){
            background-color: #77D7C2;
        }
        li:nth-child(6){
            background-color: #82CAD5;
        }
    }
    .content{
        width: 100%;
        background-color: #fff;
        margin: .5rem 0;
        overflow: hidden;
        .head{
            width: 100%;
            height: 2rem;
            line-height: 2rem;
            box-sizing: border-box;
            padding: 0 .6rem;
            color: #6fc3d5;
            font-size: .75rem;
        }
        .box{
            width: 100%;
            overflow: hidden;
            .title{
                width: 100%;
                height: 2.875rem;
                line-height: 2.875rem;
                box-sizing: border-box;
                padding: 0 .6rem;
                background-color: #7590AA;
                color: #ffffff;
                font-size: .7rem;
            }
            .list{
                width: 100%;
                overflow: hidden;
				border-top: 1px solid #e6e6e6;
                li{
                    width: 100%;
                    height: 2.875rem;
                    overflow: hidden;
					dd{
                        width: 20%;
                        float: left;
                        box-sizing: border-box;
                        border-right:#e5e5e5 1px solid;
                        border-bottom:#e5e5e5 1px solid;
                        height: 2.875rem;
                        line-height: 2.875rem;
                        text-align: center;
                        color: #EE774D;
                        font-size: .6rem;
						&:nth-of-type(2){
							position: relative;
							img{
								width: .3rem /* 14/40 */;
								height: .5rem /* 20/40 */;
								position: absolute;
								right: .3rem /* 14/40 */;
								top: 1.1rem;
							}
						}
                        img{
                            width: .75rem;
                            height: .75rem;
                            vertical-align: middle;
                        }
                    }
                    dd.name{
                        line-height: 1.2;
                        display: flex;
                        display: -webkit-flex;
                        justify-content: center;
                        align-items: center;
						padding: 0 0.6rem /* 12/20 */;
                    }
                }
                li:nth-child(even){
                    background-color: #F8F6F6;
                }
				.normal{
					dd{
						color: #666;
					}
				}
            }
        }
    }
}
</style>
