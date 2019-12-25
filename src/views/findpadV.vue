<template>
  <div id="loginBox">
    <NavBar title="找回密码" />
    <h2 class="text">请输入验证码</h2>
    <van-password-input
      :value="value"
      :mask="false"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
      gutter="6"
    />
    <div class="loginbtn">
      <van-button class="bottom-btn" color="#E37731" @click="register"
        >确定</van-button
      >
    </div>
    <van-number-keyboard
      :show="showKeyboard"
      extra-key="."
      close-button-text="完成"
      @blur="showKeyboard = false"
      :value="value"
      @input="onInput"
      @delete="onDelete"
      maxlength="6"
    />
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import {
  Button,
  Toast,
  Image,
  Field,
  Icon,
  PasswordInput,
  NumberKeyboard
} from "vant";

export default {
  name: "indexlogin",
  data() {
    return {
      value: "",
      showKeyboard: true
    };
  },
  mounted() {
    this.checkedToken(localStorage.getItem('token'));
    this.$toast.setDefaultOptions({ duration: 500 });
  },
  methods: {
    checkedToken() {
      // 验证token  有效期
      this.$axios
        .get( `https://gx.budaohuaxia.com/api/Technician/CarToken?token=${token}`)
        .then(res => {
          if (res.data.code == 1009) {
            //  此时token失效 重新登录
            //  缓存登录状态
            localStorage.removeItem('isLogin')

            localStorage.setItem("lossToke", 1);
            this.$router.push("/");
          }
        });
    },
    register() {
      let that = this;
      //取出 手机号码
      let phoneNumber = localStorage.getItem("phoneNumber");
      this.$axios
        .get(
          "https://gx.budaohuaxia.com/api/Technician/PasswordCode?iphone=" +
            phoneNumber +
            "&" +
            "code=" +
            this.value
        )
        .then(res => {
          //  判断 验证码匹配状态
          if (res.data.code === 0) {
            // 此时成功
            this.$toast.loading({
              message: "验证码匹配成功",
              forbidClick: true,
              loadingType: "spinner",
              onClose() {
                that.$router.push("/resetworkerpsd");
              }
            });
          } else if (res.data.code === 1) {
            this.$toast.loading({
              message: "验证码匹配失败",
              forbidClick: true,
              loadingType: "spinner",
              onClose() {
                // that.$router.push("/verificationcode");
              }
            });
          }
        });
    },
    onInput(value) {
      this.$data.value += value;
      // console.log(this.$data.value);
    },
    onDelete() {
      this.$data.value = this.value.slice(0, this.value.length - 1);
      // console.log(this.$data.value);
    }
  },
  components: {
    NavBar,
    [Button.name]: Button,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [NumberKeyboard.name]: NumberKeyboard,
    [PasswordInput.name]: PasswordInput
  }
};
</script>
<style lang="scss" scoped>
#loginBox .topBar {
  display: flex;
  height: 120px;
  justify-content: center;
  align-items: center;
}
</style>
