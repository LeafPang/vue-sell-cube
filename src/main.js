import Vue from 'vue'
import App from './App.vue'

import "./assets/common/stylus/index.styl"
import axios from 'axios'
import "./register"
import './cube-ui'
import router from "./router/router.js"


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
