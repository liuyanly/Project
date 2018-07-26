<template>
    <div class="patientDetails">
        <TopHead headName='患者详情'/>
        <div class="contentScollr">
            <UserPic :data="data" :translates="translates"></UserPic>
            <Symptom :data='data'/>
            <div class="block"></div>
        </div>
        <!-- <div class="operat">
            <button class="progress" @click='to("serviceProgress")'>服务进度</button>
            <button class="suggestion">就诊意见</button>
        </div> -->
        <div class="operat">
            <button class="progress" @click='refuse()'>拒绝签约</button>
            <button class="suggestion" @click='accept()'>接受签约</button>
        </div>
    </div>
</template>
<script>
import TopHead from '../components/Header';
import UserPic from '../components/parts/headerPhoto';
import Symptom from '../components/Symptom'; // 症状组件
import { MessageBox } from 'mint-ui';
export default {
  components: { UserPic, TopHead, Symptom },
  data: function () {
      return {
        type:this.$route.params.type,
        data:"",
        translates:"",
      }
  },
  mounted: function () {

      // TODO: 根据userid请求用户信息
      this.queryUserMeg();
  },
  methods: {
      queryUserMeg(){
        let userId = this.$route.params.id;
        this.BaseSet.getToken(this) //用户端token
        this.$ajax.get(`user/patient/${userId}`)
        .then((res)=>{
            let data = res.data.data;
            if(res.data.status==200){
                this.data = data;
                this.translates = data.translates
            }
        })
        .catch((err)=>{
            console.log(err)
        })
      },
      to: function (name) {
          this.$router.push({name: name, params: {userId: this.$route.params.userId}});
      },
      refuse(){
          this.$router.push(`/refuseWhy?id=${this.data.id}`)
      },
      accept(){


        MessageBox.confirm('确定签约?').then(action => {
            this.BaseSet.getToken(this)
            this.$ajax.put(`/user/myuser/${this.data.id}`,{
                status: 1,
            } )
            .then((res)=> {
                this.$toast('签约成功')
                setTimeout(function(){
                    this.$router.push(`/SignPatient`)
                },1500)
            })
            .catch((err)=> {
                this.$toast(err)
            });
        });
      }
  }
}
</script>
<style scoped lang='scss'>
    .patientDetails{
        display: flex;
        height: 100%;
        flex-direction: column;
        .contentScollr{
			flex: 1;
			overflow: scroll;
			-webkit-overflow-scrolling:touch
		}
    }
    .block{
        margin-bottom: 2.45rem;
    }
    .operat{
        width: 100%;
        height: 2.45rem;
        display: flex;
        flex-direction: row;
        button{
            flex: 1;
            width: 50%;
            height: 100%;
            border: 0;
        }
        .progress{
            color: #6FC3D5;
            background-color: white;

        }
        .suggestion{
            color: white;
            background-color: #6FC3D5;
        }
    }
</style>
