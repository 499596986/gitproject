<template>
	<div id="filtercondition">
		<scroll>
			<h2 class="filterh2">筛选条件</h2>
			<div class="filtercondition-list">
				<div class="divpre" data-num="0">
					<h3>擅长险种<span>ere</span></h3>
					<p>
						<span>不限</span>
						<span>意外险</span>
						<span>少儿险</span>
						<span>养老险</span>
						<span>旅游险</span>
						<span>车险</span>
						<span>理财险</span>
					</p>
				</div>
				<div class="divpre" data-num="1">
					<h3>投保年龄</h3>
					<p>
						<span>不限</span>
						<span>0-18岁</span>
						<span>18-30岁</span>
						<span>30-40岁</span>
						<span>40-60岁</span>
					</p>
				</div>
				<div class="divpre" data-num="2">
					<h3>保费预算</h3>
					<p>
						<span>不限</span>
						<span>100以内</span>
						<span>100-500以内</span>
						<span>500-2000以内</span>
						<span>5000-1万以内</span>
					</p>
				</div>
				<div class="divpre last" data-num="3">
					<h3>保险公司</h3>
					<p class="spanfir">
						<span>恒安标准人寿</span>
					</p>
					<p>
						<strong>A</strong>
						<span>安邦保险集团</span>
						<span>安邦人寿保险</span>
						<span>安联保险</span>
						<span>安联财产保险</span>
						<span>安邦财险</span>
					</p>
					<p>
						<strong>B</strong>
						<span>百年人寿</span>
						<span>北大方正人寿</span>
						<span>渤海保险</span>
						<span>北部湾保险</span>
						<span>渤海人寿保险</span>
					</p>
					<p>
						<strong>C</strong>
						<span>百年人寿</span>
						<span>北大方正人寿</span>
						<span>渤海保险</span>
						<span>北部湾保险</span>
						<span>渤海人寿保险</span>
					</p>
					<p>
						<strong>C</strong>
						<span>百年人寿</span>
						<span>北大方正人寿</span>
						<span>渤海保险</span>
						<span>北部湾保险</span>
						<span>渤海人寿保险</span>
					</p>
					<p>
						<strong>C</strong>
						<span>百年人寿</span>
						<span>北大方正人寿</span>
						<span>渤海保险</span>
						<span>北部湾保险</span>
						<span>渤海人寿保险</span>
					</p>
					<p>
						<strong>C</strong>
						<span>百年人寿</span>
						<span>北大方正人寿</span>
						<span>渤海保险</span>
						<span>北部湾保险</span>
						<span>渤海人寿保险</span>
					</p>
				</div>
		
			</div>
			<div class="filtercondition-btn text-center">
				<button class="confirm" @click="changedata">确认</button>
				<button>清空选择</button>
			</div>
		</scroll>
	</div>
</template>
<script>
	import scroll from "../pluginGroup/betterscroll/scroll/scroll.vue";
	export default{
		mounted(){
			var con=[],con1,con2,con3,con4;
			$(".filtercondition-list .divpre span").click(function(){
				var that=this;
				var num=$(this).parents(".divpre").attr("data-num");
				if(num==3){
					$(".filtercondition-list .last span").removeClass("active");
					con4=$(this).html();
				}else{
					$(this).siblings().removeClass("active");
					if(num==0){con1=$(this).html()}
					if(num==1){con2=$(this).html()}
					if(num==2){con3=$(this).html()}
				}
				$(this).addClass("active");
				con.splice(0,1,con1);
				con.splice(1,1,con2)
				con.splice(2,1,con3);
				con.splice(3,1,con4)
				var html="";
				for(var i=0;i<con.length;i++){
					if(con[i]){
						html+="<span>"+con[i]+"</span>";
					}
				}
				$(".filterh2").html("筛选条件"+html)
			})	
		},
		components:{
			scroll
		},
		methods:{
			changedata(){
				this.$emit("changedata");
				
			}
		}
	}
</script>
<style lang="less">
	.filterh2 span{
		display:inline-block;
		padding:3px 5px;
		border:1px solid #ddd;
		background:#448ef6;
		color:#fff;
		margin-left:0.2rem;
		margin-bottom:0.2rem;
	}
</style>
<style lang="less" scoped>
	#filtercondition{
		width:100%;
		height:100%;
		background:#f7f7f8;
		padding:0px 0.1rem;
		font-size:14px;
		padding-bottom:0.3rem;
		h2{
			padding:0.3rem 0px;
			border-bottom:1px solid #ddd;
		}
	}
	.filtercondition-list{
		>div{
			padding:0.25rem 0px;
			border-bottom:1px solid #ddd;
			&:last-child{border-bottom:0px;}
			h3{
				color:#000;
				
			}

			p strong{
				display:block;
				font-weight:400;
			}
			p span{
				padding:3px 5px;
				border:1px solid #ddd;
				background:#fff;
				display:inline-block;
				margin-right:7px;
				margin-top:7px;
				&.active{
					background:#448ef6;
					color:#fff;
				}
			}
		}
		div.last{
			p{
				padding:0.35rem 0px;
				border-bottom:1px solid #ddd;
				&:last-child{
					border-bottom:0px;
				}
			}
			p.spanfir{
				padding:0.1rem 0px 0.35rem;
			}
		}
	}
	.filtercondition-btn button{
		width:30%;
		height:0.65rem;
		line-height:0.65rem;
		text-align:center;
		background:#ddd;
		margin-top:-0.25rem;
		border:0px;
		&.confirm{
			background:#448ef6;
			color:#fff;
			margin-right:0.4rem;
		}
	}
</style>



















