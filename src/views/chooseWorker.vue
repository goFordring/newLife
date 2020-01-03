<template>
  <div class="index">
    <div class="topnav">
      <div class="topBox">
        <span class="back" @click="gobackHome">
          <van-icon name="arrow-left" size="25px" />
        </span>
        <span class="title">
          选择技师
        </span>
      </div>
    </div>
    <div class="topTitle">
      <p class="fristTitle">让小布更懂你</p>
      <p class="secondTitle">—<span>你的技能</span>—</p>
    </div>
    <div class="CarWash">
      <img src="../assets/img/CarWash.png" alt="" @click="chooseWash" />
      <p>{{ washStatus }}</p>
    </div>
    <div class="Repair">
      <img src="../assets/img/Repair.png" alt="" @click="chooseRepair" />
      <p>{{ repairStatus }}</p>
    </div>
    <div class="footer">
      <van-button
        color="#E37731"
        size="large"
        round
        :disabled="disabled"
        @click="submit"
        >下一步</van-button
      >
    </div>
  </div>
</template>
<script>
import { Button, Icon, Toast, Dialog } from "vant";
export default {
  data() {
    return {
      disabled: true,
      washStatus: "未选择",
      repairStatus: "未选择",
      dialogMsg:''
    };
  },
  methods: {
    gobackHome() {
      //返回  输入手机号码页面
      this.$router.push("/");
    },
    submit() {
      Dialog.confirm({
        title: "请您确认",
        message: `您确定选择“${this.dialogMsg}”吗？`
      })
        .then(() => {
          // on confirm
          this.$router.push("/setworkerinfo");
          localStorage.setItem("isLogin", true);
        })
        .catch(() => {
          // on cancel
        });
      //  判断 当前是否选择
    },
    // 选择事件
    chooseWash() {
      this.repairStatus = "未选择";
      this.washStatus = "洗车技师";
      this.dialogMsg = this.washStatus;
      localStorage.setItem("washWorker", "洗车技师");
      localStorage.removeItem("repair");
      this.disabled = false;
    },
    chooseRepair() {
      this.washStatus = "未选择";
      this.repairStatus = "维修技师";
      this.dialogMsg = this.repairStatus;
      localStorage.setItem("repair", "维修技师");
      localStorage.removeItem("washWorker");
      this.disabled = false;
    }
  },
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog
  }
};
</script>
<style lang="scss" scoped>
.index {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  //   background-color: pink;
  .topTitle {
    text-align: center;
    margin-top: 40px;
    .fristTitle {
      font-size: 22px;
      color: #333333;
      font-weight: 700;
    }
    .secondTitle {
      font-size: 16px;
      color: #666666;
      margin-bottom: 60px;
      span {
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
  .CarWash {
    margin-bottom: 40px;
    img {
      display: inline-block;
      width: 264px;
      height: 110px;
      &:active {
        box-shadow: 0px 5px 20px rgba(118, 118, 118, 0.15);
      }
    }
    p {
      font-size: 14px;
      color: #999999;
      text-align: center;
    }
  }
  .Repair {
    margin-bottom: 60px;
    img {
      display: inline-block;
      width: 264px;
      height: 110px;
    }
    p {
      font-size: 14px;
      color: #999999;
      text-align: center;
    }
  }
  .footer {
    width: 220px;
    height: 36px;
    .van-button {
      height: 36px;
      line-height: 36px;
    }
  }
}
.topnav {
  width: 100%;
  height: 40px;
  background-color: white;
}
.topnav .topBox {
  padding-top: 8px;
  padding-bottom: 8px;
  height: 100%;
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 5px rgba(227, 119, 49, 0.1);
}
.topnav .topBox .back {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 12px;
}
.topnav .topBox .title {
  font-size: 18px;
  font-weight: 600;
  transform: translateX(-10%);
  text-align: center;
  flex: 5;
}
</style>
