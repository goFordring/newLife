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
              <span class="orderStatus">{{ item.orderStatus }}</span>
            </div>

            <div class="bottomBox">
              <div class="bottomLeft">
                <div class="imgBox">
                  <span class="image"><img :src="item.imageSrc"/></span>
                  <span class="timeTitle">{{ item.timeTitle }}</span>
                  <span></span>
                </div>
                <div class="orderTime">
                  {{ item.orderTime }}
                </div>
              </div>
              <div class="bottomRight">
                <span class="orderDetail" @click="goOrderDetail(item.orderId)"
                  >详情</span
                >
                <span class="orderPrice">￥{{ item.orderPrice }}</span>
              </div>
            </div>
          </div>
        </div></van-tab
      >
      <van-tab title="已接单" name="4" data-id="4">
        <div class="box">
          <div class="card" v-for="(item, index) in orderMsg" :key="index">
            <div class="topBox">
              <span class="orderStatus">{{ item.orderStatus }}</span>
            </div>

            <div class="bottomBox">
              <div class="bottomLeft">
                <div class="imgBox">
                  <span class="image"><img :src="item.imageSrc"/></span>
                  <span class="timeTitle">{{ item.timeTitle }}</span>
                  <span></span>
                </div>
                <div class="orderTime">
                  {{ item.orderTime }}
                </div>
              </div>
              <div class="bottomRight">
                <span class="orderDetail" @click="goOrderDetail(item.orderId)"
                  >详情</span
                >
                <span class="orderPrice">￥{{ item.orderPrice }}</span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="施工中" name="2" data-id="2">
        <div class="box">
          <div class="card" v-for="(item, index) in orderMsg" :key="index">
            <div class="topBox">
              <span class="orderStatus">{{ item.orderStatus }}</span>
            </div>

            <div class="bottomBox">
              <div class="bottomLeft">
                <div class="imgBox">
                  <span class="image"><img :src="item.imageSrc"/></span>
                  <span class="timeTitle">{{ item.timeTitle }}</span>
                  <span></span>
                </div>
                <div class="orderTime">
                  {{ item.orderTime }}
                </div>
              </div>
              <div class="bottomRight">
                <span class="orderDetail" @click="goOrderDetail(item.orderId)"
                  >详情</span
                >
                <span class="orderPrice">￥{{ item.orderPrice }}</span>
              </div>
            </div>
          </div>
        </div></van-tab
      >
      <van-tab title="待确认" name="5" data-id="5">
        <div class="box">
          <div class="card" v-for="(item, index) in orderMsg" :key="index">
            <div class="topBox">
              <span class="orderStatus">{{ item.orderStatus }}</span>
            </div>

            <div class="bottomBox">
              <div class="bottomLeft">
                <div class="imgBox">
                  <span class="image"><img :src="item.imageSrc"/></span>
                  <span class="timeTitle">{{ item.timeTitle }}</span>
                  <span></span>
                </div>
                <div class="orderTime">
                  {{ item.orderTime }}
                </div>
              </div>
              <div class="bottomRight">
                <span class="orderDetail" @click="goOrderDetail(item.orderId)"
                  >详情</span
                >
                <span class="orderPrice">￥{{ item.orderPrice }}</span>
              </div>
            </div>
          </div>
        </div></van-tab
      >
      <van-tab title="已完成" name="3" data-id="3">
        <div class="box" >
          <div class="card" v-for="(item, index) in orderMsg" :key="index">
            <div class="topBox">
              <span class="orderStatus">{{ item.orderStatus }}</span>
            </div>

            <div class="bottomBox">
              <div class="bottomLeft">
                <div class="imgBox">
                  <span class="image"><img :src="item.imageSrc"/></span>
                  <span class="timeTitle">{{ item.timeTitle }}</span>
                  <span></span>
                </div>
                <div class="orderTime">
                  {{ item.orderTime }}
                </div>
              </div>
              <div class="bottomRight">
                <span class="orderDetail" @click="goOrderDetail(item.orderId)"
                  >详情</span
                >
                <span class="orderPrice">￥{{ item.orderPrice }}</span>
              </div>
            </div>
          </div>
        </div></van-tab
      >
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
      orderMsg: [

      ]
    };
  },
  created() {
    this.checkedToken(localStorage.getItem('token'));
    console.log(this.$router.history.current.params.name)
    this.activeName = this.$router.history.current.params.name;
    // 每一个按钮 存一个参数
    // 拉取 数据函数
    this.token = localStorage.getItem("token");
    this.getOrderStatus(this.activeName);
  },

  methods: {
     checkedToken(token){
      // 验证token  有效期
      this.$axios.get( `https://gx.budaohuaxia.com/api/Technician/CarToken?token=${token}`).then(res =>{
         if(res.data.code === 1009){
           //  此时token失效 重新登录 
           //  缓存登录状态 
           localStorage.setItem('lossToke',1)
           this.$router.push('/')
            
           }
      })
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
    getOrderStatus(id ='8') {
      this.$axios
        .get(
          `https://gx.budaohuaxia.com/api/Technician/StoreStatus?token=${this.token}&status=${id}`
        )
        .then(res => {
          this.orderMsg.splice(0, this.orderMsg.length);
          res.data.data.map(item => {
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
            this.orderMsg = [];
            this.orderMsg.push({
              imageSrc: `https://gx.budaohuaxia.com${item.Car.brand_image}`,
              timeTitle: item.Car.brand_name,
              orderStatus: orderSs,
              orderPrice: item.js_money,
              orderTime: item.js_ddsj,
              orderId: item.id
            });
          });
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
  height:100%;
  // background-color: pink;
  border-radius: 15px;
  margin-top: 15px;
  box-shadow: 0 1px 5px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-left: 15px;
  padding-right: 15px;
}
.box .card .topBox {
  flex: 1;
  // background-color: pink;
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
  flex: 3;
  display: flex;
}
.box .card .bottomBox .bottomLeft .imgBox span {
  flex: 1;
}
.box .card .bottomBox .bottomLeft .imgBox .image img {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.box .card .bottomBox .bottomLeft .imgBox .timeTitle {
  font-size: 14px;
  font-weight: 500;
}
.box .card .bottomBox .bottomLeft .orderTime {
  flex: 1;
}

.box .card .bottomBox .bottomRight {
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
}
.box .card .bottomBox .bottomRight .orderDetail {
  background-color: #e58446;
  color: white;
  text-align: center;
  border-radius: 35px;
}
.box .card .bottomBox .bottomRight .orderPrice {
  margin-top: 25px;
  font-size: 18px;
}
</style>
