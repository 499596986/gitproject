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
						          <el-menu-item :index="((index+1)+'-'+(index2+1)+'-'+(index3+1)).toString()" v-if="item2.submenu" v-for="(item3,index3) in item2.submenu">{{item3.text}}</el-menu-item>
						        </el-submenu>
						
						        <el-menu-item :index="(parseInt(index+1)+'-'+parseInt(index2+1)).toString()" v-else>{{item2.text}}</el-menu-item>
							</template> 
						</el-submenu>
						
						<el-menu-item :index="(index+1).toString()"   v-else>
					        <i class="item.icon"></i>
					        <span slot="title">{{item.text}}</span>
					    </el-menu-item>
					</template>
			    </el-menu>
			</el-aside>
			<el-main class="indexmain">
				<div class="indexmain-header">
					<el-breadcrumb separator="/">
					  <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
					  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
					  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
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
					<transition name="fade">
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
					{text:"首页",icon:"el-icon-document"},
					{
						text:"数据管理",icon:"el-icon-printer",
						submenu:[
							{
								text:"用户列表"
							},
							{
								text:"商家列表",
							},
							{
								text:"食品列表"
							},
							{
								text:"订单列表"
							},
							{
								text:"管理员列表"
							}	
						]
					},
					{
						text:"添加数据",icon:"el-icon-plus",
						submenu:[
							{text:"添加商铺"},
							{text:"添加商品"}
						],
					},
					{
						text:"图表",icon:"el-icon-star-on",
						submenu:[
							{
								text:"用户分布",
							}
						]
					},
					{
						text:"编辑",icon:"el-icon-edit",
						submenu:[
							{text:"文本编辑"}
						]
					},{
						text:"设置",icon:"el-icon-setting",
						submenu:[
							{text:"管理员设置"}
						]
					},{
						text:"说明",icon:"el-icon-sort-up",
						submenu:[
							{text:"说明"}
						]
					}
				]
			}
		},
		methods:{
			handleOpen(key, keyPath) {
		        console.log(key, keyPath);
		    },
		    handleClose(key, keyPath) {
		        console.log(key, keyPath);
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
