<template>
  <div id="pay">
    <Navbar title="订单详情" @click-left="clickToBack" class="topBar">
      <van-icon name="../assets/img/back.png" slot="left" />
    </Navbar>

    <div class="box">
      <!--在这里’遍历 -->
      <div class="workerTime">
        <van-collapse v-model="activeNameTime" class="noBorder">
          <van-collapse-item :title="workerTimeTitle">
            <!-- <p>工时项目:({{ workerItem }})</p> -->
            <div
              class="orderPreview"
              v-for="(item, index) in newworkerTime"
              :key="index"
            >
              <img
                :src="item.imageSrc"
                alt=""
                style="display:inline-block;width:64px;height:64px;flex:1;border-radius:13px;"
              />
              <span
                class="leimu"
                style="flex:4;padding-left:20px;font-weight:600"
              >
                {{ item.leimu }}
              </span>
              <span class="orderPrice">
                <span>￥{{ item.orderPrice }}</span>
              </span>
            </div>
          </van-collapse-item>
          <div class="orderMoney">
            <span>订单金额:</span>
            <span style="color:#E37731;margin-left:10px"
              >￥{{ workerMoney }}</span
            >
          </div>
        </van-collapse>
      </div>
      <!-- workerTime end-->
      <!-- 订单信息-->
      <div class="orderMsg">
        <van-collapse v-model="activeName">
          <van-collapse-item title="订单信息:" name="1">
            <p>
              <span>订单状态:</span
              ><span style="font-size:14px;">{{ orderStatus }}</span>
            </p>
            <van-divider
              :style="{
                borderColor: '#EEEEE8',
                padding: '0 16px',
                margin: '0'
              }"
            />
            <p>
              <span>订单编号:</span
              ><span style="font-size:14px;">{{ orderbianhao }}</span>
            </p>
            <van-divider
              :style="{
                borderColor: '#EEEEE8',
                padding: '0 16px',
                margin: '0'
              }"
            />
            <p>
              <span>付款时间:</span
              ><span style="font-size:14px;">{{ payTime }}</span>
            </p>
          </van-collapse-item>
          <van-collapse-item title="门店信息:" name="2">
            <p>
              <span>门店:</span
              ><span style="font-size:14px;" @click="toMap"
                ><van-icon
                  name="location"
                  color="#E37731"
                  size="12px"
                ></van-icon
                >{{ shop }}</span
              >
            </p>
            <van-divider
              :style="{
                borderColor: '#EEEEE8',
                padding: '0 16px',
                margin: '0'
              }"
            />
            <p>
              <span>电话:</span
              ><span style="font-size:14px;">{{ orderNumber }}</span>
            </p>
            <van-divider
              :style="{
                borderColor: '#EEEEE8',
                padding: '0 16px',
                margin: '0'
              }"
            />
            <p>
              <span style="display:inline-block;width:50px;height:100%;"
                >地点:</span
              ><span style="font-size:14px;">{{ address }}</span>
            </p>
            <van-divider
              :style="{
                borderColor: '#EEEEE8',
                padding: '0 16px',
                margin: '0'
              }"
            />
          </van-collapse-item>
          <van-collapse-item title="车辆信息:" name="3">
            <p>
              <span>车辆价格:</span
              ><span style="font-size:14px;">{{ carMsg.carPrice }}</span>
            </p>
            <van-divider
              :style="{
                borderColor: '#EEEEE8',
                padding: '0 16px',
                margin: '0'
              }"
            />
            <p>
              <span>车辆型号:</span
              ><span style="font-size:14px;">{{ carMsg.Model }}</span>
            </p>
            <van-divider
              :style="{
                borderColor: '#EEEEE8',
                padding: '0 16px',
                margin: '0'
              }"
            />
            <p>
              <span>车辆年限:</span
              ><span style="font-size:14px;">{{ carMsg.vehicleAge }}</span>
            </p>
            <van-divider
              :style="{
                borderColor: '#EEEEE8',
                padding: '0 16px',
                margin: '0'
              }"
            />
            <p>
              <span>档位:</span
              ><span style="font-size:14px;">{{ carMsg.gearPosition }}</span>
            </p>
            <van-divider
              :style="{
                borderColor: '#EEEEE8',
                padding: '0 16px',
                margin: '0'
              }"
            />
            <p>
              <span>车牌号:</span
              ><span style="font-size:14px;">{{ carMsg.carNumber }}</span>
            </p>
            <van-divider
              :style="{
                borderColor: '#EEEEE8',
                padding: '0 16px',
                margin: '0'
              }"
            />
          </van-collapse-item>
        </van-collapse>
      </div>

      <!-- 底部接单按钮-->
      <div class="addWorkerTime" v-if="showAddTime">
        <p style="padding-left:15px;font-weight:600;">二次工时详情:</p>
        <van-divider
          :style="{ borderColor: '#EEEEE8', padding: '0 16px', margin: '0' }"
        />
        <p class="title">
          <span>工时数据:({{ addOrderLength }})</span>
          <span class="times"></span>
        </p>
        <van-divider
          :style="{ borderColor: '#EEEEE8', padding: '0 16px', margin: '0' }"
        />
        <p class="timeText" v-for="(item, index) in addtimearr" :key="index">
          <img
            :src="item.imageSrc"
            alt=""
            style="display:inline-block;width:78px;height:78px;"
          />
          <span class="timeTitle">{{ item.timetitle }}</span>
          <span></span>
          <span></span>
          <span></span>
          <span class="timeMonehy">￥{{ item.timeMoney }}</span>
        </p>
        <van-divider
          :style="{ borderColor: '#EEEEE8', padding: '0 16px', margin: '0' }"
        />

        <div class="allMoney">
          <span></span
          ><span style="padding-left:120px;">合计:￥{{ allMoney }}</span>
        </div>
      </div>
      <footer class="bottomButton">
        <!-- 这是底部按钮 改为待确认圆圈加载动画-->
        <van-button
          v-if="showButton"
          color="linear-gradient(to right, #E37731, #FF9100)"
          :text="buttonText"
          class="footerButton"
          @click="buttonFunc"
          type="info"
        ></van-button>
        <van-button
          v-else
          color="linear-gradient(to right, #E37731, #FF9100)"
          text = '等待门店确认中'
          class="footerButton"
          type="info"
        ></van-button>
      </footer>
    </div>
  </div>
</template>
<script>
import Navbar from "../components/NavBar";
import {
  Button,
  Icon,
  Cell,
  CellGroup,
  Card,
  NoticeBar,
  Divider,
  Dialog,
  Collapse,
  CollapseItem,
  Toast
} from "vant";
export default {
  name: "orderDetail",
  data() {
    return {
      // 门店确认中 控制显示 button
      showButton:true,
      // 手风琴选中标记
      activeName: [],
      activeNameTime: [],
      // 工时title
      workerTimeTitle: "",
      // 工时项目
      workerItem: "1",
      imageSrc: "https://img.yzcdn.cn/vant/cat.jpeg",
      leimu: "更换机油滤芯",
      // 工时数量
      leimus: 1,
      orderPrice: "26.8",
      // 订单状态
      orderStatus: "未接单",
      //技师价额
      workerMoney: "26.6",
      // 订单编号
      orderbianhao: null,
      // 付款时间
      payTime: null,
      // 门店地址
      address: null,
      // 门店
      shop: null,
      // 门店电话
      orderNumber: 17364449036,
      // 车辆信息
      carMsg: {
        carPrice: "8-9",
        Model: "解放",
        vehicleAge:null,
        gearPosition: "自动挡",
        carNumber: "鲁B88888"
      },
      //  订单ID
      orderIds: null,
      buttonText: "立即接单",
      // 底部按钮状态
      disabled: false,
      // 控制是否添加工时
      showAddTime: false,
      // 添加工时数目
      addOrderLength: null,
      // addtime
      addtimearr: [],
      // 合计金额
      allMoney: null,
      newworkerTime: []
      // 再次添加工时按钮
    };
  },

  mounted() {
    this.$toast.clear();
    this.checkedToken(localStorage.getItem("token"));
    this.orderIds = localStorage.getItem("orderId");
    this.getOrderMsg();
  },
  methods: {
    checkedToken(token) {
      // 验证token  有效期
      this.$axios
        .get(
          `https://gx.budaohuaxia.com/api/Technician/CarToken?token=${token}`
        )
        .then(res => {
          if (res.data.code == 1009) {
            //  此时token失效 重新登录
            //  缓存登录状态
            localStorage.removeItem("isLogin");
            localStorage.setItem("lossToke", 1);
            this.$router.push("/");
          }
        });
    },
    // 转到 map
    toMap() {
      console.log(this.lng);
      this.$router.push({
        name: "navigation",
        params: {
          lng: this.lng
        }
      });
    },
    // 去选择工时
    goWorkerHours() {
      this.$router.push("/workershours");
    },
    // 删除 指定元素
    deleteItem(item, index) {
      this.addtimearr.splice(index, 1);
      //计算价格
      //  this.allMoney =  this.allMoney - parseInt(time[index].timeMoney)
      this.allMoney -= item.timeMoney;
      if (this.allMoney === 0) {
        //  清除缓存
        // 清空数组
        this.addtimearr.splice(0, this.addtimearr.length);
      }
    },
    // button  点击总函数
    buttonFunc() {
      let that = this;
      //判断 返回首页 router 门店确认中 不可以点 返回首页
      if (this.buttonText == "立即接单") {
        this.goChooseTime();
      } else if (this.buttonText == "返回首页") {
        this.$router.push("/workerhome");
      } else if (this.buttonText == "确认施工完成") {
        // 添加弹窗 是否添加工时
        Dialog.confirm({
          title: "是否添加工时？",
          message: "如需添加请点击“确认”"
        })
          .then(() => {
            // 显示 添加工时入口  转页面去 添加工时页面
            // this.showAddTime = !this.showAddTime;
            // 直接跳转至 添加工时列表
            // 显示 小按钮添加工时小按钮
            this.$router.push("/workershours");
          })
          .catch(() => {
            //  不做任何操作
            this.confrimWork();
          });

        // 控制弹窗
      } else if (this.buttonText == "门店确认中") {
      }
    },
    // 确认施工  接口
    confrimWork() {
      let token = localStorage.getItem("token");
      this.$axios
        .get(
          `https://gx.budaohuaxia.com/api/Technician/TechnicianConfirmationInterface?demand_id=${this.orderIds}&token=${token}`
        )
        .then(res => {
          // 调用弹窗
          window.location.reload();
        })
        .catch(err => {
          // console.log(err);
        });
    },
    // 转去 首页选择时间
    goChooseTime() {
      this.$router.push({
        name: "choosetime",
        params: {
          orderId: this.orderIds
        }
      });
    },
    clickToBack() {
      //orderprocess
      this.$router.push({
        name: "orderprocess",
        params: {
          name: 8
        }
      });
    },
    //  获取订单详细信息页面
    getOrderMsg() {
      // 取出token
      let token = localStorage.getItem("token");
      this.$axios
        .get(
          `https://gx.budaohuaxia.com/api/Technician/DemandShow?token=${token}&demand_id=${this.orderIds}`
        )
        .then(res => {
          this.lng = res.data.data.Sharingmd.lng;
          if (res.data.data.two_status > 0) {
            this.showAddTime = !this.showAddTime;
            // 取出数据
            res.data.data.twoSharelist.map(item => {
              this.addtimearr.push({
                imageSrc: `https://gx.budaohuaxia.com${item.sharelist_image}`,
                timetitle: item.sharelist_name,
                timeMoney: item.jishi_price
              });
              this.allMoney += parseInt(item.jishi_price);
            });
            this.addOrderLength = this.addtimearr.length;
          }
          // 订单类目
          // this.imageSrc = `https://gx.budaohuaxia.com${res.data.data.Sharelist[0].sharelist_image}`;
          // this.leimu = res.data.data.Sharelist[0].sharelist_name;
          // this.orderPrice = res.data.data.Sharelist[0].sharelist_price;
          this.workerMoney = res.data.data.js_money;
          this.workerItem = res.data.data.Sharelist.length;
          this.workerTimeTitle = `工时项目(${res.data.data.Sharelist.length})`;
          res.data.data.Sharelist.map(item => {
            this.newworkerTime.push({
              imageSrc: `https://gx.budaohuaxia.com${item.sharelist_image}`,
              leimu: item.sharelist_name,
              orderPrice: item.jishi_price
            });
          });

          // 车牌号
          this.carMsg.carNumber = res.data.data.cph;
          this.payTime = res.data.data.time;
          this.orderbianhao = res.data.data.unumer;
          // 门店
          this.shop = res.data.data.Sharingmd.name;
          this.orderNumber = res.data.data.Sharingmd.iphone;
          this.address = res.data.data.Sharingmd.address;
          // 车辆信息
          this.carMsg.carPrice = res.data.data.Car.brand_price;
          this.carMsg.vehicleAge  = res.data.data.cnx;
          this.carMsg.Model = res.data.data.Car.brand_name;
          //   判断当前订单状态
          if (res.data.data.status == 0) {
            this.orderStatus = "未审核";
          } else if (res.data.data.status == 1) {
            this.buttonText = "立即接单";
            this.orderStatus = "待接单";
          } else if (res.data.data.status == 2) {
            this.buttonText = "确认施工完成";
            this.orderStatus = "待完成";
          } else if (res.data.data.status == 3) {
            this.buttonText = "返回首页";
            this.orderStatus = "已完成";
          } else if (res.data.data.status == 4) {
            this.buttonText = "返回首页";
            this.orderStatus = "已接单";
          } else if (res.data.data.status == 5) {
            this.buttonText = "等待门店确认";
            this.showButton = !this.showButton;
            this.orderStatus = "技师完成";
          }
        });
    }
  },
  components: {
    Navbar,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Card.name]: Card,
    [NoticeBar.name]: NoticeBar,
    [Divider.name]: Divider,
    [Dialog.name]: Dialog,
    [CollapseItem.name]: CollapseItem,
    [Collapse.name]: Collapse,
    [Toast.name]: Toast
  }
};
</script>
<style lang="scss" scoped>
#pay {
  width: 100%;
  height: 100%;
  background-image: url("../assets/img/xinbeijing.png");
  // background-position:200%;
  background-size: contain;
  background-repeat: no-repeat;
}
#pay .box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#pay .workerTime {
  width: 90%;
  padding: 10px;
  background-color: white;
  border-radius: 13px;
  margin-top: 30px;
  box-shadow: 0 1px 5px 3px rgba(0, 0, 0, 0.2);
  
}
#pay .workerTime .van-hairline--top-bottom::after, 
.van-hairline-unset--top-bottom::after {
    border:none;
}
#pay .workerTime p {
  color: black;
  font-size: 15px;
  font-weight: 700;
}
#pay .box .workerTime .orderPreview {
  display: flex;
  margin-bottom: 10px;
  .imagsChange {
    border-radius: 50%;
  }
}
#pay .box .workerTime .orderMoney {
  display: flex;
  justify-content: flex-end;
  padding-right: 16px;
}
// 订单状态信息盒子
#pay .orderMsg {
  width: 95%;
  box-shadow: 0 1px 5px 4px rgba(0, 0, 0, 0.1);

  // color: white;
  background-color: white;
  margin-top: 20px;
  border-radius: 15px;
  overflow: hidden;
}
#pay .orderMsg p {
  display: flex;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
}
#pay .box .bottomButton {
  margin-top: 30px;
  background-color: pink;
  width: 66%;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 30px;
  border-radius: 25px;
  box-shadow: 0 1px 5px 4px rgba(0, 0, 0, 0.1);
}
#pay .box .bottomButton .footerButton {
  width: 100%;
}
#pay .box .addWorkerTime {
  box-shadow: 0 1px 5px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  width: 95%;
  border-radius: 13px;
  margin-top: 20px;
  flex-direction: column;
  background-color: white;
}
#pay .box .addWorkerTime span {
  flex: 1;
  display: flex;
}
#pay .box .addWorkerTime .allMoney {
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #e37731;
  padding: 0;
  display: flex;
  justify-content: space-between;
}
#pay .box .addWorkerTime p {
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
}
#pay .box .addWorkerTime .title {
  display: flex;
  justify-content: space-between;
}
#pay .box .addWorkerTime .title .times {
  text-align: right;
}
// 新添两侧
#pay .box .addWorkerTime .title .timeText {
  display: flex;
}
#pay .box .addWorkerTime .title .timeText span {
  flex: 1;
  background-color: pink;
}
#pay .box .addAngin {
  color: #e37731;
  font-size: 14px;
  background-color: white;
  margin-top: 15px;
  box-shadow: 0 1px 5px 4px rgba(0, 0, 0, 0.1);
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 13px;
}
</style>
