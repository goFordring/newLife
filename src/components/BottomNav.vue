<template>
  <van-grid clickable :column-num="2" id="btmBar">
    <van-grid-item :class="{'active':pageId==='1'}" icon="records" text="我要洗车" @click='toWashCar' />
    <van-grid-item :class="{'active':pageId==='2'}" icon="wap-home-o" text="我的" @click='toMe' />
  </van-grid>
</template>
<script>
import Vue from 'vue'
import { NavBar, Icon, Grid, GridItem } from 'vant'

Vue.use(NavBar).use(Icon).use(Grid).use(GridItem)
export default {
  name: 'BottomNav',
  props: {
    pageId: String
  },
  methods: {
    toWashCar () {
      this.$router.push('washCar')
    },
    toMe () {
      this.$router.push('home')
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
