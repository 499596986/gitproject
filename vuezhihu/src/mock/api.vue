<template>
	
</template>
<script>
	import Vue from "vue";
	export default{
		getmenu(){
			return Vue.http.get("/4/themes");
		},
		gethomenowdata(){
			return Vue.http.get("/4/news/latest");
		},
		gethomepredata(date){
			return Vue.http.get("/4/news/before/"+date);
		},
		getthemedata(id){
			return Vue.http.get("/4/theme/"+id);
		},
		getdetaildata(id){
			return Vue.http.get("/4/news/"+id);
		}
	}
</script>
