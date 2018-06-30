<template>
	<div id="noResult" class="text-center">
		<img src="../../static/images/noResult.png" alt="">
		<p>{{text}}</p>
	</div>
</template>
<script>
	export default{
		props:["text"]
	}
</script>
<style scoped>
	#noResult{
		position:absolute;
		top:50%;
		left:0px;
		right:0px;
		transform:translateY(-50%);
		-webkit-transform:translateY(-50%);
	}
	#noResult img{
		width:86px;
		height:90px;
	}
	#noResult p{
		font-size:0.34rem;
		margin-top:0.4rem;
	}
</style>