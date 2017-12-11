// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import global from "./components/global"
Vue.use(global);

Vue.config.productionTip = false

import ajax from "./mock/ajax.vue";
Vue.use(ajax,{
	baseURL:"http://zhihu-agent.herokuapp.com/get?api="
})







/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
