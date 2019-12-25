<template>
  <div id="confirm">
    <van-nav-bar title="接单">
      <van-icon name="arrow-left" slot="left" @click="clickToback" />
    </van-nav-bar>
    <h2>请选择到店时间</h2>
    <van-cell
      title="到店时间"
      @click="chooseTime"
      :value="arriveTime"
      is-link
    ></van-cell>
    <div class="btn-box">
      <van-button class="bottom-btn" @click="confirmOrder" :disabled="disabled" color="linear-gradient(to right, #E37731, #FF9100)">确认接单</van-button>
    </div>
    <van-popup
      v-model="showTime"
      position="bottom"
      show-toolbar
      safe-area-inset-bottom
    >
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="cancel"
        @confirm="confirmTime"
        :formatter="formatter"
      />
    </van-popup>
  </div>
</template>
<script>
import NavBar from "../components/NavBar";
import {
  Icon,
  Cell,
  CellGroup,
  Popup,
  DatetimePicker,
  Button,
  Toast
} from "vant";
export default {
  components: {
    NavBar,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Toast.name]: Toast
  },

  data() {
    return {
      arriveTime: "" || "未选择",
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2050, 10, 1),
      currentDate: new Date(),
      showTime: false,
      // 按钮禁用状态
      disabled: true
    };
  },
  created() {
    this.checkedToken(localStorage.getItem("token"));
    this.$toast.setDefaultOptions({ duration: 500 });
  },
  methods: {
    // 验证token
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
    clickToback: function() {
      window.history.back(-1);
    },
    chooseTime: function() {
      this.$data.showTime = true;
    },
    confirmTime: function(val) {
      const d = new Date(val);
      const resDate =
        d.getFullYear() +
        "-" +
        this.p(d.getMonth() + 1) +
        "-" +
        this.p(d.getDate());
      const resTime =
        this.p(d.getHours()) +
        ":" +
        this.p(d.getMinutes()) +
        ":" +
        this.p(d.getSeconds());
      this.$data.arriveTime = resDate + " " + resTime;
      this.$data.showTime = false;
      this.disabled = false;
    },
    cancel: function() {
      this.$data.showTime = false;
    },
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      } else if (type === "hour") {
        return `${value}时`;
      } else if (type === "minute") {
        return `${value}分`;
      }
      //   console.log(d)
      return value;
    },
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    confirmOrder: function() {
      let that = this;
      this.$axios
        .get(
          `https://gx.budaohuaxia.com/api/Technician/TechnicianOrder?demand_id=${
            this.$router.history.current.params.orderId
          }&token=${localStorage.getItem("token")}&js_ddsj=${this.arriveTime}`
        )
        .then(res => {
          if (res.data.code == 0) {
            // 技师接单成功 刷新页面
            //    localStorage.setItem('orderId',this.$router.history.current.params.orderId)

            this.$toast.loading({
              message: "接单成功",
              forbidClick: true,
              loadingType: "spinner",
              onClose() {
                that.$router.push("/orderdetail");
              }
            });
            // vant.Toast(res.data.msg);
          } else if (res.data.data == 1) {
            this.$toast.loading({
              message: "接单失败",
              forbidClick: true,
              loadingType: "spinner",
              onClose() {
                that.$router.push("/orderdetail");
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
          //   vant.Toast("网络错误");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
body,
html,
#confirm {
  height: 100%;
  width: 100%;
  position: relative;
}
.van-cell:not(:last-child)::after {
  border-bottom-color: transparent;
}
.van-cell {
  border-bottom: 1px solid #e37731;
  margin-left: 20px;
  margin-right: 20px;
  width: auto;
  padding: 8px 0px;
}
h2 {
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 28px;
  color: rgba(56, 56, 56, 1);
  opacity: 1;
  margin-left: 20px;
}
.van-cell__value span {
  font-size: 11px;
}
.bottom-btn {
  width: 100%;
  height: 36px;
  color: #fff;
  line-height: 36px;
  border-radius: 5px;
  background: #e37731;
  /* margin: 0px 20px; */
}
.btn-box {
  /* width: 100%; */
  width:66%;
  border-radius: 25px;
  display: block;
  margin: 0 20px;
  /* position: ; */
  margin-top: 50vh;
}
</style>
