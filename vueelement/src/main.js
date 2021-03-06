// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./global/main.js";				//注册全局使用 例如：$echarts


import ElementUI from "element-ui";		//引入 elementui
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
import "../static/css/style.css";	//初始化css


Vue.config.productionTip = false




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
