<template>
	<div class="detail">
		<div :class="{loading:loadanimate}">
	          <span class="left"></span>
	          <span class="middle"></span>
	          <span class="right"></span>
	    </div>
	    
		<div v-if="!loadanimate" >
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
				data:"",
				loadanimate:true
			}
		},
		created(){
			this.init(this.$route.params.id);
		},
		watch:{
			"$route"(to,from){
				this.init(to.params.id);
			}
		},
		methods:{
			init(id){
				api.getdetaildata(id).then(res=>{
					console.log(res)
					this.data=res.data;
					this.loadanimate=false;
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
