<template>
  <div class="wallet">
    <div class="topnav">
      <div class="topBox">
        <span class="back" @click="gobackHome">
          <van-icon name="arrow-left" size="25px" />
        </span>
        <span class="title">
          余额
        </span>
      </div>
    </div>
    <!-- 钱包模块-->

    <div class="walletBox">
      <div class="top">
        <div class="Cashwithdrawal">
          <a
            class="iconBg"
            href="http://www.budaohuaxia.com/get-weixin-code.html?appid=wx6000ce335d4a6374&redirect_uri=https%3A%2F%2Fjs.budaohuaxia.com%2F%23%2Fcash&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
          >
            <van-icon name="gold-coin" color="#FF775C" size="30px" />
          </a>
          <span class="txMoney">提现</span>
          <!-- <span class="moneys">￥66.6</span> -->
        </div>
        <div class="bill">
          <span class="iconBg" @click="toBill">
            <van-icon name="balance-list" color="#FF9432" size="30px" />
          </span>
          <span class="txMoney">账单</span>
        </div>
      </div>
      <div class="moneyBox">
        <span>￥{{ money }}</span>
        <span></span>
      </div>
    </div>
  </div>
</template>
<script>
import { Icon } from "vant";
export default {
  data(){
   return{
    money:''

   }
  },
  mounted() {

    this.getwellatMsg(localStorage.getItem('token'))
  },
  methods: {
    toBill(){
      this.$router.push('/bill')
    },
    // 跳转
    gobackHome(){
      this.$router.push('/workerhome')
    },
    //跳转 提现页面
    //传 token 获取数据
    getwellatMsg(token){
       this.$axios.get(`https://gx.budaohuaxia.com/api/Bill/TechnicianMoney?token=${token}`).then(
         res =>{
            this.money = res.data.data.money
            localStorage.setItem('money',this.money)
         }
       )
    }
  },
  components: {
    [Icon.name]: Icon
  }
};
</script>
<style lang="scss" scoped>
.wallet {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  //   display: flex;
  //   justify-content: center;
  //  钱包盒子
  .walletBox {
    display: flex;
    flex-direction: column;
    margin: 30px auto;
    height: 150px;
    width: 95%;
    box-shadow: 0px 5px 15px rgba(227, 119, 49, 0.1);
    //钱包可提现余额
    .top {
      width: 100%;
      height: 90%;
      display: flex;
      margin-bottom: 6px;
      .Cashwithdrawal {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-direction: column;
        flex: 1;
        .iconBg {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 12px;
          padding-bottom: 15px;
          border-radius: 50%;
          background-color: #ffeeee;
        }
        //  余额样式
        .txMoney {
          margin-top: 5px;
          font-family: PingFang SC;
          font-size: 15px;
        }
      }
      //
      //
      .bill {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-direction: column;
        flex: 1;
        .iconBg {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 12px;
          border-radius: 50%;
          background-color: #fff4e9;
        }
        .txMoney {
          margin-top: 5px;
        }
      }
    }
    .moneyBox {
      display: flex;
      width: 100%;
      //余额 数字样式
      span {
        flex: 1;
        text-align: center;
        padding-bottom: 10px;
        font-size: 12px;
      }
    }
  }
}
.wallet .topnav {
  width: 100%;
  height: 40px;
  background-color: white;
}
.wallet .topnav .topBox {
  padding-top: 8px;
  padding-bottom: 8px;
  height: 100%;
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 5px rgba(227, 119, 49, 0.1);
}
.wallet .topnav .topBox .back {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 12px;
}
.wallet .topnav .topBox .title {
  font-size: 18px;
  font-weight: 600;
  transform: translateX(-10%);
  text-align: center;
  flex: 5;
}
</style>
