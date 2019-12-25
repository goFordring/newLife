<template>
  <div class="cash">
    <div class="topnav">
      <div class="topBox">
        <span class="back">
          <van-icon name="arrow-left" size="25px" />
        </span>
        <span class="title">
          余额
        </span>
      </div>
    </div>
    <div class="inputBox">
      <div class="inputPrice">
        <p class="inputTitle">提现金额</p>
        <p class="input">
          <span>￥</span
          ><van-field
            v-model="value"          
            type="number"
            @blur ="input"
            :error-message ='errMsg'
          />
        </p>
        <!--这是余额-->
        <p class="balance">可用余额{{money}}元</p>
      </div>
    </div>
    <div class="cashButton">
            
      <van-button type="primary" size="large" color="#E37731" :disabled ='disabled' @click='getOpenId'>提现</van-button>
    </div>
  </div>
</template>
<script>
import { Icon, Divider, Field, Button } from "vant";
export default {
  data() {
    return {
      value: null,
      money:null,
      errMsg:'',
      disabled:false
    };
  },
  mounted() {
    console.log(window.location.href);
    //
    this.money= localStorage.getItem('money')
    console.log(this.getUrlParam("code"));
  },
  methods: {
    getOpenId(){
      this.$axios.get(`https://gx.budaohuaxia.com/api/Bill/JsMoneyTx?token=${localStorage.getItem('token')}&money=${this.value}&code=${this.getUrlParam("code")}`).then(res =>{
         console.log(res)
      })
    },
    input(){
      console.log(this.value)
      //   console.log(event)
      if(parseInt(this.value) > this.money){
        // this.value = null
         this.errMsg = `您当前最多只能提现${this.money}`
         this.disabled = true;
      }else{
        this.disabled = false;
        this.errMsg = null
      }
      },
    //  发送请求

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
    }
  },
  components: {
    [Icon.name]: Icon,
    [Divider.name]: name,
    [Field.name]: Field,
    [Button.name]: Button
  }
};
</script>
<style lang="scss" scoped>
.cash {
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  background-color: #f6f6f6;
  //底部按钮
  .cashButton {
    margin-top: 150px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .inputBox {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    background-color: white;
    .inputPrice {
      width: 95%;
      border-bottom: 1px soild rgba(230, 230, 230, 1);
      .balance {
        font-size: 16px;
        color: #707070;
        font-family: PingFang SC;
      }
      .inputTitle {
        font-size: 16px;
        color: #707070;
        font-family: PingFang SC;
      }
      .input {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e6e6e6;
        margin: 15px 0;
        span {
          font-size: 32px;
        }
      }
    }
  }
}
// .topnav {
//   position: absolute;
//   width: 100%;
//   height: 40px;
//   background-color: white;
// }
.cash .topnav .topBox {
  padding-top: 8px;
  padding-bottom: 8px;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: white;
}
.cash .topnav .topBox .back {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 12px;
}
.cash .topnav .topBox .title {
  font-size: 18px;
  font-weight: 600;
  transform: translateX(-10%);
  text-align: center;
  flex: 5;
}
</style>
