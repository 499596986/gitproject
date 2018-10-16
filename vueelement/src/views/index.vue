<template>
	<div id="index">
		<el-container>
			<el-aside style="width:200px;" class="indexaside">
				<el-menu
			      default-active="1"
			      class="el-menu-vertical-demo"
			      @open="handleOpen"
			      @close="handleClose"
			      background-color="#324157"
			      text-color="#bfcbd9"
			      active-text-color="#20a0ff">
					<template v-for="(item,index) in menudata">
						<el-submenu :index="(index+1).toString()" v-if="item.submenu" popper-class="submenu-first">
						
					        <template slot="title">
					          <i :class="item.icon"></i>
					          <span>{{item.text}}</span>
					        </template>
							<template v-for="(item2,index2) in item.submenu">
								<el-submenu :index="((index+1)+'-'+(index2+1)).toString()" v-if="item2.submenu" style="background:rgb(50, 64, 87)">
						          <template slot="title">{{item2.text}}</template>
						          <el-menu-item :index="((index+1)+'-'+(index2+1)+'-'+(index3+1)).toString()" v-if="item2.submenu" v-for="(item3,index3) in item2.submenu" @click="$router.push(''+item3.url)">{{item3.text}}</el-menu-item>
						        </el-submenu>
						
						        <el-menu-item :index="(parseInt(index+1)+'-'+parseInt(index2+1)).toString()" @click="$router.push(''+item2.url)" v-else>{{item2.text}}</el-menu-item>
							</template> 
						</el-submenu>
						
						<el-menu-item :index="(index+1).toString()" @click="$router.push(''+item.url)"  v-else>
					        <i class="item.icon"></i>
					        <span slot="title">{{item.text}}</span>
					    </el-menu-item>
					</template>
			    </el-menu>
			</el-aside>
			<el-main class="indexmain">
				<div class="indexmain-header">
					<el-breadcrumb separator="/">
					 <!--  <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
					 <el-breadcrumb-item>活动列表</el-breadcrumb-item> -->
					 <template v-if="breaddata.length>0">
							<el-breadcrumb-item  v-for="(item,index) in breaddata">
								<a href="item.url" v-if="(breaddata.length-1)!=index && item.url">{{item.text}}</a>
							  	<a href="javascript:void(0)" v-else-if="(breaddata.length-1)!=index">{{item.text}}</a>
							  	<span v-else>{{item.text}}</span>
						  </el-breadcrumb-item>
					 </template>
					 <template v-else>
					 	<el-breadcrumb-item ><span class="s">首页</span></el-breadcrumb-item>
					 </template>
					  
					</el-breadcrumb>
					<el-dropdown>
						<span>
							<img src="//elm.cangdu.org/img/default.jpg" alt="">
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>首页</el-dropdown-item>
							<el-dropdown-item>退出</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
				<div class="indexmain-con">
					<transition name="fade" mode="out-in">
						<router-view></router-view>
					</transition>
				</div>
			</el-main>
		</el-container>
	</div>
</template>
<script>
	import mixin from "../mixins/mixin.js";
	export default{
		mixins:[mixin],
		data(){
			return {
				menudata:[
					{text:"首页",icon:"el-icon-document",url:"/index"},
					{
						text:"数据管理",icon:"el-icon-printer",
						submenu:[
							{
								text:"用户列表",
								url:"/userlist"
							},
							{
								text:"商家列表",
								url:"/",
							},
							{
								text:"食品列表",
								url:"/foodlist"
							},
							{
								text:"订单列表",
								url:"/orderlist"
							},
							{
								text:"管理员列表",
								url:"/adminlist"
							}	
						]
					},
					{
						text:"添加数据",icon:"el-icon-plus",
						submenu:[
							{
								text:"添加商铺",
								url:"/addshop"
							},
							{
								text:"添加商品",
								url:"/addgoods"
							}
						],
					},
					{
						text:"图表",icon:"el-icon-star-on",
						submenu:[
							{
								text:"用户分布",
								url:"/userspread"
							}
						]
					},
					{
						text:"编辑",icon:"el-icon-edit",
						submenu:[
							{
								text:"文本编辑",
								url:"/textedit"
							}
						]
					},{
						text:"设置",icon:"el-icon-setting",
						submenu:[
							{
								text:"管理员设置",
								url:"/ruler"
							}
						]
					},{
						text:"说明",icon:"el-icon-sort-up",
						submenu:[
							{
								text:"说明",
								url:"/info"
							}
						]
					}
				],
				breaddata:[],
			}
		},
		methods:{
			handleOpen(key, keyPath) {
		       // console.log(key, keyPath);
		    },
		    handleClose(key, keyPath) {
		       // console.log(key, keyPath);
		    },
		    breadfun(url){
		    	this.breaddata=[];
				var url=url;
				var that=this;
				this.menudata.map(function(item,index){
					if(item.submenu){
						var flag=0;
						item.submenu.map(function(item2,index2){
							if(item2.url==url){
								that.breaddata.push({"text":item.text,"url":item.url})
								that.breaddata.push({"text":item2.text,"url":item2.url});
								flag=1;
								return;								
							}
						})
						if(flag){
							return;
						}
					}else{
						if(item.url==url){
							that.breaddata.push({"text":item.text,"url":item.url})
							return;							
						}
					}
				})
				console.log(that.breaddata)
		    }
		},
		created(){
			var url=this.$route.path;
			this.breadfun(url);
		},
		watch:{
			"$route"(to,from){
				var url=to.path;
				this.breadfun(url);
			}
		}
	}
</script>
<style lang="less">
	.indexaside .el-submenu__title i{
		color:#bfcbd9;
		&.el-icon-arrow-down{
			font-size:16px;
		}
	}
	.indexaside .el-menu{border-right:0px;}
</style>
<style lang="less" scoped>
	.indexaside{
		position:fixed;
		top:0px;
		bottom:0px;
		left:0px;
		background:rgb(50, 64, 87);
	}
	.indexmain{
		margin-left:200px;
	}
	.indexmain-header{
		height:60px;
		line-height:60px;
		background:#eff2f7;
		margin:-20px;
		padding:0px 20px;
		overflow:hidden;
		margin-bottom:20px;
		.el-breadcrumb{
			display:inline-block;
			line-height:60px;
		}
		.el-dropdown{
			vertical-align: top;
    		float: right;
			img{
				width:40px;
				height:40px;
				border-radius:50%;
			}
		} 
	}

</style>
