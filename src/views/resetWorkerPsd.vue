<template>
  <div id="setPsd">
    <nav-bar title="重置密码" />
    <h2>设置密码</h2>
    <div class="username inputbox">
      <van-field type="password" v-model="password" placeholder="输入密码" />
      <van-field type="password" v-model="confrim" placeholder="再次输入" />
    </div>
    <div class="btnContainer">
      <van-button @click="confirmChange">确认</van-button>
    </div>
  </div>
</template>
<script>
import { Field, Toast,Button } from "vant";
import NavBar from "../components/NavBar.vue";
export default {
    name:"resetworkerpsd",
  data() {
    return {
      password: "",
      confrim: ""
    };
  },
   mounted() {
     this.checkedToken(localStorage.getItem('token'));
   this.$toast.setDefaultOptions({ duration:500});
  },
  methods: {
     checkedToken(token){
      // 验证token  有效期
      this.$axios.get(`https://gx.budaohuaxia.com/api/Technician/CarToken?token=${token}`).then(res =>{
         if(res.data.code == 1009){
           //  此时token失效 重新登录 
           //  缓存登录状态 
            localStorage.removeItem('isLogin')

           localStorage.setItem('lossToke',1)
           this.$router.push('/')
            
           }
      })
    },
      // 验证先后密码
    confirmChange() {
      if (this.$data.password !== this.$data.confrim) {
        Toast("两次输入密码不一致");
      } else {
        this.changePsd();
      }
    },
    changePsd() {
      let that = this;
    //   let phonemNumber = localStorage.getItem('')
      var data = {
        // token: localStorage.getItem("token"),
        iphone: localStorage.getItem('phoneNumber'),
        password: this.$data.password
      }
     this.$axios.post('https://gx.budaohuaxia.com//api/Technician/OwnerRegistration',this.$qs.stringify(data)).then(res =>{
      // 判断code 密码修改状态
      if(res.data.code === 0 ){
          // success 
           this.$toast.loading({
              message: "密码修改成功",
              forbidClick: true,
              loadingType: "spinner",
              onClose() {
                that.$router.push("/");
              }
            });
    
      }else if(res.data.code ===1){
         this.$toast.loading({
              message: "密码修改失败",
              forbidClick: true,
              loadingType: "spinner"
            //   onClose() {
            //     that.$router.push("/workerHome");
            //   }
            });
      }
    })
    
    }
  },
  components: {
    NavBar,
    [Field.name]:Field,
    [Button.name]:Button
  }
};
</script>
