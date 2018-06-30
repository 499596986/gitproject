<template>
	<div id="search">
		<div class="search-input fd-locate">
			<span class="search-logo fa fa-search">
				
			</span>
			<input type="text" placeholder="搜索歌曲、歌手">
			<span class="search-close fa fa-close"></span>
		</div>
		<div class="hot-search">
			<div class="search-singer">
				<h2>热门搜索</h2>
				<div class="search-sort">
					<span v-for="(item,index) in hotSearch" v-if="index<8">{{item.k}}</span>
				</div>
			</div>
			<div class="search-history ">
				<h2>搜索历史<span class="fa fa-trash-o" v-on:click="clearHistory()"></span></h2>
				<div class="search-history-list">
					<div class="hisroty-list">
						<p>我们不一样 <span  class="fa fa-close"></span></p>
						<p>我们不一样 <span  class="fa fa-close"></span></p>
					</div>
				</div>
			</div>
		</div>
		<div class="search-result fd-hide">
			<div class="search-result-con">
				<ul>
					<li><span class="fa fa-music"></span>最美的地方地方地方大dfdfddfdf幅度期待-地方</li>
					<li><span class="fa fa-music"></span>最美的地方地方地待-地方</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import  searchFun from "../api/search.js";

import {mapMutations} from "vuex";

export default{
	data:function(){
		return {
			hotSearch:[]
		}
	},
	mounted:function(){
	
	},
	created(){
		var that=this;
		searchFun.getHotKey().then(data=>{
			that.hotSearch=data.data.hotkey;
		})
	},
	methods:{
		...mapMutations({
			changeSearchHistory:'changeSearchHistory(-1)'
		})
		
	}
}
</script>
<style scoped>
	#search{
		padding:0px 0.3rem;
	}
	.search-input{
		margin:0.3rem 0px;
	}
	.search-logo{
		display:inline-block;
		width:;
	}
	.search-input span{
		display:inline-block;
		position:absolute;
		top:0.26rem;
		left:0.25rem;
		font-size:0.3rem;
	}
	.search-input span.search-close{
		left:auto;
		right:0.3rem;
	}
	.search-input input{
		padding-left:0.8rem;
		padding-right:0.8rem;
		height:0.8rem;
		background:#333;
		font-size:0.26rem;
		width:100%;
		border:0px;
		border-radius:6px;
	}

	.hot-search{
		padding:0px 0.25rem;
		text-align:left;
	}
	.search-singer h2{
		font-size:0.34rem;
		margin-bottom:0.15rem;
	}
	.search-sort span{
		display:inline-block;
		padding:0.1rem 0.2rem;
		background:#333;
		margin-right:0.2rem;
		border-radius:5px;
		margin-top:0.2rem;
		font-size:0.32rem;
	}
	.search-history{
		margin-top:1rem;
	}
	.search-history h2{
		font-size:0.34rem;
		margin-top:0.4rem;
		margin-bottom:0.3rem;
	}
	.search-history h2 span{
		float:right;
		font-size:0.4rem;
		margin-top:0.05rem;
	}
	.hisroty-list p{
		margin-bottom:0.3rem;
		font-size:0.34rem;
	}
	.hisroty-list p span{
		font-size:0.4rem;
		float:right;
		margin-top:0.05rem;
	}


	.search-result{
		padding:0px 0.25rem;
		position:absolute;
		bottom:0px;
		top:3.2rem;
		left:0px;
		right:0px;
	}
	.search-result ul li{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	    font-size:0.34rem;
	    padding:0.1rem 0px;
	}
	.search-result ul li span{
		display:inline-block;
		font-size:0.36rem;
		margin-right:0.2rem;
	}
</style>