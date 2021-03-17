import Vue from 'vue'
import App from './App.vue'
// 关闭生产提示
Vue.config.productionTip = false
Vue.config.devtools = false
//引入混入
import './plugin/index'

// 引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import router from './router'
import JiangPlugin from '@/plugin'
Vue.use(JiangPlugin)



// import store from "./store"

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
