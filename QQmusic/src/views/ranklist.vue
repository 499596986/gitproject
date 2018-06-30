<template>
	<div id="ranklist" class="topbottom">
		<scroll>
			<div class="ranklist-con">
				<div class="tanklist-detail" v-for="(item,index) in rankList" v-on:click="$router.push('/ranklist/'+item.id+'')">
					<img :src="item.picUrl" alt="">
					<div class="tanklist-text">
						<p v-for="(itemS,indexS) in item.songList">{{indexS+1}}、{{itemS.songname}}-{{itemS.singername}}</p>
					</div>
				</div>
			</div>
		</scroll>
		<transition name="slide-left">
			 <router-view></router-view>
		</transition>
	</div>
</template>
<script>
import rankF from "../api/rank.js";
import scroll from "../plugins/betterscroll/scroll/scroll.vue";
export default{
	data(){
		return {
			rankList:[]
		}
	},
	mounted:function(){
		rankF.getTopList().then(res=>{
			this.rankList=res.data.topList;
		})
	},
	components:{
		scroll
	}
}
</script>
<style scoped>
	.ranklist-con{width:100%;height:100%;}
	.tanklist-detail{
		padding:0.3rem;
		display:flex;
		display:-webkit-flex;
	}
	.tanklist-detail img{
		width:2rem;
		height:2rem;
	}
	.tanklist-text{
		padding:0.25rem;
		background:#333;
		font-size:0.28rem;
		text-align:left;
		flex:1;
		-webkit-flex:1;
		padding-top:0.05rem;
		padding-left:0.35rem;
	}
	.tanklist-text p{
		margin-top:0.16rem;
		white-space:nowrap;
		text-overflow:ellipsis;
		overflow:hidden;
		width:4.2rem;
	}

	.slide-left-enter,.slide-left-leave-active{
		transform:translateX(100%);
	}
	.slide-left-enter-active,.slide-left-leave-active{
		transition:all 0.3s;
	}
</style>