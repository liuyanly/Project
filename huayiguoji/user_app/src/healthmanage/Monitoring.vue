<template>
    <div class="monitoring">
        <headers headName="体征监测"></headers>
        <div class="contentScollr">
            <div class="box">
                <ul>
                    <li v-for="data in dataList">
                        <router-link :to="{path: '/MonitoringDetail/'+data.id}">
                            <img src="../assets/images/c20_icon1.png" alt="">
                            <span>{{data.title}}</span>
                        </router-link>
                    </li>
                    <!-- <router-link :to="{path: '/MonitoringDetail/'+1}" >
                <li>
                    <img src="../assets/images/c20_icon2.png" alt="">
                    <span>血糖</span>
                </li>
                </router-link>
                <router-link :to="{path: '/MonitoringDetail/'+2}" >
                <li>
                    <img src="../assets/images/c20_icon3.png" alt="">
                    <span>血脂</span>
                </li>
                </router-link>
                <router-link :to="{path: '/MonitoringDetail/'+3}" >
                <li>
                    <img src="../assets/images/c20_icon4.png" alt="">
                    <span>体重</span>
                </li>
                </router-link>
                <router-link :to="{path: '/MonitoringDetail/'+4}" >
                <li>
                    <img src="../assets/images/c20_icon5.png" alt="">
                    <span>腰围</span>
                </li>
                </router-link>
                <router-link :to="{path: '/MonitoringDetail/'+5}" >
                <li>
                    <img src="../assets/images/c20_icon6.png" alt="">
                    <span>尿酸</span>
                </li>
                </router-link> -->
                </ul>
            </div>
        </div>
        <p class="input-btn" @click="link()">
            数据录入
        </p>
    </div>
</template>

<script>
import headers from "../components/Header.vue";
export default {
  data() {
    return {
      dataList: []
    };
  },
  mounted() {
    this.BaseSet.getToken(this);
    this.getData();
  },
  methods: {
    getData() {
      var that = this;
      that.$ajax
        .get("/check")
        .then(function(res) {
          if (res.data.status == 200) {
            console.log(res.data.data);
            if (res.data.data instanceof Array) {
              that.dataList = res.data.data;
            }
          } else if (res.data.status == 401) {
            that.BaseSet.linkLogin(that);
          } else {
            that.$toast(res.data.message);
          }
        })
        .catch(function(err) {
          //that.$toast(err)
          that.BaseSet.linkLogin(that);
        });
    },
    Back() {
      this.$router.go(-1);
    },
    link() {
        var that=this;
      this.$router.push({ name: "DataInput",params: { id: that.dataList[0].id } });
    }
  },
  components: { headers }
  //请求数据接口
};
</script>

<style lang="scss" scoped>
.monitoring {
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  .contentScollr {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .box {
    width: 100%;
    overflow: hidden;
    padding-top: 0.75rem;
    padding-bottom: 1rem;
    li {
      width: 8.5rem;
      height: 5rem;
      border-radius: 0.5rem;
      float: left;
      text-align: center;
      margin-left: 0.575rem;
      margin-bottom: 0.5rem;
      background-color: #fff;
      img {
        width: 1.65rem;
        height: 1.65rem;
        margin-top: 1rem;
      }
      span {
        color: #666666;
        font-size: 0.7rem;
        display: block;
        margin-top: 0.375rem;
      }
    }
  }
  .input-btn {
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    background: #4cc6d8;
    font-size: 0.8rem;
    color: #fff;
    position: fixed;
    bottom: 0;
    left: 0px;
    right: 0px;
  }
}
</style>
