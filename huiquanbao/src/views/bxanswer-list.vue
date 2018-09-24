<template>
	<div id="bxanswer-list">
		<headers tit="保险问答" :leftshow="true" :rightshow="false"></headers>
		<div class="answer-con mart100">
			<div class="answer-area" v-for="(item,index) in currentQuestion">
				<h2>
					<span class="f c-nowrap">{{item.question}}</span>
					<span class="s">{{item.answer.length}}个回答</span>
				</h2>
				<p class="text">{{item.answer[0].text}}</p>
				<p class="name text-right">{{item.answer[0].name}}</p>
			</div>

		</div>
	</div>
</template>
<script>
	import headers from "../components/header.vue";
	import { bxquestion } from "../mock/ajax.js";
	export default{
		data(){
			return {
				currentQuestion:[]
			}
		},
		created(){
			this.currentQuestion=bxquestion().data;
			console.log(this.currentQuestion)
		},
		components:{
			headers,
		}
	}
</script>
<style lang="less" scoped>
.answer-area{
	border-bottom:0.15rem solid #EFEFEF;
	padding:0px 0.25rem;
	color:#000;
	font-size:14px;
	&:last-child{border-bottom:0px;}
	h2{
		font-size:0;
		border-bottom:1px solid #ddd;
		padding:0.2rem 0px;
		span.f{font-size:0.32rem;color:#0390f8;width:80%;display:inline-block;vertical-align:middle;}
		span.s{font-size:0.26rem;color:#999;width:20%;display:inline-block;vertical-align:middle;text-align:right;}	
	}
	.text{
		margin:0.2rem 0px;
	}
	.name{padding-bottom:0.2rem;}
}
</style>

