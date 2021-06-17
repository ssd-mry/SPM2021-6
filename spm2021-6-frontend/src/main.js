import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import BaiduMap from 'vue-baidu-map'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)


Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'e5DKIXv2a0bGbNntPXjbPaA9MfyYa1Fz'
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
