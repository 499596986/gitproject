<template>
	<div id="home">
		<div :class="{loading:loadanimate}">
	          <span class="left"></span>
	          <span class="middle"></span>
	          <span class="right"></span>
	    </div>

		<div  v-if="!loadanimate">
			<div class="home-banner">
				<div class="swiper-container">
		            <div class="swiper-wrapper">
		                <div class="swiper-slide slide" v-for="(item,index) in swiperdata">
		                    <div class="slide-con" v-on:click="goto(item.id)">
		                    	<img src="../../assets/images/banner.jpg" alt="">
		                    	<h2>{{item.title}}</h2>
		                    </div>
		                </div>
		            </div>
		            <div class="swiper-pagination"></div>
		        </div>
			</div>
			<div class="home-text">
				<div class="home-list">
					<h2>{{date}}</h2>
					<ul>
						<li v-for="(item,index) in stories" v-on:click="goto(item.id)">
							<img src="../../assets/images/content.jpg" alt="">
							<p>{{item.title}}</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
//import Vue from "vue"
import api from "../../mock/api.vue";

export default{
	name:"home",
	data(){
		return {
			loadanimate:true,
			date:"",
			swiperdata:[],
			stories:[],
		}
	},
	mounted(){
		this.init()
	},
	methods:{
		init(){
			api.gethomenowdata().then(res=>{
				console.log(res);
				this.date=res.data.date;
				this.swiperdata=res.data.top_stories;
				this.stories=res.data.stories;

				this.$nextTick(function(){
					new Swiper(".swiper-container",{ 
		              direction:"horizontal",
		              slidesPerView : 'auto',
		              autoplayDisableOnInteraction:false,
		              speed:500,
					  autoplay:3000 ,  //自动轮播
					  pagination:'.swiper-pagination'      
				    })
				})
				this.loadanimate=false;
			})
		},
		goto(id){
			this.$router.push({"path":"/detail/"+id});
			// api.getdetaildata(id).then(res=>{
			// 	console.log(res);
			// })
		}
	}
}
 


</script>
<style scope>
.home-banner .slide-con{
	position:relative;
	height:6rem;
	overflow:hidden;
}
.home-banner .slide-con h2{
	position:absolute;
	font-size:0.4rem;
	color:#fff;
	top:2rem;
	right:0px;
	padding:0px 0.3rem 0.3rem;
	line-height:0.8rem;
	text-align:right;
}
.home-banner .slide-con h2:after{
	content:"";
	position:absolute;
	bottom:0px;
	right:0.3rem;
	width:3rem;
	border:2px solid #ffd300;
}



</style>