import axios from 'axios'
import Vue from 'vue'
import config from './config'
import NProgress from 'nprogress'
// import cookie from 'js-cookie'
import { removeToken } from './oauth'
var instance = axios.create({
    baseURL: config.BASE_URL
});

// 用于记录是否正在刷新token，以免同时刷新
window.tokenLock = false

function refreshToken() {
    if (!window.tokenLock) {
        instance.put('/oauth/refresh').then(({ data }) => {
            const ExpiresTime = new Date().getTime() + data.expires_in * 1000
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('expires_in', ExpiresTime)
            localStorage.setItem('token_type', data.token_type)
            localStorage.setItem('refresh_token', data.refresh_token)
        })
        window.tokenLock = true
    }
}



instance.defaults.timeout = 10000;

// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    config.headers['Authorization'] = `${localStorage.getItem('token_type')} ${localStorage.getItem('access_token')}`
    NProgress.start()
    return config;
}, function (error) {
    // 对请求错误做些什么3
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 如果距离过期时间还有10分钟就使用refresh_token刷新token
    const expiresTimeStamp = new Date(Number(localStorage.getItem('expires_in'))).getTime() - new Date().getTime()
    if (expiresTimeStamp < 10 * 60 * 1000 && expiresTimeStamp > 0) {
        if (response.config.url.indexOf('current') < 0) {
            refreshToken()
        }
    }
    NProgress.done()
    return response;
}, function (error) {
    if (error.response.status === 401) {
        // 401错误:token失效或登录失败
        // 如果是在登录页报错的话直接显示报错信息，否则清除token
        if (location.href.indexOf('login') > 0) {
            Vue.prototype.$notify.error({
                title: '错误',
                message: error.response.data.message
            })
            return
        }
        removeToken()
        location.reload()
    }
    return Promise.reject(error)
});

export const get = async (url, params) => {
    let res = await instance.get(url, { params })
    return res.data
}
export const post = async (url, params) => {
    let res = await instance.post(url, params)
    return res.data
}

export default instance