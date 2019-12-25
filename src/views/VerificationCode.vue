<template>
  <div id="loginBox">
    <NavBar title="小布APP 技师注册"/>
    <h2 class="text">请输入验证码</h2>
    <van-password-input
    :value="value"
    :mask="false"
    :focused="showKeyboard"
    @focus="showKeyboard = true"
    gutter='6'
    />
    <div class="loginbtn">
        <van-button class="bottom-btn" color="#E37731"  @click="register">注册</van-button>
    </div>
    <van-number-keyboard
    :show="showKeyboard"
    extra-key="."
    close-button-text="完成"
    @blur="showKeyboard = false"
    :value='value'
    @input="onInput"
    @delete="onDelete"
    maxlength="6"
    />
  </div>
</template>

<script>
// import vant from VanComponent
import Vue from 'vue'
// import user from '../../store/modules/user'
import NavBar from '../components/NavBar'
import { Button, Toast, Image, Field, Icon, PasswordInput, NumberKeyboard } from 'vant'
import { type, userInfo } from 'os'


export default {
  name: 'indexlogin',
  title: '小布APP 车主注册',
  data () {
    return {
      value: '',
      showKeyboard: true
    }
  },
  mounted () {
    // this.checkedToken()
    // console.log(this.$route.query.iphone)
  },
  methods: {
    checkedToken(){
      // 验证token  有效期
      this.$axios.get('https://gx.budaohuaxia.com/api/Technician/CarToken').then(res =>{
         if(res.data.code == 1009){
           //  此时token失效 重新登录 
           //  缓存登录状态 
            localStorage.removeItem('isLogin')

           localStorage.setItem('lossToke',1)
           this.$router.push('/')
            
           }
      })
    },
    register () {
    //取出手机号码
    let userPhone =  localStorage.getItem('phoneNumber').toString();
   
    this.$axios.get(`https://gx.budaohuaxia.com/api/Technician/register?iphone=${userPhone}&code=${this.value}`).then(res =>{
      
      let {token} = res.data;
      // 缓存token
     
      localStorage.setItem('fanalKey',token);
      //判断 code
      let {code} = res.data
      if(code === 0){
        // 注册成功转到 完善信息
        this.$router.push('/setuserinfo')
      }
    }).catch(err =>{
      console.log(err)
    })
    },
    onInput (value) {
      this.$data.value += value
     
    },
    onDelete () {
      this.$data.value = this.value.slice(0, this.value.length - 1)
    
    }
  },
  components: {
    NavBar,
   [Button.name]:Button,
    [Field.name]:Field,
    [Icon.name]:Icon,
    [Toast.name]:Toast,
    [NumberKeyboard.name]:NumberKeyboard,
    [PasswordInput.name]:PasswordInput

  }
}
</script>
