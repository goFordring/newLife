<template>
  <div id="loginBox">
    <NavBar title="“小布”改变人类车生活" />
    <div class="topBar">
      <img
        class="logo"
        src="../assets/img/newLogo.png"
        width="85px"
        height="85px"
      />
    </div>
    <div class="username inputbox">
      <van-field type="number" v-model="username" placeholder="请输入手机号" />
    </div>
    <div class="loginbtn">
      
      <van-button class="bottom-btn" color="#E37731" @click="nextStep" :disabled = '!checked'
        >下一步</van-button
      >
    </div>
    <!-- 隐私协议默认点击-->
    <div class="ys">
     <span> 
       <van-checkbox v-model="checked" checked-color="#E37731">已阅读并同意</van-checkbox>
       </span>
     <a class="yellow" href="http://ys.budaohuaxia.com/">[用户协议]</a>
    </div>
  </div>
</template>

<script>
// import vant from VanComponent
import NavBar from "../components/NavBar";
import {
  Button,
  Image,
  Field,
  Icon,
  Toast,
  NumberKeyboard,
  Checkbox,
  CheckboxGroup
} from "vant";
// import user from '../../store/modules/user

export default {
  name: "indexlogin",
  data() {
    return {
      // 手机号码
      username: "",
      showKeyboard: false,
      showToast: false,
      checked: true
    };
  },
  // 生命周期函数
  mounted() {
    if (localStorage.getItem("isLogin")) {
      this.$router.push("/workerhome");
      localStorage.setItem("showHomeToast", true);
    }
    // 获取缓存    控制 token失效时 轻弹窗组件
    if (localStorage.getItem("lossToke")) {
      Toast.fail("登录超时，请您重新登录");
    }
    this.$toast.setDefaultOptions({ duration: 3000 });
  },
  methods:{
    toYs(){     
     this.$router.push('/ys')
     console.log('ok')
    },
    //  修改轻提示默认时间

    //手机正则表达式
    nextStep() {
      if (!/^1[12345789]\d{9}$/.test(this.$data.username)) {
        Toast("请输入正确的手机号码");
      } else {
        // this.$router.push("/verificationcode");
        this.getCode();
      }
      // this.$router.push({ path: 'loginCode', query: { userphone: this.$data.username } })
    },
    showKey() {
      document.activeElement.blur();
      this.$data.showKeyboard = true;
    },
    // 验证手机号码 函数

    getCode() {
      let that = this;

      this.$axios
        .get(
          "https://gx.budaohuaxia.com/api/Login/Techniciancode?iphone=" +
            this.username
        )
        .then(res => {
          localStorage.removeItem("lossToke");
          this.$toast.setDefaultOptions({ duration: 800 });

          let { code } = res.data;
          // 保存手机号码
          localStorage.setItem("phoneNumber", this.username);
          // 判断 code 跳转页面  getCode () {
          if (code === 0) {
            // 此时是注册  跳转注册验证页面
            this.$toast.loading({
              message: "验证码已发送",
              forbidClick: true,
              loadingType: "spinner",
              onClose() {
                that.$router.push("/verificationcode");
              }
            });
          } else if (code === 1) {
            return false;
          } else if (code === 2) {
            console.log('去密码')
            this.$toast.loading({
              message: "加载中！",
              forbidClick: true,
              loadingType: "spinner",
              onClose() {
                console.log('去密码')
                that.$router.push("/password");
                console.log('去密码')
              }
            });
            // 转至 登录输入密码
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // },
    onInput(value) {
      this.$data.username += value;
      //  username == 手机号码
    },
    onDelete(value) {
      this.$data.username = this.$data.username.slice(
        0,
        this.$data.username.length - 1
      );
    },
    onClose() {
      this.$data.showKeyboard = false;
    }
  },
  components: {
    NavBar,
    [Button.name]: Button,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [NumberKeyboard.name]: NumberKeyboard,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup
  }
};
</script>
<style scoped lang = "scss">
#loginBox .topBar {
  display: flex;
  height: 120px;
  justify-content: center;
  align-items: center;
}
#loginBox{
  .ys{
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 50px;
    .yellow{
      color: #E37731
    }
  }
}
</style>
