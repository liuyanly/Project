<template>
	<div class="monitoring">
		<headers headName="体征监测"></headers>
		<div class="contentScollr">
        <div class="box">
            <ul>
                <li v-for="data in dataList">
					<router-link :to="{path: '/MonitoringDetail/'+data.id}" >
                    <img src="../assets/images/c20_icon1.png" alt="">
                    <span>{{data.title}}</span>
					</router-link>
                </li>
                <!-- <router-link :to="{path: '/MonitoringDetail/'+1}" >
                <li>
                    <img src="../assets/images/c20_icon2.png" alt="">
                    <span>血糖</span>
                </li>
                </router-link>
                <router-link :to="{path: '/MonitoringDetail/'+2}" >
                <li>
                    <img src="../assets/images/c20_icon3.png" alt="">
                    <span>血脂</span>
                </li>
                </router-link>
                <router-link :to="{path: '/MonitoringDetail/'+3}" >
                <li>
                    <img src="../assets/images/c20_icon4.png" alt="">
                    <span>体重</span>
                </li>
                </router-link>
                <router-link :to="{path: '/MonitoringDetail/'+4}" >
                <li>
                    <img src="../assets/images/c20_icon5.png" alt="">
                    <span>腰围</span>
                </li>
                </router-link>
                <router-link :to="{path: '/MonitoringDetail/'+5}" >
                <li>
                    <img src="../assets/images/c20_icon6.png" alt="">
                    <span>尿酸</span>
                </li>
                </router-link> -->
            </ul>
        </div>
	</div>
	</div>
</template>

<script>
import headers from "../components/Header.vue"
export default {
  data () {
    return {
      dataList:[],
    }
  },
  mounted(){
	this.getData()
  },
  methods:{
  	getData(){
		var that=this
		that.$ajax.get('/check')
		.then(function(res){
			if(res.data.status==200){
				console.log(res.data.data)
				if(res.data.data instanceof Array){
					that.dataList=res.data.data
				}
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
	},

  },
  components:{headers}
  //请求数据接口
}
</script>

<style lang="scss" scoped>
.all_header{
		width: 100%;
		height:2.2rem;
		background-color: #4CC6D8;
		overflow: hidden;
		text-align: center;
		position: fixed;
		line-height: 2.2rem;
		top: 0;
		left: 0;
		z-index: 999;
	}
	.all_header .back{
		width: 0.475rem;
		height: 0.8rem;
		position: absolute;
		left: 0.75rem;
		top: 0.65rem;
	}
	.all_header .back img{
		width: 0.475rem;
		height: 0.8rem;
	}
	.all_header .name{
		color: #ffffff;
		font-size: 0.9rem;
    }
    .all_header .right{
		position: absolute;
		right: 0.75rem;
        top:0;
        color: #ffffff;
		font-size: 0.75rem;
    }
.monitoring{
    width: 100%;
	display: flex;
	height: 100%;
	flex-direction: column;
	.contentScollr{
		flex: 1;
		overflow: scroll;
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
