<template>
	<div id="firstpage">
		<div class="firstpage-header">
			<h2 class="text-center">数据统计</h2>
			<div >
				<p>
					<span>当日数据：</span>
					<span><em>10</em>新增用户</span>
					<span><em>1</em>新增用户</span>
					<span><em>15</em>新增管理员</span>
				</p>
				<p class="sec">
					<span>总数据：</span>
					<span><em>13260</em>注册用户</span>
					<span><em>5314</em>订单</span>
					<span><em>20012</em>管理员</span>
				</p>
			</div>
		</div>
		<div class="firstpage-con">
			
		</div>
	</div>

</template>
<script>
	import mixin from "../mixins/mixin.js";
	export default{
		mixins:[mixin],
	}
</script>
<style lang="less" scoped>
	.firstpage-header{
		h2{
			font-size:28px;
			color:#000;
		}
		p{
			margin-top:10px;
			span{
				display:inline-block;
				margin-right:8px;
				width:200px;
				padding:5px 0px;
				background:#e5e9f2;
				color:#666;
				border-radius:6px;
				text-align:center;
				&:first-child{
					background:#ff9800;
					color:#fff;
					font-size:20px;
				}
				em{
					font-size:25px;
					color:#000;
				}
			}
			&.sec span:first-child{
				background:#20a0ff;
				color:#fff;
			}
		}
	}
</style>
