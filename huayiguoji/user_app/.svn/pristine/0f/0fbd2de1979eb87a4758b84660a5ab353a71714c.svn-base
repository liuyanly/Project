<template>
  <div>
    <div @click="callphone">打电话</div>
    <div @click="shared">分享</div>
    <div @click="openView">打开新窗口</div>
    <div @click="uploadImg">上传图片</div>
    <div @click="uploadMutliImg">上传多个图片</div>
    <div @click="getgps">获取gps（回调方法名为gpsCallback）</div>
    <div @click="alipay">支付宝支付（回调方法名为aliPayCallback）</div>
    <div @click="wechatpay">微信支付（回调方法名为weChatPayCallback）</div>
    <div @click="register">传递token信息</div>
    <div @click="im">打开im对话框</div>
    <div @click="live">打开视频对话框</div>
    <div @click="imPC">PC测试暂时用im</div>
    <div @click="getVersion">获取版本号</div>
  </div>
</template>
<script>
export default {
  name: "demo",
  mounted: function() {},
  methods: {
    shared: function() {
      this.native.shared({
        title: "测试标题",
        content: "测试内容",
        img:
          "http://xiangjianguwan.zpftech.com/uploads/user/images/2018/04/06/1522999429e9ea646f80fb9c655e1563006fe4870e.jpg"
      });
    },
    callphone: function() {
      this.native.call({ phone: "18908226515" });
    },
    openView: function() {
      this.native.webView({ url: "http://www.baidu.com" });
    },
    uploadImg: function() {
      this.native.photo({ num: 1, width: 2, height: 1, size: 30 });
    },
    uploadMutliImg: function() {
      this.native.photo({ num: 3, width: 1, height: 1, size: 80 });
    },
    getgps: function() {
      this.native.gps(function(point) {
        alert(point);
      });
    },
    phone: function() {
      this.native.photo({ phone: "18908226515" });
    },
    phone: function() {
      this.native.photo({ token: "18908226515" });
    },
    alipay: function() {
      this.native.aliPay({
        content:
          "app_id=2018011501877269&method=alipay.trade.app.pay&format=JSON&charset=utf-8&sign_type=RSA2&version=1.0&return_url=http%3A%2F%2Fhygjstage.zpftech.com%2Falipay%2Freturn&notify_url=http%3A%2F%2Fhygjstage.zpftech.com%2Falipay%2Fcallback&timestamp=2018-04-10+16%3A26%3A49&sign=bUiUabZMKNYHIahXK54rNCN3tBRoEyzDxMErfkaHxXYl%2FMGVwC1Mb8TPfNjItyPSpitXngy%2BDfC%2BCXgJBRy2Jbfmg%2B9CHGAGLLpriEbR8S9mJVVGBxxiuq1CexsVEJUsHpFU47p6vhOzoXQ%2Bq%2FULd0oSkrnzPLx5flkacZu37fSgq6q%2Bg%2FR8nDpomVd53qttx7BI8tIncOLPZsxIUzf1Nao4JxLpRYd%2F2wqNwSMfx1eJWy8WPJjPIIp9Z9y0cQskYjSBVcChOu%2Fp5fVMuYEwch1JVTjXJJFznuVfa%2Fv39kmGetBt0o%2FIacQQOOyTKHLG0sxZ5nNrxl1jVfICvXu0yA%3D%3D&biz_content=%7B%22subject%22%3A%22%5Cu56fe%5Cu6587%5Cu54a8%5Cu8be2%22%2C%22out_trade_no%22%3A%22152334880956714%22%2C%22total_amount%22%3A%2250%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%7D"
      });
    },
    wechatpay: function() {
      this.native.weChatPay({
        content:
          '{"appid":"wx1727f305531fe888","partnerid":"1501527241","prepayid":"wx1016301818349578c59d3b172068714021","timestamp":"1523349018","noncestr":"X8BFPqNAbgErCqHh","package":"Sign=WXPay","sign":"1EBB393915C4CA4605D4BAC6BFBF0617"}'
      });
    },
    alipayCallback: function(status) {
      alert("支付宝支付成功");
    },
    wechatpayCallback: function(status) {
      alert("微信支付成功");
    },
    im: function() {
      var userInfo = JSON.parse(localStorage.userInfo);
      this.native.im({
        me: {
          id: userInfo.id,
          nickname: userInfo.realname,
          avatar: userInfo.translates.avatar_img,
          jobtitle: "",
          department: "",
          hospital: "",
          identity: "user"
        },
        other: {
          id: 8,
          nickname: "罗文祥",
          avatar:
            "http://api-hygjdoctor.zpftech.com/storage/upload/2…0408/N5b2jbElEF3U8z6AI6WnfGzddR4hqIc2QA5S2owo.png",
          jobtitle: "医师",
          department: "遗传咨询科",
          hospital: "北京安慧宜和妇儿医院",
          identity: "doctor"
        }
      });
    },
    live: function() {
      this.native.live({
        hostId: 8,
        nickname: "罗文祥",
        avatar:
          "http://api-hygjdoctor.zpftech.com/storage/upload/2…0408/N5b2jbElEF3U8z6AI6WnfGzddR4hqIc2QA5S2owo.png",
        jobtitle: "医师",
        department: "遗传咨询科",
        hospital: "北京安慧宜和妇儿医院",
        identity: "doctor"
      });
    },
    imPC: function() {
      this.native.im({ id: 3 });
    },
    logout: function() {
      this.native.logout({ id: "14" });
    },
    getVersion: function() {
      this.native.version();
    }
  }
};
</script>

