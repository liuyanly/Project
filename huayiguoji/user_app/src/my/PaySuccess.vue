<template>
  <div class="pay-success">
    <headers headName="支付成功"></headers>
    <div class="contentScollr">
      <div class="inner-box clear">
        <p class="success-img left">
        </p>
        <div class="left">
          <p class="line1">
            恭喜您支付成功！
          </p>
          <p class="line2">
            ¥{{money}}
          </p>
        </div>
      </div>
      <p class="btn" @click="payComplete()">
        完成
      </p>
    </div>
  </div>
</template>
<script>
  import headers from "../components/Header"

  export default {
    data() {
      return {
        money: this.$route.params.money,
      }
    },
    methods: {
      payComplete() {
        this.$router.push({name: 'MyOrder'})
      }
    },
    created() {
      console.log(this.$route)
    },
    components: {headers},
  }
</script>
<style lang="scss" scoped>
  .pay-success {
    padding-bottom: 5rem /* 200/40 */
  ;
    display: flex;
    height: 100%;
    flex-direction: column;
    .contentScollr {
      flex: 1;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
    .inner-box {
      padding: 4.9rem /* 195/40 */
      0 3.3rem /* 131/40 */
      5.2rem /* 207/40 */
    ;
      .left {
        float: left;
      }
      .success-img {
        width: 2.3rem /* 90/40 */
      ;
        height: 2.3rem /* 90/40 */
      ;
        text-align: center;
        background: url(../assets/images/g17_success.png);
        border-radius: 50%;
        background-size: cover;
        line-height: 2.3rem;
        color: #fff;
        margin-right: .7rem /* 27/40 */
      ;
      }
      .line1 {
        font-size: .8rem /* 30/40 */
      ;
        color: #8cc53c;
        margin-top: .3rem /* 12/40 */
      ;
        margin-bottom: .4rem /* 17/40 */
      ;
        line-height: .8rem;

      }
      .line2 {
        font-size: .7rem /* 28/40 */
      ;
        color: #999;
        line-height: .7rem;
      }
    }
    .btn {
      width: 17.2rem;
      height: 2.05rem;
      text-align: center;
      margin: 0 auto;
      background-color: #4DC6D8;
      color: #ffffff;
      line-height: 2.05rem;
      font-size: .8rem;
      border-radius: .25rem;
    }
  }
</style>
