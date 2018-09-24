<template>
	<div id="test" style="height:1500px;border:1px solid green">
		<button class="test" style="margin-top:700px">test33</button>
		<button class="testself" @click="$router.push('/test')">3333333</button>
	</div>
</template>
<style >
	#test  button.testself{
		background:yellow;
	} 
</style>