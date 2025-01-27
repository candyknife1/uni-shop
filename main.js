import App from './App'
// 1. 导入 store 的实例对象
import store from './store/store.js'

//导入网络请求包
import { $http } from '@escook/request-miniprogram'

uni.$http = $http

//配置全局请求路径
$http.baseUrl= 'https://api-hmugo-web.itheima.net'

$http.beforeRequest = function(options){
  uni.showLoading({
    title: '数据加载中'
  })
}

//响应拦截器
$http.afterRequest = function(options){
  uni.hideLoading()
}

uni.$showMsg = function(title= '数据请求失败' , duration = 1500){
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App,
  store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif