import Vue from 'vue'

//引入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './routrs'


const router = new VueRouter({
    routes,
    // mode:'history',
    // base:'/history'
})
export default router
