<template>
	<div class="base_question">
		<headers headName='基础问卷'></headers>
    <div class="head_box">
        <div class="icon"><img src="../assets/images/c72_1icon1.png" alt=""></div>
        <div class="name">个人基本情况</div>
    	<!-- <router-link :to="{ name: 'AddBaseQuestion', params: {} }"><div class="btn">修改</div></router-link> -->
    </div>
	<div class="content">
      <div class="head">基本情况</div>
      <div class="table">
        <ul>
          <li>
            <div class="left">姓名</div>
            <div class="right">刘丽</div>
          </li>
          <li>
            <div class="left">性别</div>
            <div class="right">女</div>
          </li>
          <li>
            <div class="left">身份证</div>
            <div class="right">21010199102309203</div>
          </li>
          <li>
            <div class="left">出生日期</div>
            <div class="right">1991-02-30</div>
          </li>
          <li>
            <div class="left">民族</div>
            <div class="right">汉</div>
          </li>
          <li>
            <div class="left">血型</div>
            <div class="right">O型</div>
          </li>
          <li>
            <div class="left">婚姻状况</div>
            <div class="right">已婚</div>
          </li>
          <li>
            <div class="left">文化程度</div>
            <div class="right">本科</div>
          </li>
          <li>
            <div class="left">职业</div>
            <div class="right">企业主管</div>
          </li>
		  <li>
            <div class="left">联系电话</div>
            <div class="right">18483928392</div>
          </li>
          <li>
            <div class="left">通迅地址</div>
            <div class="right">上海市徐汇区桂林路182号5栋1单元16号</div>
          </li>
        </ul>
      </div>
    </div>
    <!-- <div class="content">
      <div class="head">目前健康状况</div>
      <div class="table">
        <ul>
          <li>
            <div class="left">健康状况</div>
            <div class="right">好</div>
          </li>
          <li>
            <div class="left">您过去一段时间感到疲劳的程度</div>
            <div class="right">易疲劳</div>
          </li>
          <li>
            <div class="left">同上一年相比，您的体重</div>
            <div class="right">基本不变</div>
          </li>
          <li>
            <div class="left">在近一年内，您曾尝试过增减体重吗</div>
            <div class="right">否</div>
          </li>
          <li>
            <div class="left">您近半年内测过血压吗</div>
            <div class="right">未测</div>
          </li>
          <li>
            <div class="left">您近半年内测过血脂吗</div>
            <div class="right">未测</div>
          </li>
          <li>
            <div class="left">锻炼时间(小时/每周)</div>
            <div class="right">每周不超过1次</div>
          </li>
          <li>
            <div class="left">是否经常有颈部、腰部、骨关节疼痛</div>
            <div class="right">否</div>
          </li>
		  <li>
            <div class="left">是否有慢性腹泻、便秘、大便不正常</div>
            <div class="right">否</div>
          </li>
        </ul>
      </div>
    </div> -->
	</div>
</template>

<script>
//导入模板
import headers from "../components/Header.vue";
export default {
  data () {
    return {
      articles:''
    }
  },
  components: { headers},
  //请求数据接口
}
</script>

<style lang="scss">
.base_question{
  width: 100%;
  overflow: hidden;
  margin-top: 2.2rem;
  .head_box{
    width: 100%;
    height: 3rem;
    background-color: #fff;
    overflow: hidden;
    font-size: 0;
    box-sizing: border-box;
    padding: 0 .75rem;
    .icon{
      display: inline-block;
      vertical-align: middle;
      width: .8rem;
      height: .8rem;
      margin-top: 1rem;
      img{
        width: .8rem;
        height: .8rem;
      }
    }
    .name{
      color: #333333;
      font-size: .7rem;
      display: inline-block;
      vertical-align: middle;
      margin-top: 1.05rem;
      margin-left: .325rem;
    }
    .btn{
      width: 2.5rem;
      height: 1rem;
      float: right;
      border: #666666 1px solid;
      border-radius:.25rem;
      margin-top: 1rem;
      font-size: .6rem;
      color: #666666;
      text-align: center;
      line-height: 1.1rem;
    }
  }
  .content{
    width: 100%;
    overflow: hidden;
    background-color: #fff;
    margin-top: .5rem;
    .head{
        width: 100%;
        overflow: hidden;
        height: 2rem;
        box-sizing: border-box;
        padding: 0 .75rem;
        color: #4CC6D8;
        font-size: .7rem;
        line-height: 2rem;
        border-bottom: #e5e5e5 1px solid;
    }
    .table{
      width: 100%;
      overflow: hidden;
      li{
        width: 100%;
        float: left;
        overflow: hidden;
        border-bottom: #e5e5e5 1px solid;
        display: table;
        div{
          width: 50%;
          display: table-cell;
          box-sizing: border-box;
          padding: .8rem 0;
          padding-left: .75rem;
          vertical-align: middle;
        }
        .left{
          color: #333333;
          font-size: .65rem;
          border-right: #e5e5e5 1px solid;
        }
        .right{
          color: #666666;
          font-size: .65rem;
        }
      }
      li:nth-child(even){
        background-color: #F8F6F6;
      }
    }
  }
}
</style>
