<template>
	<div id="news-list">
		<headers tit="汇全保保险资讯" :leftshow="true" :rightshow="false"></headers>
		<div class="answer-con mart100">
			<div class="bxnews-box marlr20 bxnews">
				<a class="bx-list clearfix" v-for="item in currentNews" @click="$router.push('/newsdetail/'+item.id)">
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
<script >
	import headers from "../components/header.vue";
	import {bxinfomation} from "../mock/ajax.js";

	export default{
		data(){
			return {
				currentNews:[]
			}
		},
		created(){
			this.currentNews=bxinfomation().data;
		},
		components:{
			headers
		}
	}
</script>
<style lang="less" scoped>

.bxnews{
	border-top:0px !important;
}
</style>