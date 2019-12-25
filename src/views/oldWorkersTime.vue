<template>
  <div class="workerHours">
    <div class="selectList">
      <van-tree-select
        height="100%"
        :items="items"
        :main-active-index.sync="activeIndex"
        @click-nav="chooseIndex"
        class="selectBox"
      >
        <template slot="content">
          <div v-if="activeIndex === 0" class="workerTime">
            <div v-for="(item, index) in workersList" :key="index">
              <van-checkbox-group v-model="result">
                <div class="workerCard">
                  <span class="topspan">
                    <img
                      :src="item.images"
                      alt=""
                      style="display:inline-block;width:80px;height:80px;border-radius:8px;"
                    />
                    <span>{{ item.name }}</span>
                  </span>
                  <span class="bottomspan">
                    <span class="">{{ item.price }}</span>
                    <span style="margin-right:25px;">
                      <van-checkbox
                        checked-color="#e37731"
                        :name="item"
                        @click="checkBox01(item)"
                      ></van-checkbox>
                    </span>
                  </span>
                </div>
              </van-checkbox-group>
            </div>
          </div>
        </template>
      </van-tree-select>
    </div>
    <van-divider
      :style="{ borderColor: '#EEEEE8', padding: '0 16px', margin: '0' }"
    />
    <footer>
      <!-- 底部提交按钮-->
      <van-submit-bar button-text="提交订单" />
    </footer>
  </div>
</template>
<script>
import {
  TreeSelect,
  SubmitBar,
  RadioGroup,
  Radio,
  Cell,
  CellGroup,
  Checkbox,
  Divider,
  CheckboxGroup,
  Stepper
} from "vant";
// import { RadioGroup, Radio } from 'vant';
export default {
  data() {
    return {
      activeIndex: 0,
      items: [],
      jopTitle: "更换轮胎",
      prices: "￥" + "35.0",
      radio: "1",
      checked: false,
      itemId: [],
      // 工时详情
      workersList: [],
      result: []
    };
  },
  created() {
    this.getworkersId();
  },
  methods: {
    // 复选框回调函数
    checkBox01(item) {
      this.result.push(item);
    },
    getId() {},
    getworkersId() {
      this.$axios
        .get("https://gx.budaohuaxia.com/api/Sharelists/Sharelist?id=4")
        .then(res => {
          res.data.data.map(item => {
            this.items.push({
              id: item.id,
              text: item.sharelist_name
            });
          });
        });
    },
    // 拉取 工时大分类
    chooseIndex(index) {
      // this.activeIndex = index;
      //
      let newItem = this.items.filter(item => {
        return item.text === event.target.innerText;
      });
      let id = newItem[0].id;
      //发送请求请求
      this.$axios
        .get(`https://gx.budaohuaxia.com/api/Sharelists/SharelistSon/id/${id}`)
        .then(res => {
          this.workersList.splice(0, this.workersList.length);

          res.data.data.map((item, index) => {
            this.workersList.push({
              images: `https://gx.budaohuaxia.com${item.sharelist_image}`,
              name: item.sharelist_name,
              price: item.jishi_price
            });
            // this.result.push({
            //   name: index
            // });
          });
        });
    }
  },
  components: {
    [TreeSelect.name]: TreeSelect,
    [SubmitBar.name]: SubmitBar,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Checkbox.name]: Checkbox,
    [Divider.name]: Divider,
    [CheckboxGroup.name]: CheckboxGroup,
    [Stepper.name]: Stepper
  }
};
</script>
<style lang="scss" scoped>
// 跟 盒子
.workerHours {
  width: 100%;
  height: 100%;
  background-color: white;
}
.workerHours .selectList {
  height: 100%;
}
.workerHours .workerTime {
  //    padding-top:20px;
  width: 100%;
  // height: 100%;
  display: flex;
  align-items: center;
  //   justify-content: center;
  flex-wrap: no- wrap;
  flex-direction: column;
}
.workerHours .workerCard {
  width: 261px;
  height: 134px;
  padding-top: 15px;
  //   background-color: #f4f4f4;
  display: flex;
  //   justify-content: center;
  flex-direction: column;
  border-radius: 13px;
  margin-top: 20px;
  overflow: hidden;
  box-shadow: 0 1px 5px 4px rgba(0, 0, 0, 0.1);
}
// .workerHours .workerCard:active{
//   border: 1px solid #e37731;
//

.workerHours .workerCard .topspan {
  display: flex;
  justify-content: space-around;
  flex: 2;
}
.workerHours .workerCard .bottomspan {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: no-wrap;
  color: #e37731;
  margin-left: 15px;
  font-size: 18px;
  //   display: inline-block;
  width: 100%;
}
</style>
