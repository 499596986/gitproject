<template>
	<div id="agent-list">
		<div class="aside" :class="{active:moveleft}">
			<filterproduct v-on:changedata="data()"></filterproduct>
		</div>
		<div class="main" :class="{active:moveleft}">
			<headers tit="汇全保顾问" :leftshow="true" :rightshow="true" :moveleft="moveleft" v-on:buttonclick="buttonclick"></headers>
			<div class="agent-con mart100">
				<div class="agent-area" v-for="(item,index) in currentAgent">
					<img :src="item.img" alt="">
					<div class="right">
						<h2>{{item.name}}<button v-on:click="changeformflag">咨询</button></h2>
						<p class="tit">{{item.company}} | {{item.address}}</p>
						<p class="list">
							<span v-for="(item2,index2) in item.product">{{item2}}</span>
						</p>
					</div>
				</div>
			</div>
			<div class="background-drop" v-show="moveleft" @click="backgrounddropclick"></div>
		</div>
	</div>
</template>
<script>
import headers from "../components/header.vue";
import {bxagent} from "../mock/ajax.js";
import filterproduct from "../components/filterCondition.vue";
import {mixin} from "../mixins/index.js";

export default{
	mixins:[mixin],
	data(){
		return {
			currentAgent:{},
			moveleft:false
		}
	},
	created(){
		this.data();
	},
	components:{
		headers,
		filterproduct
	},
	methods:{
		buttonclick(){
			if(this.moveleft){
				this.moveleft=false;
			}else{ this.moveleft=true}
		},
		backgrounddropclick(){
			this.moveleft=false;
		},
		data(){
			this.currentAgent=bxagent().data;
			Array.prototype.shuffle = function() { 
			for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x); 
			return this; 
			}; 
			this.currentAgent=this.currentAgent.shuffle();
			this.moveleft=false;
		}
	}
}
</script>
<style lang="less" scoped>
.agent-area{
	padding:0.3rem 0.25rem;
	display:flex;
	display:-webkit-flex;
	position:relative;
	>img{
		width:2rem;
		height:2rem;
		border-radius:50%;
		margin-right:0.2rem;
	}
	>.right{
		flex:1;
		-webkit-flex:1;
		h2{
			color:#000;
			font-size:0.34rem;
			button{
				float:right;
				border:0px;
				background:#448ef6;
				color:#fff;
				padding:5px 0.55rem;
				border-radius:5px;
			}
		}
		.tit{
			color:#808080;
			margin-top:0.25rem;
			margin-bottom:0.25rem;
			font-size:0.26rem;
		}
		.list span{
			display:inline-block;
			margin-right:0.15rem;
			color:#448ef6;
			border:1px solid #448ef6;
			border-radius:4px;
			padding:4px 0.2rem;
		}
	}
	&:after{
		position:absolute;
		content:"";
		bottom:0px;
		left:0.2rem;
		right:0.2rem;
		height:1px;
		background:#ddd;
	}
}

.aside{
	position:fixed;
	top:0px;
	right:0px;
	bottom:0px;
	width:70%;
	transform:translateX(100%);
	-webkit-transform:translateX(100%);
	-ms-transform:translateX(100%);
	transition:all 0.3s;
	&.active{
		transform:translateX(0);
		-webkit-transform:translateX(0);
		-ms-transform:translateX(0);
	}
}

.main{
	position:relative;
	left:0%;
	transition:all 0.3s;
	&.active{
		left:-70%;
	}
}
.background-drop{
	position:absolute;
	top:-1rem;
	bottom:0px;
	left:0px;
	right:0px;
	background:transparent;
	z-index:11;
}
</style>