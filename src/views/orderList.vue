<template>
  <div id="list">
    <NavBar title="需求列表" @click-left="clickToBack">
      <van-icon name="../../img/back.png" slot="left" />
    </NavBar>
    <van-tabs v-model="activeName">
      <van-tab title="全部" name="0">
        <div class="content">
          <van-cell-group class="content-card">
            <van-card
              :thumb="item.Car.brand_image"
              v-for="(item, index) in items"
              @click="toDetail(item.id)"
              :key="index"
            >
              <div slot="title" class="desc_title">
                {{ item.Car.brand_name }}
                <div class="itemPrice">
                  <span>详情</span>
                  <van-icon class="detailArrow" name="arrow" />
                </div>
              </div>
              <div slot="desc">
                <span class="descs">{{ item.problem }} </span>
              </div>
              <div slot="footer" class="footbar">
                <!-- <van-button size="mini">按钮</van-button> -->
                <!-- <div class="itemPrice">￥{{item.sharelist_price}}.0</div>
                                <van-checkbox ref="checkboxes" class="checkBtn" :name="item" checked-color="#E37731"></van-checkbox> -->
                <div class="price">
                  <span>工时费：</span>
                  <span class="price1">￥{{ item.z_money }}.0</span>
                </div>
                <div class="status">{{ item.text }}</div>
              </div>
            </van-card>
          </van-cell-group>
        </div>
      </van-tab>
      <van-tab title="未审核" name="1">
        <div class="content">
          <van-cell-group class="content-card">
            <van-card
              :thumb="item.Car.brand_image"
              v-for="(item, index) in items1"
              @click="toDetail(item.id)"
              :key="index"
            >
              <div slot="title" class="desc_title">
                {{ item.Car.brand_name }}
                <div class="itemPrice">
                  <span>详情</span>
                  <van-icon class="detailArrow" name="arrow" />
                </div>
              </div>
              <div slot="desc">
                <span class="descs">{{ item.problem }} </span>
              </div>
              <div slot="footer" class="footbar">
                <!-- <van-button size="mini">按钮</van-button> -->
                <!-- <div class="itemPrice">￥{{item.sharelist_price}}.0</div>
                                <van-checkbox ref="checkboxes" class="checkBtn" :name="item" checked-color="#E37731"></van-checkbox> -->
                <div class="price">
                  <span>工时费：</span>
                  <span class="price1">￥{{ item.z_money }}.0</span>
                </div>
                <div class="status">{{ item.text }}</div>
              </div>
            </van-card>
          </van-cell-group>
        </div>
      </van-tab>
      <van-tab title="待接单" name="2">
        <div class="content">
          <van-cell-group class="content-card">
            <van-card
              :thumb="item.Car.brand_image"
              v-for="(item, index) in items2"
              @click="toDetail(item.id)"
              :key="index"
            >
              <div slot="title" class="desc_title">
                {{ item.Car.brand_name }}
                <div class="itemPrice">
                  <span>详情</span>
                  <van-icon class="detailArrow" name="arrow" />
                </div>
              </div>
              <div slot="desc">
                <span class="descs">{{ item.problem }} </span>
              </div>
              <div slot="footer" class="footbar">
                <!-- <van-button size="mini">按钮</van-button> -->
                <!-- <div class="itemPrice">￥{{item.sharelist_price}}.0</div>
                                <van-checkbox ref="checkboxes" class="checkBtn" :name="item" checked-color="#E37731"></van-checkbox> -->
                <div class="price">
                  <span>工时费：</span>
                  <span class="price1">￥{{ item.z_money }}.0</span>
                </div>
                <div class="status">{{ item.text }}</div>
              </div>
            </van-card>
          </van-cell-group>
        </div>
      </van-tab>
      <van-tab title="待确认" name="3">
        <div class="content">
          <van-cell-group class="content-card">
            <van-card
              :thumb="item.Car.brand_image"
              v-for="(item, index) in items3"
              @click="toDetail(item.id)"
              :key="index"
            >
              <div slot="title" class="desc_title">
                {{ item.Car.brand_name }}
                <div class="itemPrice">
                  <span>详情</span>
                  <van-icon class="detailArrow" name="arrow" />
                </div>
              </div>
              <div slot="desc">
                <span class="descs">{{ item.problem }} </span>
              </div>
              <div slot="footer" class="footbar">
                <!-- <van-button size="mini">按钮</van-button> -->
                <!-- <div class="itemPrice">￥{{item.sharelist_price}}.0</div>
                                <van-checkbox ref="checkboxes" class="checkBtn" :name="item" checked-color="#E37731"></van-checkbox> -->
                <div class="price">
                  <span>工时费：</span>
                  <span class="price1">￥{{ item.z_money }}.0</span>
                </div>
                <div class="status">{{ item.text }}</div>
              </div>
            </van-card>
          </van-cell-group>
        </div>
      </van-tab>
      <van-tab title="已完成" name="4">
        <div class="content">
          <van-cell-group class="content-card">
            <van-card
              :thumb="item.Car.brand_image"
              v-for="(item, index) in items4"
              @click="toDetail(item.id)"
              :key="index"
            >
              <div slot="title" class="desc_title">
                {{ item.Car.brand_name }}
                <div class="itemPrice">
                  <span>详情</span>
                  <van-icon class="detailArrow" name="arrow" />
                </div>
              </div>
              <div slot="desc">
                <span class="descs">{{ item.problem }} </span>
              </div>
              <div slot="footer" class="footbar">
                <!-- <van-button size="mini">按钮</van-button> -->
                <!-- <div class="itemPrice">￥{{item.sharelist_price}}.0</div>
                                <van-checkbox ref="checkboxes" class="checkBtn" :name="item" checked-color="#E37731"></van-checkbox> -->
                <div class="price">
                  <span>工时费：</span>
                  <span class="price1">￥{{ item.z_money }}.0</span>
                </div>
                <div class="status">{{ item.text }}</div>
              </div>
            </van-card>
          </van-cell-group>
        </div>
      </van-tab>
      <van-tab title="已接单" name="5">
        <div class="content">
          <van-cell-group class="content-card">
            <van-card
              :thumb="item.Car.brand_image"
              v-for="(item, index) in items5"
              @click="toDetail(item.id)"
              :key="index"
            >
              <div slot="title" class="desc_title">
                {{ item.Car.brand_name }}
                <div class="itemPrice">
                  <span>详情</span>
                  <van-icon class="detailArrow" name="arrow" />
                </div>
              </div>
              <div slot="desc">
                <span class="descs">{{ item.problem }} </span>
              </div>
              <div slot="footer" class="footbar">
                <!-- <van-button size="mini">按钮</van-button> -->
                <!-- <div class="itemPrice">￥{{item.sharelist_price}}.0</div>
                                <van-checkbox ref="checkboxes" class="checkBtn" :name="item" checked-color="#E37731"></van-checkbox> -->
                <div class="price">
                  <span>工时费：</span>
                  <span class="price1">￥{{ item.z_money }}.0</span>
                </div>
                <div class="status">{{ item.text }}</div>
                <!-- <div class="status" @click.stop="jsDd(item.id)">确认技师到店施工</div> -->
              </div>
            </van-card>
          </van-cell-group>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import NavBar from "../components/NavBar";
import {
  Button,
  Image,
  Field,
  Icon,
  Card,
  Cell,
  CellGroup,
  Tabs,
  Tab
} from "vant";
export default {
  name: "list",
  data() {
    return {
      activeName: 0,
      items: [],
      items1: [],
      items2: [],
      items3: [],
      items4: [],
      items5: []
    }
  },
  mounted(){
    this.checkedToken(localStorage.getItem(localStorage.getItem('token')))
  },
  methods:{
     checkedToken(token){
      // 验证token  有效期
      this.$axios.get( `https://gx.budaohuaxia.com/api/Technician/CarToken?token=${token}`).then(res =>{
         if(res.data.code == 1009){
           //  此时token失效 重新登录 
           //  缓存登录状态 
            localStorage.removeItem('isLogin')

           localStorage.setItem('lossToke',1)
           this.$router.push('/')
            
           }
      })
    },
},
 components: {
    NavBar,
    [Button.name]: Button,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Card.name]: Card,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Tabs.name]: Tabs,
    [Tab.name]:Tab
  }
}
</script>
<style lang="scss" scoped>
#list {
  height: 100%;
  width: 100%;
}
.content {
  margin-top: 12px;
  margin-left: 20px;
  margin-right: 20px;
  background: rgba(248, 248, 248, 1);
}
.van-card__desc {
  display: block;
  margin-top: 4px;
  width: 100%;
  height: 30px;
  overflow: hidden;
  /* white-space: nowrap; */
  line-clamp: 3;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
}
.content-card {
  background: rgba(248, 248, 248, 1);
}
.van-card {
  height: 126px;
  opacity: 1;
  border-radius: 8px;
  background: #fff;
}
.desc_title {
  display: flex;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 22px;
  color: rgba(0, 0, 0, 1);
  opacity: 1;
}
.itemPrice {
  position: absolute;
  right: 0px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 17px;
  color: rgba(0, 0, 0, 1);
  opacity: 1;
}
.detailArrow {
  line-height: 17px;
}
.descs {
  display: inline-block;
  margin-top: 8px;
  font-size: 11px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 16px;
  color: rgba(175, 175, 175, 1);
  opacity: 1;
  word-break: normal;
  width: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
}
.footbar {
  display: flex;
}
.footbar .price {
  float: left;
}
.footbar .status {
  display: inline-block;
  position: absolute;
  right: 10px;
}
.van-tabs__line {
  background-color: transparent;
}
.van-tab--active {
  color: #e37731;
}
.status {
  background: #e37731;
  padding: 2px 5px;
  border-radius: 10px;
  color: #fff;
  margin-right: 8px;
  margin-top: -10px;
  /* margin-bottom:10px */
}
.price1 {
  font-size: 19px;
  font-family: PingFang SC;
  font-weight: 400;
  /* line-height:26px; */
  color: rgba(217, 38, 38, 1);
  opacity: 1;
}
.price {
  margin-top: -10px;
}
</style>
