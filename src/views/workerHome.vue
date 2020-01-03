<template>
  <div class="workerHome">
    <header class="headerMsg">
      <span class="title">技师主页</span>
      <div class="workerMsg">
        <!--技师头像 -->
        <div class="imageBox">
          <van-image
            round
            width="5rem"
            height="5rem"
            :src="imageSrc"
            @click="modifyMsg"
          />
        </div>
        <div class="nicknameBox">
          <span class="nickName">{{ workerName }}</span>
          <span class="workerId">ID:{{ workerId }}</span>
        </div>
        <div class="moneyBox" @click="toWellat">
          <span class="logoImg"><img src="../assets/img/walletLogo.png"/></span>
          <span class="titleBox">钱包</span>
          <span>￥{{ money }}</span>
        </div>
      </div>
    </header>
    <!-- 订单状态盒子 -->
    <div class="middle">
      <div class="orderStatus">
        <!-- 上部-->
        <div class="orderNav">
          <span class="myOrderTitle" style="font-size:18px;font-weight:600;">
            我的订单
          </span>
          <span
            class="orderDetail"
            style="font-size:14px;color:#999999"
            @click="toChange"
          >
          </span>
        </div>
        <van-divider
          :style="{ borderColor: '#EEEEE8', padding: '0 16px', margin: '0' }"
        />
        <!-- 下部-->
        <div class="orderMenu">
          <span>
            <!-- <span class="red">{{}}</span> -->
            <van-icon
              name="balance-list"
              @click="toOrderTrack"
              data-name="4"
              size="30px"
              color="#E37731"
              :info="yjd"
            />
            已接单</span
          >
          <span>
            <van-icon
              name="underway"
              @click="toOrderTrack"
              data-name="2"
              color="#E37731"
              size="30px"
              :info="sgz"
            />
            施工中</span
          >
          <span>
            <van-icon
              name="friends"
              @click="toOrderTrack"
              data-name="5"
              color="#E37731"
              :info="dqr"
              size="30px"
            />
            待确认</span
          >
          <span>
            <van-icon
              name="checked"
              size="30px"
              color="#E37731"
              @click="toOrderTrack"
              data-name="3"
            />

            已完成</span
          >
        </div>
      </div>
      <!--  修改密码等模块-->
      <div class="accountList">
        <div class="listDiv" @click="modifyMsg">
          <span class="leftSpan">
            <img src="../assets/img/waitQ.png" alt="" />
            修改资料
          </span>
          <van-icon name="arrow" />
        </div>
        <van-divider
          :style="{ borderColor: '#EEEEE8', padding: '0 16px', margin: '0' }"
        />
        <div class="listDiv" @click="goforgetpsd">
          <span class="leftSpan">
            <img src="../assets/img/findPsd.png" alt="" />
            修改密码
          </span>
          <van-icon name="arrow" />
        </div>
        <van-divider
          :style="{ borderColor: '#EEEEE8', padding: '0 16px', margin: '0' }"
        />
        <div class="listDiv" @click="signOut">
          <span class="leftSpan">
            <img src="../assets/img/logout.png" alt="" />
            退出登录
          </span>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
    <!-- 底部导航-->
    <footer class="workerMenu">
      <div class="footer">
        <div class="demand" @click="godemandArr">
          <van-icon name="todo-list-o" size="20px" :info="zdd" />
          <span class="footerText">接单</span>
        </div>
        <!--测试震动-->
        <!-- <div class="demand">
           <a href="javascript:;" @click="BSL.Vibrator()">测试震动</a>
        </div> -->
        <div class="demand">
          <!-- <img src="../assets/img/star.png" alt="" class="footerImg"/> -->
          <van-icon name="contact" size="20px" />
          <span class="footerText">我的</span>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import { Image, Divider, Cell, CellGroup, Icon, Toast, Dialog } from "vant";
// import { setInterval } from "timers";
export default {
  name: "workerHome",
  data() {
    return {
      // 技师名字
      workerName: "",
      workerId: 666666,
      //余额
      money: "",
      imageSrc: "https://img.yzcdn.cn/vant/cat.jpeg",
      // 技师接单状态
      js_zt: null,
      audio: null,
      timers: null,
      //  已接单
      yjd: null,
      // 待确认
      dqr: null,
      //
      zdd: null,
      //施工中
      sgz: null,
      show: true
    };
  },
  created() {
    // 验证token
    // 调用函数 拉取数据
    this.audio = new Audio("/newmsg.mp3");
    this.audio.src = "/newmsg.mp3";

    //取token
    let token = localStorage.getItem("token");
    this.checkedToken(localStorage.getItem("token"));
    this.getWorkerMsg(localStorage.getItem("token"));
    this.$toast.setDefaultOptions({ duration: 1000 });
    // this.getNewOrder();
    // 开启循环
    // clearInterval(this.timeId)
    this.timers = window.setInterval(() => {
      this.getNewOrder();
    }, 8000);
    // this.setGet();
  },
  mounted() {
    //  监控当前页面变化
   
    if (localStorage.getItem("showHomeToast")) {
      this.$toast.loading({
        message: "验证中",
        forbidClick: true,
        loadingType: "spinner",
        duration: "2000",
        onClose() {
          localStorage.removeItem("showHomeToast");
        }
      });
    }
    if(localStorage.getItem('showJsConfirm') == '2'){
      return false   
    }else{
      this.judgeOrder();
    }
  
    // 测试方法
    //  window.methodName = this.methodName;
    // window.methodName = this.methodName
  },
  beforeDestroy() {
    window.clearInterval(this.timers);
    this.audio.pause();
  },
  methods: {
      
    // 监控当前页面 滑动 距离大于 1260  时请求数据
    // 进入首页判断当前 是否为接单状态
    judgeOrder() {
      //  取出标记
      if (localStorage.getItem("showDo") == "1") {
        // 此时未接单状态 进入 订单追踪列表
        Dialog.confirm({
          title: "您已接单哦",
          message: "您当前有订单正在进行中是否查看当前订单状态"
        })
          .then(() => {
            localStorage.setItem("showJsConfirm", '2');
            //  此时点击确认 转到订单追踪页面
            // 判断当前点击 是那个订单分类...
            if (this.yjd == 1) {
              this.$router.push({
                name: "orderprocess",
                params: {
                  name: "4"
                }
              });
            } else if (this.sgz == 1) {
              this.$router.push({
                name: "orderprocess",
                params: {
                  name: "2"
                }
              });
            } else if (this.dqr == 1) {
              this.$router.push({
                name: "orderprocess",
                params: {
                  name: "5"
                }
              });
            }
          })
          .catch(() => {
            localStorage.setItem("showJsConfirm", "2");

            // 此时点击取消
            show = flase;
          });
      }
    },
    toWellat() {
      this.$router.push("/wallet");
    },
    // 测试api
    // methodName() {
    //   BSL.Vibrator();
    // },
    // 地图测试
    toabout() {
      this.$router.push("/about");
    },
    // 验证函数
    checkedToken(token) {
      // 验证token  有效期
      this.$axios
        .get(
          `https://gx.budaohuaxia.com/api/Technician/CarToken?token=${token}`
        )
        .then(res => {
          // console.log(res.data.code)
          if (res.data.code == 1009) {
            //  此时token失效 重新登录
            //  缓存登录状态
            // 清除 isLogin
            localStorage.removeItem("isLogin");
            localStorage.setItem("lossToke", 1);
            this.$router.push("/");
          }
        });
    },
    getNewOrder() {
      this.$axios
        .get(`https://gx.budaohuaxia.com/api/Technician/CarTokens`)
        .then(res => {
          if (res.data.msg > 0) {
            // 播放音乐
            //  window.methodName()
            this.audio.play();
          } else {
            window.clearInterval(this.timers);
          }
        });
    },
    // 到 订单追踪s
    toOrderTrack() {
      this.$router.push({
        name: "orderprocess",
        params: {
          name: event.target.dataset.name
        }
      });
    },
    // 修改资料
    modifyMsg() {
      this.$router.push("/revise");
    },
    // toChangeMsg
    toChange() {
      this.$router.push({
        name: "orderdetail"
      });
    },
    //  转到 订单详情页面
    toOrder() {
      this.order;
    },
    // 退出 登录状态
    signOut() {
      let that = this;
      localStorage.removeItem("token");
      localStorage.removeItem("isLogin");
      localStorage.setItem('showJsConfirm','1')
      
      this.$toast.loading({
        message: "退出中",
        forbidClick: true,
        loadingType: "spinner",
        onClose() {
          that.$router.push("/");
        }
      });
    },
    // 转需求列表
    godemandArr() {
      let that = this;
      console.log('接单了')
      // 判断当前接单状态
      console.log(this.js_zt,this.dqr,this.sgz)
      if (this.js_zt != 0 || this.yjd != 0 || this.dqr != 0 ||this.sgz != 0) {
        this.$toast.loading({
          message: "一次只能接一单哦",
          forbidClick: true,
          loadingType: "spinner",
          onClose() {
            return false
          }
        });
      } else {
        this.$router.push("/demandarr");
      }
    },
    // 转到 修改密码
    goforgetpsd() {
      this.$router.push("/xiugaipsd");
    },
    // 拉取技师数据接口
    getWorkerMsg(token) {
      this.$axios
        .get(
          `https://gx.budaohuaxia.com/api/Technician/CarToken?token=${token}`
        )
        .then(res => {
          // console.log(res);
          //zt: 0
          // sgz: 0
          // yjd: 0
          // dqr: 0
          // zdd: 1
          // 总订单
          this.zdd = res.data.zdd;
          // 已接单
          this.yjd = res.data.yjd;
          //  待确认
          this.dqr = res.data.dqr;
          // 施工中
          this.sgz = res.data.sgz;

          this.money = res.data.data.data[0].money;
          this.imageSrc = `https://gx.budaohuaxia.com/${res.data.data.data[0].image}`;
          this.workerId = res.data.data.data[0].uid;
          this.workerName = res.data.data.data[0].name;
          console.log(res)
          this.js_zt = res.data.zt;
          //  初始化标签  控制 弹窗调用 
          if(this.js_zt != '0'){
            // 此时有订单 显示
           localStorage.setItem('showDo','1')
             
          }else{
            localStorage.setItem('showDo','2')
          }

        })
        .catch(err => {});
    }
  },
  // 加载组件
  components: {
    [Image.name]: Image,
    [Divider.name]: Divider,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Toast.name]: Toast
  }
};
</script>
<style lang="scss" scoped>
.workerHome {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  //   display: flex;
}

// 主页中部

.workerHome .middle {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
// 订单状态
.workerHome .middle .orderStatus {
  //   padding-top: 10px;
  margin-top: 15px;
  width: 95%;
  height: 105px;
  background-color: white;
  border-radius: 13px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.workerHome .middle .orderStatus .orderNav {
  padding-right: 15px;
  padding-left: 15px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
// 订单状态
.workerHome .middle .orderStatus .orderMenu {
  margin-top: 8px;
  flex: 2;
  display: flex;
}
.workerHome .middle .orderStatus .orderMenu .redClass {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 21px;
}
.workerHome .middle .orderStatus .orderMenu span {
  flex: 1;
  color: #707070;
  font-size: 15px;
  //   background-color: green;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.workerHome .middle .orderStatus .orderMenu span img {
  display: inline-block;
  width: 20px;
  height: 21px;
  margin-bottom: 4px;
}
// 账号菜单
.workerHome .middle .accountList {
  width: 95%;
  height: 165px;
  border-radius: 13px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  background-color: white;
  overflow: hidden;
}
.workerHome .middle .accountList .listDiv img {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-right: 15px;
}
.workerHome .middle .accountList .listDiv {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
}
.workerHome .middle .accountList .listDiv:active {
  background-color: #f8f8f8;
}
.workerHome .middle .accountList .listDiv .leftSpan {
  display: flex;
  align-items: center;
  color: #525252;
  font-size: 15px;
}
.workerHome .headerMsg {
  width: 100%;
  height: 175px;
  //   background-color: pink;
  background-image: url("../assets/img/newBG.png");
  background-repeat: no-repeat;

  //   background-position:50% 10%;
  background-size: 100%;
  // background:linear-gradient(230deg,rgba(238,238,238,1) 0%,rgba(216,216,216,0) 100%);
}
.workerHome .headerMsg .title {
  // margin-top: 25px;
  display: inline-block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: white;
  font-family: PingFang SC;
  font-size: 17px;
  font-weight: bold;
}
.workerHome .headerMsg .workerMsg {
  display: flex;
  width: 100%;
  height: 125px;

  //    background-color: green;
}
.workerHome .headerMsg .workerMsg .imageBox {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
.workerHome .headerMsg .workerMsg .nicknameBox {
  flex: 1;
  display: flex;
  //   align-items: center;
  justify-content: center;
  //   flex-wrap: wrap;
  flex-direction: column;
}
// 技师姓名
.workerHome .headerMsg .workerMsg .nicknameBox .nickName {
  color: white;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: bold;
}
// 技师ID
.workerHome .headerMsg .workerMsg .nicknameBox .workerId {
  display: inline-block;
  height: 15px;
  line-height: 15px;
  border-radius: 10px;
  text-align: center;
  width: 80px;
  color: white;
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: Regular;
  margin-top: 10px;
  // margin-left: 10px;
  // margin-right: 10px;
  background-color: #ec9c64;
}
// 余额
.workerHome .headerMsg .workerMsg .moneyBox {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  .titleBox {
    font-size: 12px;
    margin-bottom: 5px;
  }
}
.workerHome .headerMsg .workerMsg .moneyBox .logoImg {
  width: 24px;
  height: 18px;
  margin-bottom: 5px;

  img {
    width: 24px;
    height: 18px;
  }
}
.workerHome .headerMsg .workerMsg .moneyBox span {
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 500;
  color: white;
}

// 底部 菜单
.workerHome .workerMenu .footer {
  display: flex;
}
.workerHome .workerMenu {
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 50px;
  //   background-color: pink;
  //   align-self: flex-end;
}

.workerHome .workerMenu .demand {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.workerHome .workerMenu .demand:active {
  color: #e37731;
  background-color: #f8f8f8;
}

.workerHome .workerMenu .mine {
  color: #e37731;
}

//文字 and icon
.footerText {
  display: inline-block;
  font-size: 14px;
  color: #606060;
}
.footerText:active {
  color: #e37731;
}
</style>
