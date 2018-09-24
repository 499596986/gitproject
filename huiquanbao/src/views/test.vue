<template>
	<div id="test">
		<p><button class="test" style="height:500px;">test</button></p>
		<button class="testself" style="height:500px;" @click="$router.push('/test1')">大幅度test</button>
	</div>
</template>
<style scoped>
/* #test{
	position:fixed;
	top:0px;
	bottom:0px;
	overflow:auto;
	left:0px;
	right:0px;
} */
	.testself{
		background:blue;
	}
</style>
<script>
	export default{
		data(){
			return {
				scroll:""
			}
		},
		components:{

		},
		activated() {
			console.log("test缓存1111="+this.scroll);
		    if(this.scroll > 0){
		    	console.log("test缓存="+this.scroll);
		       window.scrollTo(0, this.scroll);
		       this.scroll = 0;
		       window.addEventListener('scroll', this.handleScroll);
		    }
		},
		deactivated(){
     window.removeEventListener('scroll', this.handleScroll);
},
		created(){
			 console.log("s="+this.$route.meta.keepAlive)
		},
		mounted(){
		  window.addEventListener('scroll', this.handleScroll);
		},
		methods:{
			handleScroll () {
			  let scrollTop = document.documentElement.scrollTop;
			  this.scroll = scrollTop;
			  console.log(this.scroll);
			}
		}
	}
</script>