<template>
	<div class="monitoring">
		<headers headName="健康评估"></headers>
		<div class="contentScollr">
        <div class="box">
            <ul>
                <li class="frist-li">
					<router-link :to="{path: '/ReportIntervention'}" >
                    <img src="../assets/images/c33_icon1.png" alt="">
                    <span>健康报告深度解读</span>
					</router-link>
                </li>
                 <li>
					<router-link :to="{path: '/PressureAssessment'}" >
					<img src="../assets/images/c33_icon2.png" alt="">
                    <span>血压风险评估</span>
					</router-link>
                </li>
                <li>
					<router-link :to="{path: '/BloodSugarAssessment'}" >
					<img src="../assets/images/c33_icon3.png" alt="">
                    <span>血糖风险评估</span>
					</router-link>
                </li>
                <li>
					<router-link :to="{path: '/BloodFatAssessment'}" >
					<img src="../assets/images/c33_icon4.png" alt="">
                    <span>血脂风险评估</span>
					</router-link>
                </li>
                
                <li>
					<router-link :to="{path: '/CardiovascularProfile'}" >
					<img src="../assets/images/c33_icon5.png" alt="">
                    <span>心血管疾病风险评估</span>
					</router-link>
                </li>
                <li v-for="(data,index) in dataList" v-if="data.id!=999999" :key="index">
					<router-link :to="{ name: 'OtherAssessment', params: {id:data.id,title:data.title} }">
                    <img :src="data.cover" alt="">
                    <span>{{data.title}}</span>
					</router-link>
                </li>
                <!-- 
                <li>
					<router-link :to="{path: '/RiskAssessment/'+5+'/代谢综合症风险评估评估'}" >
					<img src="../assets/images/c33_icon7.png" alt="">
                    <span>代谢综合症风险评估</span>
					</router-link>
                </li>
                <li>
					<router-link :to="{path: '/RiskAssessment/'+6+'/心脏评估'}" >
					<img src="../assets/images/c33_icon8.png" alt="">
                    <span>心脏评估</span>
					</router-link>
                </li>
                <li>
					<router-link :to="{path: '/RiskAssessment/'+7+'/肥胖症评估'}" >
					<img src="../assets/images/c33_icon9.png" alt="">
                    <span>肥胖症评估</span>
					</router-link>
                </li> -->
            </ul>
        </div>
	</div>
	</div>
</template>

<script>
import headers from '../components/Header.vue';
export default {
  data () {
    return {
      dataList:[],
    }
  },
  mounted(){
	  this.BaseSet.getToken(this)
	  this.getDataList()
  },
  methods:{
	  getDataList(){
		  var that = this
		  that.$ajax.get('/analysis')
		  .then(function(res){
			  console.log(res.data)
			  if(res.data.status == 200){
				  that.dataList = res.data.data
			  }
		  })
		  .catch(function(err){
					that.linkLogin(that)
		  })
	  }
  },
  components: {headers},
  //请求数据接口
}
</script>

<style lang="scss">
.monitoring{
    width: 100%;
	display: flex;
	height: 100%;
	flex-direction: column;
	.contentScollr{
		flex: 1;
		overflow: auto;
		-webkit-overflow-scrolling:touch;
	}
    .box{
        width: 100%;
        overflow: hidden;
        padding-top: .75rem;
        padding-bottom: 1rem;
        li{
            width: 8.5rem;
            height: 5rem;
            border-radius: .5rem;
            float: left;
            text-align: center;
            margin-left: .575rem;
            margin-bottom: .5rem;
            background-color: #fff;
			&.frist-li{
				width: 17.575rem;
			}
            img{
                width:1.65rem;
                height: 1.65rem;
                margin-top: 1rem;
            }
            span{
                color: #666666;
                font-size: .7rem;
                display: block;
                margin-top: .375rem;
            }
        }
    }
}
</style>
