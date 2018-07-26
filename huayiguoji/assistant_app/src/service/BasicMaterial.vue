<template>
  <div class="basicMaterial">
    <top-header headName='基本资料'/>
    <div class="block">
      <div class="title">
        个人资料
      </div>
      <div class="userInfo y-clear">
        <div class="userHead">
          <img src="../images/pic_h.png" alt="">
        </div>
        <div class="info">
          <div class="infoItem">
            <span class="colon">姓名</span><span class="infoContent">阿拉丁<span class="age">(男，42岁)</span></span>
          </div>
          <div class="infoItem">
            <span class="colon">居住地</span><span class="infoContent">北京市大兴区西红门镇同华路2号</span>
          </div>
          <div class="infoItem">
            <span class="colon">联系电话</span><span class="infoContent">15822227787</span>
          </div>
        </div>
      </div>
    </div>
    <div class="y-fengexian"></div>
    <div class="block noMar">
      <div class="title">病情描述</div>
      <div class="textContent" v-html='textContent'></div>
    </div>
  </div>
</template>
<script>
import TopHeader from '../components/Header';
export default {
  components: { TopHeader },
  data: function () {
    return {
      textContent: '<a href="www.baidu.com">a</a><img src="http://d.hiphotos.baidu.com/image/pic/item/838ba61ea8d3fd1ffa1179293a4e251f95ca5f8d.jpg#18382324739"/><p style="font-size:20px;">这是占位的</p>'
    }
  }
}
</script>
<style scoped lang='scss'>
  .noMar{
    margin-top: 0!important;
  }
  .block{
    margin-top: 2.2rem;
    width: 100%;
    background-color: white;
    .title{
      width: 100%;
      height: 1.975rem;
      line-height: 1.975rem;
      box-sizing: border-box;
      padding-left: .725rem;
      color: #4CC6D8;
      font-size: .7rem;
      border-bottom: 1px solid #e5e5ee;
    }
    .userInfo{
      width: 100%;
      box-sizing: border-box;
      padding: .55rem .75rem;
      .userHead{
        float: left;
        img{
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
      .info{
        float: left;
        width: calc(100% - 2.5rem);
        box-sizing: border-box;
        padding-left: .6rem;
        .infoItem:last-child .infoContent,.infoItem:last-child .colon{
          vertical-align: middle;
        }
        .infoItem{
          span{
            display: inline-block;
            vertical-align: text-top;
            font-size: .7rem;
          }
          .age{
            color: #cecece;
          }
          .colon{
            width: 3rem;
            position: relative;
          }       
          .colon:after{
            content: ':';
            position: absolute;
            right: 0;
          }
          .infoContent{
            padding-left: 8px;
            width: calc(100% - 3rem - 8px);
          }
        }
      }
    }
  }
  .textContent{
    width: 100%;
    font-size: 16px;
    box-sizing: border-box;
    padding: .725rem 0;
    img{
      max-width: 100%;
    }
  }
</style>
