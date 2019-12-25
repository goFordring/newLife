<template>
  <!-- <div id="navigator">
    <div class="topnav">
      <div class="topBox">
        <span class="back">
          <van-icon name="arrow-left" size="35px" @click ="goBack"/>
        </span>
        <span class="title">
          导航
        </span>
      </div>
    </div>
    <iframe
      :src="'https://uri.amap.com/marker?position=' + lng"
      frameborder="0"
      height="100%"
      width="100%"
    ></iframe>
  </div> -->
  <div id="navigator">
    <NavBar
      title="导航"
      style="position:fixed;z-index:100000;width:100%;height:40px;"
    />
    <iframe
      :src="
        `//uri.amap.com/navigation?from=${stratPoints},startpoint&to=${lng},midwaypoint&mode=car&policy=1&src=mypage&coordinate=gaode&callnative=0`
      "
      frameborder="0"
      height="100%" 
      width="100%"
    ></iframe>
  </div>
</template>
<script>
import NavBar from "../components/NavBar";
import { Icon } from "vant";
export default {
  data() {
    return {
      lng: null,
      stratPoints:null
    };
  },
  components: {
    NavBar,
    [Icon.name]: Icon
  },
  mounted() {
    this.stratPoints = localStorage.getItem('lnglat')
    this.lng = this.$router.history.current.params.lng;
    console.log(this.lng);
  },
  methods: {
    goBack() {
      this.$router.push("/orderdetail");
    }
  }
};
</script>
<style scoped>
#navigator {
  width: 100%;
  height: 100%;
}
#navigator .topnav {
  position: absolute;
  width: 100%;
  height: 70px;
  background-color: white;
}
#navigator .topnav .topBox {
  height: 100%;
  display: flex;
  align-items: center;
}
#navigator .topnav .topBox .back {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
}
#navigator .topnav .topBox .title {
  font-size: 20px;
  transform: translateX(-10%);
  text-align: center;
  flex: 5;
}
</style>
