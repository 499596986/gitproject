<template>
	<header id="header" :class="{active:moveleft}">
		<div class="left">
			<span  v-if="leftshow" @click="$router.go(-1)"><</span>
		</div>
		<span class="text">{{tit}}</span>
		<div class="right" >
			<button v-if="rightshow" @click="rightshowclick()">
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>

	</header>
</template>
<script>
	export default{
		data(){
			return {
				moveleftflag:false
			}
		},
		props:{
			leftshow:{
				type:null,
				default:false
			},
			rightshow:{
				type:null,
				default:false
			},
			tit:{
				type:String,
				default:"汇全保"
			},
			moveleft:{
				type:null,
				default:false
			}
		},
		watch:{
			moveleft(){
				this.moveleftflag=this.moveleft;
			}
		},
		methods:{
			rightshowclick(){
				if(this.moveleftflag){
					this.moveleftflag=false;
				}else{ this.moveleftflag=true }
				this.$emit("buttonclick");
			}
		}
	}
</script>
<style lang="less" scoped>
#header{
	position:fixed;
	top:0px;
	width:7.5rem;
	left:50%;
	margin-left:-3.75rem;
	text-align:center;
	display:flex;
	display:-webkit-flex;
	line-height:1rem;
	background:#f7f7f8;
	font-size:0.4rem;
	z-index:9;
	transition:all 0.3s;
	&.active{
		left:-20%;
	}
	.text{
		flex:1;
		-webkit-flex:1;
	}
	.left{
		margin-right:0.25rem;
		font-size:0.5rem;
		font-family:"SimSun";
		width:0.8rem;
		color:#000;
		span{
			display: inline-block;
		    width: 0.28rem;
		    height: 0.28rem;
		    border-left: 1px solid #999;
		    border-top: 1px solid #999;
		    font-size: 0px;
		    vertical-align: middle;
		    transform: rotate(-45deg);
		}
	}
	.right{
		margin-left:0.25rem;
		width:0.8rem;
		font-size:0px;
		button{
			width:100%;
			font-size:0px;
			padding-top:0.12rem;
			background:transparent;
			border:0px;
		}
		span{
			display:inline-block;
			width:55%;
			height:2px;
			background:#666;
			margin-bottom:0.12rem;
		}
	}
}

</style>