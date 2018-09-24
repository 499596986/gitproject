<template>
	<div id="product-list">
		<div class="aside" :class="{active:moveleft}">
			<filterproduct v-on:changedata="data()"></filterproduct>
		</div>
		<div class="main" :class="{active:moveleft}">
			<headers tit="汇全保-保险产品列表" leftshow="true" rightshow="true" :moveleft="moveleft" v-on:buttonclick="buttonclick"></headers>
			<div class="product-con marl20 marr20 mart100">
				<a class="bx-list" v-for="(item,index) in allbxproduct"  @click="$router.push('/productdetail/'+item.numid)">
					<img :src="item.img" alt="">
					<div class="bx-list-right">
						<h3>{{item.tit}}</h3>
						<p>{{item.subtit}}</p> 
						<span>{{item.type}}</span>
					</div>
				</a>
			</div>
			<div class="background-drop" v-show="moveleft" @click="backgrounddropclick"></div>
		</div>
	</div>
</template>
<script>
import headers from "../components/header.vue";
import filterproduct from "../components/filterCondition.vue";
import {bxproduct} from "../mock/ajax.js";
import {mapState,mapMutations} from "vuex";

	export default{
		data(){
			return {
				moveleft:false
			}
		},
		created(){
			this.data();
		//	$("body,html").scrollTop(0)
			
		},
		computed:{
			...mapState({
				allbxproduct:state=>state.allbxproduct
			})
		},
		methods:{
			...mapMutations([
				"changeallbxproduct"
			]),
			buttonclick(){
				if(this.moveleft){
					this.moveleft=false;
				}else{ this.moveleft=true}
			},
			backgrounddropclick(){
				this.moveleft=false;
			},
			data(){
				var productdata=bxproduct().data;
				var newarr=[];
				productdata.forEach(function(item,index){
					item.data.forEach(function(item2,index2){
						newarr.push(item2);
					})
				})
				
				Array.prototype.shuffle = function() { 
				for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x); 
				return this; 
				}; 

				newarr=newarr.shuffle();  //打乱数组
				this.changeallbxproduct(newarr);

				this.moveleft=false;
			}
		},
		components:{
			headers,
			filterproduct
		}
	}
</script>
<style lang="less" scoped>
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