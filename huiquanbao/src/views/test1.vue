<template>
	<div id="test2" style="height:100px;border:1px solid red;">
		<button class="test" @click="$router.push('/test')" style="margin-top:500px">test1222222</button>
		<button class="testself" @click="$router.push('/test2')">大幅度111222222</button>

		<button class="testself" @click="$router.go('-1')">退</button>
	</div>
</template>
<script>
	
	export default{
		components:{

		},
		created(){
			 console.log("test1="+this.$route.meta.keepAlive)
		}
	}
</script>