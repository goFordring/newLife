<template>
  <div id="lists">
    <NavBar fixed title="需求列表" @click-left="clickToBack">
      <van-icon name="../assets/back.png" slot="left" />
    </NavBar>

    <!--顶部横条通知 
          请求数据
        -->
    <van-notice-bar
      @click="refreshList"
      v-if="hasNew"
      text="通知内容"
      left-icon="volume-o"
      background="#E37731"
      color="#fff"
      mode="closeable"
    ></van-notice-bar>

    <!--下拉刷新盒子-->
    <div class="nexttitle">
      <div class="leftTitle">
        订单筛选距离
        <van-icon name="arrow-down" class="downIcon" />
      </div>
      <div class="chooseJvli">
        <van-dropdown-menu class="chooseBtn">
          <!-- <van-dropdown-item v-model="value2" :options="option2" /> -->
          <van-dropdown-item
            v-model="value1"
            :options="option1"
            @change="chooseJl"
          />
        </van-dropdown-menu>
      </div>
    </div>
    <div class="content">
      <van-cell-group class="content-card">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <div
            class="cardForBox"
            v-for="(item, index) in resultData"
            :key="index"
          >
            <div class="boxTitle">
              <span><img src="../assets/img/shop.png"/>{{item.Sharingmd[0].name}}</span>
              <span class="orderStatus" v-if="item.status == 1">待接单</span>
              <span class="orderStatus" v-if="item.status == 2">施工完成</span>
              <span class="orderStatus" v-if="item.status == 5">门店确认中</span>
              <span class="orderStatus" v-if="item.status == 3">已完成</span>
            </div>
            <van-card :thumb="item.Car.brand_image" @click="toDetail(item.id)">
              <!-- item.Car.brand_name-->
              <div slot="title" class="desc_title">
                {{ item.Car.brand_name }}
              </div>
              <div slot="desc" class="carMsg">
                <span class="">发布时间: {{ item.time }}</span>
                <span class="">负责人: {{ item.Sharingmd[0].fuzeren }}</span>
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
                  <span class="price1">￥{{ item.js_money }}</span>
                </div>

                <!-- <div class="status">接单</div> -->
              </div>
            </van-card>
            <div class="footerButton">
              <span v-if="true" @click="toDetail(item.id)">查看详情</span>
              <span @click="addWorkerHours(item.id)" v-if="item.status == 5">二次工时</span>
              <span v-if="item.id == 2" class="confirm">确认完成</span>
              <span class="confirm" @click="toChooseTime(item.id)" v-if="item.status == 1">接单</span
              >
            </div>
          </div>
        </van-pull-refresh>
      </van-cell-group>
    </div>
    <!--底部双导航-->
    <!-- <footer class="workerMenu">
      <div class="footer">
        <div class="demand" @click="godemandArr">
          <van-icon name="todo-list-o" size="20px" :info="zdd" />
          <span class="footerText">接单</span>
        </div>
        <div class="demand">
         
          <van-icon name="contact" size="20px" />
          <span class="footerText">我的</span>
        </div>
      </div>
  </footer>  -->
  </div>
</template>
<script>
// 创建高德地图API
var map = new AMap.Map("container", {
  resizeEnable: true
});
import NavBar from "../components/NavBar";
import {
  Button,
  Image,
  Field,
  Icon,
  Card,
  Cell,
  CellGroup,
  Tab,
  Tabs,
  DropdownMenu,
  DropdownItem,
  PullRefresh,
  NoticeBar,
  Toast
} from "vant";
export default {
  data() {
    return {
      value2: "a",
      active: 0,
      activeName: "a",
      islimited: false,
      resultData: [],
      isLoading: false,
      value1: 1000,
      page: 1,
      number: 0,
      newNumbers: 0,
      hasNew: false,
      loading: false,
      finished: false,
      nowPage: 0,
      lng: "",
      zdd: null,
      flag: false,
      onMove: false,
      //订单筛选范围  数组
      option1: [
        { text: "1km", value: 1 },
        { text: "2km", value: 2 },
        { text: "3km", value: 3 },
        { text: "4km", value: 4 },
        { text: "5km", value: 5 },
        { text: "6km", value: 6 },
        { text: "7km", value: 7 },
        { text: "8km", value: 8 },
        { text: "9km", value: 9 },
        { text: "10km", value: 10 },
        { text: "1000km", value: 1000 }
      ],
      //  显示二次工时
      showWorkersHoues: false,
      // 这是距离显示标题
      options2: [{ text: "距离", value: "a" }]
    };
  },
  created() {
    window.addEventListener("scroll", this.scrollHandle, true);
  },
  mounted() {
    this.page = 1;
    this.getLocation();
    this.getList();
    // 验证token
    this.checkedToken(localStorage.getItem("token"));
    this.$toast.setDefaultOptions({ duration: 1000 });
  },
  components: {
    NavBar,
    [Button.name]: Button,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Card.name]: Card,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [PullRefresh.name]: PullRefresh,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [NoticeBar.name]: NoticeBar,
    [Toast.name]: Toast
  },
  // 离开页面
  beforeDestroy() {
    this.page = 1;
    window.removeEventListener("scroll", this.scrollhandle, false);
    this.$toast.clear();
    // console.log(this.page);
    this.onMove = true;
    this.getList = function() {};
    // console.log(this.getList());
  },
  methods: {
    // 接单选择订单时间
    toChooseTime(id) {
      console.log("点了");
      this.$router.push({
        name: "choosetime",
        params: {
          orderId: id
        }
      });
    },
    // 去二次工时
    addWorkerHours(id) {
      this.$router.push({
        name: "workershours",
        params: {
          orderId: id
        }
      });
    },
    scrollHandle() {
      let that = this;
      // 获取页面页面的滚动高度
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      // 获取页面滚动距离顶部的高度,  window.pageYOffse 兼容苹果
      let scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      // 获取页面的可视高度
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      // 我们可以在这里判断页面的滚动是否到了底部
      if (Math.ceil(scrollTop) + clientHeight === scrollHeight) {
        //
        if (this.flag) return;
        this.flag = true;
        this.page++; // 加载下一页
        // 根据noMore 看是否还有数据  默认为false
        if (!this.noMore) {
          // 滚动到底部执行数据加载
          this.getList();
        }
      }
      // return false
    },
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
    //  外包代码
    onLoad() {
      if (this.$data.nowPage != 0) {
        this.$data.page++;
      }
      //   this.$toast("加载中");
      this.getList();
    },
    // 后退
    clickToBack() {
      window.history.back(-1);
    },
    // 选择距离
    chooseJl(value) {
      //   this.$toast("为您加载" + value + "m内的");
      this.$toast.loading({
        message: `已加载${value}KM内的数据。`,
        forbidClick: true,
        loadingType: "spinner",
        onClose() {
          // that.$router.push("/password");
        }
      });
      this.value1 = value;
      this.resultData.length = 0;
      this.page = 1;
      this.getList();
    },

    // 去详情页val传入订单id
    toDetail: function(id) {
      let that = this;
      localStorage.setItem("orderId", id);
      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        loadingType: "spinner",
        onClose() {
          that.$router.push({
            name: "orderdetail"
          });
        }
      });
    },
    // 获取订单列表
    getList: function() {
      let that = this;
      console.log(this.lng)
      // alert(this.$data.lng)
      let url = "https://gx.budaohuaxia.com/api/Map/Demands";
      let params = {
        page: this.page, //数据页码
        jl: this.value1, // 距离
        lng: this.lng // 经纬度
      };
      console.log(this.value1);
      this.$axios
        .get(url, { params })
        .then(res => {
          // 判断当前 数据是否为空 是否继续请求
          // console.log(this.resultData)
          let newArr = [];
          res.data.data.map(item => {
            newArr.push(item);
          });
          this.$toast.loading({
            message: `订单加载中`,
            forbidClick: true,
            loadingType: "spinner",
            onClose() {
              //  初始化第三个数据
              newArr.map(item => {
                that.resultData.push(item);
              });
            }
          });

          // this.newArr.map(lis =>{
          //   this.resultData.push(lis)
          // })
          if (res.data.data.length === 0) {
            // console.log('此时数据为空停止请求')
            // 弹窗提示 没有更多订单了
            this.$toast.loading({
              message: `没有更多订单了`,
              forbidClick: true,
              loadingType: "spinner",
              onClose() {
                //  初始化第三个数据
              }
            });
            this.onMove = true;
          } else {
          }
          // this.resultData = res.data.data.filter((item, index) => {
          //   return item.juli < this.value1;
          // });

          for (let key in res.data.data) {
            res.data.data[key].Car.brand_image =
              "https://gx.budaohuaxia.com" + res.data.data[key].Car.brand_image;
          }
          this.flag = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 下拉刷新方法
    onRefresh() {
      let that = this;
      this.$data.page = 1;
      this.getList();
      // setTimeout(() => {
      this.$toast.loading({
        message: "刷新成功！",
        forbidClick: true,
        loadingType: "spinner",
        onClose() {
          // that.$router.push("/password");
          that.$data.isLoading = false;
        }
      });

      //   // this.count++;
      // }, 500);
    },
    // 刷新列表，这里我忘记有啥用了，你自己研究一下
    refreshList() {
      this.$data.page = 1;
      this.getList();
      // vant.Toast('刷新成功');
      this.$toast.loading({
        message: "刷新成功！",
        forbidClick: true,
        loadingType: "spinner",
        onClose() {
          that.$router.push("/password");
        }
      });
      this.$data.hasNew = false;
    },
    // 定位函数、
    getLocation() {
      let that = this;
      map.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: "RB"
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          let lngs = data.position.lng;
          let lats = data.position.lat;
          // 存入 缓存 这是起点
          localStorage.setItem("lnglat", [lngs, lats]);

          that.lng = lngs.toString() + "," + lats.toString();
          // 调用请求数据
          that.getList();
        }

        function onError(data) {
          // 定位出错
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#lists {
  width: 100%;
  height: 100vw;
}
#lists .nexttitle {
  display: flex;
  height: 45px;
  border-bottom: 1px soild;
  box-shadow: 0 0 3px 3px #f8f8f8;
}
#lists .nexttitle .leftTitle {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
#lists .nexttitle .chooseJvli {
  width: 50%;
  height: 100%;
}
// 添加底部 菜单
.workerMenu .footer {
  display: flex;
}
.workerHome .workerMenu {
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 50px;
  //   background-color: pink;
  //   align-self: flex-end;
}
.van-dropdown-menu{
  height: 0;
}
.workerMenu .demand {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.workerMenu .demand:active {
  color: #e37731;
  // background-color: #f8f8f8;
}

.workerMenu .mine {
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
.carMsg {
  display: flex;
  flex-direction: column;
  span {
    color: #676767;
    font-size: 12px;
    margin-top: 6px;
  }
}
.content {
  .content-card {
    .footbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      .itemPrices {
        .locationIcon {
          margin-right: 10px;
        }
      }
      .price {
        .price1 {
          margin-left: 10px;
        }
      }
    }
    .cardForBox {
      width: 95%;
      margin-bottom: 5px;
      margin-top: 5px;
      // background-color: white;
      box-shadow: 0 0 3px 3px #f8f8f8;
      border-radius: 5px;
      //  底部新按钮
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
      // 新卡片标题
      .boxTitle {
        // padding: 15px;
        padding-top: 15px;
        padding-right: 15px;
        padding-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        color: #333333;
        border-bottom:1px solid #EDEDED;
        margin-left: 10px;
        margin-right: 10px;
        // 右侧订单状态
        .orderStatus {
          font-size: 12px;
          color: #e37731;
        }
        img {
          display: inline-block;
          margin-left: 10px;
          margin-right: 10px;
          width: 16px;
          height: 16px;
        }
      }
    }
  }
}
</style>
