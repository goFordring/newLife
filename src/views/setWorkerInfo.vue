<template>
  <div class="setWorkerInfo">
    <NavBar title="完善信息">
      <van-icon name="../../img/back.png" slot="left" />
    </NavBar>
    <van-uploader
      v-model="fileList"
      accept="image/*"
      preview-image
      upload-text="请上传头像"
      :max-count="1"
      :after-read="afterRead"
    ></van-uploader>
    <div class="username inputbox">
      <van-field v-model="username" placeholder="请输入技师名称" />
    </div>
    <div class="password inputbox">
      <van-cell
        title="请选择门店"
        @click="chooseStoreNow"
        :value="store"
        is-link
      />
    </div>
    <div class="password inputbox">
      <van-cell
        title="请选择技师层级"
        @click="chooseLevelNow"
        :value="level"
        is-link
      />
    </div>
    <div class="password inputbox">
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
      fileList: [],
      username: "",
      store: "",
      level: "",
      jsclass: "",
      levelList: ["初级技师(三年)", "中级技师(五年)", "高级技师(十年)"],
      jsclassList: ["机修", "喷漆", "钣金", "`改装", "美容装饰", "洗车技师"],
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
    // this.checkedToken(localStorage.getItem("token"));
    // 拉取全门店
    this.$toast.setDefaultOptions({ duration: 800 });
    this.postStoreInfo();
  },
  methods: {
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
    clickToBack() {},
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
          console.log(res);
          // 遍历取出
          res.data.data.map(item => {
            this.storeName.push(item.name);
            this.storeList.push(item);
          });
          this.username = res.data.Technician.Technician_name;
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
      this.$toast(this.store);

      // 过滤数组 拿到Id
      let postStore = this.storeList.filter(item => {
        return item.name === values;
      });
      // 获取 stroeID
      this.storeId = postStore[0].id;

      // 弹窗隐藏
      this.showStore = !this.showStore;
    },
    // 选择技师等级
    chooseLevelNow: function() {
      this.$data.showLevel = true;
    },
    onChooseLevel: function(picker, values, index) {
      this.$data.level = values;
      this.$data.levelId = index + 1;
      this.$toast(this.$data.level);

      this.showLevel = !this.showLevel;
    },
    // 选择技师分类
    chooseClassNow: function() {
      //  判断此时 缓存是否有数据
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
      // this.$data.showClass = true;
    },
    onChooseClass: function(picker, values, index) {
      this.$data.jsclass = values;
      this.$data.classId = index + 1;
      this.$toast(this.$data.jsclass);
      this.showClass = !this.showClass;
    },
    // 上传头像接口
    afterRead: function(file) {
      this.image = file.content;
      localStorage.setItem("oldImage", file.content);
    },

    postInfo() {
      let that = this;
      if (
        this.$data.username == "" ||
        this.$data.username == undefined ||
        this.$data.username == null
      ) {
        this.$toast({
          message: "输入您的姓名！",
          icon: "like-o"
        });
        return false;
      }
      if (
        this.$data.storeId == "" ||
        this.$data.storeId == undefined ||
        this.$data.storeId == null
      ) {
        this.$toast({
          message: "请选择门店！",
          duration: 800
        });
        return false;
      }
      if (
        this.$data.levelId == "" ||
        this.$data.levelId == undefined ||
        this.$data.levelId == null
      ) {
        this.$toast({
          message: "请选择等级！",
          duration: 800
        });
        return false;
      }
      if (
        this.$data.classId == "" ||
        this.$data.classId == undefined ||
        this.$data.classId == null
      ) {
        if (this.jsclass != "洗车技师") {
          this.$toast({
            message: "请选择分类!",
            duration: 800
          });
          return false;
        }
      }
      if (
        this.$data.image == "" ||
        this.$data.image == undefined ||
        this.$data.image == null
      ) {
        this.$toast({
          message: "请上传您的头像!",
          duration: 800
        });
      }
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

      console.log(data);
      this.$axios
        .post(
          "https://gx.budaohuaxia.com//api/Technician/TechnicianUpdate",
          this.$qs.stringify(data)
        )
        .then(res => {
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
</style>
