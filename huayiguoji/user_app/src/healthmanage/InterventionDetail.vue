<template>
	<div class="intervention_detail">
		<headers :headName='HeadName'></headers>
		<div class="contentScollr">
        <div class="doctor" v-if="type==0">
            <div class="pic"><img :src="doctorInfo.avatar_img" alt=""></div>
            <div class="name">{{doctorName}}</div>
            <div class="tag">{{doctorInfo.department_title}}</div>
            <div class="hospital">{{doctorInfo.hospital_title}}</div>
			<div class="icon"><img src="../assets/images/c4_icon.png" alt=""></div>
        </div>
		<div class="doctor img-box" v-if="type==1||type==2">
            <img :src="img" alt="">
        </div>
        <div class="content">
            <div class="head">
                <span class="name">{{HeadName}}</span>
                <span class="time">{{date}}</span>
            </div>
            <div class="txt">
                {{data.content}}
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
      data:'',
	  date:'',
	  img:'',
	  doctorInfo:'',
	  doctorName:'',
      HeadName:this.$route.params.title,
	  type:this.$route.params.id,
	  id:this.$route.params.dId,
    }
  },
  mounted(){
	this.BaseSet.getToken(this)
	this.getData()
  },
  methods:{
	  getData(){
		  var that = this
		  that.$ajax.get('/intervene/'+that.id)
		  .then(function(res){
			  console.log(res.data)
			  if(res.data.status == 200){
				  that.data = res.data.data
				  that.date = res.data.data.created_at.substring(0,10)
				  that.img = res.data.data.translates.image
				  that.doctorInfo = res.data.data.doctor.translates
				  that.doctorName = res.data.data.doctor.realname
			  }
		  })
		  .catch(function(err){
			  that.BaseSet.linkLogin(that)
		  })
	  }
  },
  components: { headers},
  //请求数据接口
}
</script>

<style lang="scss" scoped>
.intervention_detail{
    width: 100%;
	display: flex;
	height: 100%;
	flex-direction: column;
	.contentScollr{
		flex: 1;
		overflow: auto;
		-webkit-overflow-scrolling:touch;
	}
    .doctor{
        width: 17.55rem;
        height: 7rem;
        margin: 0 auto;
        border-radius:.25rem;
        overflow: hidden;
        background-color: #fff;
        text-align: center;
        position: relative;
		margin-top: .75rem;
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
