<template>
	<div class="survey">
		<headers headName='问卷调查'></headers>
        <div class="box">
            <ul>
                <router-link :to="{path: '/BaseQuestion'}" >
                <li>                   
                    <img src="../assets/images/c72_icon1.png" alt="">
                    <span>基本信息(必填)</span>                    
                </li>
                </router-link>
                <li>
                    <img src="../assets/images/c72_icon2.png" alt="">
                    <span>日常行为</span>
                </li>
                <li>
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
                </li>
            </ul>
        </div>
	</div>
</template>

<script>
//导入模板
import headers from "../components/Header.vue";
export default {
  data () {
    return {
      articles:''
    }
  },
  components: { headers},
  //请求数据接口
}
</script>

<style lang="scss">
.survey{
    width: 100%;
    overflow: hidden;
    .box{
        width: 100%;
        overflow: hidden;
        margin-top: 2.2rem;
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