<template>
	<div class="intervention_detail">
		<headers headName='健康报告深度解读'></headers>
		<div class="contentScollr">
        <div class="doctor">
            <div class="pic"><img :src="headImg" alt=""></div>
            <div class="name">{{doctorName}}</div>
            <div class="tag">{{department}}</div>
            <div class="hospital">{{hospital}}</div>
			<div class="icon"><img src="../assets/images/c4_icon.png" alt=""></div>
        </div>
        <div class="content">
            <div class="head">
                <span class="name">健康报告深度解读</span>
                <span class="time">{{date}}</span>
            </div>
            <div class="txt" v-html="content">

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
	  headImg:'',
	  doctorName:'',
	  department:'',
	  hospital:'',
	  id:this.$route.params.id,
	  date:'',
	  content:'',
    }
  },
  mounted(){
	this.BaseSet.getToken(this)
	this.getData()
  },
  methods:{
	getData(){
		this.$ajax.get('/analysis/'+this.id)
		.then((res) => {
			console.log(res.data)
			if(res.data.status == 200){
				this.date = res.data.data.data.created_at.substring(0,10)
				this.content = res.data.data.data.content
				this.headImg = res.data.data.doctor.translates.avatar_img
				this.doctorName = res.data.data.doctor.realname
				this.department = res.data.data.doctor.translates.department_title
				this.hospital = res.data.data.doctor.translates.hospital_title
			}
		})
		.catch((err)=> {

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
	height: 100%;
	flex-direction: column;
	.contentScollr{
		flex: 1;
		overflow: scroll;
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
        font-size: 0;
		margin-top: .75rem;
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
