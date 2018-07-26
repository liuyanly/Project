<template>
  <div>
      <TopHeader headName='就医策划' :subOperat='subOperat'/>
      <div class="progress">
          <div class="item y-clear active">
              <div class="timeLine">
                  <div class="line top"></div>
                  <div class="ball activeColor"></div>
                  <div class="line bottom"></div>
              </div>
              <div class="content">
                    <div class="item1">
                        <p class="itemStep">分诊</p><!--
                        --><p class="itemTime">2017-05-20</p>
                    </div>
                    <div class="info item2">
                        <span>李晓峰</span><span class="marL">全科医生</span>
                    </div>
              </div>
          </div>
          <div class="item y-clear">
              <div class="timeLine">
                  <div class="line top"></div>
                  <div class="ball"></div>
                  <div class="line bottom"></div>
              </div>
              <div class="content">
                    <div class="item1">
                        <p class="itemStep">分诊</p><!--
                        --><p class="itemTime">2017-05-20</p>
                    </div>
                    <div class="info item2">
                        <span>李晓峰</span><span class="marL">全科医生</span>
                    </div>
              </div>
          </div>
      </div>
  </div>
</template>
<style scoped>
    .active div,.active span,.active p{
        color: #6FC3D5;
    }
    .item1{
        margin-top: 1rem;
    }
    .item2{
        margin-top: .35rem;
    }
    .activeFontColor{
        color: #6FC3D5;
    }
    .info{
        font-size: .7rem;
    }
    .marL{
        margin-left: 1.35rem;
    }
    .itemStep{
        width: 50%;
        display: inline-block;
        vertical-align: middle;
        font-size: .9rem;
    }
    .itemTime{
        width: 50%;
        display: inline-block;
        vertical-align: middle;
        box-sizing: border-box;
        padding-right: .775rem;
        font-size: .6rem;
        text-align: right;
    }
    .line{
        width: .1rem;
        height: 50%;
        position: absolute;
        left: 1.3rem;
        background-color: #e5e5e5;
        z-index: 100;
    }
    .top{
        top: 0;
    }
    .bottom{
        bottom: 0;
    }
    .progress{
        width: 100%;
        background-color: white;
        margin-top: 2.2rem;
    }
    .item{
        width: inherit;
        height: 4.525rem;
    }
    .timeLine{
        width: 3.5rem;
        height: 100%;
        position: relative;
        float: left;
    }
    .content{
        width: calc(100% - 3.5rem);
        height: 100%;
        float: left;
        border-bottom: 1px solid #e5e5e5;
    }
    .progress .item:last-child .content{
        border-bottom: 0;
    }
    .ball{
        position: absolute;
        top: 1.925rem;
        left: .974rem;
        z-index: 200;
        width: .75rem;
        height: .75rem;
        border-radius: 50%;
        background-color: #999;
    }
    .activeColor{
        background-color: #6FC3D5;
    }
</style>
<script>
import TopHeader from '../components/Header';
export default {
    components: { TopHeader },
    data: function () {
        return {
            subOperat: {
              title: '基本资料',
              skip: 'basicMaterial',
              params: {
                  userId: this.$route.params.userId
              }
            }
        }
    }
}
</script>


