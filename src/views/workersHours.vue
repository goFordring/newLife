<template>
  <div id="item">
    <nav-bar title="选择工时项目" />
    <van-tree-select
      :height="boxHeight"
      :items="items"
      :main-active-index.sync="activeIndex"
    >
      <template slot="content">
        <div v-for="(item, index) in items" :key="index">
          <van-checkbox-group v-model="result" v-if="activeIndex === index">
            <van-card
              :desc="item.sharelist_desc"
              fit="contain"
              v-for="(item, index) in items[item.index].name"
              clickable
              :key="index"
              :thumb="item.sharelist_image"
              @click="toggle(index)"
            >
              <div slot="title" class="desc_title">
                {{ item.sharelist_name }}
              </div>
              <div slot="footer">
                <div class="itemPrice">￥{{ item.jishi_price }}.0</div>
                <van-checkbox
                  ref="checkboxes"
                  class="checkBtn"
                  :name="item"
                  checked-color="#E37731"
                ></van-checkbox>
              </div>
            </van-card>
          </van-checkbox-group>
        </div>
      </template>
    </van-tree-select>
    <div class="footer">
      <span class="left">
        <span v-if="btnShow" class="foot-text">请完善信息</span>
        <span v-else class="foot-text">
          合计:<span>{{ total }}.0元</span>
        </span>
      </span>
      <span class="right">
        <van-button
          color="#E37731"
          @click="submit"
          :disabled="btnShow"
          class="submit"
          >确认项目({{ result.length }})</van-button
        ></span
      >
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import {
  Image,
  Icon,
  Checkbox,
  CheckboxGroup,
  Button,
  Field,
  Toast,
  TreeSelect,
  Card,
  Cell
} from "vant";
import NavBar from "@/components/NavBar.vue";
import axios from "axios";
Vue.use(Image)
  .use(Icon)
  .use(TreeSelect)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Button)
  .use(Field)
  .use(Toast)
  .use(Card)
  .use(Cell);
export default {
  data() {
    return {
      boxHeight: window.screen.availHeight - 100,
      activeIndex: 0,
      list: ["a", "b", "c"],
      list2: ["a", "b", "c", "d", "e"],
      result: [],
      value: false,
      imageURL: "",
      items: [],
      allItem: [],
      allMoney: null,
      orderId: "",
      // token: "",
      allMdMoney: null
    };
  },
  created() {
    console.log(localStorage.getItem('token'))
    // this.checkedToken(localStorage.getItem('token'));
    this.getInfo();
  },
  mounted() {
    this.orderId = localStorage.getItem("orderId");
    this.token = localStorage.getItem("token");
    this.setHeight();
  },
  methods: {
    checkedToken() {
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
    toggle: function(index) {
      this.$refs.checkboxes[index].toggle();
    },
    clickToBack: function() {
      window.history.back(-1);
    },
    setHeight: function() {
      this.$data.boxHeight = window.screen.availHeight - 100;
    },
    submit: function() {
      // 缓存提交数据
      //  传入 技师ID 技师总价格  订单id 工时id 总价钱

      localStorage.setItem("items", JSON.stringify(this.$data.result));
      // this.$router.push("/orderdetail");
      let priceIds = [];
      this.result.map(item => {
        this.allMoney += parseInt(item.jishi_price);
        this.allMdMoney += parseInt(item.sharelist_price);
        priceIds.push(item.id);
      });
      let ids = priceIds.join(",");

      // 取出订单id
      axios
        .get(
          `https://gx.budaohuaxia.com/api/Technician/TechnicianConfirmationInterfaces?demand_id=${this.orderId}&token=${this.token}&two_sharelist_id=${ids}&two_z_money=${this.allMoney}&two_md_money=${this.allMdMoney}`
        )
        .then(res => {
          // this.$router.push("/workershours")
          this.clickToBack();
        })
        .catch(err => {});
    },
    // 提交信息

    getInfo() {
      let url = "https://gx.budaohuaxia.com/api/Sharelists/SharelistAll";
      axios.defaults.withCredentials = true;
      axios
        .get(url, {
          params: {
            id: 1
          }
        })
        .then(res => {
          let data = res.data.data;
          for (let i = 0; i < data.length; i++) {
            data[i].text = data[i].sharelist_name;
            for (let j = 0; j < data[i].name.length; j++) {
              data[i].name[j].sharelist_image =
                "http://gx.vipqd.com/" + data[i].name[j].sharelist_image;
              data[i].name[j].isfocus = false;
              data[i].index = i;
            }
            this.$data.items.push(data[i]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    btnShow() {
      if (this.$data.result.length < 1) {
        return true;
      } else {
        return false;
      }
    },
    total() {
      var sumPrice = 0;
      for (let i = 0; i < this.$data.result.length; i++) {
        sumPrice += this.$data.result[i].jishi_price - 0;
      }
      // this.allmoney = sumPrice
      return sumPrice;
    }
  },
  components: {
    NavBar
  }
};
</script>
<style lang="scss" scoped>
#item{
  .footer {
  display: flex;
  justify-content: space-between;
}
.van-sidebar-item--select{
  background-color: #f87678;
  border: none;
  font-weight: 600;
  color: white;
}
} 
</style>
