<template>
  <div class="detail">
    <div class="topnav">
      <div class="topBox">
        <span class="back">
          <van-icon name="arrow-left" size="25px" />
        </span>
        <span class="title">
          提现详情
        </span>
      </div>
    </div>
    <div class="container">
      <div class="Icon">
        <span><van-icon name="balance-list" size="60" color="#FF9432"/></span>
        <!-- <span>提现成功！</span> -->
        <span class="cashTitle">提现成功</span>
      </div>
      <div class="lists">
        <van-cell-group>
          <van-cell title="提现时间" value="内容" />
          <van-cell title="到账时间" value="内容" />
          <van-cell title="到账微信号" value="内容" />
          <van-cell title="到账时间" value="内容" />
        </van-cell-group>
      </div>
      <div class="buttonBox">
       <span> <van-button round plain type="info" color ="#FF9432" class="button">完成</van-button></span>
      </div>
    </div>
  </div>
</template>
<script>
import { Icon, Divider, Field, Button , Cell, CellGroup} from "vant";
export default {
  data() {
    return {
      value: null
    };
  },
  mounted() {
    console.log(window.location.href)
  },
  components: {
    [Icon.name]: Icon,
    [Divider.name]: name,
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]:Cell,
    [CellGroup.name]:CellGroup
  }
};
</script>
<style lang="scss" scoped>
.detail {
  width: 100vw;
  height: 100vh;
  .container {
    margin-top: 80px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .buttonBox{
      width: 100%;
      display: flex;
      justify-content:center;
      margin-top:15%;
        .button{
          width: 150px;
        }
    }
    .lists {
      // border-bottom: 1px soild #e8e8e8;
      // display: flex;
      // justify-content: center;
      margin-top: 50px;
      p {
        display: flex;
        width: 90%;
        justify-content: space-between;
        border-bottom: 1px soild rgba(232, 232, 232, 1);
      }
    }
    .Icon {
      display: flex;
      justify-content: center;
      flex-direction: column;
      span {
        display: flex;
        justify-content: center;
      }
      .cashTitle {
        font-family: PingFang SC;
        font-weight: bold;
        color: #1f1f1f;
        font-size: 19px;
      }
    }
  }
}

.detail .topnav .topBox {
  padding-top: 8px;
  padding-bottom: 8px;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: white;
}
.detail .topnav .topBox .back {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 12px;
}
.detail .topnav .topBox .title {
  font-size: 18px;
  font-weight: 600;
  transform: translateX(-10%);
  text-align: center;
  flex: 5;
}
</style>
