<template>
	 <transition name="slide">
		<div id="user">
			<header class="flex user-header">
				<span class="back fa fa-angle-left" v-on:click="$router.go(-1)"></span>
				<div class="listen-sing flex">
					<span class="active">我喜欢的</span>
					<span>最近听的</span>
				</div>
				<span></span>
			</header>
			<div class="randomPlay text-center">
				<span><em class="fa fa-play-circle-o"></em>随机播放全部</span>
			</div>
			<div class="randomOrstore">
				<div class="store-list">
					 <ul>
					 	<li>
					 		<p>体面</p>
					 		<p>于文文-体面</p>
					 	</li>
					 	<li>
					 		<p>意外(Live)</p>
					 		<p>薛之谦/大张伟 金曲捞 第12期</p>
					 	</li>
					 </ul>
				</div>
				<div class="random-list">
					<ul>
					 	<li>
					 		<p>体面</p>
					 		<p>于文文-体面</p>
					 	</li>
					 	<li>
					 		<p>意外(Live)</p>
					 		<p>薛之谦/大张伟 金曲捞 第12期</p>
					 	</li>
					 </ul>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	import noresult from "../components/noResult";
export default{

}
</script>
<style scoped>
	#user{
		position:fixed;
		top:0px;
		bottom:0px;
		left:0px;
		right:0px;
		background:#222;
		z-index:2;
	}
	.user-header{
		margin:0.15rem 0px;
	}
	.user-header>span{
		display:inline-block;
		width:0.8rem;
		font-size:0.8rem;
		text-align:center;
		line-height:0.8rem;
	}
	.listen-sing{
		flex:1;
		-webkit-flex:1;
		border:1px solid #333;
	}
	.listen-sing span{
		flex:1;
		-webkit-flex:1;
		text-align:center;
		height:0.8rem;
		line-height:0.8rem;
		color:rgba(255,255,255,0.3);
	}
	.listen-sing span.active{
		color:#fff;
		background:#333;
	}
	.randomPlay span{
		display:inline-block;
		padding:0.1rem 0.3rem;
		border-radius:89%;
		font-size:0.3rem;
		margin:0.3rem 0px;
		border:1px solid #fff;
		border-radius:50px;
	}
	.randomPlay span em{
		font-size:0.4rem;
		display:inline-block;
		margin-right:0.15rem;
		position:relative;
		top:0.02rem;
	}

	.randomOrstore{
		margin-top:0.15rem;
		padding:0px 0.5rem;
	}
	.randomOrstore li{
		margin-top:0.25rem;
	}
	.randomOrstore li p{
		font-size:0.34rem;
		color:#333;
		line-height:0.5rem;
	}
	.randomOrstore li p:first-child{
		color:#fff;
	}



	.slide-enter,.slide-leave-active{
		transform:translateX(100%);
	}
	.slide-enter-active,.slide-leave-active{
		transition:all 0.3s;
	}

</style>