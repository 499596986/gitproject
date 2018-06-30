<template>
	<div id="singer" class="topbottom" style="overflow:hidden;">
		<scroll v-on:scroll="scroll" :listenScroll="true" :probeType="3">
			<div class="singer-wrapper" ref="content">
				<div class="singer-list singer-list-pad" ref="listGroup">
				       <h2>热门</h2>
				       <div class="singer-list" v-for="(item,index) in hotList">
							<div class="singer-detail" v-on:click="$router.push('/singer/'+item.Fsinger_mid+'')">
								<div class="singer-detail-list" >
									<img :src="'https://y.gtimg.cn/music/photo_new/T001R150x150M000'+item.Fsinger_mid+'.jpg'" alt="">
									<p>{{item.Fsinger_name}}</p>
								</div>
							</div>
						</div>
				</div>


				<div class="singer-list singer-list-pad" v-for="(item,index) in sortList" ref="listGroup1">
				       <h2>{{index}}</h2>
						<div class="singer-detail" v-for="(itemArr,itemIndex) in item">
							<div class="singer-detail-list" v-on:click="$router.push('/singer/'+itemArr.Fsinger_mid+'')">
								<img :src="'https://y.gtimg.cn/music/photo_new/T001R150x150M000'+itemArr.Fsinger_mid+'.jpg'" alt="">
								<p>{{itemArr.Fsinger_name}}</p>
							</div>
						</div>
				</div> 

			</div>
		</scroll>

		<!-- <div class="index-list-nav" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
			      <ul>
			        <li v-for="(item, index) in shortcutList" :data-index="index" :class="{active: currentIndex === index}">{{item}}</li>
			      </ul>
		</div>-->

	    <div class="index-list-fixed" ref="fixed" v-show="fixedTitle">
	      {{fixedTitle}}
	    </div>  



		<transition :name="transitionName">
			<router-view></router-view>
		</transition>
	</div>
</template>
<script>
//import BScroll  from "better-scroll";
import  singFun from "../api/singer.js"
import  scroll from "../plugins/betterscroll/scroll/scroll.vue"
export default{
	data(){
		return {
			singList:[],
			sortList:{},   //数组排序
			sort:["热门","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","W","X","Y","Z"],
			hadsort:{"热门":1},      //数据有的tit 
			transitionName:"",
			shortcutList:["热门"],   //右边字母
			scrollY:-1,
			diff:-1

		}
	},
	created(){
		this.listHeight=[];
		this.currentIndex=0;
	},
	mounted:function(){
		var that=this;
		singFun.getSingerList().then(res=>{
			this.singList=res.data.list;
			that.sortListF();
			this.$nextTick(function(){
				this._calculateHeight();
			})
		})
	},
	watch:{
		"$route"(to,from){
			var toPath=to.path.split("/").length;
			var fromPath=from.path.split("/").length;
			this.transitionName=toPath<fromPath?"slide-right":"slide-left";
		},
		scrollY(newY){   //监听滚动
			var listHeight=this.listHeight;
			for(var i=0;i<listHeight.length;i++){
				var height1=listHeight[i];
				var height2=listHeight[i+1];
				if(newY>height1 && newY<height2){
					this.currentIndex=i;
					this.diff=height2-newY;
				}
			}
		},
		diff(newVal){	//在本身框内剩余的高度
			let fixedTop=(newVal>0 && newVal<33)?(newVal-33):0;
			this.$refs.fixed.style.transform=`translate3d(0,${fixedTop}px,0)`;
		}
	},
	computed:{
		fixedTitle(){
			if(this.scrollY<0){
				return "";
			}
			var hadsort=this.hadsort;
			var returnsort=[];
			for(var key in hadsort){
				returnsort.push(key);
			}
			return returnsort[this.currentIndex]?returnsort[this.currentIndex]:"";
		},
		hotList(){
			return this.singList.slice(0,10);
		}
	},
	methods:{
		sortListF(){		//列表
			var that=this;
			that.sort.map(function(itemS,indexS){
				if(indexS>=1){
					var flag=0;
					var arr=[];
					that.singList.map(function(item,index){
						if(itemS==item.Findex){
							flag=1;
							arr.push(item);
							that.hadsort[itemS]=1;
						}
					})
					if(flag!=0){
						that.sortList[itemS]=arr;
						arr=[];
						that.shortcutList.push(itemS);
					}
				}
			})
		},
		scroll:function(pos){
           this.scrollY=-pos.y; 
		},
		_calculateHeight(){
			var that=this;
			var listHeight=this.$refs.listGroup.clientHeight;
			var list1=this.$refs.listGroup1;
			if(!list1){
				return;
			}
			that.listHeight=[];
			that.listHeight.push(0);
			that.listHeight.push(listHeight);
			var height=parseFloat(listHeight);

			for(let i=0;i<list1.length;i++){
				let item = list1[i]
	            height += parseFloat(item.clientHeight);
	            that.listHeight.push(height)
			}
		}
	},
	components:{
		scroll
	}
}
</script>
<style scoped>
	.singer-content{
		width:100%;
		height:100%;
	}
	.singer-list-pad{
		padding-bottom:0.35rem;
	}
	.singer-list h2{
		background:#333;
		padding:0.15rem 0.35rem;
		text-align:left;
		padding-top:0px;
		padding-bottom:0px;
		height:35px;
		line-height:35px;
	}
	.singer-detail{
		padding:0px 0.35rem;
	}
	.singer-detail-list{
		display:flex;
		display:-webkit-flex;
		align-items:center;
		margin:0.35rem 0px;
	}
	.singer-detail-list:last-child{
		margin-bottom:0px;
	}
	.singer-detail-list img{
		width:1rem;
		height:1rem;
		border-radius:50%;
		overflow:hidden;
		margin-right:0.35rem;
		margin-left:0.15rem;
	}

	.slide-left-enter{
		transform:translateX(100%);
	}
	.slide-left-enter-active,.slide-left-leave-active{
		transition:all 0.3s;
	}
	.slide-left-leave-active{
		transform:translateX(100%);
	} 


	.index-list-fixed{
		position:absolute;
		top:0rem;
		left:0px;
		right:0px;
		height:33px;
		line-height:33px;
		z-index:2;
		background:#333;
		padding:0px 0.35rem;
		font-size:0.28rem;
	}

	/* .slide-left-enter, .slide-right-leave-active {
	  -webkit-transform:translateX(100%);
	  transform:translateX(100%);
	  opacity:0;
	}
	.slide-left-leave-active, .slide-right-enter {
	  opacity: 0;
	  -webkit-transform: translateX(-100%);
	  transform: translateX(-100%);
	}
	.slide-left-enter-active,.slide-right-enter-active {
	    -webkit-transition: all .3s ease;
	    transition: all .3s ease;
	}
	.slide-left-leave-active,.slide-right-leave-active {
	     -webkit-transition: all .3s ease;
	    transition: all .3s ease;
	} */

</style>