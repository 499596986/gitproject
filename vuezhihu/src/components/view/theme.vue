<template>
	<div class="theme">
		<div :class="{loading:loadanimate}">
	          <span class="left"></span>
	          <span class="middle"></span>
	          <span class="right"></span>
	    </div>
	    <div v-if="!loadanimate">
			<div class="theme-banner fd-locate" >
				<img  src="../../assets/images/banner2.jpg" alt="" >
				<div class="theme-banner-content">
					<h2>{{data.description}}</h2>
					<p>{{data.name}}</p>
				</div>
			</div>
			<div class="home-text theme-text">
				<div class="home-list">
					<ul>
						<li v-for="(item,index) in data.stories" v-on:click="goto(item.id)">
							<img  src="../../assets/images/content.jpg" alt="" >
							<p>{{item.title}}</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

</template>
<script>
	import api from "../../mock/api.vue"

	export default{
		data(){
			return {
				data:{},
				loadanimate:true

			}
		},
		mounted(){
			this.init(this.$route.params.id);
		},
		watch:{
			"$route"(to,from){
				this.init(to.params.id);
			}
		},
		methods:{
			init(id){
				api.getthemedata(id).then(res=>{
					this.data=res.data;
					this.loadanimate=false;
				}).catch(err=>alert("获取不到数据"))
			}
		}
	}
</script>
<style scope>
	.theme-banner .theme-banner-content{
		position:absolute;
		font-size:0.4rem;
		color:#fff;
		top:2rem;
		right:0px;
		padding:0px 0.3rem 0.3rem;
		line-height:0.8rem;
		text-align:right;
	}
	.theme-banner>img{
		height:6rem;
		width:auto;
	}
	.theme-banner h2{
		padding-bottom:0.3rem;
		margin-bottom:0.1rem;
		position:relative;
	}
	.theme-banner h2:after{
		content:"";
		position:absolute;
		bottom:0px;
		right:0rem;
		width:2rem;
		border:2px solid #ffd300;
	}

	.theme-text{
		background:transparent;
	}
	.theme-text .home-list{
		margin-top:-0.5rem;
	}

</style>