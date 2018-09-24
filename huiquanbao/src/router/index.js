import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from "../views/index.vue";
import productlist from "../views/product-list.vue";
import productdetail from "../views/product-detail.vue"
import agentlist from "../views/agent-list.vue";
import answerlist from "../views/bxanswer-list.vue"
import newslist  from "../views/news-list.vue"
import newsdetail from "../views/news-detail.vue";
import test from "../views/test.vue";
import test1 from "../views/test1.vue"
import test2 from "../views/test2.vue"
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
          path: '/',
          name: 'index',
          component: index
        },
        {
        	path:"/productlist",
        	name:"productlist",
        	component:productlist
        },
        {
        	path:"/productdetail/:numid",
        	name:"productdetail",
        	component:productdetail
        },
        {
        	path:"/agentlist",
        	name:"agentlist",
        	component:agentlist
        },
        {
        	path:"/answerlist",
        	name:"answerlist",
        	component:answerlist
        },
        {
        	path:"/newslist",
        	name:"newslist",
        	component:newslist
        },
        {
        	path:"/newsdetail/:id",
        	name:"newsdetail",
        	component:newsdetail
        },
        {
            path:"/test",
            component:test,
            meta:{
                keepAlive:true
            }
        },
        {
            path:"/test1",
            component:test1,
        },
         {
            path:"/test2",
            component:test2,
             meta:{
                keepAlive:false
            }
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
           // console.log(savedPosition)
          return savedPosition
        } else {
          return { x: 0, y: 0 }
        }
    }
})
