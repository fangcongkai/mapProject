import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import axios from 'axios';
// vxe

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'



import animate from 'animate.css' // 引入
Vue.use(animate) // 全局注册
Vue.use(ElementUI)
// Vue.use(axios)
Vue.use(VXETable)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
	},
}).$mount('#app')
