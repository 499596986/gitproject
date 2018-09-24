<template>
	<div id="news-detail">
		<headers tit="汇全保保险资讯详情" :leftshow="true"></headers>
		<div class="news-con mart100 padlr20">
			<h2 class='text-center'>{{currentNews.tit}}</h2>
			<p class="subtit">{{currentNews.subtit}}</p>
			<div class="main-text">
				<div class="sort-main-text" v-for="(item,index) in currentNews.textArr">
					<h2 class='main maintit' v-if="item.tit">{{item.tit}} </h2>
					<p class="main" v-if="item.con">{{item.con}}</p>
					<img :src="item.imgurl" alt="" v-if="item.imgurl"  class="mart40 marb40">
				</div>
			</div>
		</div>
		<div class="bxnews newsdetail-bxnews mart60">
			<h2 class="h2tit marlr20">相关推荐<a href="javascript:void(0)" @click="$router.push('/newslist')">更多<em>></em></a></h2>
			<div class="bxnews-box marlr20">
				<a class="bx-list clearfix" v-for="item in indexbxinfomation" @click="$router.push('/newsdetail/'+item.id)">
					<img :src="item.img" alt="">
					<div class="bx-list-right">
						<h3>{{item.tit}}</h3>
						<p>{{item.subtit}}</p>
					</div>
				</a>
			</div>
		</div>
	</div>
</template>
<script>
	import headers from "../components/header.vue";
	import {bxinfomation} from "../mock/ajax.js";
	import {mapState} from "vuex"
	export default{
		data(){
			return {
				currentNews:{},
				indexbxinfomation:[]
			}
		},
		created(){
			this.getdata();
			var data4=bxinfomation().data;
			this.indexbxinfomation=[data4[0],data4[1]]
		},
		watch:{
			"$route"(){
				this.getdata();
			}
		},
		methods:{
			getdata(){
				var that=this;
				var cuttentId=this.$route.params.id;
				var currentData=bxinfomation().data;
				currentData.forEach(function(item,index){
					if(item.id==cuttentId){
						that.currentNews=item;
						return;
					}	
				})
			}
		},
		components:{
			headers
		}
	}
</script>
<style lang="less">
.news-con {
	color:#303030;
	>h2{font-size:0.36rem;}
	.subtit{margin-top:0.3rem;text-indent:0.4rem;}
	.main-text{
		.main{text-indent:0.4rem;}
		.maintit{margin:0.35rem 0px;color:#000;font-weight:bold;}
	}
}
.newsdetail-bxnews{
	border-top:0px !important;
}
</style>