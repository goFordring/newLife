<template>
  <div class="about">
   <button @click = "getCode">这是按钮</button>
  </div>
</template>
<script>
import { Button } from "vant";
export default {
  // 引入组件、
  components: {
    // Button.name == van-button 取得是vant 组件库中的 button的name
    [Button.name]: Button
  },
  mounted(){
   let codes =  this.getUrlParam('codesss')
   console.log(codes)
  },
  methods: {
    getCode(){
      console.log(location.href)
      // location = `http://www.budaohuaxia.com/get-weixin-code.html?appid=wx2f84d2b3a9c47aef&redirect_uri=https%3A%2F%2Fjs.budaohuaxia.com%2F%23%2Fworkerhome&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
      let code = this.getUrlParam('code')
      //   //https://js.budaohuaxia.com/?code=033bYrad1SUCeA0kJKbd1S6Ead1bYra5&state=hello-world#/
      //https://js.budaohuaxia.com/?code=0238k1sB1WtPFb03ETrB1pTHrB18k1sS&state=123#/workerhome
      // console.log(code)
      this.$axios.get(`https://gx.budaohuaxia.com/api/Carownershow/Carxccode?code=0238k1sB1WtPFb03ETrB1pTHrB18k1sS`).then(res =>{
        console.log(res)
      })
    },
      //  获取代码
    getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      let url = window.location.href.split("#")[0];
      let search = url.split("?")[1];
      if (search) {
        var r = search.substr(0).match(reg);
        if (r !== null) return unescape(r[2]);
        return null;
      } else {
        return null;
      }
    },
  }
};
</script>
<style lang="scss">
.about {
  width: 100%;
  height: 100vh;
}
</style>
