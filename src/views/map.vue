<template>
  <div id="containers">
    <div class="nav">
      <div class="navBox">
        <span class="back"><van-icon name="arrow-left" size="25px" color="#E37731"/></span>   
        <span class="title">出行线路</span>
      </div>
    </div>
  </div>
</template>
<script>
import AMap from "AMap"; // 引入高德地图
import {Icon} from 'vant'
export default {
  name: "map",
  data() {
    return {
      // map: null
    };
  },
 components:{
    [Icon.name]:Icon
  },
  mounted() {
    // 创建地图实例
    this.mapInit();
    this.getLocation();
    // console.log(new AMap())sda
  },
  methods: {
    // getLocation
    getLocation() {
      AMap.plugin("AMap.Geolocation", function() {
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
          buttonPosition: "RB",
          showButton: true
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          console.log(data);
        }

        function onError(data) {
          // 定位出错
        }
      });
    },
    mapInit() {
      // 取缓存地理位置
      let lnglat = localStorage.getItem("lnglat").split(",");
      console.log(lnglat);
      // let map = new AMap().Map('containers')
      var map = new AMap.Map("containers", {
        resizeEnable: true,
        zoom: 15,
        // center: [Number(lnglat[0]), Number(lnglat[1])] //中心点坐标
        center: [116.379028, 39.865042]
      });
      let startS = [Number(lnglat[0]), Number(lnglat[1])];
      this.xiaolu(map);
    },
    xiaolu(map) {
      console.log("kaishi");
      AMap.plugin("AMap.Driving", function() {
        var driving = new AMap.Driving({
          // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
          policy: AMap.DrivingPolicy.LEAST_TIME,
          map: map
          // panel:'containers'
        });

        var startLngLat = [116.379028, 39.865042];
        var endLngLat = [116.427281, 39.903719];

        driving.search(startLngLat, endLngLat, function(status, result) {
          // 未出错时，result即是对应的路线规划方案、
          console.log("ok");
          console.log(result);
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#containers {
  width: 100%;
  height: 100%;
}
#containers .nav {
  position: absolute;
  width: 100%;
  height: 50px;
  background-color: white;
  z-index: 2;
}
#containers .nav .navBox{
 display: flex;
 width: 100%;
 height:100%;
 
}
#containers .nav .navBox .back{
 display: flex;
 flex:1;
 justify-content: center;
 align-items: center;
}
#containers .nav .navBox .title{
 flex:7;
 font-family: PingFang SC;
 font-weight: 500;
 font-size: 18px;
 text-align: center;
 line-height: 50px;
 margin-right: 20px;
 }
</style>
