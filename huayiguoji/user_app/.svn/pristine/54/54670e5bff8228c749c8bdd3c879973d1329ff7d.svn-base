<template>
	<div class="survey">
		<headers headName='问卷调查'></headers>
		<div class="contentScollr">
        <div class="box">
            <ul>
                <li v-for="data in dataList" @click="toLink(data.id,data.status)">
                    <img :src="data.translates.cover" alt="">
                    <span>{{data.title}}</span>
                </li>
                <!-- <li>
                    <img src="../assets/images/c72_icon3.png" alt="">
                    <span>高血压</span>
                </li>
                <li>
                    <img src="../assets/images/c72_icon4.png" alt="">
                    <span>糖尿病</span>
                </li>
                <li>
                    <img src="../assets/images/c72_icon5.png" alt="">
                    <span>高血脂</span>
                </li>
                <li>
                    <img src="../assets/images/c72_icon6.png" alt="">
                    <span>肝癌</span>
                </li>
                <li>
                    <img src="../assets/images/c72_icon7.png" alt="">
                    <span>大肠癌</span>
                </li>
                <li>
                    <img src="../assets/images/c72_icon8.png" alt="">
                    <span>冠心病</span>
                </li> -->
            </ul>
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
	  toLink(id,status){
		  if(status == 0){
			  this.$router.push({name:'AddBaseQuestion',params:{id:id,status:status,type:0}})
		  }else if(status != 0){
			  this.$router.push({name:'BaseQuestion',params:{id:id,status:status}})
		  }
	  },
	  getData(){
		var that = this
		that.$ajax.get('/questionnaire/category')
		.then(function(res){
			console.log(res.data)
			if(res.data.status == 200){
				that.dataList = res.data.data
			}
		})
		.catch(function(err){

		})
	},
  },
  components: { headers},
  //请求数据接口
}
</script>

<style lang="scss" scoped>
.survey{
    width: 100%;
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
        margin-top: .5rem;
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
            img{
                width: 1.15rem;
                height: 1.15rem;
                margin-top: 1.2rem;
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
