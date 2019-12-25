import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './css/common.css'
import './css/jscommon.css'
import QS from 'qs'

Vue.prototype.$axios = axios; //把axios挂载到vue上

Vue.prototype.$qs = QS;
Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')