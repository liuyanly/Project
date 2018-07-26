<template>
    <div class="triage">
        <!-- 分诊 -->
        <top-head headName='分诊'/>
        <div class="userInfoWrapper">
            <div class="userInfo">
                <p>
                    <img src="../images/pic_h.png">
                </p>
                <p class="name">李晓峰</p>
                <p class="title">全科医生</p>
                <img src="../images/d2_3icon1_2x.png" class="tips">
            </div>
        </div>
        <Symptom :symptom='symptom'/>
    </div>
</template>
<script>
import TopHead from '../components/Header';
import Symptom from '../components/Symptom';
export default {
  components: { TopHead, Symptom },
  data: function () {
      return {
          symptom: {
              title: '分诊意见',
              content: '从事综合内科工作10余年，对内科冠心病、心力衰竭、心肌梗死、心律失常、上呼吸道感染、肺炎、慢性支气管炎、泌尿道感染、胃炎、胃溃疡、幽门螺旋杆菌感染、肝硬化、对糖尿病药物及糖尿病胰岛素泵治疗、甲状腺疾病（妊娠甲状腺疾病）、高尿酸血症、骨质疏松及代谢疾病有独到见解。',
              pics: []
          }
      }
  }
}
</script>
<style scoped>
.name{
    font-size: .7rem;
    color: #333;
}
.title{
    font-size: .6rem;
    color: #666;
}
.triage{
    margin-top: 2.2rem;
    width: 100%;
}
.userInfoWrapper{
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    padding: .5rem .6rem;
}
.userInfoWrapper .userInfo{
    width: 100%;
    height: 9.2rem;
    border-radius: 10px;
    background-color: white;
}
.userInfoWrapper .userInfo p img{
    margin-top: .3rem;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
}
.userInfoWrapper .userInfo p{
    margin-top: 1.1rem;
}
.userInfoWrapper .userInfo p:first-child{
    margin-top: 0;
}
.userInfo{
    position: relative;
}
.tips{
    position: absolute;
    top: .475rem;
    right: .475rem;
    width: 15px;
}
</style>


