<template>
	<div id="header">
		<div class="fd-locate text-center header-tot">
			<div class="header-tit">
				<p>QQ音乐</p>
				<span v-on:click="toUser" class="fa fa-user-o"></span>
			</div>
			<div class="header-list flex">
				<span v-for="(item,index) in datalist">
					<em :class="{'active':index==clickpos}" v-on:click="clickJump(index)">{{item}}</em>
				</span>
			</div>
		</div>
		<router-view/> 
	</div>
</template>
<script>
	export default{
		data(){
			return {
				datalist:["推荐","歌手","排行","搜索"],
				clickpos:0,
				transitionName:"slide-left",

			}
		},
		created:function(){
			if(this.$route.path=="/recommend"){
				this.clickpos=0;
			}else if(this.$route.path=="/singer"){
				this.clickpos=1;
			}else if(this.$route.path=="/ranklist"){
				this.clickpos=2;
			}else{
				this.clickpos=3;
			}
		},
		methods:{
			clickJump:function(index){
				this.clickpos=index;
				if(index==0){
					this.$router.push("/recommend");				
				}else if(index==1){
					this.$router.push("/singer");
				}else if(index==2){
					this.$router.push("/ranklist");
				}else{
					this.$router.push("/search");
				}
			},
			toUser(){
				this.$router.push("/user");
			}
		}
	}
</script>
<style scoped>
	.header-tot{
		background:#222;
		position:relative;
		z-index:2;
	}
	.header-tit{
		font-size:0.4rem;
		line-height:0.8rem;
	}
	.header-tit span{
		display:inline-block;
		width:0.7rem;
		position:absolute;
		right:0.3rem;
		top:0.15rem;
		font-size:0.45rem;

	}

	.header-list span{
		flex:1;
		-webkit-flex:1;
		text-align:center;
		font-size:0.3rem;
		line-height:01rem;
	}
	.header-list span em.active{
		color:#ffcd32;
		border-bottom:1px solid #ffcd32;
		padding-bottom:0.1rem;
	}
</style>