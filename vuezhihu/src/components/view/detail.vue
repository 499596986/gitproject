<template>
	<div class="detail">
		<div v-if="!this.$parent.loadanimate" >
			<link rel="stylesheet" :href="data.css[0]">
			<div class="detail-banner fd-locate">
	    		<img src="../../assets/images/banner.jpg" alt="">
	    		<div class="detail-cover"></div>
	    		<h2>{{data.title}}</h2>
	    	</div>
			<div></div>
			<div v-html="data.body" class="detail-text">
				
			</div>
		</div>
	</div>
</template>
<script>
import api from "../../mock/api.vue"
	export default{
		data(){
			return {
				data:""
			}
		},
		created(){
			console.log("detail created")
		},
		mounted(){
			this.$parent.loadanimate=true;
			this.init(this.$route.params.id);
			console.log("detail mounted")
		},
		watch:{
			"$route"(to,from){
			//	this.$parent.loadanimate=true;
				this.init(to.params.id);
			//	console.log("detail watchroute  ceshi")
			}
		},
		activated(){

			this.$parent.loadanimate=true;

		//	console.log(this.$parent);
		//	console.log("detail activated "+this.$parent.loadanimate)
		},
		deactivated(){
		
			this.$parent.loadanimate=false;
		//	 console.log(this.$parent)
			console.log("detail deactivated "+this.$parent.loadanimate)
		},
		methods:{
			init(id){
				api.getdetaildata(id).then(res=>{
					this.data=res.data;
					this.$parent.loadanimate=false;
					console.log("detail activated2 "+this.$parent.loadanimate)
				})
			}
		}
	}
</script>
<style>
	.detail-banner{
		height:6rem;
		overflow:hidden;
	}
	.detail-banner img{
		width:100%;
	}
	.detail-text{
		position:relative;
		margin-top:-0.5rem;
	}
	.headline{
		display:none;
	}

	.detail-cover{
		position:absolute;
		left:0px;
		right:0px;
		bottom:0px;
		top:0px;
		background:rgba(91, 116, 146, 0.5);
	}
	.detail-banner h2{
		text-align:right;
		width:60%;
		line-height:0.65rem;
		font-size:0.4rem;
		color:#fff;
		position:absolute;
		top:45%;
		-webkit-transform:translateY(-50%);
		right:0.25rem;
	}
</style>
