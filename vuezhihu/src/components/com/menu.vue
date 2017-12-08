<template>
	<div class="menu">
		<div class="menu-cover " v-bind:class="{left:menuisopen}" >
			<transition :name="transitionname">
				<div class="menu-cover-content" v-if="menuisopen"  v-on:click="closemenu">
					<ul>
						<li v-on:click="goto(-1)">首页 <span class="fa fa-star-o "></span></li>
						<li v-for="(item,index) in menulist.data.others" v-on:click="goto(item.id)">
							{{item.name}} <span class="fa fa-star-o "></span>
						</li>
					</ul>
				</div>
			</transition>
			<transition :name="showhide" >
				<div class="menu-cover-all" v-if="menuisopen" v-on:click="closemenu"></div>
			</transition>
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
				menuisopen:0,
				transitionname:"slide-rightt",
				showhide:"hide"
			}
		},
		mounted(){
			this.init();
		},
		computed:{		
		},
		methods:{
			init(){
				api.getmenu().then(res=>{
					this.menulist=res;
				}).catch(err=>{console.log("错误")})
			},
			closemenu(){
				this.menuisopen=0;
				this.$emit("nothidden");
			},
			goto(id){
				if(id==-1){
					this.$router.push("/");
				}else{
					this.$router.push("/theme/"+id);
				}
			}
		}
	}

</script>
<style scope>

.menu-cover{
	color:#fff;
	font-size:0.32rem;
	transition:all 0.3s ease;
}
.menu-cover.left{
	height:auto;
	overflow:auto;
}

.menu-cover-all{
	position:fixed;
	top:0px;
	bottom:0px;
	left:0px;
	width:100%;
	background:rgba(172, 185, 201, 0.4);
	z-index:9;
}
.menu-cover-content{
	position:absolute;
	top:0px;
	bottom:0px;
	left:0px;
	width:60%;
	overflow-y:auto;
	-webkit-overflow-scrolling:touch;
	background:rgba(91, 116, 146, 0.75);
	padding-top:1.2rem;
	transition:all 0.5s;
	z-index:10;
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


.slide-rightt-enter,.slide-rightt-leave-to{
	opacity:0;
	left:-60%;
}
.slide-rightt-enter-active.slide-rightt-leave-active{
	transition:all 0.2s;
}
.showhide-enter,.showhide-leave-to{
	opacity:0;
}
.showhide-enter-active,.showhide-enter-leave-active{
	transition:all 0.2s;
}
</style>