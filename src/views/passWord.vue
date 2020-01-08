<template>
  <div id="loginBox">
    <NavBar title="小布APP 技师登录" />
    <div class="topBar">
      <img
        class="logo"
        src="../assets/img/newLogo.png"
        width="85px"
        height="85px"
      />
    </div>
    <div class="username inputbox">
      <van-field type="password" v-model="password" placeholder="请输入密码" />
    </div>
    <div class="loginbtn">
      <van-button class="bottom-btn" color="#E37731" @click="login"
        >登录</van-button
      >
    </div>
    <span class="forgetPsd" @click="forgetPsd">忘记密码</span>
  </div>
</template>

<script>
var map = new AMap.Map("container", {
  resizeEnable: true
});
import NavBar from "../components/NavBar";
import { Button, Image, Field, Icon, Toast } from "vant";
export default {
  title: "小布APP 车主登录",
  data() {
    return {
      password: ""
    };
  },
  mounted() {
    if (localStorage.getItem("isLogin")) {
      this.$router.push("/workerhome");
      localStorage.setItem("showHomeToast", true);
    }
    this.$toast.setDefaultOptions({ duration: 800 });
  },
  methods: {
    // 获取code

    login() {
      let that = this;
      // 取出缓存
      let phone = localStorage.getItem("phoneNumber").toString();

      var data = {
        iphone: phone,
        password: this.password
      };
      // 发送请求
      this.$axios
        .post(
          "https://gx.budaohuaxia.com/api/Technician/login",
          this.$qs.stringify(data)
        )
        .then(res => {
          //  改变登录状态 此时登录成功 退回
          // localStorage.setItem("isLogin", true);
          let { type } = res.data;
          // type == 0 是未完善
          if (res.data.code === 0) {
            localStorage.setItem("token", res.data.token);
            //转到 完善信息
            if (type === 1) {
              // 获取地理位置
              this.getLocation();
              // 此时信息完善去首页
              this.$toast.loading({
                message: "登录成功！",
                forbidClick: true,
                loadingType: "spinner",
                onClose() {
                  that.$router.push("/workerhome");
                  // that.$router.push("/setworkerinfo");
                  localStorage.setItem("isLogin", true);
                }
              });
            } else if (type === 0) {
              //  此时先去选择技师界面
              this.$router.push('/chooseworker')
              // 此时信息未完善
            }
            //
          } else if (res.data.code == 1) {
            // 验证密码错误
            this.$toast.fail("密码错误！");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 忘记密码
    forgetPsd() {
      this.$router.push("/findpadp");
    },
    // 获取地理位置信息
    getLocation() {
      let that = this;
      map.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: "RB"
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          let lngs = data.position.lng;
          let lats = data.position.lat;
          // 存入 缓存 这是起点
          localStorage.setItem("lnglat", [lngs, lats]);

          that.lng = lngs.toString() + "," + lats.toString();
          // 调用请求数据
          // that.getList();
        }

        function onError(data) {
          // 定位出错
        }
      });
    }
  },
  components: {
    NavBar,
    [Button.name]: Button,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Toast.name]: Toast
  }
};
</script>
<style scoped>
#loginBox .topBar {
  display: flex;
  height: 120px;
  justify-content: center;
  align-items: center;
}
</style>
