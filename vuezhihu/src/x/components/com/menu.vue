<template>
	<div class="menu">
		<div class="menu-cover " v-bind:class="{left:isopen()}" v-on:click="closemenu">
			<div class="menu-cover-content">
				<ul>
					<li>首页 <span class="fa fa-star-o "></span></li>
					<li v-for="(item,index) in menulist.data.others" v-on:click="goto(item.id)">
						{{item.name}} <span class="fa fa-star-o "></span>
					</li>
				</ul>
			</div>
		</div>

	</div>

</template>
<script>
	import api from "../../mock/api.vue"
	export default{
		name:"menu",
		data(){
			return {
				menulist:{},
				menuisopen:0
			}
		},
		props:["menuopen"],
		mounted(){
			this.init();
		},
		computed:{		
		},
		methods:{
			init(){
				api.getmenu().then(res=>{
					this.menulist=res;
					console.log(this.menulist);
				}).catch(err=>{console.log("错误")})
			},
			isopen(clo){
				if(clo==1){
					this.menuisopen=0;
					return this.menuisopen;
				}else{
					this.menuisopen=this.menuopen;
					return this.menuisopen;
				}
				
			},
			closemenu(){
				this.isopen(1)
			},
			goto(id){

			}
		}
	}

</script>
<style scope>

.menu-cover{
	position:fixed;
	top:0px;
	bottom:0px;
	left:0px;
	width:100%;
	background:rgba(0,0,0,0.3);
	z-index:999;
	color:#fff;
	font-size:0.32rem;
	display:none;
}
.menu-cover.left{
	display:block;
}
.menu-cover.left .menu-cover-content{
	left:0%;
}


.menu-cover-content{
	position:absolute;
	top:0px;
	bottom:0px;
	left:-60%;
	width:60%;
	overflow-y:auto;
	-webkit-overflow-scrolling:touch;
	background:rgba(91, 116, 146, 0.75);
	padding-top:1.2rem;
	transition:all 0.5s;
}
.menu-cover-content li{
	padding:0.1rem 0.3rem;
	margin-bottom:0.25rem;

}
.menu-cover-content li:last-child{
	margin-bottom:0px;
}
.menu-cover-content li span{
	float:right;
}
</style>