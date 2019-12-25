<template>
  <div id="loginBox">
    <NavBar title="找回密码" />
    <div class="topBar">
      <img
        class="logo"
        src="../assets/img/jsLogo.png"
        width="85px"
        height="85px"
      />
    </div>
    <div class="username inputbox">
      <van-field
        type="number"
        v-model="username"
        placeholder="请输入手机号"
        @focus="showKey"
        :focus="showKeyboard"
      />
    </div>
    <div class="loginbtn">
      <van-button class="bottom-btn" color="#E37731" @click="nextStep"
        >下一步</van-button
      >
    </div>
    <van-number-keyboard
      :show="showKeyboard"
      extra-key="."
      close-button-text="完成"
      @blur="showKeyboard = false"
      :value="username"
      @input="onInput"
      @delete="onDelete"
      @close="onClose"
      maxlength="11"
      :hide-on-click-outside="false"
    />
  </div>
</template>

<script>
// import vant from VanComponent
import NavBar from "../components/NavBar";
import { Button, Image, Field, Icon, Toast, NumberKeyboard } from "vant";
// import user from '../../store/modules/user

export default {
  name: "indexlogin",
  data() {
    return {
      // 手机号码
      username: "",
      showKeyboard: false
    };
  },
  mounted() {
    this.checkedToken(localStorage.getItem('token'));
    // 轻弹窗默认 持续时间
   this.$toast.setDefaultOptions({ duration:500});
  },
  methods: {
     checkedToken(token) {
      // 验证token  有效期
      this.$axios
        .get( `https://gx.budaohuaxia.com/api/Technician/CarToken?token=${token}`)
        .then(res => {
          if (res.data.code === 1009) {
            //  此时token失效 重新登录
            //  缓存登录状态
            localStorage.removeItem('isLogin')

            localStorage.setItem("lossToke", 1);
            this.$router.push("/");
          }
        });
    },
    //手机正则表达式
    nextStep() {
      if (!/^1[34578]\d{9}$/.test(this.$data.username)) {
        Toast("请输入正确的手机号码");
      } else {
        //  this.$router.push("/verificationcode");
        this.getcodev()
      }
      // this.$router.push({ path: 'loginCode', query: { userphone: this.$data.username } })
    },
    showKey() {
      document.activeElement.blur();
      this.$data.showKeyboard = true;
    },
    // 验证手机号码 函数
   //  逻辑 验证码发送成功后 跳转页面
    getcodev(){
      let that = this;
      // 获取验证码
      this.$axios.get(`https://gx.budaohuaxia.com/api/Technician/PasswordBack?iphone=`+ this.username).then(res =>{
          if(res.data.code === 0){
            // 验证码发送成功
             this.$toast.loading({
              message: "验证码已发送",
              forbidClick: true,
              loadingType: "spinner",
              onClose() {
                that.$router.push("/findpadv");
              }
            });
          }
          // 发送失败
          else if(res.data.code === 1){
             this.$toast.loading({
              message: "验证码发送失败！",
              forbidClick: true,
              loadingType: "spinner",
              // onClose() {
              //   that.$router.push("/verificationcode");
              // }
            });
          }
      })
    },
   
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
    [NumberKeyboard.name]: NumberKeyboard
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
