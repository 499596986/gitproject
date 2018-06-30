import Vue from 'vue'
import Router from 'vue-router'

import header from '@/components/header.vue'
import recommend from "../views/recommend.vue";
import singer from "../views/singer.vue";
import ranklist from "../views/ranklist.vue";
import search from "../views/search.vue";
import user from "../views/user.vue";
import playlist from "@/components/playList.vue";


import test from "@/components/test.vue";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: header,
      redirect:"recommend",
      children:[
      	{
      		path:"recommend",
      		component:recommend,
          children:[
             {
                path:'/recommend/:id',
                component:playlist
             }
          ]
      	},
      	{
      		path:"singer",
      		component:singer,
          children:[
            {
              path:'/singer/:singerid',
              component:playlist
            }
          ]
      	},
      	{
      		path:"ranklist",
      		component:ranklist,
          children:[
            {
              path:"/ranklist/:ranklistid",
              component:playlist
            }
          ]
      	},
      	{
      		path:"search",
      		component:search
      	},
      	{
      		path:"user",
      		component:user
      	}
      ]
    }
  ]
})

