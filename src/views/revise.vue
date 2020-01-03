<template>
  <div class="setWorkerInfo">
    <NavBar title="修改资料">
      <van-icon name="../../img/back.png" slot="left" />
    </NavBar>
    <!-- <div class="topBar">
            <van-image class="logo" src='../../img/logo-user.png' width='61px' height='61px'></van-image>
        </div> -->
    <div class="updataImg">
      <span>
        <img
          :src="oldImg"
          alt=""
          style="display:inline-block;height:70px;width:70px;margin-bottom:5px;"
        />
        当前头像
      </span>
      <van-uploader
        v-model="fileList"
        accept="image/*"
        preview-image
        upload-text="请上传新头像"
        :max-count="1"
        :after-read="afterRead"
      ></van-uploader>
      <!-- 预览老图片-->
    </div>
    <div class="username inputbox">
      <van-field v-model="username" placeholder="请输入技师名称" />
    </div>
    <div class="password inputbox">
      <!-- <van-field type="text" v-model="password" placeholder="请输入验证码" /> -->
      <!-- <van-field v-model="verifyCode" center clearable placeholder="短信验证码"> -->
      <!-- <van-button slot="button" color="transparent" size="small" @click="getCode" :disabled="isSend" type="primary">{{time}}</van-button> -->
      <!-- </van-field> -->
      <van-cell
        title="请选择门店"
        @click="chooseStoreNow"
        :value="store"
        is-link
      />
    </div>
    <div class="password inputbox">
      <!-- <van-field v-model="psd" type="password" placeholder="请输入密码" /> -->
      <van-cell
        title="请选择技师层级"
        @click="chooseLevelNow"
        :value="level"
        is-link
      />
    </div>
    <div class="password inputbox">
      <!-- <van-field v-model="confirmPsd" type="password" placeholder="请再次输入密码" /> -->
      <van-cell
        title="请选择技师分类"
        @click="chooseClassNow"
        :value="jsclass"
        is-link
      />
    </div>
    <div class="loginbtn">
      <van-button class="bottom-btn" color="#E37731" @click="postInfo"
        >提交信息</van-button
      >
    </div>
    <van-popup
      v-model="showStore"
      position="bottom"
      show-toolbar
      safe-area-inset-bottom
      closeable
    >
      <van-picker :columns="storeName" @change="onChooseStore"></van-picker>
    </van-popup>
    <van-popup
      v-model="showLevel"
      position="bottom"
      show-toolbar
      safe-area-inset-bottom
      closeable
    >
      <van-picker :columns="levelList" @change="onChooseLevel"></van-picker>
    </van-popup>
    <van-popup
      v-model="showClass"
      position="bottom"
      show-toolbar
      safe-area-inset-bottom
      closeable
    >
      <van-picker :columns="jsclassList" @change="onChooseClass"></van-picker>
    </van-popup>
  </div>
</template> 
<script>
import NavBar from "../components/NavBar";
import { Button, Popup, Picker, Cell, Field, Uploader, Toast } from "vant";
export default {
  name: "setWorkerInfo",
  data() {
    return {
      // oldImage
      oldImg: "",
      fileList: [],
      username: "",
      store: "",
      level: "",
      jsclass: "",
      levelList: ["初级技师(三年)", "中级技师(五年)", "高级技师(十年)"],
      jsclassList: ["机修", "喷漆", "钣金", "改装", "美容装饰", "洗车技师"],
      storeList: [],
      showStore: false,
      showLevel: false,
      showClass: false,
      image: "",
      storeId: 0,
      levelId: 0,
      classId: 0,
      storeName: []
    };
  },
  created() {
    // console.log(location.href)
    // function appFinishiLoad() {
    //   console.log("ok");
    //   BSL.downRefresh("0", "0"); // 开启当前页面下拉刷新。
    //   console.log("ok");
    // }
    // appFinishiLoad();
    this.checkedToken(localStorage.getItem("token"));
    // 拉取全门店
    this.$toast.setDefaultOptions({ duration: 800 });
    this.postStoreInfo();
  },
  methods: {
    //      appFinishiLoad(){
    //        console.log('OK')
    //             BSL.downRefresh('0','0'); // 开启当前页面下拉刷新。
    //             console.log('end')
    //  },
    // appFinishiLoad() {
    //   BSL.downRefresh("0","0"); // 开启当前页面下拉刷新。
    // },
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
    clickToBack() {
      console.log("ok");
    },
    // 拉取门店全部信息
    postStoreInfo() {
      let token = localStorage.getItem("token");
      let params = {
        token
      };
      this.$axios
        .post(
          "https://gx.budaohuaxia.com/api/Technician/SharingDd",
          this.$qs.stringify(params)
        )
        .then(res => {
        
          this.image = localStorage.getItem("oldImage");
          this.storeId = res.data.Technician.sharingmd_id;
          this.levelId = res.data.Technician.grade;
          this.classId = res.data.Technician.cate;
          //  当前头像
          this.oldImg = `https://gx.budaohuaxia.com${res.data.Technician.image}`;

          // 遍历取出
          this.store = res.data.Sharingmd.name;
          res.data.data.map(item => {
            this.storeName.push(item.name);
            this.storeList.push(item);
          });
          this.username = res.data.Technician.technician_name;
          //  this.store =  res.data.Technician
          // level 技师默认值  store 门店默认 jsclass 技师默认
          // 判断技师层级
          if (res.data.Technician.grade === 1) {
            this.level = "初级技师(3年)";
          } else if (res.data.Technician.grade === 2) {
            this.level = "中级技师(5年)";
          } else if (res.data.Technician.grade === 3) {
            this.level = "高级技师(10年)";
          } else if (res.data.Technician.grade === 4) {
            this.level = "";
          }

          //  jsclassList: ["机修", "喷漆", "钣金", "改装", "美容装饰", "洗车技师"],
          //  判断分类
          if (res.data.Technician.cate === 1) {
            this.jsclass = "机修";
          } else if (res.data.Technician.cate === 2) {
            this.jsclass = "喷漆";
          } else if (res.data.Technician.cate === 3) {
            this.jsclass = "钣金";
          } else if (res.data.Technician.cate === 4) {
            this.jsclass = "改装";
          } else if (res.data.Technician.cate === 5) {
            this.jsclass = "美容装饰";
          } else if (res.data.Technician.cate === 6) {
            this.jsclass = "洗车技师";
          }
          //
          // console.log(res.data.Technician.sharingmd_id);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 选择门店相关
    chooseStoreNow: function() {
      this.$data.showStore = true;
    },
    onChooseStore: function(picker, values) {
      this.store = values;
      this.storeId = values;

      // 过滤数组 拿到Id
      let postStore = this.storeList.filter(item => {
        return item.name === values;
      });
      // 获取 stroeID
      this.storeId = postStore[0].id;

      setTimeout(() => {
        this.showStore = !this.showStore;
      }, 800);

      // 弹窗隐藏
    },
    // 选择技师等级
    chooseLevelNow: function() {
      this.$data.showLevel = true;
    },
    onChooseLevel: function(picker, values, index) {
      this.$data.level = values;
      this.$data.levelId = index + 1;
      // this.$toast(
      //   "this.$data.level",
      //   onClose(() => {
      //     // this.showLevel = !this.showLevel;
      //   })
      setTimeout(() => {
        this.showLevel = !this.showLevel;
      }, 800);
    },
    // 选择技师分类
    chooseClassNow: function() {
      this.$data.showClass = true;
    },
    onChooseClass: function(picker, values, index) {
      this.$data.jsclass = values;

      this.$data.classId = index + 1;
      if (
        localStorage.getItem("repair") ||
        localStorage.getItem("washWorker")
      ) {
        // 此时有 选择了
        if (localStorage.getItem("repair")) {
          this.jsclassList = ["机修", "喷漆", "钣金", "`改装", "美容装饰"];
          this.$data.showClass = true;
        } else if (localStorage.getItem("washWorker")) {
          this.jsclass = "洗车技师";
          this.showClass = false;
        }
      }

      // setTimeout(() => {
      // }, 800);
    },
    // 上传头像接口
    afterRead: function(file) {
      localStorage.setItem("oldImage", file.content);
      this.image = file.content;
      this.oldImg = "";
    },

    postInfo() {
      let that = this;

      // 获取 token
      let token = localStorage.getItem("token");
      // data参数、

      let data = {
        technician_name: this.username,
        sharingmd_id: this.storeId,
        grade: this.levelId,
        cate: this.classId,
        image: this.image,
        token: token
      };

      this.$axios
        .post(
          "https://gx.budaohuaxia.com/api/Technician/TechnicianUpdate",
          this.$qs.stringify(data)
        )
        .then(res => {
          // console.log()
          // 判断当前完善信息状态
          this.$toast.loading({
            message: "资料上传成功",
            forbidClick: true,
            loadingType: "spinner",
            onClose() {
              that.$router.push("/workerhome");
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {
    NavBar,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [Uploader.name]: Uploader,
    [Toast.name]: Toast
  }
};
</script>
<style lang="scss" scoped>
.ssq .van-cell__value span {
  font-size: 12px;
}

.confirm-btn {
  width: 70px;
  background-color: #57be69;
  color: #fff;
  padding: 3px 3px;
  border-radius: 4px;
  font-size: 13px;
}

.map-title {
  font-size: 0.4rem;
  height: 0.7rem;
  font-weight: bold;
}

#pickerBox {
  width: 100%;
}

#pickerInput {
  width: 100%;
  height: 100%;
  border: 1px solid #eee;
}

.map-nav {
  display: flex;
  direction: row;
}

.inputbox {
  border-bottom: 1px solid #f1bb98;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  /* line-height:22px; */
  color: rgba(56, 56, 56, 1);
  opacity: 1;
  margin-bottom: 10px;
}

.inputbox input {
  padding-left: 0px;
  border-bottom: 0px;
}

.inputbox span {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  /* line-height:22px; */
  color: rgba(56, 56, 56, 1);
  opacity: 1;
}

.van-uploader {
  position: relative;
  display: inline-block;
  margin: 20px;
  margin-bottom: 0px;
}
.van-cell--clickable {
  padding-left: 0px;
  padding-right: 0;
  padding-bottom: 5px;
}
.van-field {
  padding-left: 0px;
  padding-bottom: 5px;
}
.loginbtn {
  display: flex;
  justify-content: center;
  margin-top: 66px;
}
.loginbtn .bottom-btn {
  width: 90%;
}
.setWorkerInfo .updataImg {
  display: flex;
  align-items: center;
}
.setWorkerInfo .updataImg span {
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: 20px;
  font-size: 14px;
  color: #afafaf;
}
</style>
