<template>
	<div class="playList ">
		<header class="play-header text-center" id="play-header">
			 <span class="fa fa-chevron-left back" v-on:click="$router.go(-1)"></span>
			 <span v-if="$route.params.id">{{songlist.dissname}}</span>
			 <span v-else-if="$route.params.id">{{songlist.singer_name}}</span>
			<!--  <span v-else-if="$route.params.ranklistid">{{songlist.topinfo.ListName}}</span> -->
		</header>
		<template v-if="$route.params.id">
			<div class="getBanner fd-locate" id="getBanner">
				 <div class="getBanner-img" id="getBanner-img">
				 	<img :src="songlist.logo" alt="">
				 </div>
				 <div class="rankPlayBtn" id="rankPlayBtn">
				 	  <p v-on:click="playsing(1,1)"><span class="fa fa-play-circle-o"></span> 随机播放全部</p>
				 </div>
			</div>
			<scroll :data="songlist.songlist"  :listenScroll="true"  v-on:scroll="scroll"
			 :probeType="3">
				<div class="playList-detail padlr50 padb50">
					<div class="play-tit" v-for="(item,index) in songlist.songlist" v-on:click="playsing(index+1)">
						  <p class="first">{{item.songname}}</p>
						  <p class="last"><span v-for="(item2,index2) in item.singer">{{item2.name}}<em v-if="index2!=(item.singer.length-1)">/</em></span></p>
					</div>
				</div>
			</scroll>
		</template>


		<template v-if="$route.params.singerid">
			<div class="getBanner fd-locate" id="getBanner">
				<div class="getBanner-img" id="getBanner-img">
					<img :src="'https://y.gtimg.cn/music/photo_new/T001R150x150M000'+songlist.singer_mid+'.jpg?max_age=2592000)'" alt="">
				</div>
				 <div class="rankPlayBtn" id="rankPlayBtn">
				 	  <p  v-on:click="playsing(1,1)"><span class="fa fa-play-circle-o"></span> 随机播放全部</p>
				 </div>
			</div>
			<scroll :data="songlist.songlist"  :listenScroll="true"  v-on:scroll="scroll"
			 :probeType="3">
				<div class="playList-detail padlr50 padb50">
					<div class="play-tit" v-for="(item,index) in songlist.list" v-on:click="playsing(index+1)">
						  <p class="first">{{item.musicData.songname}}</p>
						  <p class="last">{{songlist.singer_name}}-{{item.musicData.albumname}}</p>
					</div>
				</div>
			</scroll>
		</template>

		<template v-if="$route.params.ranklistid">
			<div class="getBanner fd-locate" id="getBanner">
				<div class="getBanner-img" id="getBanner-img">
					<!-- <img :src="songlist.topinfo.pic_album" alt=""> -->
				</div>
				 <div class="rankPlayBtn" id="rankPlayBtn">
				 	  <p  v-on:click="playsing(1,1)"><span class="fa fa-play-circle-o"></span> 随机播放全部</p>
				 </div>
			</div>
			<!-- <scroll :data="songlist.songlist"  :listenScroll="true"  v-on:scroll="scroll"
				 :probeType="3">  -->
					<div class="playList-detail padlr50 padb50">

						<div class="play-tit play-tit-tanklist flex play-tit-" v-for="(item,index) in songlist.songlist" v-on:click="playsing(index+1)">

							 <div class="play-tit-img">
							 	<span class="fa fa-glass" v-if="index<3"></span>
							 	<span v-else>{{index}}</span>
							 </div>
							 <div class="play-tit-p">
							 	  <p>{{item.data.songname}}</p>
							 	  <span>
							 	  	<em v-for="(item2,index2) in item.data.singer">{{item2.name}}<i v-if="index2!=item.data.singer.length-1">/</i></em> {{item.data.albumname}}
							 	  </span>
							 </div>
							 <div class="test" :src="songlist.topinfo.pic_album"></div>
							 <div class="test2" :src="songlist.topinfo.ListName"></div> 

						</div>
					
					</div>
			<!-- </scroll> -->

		<!-- 	 <div class="test" v-for="(item,index) in songlist.songlist" :src="songlist.topinfo.pic_album" v-if="index==0">{{songlist.topinfo.pic_album}}</div> -->
		</template>

	</div>
</template>
<script>
import recommendFun from "../api/recommend.js";
import singerFun from "../api/singer.js";
import ranklistFun from "../api/rank.js";
import lyricFun from "../api/lyric.js";    //播放音乐

import scroll from "../plugins/betterscroll/scroll/scroll.vue";	//better-scroll滚动
import {mapMutations,mapState} from "vuex";

	export default{
		data(){
			return {
				songlist:[],
				songlistdetail:[],	//只有歌曲的,比较简洁,添加到播放列表的
				scrollY:-1
			}
		},
		created:function(){
			var that=this;
			if(this.$route.params.id){
				recommendFun.getSongList(this.$route.params.id).then(data=>{
					that.songlist=data.cdlist[0];
					that.songlistdetail=data.cdlist[0]["songlist"];
				})
			}else if(this.$route.params.singerid){
				singerFun.getSingerDetail(this.$route.params.singerid).then(data=>{
					that.songlist=data.data;
					that.songlistdetail=data.data["list"];
					that.songlistdetail=that.cleanmusic(that.songlistdetail,"singer");
				})
			}else if(this.$route.params.ranklistid){
				ranklistFun.getTopListDetail(this.$route.params.ranklistid).then(data=>{
					that.songlist=data;
					that.songlistdetail=data['songlist'];
					that.songlistdetail=that.cleanmusic(that.songlistdetail,"ranklist");
					console.log(that.songlist)
				})
			}
		},
		mounted(){

		},
		methods:{
			scroll(pos){
				this.scrollY=-pos.y;
			},
			playsing(index,playorder){		//播放歌曲
				this.changeCurrentIndex(index);
				if(!playorder){
					var playorder=0;	//默认顺序播放
				}else{
					var playorder=playorder;	//顺序播放 1(随机播放) 2(单曲循环)
				}
				var playlist={
					list:this.songlistdetail,
					playOrder:playorder
				}
				this.changePlayList(playlist);
				this.changefullScreenFlag();   //全拼展开
				this.changeplaying(1);		//改变播放
		
			},
			...mapState({
				currentIndex:state=>state.currentIndex,
				playList:state=>state.playList,
			}),
			...mapMutations([
				"changePlayList",
				"changeCurrentIndex",
				"changefullScreenFlag",
				"changeplaying"
			]),
			cleanmusic(data,flag){
				var backarr=[];
				if(flag=="singer"){	//singer
					data.map(function(item){
						backarr.push(item.musicData);
					})
				}else{
					data.map(function(item){
						backarr.push(item.data);
					})
				}
				return backarr;
			}
		},
		watch:{
			scrollY(newY){
				var getBannerEl=document.getElementById("getBanner-img");
				var headerhei=document.getElementById("play-header").clientHeight;
				var preHeigh=document.getElementById("getBanner").clientHeight;

				if(preHeigh-newY<=headerhei){
					getBannerEl.style.height="1rem";
					getBannerEl.style.zIndex="10";
					getBannerEl.style.overflow="hidden";
					getBannerEl.style.position="relative"
					document.getElementById("rankPlayBtn").style.display="none";
				}else{
					getBannerEl.style.height="auto";
					getBannerEl.style.zIndex="";
					getBannerEl.style.overflow="hidden";
					getBannerEl.style.position="relative"
					document.getElementById("rankPlayBtn").style.display="block";
				}

				if(newY<2){
					var getnewY=-newY;
					var nowImgH=getBannerEl.clientHeight;
					var scale=parseFloat(getnewY/nowImgH)+1;
					getBannerEl.style.transform="scale("+scale+")";
				}else{
					getBannerEl.style.transform="scale(1)";
				}
			}
		},
		computed:{
			
		},
		components:{
			scroll
		}

	}
</script>
<style scoped>
	.playList{
		position:fixed;
		left:0px;
		right:0px;
		top:0px;
		bottom:0px;
		overflow:auto;
		z-index:2;
		background:#222;
	}
	.play-header{
		line-height:1rem;
		height:1rem;
		color:#fff;
		font-size:0.4rem;
		position:fixed;
		left:0px;
		right:0px;
		top:0px;
		z-index:11;
	}
	.play-header span{
		font-size:0.36rem;
		display:inline-block;
		line-height:0.8rem;
	}
	.play-header span.back{
		position:absolute;
		width:0.8rem;
		left:0.1rem;
		top:0.135rem;
	}
	.getBanner{
		height:5.4rem;
	}
	.rankPlayBtn{
		position:absolute;
		left:0px;
		right:0px;
		bottom:0.1rem;
		text-align:center;
	}
	.rankPlayBtn p{
		display:inline-block;
		padding:0.1rem 0.35rem;
		border-radius:40px;
		border:1px solid yellow;
		color:yellow;
		letter-spacing:1px;
		font-size:0.3rem;
	}
	.rankPlayBtn p span{
		font-size:0.4rem;
		vertical-align:middle;
		margin-top:-1px;
	}


	.playList-detail{
		background:#222;
	}
	.play-tit{
		padding-top:0.35rem;
		color:#fff;
		font-size:0.34rem;
	}
	.play-tit .last{
		margin-top:0.1rem;
		color:#999;
		font-size:0.3rem;

	}
	.play-tit .first{
		white-space:nowrap;
		overflow:hidden;
		text-overflow: ellipsis;
	}

	.play-tit-tanklist{
		align-items:center;
	}
	.play-tit-img{
		padding-right:0.5rem;
		font-size:0.6rem;
		text-align:left;
		color:yellow;
	}
	.play-tit-p {
		font-size:0.4rem;
		color:#fff;
		white-space:nowrap;
		text-overflow:ellipsis;
		overflow:hidden;
	}
	.play-tit-p span,.play-tit-p p{
		text-overflow:ellipsis;
		white-space:nowrap;
		overflow:hidden;
	}
	.play-tit-p span{
		color:#999;
		display:block;
		margin-top:0.1rem;
	}
</style>