<template>
	<div id="recommend" class="topbottom">
		<div class="recommend-content">
			<div class="recommend-wrapper">
				<div class="img-scroll">
					<div class="swiper-container">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="(item,index) in bannerList">
								<a :href="item.linkUrl">
									<img :src="item.picUrl" alt="">
								</a>
							</div>
						</div>
						<div class="swiper-pagination"></div>
					</div>
				</div>


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
		</div>
		
		<transition :name="transitionName">
			<router-view ></router-view> 
		</transition>
	</div>
</template>
<script>
	import {swiper,swiperSlide} from "vue-awesome-swiper";
//	import  BScroll from "better-scroll";

	import recommendFun from "../api/recommend.js";

	export default{
		data(){
			return {
				bannerList:[],
				singList:[],
				transitionName:"slide-left"
			}
		},
		created(){
			var that=this;
			 recommendFun.getRecommend().then(data=>{
			 	this.bannerList=data.data.slider;
			 	this.$nextTick(function(){
				 	new Swiper(".swiper-container",{ 
				              direction:"horizontal",
				              slidesPerView : 'auto',
				            //  freeMode:true,
				              pagination:".swiper-pagination",
				               auto:true,
				               autoplayDisableOnInteraction:false,
				               loop:true,
				               speed:500,
				               spaceBetween:15,
				               autoplay:3000   //自动轮播
				    })
			 	})
			 })

			recommendFun.getDiscList().then(function(data){
				that.singList=data.data.list;
			})

		},
		watch:{
			"route"(to,from){

			}
		},
		mounted:function(){
		}
	}
</script>
<style scoped>
	.swiper-container{
		width:100%;
		height:100%;
	}
	.recommend-content{width:100%;height:100%;}
	


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