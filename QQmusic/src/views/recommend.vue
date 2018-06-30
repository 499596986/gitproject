<template>
	<div id="recommend" class="topbottom" style="overflow:hidden;">
		<div class="recommend-total">
			<scroll ref="scroll" :data="passdata" class="rest" >
			       <div class="recommend-content"> 
						<slide :data="passdata2">
							<div v-for="(item,index) in bannerList" class="test">
								<a :href="item.linkUrl">
									<img :src="item.picUrl" alt="">
								</a>
							</div>
						</slide>


						<h2 class="hot-recommend-tit">热门歌单推荐</h2>
						<div class="hot-recommend-list">
							<div  class="hot-recommend-list-sing">
								<div class="hot-recommend-list-detail flex" v-for="(item,index) in singList" v-on:click="$router.push('/recommend/'+item.dissid+'')">
									<img :src="item.imgurl" alt="">
									<div class="hot-recommend-list-detail-text">
										<p>{{item.creator.name}}</p>
										<p>{{item.dissname}}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
            </scroll>
			
		</div>
		<transition :name="transitionName">
			<router-view ></router-view> 
		</transition>
	</div>
</template>
<script>
	import recommendFun from "../api/recommend.js";

	import slide  from "../plugins/betterscroll/slide/slide.vue"
	import scroll from "../plugins/betterscroll/scroll/scroll.vue"

	export default{
		data(){
			return {
				bannerList:[],
				singList:[],
				transitionName:"slide-left",
				passdata:"",
				passdata2:1
			}
		},
		created(){
			var that=this;
			 recommendFun.getRecommend().then(data=>{
			 	this.bannerList=data.data.slider;
			 	this.passdata2=this.bannerList;
			 })

			recommendFun.getDiscList().then(function(data){
				that.$nextTick(function(){
					that.singList=data.data.list;
					that.passdata=that.singList;
				})
				
			})

		},
		watch:{
			"route"(to,from){

			}
		},
		mounted:function(){
		},
		components:{
			scroll,
			slide
		}
	}
</script>
<style scoped>
	.swiper-container{
		width:100%;
		height:100%;
	}
	.recommend-content{width:100%;height:100%;}
	
	.recommend-total{width:100%;height:100%;}

	


	.hot-recommend-tit{
		padding:0.3rem;
		text-align:center;
		color:#ffcd32;
		font-size:0.34rem;
	}

	.hot-recommend-list-sing{
		padding:0px 0.25rem;
	}

	.hot-recommend-list-detail{
		align-items:center;
		margin-bottom:0.35rem;
	}
	.hot-recommend-list-detail img{
		width:1.5rem;
		margin-right:0.35rem;
	}
	.hot-recommend-list-detail-text p{
		font-size:0.28rem;
		text-align:left;
	}
	.hot-recommend-list-detail-text p:first-child{
		color:#fff;
		margin-bottom:0.2rem;
	}

	.slide-left-enter{
		transform:translateX(100%);
	}
	.slide-left-enter-active{
		 transition:all 0.3s;
	}
	.slide-left-leave-active{
		transform:translateX(100%);
		transition:all 0.3s;
	}
</style>