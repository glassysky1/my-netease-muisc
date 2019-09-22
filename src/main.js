import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import axios from "axios";
import Router from 'vue-router'
// import $ from 'zepto'


import './filters'
Vue.config.productionTip = false
import Mint from 'mint-ui';
import { Swipe, SwipeItem } from 'mint-ui';
Vue.prototype.$axios = axios
Vue.prototype.HOST = 'http://localhost:3000'
import 'mint-ui/lib/style.css'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.use(Mint);
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
