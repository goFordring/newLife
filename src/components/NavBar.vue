<template>
  <van-nav-bar :title="title" left-arrow @click-left="clickToBack"/>
</template>
<script>
import Vue from 'vue'
import { NavBar, Icon } from 'vant'

Vue.use(NavBar).use(Icon)
export default {
  name: 'NavBar',
  props: {
    title: String
  },
  methods: {
    clickToBack () {
      window.history.back(-1)
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
