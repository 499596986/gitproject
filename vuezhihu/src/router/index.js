import Vue from 'vue'
import Router from 'vue-router'

import home from "../components/view/home.vue"
import theme from "../components/view/theme.vue"
import detail from "../components/view/detail.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home 
    },
    {
    	path:"/theme/:id",
    	name:"theme",
    	component:theme
    },
    {
      path:"/detail/:id",
      name:"detail",
      component:detail
    }
  ]
})
