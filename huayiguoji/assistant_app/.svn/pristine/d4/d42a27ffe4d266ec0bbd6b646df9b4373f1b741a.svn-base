<template>
    <div class="patientDetails">
        <TopHead headName='患者详情'/>
        <UserPic  :zijipic='zijipic' :hz='hz' :name='name' :bing='bing' :sex='sex' :age='age'></UserPic>
        <Symptom v-for='(data, index) in symptom' :key="index" :symptom='data'/>
        <div class="block"></div>
        <div class="operat">
            <button class="progress" @click='to("serviceProgress")'>服务进度</button><!--
            --><button class="suggestion">就诊意见</button>
        </div>
    </div>
</template>
<script>
import TopHead from '../components/Header';
import UserPic from '../components/parts/headerPhoto';
import Symptom from '../components/Symptom'; // 症状组件
export default {
  components: { UserPic, TopHead, Symptom },
  data: function () {
      return {
        type:this.$route.params.type,
        name: '李丽',
        bing: '慢性咽炎',
        sex: '女',
        age: '27',
        footer1Txt: "立即咨询",
        footer1TxtUsl: '/d5twzxxq',
        zijipic: '/src/assets/images/avatar.png', //头像
        hz: '/src/images/f1_v3@2x.png', //   徽章
        // 患者症状
        symptom: [
            {
                title: '症状',
                content: '干咳，干呕，最开始咽喉痛现在咽喉不疼，但咳嗽不停怎样治疗，在饮食上需要注意什么',
                pics: []
            }
        ]
      }
  },
  mounted: function () {
      let userId = this.$route.params.userId;
      // TODO: 根据userid请求用户信息

  },
  methods: {
      to: function (name) {
          this.$router.push({name: name, params: {userId: this.$route.params.userId}});
      }
  }
}
</script>
<style scoped lang='scss'>
    .block{
        margin-bottom: 2.45rem;
    }
    .operat{
        width: 100%;
        height: 2.45rem;
        position: fixed;
        bottom: -1px;
        button{
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
