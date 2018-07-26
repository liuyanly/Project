<template>
	<div class="intervention_detail">
		<headers headName='健康报告深度解读'></headers>
        <div class="doctor">
            <div class="pic"><img :src="translates.avatar_img" alt=""></div>
            <div class="name">{{doctor.realname}}</div>
            <div class="tag">{{translates.department_title}}</div>
            <div class="hospital">{{translates.hospital_title}}</div>
			<div class="icon"><img src="../assets/images/c4_icon.png" alt=""></div>
        </div>
        <div class="content">
            <div class="head">
                <span class="name">健康报告深度解读</span>
                <span class="time">{{detail.created_at.substring(0,10)}}</span>
            </div>
            <div class="txt" v-html="detail.content">

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
	  detail:'',
	  doctor:'',
	  translates:'',
    }
  },
  mounted(){
	  this.BaseSet.getToken(this)
	  this.getData()
  },
  methods:{
	  getData(){
		  var that = this
		  that.$ajax.get('/analysis/'+that.id)
		  .then(function(res){
			  if(res.data.status == 200){
				  that.detail = res.data.data.data
				  that.doctor = res.data.data.doctor
				  that.translates = res.data.data.doctor.translates
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
.intervention_detail{
    width: 100%;
    overflow: hidden;
    .doctor{
        width: 17.55rem;
        height: 7rem;
        margin: 0 auto;
        border-radius:.25rem;
        overflow: hidden;
        background-color: #fff;
        text-align: center;
        position: relative;
        font-size: 0;
        .pic{
            width: 2.75rem;
            height: 2.75rem;
            overflow: hidden;
            border-radius:50%;
            display: inline-block;
            margin-top: .25rem;
            img{
                width: 2.75rem;
                height: 2.75rem;
                object-fit: cover;
            }
        }
        .name{
            color: #333333;
            font-size: .7rem;
            margin-top: .5rem;
        }
        .tag{
            color: #666666;
            font-size: .6rem;
            margin-top: .1rem;
        }
        .hospital{
            color: #666666;
            font-size: .6rem;
            margin-top: .1rem;
        }
        .icon{
            width: .65rem;
            height: .6rem;
            position: absolute;
            top: .5rem;
            right: .5rem;
            img{
                width: .65rem;
                height: .6rem;
            }
        }
    }
	.img-box{
		img{
			width: 100%;
			height: 100%;
		}
	}
    .content{
        width: 100%;
        background-color: #fff;
        margin: .5rem 0;
        overflow: hidden;
        padding-bottom: 2.5rem;
        .head{
            width: 100%;
            height: 2rem;
            line-height: 2rem;
            box-sizing: border-box;
            padding: 0 .6rem;
            overflow: hidden;
            border-bottom: #e5e5e5 1px solid;
            .name{
                color: #6fc3d5;
                font-size: .7rem;
            }
            .time{
                color: #999999;
                font-size: .6rem;
                float: right;
            }
        }
        .txt{
            width: 100%;
            box-sizing: border-box;
            padding: 0 .75rem;
            overflow: hidden;
            color: #333333;
            font-size: .7rem;
            margin-top: .625rem;
            line-height: 1.7;
        }
    }
}
</style>
