import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import BaiduMap from 'vue-baidu-map'
import 'element-ui/lib/theme-chalk/index.css'
// 引入axios
import axios from 'axios';
// 挂载到vue原型链上
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'e5DKIXv2a0bGbNntPXjbPaA9MfyYa1Fz'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
