<template>
  <div class="orderProcess">
    <NavBar title="订单追踪">
      <van-icon name="../../img/back.png" slot="left" />
    </NavBar>
    <van-tabs
      v-model="activeName"
      color="#E37731"
      title-active-color="#E37731"
      @click="getOrder"
    >   
      <van-tab title="全部订单" name="8" data-id="8">
        <div class="box">
          <div class="card" v-for="(item, index) in orderMsg" :key="index">
            <div class="topBox">
              <span><img src="../assets/img/shop.png" alt="" />{{  item.Sharingmd.name }}</span>
              <span class="orderStatus">{{ item.orderStatus }}</span>
            </div>
            <div class="bottomBox">
              <div class="bottomLeft">
                <div class="imgBox">
                  <span class="image"><img :src="item.imageSrc"/></span>
                  <div class="timeTitle">
                    <span>{{ item.timeTitle }}</span> 
                    <span>发布时间:{{item.orderTime}}</span>
                    <span>负责人:{{item.Sharingmd.fuzeren}}</span>
                  </div>
                </div>
              </div>
            </div>
              <div slot="footer" class="footbar">
                <div class="itemPrices">
                  <img
                    class="locationIcon"
                    src="../assets/img/location.png"
                    width="8.17px"
                    height="12.27px"
                    alt=""
                  />
                  <span>距离: {{ item.juli }}km</span>
                </div>
                <div class="price">
                  <span>合计:</span>
                  <span class="price1">￥{{ item.orderPrice }}</span>
                </div>
              </div>
             <div class="footerButton">
              <span v-if="true" @click="toDetail(item.id)">查看详情</span>
            </div>
          </div>
         
        </div>
      </van-tab>
      <van-tab title="已接单" name="4" data-id="4">
        <div class="box">
          <div class="card" v-for="(item, index) in orderMsg" :key="index">
            <div class="topBox">
              <span><img src="../assets/img/shop.png" alt="" />{{  item.Sharingmd.name }}</span>
              <span class="orderStatus">{{ item.orderStatus }}</span>
            </div>
            <div class="bottomBox">
              <div class="bottomLeft">
                <div class="imgBox">
                  <span class="image"><img :src="item.imageSrc"/></span>
                  <div class="timeTitle">
                    <span>{{ item.timeTitle }}</span> 
                    <span>发布时间:{{item.orderTime}}</span>
                    <span>负责人:{{item.Sharingmd.fuzeren}}</span>
                  </div>
                </div>
              </div>
            </div>
              <div slot="footer" class="footbar">
                <div class="itemPrices">
                  <img
                    class="locationIcon"
                    src="../assets/img/location.png"
                    width="8.17px"
                    height="12.27px"
                    alt=""
                  />
                  <span>距离: {{ item.juli }}km</span>
                </div>
                <div class="price">
                  <span>合计:</span>
                  <span class="price1">￥{{ item.orderPrice }}</span>
                </div>
              </div>
             <div class="footerButton">
              <span v-if="true" @click="toDetail(item.id)">查看详情</span>
            </div>
          </div>
         
        </div>
      </van-tab>
      <van-tab title="施工中" name="2" data-id="2">
        <div class="box">
          <div class="card" v-for="(item, index) in orderMsg" :key="index">
            <div class="topBox">
              <span><img src="../assets/img/shop.png" alt="" />{{  item.Sharingmd.name }}</span>
              <span class="orderStatus">{{ item.orderStatus }}</span>
            </div>
            <div class="bottomBox">
              <div class="bottomLeft">
                <div class="imgBox">
                  <span class="image"><img :src="item.imageSrc"/></span>
                  <div class="timeTitle">
                    <span>{{ item.timeTitle }}</span> 
                    <span>发布时间:{{item.orderTime}}</span>
                    <span>负责人:{{item.Sharingmd.fuzeren}}</span>
                  </div>
                </div>
              </div>
            </div>
              <div slot="footer" class="footbar">
                <div class="itemPrices">
                  <img
                    class="locationIcon"
                    src="../assets/img/location.png"
                    width="8.17px"
                    height="12.27px"
                    alt=""
                  />
                  <span>距离: {{ item.juli }}km</span>
                </div>
                <div class="price">
                  <span>合计:</span>
                  <span class="price1">￥{{ item.orderPrice }}</span>
                </div>
              </div>
             <div class="footerButton">
              <span v-if="true" @click="toDetail(item.id)">查看详情</span>
              <span v-if="item.status == 2" class="confirm" @click="confrimWork(item.id)">施工完成</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="待确认" name="5" data-id="5">
        <div class="box">
          <div class="card" v-for="(item, index) in orderMsg" :key="index">
            <div class="topBox">
              <span><img src="../assets/img/shop.png" alt="" />{{  item.Sharingmd.name }}</span>
              <span class="orderStatus">{{ item.orderStatus }}</span>
            </div>
            <div class="bottomBox">
              <div class="bottomLeft">
                <div class="imgBox">
                  <span class="image"><img :src="item.imageSrc"/></span>
                  <div class="timeTitle">
                    <span>{{ item.timeTitle }}</span> 
                    <span>发布时间:{{item.orderTime}}</span>
                    <span>负责人:{{item.Sharingmd.fuzeren}}</span>
                  </div>
                </div>
              </div>
            </div>
              <div slot="footer" class="footbar">
                <div class="itemPrices">
                  <img
                    class="locationIcon"
                    src="../assets/img/location.png"
                    width="8.17px"
                    height="12.27px"
                    alt=""
                  />
                  <span>距离: {{ item.juli }}km</span>
                </div>
                <div class="price">
                  <span>合计:</span>
                  <span class="price1">￥{{ item.orderPrice }}</span>
                </div>
              </div>
             <div class="footerButton">
              <span v-if="true" @click="toDetail(item.id)">查看详情</span>
              <span @click="addWorkerHours(item.id)" v-if="item.status == 5">二次工时</span>
              <span class="confirm" v-if="item.status == 5">门店确认中</span>
            </div>
          </div>
         
        </div>
      </van-tab>
      <van-tab title="已完成" name="3" data-id="3">
        <div class="box">
          <div class="card" v-for="(item, index) in orderMsg" :key="index">
            <div class="topBox">
              <span><img src="../assets/img/shop.png" alt="" />{{  item.Sharingmd.name }}</span>
              <span class="orderStatus">{{ item.orderStatus }}</span>
            </div>
            <div class="bottomBox">
              <div class="bottomLeft">
                <div class="imgBox">
                  <span class="image"><img :src="item.imageSrc"/></span>
                  <div class="timeTitle">
                    <span>{{ item.timeTitle }}</span> 
                    <span>发布时间:{{item.orderTime}}</span>
                    <span>负责人:{{item.Sharingmd.fuzeren}}</span>
                  </div>
                </div>
              </div>
            </div>
              <div slot="footer" class="footbar">
                <div class="itemPrices">
                  <img
                    class="locationIcon"
                    src="../assets/img/location.png"
                    width="8.17px"
                    height="12.27px"
                    alt=""
                  />
                  <span>距离: {{ item.juli }}km</span>
                </div>
                <div class="price">
                  <span>合计:</span>
                  <span class="price1">￥{{ item.orderPrice }}</span>
                </div>
              </div>
             <div class="footerButton">
              <span v-if="true" @click="toDetail(item.id)">查看详情</span>
              <span @click="addWorkerHours(item.id)" v-if="item.status == 5">二次工时</span>
              <span v-if="item.status == 2" class="confirm" @click ="confrimWork(item.id)">确认完成</span>
              <span class="confirm" @click="toChooseTime(item.id)" v-if="item.status == 5">待确认</span>
            </div>
          </div>
         
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import NavBar from "../components/NavBar";
import { Tab, Tabs, Icon, Cell, CellGroup, Divider } from "vant";
export default {
  name: "orderProcess",
  data() {
    return {
      // 控制此属性 改变进入的子标签
      activeName: "",
      token: null,
      // 图片路径
      orderMsg: []
    };
  },
  created() {
    this.checkedToken(localStorage.getItem("token"));
    this.activeName = this.$router.history.current.params.name;
    // 每一个按钮 存一个参数
    // 拉取 数据函数
    this.token = localStorage.getItem("token");
    this.getOrderStatus(this.activeName);
  },

  methods: {
    //  确认订单完成 直接完成不添加二次工时
      confrimWork(orderIds) {
      let token = localStorage.getItem("token");
      this.$axios
        .get(
          `https://gx.budaohuaxia.com/api/Technician/TechnicianConfirmationInterface?demand_id=${orderIds}&token=${token}`
        )
        .then(res => {
          // 调用弹窗
          window.location.reload();
        })
        .catch(err => {
          // console.log(err);
        });
    },
    // 二次工时
     addWorkerHours(id) {
      this.$router.push({
        name: "workershours",
        params: {
          orderId: id
        }
      });
    },
    toDetail: function(id) {
      let that = this;
      localStorage.setItem("orderId", id);
      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        loadingType: "spinner",
        onClose(){
          that.$router.push({
            name: "orderdetail"
          });
        }
      });
    },
    checkedToken(token) {
      // 验证token  有效期
      this.$axios
        .get(
          `https://gx.budaohuaxia.com/api/Technician/CarToken?token=${token}`
        )
        .then(res => {
          if (res.data.code === 1009) {
            //  此时token失效 重新登录
            //  缓存登录状态
            localStorage.setItem("lossToke", 1);
            this.$router.push("/");
          }
        });
    },
    // 跳转到 订单详情
    goOrderDetail(id) {
      localStorage.setItem("orderId", id);
      this.$router.push({
        name: "orderdetail"
      });
    },
    // 标题切换相应函数
    getOrder(name) {
      //  拉取数据
      this.getOrderStatus(name);
    },
    // 拉取数据函数 参数 id
    getOrderStatus(id = "8") {
      this.$axios
        .get(
          `https://gx.budaohuaxia.com/api/Technician/StoreStatus?token=${this.token}&status=${id}&lng=${localStorage.getItem('lnglat')}`
        )
        .then(res => {
          console.log(res);
          // console.log(this.orderMsg)
          this.orderMsg.splice(0, this.orderMsg.length);
          res.data.data.map(item => {
            // console.log(item)
            let orderSs = "";
            if (item.status == 0) {
              orderSs = "未审核";
            } else if (item.status == 1) {
              orderSs = "待接单";
            } else if (item.status == 2) {
              orderSs = "待完成";
            } else if (item.status == 3) {
              orderSs = "已完成";
            } else if (item.status == 4) {
              orderSs = "已接单";
            } else if (item.status == 5) {
              orderSs = "待确认";
            }
            console.log(item);
            // this.orderMsg = [];
            // 问题出现在这里`
            this.orderMsg.push({
              imageSrc: `https://gx.budaohuaxia.com${item.Car.brand_image}`,
              timeTitle: item.Car.brand_name,
              orderStatus: orderSs,
              orderPrice: item.js_money,
              orderTime: item.js_ddsj,
              orderId: item.id,
              Sharingmd: item.Sharingmd,
              car:item.Car,
              time:item.time,
              juli:item.juli,
              id:item.id,
              status:item.status
            });
   
            // console.log(this.orderMsg[0])
            // console.log(this.orderMsg.length)
          }
          );
          console.log(this.orderMsg)
        });
    }
  },
  components: {
    NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Divider.name]: Divider
  }
};
</script>
<style lang="scss" scoped>
.orderProcess {
  width: 100%;
  height: 100%;
  // background-color: whitesmoke;
  // display: flex;
  // justify-content: center;
  // flex-direction: column;
}
.box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: center;
  flex-wrap: wrap;
}
.box .card {
  width: 88%;
  height: 100%;
  // background-color: pink;
  border-radius: 15px;
  margin-top: 15px;
  box-shadow: 0 1px 5px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
    .footbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      margin-top: 15px;
      margin-bottom: 15px;
      .itemPrices {
        .locationIcon {
          margin-right: 10px;
        }
      }
      .price {
        .price1 {
          margin-left: 10px;
          color: #e37731;
          font-size: 13px;
        }
      }
    }
    .footerButton {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
        margin-bottom: 10px;
        padding-right: 10px;
        span {
          width: 68px;
          height: 24px;
          margin-left: 10px;
          text-align: center;
          line-height: 24px;
          font-size: 12px;
          border: 0.6px solid #666666;
          border-radius: 2px;
        }
        // 确认订单完成
        .confirm {
          background-color: #e37731;
          color: #ffffff;
          border: none;
        }
        // 接单
        .receipt {
        }
      }
}
.box .card .topBox {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding-right: 15px;
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 10px;
  padding-bottom: 10px;
  .leftTitle {
    font-size: 16px;
  }
  img {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }
}
.box .card .topBox .orderStatus {
  font-size: 18px;
  color: #e58446;
}
.box .card .bottomBox {
  flex: 2;
  // background-color: blue;
  display: flex;
  // flex-direction: row;
  flex-direction: column;
}
.box .card .bottomBox .bottomLeft {
  flex: 3;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.box .card .bottomBox .bottomLeft .orderTime {
  font-size: 14px;
}
.box .card .bottomBox .bottomLeft .imgBox {
  // flex: 3;
  display: flex;
}
// .box .card .bottomBox .bottomLeft .imgBox span {
//   flex: 1;
// }
.box .card .bottomBox .bottomLeft .imgBox .image img {
  display: inline-block;
  width: 80px;
  height: 80px;
  margin-right: 15px;
}
.box .card .bottomBox .bottomLeft .imgBox .timeTitle {
  display:flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 500;
  span{
    font-size: 12px;
    color: #666666;
    margin-bottom: 10px;
  }
}
.box .card .bottomBox .bottomLeft .orderTime {
  // flex: 1;
  margin-bottom: 10px;
}

.box .card .bottomBox .bottomRight {
  // flex: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
}
.box .card .bottomBox .bottomRight .orderDetail {
  width: 68px;
  height: 24px;
  margin-left: 10px;
  text-align: center;
  line-height: 24px;
  font-size: 12px;
  border: 0.6px solid #666666;
  border-radius: 2px;
}
.box .card .bottomBox .bottomRight .orderPrice {
  text-align: center;
  margin-top: 25px;
  font-size: 18px;
}
</style>
