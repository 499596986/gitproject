<template>
	<div id="ruler">
		<h2 class="ruler-tit text-center"><b>管理员信息</b></h2>
		<div class="ruler-con">
			<p>姓名：</p>
			<p>注册时间：</p>
			<p>管理员权限：</p>
			<p>管理员ID:</p>
			<p>更换头像：</p>
		</div>
	</div>
</template>
<script>
	export default{

	}
</script>
<style lang="less" scoped>
#ruler{
	color:#525252;
}
.ruler-tit{
	font-size:23px;
	margin-bottom:20px;
}
.ruler-con{
	background:#F9FAFC;
	width:50%;
	margin:0px auto;
	padding:15px;
	border-radius:5px;
	p{
		margin-bottom:40px;
		white-space:nowrap;
		font-size:18px;
	}
	p:last-child{
		margin-bottom:0px;
	}
}




</style>