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
import addgoods from "../views/addData/addgoods.vue"
import userspread from "../views/echarts/userspread.vue"  
import textedit from "../views/edit/textedit.vue"
import ruler from "../views/set/ruler.vue"
import info from "../views/introduce/info.vue"

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
    		},
            {
                path:"/addgoods",
                name:"addgoods",
                component:addgoods
            },
            {
                path:"/userspread",
                name:"userspread",
                component:userspread
            },
            {
                path:"/textedit",
                name:"textedit",
                component:textedit
            },
            {
                path:"/ruler",
                name:"ruler",
                component:ruler
            },
            {
                path:"/info",
                name:"info",
                component:info
            }
    	]
    }
  ]
})
