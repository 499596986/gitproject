<template>
	<div class="player-con">
		<div class="player fd-hide" v-bind:class="{'fd-show':playList.list.length}">
		    <div class="flex playmin">
		        <span class="player-lef" v-bind:class="{'noactive':isplay}" v-on:click="changescreenstatus"><img :src="imgurl" alt=""></span>
		        <div class="player-mid" v-on:click="changescreenstatus">
		              <p class="f">{{currentSong.songname}}</p>
		              <p>{{autors}}</p>
		        </div>
		        <div class="player-rig">
		              <span class="fa" v-on:click="clickplay()" v-bind:class="{'fa-play-circle-o':!isplay,'fa-pause':isplay}"></span>
		              <span class="fa fa-list-ol" v-on:click="menuisopen"></span>
		        </div>
		    </div> 
		</div>
		<div class="playfullscreen">
			<transition name="normal" 
				@enter="enter" 
				@after-enter="afterEnter"
				@leave="leave"
				@after-leave="afterLeave"
			>
			    <div class="fullcover fullscreen" v-show="fullScreenFlag">
						<div class="playtit text-center topdown">
							 <span class="fa fa-chevron-down down" v-on:click="changescreenstatus"></span>
							 <p><span>{{currentSong.songname}}</span><span>{{autors}}</span></p>
						</div>
						<div class="playanimal" 
							@touchstart.prevent="playtouchstart"
							@touchmove.prevent="playtouchmove"
							@touchend.prevent="playtouchend"
						>
							<div class="playanimal-l text-center" ref="playanileft">
								<div ref="cdWrapper">
					 	 	  		<img :src="imgurl" alt="" v-bind:class="{'noactive':isplay}">
					 	 	  	</div>
					 	 	  	<p>{{playingLyric}}</p>
							</div>
							<div class="playanimal-r text-center" ref="playaniright" style="width:100%;height:100%;overflow:hidden">
								<scroll :listen-scroll="true" v-on:scroll="scroll" :probe-type="3" ref="lyriclist">
									<div v-if="currentLyric">
										<p v-for="(item2,index2) in currentLyric.lines" :class="{'active':currentLineNum==index2}" ref="lyricLine">{{item2.txt}}</p>
									</div>
								</scroll>
							</div>
						</div>
						<div class="playcontrol bottomup" >
							<div class="playcon-change text-center pageother">
								 <span class="f active"></span>
								 <span class="s"></span>
							</div>
							<div class="playcon-pro flex paogress-bar">
								 <span>0:00</span>
								 <p class="flex_div proressp" v-on:click="progressclick" ref="progressall"><span ref="progressSpan"></span>
									 <em v-on:touchstart.prevent="progressStart"
									 	 v-on:touchmove.prevent="progressMove"
									 	 v-on:touchend="progressEnd" ref="progresswid" v-on:click.stop>
									 </em>
								 </p>
								 		
								 <span>{{duration|durationFilter}}</span>
							</div>
							<div class="playcon-control flex">
								<span class="fa" :class="{'fa-random':playList.playOrder==1,  'fa-reorder':playList.playOrder==0 ,'fa-repeat':playList.playOrder==2}"  v-on:click="changePlayMode"></span>
								<span class="fa fa-step-backward" v-on:click="presong"></span>

								<span class="fa" v-on:click="clickplay()" v-bind:class="{'fa-play':!isplay,'fa-pause':isplay}"></span>


								<span class="fa fa-step-forward" v-on:click="nextsong"></span>
							<!-- 	<span class="fa fa-list-ul" v-on:click="menuisopen"></span>-->
								<span class="fa fa fa-heart-o" v-if="favoriteMusic.indexOf(currentSong.songid)>-1" :class="{'favoriteC':true}" v-on:click="ischangefavorite(currentSong.songid)"></span>

								<span class="fa fa fa-heart-o" :class="{'favoriteC':false}" v-else  v-on:click="ischangefavorite(currentSong.songid)"></span>
							</div>
						</div>
			    </div>
		    </transition>
	    </div>
	    <div class="menu">
	    	<transition name="menuAni">
	    		<div class="menu-con-fix" v-show="menuIsShowFlag" v-on:click="menuisopen">
	    		   <div class="menu-con" @click.stop>
	    		   	  <div class="menu-tit flex">
	    		   	  	  <span class="fa" :class="{'fa-random':playList.playOrder==1,  'fa-reorder':playList.playOrder==0 ,'fa-repeat':playList.playOrder==2}"  v-on:click="changePlayMode"></span>
	    		   	  	  <span class="s">顺序播放</span>
	    		   	  	  <span class="fa fa-trash-o" v-on:click="deleteplayList"></span>
	    		   	  </div>
	    		   	  <div class="menu-list">
	    		   	  	<scroll :listen-scroll="true" :protoType="3" ref="menuul">
		    		   	  	 <ul>
		    		   	  	 	<li class="flex" v-for="(item,index) in playList.list" ref="menuli" v-on:click="menuchoosesong(index)">
		    		   	  	 		<span class="fa " :class="{'fa-play':(index+1)==currentIndex}" style="width:0.4rem;display:inline-block"></span> 
		    		   	  	 		<p class="m">{{item.songname}}</p>
		    		   	  	 		<p class="r">
		    		   	  	 			
		    		   	  	 			<span class="fa fa-heart-o" :class="{'favoriteC':true}" v-on:click.stop="ischangefavorite(item.songid)" v-if="favoriteMusic.indexOf(item.songid)>-1"></span>

		    		   	  	 			<span class="fa fa-heart-o" :class="{'favoriteC':false}" v-on:click.stop="ischangefavorite(item.songid)" v-else></span>


		    		   	  	 			<span class="fa fa-close" v-on:click.stop="deleteandplay(index)"></span>
		    		   	  	 		</p>
		    		   	  	 	</li>
		    		   	  	 </ul> 
	    		   	  	</scroll>
	    		   	  </div>
	    		   	  <div class="menu-bottom text-center">
	    		   	  	  <p class="f">
	    		   	  	  	  <span><strong>+</strong>添加歌曲到队列</span>
	    		   	  	  </p>
	    		   	  	  <p class="text-center s" v-on:click="menuisopen">关闭</p>
	    		   	  </div>
	    		   </div>	
	    		</div>
	    	</transition>
	    </div>
	    <audio :src="playsongurl" ref="audio" id="audio" 
	    	@play="ready" 
	    	@timeupdate="updateTime"
	    	@ended="ended">
	    </audio>
	</div>
</template>
<script>
	import {mapState} from "vuex";
	import {mapGetters} from "vuex";
	import {mapMutations} from "vuex";
	import base64 from "js-base64";
	import LyricCi from "lyric-parser";

	import animations from "create-keyframe-animation";
	import scroll from "../plugins/betterscroll/scroll/scroll.vue";
	import Lyric from "../api/lyric.js";  //songmid 获取歌词


	export default{
		data(){
		    return {
		    	menuIsShowFlag:0,		//菜单列表是否显示
		    	imgurl:"",
		    	autors:"",
		   		currentshow:"cd",
		   		songword:[],
		   		currentLyric:null,		//歌曲对象
		   		playsongurl:'',			//播放歌曲的链接。要拼接的	
		   		songready:false,	    //防止快速点击的	
		   		currentLineNum:0,		//滚动歌曲的行数
		   		playingLyric:"",		//当前的歌词
		   		duration:0,
		   		currentTime:0,		    //播放的当前时间
		    }
		},
		created(){
 			this.touch={}		//滑动
 			this.progressTouch={}
		},
		computed:{
		    ...mapState({
		       playList:state=>state.playList,
		       isplay:state=>state.isplay,
		       fullScreenFlag:state=>state.fullScreenFlag,
		       currentIndex:state=>state.currentIndex,
		       favoriteMusic:state=>state.favoriteMusic
		    }) ,
		    ...mapGetters([
		    	"currentSong"
		    ]),
		},
		filters:{
			durationFilter(duration){
				var m=parseInt((duration/60))<=9?"0"+parseInt((duration/60)):parseInt((duration/60));
				var s=(duration%60)<=9?"0"+(duration%60):(duration%60);
				return m+":"+s;
			}
		},
		watch:{
			currentSong(newVal,oldVal){
				/**
					这边还要判断一下单曲循环
					因为newVal和oldVal也相等了
					现在没有判断
				**/
				if (!newVal || !newVal.songid) return
				if(newVal.songid==oldVal.songid){return}   
				var that=this;   	//这边是菜单那边删除前面的歌曲,			
				that.autors="";		//这样不用重新开始歌曲
				this.imgurl="https://y.gtimg.cn/music/photo_new/T002R300x300M000"+newVal.albummid+".jpg?max_age=2592000";
				newVal.singer.map(function(item){
					that.autors+=item.name+"/";
				})
				this.autors=this.autors.slice(0,-1);

				this.playsongurl="http://thirdparty.gtimg.com/C100"+newVal.songmid+".m4a?fromtag=38";
				if(this.currentLyric){
					this.currentLyric.stop();
				}
				clearTimeout(this.timer);

				this.$refs.progressSpan.style.width="0px";

				this.timer=setTimeout(()=>{
					that.$refs.audio.play();
					that.getLyric(newVal.songmid);	
					that.duration=newVal.interval;
				},1000)

			},
			isplay(flag){
				const audio=this.$refs.audio;
				var that=this;
				this.$nextTick(()=>{
					flag?audio.play():audio.pause();

				})
			},
			currentTime(newTime){   //播放的当前时间
				if(newTime>0){
					//debugger;
					const widthAll=this.$refs.progressall.clientWidth;
					const dotwid=this.$refs.progresswid.clientWidth;
					const leaveWid=widthAll-dotwid;
					const precent=newTime/this.duration;
					const moveWid=parseFloat(precent*leaveWid);		


					this._progressoffset(moveWid);
					this.currentLyric.seek(newTime*1000);
				}else if(newTime==0){
					// this._progressoffset(0);
					// this.currentLyric.seek(0);
				}
			}
		},
		methods:{
		    ...mapMutations([
		       "changefullScreenFlag",
		       "changefavorite",
		       "changeplaying",
		       "changeCurrentIndex",
		       "changeplaying",
		       "changePlayList"
		 	]),
		    clickplay:function(){
		       this.changeplaying();
		       this.currentLyric.togglePlay();
		    },
		    changescreenstatus(){
		        this.changefullScreenFlag();
		    },

		    menuisopen(){
		    	var that=this;
		    	if(this.menuIsShowFlag){
		    		this.menuIsShowFlag=0;		    
		    	}else{
		    		this.menuIsShowFlag=1;		
		    		this.$nextTick(function(){
		    			that.$refs.menuul.refresh();   	
		    			that.$refs.menuul.scrollToElement(that.$refs.menuli[that.currentIndex-1]);	
		    		})
		    	}
		    },
		    ischangefavorite(id){
		    	this.changefavorite(id);
		    },
		    playtouchstart(e){
		    	this.touch.startX=e.touches[0].pageX;
		    	this.touch.startY=e.touches[0].pageY;
		    },
		    playtouchmove(e){
		    	const touch=e.touches[0];
		    	const moveX=touch.pageX-this.touch.startX;
		    	const moveY=touch.pageY-this.touch.startY;
		  		const winWidth=document.body.clientWidth ;
		  		var left=this.currentshow=="cd"?0:-winWidth;
		  		var offsetX=Math.min(0,Math.max(-winWidth,left+moveX));
		  		var opacityPercent=(Math.abs(offsetX)/winWidth);

		  		this.$refs.playanileft.style.opacity=(1-opacityPercent);
		  		this.$refs.playaniright.style.transform="translateX("+offsetX+"px)";
		    },
		    playtouchend(e){
		    	const winW=document.body.clientWidth;
		    	const halfwin=winW/3;
		    	var endposx=e.changedTouches[0].pageX;
		    	var moveX=endposx-this.touch.startX;

		    	if(this.currentshow=="cd"){
		    		if(Math.abs(moveX)>=halfwin && moveX<0){
		    			this.$refs.playaniright.style.transform="translateX(-"+winW+"px)";
			    		this.$refs.playanileft.style.opacity=0;
			    		this.currentshow="music";
			    		var spanf=document.querySelector(".pageother span.f");
			    		var spans=document.querySelector(".pageother span.s");
			    		spanf.className="f";
			    		spans.className="s active";
		    		}else{
		    			this.currentshow="cd";
			    		this.$refs.playaniright.style.transform="translateX(0px)";
			    		this.$refs.playanileft.style.opacity=1;
		    		}
		    	}else if(this.currentshow=="music"){
		    		if(Math.abs(moveX)>=halfwin && moveX>0){
		    			this.currentshow="cd";
			    		this.$refs.playaniright.style.transform="translateX(0px)";
			    		this.$refs.playanileft.style.opacity=1;

			    		var spanf=document.querySelector(".pageother span.f");
			    		var spans=document.querySelector(".pageother span.s");
			    		spanf.className="f active";
			    		spans.className="s";
		    		}else{
		    			this.$refs.playaniright.style.transform="translateX(-"+winW+"px)";
			    		this.$refs.playanileft.style.opacity=0;
			    		this.currentshow="music";
		    		}
		    	}
		    },
		    scroll(pos){
		    	// console.log(pos.y)
		    },
		    ready(){		   //防止快速点击的

		    },
		    updateTime(e){		//监听播放的
		    	this.currentTime=e.target.currentTime;
		    },
		    ended(){			//播放结束时事件		

		    },
		    progressclick(e){

		     	const widthAll=this.$refs.progressall.clientWidth;
			    const dotwid=this.$refs.progresswid.clientWidth;
				const leaveWid=widthAll-dotwid;
				
				let clickX=e.offsetX;
				if(clickX>=leaveWid){
					clickX=leaveWid
				}

				const percent=parseFloat(clickX/leaveWid);
				this.$refs.audio.currentTime=parseFloat(this.duration*percent);
				this.currentTime=parseFloat(this.duration*percent);
		    },
		    progressStart(e){
		    	this.progressTouch.startX1=e.touches[0].pageX;
		    	this.progressTouch.spanLen=this.$refs.progressSpan.clientWidth;

		    },
		    progressMove(e){
		    	const widthAll=this.$refs.progressall.clientWidth;
			    const dotwid=this.$refs.progresswid.clientWidth;
				const leaveWid=widthAll-dotwid;


				this.progressTouch.startX2=e.touches[0].pageX;
				var moveX=this.progressTouch.startX2-this.progressTouch.startX1;

				var spanX=Math.max(0,Math.min(leaveWid,parseFloat(moveX)+parseFloat(this.progressTouch.spanLen)));

				const percent=parseFloat(spanX/leaveWid);
				this.$refs.audio.currentTime=parseFloat(this.duration*percent);
				this.currentTime=parseFloat(this.duration*percent);
		    },
		    progressEnd(e){	
		    	//不处理
		    },
		    _progressoffset(offsetX){
		    	this.$refs.progressSpan.style.width=`${offsetX}px`;
		    },
		    getLyric(singmid){
		    	Lyric.getLyric(singmid).then(data=>{
		    		var ci=data.lyric;
		    		ci=base64.Base64.decode(ci);
		    		this.currentLyric=new LyricCi(ci,this.handleLyric);
		    		if(this.isplay){
		    			this.currentLyric.play();		    			
		    		}

		    	})
		    },
		    handleLyric({lineNum,txt}){
		    	this.currentLineNum=lineNum;

		    	if(this.currentLineNum>5){
		    		this.$refs.lyriclist.scrollToElement(this.$refs.lyricLine[lineNum-5],1000);
		    	}else{
		    		this.$refs.lyriclist.scrollTo(0,0,1000);
		    	}
		    	this.playingLyric=txt;
		    },
		    menuchoosesong(index){	//menu弹出菜单 点击选择歌曲
		    	this.changeCurrentIndex(index+1);
		    	this.changeplaying(true);
		    	this.$refs.menuul.scrollToElement(this.$refs.menuli[index],500);
		    },
		    presong(){		//前一首歌
		    	var currentIndex=this.currentIndex;
		    	currentIndex--;
		    	if(currentIndex<=0){
		    		currentIndex=1;
		    	}
		    	this.changeCurrentIndex(currentIndex);
		    	this.changeplaying(true);		//播放
		    //	this.$refs.progressSpan.style.width=0;
		    },
			nextsong(){			//下一首歌
				var playlistlen=this.playList.list.length;
		    	var currentIndex=this.currentIndex;
		    	var playOrder=this.playList.playOrder;     //0(顺序) 1(随机) 2(单曲)
		    	if(playOrder==1){		//随机
		    		currentIndex=parseInt(Math.random()*(playlistlen-1+1)+1,10);
		    	}else{  //单曲循环也是顺序播放的顺序
			    	currentIndex++;
			    	if(currentIndex>=playlistlen){
			    		currentIndex=playlistlen;
			    	}
		    	}
		    	this.changeCurrentIndex(currentIndex);
		    	this.changeplaying(true);		//播放

		    //	this.$refs.progressSpan.style.width=0;
			},	
			changePlayMode(){		//'改变播放的模式
				var playMode=this.playList.playOrder;
				var mode=[0,1,2];
				playMode++;
				if(playMode>2){
					playMode=0;
				}
				this.playList.playOrder=playMode;
				this.changePlayList(this.playList);
			},
			deleteplayList(){		//清空播放列表
				this.playList.list=[];
				this.changePlayList(this.playList);
				this.menuisopen();
			}, 
			deleteandplay(index){
				var currentIndex=this.currentIndex;
				var clickIndex=index+1;
				if(clickIndex<currentIndex){  //在歌曲的上面
					this.playList.list.splice(index,1);
					this.changeCurrentIndex(this.currentIndex-1);
				}else if(clickIndex==currentIndex){
					this.playList.list.splice(index,1);
				}else{
					this.playList.list.splice(index,1);
				}
				this.changePlayList(this.playList);
			},
		    enter(el, done) { // vue transition 动画钩子
		        const {x, y, scale} = this._getPosAndScale()

		        let animation = {
		          0: {
		            transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
		          },
		          60: {
		            transform: `translate3d(0,0,0) scale(1.1)`
		          },
		          100: {
		            transform: `translate3d(0,0,0) scale(1)`
		          }
		        }

		        animations.registerAnimation({
		          name: 'move',
		          animation,
		          presets: {
		            duration: 400,
		            easing: 'linear'
		          }
		        })
		        animations.runAnimation(this.$refs.cdWrapper, 'move', done)
		    },
		    afterEnter() {
		        animations.unregisterAnimation('move')
		        this.$refs.cdWrapper.style.animation = ''
		    },
		    leave(el, done) {
		        this.$refs.cdWrapper.style.transition = 'all 0.4s'
		        const {x, y, scale} = this._getPosAndScale()
		        this.$refs.cdWrapper.style["transform"] = `translate3d(${x}px,${y}px,0) scale(${scale})`
		       this.$refs.cdWrapper.addEventListener('transitionend', done)
		    },
		    afterLeave() {
		        this.$refs.cdWrapper.style.transition = ''
		        this.$refs.cdWrapper.style["transform"] = ''
		    },
		      // vue transition 动画钩子结束

		      // 获取动画起始位置
		    _getPosAndScale() {
		        // 左下角小图片初始位置
		        const targetWidth = 40
		        const paddingLeft = 40
		        const paddingBottom = 30
		        // 中间大图片距离顶部位置
		        const paddingTop = 80
		        // 中间图片宽度
		        const width = window.innerWidth * 0.8
		        // 缩放尺度
		        const scale = targetWidth / width
		        const x = -(window.innerWidth / 2 - paddingLeft)
		        const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
		        return {
		          x,
		          y,
		          scale
		        }
		    },


		},
		components:{
			scroll,
		}
	}




</script>
<style scoped>
.fullscreen{
	background:#333;
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
	padding:0px 1rem;
}
.playtit p span{
	display:block;
	white-space:nowrap;
	text-overflow:ellipsis;
	overflow:hidden;
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
	white-space:nowrap;
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
.playcon-control span.favoriteC{color:red;}

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
	text-align:center;
	white-space:nowrap;
	font-size:0px;
}
.playanimal-l,.playanimal-r{
	width:100%;
	display:inline-block;
	transition:all 0.5s;
	vertical-align:middle;
}
.playanimal-l img{
	width:5rem;
	height:5rem;
	overflow:hidden;
	border-radius:50%;
	margin-top:0.1rem;
}
.playanimal-l img.noactive{
	animation: xunhuan 5s linear infinite;
    -webkit-animation: xunhuan 8s linear infinite;
}
.playanimal-l p{
	margin-top:1rem;
	font-size:0.36rem;
}
.playanimal-r p{
	font-size:0.36rem;
	margin-bottom:0.2rem;
}
.playanimal-r p.active{color:#fff;}
.playanimal-r p:last-child{
	margin-bottom:0px;
}

.normal-enter-active,.normal-leave-active{
	transition:all 0.4s;
}
.normal-enter-active .topdown,.normal-leave-active .topdown{
	transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
}
.normal-enter-active .bottomup,.normal-leave-active .bottomup{
	transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
}

.normal-enter,.normal-leave-active{
	opacity:0;
}
.normal-enter .topdown,.normal-leave-active .topdown{
	transform: translate3d(0, -100px, 0)
}
.normal-enter .bottomup,.normal-leave-active .bottomup{
	transform: translate3d(0, 100px, 0)
}


.menu-con-fix{
	position:fixed;
	top:0px;
	bottom:0px;
	left:0px;
	right:0px;
	background:rgba(0,0,0,0.3);
	z-index:3;
}
.menu-con{
	position:absolute;
	bottom:0px;
	left:0px;
	right:0px;
	background:#333;
	padding:0.2rem 0.3rem 0px;
}
.menu-tit{
	align-items: center;
	margin:0.15rem 0px 0.4rem;
}
.menu-tit span{
	font-size:0.4rem;
}
.menu-tit span:first-child{
	font-size:0.5rem;
	color:yellow;
}
.menu-tit span.s{
	flex:1;
	-webkit-flex:1;
	margin:0px 0.25rem;
	font-size:0.36rem;
}
.menu-list{
	height:5rem;
	overflow:hidden;
}
.menu-list li{
	align-items: center;
	margin-bottom:0.45rem;
}
.menu-list li:last-child{
	margin-bottom:0px;
}
.menu-list li p.m{
	flex:1;
	-webkit-flex:1;
	margin-left:0.1rem;
	margin-right:0.2rem;
	white-space:nowrap;
	font-size:0.34rem;
	overflow:hidden;
	text-overflow:ellipsis;
}
.menu-list li p.r{
	display:flex;
	width:1rem;
	justify-content:space-between;
	color:yellow;
	font-size:0.34rem;
}
.menu-list li p.r .favoriteC{
	color:red;
}
.menu-bottom p.f span{
	display:inline-block;
	padding:6px 25px;
	border-radius:30px;
	border:1px solid #fff;
	margin:0.4rem;
}
.menu-bottom p.s{
	margin:0px -0.3rem;
	background:#222;
	padding:0.25rem 0px;
}
.menuAni-enter,.menuAni-leave-active{
	opacity:0;
}
.menuAni-enter-active,.menuAni-leave-active{
	transition:all 0.3s ease;
}
.menuAni-enter .menu-con,.menuAni-leave-active .menu-con{
	transform:translateY(100%);
}
.menuAni-enter-active .menu-con,.menuAni-leave-active .menu-con{
	transition:all 0.3s ease;
}
</style>
