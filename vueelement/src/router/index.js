import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import login from "../views/login.vue"
import index from "../views/index.vue"
import firstpage from "../views/firstpage.vue"
import userlist from "../views/dataManage/userlist.vue"
import foodlist from "../views/dataManage/foodlist.vue";
import orderlist from "../views/dataManage/orderlist.vue"
import adminlist from "../views/dataManage/adminlist.vue"
import addshop from "../views/addData/addshop.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
    	path:'/index',
    	name:'index',
    	component:index,
    	children:[
    		{
    			path:'/',
    			name:'firstpage',
    			component:firstpage
    		},
    		{
    			path:'/userlist',
    			name:"userlist",
    			component:userlist
    		},
    		{
    			path:"/foodlist",
    			name:"foodlist",
    			component:foodlist
    		},
    		{
    			path:'/orderlist',
    			name:"orderlist",
    			component:orderlist
    		},
    		{
    			path:'/adminlist',
    			name:"adminlist",
    			component:adminlist
    		},
    		{
    			path:'/addshop',
    			name:"addshop",
    			component:addshop
    		}
    	]
    }
  ]
})
