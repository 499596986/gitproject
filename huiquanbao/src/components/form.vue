<template>
	<div id="form-con">
		<div class="close" v-on:click="closeclick">x</div>
		<img src="../assets/images/formimg.png" style="width:120%;margin-left:-10%" alt="" class="mart60 marb60">
		<div class="form-con-input padlr25">
			<div class="form-group">
				<select name="" id="" class="form-control">
					<option value="">请选择投保人群</option>
					<option value="">老年</option>
					<option value="">中年</option>
					<option value="">青年</option>
					<option value="">团体</option>
					<option value="">学生</option>
					<option value="">婴儿</option>
					<option value="">少儿</option>
				</select>
			</div>
			<div class="form-group">
				<select name="" id="" class="form-control">
					<option value="">请选择投保需求</option>
					<option value="">意外保险</option>
					<option value="">医疗保险</option>
					<option value="">少儿保险</option>
					<option value="">养老保险</option>
					<option value="">理财保险</option>
					<option value="">其他</option>
				</select>
			</div>
			<div class="form-group">
				<input type="date" class="form-control" placeholder="请选择日期">
			</div>
			<div class="form-group">
				<input type="text" class="form-control" placeholder="您的姓名">
			</div>
			<div class="form-group">
				<input type="tel" class="form-control" placeholder="请输入手机号码">
			</div>
			<div class="form-group form-btn">
				<button>立即获取保险方案</button>
			</div>
		</div>
	</div>
</template>
<script>
	import {mixin} from "../mixins/index.js"
	export default{
		mixins:[mixin],
		methods:{
			closeclick(){
				this.changeformflag();
			}
		}
	}
</script>
<style lang="less" scoped>
#form-con{
	position:fixed;
	left:0px;
	right:0px;
	top:0px;
	bottom:0px;
	background:#fff;
	z-index:10;
	overflow:hidden;
	.close{
		position: absolute;
	    right: 0.3rem;
	    top: 0.8rem;
	    width: 0.8rem;
	    height: 0.8rem;
	    z-index: 30000;
	    display: inline-block;
	    font-size: 0.7rem;
	    color: #fff;
	    border: 1px solid #fff;
	    border-radius: 50%;
	    line-height: 0.75rem;
	    text-align: center;
	}
}
.form-con-input {
	.form-group{
		margin-bottom:0.35rem;
	}
	.form-control{
		border-radius:7px;
	}
}
.form-btn {
	button{
		background:#448ef6;
		height:0.9rem;
		line-height:0.9rem;
		width:100%;
		border:0px;
		border-radius:9px;
		color:#fff;
		font-size:0.36rem;
		letter-spacing:2px;
		text-align:center;
	}
}
</style>