<template>
	<div class="test">
		<p style="font-size:50px" v-on:click="qqqq">dfdfdf</p>

		<div style="width:300px;border:1px solid red;height:500px;overflow:hidden;background:#fff;">
			<scroll  ref="yy" :data="item" :pullDownRefresh="true" :pullUpLoad="true" v-on:pullingDown="pullingDown" @pullingUp="pullingUp">
				 <div class="qq">	
					 <div class="scroll-horizontal" v-for="(items,index) in item" >
					 	
					 </div>
					<div class="scroll-horizontal"  >
					 	<p>11</p><p>22</p>
					 </div>
				 </div>
				
			</scroll>
		</div>

	</div>
</template>
<script>
	import scroll from "../pluginGroup/betterscroll/scroll/scroll.vue";
	export default{
		data(){
			return {
				t:"DIRECTION_H",
				item:[1,2,3,4,5,6,7,7,7,7,7]
			}
		},
		components:{
			scroll
		},
		methods:{
			qqqq(){
				this.item.push(11,12,13,14,15);
			},
			pullingDown(){
				var that=this;
				setTimeout(function(){
					that.item.push(11,12,13,14,15);					
				},1000)
			},
			pullingUp(){
				var that=this;

				this.$refs.yy.forceUpdate();

				// setTimeout(function(){
				// 	that.item.push(11,12,13,14,15);					
				// },1000)
			}
		}
	}
</script>
<style>
	.scroll-horizontal{
		height:100px;
		border:1px solid blue;
		width:100px;
		display:inline-block;
	}
	/*.qq{
		white-space:nowrap;
	}*/
	.qq{background:#fff;}
</style>