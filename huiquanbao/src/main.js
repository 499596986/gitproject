// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"
import  $ from "jquery"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
/*   mixins: [mixin],*/
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


/*
router.afterEach(() => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})*/