<template>
  <div>
      <!-- 进行中 -->
      <ul class="inProgress">
          <li class="items clear">
              <div class="patientInfo">
                  <div class="userHeader">
                      <img src="../../assets/images/avatar.png" alt="">
                  </div>
                  <div class="info">
                      <p class="name">李丽</p>
                      <p class="age">
                          <span>性别:女</span>
                          <span>年龄:27</span>
                      </p>
                      <p class="illness">病症: 妇科病</p>
                  </div>
              </div>
              <div class="type">
                就诊
              </div>
          </li>
          <li class="items clear">
              <div class="patientInfo">
                  <div class="userHeader">
                      <img src="../../assets/images/avatar.png" alt="">
                  </div>
                  <div class="info">
                      <p class="name">陈军</p>
                      <p class="age">
                          <span>性别:男</span>
                          <span>年龄:48</span>
                      </p>
                      <p class="illness">病症: 脑肿瘤</p>
                  </div>
              </div>
              <div class="type">
                图文咨询
              </div>
          </li>
          <!-- <li class="items clear">
              <div class="patientInfo">
                  <div class="userHeader">
                      <img src="../../assets/images/avatar.png" alt="">
                  </div>
                  <div class="info">
                      <p class="name">杜拉拉</p>
                      <p class="age">
                          <span>性别:女</span>
                          <span>年龄:42</span>
                      </p>
                      <p class="illness">病症: 脑肿瘤</p>
                  </div>
              </div>
              <div class="type">
                电话咨询
              </div>
          </li>
          <li class="items clear">
              <div class="patientInfo">
                  <div class="userHeader">
                      <img src="../../assets/images/avatar.png" alt="">
                  </div>
                  <div class="info">
                      <p class="name">杜拉拉</p>
                      <p class="age">
                          <span>性别:女</span>
                          <span>年龄:42</span>
                      </p>
                      <p class="illness">病症: 脑肿瘤</p>
                  </div>
              </div>
              <div class="type">
                视频咨询
              </div>
          </li>
          <li class="items clear">
              <div class="patientInfo">
                  <div class="userHeader">
                      <img src="../../assets/images/avatar.png" alt="">
                  </div>
                  <div class="info">
                      <p class="name">杜拉拉</p>
                      <p class="age">
                          <span>性别:女</span>
                          <span>年龄:42</span>
                      </p>
                      <p class="illness">病症: 脑肿瘤</p>
                  </div>
              </div>
              <div class="type">
                转诊
              </div>
          </li> -->
      </ul>
  </div>
</template>
<style scoped lang='scss'>
    .inProgress{
        width: 100%;
        .items{
            width: 100%;
            border-bottom: 1px solid #dcdcdc;
            background-color: white;
            box-sizing: border-box;
            padding: .75rem;
            .patientInfo{
                width: 70%;
                height: 100%;
                float: left;
                .userHeader{
                    float: left;
                    width: 2.5rem;
                    height: 2.5rem;
                    img{
                        width: inherit;
                        height: inherit;
                        border-radius: 50%;
                        vertical-align: middle;
                    }
                }
                .info{
                    float: left;
                    margin-left: .525rem;
                    .name{
                        font-size: .7rem;
                        color: #333;
                    }
                    .age{
                        font-size: .6rem;
                        color: #666;
                        //display: inline-block;
                        vertical-align: middle;
                    }
                    .illness{
                        font-size: .6rem;
                        color: #EB4C4E;
                    }
                }
            }
            .type{
                width: 30%;
                height: 100%;
                font-size: .6rem;
                color: #666;
                float: left;
                box-sizing: border-box;
                padding: 1rem 0;
                text-align: right;
            }
        }
    }
</style>
<script>
export default {
  data: function () {
      return {
          // 列表数据
          listData: []
      }
  }
}
</script>
