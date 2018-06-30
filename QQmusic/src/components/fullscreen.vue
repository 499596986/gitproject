<template>
	<div class="fullcover fullscreen">
		<transition name="anidown">
			<div class="playtit text-center" v-if="fullScreenFlag">
				 <span class="fa fa-chevron-down down" v-on:click="changescreenstatus"></span>
				 <p>BANG BANG<br>DFDFDFD</p>
			</div>
		</transition>
		<div class="playanimal">
			<div class="playanimal-l text-center">
	 	 	  	<img src="../../static/images/test.png" alt="">
	 	 	  	<p>没意见</p>
			</div>
			<!-- <div class="playanimal-r text-center">
				<div>
					 <p>此:eeeeee</p>
					 <p>去：</p>
					 <p>大饭店订单</p>
				</div>
			</div> -->
		</div>
		<transition name="aniup">
			<div class="playcontrol" v-if="fullScreenFlag">
				<div class="playcon-change text-center">
					 <span class="active"></span>
					 <span></span>
				</div>
				<div class="playcon-pro flex">
					 <span>0:00</span>
					 <p class="flex_div"><span></span><em></em></p>
					 <span>4:21</span>
				</div>
				<div class="playcon-control flex">
					<span class="fa fa-random"></span>
					<span class="fa fa-step-backward"></span>
					<span class="fa fa-play"></span>
					<span class="fa fa-step-forward"></span>
					<span class="fa fa-list-ul"></span>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import scroll from "../plugins/betterscroll/scroll/scroll.vue"
	import slide from "../plugins/betterscroll/slide/slide.vue"
	import {mapState} from "vuex"
	import {mapMutations} from "vuex"
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			changescreenstatus(){
				this.changefullScreenFlag();
			}	
		},
		computed:{
			...mapState({
				fullScreenFlag:state=>state.fullScreenFlag
			}),
			...mapMutations([
				"changefullScreenFlag"
			])
		}
	}
</script>
<style scoped>
.fullscreen{
	background:#333;
	z-index:4;
}

.playtit{
	height:1.3rem;
	margin-top:0.2rem;
	position:relative;
}
.playtit .down{
	position:absolute;
	left:0.25rem;
	top:0.25rem;
	font-size:0.4rem;
	color:yellow;
}
.playtit p{
	color:#fff;
	font-size:0.36rem;
	line-height:0.6rem;
}

.playcontrol{
	position:fixed;
	bottom:0px;
	left:0px;
	right:0px;
	padding:0px 0.5rem;
	height:3.4rem;
}
.playcon-change span{
	display:inline-block;
	width:10px;
	height:10px;
	background:rgba(255,255,255,0.8);
	margin-right:0.15rem;
	border-radius:50%;
	transition:all 0.3s;
}
.playcon-change span:last-child{
	margin-right:0px;
}
.playcon-change span.active{
	width:20px;
	border-radius:5px;
}
.playcon-pro{
	justify-content:space-between;
	align-items:center;
	margin:0.2rem 0px;
}
.playcon-pro span{
	width:1rem;
	text-align:center;
	display:inline-block;
	font-size:0.3rem;
}
.playcon-pro p{
	margin:0px 0.1rem;
	height:4px;
	background:#222;
	border-radius:10px;
	font-size:0px;
}
.playcon-pro p span{
	display:inline-block;
	width:2px;
	height:4px;
	background:green;
	vertical-align:top;
}
.playcon-pro p em{
	display:inline-block;
	width:20px;
	height:20px;
	background:#ffcd32;
	border-radius:50%;
	margin-top:-8px;
	vertical-align:middle;
}
.playcon-control{
	justify-content:space-between;
	align-items:center;
	margin:0.6rem 0px 1rem 0px;
}
.playcon-control span{
	font-size:0.6rem;
	color:yellow;
}

.anidown-enter,.anidown-leave-active{
	top:-15px;
	opacity:0;
}
.anidown-enter-active,.anidown-leave-active{
	transition:all 0.3s ease;
}

.aniup-enter,.aniup-leave-active{
	bottom:-50px;
	opacity:0;
}
.aniup-enter-active,.aniup-leave-active{
	transition:all 0.3s ease;
}

.playanimal{
	position:absolute;
	top:1.6rem;
	left:0px;
	right:0px;
	bottom:3.6rem;
}
.playanimal-l img{
	width:5rem;
	height:5rem;
	overflow:hidden;
	border-radius:50%;
	margin-top:0.1rem;
}
.playanimal-l p{
	margin-top:1rem;
	font-size:0.36rem;
}
.playanimal-r p{
	font-size:0.36rem;
	margin-bottom:0.2rem;
}
.playanimal-r p:last-child{
	margin-bottom:0px;
}
</style>