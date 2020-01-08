<template>
  <div class="bill">
    <div class="topnav">
      <div class="topBox">
        <span class="back" @click="back">
          <van-icon name="arrow-left" size="25px" />
        </span>
        <span class="title">
          账单
        </span>
      </div>
    </div>
    <div class="container">
      <div v-for="(item, index) in billArr" :key="index" class="billBoxs">
        <div class="billBox">
          <div class="leftTitle">
            <span class="title">{{ item.adress }}</span>
            <span class="datas">{{ item.time }}</span>
          </div>
          <div class="leftTitle">
            <!-- 关于 金额样式显示为黄色 样式绑定-->
            <span :class="{ title: true, add: showAdd }">
              {{ item.money }}
            </span>
            <span class="billClss">
              {{ item.status }}
            </span>
            <van-divider
              :style="{
                borderColor: '#EEEEE8',
                padding: '0 16px',
                margin: '0'
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Icon, Divider } from "vant";
export default {
  data() {
    return {
      billArr: [],
      // 账单种类
      adress: "",
      tKstatus: "",
      money: "",
      // 控制 金额颜色
      showAdd: false
    };
  },
  mounted() {
    //  获取 账单数据
    this.getBill(localStorage.getItem("token"));
  },
  methods: {
    back() {
      this.$router.push("/wallet");
    },
    // 获取函数
    getBill(token) {
      this.$axios
        .get(`https://gx.budaohuaxia.com/api/Bill/JsBill?token=${token}`)
        .then(res => {
          console.log(res.data.data);
          res.data.data.map(item => {
            //  过滤  数字转 文字状态
            // 技师账单只有两种状态 1 (提现) 、、 4()
            if (item.status == 1) {
              if (item.tx_status == 0) {
                this.adress = "提现";
                this.tKstatus = "提现成功";
                this.money = `-${item.money}`;
              }else{
                this.tKstatus = "提现审核中";
              }
            } else if (item.status == 4) {
              this.adress = "收入";
              this.tKstatus = "收入到账";
              this.money = `+${item.money}`;
              this.showAdd = !this.showAdd;
            }
            this.billArr.push({
              // 金额
              money: this.money,
              adress: this.adress,
              time: item.create_time,
              status: this.tKstatus
            });
          });
        });
    }
  },
  components: {
    [Icon.name]: Icon,
    [Divider.name]: Divider
  }
};
</script>
<style lang="scss" scoped>
.bill {
  width: 100%;
  
  background-color: #F8F8F8;
  .container {
    display: flex;
    // height: 100vh;
    flex-direction: column;
    align-items: center;
    .billBoxs {
      width: 95%;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      padding-bottom: 10px;
      padding-top: 10px;
      margin-bottom: 10px;
      background-color: white;
      .billBox {
        width: 95%;
        display: flex;
        justify-content: space-between;
        // border-bottom: 1px solid rgba(230, 230, 230, 1);

        .leftTitle {
          display: flex;
          flex-direction: column;
          .title {
            margin-bottom: 10px;
            font-family: PingFang SC;
            font-weight: bold;
          }
          .datas {
            color: #b8b8b8;
            font-size: 12px;
          }
          .billClss {
            text-align: right;
            font-size: 12px;
          }
          .add {
            color: #e37731;
          }
        }
      }
    }
  }
  // 这是下方小横线
  .van-divider::after, .van-divider::before{
    border: none;
  }
}
#navigator .topnav {
  position: absolute;
  width: 100%;
  height: 70px;
  background-color: white;
}
.bill .topnav .topBox {
  padding-top: 8px;
  padding-bottom: 8px;
  height: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  background-color: white;
}
.bill .topnav .topBox .back {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 12px;
}
.bill .topnav .topBox .title {
  font-size: 18px;
  font-weight: 600;
  transform: translateX(-10%);
  text-align: center;
  flex: 5;
}
</style>
