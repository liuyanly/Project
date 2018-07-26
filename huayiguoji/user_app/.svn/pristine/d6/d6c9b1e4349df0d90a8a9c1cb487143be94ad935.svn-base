<template>
	<div class="follow_detail">
		<headers headName='跟踪随访'></headers>
		<div class="contentScollr">
        <div class="doctor">
            <div class="pic"><img :src="headImg" alt=""></div>
            <div class="name">{{userName}}</div>
			<div class="tag" v-if="type==0">医助</div>
			<div class="tag" v-if="type==1">医生</div>
            <div class="icon"><img src="../assets/images/c4_icon.png" alt=""></div>
        </div>
        <div class="content">
            <div class="head">
				<span class="name" v-if="type==0">医助提醒</span>
				<span class="name" v-if="type==1">医生提醒</span>
                <span class="time">{{date}}</span>
            </div>
            <div class="txt">
                {{dataContent}}
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
      id:this.$route.params.id,
	  userName:'',
	  headImg:'',
	  dataContent:'',
	  date:'',
	  type:this.$route.params.type,
    }
  },
  mounted(){
	this.BaseSet.getToken(this)
	this.getData()
  },
  methods:{
	  getData(){
		  var that=this
		  that.$ajax.get('/visit/'+that.id)
		  .then(function(res){
			  if(res.data.status==200){
				  that.userName=res.data.data.post.realname
				  that.headImg=res.data.data.post.translates.avatar_img
				  that.dataContent=res.data.data.content
				  that.date=res.data.data.created_at.substring(0,10)
			  }else if(res.data.status==401){
				  that.BaseSet.linkLogin(that)
			  }else{
				  that.$toast(res.data.message)
			  }
		  })
		  .catch(function(err){
			  //console.log(err)
			  that.BaseSet.linkLogin(that)
		  })
	  }
  },
  components: { headers},
  //请求数据接口
}
</script>

<style lang="scss">
.follow_detail{
    width: 100%;
	position: relative;
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
		margin-top: .75rem;
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
